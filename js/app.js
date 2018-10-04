// Escape string to be used as string literal
function escapeString(str) {
  return str.replace(/\n/g, "\\n").replace(/"/g, '\\"').replace(/'/g, "\\'");
}

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

    // Watch Ruby script changes
    // (from: https://stackoverflow.com/a/15424144/2885946)
    $scope.$watch('rubyScript', function(){
      // Convert Ruby script to Base64
      var base64RubyScript = b64EncodeUnicode($scope.rubyScript);
      // Change location hash to the code
      $location.hash(base64RubyScript);
    }, true);

    $scope.outputText = function(){
      var rubyScriptWithInput = 's = "' + escapeString($scope.inputText) + '"\n' + $scope.rubyScript
      try {
        var jsCode = Opal.compile(rubyScriptWithInput);
        var rubyOutput = eval(jsCode);
      } catch (err) {
        console.log("Ruby or JS error", err)
      }
      return rubyOutput;
    };
  }]);
