;
(function(exp) {
    if(!exp.moduleUI){
        exp.moduleUI = new Object(null);
    }
    if(!exp.moduleUI.formsDirective){
        exp.moduleUI.formsDirective = new Object(null);
    }    
    var formsDirective = exp.moduleUI.formsDirective;

    formsDirective.directiveButton = function () {
        return {
            restrict: 'E',
            compile: function (element, attrs) {
                element.addClass('btn');
                if (attrs.type === 'submit') {
                    element.addClass('btn-primary');
                } else {
                    element.addClass('btn-default');
                }
                if (attrs.size) {
                    element.addClass('btn-' + attrs.size);
                }
            }
        };
    };

    formsDirective.directiveDatePicker = function () {

        return {
            require: 'ngModel',
            link: function (scope, element, attrs, ngModelCtrl) {

                //model -> view
                ngModelCtrl.$formatters.push(function (date) {
                        date = new Date(date);
                        if (angular.isDefined(date) &&
                            date !== null && !angular.isDate(date)) {
                            throw new Error('ng-Model value must be a Date object');
                        }
                        return date;
                    }
                );

                //view -> model
                ngModelCtrl.$parsers.push(function (viewValue) {
                        return viewValue.getTime();
                    }
                );
            }
        };
    };

    function refreshSelectList (scope) {
        if (!scope.property) {
            return;
        }
        if (
            scope.property.inputType === 'select' || 
            scope.property.inputType === 'multiselect' ||
            scope.property.inputType === 'enum'
            ) {
            if (scope.property.entityListService()) {
                scope.selectList = scope.property.entityListService().list;
            }
        }
    }

    formsDirective.directiveEntityProperty = function () {
        return {
            restrict: 'E',
            require: '',
            template: '<div>\n' +
                '\n' +
                '    <div ng-switch on="property.inputType">\n' +
                '\n' +
                '        <!--enum-->\n' +
                '        <div ng-switch-when="enum">\n' +
                '\n' +
                '            <div class="form-group">\n' +
                '\n' +
                '                <label class="control-label">{{property.label}}:</label>\n' +
                '\n' +
                '                <div class="input-group">\n' +
                '\n' +
                '                    <select class="form-control"\n' +
                '                            ng-change="propertyChanged()"\n' +
                '                            ng-disabled="!property.availability"\n' +
                '                            ng-model="entity[property.name]"\n' +
                '                            ng-options="el for el in selectList"\n' +
                '                            title="{{property.label}}">\n' +
                '\n' +
                '                        <option selected="" value="">--Chose {{property.label}}--</option>\n' +
                '\n' +
                '                    </select>\n' +
                '\n' +
                '                    <span class="input-group-btn">\n' +
                '                        <button class="btn btn-primary btn-default"\n' +
                '                                ng-click="refreshSelectList(property, selectList)"\n' +
                '                                title="refresh report"\n' +
                '                                type="button">\n' +
                '\n' +
                '                            <span class="glyphicon glyphicon-refresh"></span>\n' +
                '\n' +
                '                        </button>\n' +
                '                    </span>\n' +
                '\n' +
                '                </div>\n' +
                '\n' +
                '            </div>\n' +
                '\n' +
                '        </div>\n' +
                '\n' +
                '        <!--select-->\n' +
                '        <div ng-switch-when="select">\n' +
                '\n' +
                '            <div class="form-group">\n' +
                '\n' +
                '                <label class="control-label">{{property.label}}:</label>\n' +
                '\n' +
                '                <div class="input-group">\n' +
                '\n' +
                '                    <select class="form-control"\n' +
                '                            ng-change="propertyChanged()"\n' +
                '                            ng-disabled="!property.availability"\n' +
                '                            ng-model="entity[property.name]"\n' +
                '                            ng-options="el.representation for el in selectList track by el.id"\n' +
                '                            title="{{property.label}}">\n' +
                '\n' +
                '                        <option selected="" value="">--Chose {{property.label}}--</option>\n' +
                '\n' +
                '                    </select>\n' +
                '\n' +
                '                    <span class="input-group-btn">\n' +
                '                           <button\n' +
                '                                   class="btn btn-primary"\n' +
                '                                   ng-click="refreshSelectList(property, selectList)"\n' +
                '                                   title="refresh report"\n' +
                '                                   type="button">\n' +
                '\n' +
                '                               <span class="glyphicon glyphicon-refresh"></span>\n' +
                '\n' +
                '                           </button>\n' +
                '                       </span>\n' +
                '\n' +
                '                </div>\n' +
                '\n' +
                '            </div>\n' +
                '\n' +
                '        </div>\n' +
                '\n' +
                '        <div ng-switch-when="multiselect">\n' +
                '\n' +
                '            <div class="form-group">\n' +
                '\n' +
                '                <label class="control-label">{{property.label}}:</label>\n' +
                '\n' +
                '                <div class="input-group">\n' +
                '\n' +
                '                    <oi-select\n' +
                '                            multiple\n' +
                '                            ng-disabled="!property.availability"\n' +
                '                            ng-model="entity[property.name]"\n' +
                '                            oi-options="el.representation for el in selectList track by el.id"\n' +
                '                            oi-select-options="{\n' +
                '                                            closeList: false,\n' +
                '                                            cleanModel: true\n' +
                '                                            }"\n' +
                '                            placeholder="Select">\n' +
                '\n' +
                '                    </oi-select>\n' +
                '\n' +
                '                    <span class="input-group-btn">\n' +
                '                    <button\n' +
                '                            class="btn btn-primary"\n' +
                '                            ng-click="refreshSelectList(property, selectList)"\n' +
                '                            title="refresh report"\n' +
                '                            type="button">\n' +
                '\n' +
                '                        <span class="glyphicon glyphicon-refresh"></span>\n' +
                '\n' +
                '                    </button>\n' +
                '                </span>\n' +
                '                </div>\n' +
                '\n' +
                '            </div>\n' +
                '\n' +
                '        </div>\n' +
                '\n' +
                '        <!--checkbox-->\n' +
                '        <div ng-switch-when="checkbox">\n' +
                '            <div class="form-group">\n' +
                '\n' +
                '                <div class="checkbox">\n' +
                '                    <label>\n' +
                '                        <input\n' +
                '                                class="form-control"\n' +
                '                                ng-model="entity[property.name]"\n' +
                '                                type="checkbox"/>\n' +
                '                        {{property.label}}\n' +
                '                    </label>\n' +
                '                </div>\n' +
                '\n' +
                '            </div>\n' +
                '        </div>\n' +
                '\n' +
                '        <!--date-->\n' +
                '        <div ng-switch-when="date">\n' +
                '            <div class="form-group">\n' +
                '                <label class="control-label">{{property.label}}:</label>\n' +
                '\n' +
                '                <input\n' +
                '                        class="date form-control"\n' +
                '                        ng-disabled="!property.availability"\n' +
                '                        ng-model="entity[property.name]"\n' +
                '                        sm-datepicker\n' +
                '                        type="date"/>\n' +
                '            </div>\n' +
                '        </div>\n' +
                '\n' +
                '        <!--textarea-->\n' +
                '        <div ng-switch-when="textarea">\n' +
                '            <div class="form-group">\n' +
                '                <label class="control-label">{{property.label}}:</label>\n' +
                '                <textarea\n' +
                '                        ng-disabled="!property.availability"\n' +
                '                        ng-model="entity[property.name]"\n' +
                '                        style="min-width: 100%"\n' +
                '                />\n' +
                '                </textarea>\n' +
                '            </div>\n' +
                '        </div>\n' +
                '\n' +
                '        <!--textarea-->\n' +
                '        <div ng-switch-when="jsonEditor">\n' +
                '            <div class="form-group">\n' +
                '\n' +
                '                <label class="control-label">{{property.label}}:</label>\n' +
                '\n' +
                '                <json-editor json="entity[property.name]"></json-editor>\n' +
                '\n' +
                '            </div>\n' +
                '        </div>\n' +
                '\n' +
                '        <!--default-->\n' +
                '        <div ng-switch-default>\n' +
                '            <div class="form-group">\n' +
                '                <label class="control-label">{{property.label}}:</label>\n' +
                '                <input\n' +
                '                        class="form-control"\n' +
                '                        ng-disabled="!property.availability"\n' +
                '                        ng-model="entity[property.name]"\n' +
                '                        type="{{property.inputType}}"\n' +
                '                />\n' +
                '            </div>\n' +
                '        </div>\n' +
                '\n' +
                '    </div>\n' +
                '\n' +
                '</div>\n',
            scope: {
                entity: '=',
                property: '='
            },
            link: function (scope) {
                refreshSelectList(scope);
            },
            controller: ['$scope', function ($scope) {
                $scope.refreshSelectList = refreshSelectList($scope);
                $scope.propertyChanged = function () {
                };
            }]
        };
    };

    formsDirective.directiveEntityEditForm = function () {
        return {
            restrict: 'E',
            require: '',
            template: '<div class="x_panel" draggable>\n' +
                '    <div class="x_title" hotkey="{\n' +
                '                                        \'alt+x\': closeForm,\n' +
                '                                        \'alt+s\': createEntity\n' +
                '                                        }">\n' +
                '        <h2>Edit Entity\n' +
                '            <span>{{entityEditForm.editFormName}}</span>\n' +
                '        </h2>\n' +
                '        <form-toolbox />\n' +
                '    </div>\n' +
                '\n' +
                '\n' +
                '    <div class="x_content">\n' +
                '\n' +
                '        <div class="col-sm-12" >\n' +
                '\n' +
                '            <button ng-click="closeForm()" class="btn btn-primary" type="button" size="sm" title="close form">\n' +
                '                <span class="glyphicon glyphicon-remove"></span>\n' +
                '            </button>\n' +
                '            <button ng-click="updateForm()" class="btn btn-primary" type="button" size="sm" title="refresh form">\n' +
                '                <span class="glyphicon glyphicon-refresh"></span>\n' +
                '            </button>\n' +
                '            <button ng-click="createEntity()" class="btn btn-primary" type="button" size="sm" title="save form">\n' +
                '                <span class="glyphicon glyphicon-floppy-save"></span>\n' +
                '            </button>\n' +
                '\n' +
                '        </div>\n' +
                '\n' +
                '        <form>\n' +
                '            <div ng-repeat="entityfieldsrow in entityEditForm.formPropertiesPlacing track by $index">\n' +
                '                <entity-edit-form-row\n' +
                '                        entityfieldsrow="entityfieldsrow"\n' +
                '                        entityeditform="entityEditForm">\n' +
                '                </entity-edit-form-row>\n' +
                '            </div>\n' +
                '        </form>\n' +
                '    </div>\n' +
                '\n' +
                '</div>',
            scope: {
                entityEditForm: '='
            },
            controller: ['$scope', function ($scope) {
                $scope.closeForm = function () {
                    $scope.entityEditForm.eventCloseForm();
                };
                $scope.updateForm = function () {
                    $scope.entityEditForm.eventUpdateForm();
                };
                $scope.createEntity = function () {
                    $scope.entityEditForm.eventCreateEntity($scope.entityEditForm.currentEntity);
                };
            }]
        };
    };

    formsDirective.directiveEntityEditFormRow = function () {
        return {
            restrict: 'E',
            require: '',
            template: '<div class="row">\n' +
                '    <div ng-repeat="fieldplacing in entityfieldsrow">\n' +
                '        <div class="col-sm-{{fieldplacing.fieldLength}} col-xs-12">\n' +
                '            <entity-edit-form-col\n' +
                '                    fieldplacing="fieldplacing"\n' +
                '                    entityeditform="entityeditform">\n' +
                '            </entity-edit-form-col>\n' +
                '        </div>\n' +
                '    </div>\n' +
                '</div>\n' +
                '\n',
            scope: {
                entityfieldsrow: '=',
                entityeditform: '='
            }
        };
    };

    formsDirective.directiveEntityEditFormCol = function ($compile) {
        return {
            restrict: 'E',
            require: '',
            template: '        <entity-property\n' +
                '                entity="entityeditform.currentEntity"\n' +
                '                property="entityeditform.formProperties[fieldplacing.editFieldId]">\n' +
                '        </entity-property>',
            scope: {
                fieldplacing: '=',
                entityeditform: '='
            },
            link: function (scope, element) {
                if (angular.isArray(scope.fieldplacing.editFieldId)) {
                    var e = $compile("" +
                        '<div ng-repeat="entityfieldsrow in fieldplacing.editFieldId track by $index">' +
                        '<entity-edit-form-row entityfieldsrow="entityfieldsrow" entityeditform="entityeditform">' +
                        '</entity-edit-form-row>' +
                        '</div>'
                    )(scope);
                    element.replaceWith(e);
                }
            }
        };
    };

    formsDirective.directiveFormToolbox = function () {
        return {
            restrict: 'E',
            require: '',
            template: '<span>\n' +
                '    <ul class="nav navbar-right panel_toolbox">\n' +
                '        <li><a class="collapse-link"><i class="fa fa-chevron-up"></i></a>\n' +
                '        </li>\n' +
                '        <li class="dropdown">\n' +
                '            <a aria-expanded="false" class="dropdown-toggle" data-toggle="dropdown"\n' +
                '               role="button"><i class="fa fa-wrench"></i></a>\n' +
                '            <ul class="dropdown-menu" role="menu">\n' +
                '                <li ng-repeat="toolboxCommand in toolboxMenu">\n' +
                '                    <a ng-click=toolboxCommand.command(selfScope)>\n' +
                '                        <span class="{{toolboxCommand.ico}}"></span> \n' +
                '                        {{toolboxCommand.text}}\n' +
                '                    </a>\n' +
                '                </li>\n' +
                '            </ul>\n' +
                '        </li>\n' +
                '        <li><a class="close-link"><i class="fa fa-close"></i></a>\n' +
                '        </li>\n' +
                '    </ul>\n' +
                '    <div class="clearfix"></div>\n' +
                '</span>',
            scope: {
                toolboxMenu: '=?'
            },
            link: function link($scope, iElement) {
                $scope.selfScope = $scope.$parent;
                if (!$scope.toolboxMenu) {
                    $scope.toolboxMenu = {};
                }

                gentelellaTheme.init_panel_toolbox(iElement);
            }
        };
    };
    
    formsDirective.directiveTextValue = function () {
        return {
            restrict: 'E',
            require: '',
            template: '<span>\n' +
                '    <span ng-show="textValue.length > limitLength">\n' +
                '        {{textValue | limitTo:limitLength}}\n' +
                '        <span tooltip-is-open="tooltipIsOpen" tooltip-placement="bottom" tooltip-popup-close-delay=\'1000\'\n' +
                '              uib-tooltip="{{textValue}}">\n' +
                '            ...\n' +
                '        </span>\n' +
                '    </span>\n' +
                '\n' +
                '    <span ng-show="textValue.length <= limitLength">\n' +
                '        {{textValue}}\n' +
                '    </span>\n' +
                '</span>',
            scope: {
                textValue: '=',
                limitLength: '=?'
            },
            controller: ['$scope', function ($scope) {
                if(!$scope.limitLength) {
                    $scope.limitLength = Number.MAX_VALUE;
                }
            }]
        };
    };
    
    formsDirective.directiveUpdatableText = function ($interval) {
        return {
            restrict: 'E',
            scope: {
                fCallBack: '&'
            },
            link: function link(scope, element, attrs) {
                var timeoutId;

                var updateText = function updateText() {
                    element.text(scope.fCallBack());
                };

                scope.$watch(attrs.smCurrentTime, function () {
                    updateText();
                });

                element.on('$destroy', function () {
                    $interval.cancel(timeoutId);
                });

                // start the UI update process; save the timeoutId for canceling
                timeoutId = $interval(function () {
                    updateText(); // update DOM
                }, 1000);
            }

        };
    };

    formsDirective.directiveValueTileCount = function() {
        return {            
            restrict: 'E',
            template: '\n' +
                '\n' +
                '\t<div class="tile_stats_count">\n' +
                '\t\t<span class="count_top"><i class="fa fa-bookmark-o"></i> {{countValue.valueLabel}}</span>\n' +
                '\t\t<div class="count">{{countValue.value}}</div>\n' +
                '\t\t<!-- <span class="count_bottom"><i class="green">4% </i> From last Week</span> -->\n' +
                '\t</div>\n',
            scope: {
                countValue: '='
            },
            link: function link($scope, iElement) {
            }
        };
    };

    formsDirective.directiveValueProgresCount = function() {
        return {
            restrict: 'E',
            template: '<div class="">\n' +
                '\t<p>progress Value: {{countValue.portion}}</p>\n' +
                '\t<div class="progress progress_sm" style="width: 76%;">\n' +
                '\t\t<div class="progress-bar bg-green" role="progressbar" data-transitiongoal="{{countValue.portion}}">\n' +
                '\n' +
                '\t\t</div>\n' +
                '\t</div>\n' +
                '</div>',
            scope: {
                countValue: '='
            },
            link: function link($scope, iElement) {
                    var element = $scope.countValue;
                    element.portion = element.value*100/element.maxValue;
                    $scope.$watch('countValue', function(element, oldValue, $scope) {
                        element.portion = element.value*100/element.maxValue;
                        $('.progress-bar').progressbar();
                    }, true);
            }
        };
    };

    formsDirective.directiveValueKnobCount = function() {
        return {
            restrict: 'E',
            template: '\t<input \n' +
                '\t\tclass="knob"\t\t\n' +
                '\t\tvalue="{{countValue.value}}">',
            scope: {
                countValue: '='
            },
            link: function link($scope, iElement) {
              var $element = $('.knob', iElement);
              $element.knob({
                  fgColor: '#26B99A',
                  displayPrevious: true,
                  width: 75,
                  displayInput: true,
                  width: 100,
                  height: 120,
                  min: $scope.countValue.minValue,
                  max: $scope.countValue.maxValue,
                  change: function(value) {
                    //console.log("change : " + value);
                  },
                  release: function(value) {
                    //console.log(this.$.attr('value'));
                    console.log("release : " + value);
                    $scope.countValue.value = value;
                  },
                  cancel: function() {
                    console.log("cancel : ", this);
                  },
                  /*format : function (value) {
                   return value + '%';
                   },*/
                  draw: function() {
                    // "tron" case
                    if (this.$.data('skin') == 'tron') {

                      this.cursorExt = 0.3;

                      var a = this.arc(this.cv) // Arc
                        ,
                        pa // Previous arc
                        , r = 1;

                      this.g.lineWidth = this.lineWidth;

                      if (this.o.displayPrevious) {
                        pa = this.arc(this.v);
                        this.g.beginPath();
                        this.g.strokeStyle = this.pColor;
                        this.g.arc(this.xy, this.xy, this.radius - this.lineWidth, pa.s, pa.e, pa.d);
                        this.g.stroke();
                      }

                      this.g.beginPath();
                      this.g.strokeStyle = r ? this.o.fgColor : this.fgColor;
                      this.g.arc(this.xy, this.xy, this.radius - this.lineWidth, a.s, a.e, a.d);
                      this.g.stroke();

                      this.g.lineWidth = 2;
                      this.g.beginPath();
                      this.g.strokeStyle = this.o.fgColor;
                      this.g.arc(this.xy, this.xy, this.radius - this.lineWidth + 1 + this.lineWidth * 2 / 3, 0, 2 * Math.PI, false);
                      this.g.stroke();

                      return false;
                    }
                  }
              });

              $element.val($scope.countValue.value).trigger('change');
            }
        };
    };

    formsDirective.directiveValueCountListSparkline = function() {
        return {
            restrict: 'A',
            template: '\t\n' +
                '<span class="sparkline" style="height: 160px; padding: 10px 25px;">\n' +
                '\t<canvas width="200" height="60" style="display: inline-block; vertical-align: top; width: 94px; height: 30px;"></canvas>\n' +
                '</span>',
            require: 'ngModel',
            link: function link($scope, iElement, attrs, ngModel) {

                opts = {};
                opts.type = attrs.type || 'bar';
                opts.barColor = attrs.barColor || '#26B99A';
                opts.height = attrs.height || '125';
                opts.barWidth = attrs.barWidth || '13';
                opts.barSpacing = attrs.barSpacing || '2';
                opts.zeroAxis = attrs.zeroAxis || 'false';

                $scope.$watch(attrs.ngModel, function () {
                    render();
                }, true);

                $scope.$watch(attrs.opts, function(){
                    render();
                }, true);

                var render = function () {
                    var model;
                    if(attrs.opts) angular.extend(opts, angular.fromJson(attrs.opts));
                    angular.isString(ngModel.$viewValue) ? model = ngModel.$viewValue.replace(/(^,)|(,$)/g, "") : model = ngModel.$viewValue;

                    var arrayValue = [];
                    $.each(model, function (index, element) {
                        arrayValue.push(element.value);
                    });
                    $(".sparkline", iElement).sparkline(arrayValue, opts);
                };
            }
        };
    };

    formsDirective.directiveGraficMap = function() {
        return {
            restrict: 'E',
            template: '\n' +
                '<div class="jqvvmap" style="width: 600px; height: 400px;"></div>',
            link: function link($scope, iElement) {
              $(".jqvvmap", iElement).vectorMap({
                  map: 'canada_en',
                  backgroundColor: null,
                  color: '#ffffff',
                  hoverOpacity: 0.7,
                  selectedColor: '#666666',
                  enableZoom: true,
                  showTooltip: true,
                  scaleColors: ['#E6F2F0', '#149B7E'],
                  normalizeFunction: 'polynomial',
                  onRegionClick: function(event, code, region){
                    event.preventDefault();
                  }
                });
            }
        };
    };

    formsDirective.directiveTableValueCountEcharts = function() {
        return {
            restrict: 'A',
            template: '\n' +
                '<div class="echart" style="height:350px;"></div>',
            require: 'ngModel',
            link: function link($scope, iElement, attrs, ngModel) {

                var opts = {
                  color: [
                      '#26B99A', '#34495E', '#BDC3C7', '#3498DB',
                      '#9B59B6', '#8abb6f', '#759c6a', '#bfd3b7'
                  ],

                  title: {
                      itemGap: 8,
                      textStyle: {
                          fontWeight: 'normal',
                          color: '#408829'
                      }
                  },

                  dataRange: {
                      color: ['#1f610a', '#97b58d']
                  },

                  toolbox: {
                      color: ['#408829', '#408829', '#408829', '#408829']
                  },

                  tooltip: {
                      backgroundColor: 'rgba(0,0,0,0.5)',
                      axisPointer: {
                          type: 'line',
                          lineStyle: {
                              color: '#408829',
                              type: 'dashed'
                          },
                          crossStyle: {
                              color: '#408829'
                          },
                          shadowStyle: {
                              color: 'rgba(200,200,200,0.3)'
                          }
                      }
                  },

                  dataZoom: {
                      dataBackgroundColor: '#eee',
                      fillerColor: 'rgba(64,136,41,0.2)',
                      handleColor: '#408829'
                  },
                  grid: {
                      borderWidth: 0
                  },

                  categoryAxis: {
                      axisLine: {
                          lineStyle: {
                              color: '#408829'
                          }
                      },
                      splitLine: {
                          lineStyle: {
                              color: ['#eee']
                          }
                      }
                  },

                  valueAxis: {
                      axisLine: {
                          lineStyle: {
                              color: '#408829'
                          }
                      },
                      splitArea: {
                          show: true,
                          areaStyle: {
                              color: ['rgba(250,250,250,0.1)', 'rgba(200,200,200,0.1)']
                          }
                      },
                      splitLine: {
                          lineStyle: {
                              color: ['#eee']
                          }
                      }
                  },
                  timeline: {
                      lineStyle: {
                          color: '#408829'
                      },
                      controlStyle: {
                          normal: {color: '#408829'},
                          emphasis: {color: '#408829'}
                      }
                  },

                  k: {
                      itemStyle: {
                          normal: {
                              color: '#68a54a',
                              color0: '#a9cba2',
                              lineStyle: {
                                  width: 1,
                                  color: '#408829',
                                  color0: '#86b379'
                              }
                          }
                      }
                  },
                  map: {
                      itemStyle: {
                          normal: {
                              areaStyle: {
                                  color: '#ddd'
                              },
                              label: {
                                  textStyle: {
                                      color: '#c12e34'
                                  }
                              }
                          },
                          emphasis: {
                              areaStyle: {
                                  color: '#99d2dd'
                              },
                              label: {
                                  textStyle: {
                                      color: '#c12e34'
                                  }
                              }
                          }
                      }
                  },
                  force: {
                      itemStyle: {
                          normal: {
                              linkStyle: {
                                  strokeColor: '#408829'
                              }
                          }
                      }
                  },
                  chord: {
                      padding: 4,
                      itemStyle: {
                          normal: {
                              lineStyle: {
                                  width: 1,
                                  color: 'rgba(128, 128, 128, 0.5)'
                              },
                              chordStyle: {
                                  lineStyle: {
                                      width: 1,
                                      color: 'rgba(128, 128, 128, 0.5)'
                                  }
                              }
                          },
                          emphasis: {
                              lineStyle: {
                                  width: 1,
                                  color: 'rgba(128, 128, 128, 0.5)'
                              },
                              chordStyle: {
                                  lineStyle: {
                                      width: 1,
                                      color: 'rgba(128, 128, 128, 0.5)'
                                  }
                              }
                          }
                      }
                  },
                  gauge: {
                      startAngle: 225,
                      endAngle: -45,
                      axisLine: {
                          show: true,
                          lineStyle: {
                              color: [[0.2, '#86b379'], [0.8, '#68a54a'], [1, '#408829']],
                              width: 8
                          }
                      },
                      axisTick: {
                          splitNumber: 10,
                          length: 12,
                          lineStyle: {
                              color: 'auto'
                          }
                      },
                      axisLabel: {
                          textStyle: {
                              color: 'auto'
                          }
                      },
                      splitLine: {
                          length: 18,
                          lineStyle: {
                              color: 'auto'
                          }
                      },
                      pointer: {
                          length: '90%',
                          color: 'auto'
                      },
                      title: {
                          textStyle: {
                              color: '#333'
                          }
                      },
                      detail: {
                          textStyle: {
                              color: 'auto'
                          }
                      }
                  },
                  textStyle: {
                      fontFamily: 'Arial, Verdana, sans-serif'
                  }
                };

                $scope.echartLine = echarts.init($(".echart", iElement)[0], opts);

                $scope.$watch(attrs.ngModel, function () {
                    render();
                }, true);

                $scope.$watch(attrs.opts, function(){
                    render();
                }, true);

                var render = function () {
                    var model;
                    if(attrs.opts) angular.extend(opts, angular.fromJson(attrs.opts));
                    angular.isString(ngModel.$viewValue) ? model = ngModel.$viewValue.replace(/(^,)|(,$)/g, "") : model = ngModel.$viewValue;

                    var seriesName = [];
                    var categoryData = model.categoryData;
                    var seriesValue = [];
                    $.each(model.seriesValue, function (index, element) {
                        var seria = {
                                name: element.valueLabel,
                                type: 'bar',
                                smooth: true,
                                itemStyle: {
                                    normal: {
                                        areaStyle: {
                                            type: 'default'
                                        }
                                    }
                                },
                                data: []
                            };
                        seriesName.push(element.valueLabel);
                        $.each(element.value, function (dataIndex, dataElement) {
                            seria.data.push(dataElement.value);
                        });
                        seriesValue.push(seria);
                    });                    
                    
                    $scope.echartLine.setOption({
                        title: {
                            text: 'Line Graph',
                            subtext: 'Subtitle'
                        },
                        tooltip: {
                            trigger: 'axis'
                        },
                        legend: {
                            x: 220,
                            y: 40,
                            data: seriesName
                        },
                        toolbox: {
                            show: true,
                            feature: {
                                magicType: {
                                show: true,
                                title: {
                                    line: 'Line',
                                    bar: 'Bar',
                                    stack: 'Stack',
                                    tiled: 'Tiled'
                                },
                                type: ['line', 'bar', 'stack', 'tiled']
                            },
                            restore: {
                                show: true,
                                title: "Restore"
                            },
                            saveAsImage: {
                                show: true,
                                title: "Save Image"
                            }
                          }
                        },
                        calculable: true,
                        xAxis: [{
                            type: 'category',
                            boundaryGap: false,
                            data: categoryData
                        }],
                        yAxis: [{
                            type: 'value'
                        }],
                        series: seriesValue
                      });

                };
            }
        };
    };

    formsDirective.draggable = function($document) {
        return {
            restrict: 'A',
            link: function link($scope, iElement, attrs) {

                return;

                var startX = 0, startY = 0, x = 0, y = 0;
                iElement.css({
                    position: 'relative',
                    cursor: 'pointer'
                });

                iElement.bind('mousedown', function(event) {
                    // Prevent default dragging of selected content
                    event.preventDefault();
                    startX = event.screenX - x;
                    startY = event.screenY - y;
                    $document.bind('mousemove', mousemove);
                    $document.bind('mouseup', mouseup);
                });
         
                function mousemove(event) {
                    y = event.screenY - startY;
                    x = event.screenX - startX;
                    iElement.css({
                        top: y + 'px',
                        left:  x + 'px'
                    });
                }
         
                function mouseup() {
                    $document.unbind('mousemove', mousemove);
                    $document.unbind('mouseup', mouseup);
                }

            }
        };
    };
})(window);

