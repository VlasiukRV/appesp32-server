var app = angular.module('app', [
    'ui.bootstrap',
    'ngResource',
    'ngRoute',
    'ngCookies',
    'oi.select',
    'cfp.hotkeys',

    'angular-json-editor',
    'data-analise-chart',

    'module.config',
    'module.core',

    'module.ui.main-menu',
    'module.ui.edit-form',
    'module.ui.list-form',

    'module.ui'
]);

// Configs
app
    .config(['$locationProvider', function ($locationProvider) {
        $locationProvider.hashPrefix('');
    }])
    .config(['$httpProvider', function ($httpProvider) {
        $httpProvider.interceptors.push('myHttpResponseInterceptor');
    }])
    .config(['$routeProvider', function ($routeProvider) {
        appService.setRoute($routeProvider);
    }])
    .config(['$provide', function ($provide) {
        $provide.decorator('$locale', ['$delegate', function ($delegate) {
            $delegate.NUMBER_FORMATS.PATTERNS[1].negPre = '-\u00A4';
            $delegate.NUMBER_FORMATS.PATTERNS[1].negSuf = '';
            return $delegate;
        }]);

    }])
;

// Services
app
    .service('dataStorage', ['appEnvironment', function (appEnvironment) {
        var dataStorage = appService.dataStorage();
        dataStorage.setAppMetadataSet(appEnvironment.getMetadataSet());

        return dataStorage;
    }])

;

// Factories
app
    .factory('myHttpResponseInterceptor',
        [
            '$q',
            '$location',
            'errorDescriptions',
            appService.appHttpResponseInterceptor
        ]
    )
;

// Filters
app
    .filter('myDate', ['dateFilter', function (dateFilter) {
        return function (input) {
            if (input == null) {
                return '';
            }
            var _date = dateFilter(new Date(input), 'dd.MM.yyyy');

            return _date.toUpperCase();
        };
    }])
;

// Controllers
app
    .controller('workPlaceController',
        [
            '$window',
            '$http',
            '$cookies',
            '$rootScope',
            '$scope',
            '$location',
            'dataStorage',
            'appConfig',
            'resourceService',
            'dateFilter',
            'errorDescriptions',

            appController.workPlaceController
        ]
    )

    .controller('EntityListController',
        [
            '$scope',
            '$routeParams',
            '$location',
            'dataStorage',
            'EntityListForm',

            function ($scope, $routeParams, $location, dataStorage, EntityListForm) {

                $scope.name = 'EntityListController';
                $scope.params = $routeParams;

                var controller = {};
                controller.metadataName = $routeParams.entityName;
                appService.forms.ListEntityController.apply(controller, [$scope, $location, dataStorage, EntityListForm]);
                controller.initController();
            }])

    .controller('EntityEditController',
        [
            '$scope',
            '$routeParams',
            '$location',
            'dataStorage',
            'EntityEditForm',

            function ($scope, $routeParams, $location, dataStorage, EntityEditForm) {

                $scope.name = 'EntityController';
                $scope.params = $routeParams;

                var self = {};
                self.metadataName = $routeParams.entityName;
                self.entityId = Number($routeParams.entityId);

                appService.forms.EditEntityController.apply(self, [$scope, $location, dataStorage, EntityEditForm]);

            }])

    .controller('EntityCreateController',
        [
            '$scope',
            '$routeParams',
            '$location',
            'dataStorage',
            'EntityEditForm',

            function ($scope, $routeParams, $location, dataStorage, EntityEditForm) {

                $scope.name = 'EntityController';
                $scope.params = $routeParams;

                var self = {};
                self.metadataName = $routeParams.entityName;

                appService.forms.EditEntityController.apply(self, [$scope, $location, dataStorage, EntityEditForm]);

            }])
;
