<template>
  <!-- TODO: Remove angular attributes start with "ng-" -->
  <div ng-controller="mainCtrl">
      <form class="pure-form pure-g">
        <input type="text" ng-model="pageTitle" placeholder="App name" class="pure-u-11-12">
        <div class="pure-u-1-12" style="text-align: center">
          <img src="../assets/twitter.png" alt="Share on Twitter" ng-click="shareOnTwitter()" style="width: 2em; height: 2em;">
        </div>
      </form>

      <div class="pure-g">
        <div class="pure-u-1">
          <!-- TODO: Add proper Editor -->
          <!-- <div ace-editor="{onLoad: onLoadScriptEditor, mode: transpiler.aceEditorMode, advanced: {tabSize: 2}}" ng-hide="useTextarea" style="height:10em" ng-model="script"></div> -->
          <textarea v-model="script" style="height:10em; width: 100%" placeholder="Code"></textarea>
        </div>
      </div>
      <form class="pure-form pure-form-aligned">
        <label for="transpiler">Transpiler:</label>
        <select id="transpiler" ng-options="t.name for t in transpilers" ng-change="onChangeTranspiler()" ng-model="transpiler">
        </select>

        <label for="compression_alg">Compression:</label>
        <select id="compression_alg" ng-options="a.name for a in compressionAlgs" ng-model="compressionAlg">
        </select>

        <input type="checkbox" ng-change="setLocationHash()" ng-model="enableClickRun">: click_run
        <input type="checkbox" ng-change="setLocationHash()" ng-model="enablePromiseWait">: promise_wait

        <input type="checkbox" ng-model="useTextarea">: Use &lt;textarea&gt;

        <button ng-if="enableClickRun" ng-bind="::clickRunButtonText" ng-click="onClickClickRun()" class="pure-button" style="color: white; background: rgb(28, 184, 65)"></button>
      </form>

      <form class="pure-form pure-g">
        <textarea v-model="inputText" placeholder="Input" rows="10" class="pure-u-1 pure-u-md-1-2"></textarea>
        <textarea v-model="outputText" placeholder="Output" rows="10" class="pure-u-1 pure-u-md-1-2"></textarea>
      </form>

      <button ng-click="setShowError(!showError)" ng-style="{color: hasError? 'red': ''}" class="pure-button">Show/Hide error</button>
      <span ng-if="showError">
        <div class="pure-g">
          <textarea class="pure-u-1" ng-model="errorStr"></textarea>
        </div>
      </span>

      <button ng-click="setShowTranspiledJsCode(!showTranspiledJsCode)" class="pure-button">Show/Hide transpiled JS code</button>
      <span ng-if="showTranspiledJsCode">
        <div class="pure-g">
          <div class="pure-u-1">
            <!-- TODO: Add proper Editor -->
            <!-- <div ace-editor="{mode: 'javascript'}" ng-if="!useTextarea" style="height:10em" ng-model="transpiledJsCode"></div> -->
            <textarea ng-if="useTextarea" style="height:10em; width: 100%" ng-model="transpiledJsCode"></textarea>
          </div>
        </div>
      </span>
    </div>
</template>

<script lang="ts">
  import {Component, Prop, Vue, Watch} from 'vue-property-decorator';

// Get Opal object
const Opal = (window as any).Opal

type Transpiler = {
  name: string,
  aceEditorMode: string,
  initLibrary: () => void,
  getExecutableFunctionAndTranspiledJsCode: (rubyScript: string) => { executableFunction: Function, transpiledJsCode: string }
};

// TODO: Move proper place
const RubyTranspiler: Transpiler = {
  name: "Ruby",
  aceEditorMode: "ruby",
  initLibrary: () => {
    Opal.load('opal');
    Opal.load('opal-parser');
  },
  getExecutableFunctionAndTranspiledJsCode: (rubyScript: string) => {
    // Use javascript global variable "INPUT"
    // (NOTE: `INPUT` will be pure JavaScript string variable)
    var rubyScriptWithInput = 's = `window.INPUT`\n' + rubyScript;
    // Transpile Ruby to JavaScript
    var transpiledJsCode = Opal.compile(rubyScriptWithInput);
    // Remove the first comment from transpiled code
    transpiledJsCode = transpiledJsCode.replace(/\/\*.*\*\/\s*/, '');
    // Set executable function
    var executableFunction = new Function("return " + transpiledJsCode);
    return {
      executableFunction: executableFunction,
      transpiledJsCode: transpiledJsCode
    };
  }
};

// Initialize Opal
// TODO: Move proper place
RubyTranspiler.initLibrary();

@Component
export default class Nipp extends Vue {
  script: string = "";
  transpiler: Transpiler = RubyTranspiler; // TODO: impl
  inputText: string = "";
  outputText: string = "";
  errorStr: string = "";
  hasError: boolean = false;
  enableClickRun: boolean = false; // TODO: impl
  // Generated JavaScript code
  transpiledJsCode = "";
  // Executable function which return result
  private executableFunction: Function = function(){return "";};
  enablePromiseWait: boolean = false; // TODO: impl

  @Watch("script")
  onChangeScript(): void {
    // Set location.hash
    this.setLocationHash();
    // Transpile
    this.transpile();
  }

  setLocationHash = function() {
    // TODO: impl
    // // Create title part
    // var titlePart = ($scope.pageTitle).replace(/ /g, "_");
    // // Create options part
    // var urlOptionsPart = getUrlOptionsPart();
    // // Encode code
    // var encodedCode = encodeCode($scope.script, $scope.compressionAlg.compress);
    // // Change location hash to the code
    // location.hash = titlePart+"/"+urlOptionsPart+"/"+encodedCode;
  };

  transpile() {
    try {
      // Transpile script and Set executable function
      const executableFunctionAndTraspiledJsCode = this.transpiler.getExecutableFunctionAndTranspiledJsCode(this.script);
      this.executableFunction = executableFunctionAndTraspiledJsCode.executableFunction;
      this.transpiledJsCode = executableFunctionAndTraspiledJsCode.transpiledJsCode;
      this.errorStr = "";
      this.hasError = false;
      // If enable click_run is disable
      if (!this.enableClickRun) {
        // Set output text
        this.setOutputText();
      }
    } catch (err) {
      console.log("Transpile compile", err);
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
                this.outputText = res;
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
        this.outputText = output;
        // Set no error
        this.errorStr = "";
        this.hasError = false;
      }
    } catch (err) {
      console.log("JS Runtime error", err);
      this.outputText = "";
      this.errorStr = err.toString();
      this.hasError = true;
    }
  };

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
