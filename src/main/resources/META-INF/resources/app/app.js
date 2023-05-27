

(function () {
    'use strict';

    var app = angular.module("appModule", []);

    app.component('someComponent', {
        bindings: {
            textBinding: '@',
            dataBinding: '<',
            functionBinding: '&'
        },
        controller: SomeComponentController,
        templateUrl: 'some-component.html'
    });
 
    function SomeComponentController () {
        var vm = this;
 
        vm.add = function (){
            vm.functionBinding();
        };
    }

})();