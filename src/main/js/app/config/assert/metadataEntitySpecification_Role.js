;
(function (exp) {
    if (!exp.moduleConfig) {
        exp.moduleConfig = new Object(null);
    }
    var moduleConfig = exp.moduleConfig;

    moduleConfig.metadataEntitySpecification_Role = function (MetadataEntitySpecification, Entity, metadataSet, fmListForm_TYPES) {

        var Role = appUtils.Class(Entity);
        var metadataEntitySpecification = new MetadataEntitySpecification();

        metadataEntitySpecification.init( {
            entityClass: Role,
            fnGetEntityInstance: function () {
                return new Role();
            },
            metadataSet: metadataSet,
            metadataName: 'roles',
            metadataRepresentation: 'Role',
            metadataDescription: 'Role list',
            entityField: {
                objectField: {
                    icon: 'fa-group',
                },
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
                    users: {
                        value: metadataEntitySpecification.getArrayValue(metadataSet, 'users'),
                        fieldDescription: {
                            inputType: 'multiselect',
                            label: 'users',
                            availability: true,
                            metadataEntityName: 'users',
                            entityListService: function () {
                                return metadataSet.getEntityList('users');
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
                    {editFieldId: 'users', fieldLength: 5},
                    {editFieldId: 'description', fieldLength: 12}
                ]
            ]
        });

        return metadataEntitySpecification;
    }


})(window);