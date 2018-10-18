'use strict';
// (from: https://github.com/jayralencar/ace-angular)
// NOTE: This may be changed to forked repo of jayralencar/ace-angular if it's stable

/**
 *  Module ace.angular
 *
 * Description to use Ace Editor in angular JS
 */
angular.module('ace.angular', [])
    .directive('aceEditor', function() {
      if (angular.isUndefined(window.ace)) {
        throw new Error('ace-angular need ace to work...');
      }

      return {
        restrict: 'EA',
        require: '?ngModel',
        link: function(scope, elm, attrs, ngModel) {
          var editor = window.ace.edit(elm[0]);

          var session = editor.getSession();

          function updateOptions() {

            var options = scope.$eval(attrs.aceEditor) || {};

            if (options.mode) {
              session.setMode("ace/mode/" + options.mode);
            }

            if (options.require) {
              for (var i in options.require) {
                window.ace.require(options.require[i]);
              }
            }

            if (options.theme) {
              editor.setTheme("ace/theme/" + options.theme);
            }

            if (options.advanced) {
              editor.setOptions(options.advanced);
            }

            if (options.onLoad) {
              options.onLoad(editor, session, window.ace);
            }
          }

          // Initialize options
          updateOptions();

          // Watch options
          // (from: https://github.com/angular-ui/ui-ace/blob/4c62a97e0adc60b7cde2be4caf902ac95c5c8c34/src/ui-ace.js#L308)
          scope.$watch(
              attrs.aceEditor,
              function(current, previous) {
                if (current === previous) return;

                updateOptions();
              },
              /* deep watch */
              true
          );

          elm.on('$destroy', function() {
            editor.session.$stopWorker();
            editor.destroy();
          });

          scope.$watch(function() {
            return [elm[0].offsetWidth, elm[0].offsetHeight];
          }, function() {
            editor.resize();
            editor.renderer.updateFull();
          }, true);

          session.on("change", function(e) {
            ngModel.$setViewValue(session.getValue());
          });

          ngModel.$render = function() {
            session.setValue(ngModel.$viewValue)
          };

        }
      }

    });