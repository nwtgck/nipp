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
      <!--  NOTE: `:language=` is needed to highlight JavaScript -->
      <!--  NOTE: "height: 98%;" allows user to resize easier-->
      <monaco-editor v-model="script"
                     v-on:change="onChangeScript()"
                     :options="monacoOptions"
                     :language="monacoOptions.language"
                     style="width: 100%; height: 98%; border: #ccc solid 2px; box-sizing: border-box;" />
    </div>
    <form class="pure-form pure-form-aligned">
      <label for="transpiler">Transpiler:</label>
      <select id="transpiler" v-model="transpiler" v-on:change="onChangeTranspiler()">
        <option v-for="t in transpilers" v-bind:value="t" >{{ t.name }}</option>
      </select>

      <label for="compression_alg">Compression:</label>
      <select id="compression_alg" v-model="compressionAlg" >
        <option v-for="a in compressionAlgs" v-bind:value="a" >{{ a.name }}</option>
      </select>

      <input type="checkbox" v-model="enableClickRun" v-on:change="setLocationHash()">: click_run
      <input type="checkbox" v-model="enablePromiseWait" v-on:change="setLocationHash()">: promise_wait

      <button v-if="enableClickRun" v-on:click="onClickClickRun()" class="pure-button" style="color: white; background: rgb(28, 184, 65)">
        {{ clickRunButtonText }}
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
          <monaco-editor :value="transpiledJsCode" language="javascript" :options="{ fontSize: 12, minimap: { enabled: false } }" style="min-height: 5rem;"/>
        </div>
      </div>
    </span>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue, Watch} from 'vue-property-decorator';
const pakoAsync = () => import('pako');
import * as uaDeviceDetector from 'ua-device-detector';
import * as monacoEditor from 'monaco-editor'
const MonacoEditor = () => import('vue-monaco');
import {loadScriptOnce} from "@/utils";

// Get Opal object
const OpalAsync = async () => {
  await loadScriptOnce("opal-cdn/opal/current/opal.min.js");
  await loadScriptOnce("opal-cdn/opal/current/opal-parser.min.js");
  await Promise.all([
    loadScriptOnce("opal-cdn/opal/current/base64.min.js"),
    loadScriptOnce("opal-cdn/opal/current/benchmark.min.js"),
    loadScriptOnce("opal-cdn/opal/current/bigdecimal.min.js"),
    loadScriptOnce("opal-cdn/opal/current/buffer.min.js"),
    loadScriptOnce("opal-cdn/opal/current/console.min.js"),
    loadScriptOnce("opal-cdn/opal/current/date.min.js"),
    loadScriptOnce("opal-cdn/opal/current/delegate.min.js"),
    loadScriptOnce("opal-cdn/opal/current/dir.min.js"),
    loadScriptOnce("opal-cdn/opal/current/encoding.min.js"),
    loadScriptOnce("opal-cdn/opal/current/enumerator.min.js"),
    loadScriptOnce("opal-cdn/opal/current/erb.min.js"),
    loadScriptOnce("opal-cdn/opal/current/file.min.js"),
    loadScriptOnce("opal-cdn/opal/current/fileutils.min.js"),
    loadScriptOnce("opal-cdn/opal/current/forwardable.min.js"),
    loadScriptOnce("opal-cdn/opal/current/headless_chrome.min.js"),
    loadScriptOnce("opal-cdn/opal/current/iconv.min.js"),
    loadScriptOnce("opal-cdn/opal/current/js.min.js"),
    loadScriptOnce("opal-cdn/opal/current/json.min.js"),
    loadScriptOnce("opal-cdn/opal/current/math.min.js"),
    loadScriptOnce("opal-cdn/opal/current/nashorn.min.js"),
    loadScriptOnce("opal-cdn/opal/current/native.min.js"),
    loadScriptOnce("opal-cdn/opal/current/nodejs.min.js"),
    loadScriptOnce("opal-cdn/opal/current/observer.min.js"),
    loadScriptOnce("opal-cdn/opal/current/opal-builder.min.js"),
    loadScriptOnce("opal-cdn/opal/current/ostruct.min.js"),
    loadScriptOnce("opal-cdn/opal/current/pathname.min.js"),
    loadScriptOnce("opal-cdn/opal/current/pp.min.js"),
    loadScriptOnce("opal-cdn/opal/current/promise.min.js"),
    loadScriptOnce("opal-cdn/opal/current/rbconfig.min.js"),
    loadScriptOnce("opal-cdn/opal/current/securerandom.min.js"),
    loadScriptOnce("opal-cdn/opal/current/set.min.js"),
    loadScriptOnce("opal-cdn/opal/current/singleton.min.js"),
    loadScriptOnce("opal-cdn/opal/current/stringio.min.js"),
    loadScriptOnce("opal-cdn/opal/current/strscan.min.js"),
    loadScriptOnce("opal-cdn/opal/current/template.min.js"),
    loadScriptOnce("opal-cdn/opal/current/thread.min.js"),
    loadScriptOnce("opal-cdn/opal/current/time.min.js"),
    loadScriptOnce("opal-cdn/opal/current/yaml.min.js"),
  ]);
  return (window as any).Opal;
};
// Get LZMA object
const LZMAAsync = async () => {
  // NOTE: LZMA-JS does not support require/import: This PR seem to be a support, but not merged : https://github.com/LZMA-JS/LZMA-JS/pull/60
  await loadScriptOnce('copied_js/lzma_worker-min.js');
  return (window as any).LZMA;
};
// Get Babel
const BabelAsync = async () => {
  await loadScriptOnce("copied_js/babel.min.js");
  return (window as any).Babel;
};

