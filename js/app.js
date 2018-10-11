var DeflateAlg = {
  name: "Deflate",
  compress: function(str){
    // NOTE: Negative windowBits means no header and no checksum
    // (see: https://docs.python.org/3.6/library/zlib.html#zlib.decompress)
    var binStr = pako.deflate(str, {to: 'string', level: 9, windowBits: -8});
    return binStr;
  },
  decompress: function(binStr){
    // NOTE: Negative windowBits means no header and no checksum
    // (see: https://docs.python.org/3.6/library/zlib.html#zlib.decompress)
    return pako.inflate(binStr, {to: 'string', windowBits: -8});
  }
};

var LZMAAlg = {
  name: "LZMA",
  compress: function(str) {
    var compressed = LZMA.compress(str, 9);
    // (from: https://github.com/alcor/itty-bitty/blob/5292c4b7891939dab89412f9e474bca707c9bec5/data.js#L25)
    return String.fromCharCode.apply(null, new Uint8Array(compressed));
  },
  decompress: function(binStr) {
    return LZMA.decompress(binStr.split('').map(function(c){return c.charCodeAt(0)}));
  }
};

// Encode code
function encodeCode(code, compressor) {
  try {
    var binStr = compressor(code);
    return btoa(binStr);
  } catch (err) {
    return "";
  }
}

// Decode code
function decodeCode(encodedCode, decompressor) {
  try {
    // Base64 => binary String
    var binStr = atob(encodedCode);
    return decompressor(binStr);
  } catch (err) {
    return "";
  }
}

var RubyTranspiler = {
  name: "Ruby",
  aceEditorMode: "ruby",
  initLibrary: function(){
    Opal.load('opal');
    Opal.load('opal-parser');
  },
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
  name: "ES2017",
  aceEditorMode: "javascript",
  initLibrary: function(){},
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


// Parse location.hash and return page title and code
function parseLocationHash() {
  // Split by "/"
  var splited = location.hash.split("/");
  if(splited.length >= 3) {
    // Get title
    var title = decodeURI(splited[0].substring(1).replace(/_/g, " "));
    // Get URL options
    var urlOptions = splited[1].split(",");
    // Get encoded code
    var encodedCode = splited.slice(2, splited.length).join("/");
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

angular.module("nipp", ['ui.ace'])
  // NOTE: Don't use $location.hash() because it escapes "/"
  .controller('mainCtrl', ['$scope', function($scope){
    // Get page title and code
    var titleAndCode = parseLocationHash();
    $scope.compressionAlgs = [
      DeflateAlg,
      LZMAAlg
    ];
    // Compression algorithm
    $scope.compressionAlg = $scope.compressionAlgs[0];
    if (titleAndCode.urlOptions.includes("lzma")) {
      $scope.compressionAlg = LZMAAlg;
    }
    // Set page title
    $scope.pageTitle = titleAndCode.pageTitle;
    document.title   = titleAndCode.pageTitle;
    // Set empty string as default input
    $scope.inputText  = "";
    // Set decoded location.hash as default script
    $scope.script = decodeCode(titleAndCode.encodedCode, $scope.compressionAlg.decompress);
    // Executable function which return result
    var executableFunction = function(){return "";};
    // Set default output
    setOutputText();
    $scope.transpilers = [
      RubyTranspiler,
      Es2017Transpiler
    ];
    // Set transpiler
    $scope.transpiler = RubyTranspiler;
    if (titleAndCode.urlOptions.includes("es2017")) {
      $scope.transpiler = Es2017Transpiler;
    }
    // Initialize library
    $scope.transpiler.initLibrary();
    // Set default value to global variable "INPUT"
    window.INPUT = $scope.inputText;

    // Generate options part
    function getUrlOptionsPart() {
      var options = [];
      // (NOTE: transpiler:ruby is default so it should be pushed)
      if ($scope.transpiler === Es2017Transpiler) {
        options.push("es2017");
      }
      // (NOTE: compression:deflate is default so it should be pushed)
      if ($scope.compressionAlg === LZMAAlg) {
        options.push("lzma");
      }
      // Generate options part
      var options = options.join(",");
      return options;
    }

    // Set location.hash
    function setLocationHash() {
      // Create title part
      var titlePart = ($scope.pageTitle).replace(/ /g, "_");
      // Create options part
      var urlOptionsPart = getUrlOptionsPart();
      // Encode code
      var encodedCode = encodeCode($scope.script, $scope.compressionAlg.compress);
      // Change location hash to the code
      location.hash = titlePart+"/"+urlOptionsPart+"/"+encodedCode;
    }

    $scope.$watch("pageTitle", function(){
      // Set page title
      document.title = $scope.pageTitle;
      // Set location.hash
      setLocationHash();
    });

    $scope.onChangeInputText = function(){
      // Set output text
      setOutputText();
    };

    $scope.onChangeTranspiler = function(){
      // Initialize library
      $scope.transpiler.initLibrary();
      // Ensure to call once
      $scope.transpiler.initLibrary = function(){};
      // Update location.hash
      setLocationHash();
      // Transpile
      $scope.transpile();
    };

    $scope.transpile = function(){
      try {
        // Transpile script and Set executable function
        executableFunction = $scope.transpiler.getExecutableFunction($scope.script);
        // Set output text
        setOutputText();
      } catch (err) {
        console.log("Transpile compile", err);
      }
    };

    $scope.$watch('compressionAlg', function(){
      // Update location.hash
      setLocationHash();
    });

    // Watch script changes
    // (from: https://stackoverflow.com/a/15424144/2885946)
    $scope.$watch('script', function(){
      // Set location.hash
      setLocationHash();
      // Transpile
      $scope.transpile();
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

    $scope.shareOnTwitter = function(){
      // (from: http://d.hatena.ne.jp/osyo-manga/20140717/1405626111)
      var url = 'https://twitter.com/share?text='+encodeURIComponent($scope.pageTitle)+"&url=" + encodeURIComponent(location.href);
      window.open(url,'','scrollbars=yes,width=500,height=300,');
    };

    // Script editor onload
    $scope.onLoadScriptEditor = function(editor) {
      editor.setFontSize(14);
    };
  }]);
