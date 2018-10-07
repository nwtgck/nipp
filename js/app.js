// Encode code
function encodeCode(code) {
  try {
    // NOTE: Negative windowBits means no header and no checksum
    // (see: https://docs.python.org/3.6/library/zlib.html#zlib.decompress)
    var binStr = pako.deflate(code, {to: 'string', level: 9, windowBits: -8});
    return btoa(binStr);
  } catch (err) {
    return "";
  }
}

// Decode code
function decodeCode(encodedCode) {
  try {
    // Base64 => binary String
    var binStr = atob(encodedCode);
    // NOTE: Negative windowBits means no header and no checksum
    // (see: https://docs.python.org/3.6/library/zlib.html#zlib.decompress)
    return pako.inflate(binStr, {to: 'string', windowBits: -8});
  } catch (err) {
    return "";
  }
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

// Parse location.hash and return page title and code
function parseLocationHash() {
  // Find "/" in location.hash
  var slashIdx = location.hash.indexOf("/")
  // If "/" not found
  if(slashIdx === -1){
    slashIdx = location.hash.length
  }
  // Get page title
  var title = decodeURI((location.hash.substring(1, slashIdx)).replace(/_/g, " "));
  // Get encoded code
  var encodedCode = location.hash.substring(slashIdx+1, location.hash.length)
  // Get code
  var code = decodeCode(encodedCode);
  return {
    pageTitle: title,
    code: code
  };
}

angular.module("nipp", [])
  // NOTE: Don't use $location.hash() because it escapes "/"
  .controller('mainCtrl', ['$scope', function($scope){
    // Parse query string
    var locationQuery = URLParse.qs.parse(location.search);
    // Get page title and code
    var titleAndCode = parseLocationHash();
    // Set page title
    $scope.pageTitle = titleAndCode.pageTitle;
    document.title   = titleAndCode.pageTitle;
    // Set empty string as default input
    $scope.inputText  = "";
    // Set decoded location.hash as default script
    $scope.script = titleAndCode.code;
    // Executable function which return result
    var executableFunction = function(){return "";};
    // Set default output
    setOutputText();
    // Set transpiler
    var transpiler;
    // Get query
    var queryKeys = Object.keys(locationQuery);
    if (queryKeys.includes("es2017")) {
      console.log("Mode: ES2017");
      transpiler = Es2017Transpiler;
    } else {
      console.log("Mode: Opal");
      // Setup Opal
      setupOpal();
      // Ensure to call once
      setupOpal = function(){};
      transpiler = RubyTranspiler;
    }
    // Set default value to global variable "INPUT"
    window.INPUT = $scope.inputText;

    // Set location.hash
    function setLocationHash() {
      // Encode code
      var encodedCode = encodeCode($scope.script);
      // Change location hash to the code
      location.hash = ($scope.pageTitle).replace(/ /g, "_")+"/"+encodedCode;
    }

    $scope.$watch("pageTitle", function(){
      // Set page title
      document.title = $scope.pageTitle;
      // Set location.hash
      setLocationHash();
    });

    $scope.$watch('inputText', function(){
      // Set output text
      setOutputText();
    });

    // Watch script changes
    // (from: https://stackoverflow.com/a/15424144/2885946)
    $scope.$watch('script', function(){
      // Set location.hash
      setLocationHash();

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
