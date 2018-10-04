// Escape string to be used as string literal
function escapeString(str) {
  return str.replace(/\n/g, "\\n").replace(/"/g, '\\"').replace(/'/g, "\\'");
}

angular.module("nipp", [])
  .controller('mainCtrl', ['$scope', function($scope){
    $scope.inputText  = "";
    $scope.rubyScript = "";

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
