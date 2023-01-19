<template>
  <div>
    <form class="pure-form pure-g">
      <input type="text" v-model="pageTitle" placeholder="App name" class="pure-u-11-12">
      <div class="pure-u-1-12" style="text-align: center">
        <img src="../assets/twitter.png" alt="Share on Twitter" v-on:click="shareOnTwitter()" style="width: 2em; height: 2em;">
      </div>
    </form>

    <!--  Resizable: (base: https://stackoverflow.com/questions/47017753/monaco-editor-dynamically-resizable) -->
    <div style="resize: vertical; overflow: auto; height: 20em;">
      <!--  NOTE: "height: 98%;" allows user to resize easier-->
      <NippMonacoEditor v-model="script"
                        :options="monacoOptions"
                        style="width: 100%; height: 98%; border: #ccc solid 2px; box-sizing: border-box;"/>
    </div>
    <form onsubmit="return false" class="pure-form pure-form-aligned">
      <select v-model="transpiler" v-on:change="onChangeTranspiler()" style="margin-right: 1rem;">
        <option v-for="t in transpilers" v-bind:value="t" >{{ t.name }}</option>
      </select>
      <span style="margin-right: 1rem;"><input type="checkbox" v-model="enableClickRun" >: click_run</span>
      <span style="display: inline-block"><input type="checkbox" v-model="consoleClearBeforeRun">: console_clear</span>
      <details style="display: inline-block; margin-left: 1rem; margin-right: 1rem;">
        <summary>More options</summary>
        <label for="compression_alg">Compression:</label>
        <select id="compression_alg" v-model="compressionAlg" >
          <option v-for="a in compressionAlgs" v-bind:value="a" >{{ a.name }}</option>
        </select>
        <input type="checkbox" v-model="enablePromiseWait">: promise_wait
        <input type="checkbox" v-model="enableTopLevelAwait">: top-level await
      </details>

      <button v-if="enableClickRun" v-on:click="onClickClickRun()" class="pure-button" style="color: white; background: rgb(28, 184, 65)">
        {{ clickRunButtonText }}
      </button>
      <button v-if="false && !enableClickRun && blockingExecutionDetected" @click="enableClickRun = true" class="pure-button" style="color: white; background: rgb(255, 165, 0)">
        {{ "(BLOCKING detected) Enable click_run" }}
      </button>
    </form>

    <form class="pure-form pure-g">
      <textarea v-model="inputText" placeholder="Input" rows="10" class="pure-u-1 pure-u-md-1-2"></textarea>
      <textarea v-model="outputText" placeholder="Output" rows="10" class="pure-u-1 pure-u-md-1-2"></textarea>
    </form>

    <button v-on:click="showError = !showError" v-bind:style="{color: hasError? 'red': ''}" class="pure-button">Show/Hide error</button>
    <span v-if="showError">
      <div class="pure-g">
        <textarea v-model="errorStr" class="pure-u-1"></textarea>
      </div>
    </span>

    <button v-on:click="showTranspiledJsCode = !showTranspiledJsCode" class="pure-button">Show/Hide transpiled JS code</button>
    <span v-if="showTranspiledJsCode">
      <div class="pure-g">
        <div class="pure-u-1">
          <NippMonacoEditor :modelValue="transpiledJsCode" :options="{ language: 'javascript', fontSize: 12, minimap: { enabled: false } }" style="min-height: 5rem;"/>
        </div>
      </div>
    </span>
  </div>
</template>

<script setup lang="ts">
import {computed, nextTick, onMounted, ref, watch, defineAsyncComponent} from 'vue';
import {computedAsync, useDebounce} from '@vueuse/core';
import * as uaDeviceDetector from 'ua-device-detector';
const NippMonacoEditor = defineAsyncComponent(() => import('@/components/NippMonacoEditor.vue'));
import {type Transpiler} from "@/transpilers/Transpiler";
import {RubyTranspiler} from "@/transpilers/RubyTranspiler";
import {Es2017Transpiler, FuncEs2017Transpiler} from "@/transpilers/Es2017Transpiler";
import {type CompressionAlg} from "@/compression-algs/CompressionAlg";
import {DeflateAlg} from "@/compression-algs/DeflateAlg";
import {LZMAAlg} from "@/compression-algs/LZMAAlg";

// Encode code
async function encodeCode(code: string, compressor: (raw: string) => Promise<string>): Promise<string> {
  try {
    const binStr = await compressor(code);
    return btoa(binStr);
  } catch (err) {
    return "";
  }
}
// Decode code
async function decodeCode(encodedCode: string, decompressor: (compressed: string) => Promise<string>): Promise<string> {
  try {
    // Base64 => binary String
    const binStr = atob(encodedCode);
    return await decompressor(binStr);
  } catch (err) {
    return "";
  }
}

// Parse location.hash and return page title and code
function parseLocationHash(): { pageTitle: string, urlOptions: string[], encodedCode: string } {
  // Split by "/"
  const splited = location.hash.split("/");
  if(splited.length >= 3) {
    // Get title
    const title = decodeURIComponent(splited[0].substring(1).replace(/_/g, " "));
    // Get URL options
    const urlOptions = splited[1].split(",");
    // Get encoded code
    const encodedCode = splited.slice(2, splited.length).join("/");
    return {
      pageTitle: title,
      urlOptions: urlOptions,
      encodedCode: encodedCode
    };
  } else {
    return {
      pageTitle: "",
      urlOptions: [],
      encodedCode: ""
    }
  }
}

const visitWithoutFragment = window.location.hash === "";

if (window.name === "") {
  // window.name is used for identifier to restore input
  window.name = `nipp_${Math.random()}`;
}

const INPUT_SESSION_STORAGE_KEY = `${window.name}_input`;
const CONSOLE_CLEAR_STORAGE_KEY = 'clear_console_before_run';

type IStandaloneEditorConstructionOptions = Parameters<(typeof import("monaco-editor"))["editor"]["create"]>[1];

const compressionAlgs = ref<readonly CompressionAlg[]>([
  DeflateAlg,
  LZMAAlg
]);
// Compression algorithm
const compressionAlg = ref<CompressionAlg>(compressionAlgs.value[0]);
// Page title
const pageTitle = ref("");
// Set empty string as default input
const inputText  = ref(window.sessionStorage.getItem(INPUT_SESSION_STORAGE_KEY) ?? "");
const debouncedInputText = useDebounce(inputText, 1000);
watch(debouncedInputText, () => {
  window.sessionStorage.setItem(INPUT_SESSION_STORAGE_KEY, debouncedInputText.value);
});
// Set empty string as default output
const outputText = ref("");
// Script
const script = ref("");
// Generated JavaScript code
const transpiledJsCode = ref("");
// Whether transpiled JS code is shown or not
const showTranspiledJsCode = ref(false);
// Executable function which return result
const executableFunction = ref<Function>(() => {return "";});
// Enable click-run or not
// (click-run: Non-realtime/non-reactive evaluation)
const enableClickRun = ref(false);
// Use promise-wait or not
const enablePromiseWait = ref(false);
// Use top-level await or not
const enableTopLevelAwait = ref(false);
const transpilers = ref<readonly Transpiler[]>([
  RubyTranspiler,
  Es2017Transpiler,
  FuncEs2017Transpiler
]);
// Set transpiler
const transpiler = ref(visitWithoutFragment ? Es2017Transpiler : RubyTranspiler);
// Error string
const errorStr = ref("");
// Whether error string is shown or not
const showError = ref(true);
// Whether has error or not
const hasError = ref(false);
// Text of click-run button
const clickRunButtonText = ref("");
// Use textarea instead of ace
const useTextarea = ref(false);
const scriptModified = ref(false);
const transpileElapsedMillis = ref(0);
const executeElapsedMillis = ref(0);
const blockingExecutionDetected = ref(false);
const consoleClearBeforeRun = ref(window.localStorage.getItem(CONSOLE_CLEAR_STORAGE_KEY) === "true");
watch(consoleClearBeforeRun, () => {
  window.localStorage.setItem(CONSOLE_CLEAR_STORAGE_KEY, consoleClearBeforeRun.value.toString());
});

watch(script, () => {
  scriptModified.value = true;
});

onMounted(async () => {
  // Get page title and code
  const titleAndCode = parseLocationHash();
  if (titleAndCode.urlOptions.includes("lzma")) {
    compressionAlg.value = LZMAAlg;
  }
  // Set page title
  pageTitle.value = titleAndCode.pageTitle;
  // Set <title>
  if (titleAndCode.pageTitle !== "") {
    document.title   = titleAndCode.pageTitle;
  }
  // Set decoded location.hash as default script
  script.value = await decodeCode(titleAndCode.encodedCode, compressionAlg.value.decompress);
  // Set enable-click-run
  enableClickRun.value = titleAndCode.urlOptions.includes("click_run");
  // Set enable-promise-wait
  enablePromiseWait.value = visitWithoutFragment ? true : titleAndCode.urlOptions.includes("promise_wait");
  // Set enable-top-level await
  enableTopLevelAwait.value = visitWithoutFragment ? true : titleAndCode.urlOptions.includes("top_level_await");
  // "async" option enables both
  if (titleAndCode.urlOptions.includes("async")) {
    enablePromiseWait.value = true;
    enableTopLevelAwait.value = true;
  }
  if (titleAndCode.urlOptions.includes("es2017")) {
    transpiler.value = Es2017Transpiler;
  } else if (titleAndCode.urlOptions.includes("func_es2017")) {
    transpiler.value = FuncEs2017Transpiler;
  }
  // Initialize library
  transpiler.value.initLibrary();
  // Set default value to global variable "INPUT"
  // TODO: duplicate code
  (window as any).INPUT = inputText.value;
  // Get device info
  const deviceInfo = uaDeviceDetector.parseUserAgent(window.navigator.userAgent);
  // Set click-run button text
  clickRunButtonText.value = "Run" + (deviceInfo.isDesktop() ? (deviceInfo.os === "mac"? "(⌘+Enter)" : "(Ctrl+Enter)") : "");
  // If enable click_run is disable
  if (!enableClickRun.value) {
    // Set default output
    setOutputText();
  }

  window.addEventListener('keydown', (e: WindowEventMap['keydown']) => {
    if((e.ctrlKey || e.metaKey) && e.key === "Enter") {
      nextTick(()=>{
        // Run onclick click-run
        onClickClickRun();
      })
    }
  });
});

watch(pageTitle, async () => {
  // Set page title
  document.title = pageTitle.value;
});

const debouncedScript = useDebounce(script, computed(() => transpileElapsedMillis.value));
watch(debouncedScript, async () => {
  // Transpile
  await transpile();
});

const monacoOptions = computed<IStandaloneEditorConstructionOptions>(() => {
  const language = transpiler.value.id === RubyTranspiler.id ? 'ruby': 'javascript';
  return {
    language: language,
    minimap: { enabled: false },
    fontSize: 15,
    tabSize: 2,
    automaticLayout: true
  };
});

const urlTitlePart = computed<string>(() => {
  return pageTitle.value.replace(/%/g, "%25").replace(/_/g, "%5F").replace(/ /g, "_").replace(/\//g, "%2F");
});

// Generate options part
const urlOptionsPart = computed<string>(() => {
  const options: string[] = [];
  // (NOTE: transpiler:ruby is default so it should be pushed)
  if (transpiler.value.id === Es2017Transpiler.id) {
    options.push("es2017");
  } else if (transpiler.value.id === FuncEs2017Transpiler.id) {
    options.push("func_es2017");
  }
  // (NOTE: compression:deflate is default so it should be pushed)
  if (compressionAlg.value.id === LZMAAlg.id) {
    options.push("lzma");
  }
  // If click_run is enable
  if (enableClickRun.value) {
    options.push("click_run");
  }
  if (enablePromiseWait.value && enableTopLevelAwait.value) {
    options.push("async");
  } else {
    // If promise_wait is enable
    if (enablePromiseWait.value) {
      options.push("promise_wait");
    }
    // If top-level await is enable
    if (enableTopLevelAwait.value) {
      options.push("top_level_await");
    }
  }
  // Generate options part
  return options.join(",");
});

const urlEncodedCodePart = computedAsync<string | undefined>(async () => {
  return await encodeCode(debouncedScript.value, compressionAlg.value.compress);
});

const locationHash = computed<string | undefined>(() => {
  if (urlEncodedCodePart.value === undefined) {
    return undefined;
  }
  return urlTitlePart.value + "/" + urlOptionsPart.value + "/" + urlEncodedCodePart.value;
});

watch(locationHash, () => {
  if (locationHash.value === undefined) {
    return;
  }
  // Not change location.hash when user visited and not input script yet
  if (!scriptModified.value) {
    return;
  }
  // Change location hash to the code
  location.hash = locationHash.value;
});

// (NOTE: this is not typo. onclick "click_run")
function onClickClickRun() {
  // Set output text
  setOutputText();
}

async function onChangeTranspiler() {
  // Initialize library
  transpiler.value.initLibrary();
  // Ensure to call once
  transpiler.value.initLibrary = () => Promise.resolve();
  // Transpile
  await transpile();
}

async function transpile() {
  try {
    const startTime = new Date().getTime();
    // Transpile script and Set executable function
    const executableFunctionAndTraspiledJsCode = await transpiler.value.getExecutableFunctionAndTranspiledJsCode(script.value, enableTopLevelAwait.value);
    transpileElapsedMillis.value = new Date().getTime() - startTime;
    executableFunction.value = executableFunctionAndTraspiledJsCode.executableFunction;
    transpiledJsCode.value = executableFunctionAndTraspiledJsCode.transpiledJsCode;
    errorStr.value = "";
    hasError.value = false;
    // If enable click_run is disable
    if (!enableClickRun.value) {
      // Set output text
      setOutputText();
    }
  } catch (err: any) {
    // console.log("Transpile compile", err);
    errorStr.value = err.toString();
    hasError.value = true;
  }
}

watch(inputText, () => {
  // If enable click_run is disable
  if (!enableClickRun.value) {
    // Set output text
    setOutputText();
  }
});

// Set output text
function setOutputText() {
  // Set global INPUT string variable
  (window as any).INPUT = inputText.value;
  if (consoleClearBeforeRun.value) {
    console.clear();
  }
  try {
    blockingExecutionDetected.value = false;
    let blockingExecution = true;
    const timer = setTimeout(() => {
      blockingExecution = false;
    }, 10);
    const startTime = new Date().getTime();
    // Get output
    const output = executableFunction.value();
    // If promise-wait is enable
    if(enablePromiseWait.value) {
      outputText.value = "<The promise is not complete yet>";
      Promise.resolve(output)
        .then((res: any) => {
          executeElapsedMillis.value = new Date().getTime() - startTime;
          clearInterval(timer);
          nextTick(() => {
            outputText.value = res + "";
            // Set no error
            errorStr.value = "";
            hasError.value = false;
            if (blockingExecution && executeElapsedMillis.value > 50) {
              blockingExecutionDetected.value = true;
            }
          });
        })
        .catch((err: Error) => {
          nextTick(()=>{
            outputText.value = "<Promise error: " + err.toString() + ">";
            errorStr.value = err.toString();
            hasError.value = true;
          });
        });
    } else {
      executeElapsedMillis.value = new Date().getTime() - startTime;
      clearInterval(timer);
      // Set output text
      outputText.value = output + "";
      // Set no error
      errorStr.value = "";
      hasError.value = false;
      if (blockingExecution && executeElapsedMillis.value > 50) {
        blockingExecutionDetected.value = true;
      }
    }
  } catch (err: any) {
    // console.log("JS Runtime error", err);
    outputText.value = "";
    errorStr.value = err.toString();
    hasError.value = true;
  }
}

function shareOnTwitter() {
  // (from: http://d.hatena.ne.jp/osyo-manga/20140717/1405626111)
  const url = 'https://twitter.com/share?text='+encodeURIComponent(pageTitle.value)+"&url=" + encodeURIComponent(location.href)+"&hashtags=nipp";
  window.open(url,'','scrollbars=yes,width=500,height=300,');
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
} */
</style>