type CompressionAlg = {
  name: string,
  compress: (raw: string) => Promise<string>,
  decompress: (compressed: string) => Promise<string>
}

const DeflateAlg: CompressionAlg = {
  name: "Deflate",
  compress: async (str: string) => {
    const pako = await pakoAsync();
    // NOTE: Negative windowBits means no header and no checksum
    // (see: https://docs.python.org/3.6/library/zlib.html#zlib.decompress)
    const binStr = pako.deflate(str, {to: 'string', level: 9, windowBits: -8});
    return binStr;
  },
  decompress: async (binStr: string) => {
    const pako = await pakoAsync();
    // NOTE: Negative windowBits means no header and no checksum
    // (see: https://docs.python.org/3.6/library/zlib.html#zlib.decompress)
    return pako.inflate(binStr, {to: 'string', windowBits: -8});
  }
};

const LZMAAlg: CompressionAlg = {
  name: "LZMA",
  compress: async (str: string) => {
    const LZMA = await LZMAAsync();
    const compressed: string = LZMA.compress(str, 9);
    // (from: https://github.com/alcor/itty-bitty/blob/5292c4b7891939dab89412f9e474bca707c9bec5/data.js#L25)
    // TODO: Not use any in Uint8Array
    // TODO: Not use any in apply
    return String.fromCharCode.apply(null, new Uint8Array(compressed as any) as any);
  },
  decompress: async function(binStr) {
    const LZMA = await LZMAAsync();
    return LZMA.decompress(binStr.split('').map(function(c){return c.charCodeAt(0)}));
  }
};

type Transpiler = {
  name: string,
  aceEditorMode: string,
  initLibrary: () => Promise<void>,
  getExecutableFunctionAndTranspiledJsCode: (rubyScript: string) => Promise<{ executableFunction: Function, transpiledJsCode: string }>
};

// TODO: Move proper place
const RubyTranspiler: Transpiler = {
  name: "Ruby",
  aceEditorMode: "ruby",
  initLibrary: async () => {
    const Opal = await OpalAsync();
    Opal.load('opal');
    Opal.load('opal-parser');
  },
  getExecutableFunctionAndTranspiledJsCode: async (rubyScript: string) => {
    const Opal = await OpalAsync();
    // Use javascript global variable "INPUT"
    // (NOTE: `INPUT` will be pure JavaScript string variable)
    const rubyScriptWithInput = 's = `window.INPUT`\n' + rubyScript;
    // Transpile Ruby to JavaScript
    const transpiledJsCode =
      Opal.compile(rubyScriptWithInput)
    // Remove the first comment from transpiled code
          .replace(/\/\*.*\*\/\s*/, '');
    // Set executable function
    const executableFunction = new Function("return " + transpiledJsCode);
    return {
      executableFunction: executableFunction,
      transpiledJsCode: transpiledJsCode
    };
  }
};

const Es2017Transpiler: Transpiler = {
  name: "ES2017",
  aceEditorMode: "javascript",
  initLibrary: () => Promise.resolve(),
  getExecutableFunctionAndTranspiledJsCode: async (script) => {
    const Babel = await BabelAsync();
    // Use javascript global variable "INPUT"
    // (NOTE: `INPUT` will be pure JavaScript string variable)
    const scriptWithInput = 'var s = window.INPUT;\n' + script;
    // Transpile
    const code = Babel.transform(scriptWithInput, {presets: ["es2017"]}).code;
    return {
      executableFunction: () => {
        return eval(code);
      },
      transpiledJsCode: code
    };
  }
};

