// json-editor.directive.js
/**
 * @desc angular-json-editor directive that is specific to the json-editor module
 * @example <angular-json-editor ng-model="json" options="options" style="width: 100%; height: 400px;"></angular-json-editor>
 */

(function () {
    'use strict';

    angular
        .module('json-editor')

        .directive('angularJsonEditor', angularJsonEditor)

    function angularJsonEditor() {

        return {
            link: link,
            scope: {'options': '='},
            require: 'ngModel',
            restrict: 'E',
        };

        function link($scope, element, attrs, ngModel) {

            let editor = createEditor($scope, ngModel, $scope.options)

            $scope.$watch('options', function (newValue, oldValue) {
                for (let k in newValue) {
                    if (newValue.hasOwnProperty(k)) {
                        let v = newValue[k];
                        if (newValue[k] !== oldValue[k]) {
                            if (k === 'mode') {
                                editor.setMode(v);
                            } else if (k === 'name') {
                                editor.setName(v);
                            } else {
                                // other settings cannot be changed without re-creating the JsonEditor
                                editor = createEditor($scope, ngModel, newValue);
                                $scope.updateJsonEditor();
                                return;
                            }
                        }
                    }
                }
            }, true);

            $scope.$on('$destroy', function () {
                editor = null;
            });

            $scope.updateJsonEditor = function () {
                editor.set(ngModel.$viewValue || {});
            };

            ngModel.$render = $scope.updateJsonEditor;

            $scope.$watch(function () {
                return ngModel.$modelValue
            }, function (newValue) {
                // Do not update 2 times
                if (!angular.equals(newValue, editor.get())) {
                    $scope.updateJsonEditor();
                }
            }, true);

            function createEditor($scope, ngModel, options) {
                let settings = angular.extend({}, {}, options);
                settings.onChange = function () {
                    let isValid = false;
                    try {
                        ngModel.$setViewValue(editor.get());
                        isValid = true;
                    } catch (err) {
                        throw err;
                    } finally {
                        // Update field validation
                        ngModel.$setValidity('json', isValid);
                        ngModel.$setTouched();
                        $scope.$apply();
                        // If the user specified a onChange callback, trigger it
                        if (options.onChange && typeof options.onChange === 'function') {
                            options.onChange();
                        }
                    }
                };
                element.html('');
                return new JSONEditor(element[0], settings);
            }

        }

    }

})();