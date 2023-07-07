;
(function (exp) {
    if(!exp.moduleUI){
        exp.moduleUI = new Object(null);
    }

    if(!exp.moduleUI.directive){
        exp.moduleUI.directive = new Object(null);
    }    
    var directive = exp.moduleUI.directive;

    directive.directiveElementReady = function() {
        return {
            priority: -1000, // a low number so this directive loads after all other directives have loaded.
            restrict: 'A', // attribute only
            link: function($scope, $element, $attributes) {
                $scope.$eval($attributes.ngElementReady);
            }
        };
    };

    directive.directiveLoginPage = function (principal) {

        return {
            restrict: 'E',
            require: '',
            replace: true,
            template: '<div class="container">\n' +
                '\t<div class="row">\n' +
                '\t    <div class="alert alert-danger" ng-show="credentials.error">\n' +
                '\t        There was a problem logging in. Please try again.\n' +
                '\t    </div>\n' +
                '\t</div>\n' +
                '        <div class="row">\n' +
                '            <div class="col-md-4 col-md-offset-4 col-sm-8 col-sm-offset-2 col-xs-10 col-xs-offset-1">\n' +
                '                <div class="login-panel panel panel-default" draggable>\n' +
                '                    <div class="panel-heading">\n' +
                '                        <h3 class="panel-title">Please Sign In</h3>\n' +
                '                    </div>\n' +
                '                    <div class="panel-body">\n' +
                '                        <form role="form" ng-submit="login()">\n' +
                '                            <fieldset>\n' +
                '                                <div class="form-group">\n' +
                '                                    <input class="form-control" ng-model="credentials.name" placeholder="username: admin" id="username" name="username" type="text" autofocus="">\n' +
                '                                </div>\n' +
                '                                                             \n' +
                '                                <div class="form-group">\n' +
                '                                    <input class="form-control" placeholder="E-mail" name="email" type="email" autofocus="">\n' +
                '                                </div>\n' +
                '                                \n' +
                '                                <div class="form-group">\n' +
                '                                    <input class="form-control" ng-model="credentials.password" placeholder="Password: admin" name="password" type="password" value="">\n' +
                '                                </div>\n' +
                '                                <div class="checkbox">\n' +
                '                                    <label>\n' +
                '                                        <input name="remember" type="checkbox" value="Remember Me">Remember Me\n' +
                '                                    </label>\n' +
                '                                </div>\n' +
                '\t\t\t\t\t\t        <button type="submit" class="btn btn-lg btn-success btn-block">LET\'S GO</button>\n' +
                '\t\t\t\t\t\t        <button ng-click="eventAfterLogin()" class="btn" title="cancel">\n' +
                '\t\t\t\t\t\t            <span class="glyphicon glyphicon-remove-circle"></span>\n' +
                '\t\t\t\t\t\t        </button>\n' +
                '                            </fieldset>\n' +
                '                        </form>\n' +
                '                    </div>\n' +
                '                </div>\n' +
                '            </div>\n' +
                '        </div>\n' +
                '</div>',
            scope: {
                eventAfterLogin: '&'
            },
            controller: ['$location', '$http', '$rootScope', '$scope', 'dataStorage', function ($location, $http, $rootScope, $scope, dataStorage) {
                $scope.credentials = {name: 'admin', password: 'admin'};
                $scope.login = function () {
                    var appMetadataSet = dataStorage.getAppMetadataSet();
                    if (!appMetadataSet) {
                        return;
                    }
                    var principal = appMetadataSet.userInterface.security.principal;
                    if (!principal) {
                        return;
                    }

                    principal.login($http, $scope.credentials, function (data) {
                        if (!data.authenticated) {
                            return;
                        }

                        $scope.eventAfterLogin();
                    });
                };
            }]
        };
    };

    directive.directiveCurrentTime = function ($interval, dateFilter) {
        return {
            link: function link(scope, element, attrs) {
                var format = 'M/d/yy h:mm:ss a';
                var timeoutId;

                var updateTimer = function () {
                    element.text(dateFilter(new Date(), format));
                };

                scope.$watch(attrs.smCurrentTime, function () {
                    updateTimer();
                });

                element.on('$destroy', function () {
                    $interval.cancel(timeoutId);
                });

                // start the UI update process; save the timeoutId for canceling
                timeoutId = $interval(function () {
                    updateTimer(); // update DOM
                }, 1000);
            }

        };
    };

})(window);