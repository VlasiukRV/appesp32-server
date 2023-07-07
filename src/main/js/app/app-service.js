;
(function (exp) {
    if (!exp.appService) {
        exp.appService = new Object(null);
    }
    var appService = exp.appService;

    appService.dataStorage = function () {

        var appMetadataSet = null;

        var currentEntities = new Object(null);

        return {
            getAppMetadataSet: function () {
                return appMetadataSet;
            },
            setAppMetadataSet: function (metadataSet) {
                appMetadataSet = metadataSet;
            },

            setCurrentEntityByName: function (entityName, _date) {
                if (entityName !== undefined) {
                    currentEntities[entityName] = _date;
                }
            },
            getCurrentEntityByName: function (entityName) {
                if (entityName !== undefined) {
                    if (currentEntities[entityName] == null) {
                        currentEntities[entityName] = this.getNewEntityByName(entityName);
                    }
                    return currentEntities[entityName];
                } else {
                    return null;
                }
            },
            getNewEntityByName: function (entityName) {
                return this.getAppMetadataSet().getEntityInstance(entityName);
            }
        };
    };

////////////////////////////////////
// angular SERVICEs
////////////////////////////////////

    appService.setRoute = function ($routeProvider) {

        $routeProvider
            .when('/entity/:entityName', {
                template: 'controller: {{name}}<br />\n' +
                    'entityName: {{params.entityName}}<br />' +
                    '' +
                    '<entity-list-form entity-list-form="entityListForm"> </entity-list-form>',
                controller: 'EntityListController'
            })
            .when('/entity/:entityName/edit/:entityId', {
                template: 'controller: {{name}}<br />\n' +
                    'entityName: {{params.entityName}}<br />\n' +
                    'entityId: {{params.entityId}}' +
                    '<entity-edit-form entity-edit-form="entityEditForm"> </entity-edit-form>',
                controller: 'EntityEditController'
            })
            .when('/entity/:entityName/create', {
                template: 'controller: {{name}}<br />\n' +
                    'entityName: {{params.entityName}}<br />\n' +
                    '<entity-edit-form entity-edit-form="entityEditForm"> </entity-edit-form>',
                controller: 'EntityCreateController'
            })

            .when('/companies', {
                template: '<div ng-controller="companiesController">\n' +
                    '\n' +
                    '    <div ng-controller="editCompaniesController" ng-show="showEditForm">\n' +
                    '        <entity-edit-form\n' +
                    '                entity-edit-form="entityEditForm">\n' +
                    '        </entity-edit-form>\n' +
                    '    </div>\n' +
                    '\n' +
                    '    <div ng-controller="companiesListController" ng-show="showListForm">\n' +
                    '        <entity-list-form\n' +
                    '                entity-list-form="entityListForm">\n' +
                    '        </entity-list-form>\n' +
                    '    </div>\n' +
                    '\n' +
                    '</div>'
            })
            .when('/user', {
                templateUrl: '/appTaskList/security/usersList'
            })
            .when('/role', {
                templateUrl: '/appTaskList/security/roleList'
            })
            .when('/serviceTask', {
                templateUrl: '/appTaskList/serviceTaskList'
            })
            .when('/poultryCalendar', {
                templateUrl: '/appTaskList/poultryCalendarList'
            })
            .when('/farm', {
                templateUrl: '/appTaskList/farmsList'
            })
            .when('/project', {
                templateUrl: '/appTaskList/projectsList'
            })
            .when('/task', {
                templateUrl: '/appTaskList/tasksList'
            })
            .when('/login', {
                templateUrl: '/login'
            })
            .when('/dashboard', {
                template: '<div ng-controller="dashboard" class="x_panel">\n' +
                    '\n' +
                    '    <div class="columns is-multiline">\n' +
                    '\n' +
                    '        <div class="column is-12">\n' +
                    '\n' +
                    '            <grafic-map map=\'canada_en\'> </grafic-map>\n' +
                    '\n' +
                    '        </div>\n' +
                    '\n' +
                    '        <div class="column is-12">\n' +
                    '\n' +
                    '            <json-editor json="json"></json-editor>\n' +
                    '\n' +
                    '        </div>\n' +
                    '\n' +
                    '        <div class="column is-12 buttons ">\n' +
                    '            <a class="button is-primary" ng-click="addNewEntity()">\n' +
                    '                <span class="glyphicon glyphicon-plus"></span>\n' +
                    '            </a>\n' +
                    '            <a class="button is-primary" ng-click="deleteEntity()">\n' +
                    '                <span class="glyphicon glyphicon-minus"></span>\n' +
                    '            </a>\n' +
                    '            <select id="select-list">\n' +
                    '                <option ng-repeat="tableValue in tableCountValue.seriesValue" >{{tableValue.valueLabel}}</option>\n' +
                    '            </select>            \n' +
                    '        </div>\n' +
                    '\n' +
                    '        <div class="column is-8">\n' +
                    '            <div table-value-count-echarts ng-model="tableCountValue"></div>\n' +
                    '        </div>\n' +
                    '        <div class="column is-4">\n' +
                    '            <div class="columns is-multiline">\n' +
                    '                <div class="column is-6" ng-repeat="countValue in countValueList">\n' +
                    '                    <value-knob-count                        \n' +
                    '                        count-value="countValue">\n' +
                    '                    </value-knob-count>\n' +
                    '                </div>\n' +
                    '            </div>\n' +
                    '        </div>\n' +
                    '\n' +
                    '        <div class="column is-12">\n' +
                    '            <div value-count-list-sparkline ng-model="countValueList"></div>\n' +
                    '        </div>\n' +
                    '\n' +
                    '        <div class="column is-12">\n' +
                    '            <div class="tile_count columns is-multiline">    \n' +
                    '                <value-tile-count class="column is-2"\n' +
                    '                    ng-repeat="countValue in countValueList"\n' +
                    '                    count-value="countValue">\n' +
                    '                </value-tile-count>\n' +
                    '            </div>\n' +
                    '        </div>\n' +
                    '\n' +
                    '        <div class="column is-12">\n' +
                    '            <div class="columns is-multiline">\n' +
                    '                <value-progres-count\n' +
                    '                    class="column is-4" \n' +
                    '                    ng-repeat="countValue in countValueList"\n' +
                    '                    count-value="countValue">\n' +
                    '                </value-progres-count>\n' +
                    '            </div>\n' +
                    '        </div>\n' +
                    '\n' +
                    '        <div class="column is-12">\n' +
                    '            <a href=" http://localhost:8080/appTaskList/service/download?fileName=pdfReport5065262707367832071.pdf"\n' +
                    '               download="Report">Download</a>\n' +
                    '        </div>\n' +
                    '\n' +
                    '    </div>\n' +
                    '\n' +
                    '</div>'
            })
            .when('/currentPrincipalInformation', {
                templateUrl: '/appTaskList/currentPrincipalInformation'
            })
            .otherwise({
                redirectTo: '/appTaskList'
            })

        ;
        return $routeProvider;
    };

    appService.appHttpResponseInterceptor = function ($q, $location, errorDescriptions) {
        return {
            'request': function (config) {
                config.url = config.url.split('%2F').join('/');
                return config;
            },

            'response': function (response) {
                if (errorDescriptions) {
                    errorDescriptions.handleResponse(response);
                }
                if (typeof response.data === 'string') {
                    if (response.data.indexOf instanceof Function &&
                        response.data.indexOf('id="app-login-page"') !== -1) {
                        $location.path('/login');
                    }
                }
                return response;
            },

            'responseError': function (response) {
                if (errorDescriptions) {
                    errorDescriptions.handleResponse(response);
                }
                return $q.reject(response);
            }
        };
    };


})(window);