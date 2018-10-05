// Base64 encode
// (from: https://developer.mozilla.org/en-US/docs/Web/API/WindowBase64/Base64_encoding_and_decoding)
function b64EncodeUnicode(str) {
  // first we use encodeURIComponent to get percent-encoded UTF-8,
  // then we convert the percent encodings into raw bytes which
  // can be fed into btoa.
  return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
      function toSolidBytes(match, p1) {
          return String.fromCharCode('0x' + p1);
  }));
}

// Base64 decode
// (from: https://developer.mozilla.org/en-US/docs/Web/API/WindowBase64/Base64_encoding_and_decoding)
function b64DecodeUnicode(str) {
  // Going backwards: from bytestream, to percent-encoding, to original string.
  return decodeURIComponent(atob(str).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));
}

var RubyTranspiler = {
  getExecutableFunction: function(rubyScript){
    // Use javascript global variable "INPUT"
    // (NOTE: `INPUT` will be pure JavaScript string variable)
    var rubyScriptWithInput = 's = `window.INPUT`\n' + rubyScript;
    // Transpile Ruby to JavaScript
    var transpiledJsCode = Opal.compile(rubyScriptWithInput);
    // Remove the first comment from transpiled code
    transpiledJsCode = transpiledJsCode.replace(/\/\*.*\*\/\s*/, '');
    // Set executable function
    var executableFunction = new Function("return " + transpiledJsCode);
    return executableFunction;
  }
}

var Es2017Transpiler = {
  getExecutableFunction: function(script){
    // Use javascript global variable "INPUT" 
    // (NOTE: `INPUT` will be pure JavaScript string variable)    
    var scriptWithInput = 'var s = window.INPUT;\n' + script;
    // Transpile
    var code = Babel.transform(scriptWithInput, {presets: ["es2017"]}).code;
    return function(){
      return eval(code);
    };
  }
}

// Setup opal
var setupOpal = function(){
  Opal.load('opal');
  Opal.load('opal-parser');
};

angular.module("nipp", [])
  // NOTE: Don't use $location.hash() because it escapes "/"
  .controller('mainCtrl', ['$scope', function($scope){
    // Set empty string as default input
    $scope.inputText  = "";
    // Set decoded location.hash as default script
    $scope.script = b64DecodeUnicode(location.hash.substring(1));
    // Executable function which return result
    var executableFunction = function(){return "";};
    // Set default output
    setOutputText();
    // Set transpiler
    var transpiler;
    switch (location.search) {
      case "?es2017":
        console.log("Mode: ES2017")
        transpiler = Es2017Transpiler;
        break;
      default:
        console.log("Mode: Opal");
        // Setup Opal
        setupOpal();
        // Ensure to call once
        setupOpal = function(){};
        transpiler = RubyTranspiler;
    }
    // Set default value to global variable "INPUT"
    window.INPUT = $scope.inputText;

    $scope.$watch('inputText', function(){
      // Set output text
      setOutputText();
    });

    // Watch script changes
    // (from: https://stackoverflow.com/a/15424144/2885946)
    $scope.$watch('script', function(){
      // Convert script to Base64
      var base64Script = b64EncodeUnicode($scope.script);
      // Change location hash to the code
      location.hash = base64Script;

      try {
        // Transpile script and Set executable function
        executableFunction = transpiler.getExecutableFunction($scope.script);
        // Set output text
        setOutputText();
      } catch (err) {
        console.log("Transpile compile", err);
      }
    }, true);

    function setOutputText(){
      // Set global INPUT string variable
      window.INPUT = $scope.inputText;
      try {
        var output = executableFunction();
      } catch (err) {
        console.log("JS Runtime error", err)
      }
      // Set output text
      $scope.outputText = output;
    };
  }]);
