;
(function(exp) {
    if(!exp.moduleUI){
        exp.moduleUI = new Object(null);
    }
    if(!exp.moduleUI.formsDirective){
        exp.moduleUI.formsDirective = new Object(null);
    }    
    var formsDirective = exp.moduleUI.formsDirective;
    
    formsDirective.directiveEntityListForm = function () {
        return {
            restrict: 'E',
            require: '',
            template: '<div class="x_panel" draggable>\n' +
                '    <div class="x_title">\n' +
                '        <h2>List\n' +
                '            <span>{{entityListForm.editFormName}}</span>\n' +
                '        </h2>\n' +
                '\n' +
                '        <form-toolbox toolbox-menu="entityListForm.toolboxMenu"/>\n' +
                '    </div>\n' +
                '\n' +
                '    <div class="x_content">\n' +
                '\n' +
                '        <div class="col-sm-12">\n' +
                '            <button class="btn btn-primary" ng-click="closeForm()" size="sm" title="close form" type="button">\n' +
                '                <span class="glyphicon glyphicon-remove"></span>\n' +
                '            </button>\n' +
                '            <button class="btn btn-primary" ng-click="updateForm()" size="sm" title="refresh form"\n' +
                '                    type="button">\n' +
                '                <span class="glyphicon glyphicon-refresh"></span>\n' +
                '            </button>\n' +
                '            <button class="btn btn-primary" ng-click="addNewEntity()" size="sm" title="add new "\n' +
                '                    type="button">\n' +
                '                <span class="glyphicon glyphicon-plus"></span>\n' +
                '            </button>\n' +
                '            <button class="btn btn-primary" ng-click="flagShowSearch = !flagShowSearch" size="sm" title="open filter"\n' +
                '                    type="button">\n' +
                '                <span class="glyphicon glyphicon-filter"></span>\n' +
                '            </button>\n' +
                '        </div>\n' +
                '\n' +
                '        <div class="col-sm-12">\n' +
                '            <table>\n' +
                '                <tr ng-repeat="filter_element in entityListForm.filter_listProperties">\n' +
                '                    <td>\n' +
                '                        <entity-property\n' +
                '                                entity="filter_list[filter_element.name]"\n' +
                '                                property="filter_element">\n' +
                '                        </entity-property>\n' +
                '                    </td>\n' +
                '                    <td>\n' +
                '                        <button ng-click="probafilter(filter_list[filter_element.name], filter_element)"\n' +
                '                                size="sm"\n' +
                '                                title="close form" type="btn btn-primary">\n' +
                '\n' +
                '                        </button>\n' +
                '                    </td>\n' +
                '                </tr>\n' +
                '            </table>\n' +
                '        </div>\n' +
                '\n' +
                '        <div class="col-sm-12" ng-show="flagShowSearch">\n' +
                '            <label class="control-label col-md-3 col-sm-3 col-xs-12">Search expression:</label>\n' +
                '            <input\n' +
                '                    class="form-control"\n' +
                '                    ng-change="findEntity(searchEx)"\n' +
                '                    ng-model="searchEx"\n' +
                '                    type="text"\n' +
                '            />\n' +
                '\n' +
                '        </div>\n' +
                '\n' +
                '\n' +
                '        <div class="col-sm-12">\n' +
                '\n' +
                '            <div ng-switch on="entityListForm.listType.name">\n' +
                '                \n' +
                '                <div ng-switch-when="calendar">\n' +
                '\n' +
                '                    <calendar\n' +
                '                            toolbox-menu="entityListForm.entityToolboxMenu"\n' +
                '                            entity-list-form="entityListForm">\n' +
                '                    </calendar>\n' +
                '\n' +
                '                </div>\n' +
                '\n' +
                '                <div ng-switch-when="tile">\n' +
                '\n' +
                '                    <div class="row top_tiles">\n' +
                '                        <div class="animated flipInY col-lg-3 col-md-3 col-sm-6 col-xs-12"\n' +
                '                             ng-repeat="entity in entityListForm.entitiesFiltered">\n' +
                '\n' +
                '                            <tile\n' +
                '                                entity="entity"\n' +
                '                                fields="entityListForm.formProperties"\n' +
                '                                options=entityListForm.listType\n' +
                '                                toolbox-menu="entityListForm.entityToolboxMenu">\n' +
                '                            </tile>\n' +
                '\n' +
                '                        </div>\n' +
                '                    </div>\n' +
                '\n' +
                '                </div>\n' +
                '\n' +
                '                <div ng-switch-when="panel">\n' +
                '\n' +
                '                    <div class="row top_tiles">\n' +
                '                        <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12 widget widget_tally_box"\n' +
                '                             ng-repeat="entity in entityListForm.entitiesFiltered">\n' +
                '\n' +
                '                             <panel\n' +
                '                                entity="entity"\n' +
                '                                fields="entityListForm.formProperties"\n' +
                '                                options=entityListForm.listType\n' +
                '                                toolbox-menu="entityListForm.entityToolboxMenu">\n' +
                '                             </panel>\n' +
                '\n' +
                '                        </div>\n' +
                '                    </div>\n' +
                '\n' +
                '                </div>\n' +
                '\n' +
                '                <div ng-switch-when="mediaList">\n' +
                '\n' +
                '                    <ul class="list-unstyled top_profiles scroll-view">\n' +
                '\n' +
                '                        <li class="media event"\n' +
                '                        ng-repeat="entity in entityListForm.entitiesFiltered">\n' +
                '\n' +
                '                            <media-card\n' +
                '                                entity="entity"                                \n' +
                '                                fields="entityListForm.formProperties"\n' +
                '                                options=entityListForm.listType\n' +
                '                                toolbox-menu="entityListForm.entityToolboxMenu">\n' +
                '                            </media-card>\n' +
                '\n' +
                '                        </li>\n' +
                '                        \n' +
                '                    </ul>\n' +
                '\n' +
                '                </div>\n' +
                '\n' +
                '                <div ng-switch-default>\n' +
                '                    \n' +
                '                    <div class="table-responsive">\n' +
                '\n' +
                '                        <table class="table table-striped jambo_table bulk_action">\n' +
                '\n' +
                '                            <thead>\n' +
                '                            <tr class="headings">\n' +
                '                                <th class="column-title" \n' +
                '                                        ng-repeat="field in entityListForm.formProperties track by $index">\n' +
                '                                    {{field.label}}\n' +
                '                                </th>\n' +
                '                                <th></th>\n' +
                '                            </tr>\n' +
                '                            </thead>\n' +
                '\n' +
                '                            <tbody>\n' +
                '                            <tr class="hvr-curl-top-left even pointer" ng-repeat="entity in entityListForm.entitiesFiltered">\n' +
                '                                <td ng-repeat="field in entityListForm.formProperties track by $index">\n' +
                '                                    <field-value\n' +
                '                                        ng-click="editEntity(entity.id)"\n' +
                '                                        entity="entity"\n' +
                '                                        field="field">\n' +
                '                                    </field-value>\n' +
                '                                </td>\n' +
                '                                <td>\n' +
                '                                    <form-toolbox toolbox-menu="entityListForm.entityToolboxMenu"/>\n' +
                '                                </td>\n' +
                '                            </tr>\n' +
                '\n' +
                '                            <tr ng-repeat="entityEmpty in entityListForm.entitiesEmpty track by $index">\n' +
                '                                <td align="center"\n' +
                '                                    ng-repeat="field in entityListForm.formProperties track by $index">\n' +
                '                                    <!--<img src="/img/FFFFFF-0.8.png">-->\n' +
                '                                </td>\n' +
                '                                <td></td>\n' +
                '                            </tr>\n' +
                '                            </tbody>\n' +
                '\n' +
                '                        </table>\n' +
                '\n' +
                '                    </div>\n' +
                '\n' +
                '                </div>\n' +
                '\n' +
                '            </div>\n' +
                '\n' +
                '            <ul\n' +
                '                    class="pagination" ng-change="entityListForm.eventPageChanged()"\n' +
                '                    ng-model="entityListForm.currentPage"\n' +
                '                    total-items="entityListForm.totalItems"\n' +
                '                    uib-pagination>\n' +
                '            </ul>\n' +
                '\n' +
                '        </div>\n' +
                '\n' +
                '    </div>\n' +
                '\n' +
                '</div>\n',
            scope: {
                entityListForm: '='
            },
            controller: ['$scope', function ($scope) {

                $scope.closeForm = function () {
                    $scope.entityListForm.eventCloseForm();
                };
                $scope.updateForm = function () {
                    $scope.entityListForm.eventUpdateForm();
                    $scope.entityListForm.entities = $scope.entityListForm.appMetadataSet.getEntityList($scope.entityListForm.metadataName).list;
                };
                $scope.findEntity = function (searchEx) {
                    $scope.entityListForm.eventFindEntity(searchEx);
                    $scope.entityListForm.entities = $scope.entityListForm.appMetadataSet.getEntityList($scope.entityListForm.metadataName).list;
                };
                $scope.addNewEntity = function () {
                    $scope.entityListForm.eventAddNewEntity();
                };
                $scope.deleteEntity = function (id) {
                    $scope.entityListForm.eventDeleteEntity(id);
                };
                $scope.editEntity = function (id) {
                    $scope.entityListForm.eventEditEntity(id);
                };

            }]
        };
    };

    formsDirective.directiveFieldValue = function () {
        return {
            restrict: 'E',
            require: '',
            template: '\n' +
                '<span class="count" ng-switch on="field.inputType">\n' +
                '\t<span ng-switch-when="select">\n' +
                '\t\t{{entity[field.name].representation}}\n' +
                '\t</span>\n' +
                '\t<span ng-switch-when="multiselect">\n' +
                '\t\t{{entity[field.name].representationList()}}\n' +
                '\t</span>\n' +
                '\t<span ng-switch-when="date">\n' +
                '\t\t{{entity[field.name] | date:\'yyyy-MM-dd\'}}\n' +
                '\t</span>\n' +
                '\t<span ng-switch-default>\n' +
                '\t\t<text-value \n' +
                '\t\t\ttext-value="entity[field.name]"\n' +
                '\t\t\tlimit-length="options.limitCellLength">\n' +
                '\t\t</text-value>\n' +
                '\t</span>\n' +
                '</span>',
            scope: {
                entity: '=',
                field: '='
            },
            link: function ($scope, element, attrs) {
                
            },
            controller: ['$scope', function ($scope) {
                
            }]
        }
    };

    formsDirective.directiveTile = function () {
        return {
            restrict: 'E',
            require: '',
            template: '\n' +
                '<div class="x_panel" draggable>\n' +
                '    <div class="x_title">\n' +
                '        <h2>\n' +
                '            <a ng-click="editEntity(entity.id)">\n' +
                '                {{entity.representation}}\n' +
                '            </a>\n' +
                '        </h2>\n' +
                '        <form-toolbox toolbox-menu="toolboxMenu"/>\n' +
                '    </div>\n' +
                '\n' +
                '    <div class="x_content" style="display: block;">\n' +
                '        <div class="tile-stats">\n' +
                '            <div class="icon"><i class="fa fa-caret-square-o-right"></i></div>\n' +
                '            <div class="count">{{entity.id}}</div>\n' +
                '            <!--<h3>{{entityEditForm.editFormName}}</h3>-->\n' +
                '            <p>{{entity.representation}}</p>\n' +
                '        </div>\n' +
                '    </div>\n' +
                '</div>\n',
            scope: {
                entity: '=',
                fields: '=',
                toolboxMenu: '=?',                
                options: '='
            },
            link: function ($scope, element, attrs) {
                
            },
            controller: ['$scope', function ($scope) {
                
            }]
        }
    };

    formsDirective.directivePanel = function () {
        return {
            restrict: 'E',
            require: '',
            template: '\n' +
                '<div class="x_panel fixed_height_390" draggable>\n' +
                '\t<div class="x_title">\n' +
                '\t\t<h2>\n' +
                '\t\t\t<a ng-click="editEntity(entity.id)">\n' +
                '\t\t\t\t{{entity.representation}}\n' +
                '\t\t\t</a>\n' +
                '\t\t</h2>\n' +
                '\t\t<form-toolbox toolbox-menu="toolboxMenu"/>\n' +
                '\t</div>\n' +
                '\n' +
                '\t<div class="x_content" style="display: block;">\n' +
                '\t\t<div>\n' +
                '\t\t\t<ul class="list-inline widget_tally">\n' +
                '\t\t\t\t<li ng-repeat="field in fields | limitTo:options.quantityProperties track by $index">\n' +
                '\t\t\t\t\t<p>\n' +
                '\n' +
                '\t\t\t\t\t\t<span class="month">{{field.label}}</span>\n' +
                '\t\t\t\t\t\t<field-value\n' +
                '\t\t\t\t\t\t\tentity="entity"\n' +
                '\t\t\t\t\t\t\tfield="field">\n' +
                '\t\t\t\t\t\t</field-value>\n' +
                '\t\t\t\t\t\t\n' +
                '\t\t\t\t\t</p>\n' +
                '\t\t\t\t</li>\n' +
                '\t\t\t</ul>\n' +
                '\t\t</div>\n' +
                '\t</div>\n' +
                '</div>\n',
            scope: {
                entity: '=',
                fields: '=',
                toolboxMenu: '=?',                
                options: '='
            },
            link: function ($scope, element, attrs) {
                
            },
            controller: ['$scope', function ($scope) {
                
            }]
        }
    };

    formsDirective.directiveMediaCard = function () {
        return {
            restrict: 'E',
            require: '',
            template: '<div>\n' +
                '\t<a class="pull-left border-aero profile_thumb">\n' +
                '\t\t<i class="fa fa-user aero"></i>\n' +
                '\t</a>\n' +
                '\t<!-- <div class="x_title"> -->\n' +
                '\t<span>\n' +
                '\t\t<a ng-click="editEntity(entity.id)">\n' +
                '\t\t\t{{entity.representation}}\n' +
                '\t\t</a>\n' +
                '\t</span>\n' +
                '\t<form-toolbox toolbox-menu="toolboxMenu"/>\n' +
                '\t<!-- </div> -->\n' +
                '\n' +
                '\t<div class="media-body">\n' +
                '\n' +
                '\t\t<p ng-repeat="field in fields | limitTo:options.quantityProperties track by $index">\n' +
                '\n' +
                '\t\t\t<strong>{{field.label}}: </strong>\n' +
                '\t\t\t<field-value\n' +
                '\t\t\t\tentity="entity"\n' +
                '\t\t\t\tfield="field">\n' +
                '\t\t\t</field-value>\n' +
                '\n' +
                '\t\t</p>\n' +
                '\t\t\n' +
                '\t</div>\n' +
                '</div>',
            scope: {
                entity: '=',
                fields: '=',
                toolboxMenu: '=?',                
                options: '='
            },
            link: function ($scope, element, attrs) {
                
            },
            controller: ['$scope', function ($scope) {
                
            }]
        }
    };

    formsDirective.directiveCalendar = function () {
        return {
            restrict: 'E',
            require: '',
            scope: {
                toolboxMenu: '=?',
                entityListForm: '='
            },
            link: function ($scope, element, attrs) {

                if (typeof ($.fn.fullCalendar) === 'undefined') {
                    return;
                }

                if (!$scope.toolboxMenu) {
                    $scope.toolboxMenu = {};
                }

                var fullCalendar_events = [];
                angular.forEach($scope.entityListForm.entitiesFiltered, function (entity) {
                    fullCalendar_events.push({
                        id: entity.id,
                        title: entity.representation,
                        start: entity.date,
                        end: entity.date + entity.plainTime,
                        allDay: false,

                        entity_scope: {
                            entityListForm: $scope.entityListForm,
                            entity: entity
                        }
                    })
                });

                var date = new Date(),
                    d = date.getDate(),
                    m = date.getMonth(),
                    y = date.getFullYear(),
                    started,
                    categoryClass;

                var calendar = $('<div> </div>').fullCalendar({
                    header: {
                        left: 'prev,next today',
                        center: 'title',
                        right: 'month,agendaWeek,agendaDay,listMonth'
                    },
                    selectable: true,
                    selectHelper: true,
                    editable: true,
                    events: fullCalendar_events,
                    select: function (start, end, allDay) {
                        $scope.entityListForm.eventAddNewEntity();
                    },
                    eventClick: function(calEvent, jsEvent, view) {
                        $scope.toolboxMenu.editEntity.command(calEvent.entity_scope);
                    }
                });

                $(element).append(calendar);
                calendar.fullCalendar('today');
            },
            controller: ['$scope', function ($scope) {
            }]
        }
    }

})(window);