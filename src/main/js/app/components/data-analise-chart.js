angular.module('data-analise-chart', [])

    .controller('dashboard', [
        '$scope',

        function ($scope) {
            function geDaysOfWeek() {
                return ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
            }

            function geMonthOYear() {
                return ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
            }

            function getCountValuesListPerPeriod(period, values, valueOption) {
                var result = [];

                $.each(period, function (index, element) {
                    var value = 0;
                    if (values && values.length >= index + 1) {
                        value = values[index];
                    }
                    result.push({
                        valueLabel: element,
                        value: value,
                        minValue: 0,
                        maxValue: 100
                    });
                });

                return result;
            }

            $scope.tableCountValue = {
                categoryData: geDaysOfWeek(),
                seriesValue: []
            };
            $scope.tableCountValue.seriesValue.push({
                valueLabel: 'inCome',
                value: getCountValuesListPerPeriod(geDaysOfWeek(), [30, 24, 60, 38, 21, 45, 58])
            });
            $scope.tableCountValue.seriesValue.push({
                valueLabel: 'outCome',
                value: getCountValuesListPerPeriod(geDaysOfWeek(), [17, 24, 54, 30, 29, 43, 55])
            });
            $scope.tableCountValue.seriesValue.push({
                valueLabel: 'plan outCome',
                value: getCountValuesListPerPeriod(geDaysOfWeek(), [17, 24, 52, 32, 23, 47, 51])
            });


            $('#select-list').on('change', function (event, target) {
                $.each($scope.tableCountValue.seriesValue, function (index, element) {
                    if ($('#select-list').val() === element.valueLabel) {
                        $scope.countValueList = element.value
                    }
                })
            });

            $scope.json = {
                metadataName: 'project',
                metadataRepresentation: 'Project',
                metadataDescription: 'Project list',
                entityField: {
                    objectField: {},
                    entityField: {

                        name: {
                            value: '',
                            fieldDescription: {
                                inputType: 'text',
                                label: 'name',
                                availability: true,
                                entityListService: null
                            }
                        }

                    },
                    defineField: {

                        representation: {
                            enumerable: true
                        }

                    }
                },

                fmListForm: {
                    listType: "table"
                },

                entityFieldsPlacing: [
                    [
                        {editFieldId: 'id', fieldLength: 3},
                        {
                            editFieldId: [
                                [{editFieldId: 'name', fieldLength: 12}]
                            ],
                            fieldLength: 5
                        }
                    ],
                    [
                        {editFieldId: 'description', fieldLength: 12}
                    ]
                ]
            };

            $scope.addNewEntity = function () {
                $scope.countValueList.push({valueLabel: 'Value 1', value: 30, minValue: 0, maxValue: 100});
            };
            $scope.deleteEntity = function () {
                $scope.countValueList.pop();
            };
        }
    ])
;