const FuncEs2017Transpiler: Transpiler = {
  name: "ES2017 with Function",
  aceEditorMode: "javascript",
  initLibrary: () => Promise.resolve(),
  getExecutableFunctionAndTranspiledJsCode: async (script: string) => {
    const Babel = await BabelAsync();
    // Use javascript global variable "INPUT"
    // (NOTE: `INPUT` will be pure JavaScript string variable)
    const scriptWithInput = 'var s = window.INPUT;\n' + script;
    // Transpile
    const code = Babel.transform(scriptWithInput, {presets: ["es2017"]}).code;
    // Generate executable function
    const executableFunction = new Function(code);
    return {
      executableFunction: executableFunction,
      transpiledJsCode: code
    };
  }
};


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
    const title = decodeURI(splited[0].substring(1).replace(/_/g, " "));
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

@Component({
  components: {
    MonacoEditor
  }
})
export default class Nipp extends Vue {
  compressionAlgs: ReadonlyArray<CompressionAlg> = [
    DeflateAlg,
    LZMAAlg
  ];
  // Compression algorithm
  compressionAlg: CompressionAlg = this.compressionAlgs[0];
  // Page title
  pageTitle = "";
  // Set empty string as default input
  inputText  = "";
  // Set empty string as default output
  outputText = "";
  // Script
  script = "";
  // Generated JavaScript code
  transpiledJsCode = "";
  // Whether transpiled JS code is shown or not
  showTranspiledJsCode = false;
  // Executable function which return result
  executableFunction: Function = () => {return "";};
  // Enable click-run or not
  // (click-run: Non-realtime/non-reactive evaluation)
  enableClickRun = false;
  // Use promise-wait or not
  enablePromiseWait = false;
  transpilers: ReadonlyArray<Transpiler> = [
    RubyTranspiler,
    Es2017Transpiler,
    FuncEs2017Transpiler
  ];
  // Set transpiler
  transpiler = this.transpilers[0];
  // Error string
  errorStr = "";
  // Whether error string is shown or not
  showError = true;
  // Whether has error or not
  hasError = false;
  // Text of click-run button
  clickRunButtonText = "";
  // Use textarea instead of ace
  useTextarea = false;

  async mounted () {
    // Get page title and code
    const titleAndCode = parseLocationHash();
    if (titleAndCode.urlOptions.includes("lzma")) {
      this.compressionAlg = LZMAAlg;
    }
    // Set page title
    this.pageTitle = titleAndCode.pageTitle;
    // Set <title>
    document.title   = titleAndCode.pageTitle;
    // Set decoded location.hash as default script
    this.script = await decodeCode(titleAndCode.encodedCode, this.compressionAlg.decompress);
    // Set enable-click-run
    this.enableClickRun = titleAndCode.urlOptions.includes("click_run");
    // Set enable-promise-wait
    this.enablePromiseWait = titleAndCode.urlOptions.includes("promise_wait");
    if (titleAndCode.urlOptions.includes("es2017")) {
      this.transpiler = Es2017Transpiler;
    } else if (titleAndCode.urlOptions.includes("func_es2017")) {
      this.transpiler = FuncEs2017Transpiler;
    }
    // Initialize library
    this.transpiler.initLibrary();
    // Set default value to global variable "INPUT"
    // TODO: duplicate code
    (window as any).INPUT = this.inputText;
    // Get device info
    const deviceInfo = uaDeviceDetector.parseUserAgent(window.navigator.userAgent);
    // Set click-run button text
    this.clickRunButtonText = "Run" + (deviceInfo.isDesktop() ? (deviceInfo.os === "mac"? "(⌘+Enter)" : "(Ctrl+Enter)") : "");
    // If enable click_run is disable
    if (!this.enableClickRun) {
      // Set default output
      this.setOutputText();
    }

    window.addEventListener('keydown', (e: WindowEventMap['keydown']) => {
      if((e.ctrlKey || e.metaKey) && e.key === "Enter") {
        Vue.nextTick(()=>{
          // Run onclick click-run
          this.onClickClickRun();
        })
      }
    });
  }

  @Watch("pageTitle")
  async onChangePageTitle(): Promise<void> {
    // Set page title
    document.title = this.pageTitle;
    // Set location.hash
    await this.setLocationHash();
  }

  @Watch('compressionAlg')
  async onChangeCompressionAlg() {
    // Update location.hash
    await this.setLocationHash();
  }

  @Watch("script")
  async onChangeScript(): Promise<void> {
    // Set location.hash
    await this.setLocationHash();
    // Transpile
    await this.transpile();
  }

