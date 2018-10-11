'use strict';
/**
*  Module ace.angular
*
* Description to use Ace Editor in angular JS
*/
angular.module('ace.angular',[])
.directive('aceEditor', function() {
	if (angular.isUndefined(window.ace)) {
		throw new Error('ace-angular need ace to work...');
	}

	return {
		restrict: 'EA',
		require: '?ngModel',
		link: function (scope, elm, attrs, ngModel) {
			var editor = window.ace.edit(elm[0]);

			var session = editor.getSession();

			var options = scope.$eval(attrs.aceEditor) || {};

			if(options.mode){
				session.setMode("ace/mode/"+options.mode);
			}

			if(options.require){
				for(var i in options.require){
					window.ace.require(options.require[i]);
				}
			}

			if (options.theme) {
				editor.setTheme("ace/theme/"+options.theme);
			}

			if (options.advanced) {
				editor.setOptions(options.advanced);
			}

			if(options.onLoad){
				options.onLoad(editor, session, window.ace);
			}

			elm.on('$destroy', function () {
				editor.session.$stopWorker();
				editor.destroy();
			});

			scope.$watch(function() {
				return [elm[0].offsetWidth, elm[0].offsetHeight];
			}, function() {
				editor.resize();
				editor.renderer.updateFull();
			}, true);

            session.on("change", function(e){
                ngModel.$setViewValue(session.getValue());
            });

            ngModel.$render = function(){
                session.setValue(ngModel.$viewValue)
            };

        }
	}

});
