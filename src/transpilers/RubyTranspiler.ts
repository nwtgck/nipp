import {type Transpiler} from "@/transpilers/Transpiler";
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

export const RubyTranspiler: Transpiler = {
  id: Symbol(),
  name: "Ruby",
  initLibrary: async () => {
    const Opal = await OpalAsync();
    Opal.load('opal');
    Opal.load('opal-parser');
  },
  getExecutableFunctionAndTranspiledJsCode: async (rubyScript: string, enableTopLevelAwaitIfPossible: boolean) => {
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
