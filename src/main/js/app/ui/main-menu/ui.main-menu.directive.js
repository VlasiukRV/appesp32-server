;
(function (exp) {
    if(!exp.moduleUI){
        exp.moduleUI = new Object(null);
    }
    if(!exp.moduleUI.directive){
        exp.moduleUI.directive = new Object(null);
    }    
    var directive = exp.moduleUI.directive;

    directive.directiveMenuBar = function () {
        return {
            restrict: 'E',
            require: '',
            replace: true,
            template: ' <div class="menu_section">\n' +
                '\n' +
                '\t<h3>{{command.text}}</h3>\n' +
                '\t<ul class="nav side-menu">\n' +
                '\t\t<menu-item command="command" ng-repeat="command in menuBar.commandList track by $index"></menu-item>\n' +
                '\t</ul>\n' +
                '\n' +
                '</div>',
            scope: {
                menuBar: '='
            },
            link: function (scope, element) {
                gentelellaTheme.init_sidebar_addEvent(element);
                gentelellaTheme.init_menuBaton();
            }
        };
    };

    directive.directiveMenuCollection = function () {
        return {
            restrict: 'E',
            require: '',
            replace: true,
            template: '<li>\n' +
                '    <a>\n' +
                '\t\t<i class="{{command.icon}}"></i> \n' +
                '\t\t{{command.text}}\n' +
                '\t\t<span class="fa fa-chevron-down"></span>\n' +
                '    </a>\n' +
                '    <ul class="nav child_menu">\n' +
                '\t\t<menu-item command="childCommand" ng-repeat="childCommand in menuCollection track by $index"></menu-item>\n' +
                '    </ul>\n' +
                '</li>',
            scope: {
                menuCollection: '=',
                command: '='
            },
            link: function (scope, element) {
                gentelellaTheme.init_sidebar_addEvent(element);
            }
        };
    };

    directive.directiveMenuItem = function ($compile) {
        return {
            restrict: 'E',
            require: '',
            replace: true,
            template: '    <li>\n' +
                '        <a href = "" ng-click="commandHandler()">\n' +
                '            <i class="{{command.icon}}"></i>\n' +
                '            {{command.text}}\n' +
                '        </a>\n' +
                '    </li>',
            scope: {
                command: '='
            },
            link: function (scope, element) {
                if (scope.command.isDropdownMenu) {
                    element.replaceWith($compile('<menu-collection command = "command" menu-collection="command.commandList"></menu-collection>')(scope));
                } else if (scope.command.isGroupMenu) {
                    element.replaceWith($compile('<menu-bar menu-bar="command"></menu-bar>')(scope));
                }
            },
            controller: ['$scope', '$window', '$location', function ($scope, $window, $location) {
                $scope.commandHandler = function () {
                    if (typeof($scope.command.command) === 'string') {
                        $location.url($scope.command.command);
                    } else {
                        $scope.command.command();
                    }
                };
            }]
        };
    };

    directive.directiveMessageLine = function () {
        return {
            restrict: 'E',
            require: '',
            template: '<li ng-repeat="errorDescription in errorDescriptions.errorDescriptions track by $index">\n' +
                '    <a>\n' +
                '<!--        src="../img/img.jpg"-->\n' +
                '        <span class="image"><img  alt="Profile Image"/></span>\n' +
                '        <span>\n' +
                '                          <span>Sysytem</span>\n' +
                '                          <span class="time">3 mins ago</span>\n' +
                '                        </span>\n' +
                '        <span class="message">\n' +
                '                        Error: {{errorDescription.statusText}}\n' +
                '                            <button ng-click="deleteErrorDescription($index)" type="button" size="sm" title="ok">\n' +
                '                                <span class="glyphicon glyphicon-ok-circle"></span>\n' +
                '                            </button>\n' +
                '                        </span>\n' +
                '    </a>\n' +
                '</li>\n',
            scope: {
                errorDescriptions: '='
            },
            controller: ['$scope', function ($scope) {
                $scope.deleteErrorDescription = function (index) {
                    $scope.errorDescriptions.delErrorDescription(index);
                    if ($scope.errorDescriptions.errorsCount() !== 0) {
                        return;
                    }

                    $scope.errorDescriptions.show = false;
                };
            }]
        };
    };

})(window);