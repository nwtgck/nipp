var app = angular.module('app_test',['ace.angular']);

app.controller('Controller', ['$scope', function($scope){
	$scope.change = function(){
		console.log($scope.test)
	}

	$scope.aceOptions = {
		mode: 'sql',
		theme:'sqlserver',
		require: ["ace/ext/language_tools"],
		advanced:{
			enableBasicAutocompletion: true,
			enableSnippets: true,
			enableLiveAutocompletion: false,
			autoScrollEditorIntoView: true,
		},
		onLoad: function(editor, session, ace){
			$scope.langTools = ace.require("ace/ext/language_tools");
		}
	}
}])
