// json-editor.directive.js
/**
 * @desc json-editor directive that is specific to the json-editor module
 * @example <json-editor json="data"></json-editor>
 */

//const json_editor_template = require('json-editor.html');

(function () {
    'use strict';

    angular
        .module('json-editor')

        .directive('jsonEditor', jsonEditor)

    function jsonEditor() {

        let templateHtml = require('./json-editor.tpl.html').default;

        return {

            link: link,
            template: templateHtml,
            scope: {'json': '='},
            restrict: 'E'

        };

        function link(scope) {

            scope.options = {mode: 'tree'};

            scope.pretty = function (obj) {
                return JSON.stringify(obj, null, 2);
            };

        }

    }
})();