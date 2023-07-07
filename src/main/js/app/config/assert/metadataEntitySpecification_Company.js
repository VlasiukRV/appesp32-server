;
(function (exp) {
    if (!exp.moduleConfig) {
        exp.moduleConfig = new Object(null);
    }
    var moduleConfig = exp.moduleConfig;

    moduleConfig.metadataEntitySpecification_Company = function (MetadataEntitySpecification, Entity, metadataSet, fmListForm_TYPES) {

        var AppEntity = appUtils.Class(Entity);

        var metadataEntitySpecification = new MetadataEntitySpecification();
        metadataEntitySpecification.init({
            entityClass: AppEntity,
                fnGetEntityInstance: function () {
                    return new AppEntity();
                },
                metadataSet: metadataSet,
            metadataName: 'companies',
            metadataRepresentation: 'company',
            metadataDescription: 'Company list',
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
                        {editFieldId: 'description', fieldLength: 12}
                    ]
                ]
            }
        );

        return metadataEntitySpecification
    }

})(window);