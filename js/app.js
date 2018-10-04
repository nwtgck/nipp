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

angular.module("nipp", [])
  .controller('mainCtrl', ['$scope', '$location', function($scope, $location){
    // Set empty string as default input
    $scope.inputText  = "";
    // Set decoded location.hash as default Ruby script
    $scope.rubyScript = b64DecodeUnicode($location.hash());
    // Transpiled JS code from Ruby
    var transpiledJsCode = "";

    // Watch Ruby script changes
    // (from: https://stackoverflow.com/a/15424144/2885946)
    $scope.$watch('rubyScript', function(){
      // Convert Ruby script to Base64
      var base64RubyScript = b64EncodeUnicode($scope.rubyScript);
      // Change location hash to the code
      $location.hash(base64RubyScript);

      try {
        // Use javascript global variable "INPUT"
        // (NOTE: `INPUT` will be pure JavaScript string variable)
        var rubyScriptWithInput = 's = `INPUT`\n' + $scope.rubyScript;
        transpiledJsCode = Opal.compile(rubyScriptWithInput);
      } catch (err) {
        console.log("Ruby compile", err);
      }
    }, true);

    $scope.outputText = function(){
      // Set global INPUT string variable
      window.INPUT = $scope.inputText;
      try {
        var rubyOutput = eval(transpiledJsCode);
      } catch (err) {
        console.log("JS error", err)
      }
      return rubyOutput;
    };
  }]);
