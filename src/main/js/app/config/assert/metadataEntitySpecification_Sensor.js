;
(function (exp) {
    if (!exp.moduleConfig) {
        exp.moduleConfig = new Object(null);
    }
    var moduleConfig = exp.moduleConfig;

    moduleConfig.metadataEntitySpecification_Sensor = function (MetadataEntitySpecification, Entity, metadataSet, fmListForm_TYPES) {

        var AppEntity = appUtils.Class(Entity);

        var metadataEntitySpecification = new MetadataEntitySpecification();
        metadataEntitySpecification.init({
                entityClass: AppEntity,
                fnGetEntityInstance: function () {
                    return new AppEntity();
                },
                metadataSet: metadataSet,
                metadataName: 'sensors',
                metadataRepresentation: 'sensor',
                metadataDescription: 'Sensors list',
                entityField: {
                    objectField: {},
                    entityField: {

                        // entity field
                        name: {
                            value: '',
                            fieldDescription: {
                                inputType: 'text',
                                label: 'name',
                                availability: true,
                                entityListService: null
                            }
                        },

                        company: {
                            value: metadataEntitySpecification.getArrayValue(metadataSet, 'companies'),
                            fieldDescription: {
                                inputType: 'multiselect',
                                label: 'companies',
                                availability: true,
                                metadataEntityName: 'companies',
                                entityListService: function () {
                                    return metadataSet.getEntityList('companies');
                                }
                            }
                        }

                    },
                    defineField: {

                        representation: {
                            enumerable: true,
                            get: function () {
                                return '' + this.name;
                            }
                        }

                    }
                },

                fmListForm: {
                    listType: fmListForm_TYPES.table
                },
                entityFieldsPlacing: [
                    [
                        {editFieldId: 'id', fieldLength: 3},
                        {editFieldId: 'name', fieldLength: 9}
                    ],
                    [
                        {editFieldId: 'company', fieldLength: 12}
                    ],
                    [
                        {editFieldId: 'description', fieldLength: 12}
                    ]
                ]
            }
        );

        return metadataEntitySpecification
    }

})(window);