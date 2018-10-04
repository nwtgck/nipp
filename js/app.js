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

// (from: https://qiita.com/weal/items/1a2af81138cd8f49937d)
var Base64 = {
  encode: (function(i, tbl) {
      for(i=0,tbl={64:61,63:47,62:43}; i<62; i++) {tbl[i]=i<26?i+65:(i<52?i+71:i-4);} //A-Za-z0-9+/=
      return function(arr) {
          var len, str, buf;
          if (!arr || !arr.length) {return "";}
          for(i=0,len=arr.length,buf=[],str=""; i<len; i+=3) { //6+2,4+4,2+6
              str += String.fromCharCode(
                  tbl[arr[i] >>> 2],
                  tbl[(arr[i]&3)<<4 | arr[i+1]>>>4],
                  tbl[i+1<len ? (arr[i+1]&15)<<2 | arr[i+2]>>>6 : 64],
                  tbl[i+2<len ? (arr[i+2]&63) : 64]
              );
          }
          return str;
      };
  }()),
  decode: (function(i, tbl) {
      for(i=0,tbl={61:64,47:63,43:62}; i<62; i++) {tbl[i<26?i+65:(i<52?i+71:i-4)]=i;} //A-Za-z0-9+/=
      return function(str) {
          var j, len, arr, buf;
          if (!str || !str.length) {return [];}
          for(i=0,len=str.length,arr=[],buf=[]; i<len; i+=4) { //6,2+4,4+2,6
              for(j=0; j<4; j++) {buf[j] = tbl[str.charCodeAt(i+j)||0];}
              arr.push(
                  buf[0]<<2|(buf[1]&63)>>>4,
                  (buf[1]&15)<<4|(buf[2]&63)>>>2,
                  (buf[2]&3)<<6|buf[3]&63
              );
          }
          if (buf[3]===64) {arr.pop();if (buf[2]===64) {arr.pop();}}
          return arr;
      };
  }())
};


function lzma64Encode(s){
  return Base64.encode(LZMA.compress(s, 9));
}

function lzma64Decode(s){
  return LZMA.decompress(Base64.decode(s));
}

angular.module("nipp", [])
  .controller('mainCtrl', ['$scope', '$location', function($scope, $location){
    // Set empty string as default input
    $scope.inputText  = "";
    // Set decoded location.hash as default Ruby script
    $scope.rubyScript = ""; // lzma64Decode($location.hash()); //""; // b64DecodeUnicode($location.hash());


    // console.log(LZMA);
    // var a = LZMA.compress("hello, world");
    // console.log(a);
    // var b = Base64.encode(a);
    // console.log(b);

    // Watch Ruby script changes
    // (from: https://stackoverflow.com/a/15424144/2885946)
    $scope.$watch('rubyScript', function(){
      // var compressed = LZMA.compress($scope.rubyScript, 9);
      // console.log(compressed);
      // Convert Ruby script to Base64
      var base64RubyScript = lzma64Encode($scope.rubyScript);//Base64.encode(compressed);
      // console.log(base64RubyScript);
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