  // NOTE: { tabSize: number } is valid because: https://github.com/egoist/vue-monaco/blob/1c138c8acd9ab08dbbdcf34c88933bcc736f85da/example/index.js#L43
  get monacoOptions(): monacoEditor.editor.IEditorConstructionOptions & { language: string } | { tabSize: number } {
    const language = this.transpiler === RubyTranspiler ? 'ruby': 'javascript';
    return {
      language: language,
      minimap: { enabled: false },
      fontSize: 15,
      tabSize: 2,
      automaticLayout: true
    };
  }

  async setLocationHash() {
    // Create title part
    const titlePart = (this.pageTitle).replace(/ /g, "_");
    // Create options part
    const urlOptionsPart = this.getUrlOptionsPart();
    // Encode code
    const encodedCode = await encodeCode(this.script, this.compressionAlg.compress);
    // Change location hash to the code
    location.hash = titlePart+"/"+urlOptionsPart+"/"+encodedCode;
  }

  // Generate options part
  getUrlOptionsPart(): string {
    const options: string[] = [];
    // (NOTE: transpiler:ruby is default so it should be pushed)
    if (this.transpiler === Es2017Transpiler) {
      options.push("es2017");
    } else if (this.transpiler === FuncEs2017Transpiler) {
      options.push("func_es2017");
    }
    // (NOTE: compression:deflate is default so it should be pushed)
    if (this.compressionAlg === LZMAAlg) {
      options.push("lzma");
    }
    // If click_run is enable
    if (this.enableClickRun) {
      options.push("click_run");
    }
    // If promise_wait is enable
    if (this.enablePromiseWait) {
      options.push("promise_wait");
    }
    // Generate options part
    return options.join(",");
  }

  // (NOTE: this is not typo. onclick "click_run")
  onClickClickRun() {
    // Set output text
    this.setOutputText();
  }

  async onChangeTranspiler() {
    // Initialize library
    this.transpiler.initLibrary();
    // Ensure to call once
    this.transpiler.initLibrary = () => Promise.resolve();
    // Update location.hash
    await this.setLocationHash();
    // Transpile
    await this.transpile();
  }

  async transpile() {
    try {
      // Transpile script and Set executable function
      const executableFunctionAndTraspiledJsCode = await this.transpiler.getExecutableFunctionAndTranspiledJsCode(this.script);
      this.executableFunction = executableFunctionAndTraspiledJsCode.executableFunction;
      this.transpiledJsCode = executableFunctionAndTraspiledJsCode.transpiledJsCode;
      this.errorStr = "";
      this.hasError = false;
      // If enable click_run is disable
      if (!this.enableClickRun) {
        // Set output text
        this.setOutputText();
      }
    } catch (err: any) {
      // console.log("Transpile compile", err);
      this.errorStr = err.toString();
      this.hasError = true;
    }
  }

  @Watch("inputText")
  onChangeInputText() {
    // If enable click_run is disable
    if (!this.enableClickRun) {
      // Set output text
      this.setOutputText();
    }
  }

  // Set output text
  setOutputText(){
    // Set global INPUT string variable
    (window as any).INPUT = this.inputText;
    try {
      // Get output
      const output = this.executableFunction();
      // If promise-wait is enable
      if(this.enablePromiseWait && output !== undefined) {
        // Get prototype of the object
        const proto = Object.getPrototypeOf(output);
        // If the output object is a Promise
        if(proto === Promise.prototype) {
          this.outputText = "<The promise is not complete yet>";
          output
            .then((res: any) => {
              Vue.nextTick(() => {
                this.outputText = res + "";
                // Set no error
                this.errorStr = "";
                this.hasError = false;
              });
            })
            .catch((err: Error) => {
              Vue.nextTick(()=>{
                this.outputText = "<Promise error: " + err.toString() + ">";
                this.errorStr = err.toString();
                this.hasError = true;
              });
            });
        }
      } else {
        // Set output text
        this.outputText = output + "";
        // Set no error
        this.errorStr = "";
        this.hasError = false;
      }
    } catch (err: any) {
      // console.log("JS Runtime error", err);
      this.outputText = "";
      this.errorStr = err.toString();
      this.hasError = true;
    }
  }

  shareOnTwitter() {
    // (from: http://d.hatena.ne.jp/osyo-manga/20140717/1405626111)
    const url = 'https://twitter.com/share?text='+encodeURIComponent(this.pageTitle)+"&url=" + encodeURIComponent(location.href)+"&hashtags=nipp";
    window.open(url,'','scrollbars=yes,width=500,height=300,');
  }
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
