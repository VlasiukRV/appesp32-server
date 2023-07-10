;
(function (exp) {
    if (!exp.moduleConfig) {
        exp.moduleConfig = new Object(null);
    }
    var moduleConfig = exp.moduleConfig;

    var metadataEntitySpecificationJson_Project = {
        metadataName: 'projects',
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

    moduleConfig.appEnvironment = function (
        MetadataEntitySpecification,
        Entity,
        metadataSet,
        fmListForm_TYPES,
        userInterface,
        metadataEntitySpecification_User,
        metadataEntitySpecification_Role,
        metadataEntitySpecification_Company,
        metadataEntitySpecification_Sensor

    ) {

        var _userInterface = userInterface;

        var appEnvironment = {
            metadataSet: undefined,
            metadataSpecifications: {
                enums: [],
                entities: []
            },
            setMetadataSet: function (_metadataSet) {
                if (_metadataSet) {
                    this.metadataSet = _metadataSet;
                    this.metadataSet.userInterface = _userInterface;
                }
                return this;
            },
            getMetadataSet: function () {
                return this.metadataSet;
            },
            initMetadataSet: function () {
                var i;
                for (i = 0; i < this.metadataSpecifications.enums.length; i++) {
                    this.metadataSet.installMetadataObjectEnum(this.metadataSpecifications.enums[i]);
                }
                for (i = 0; i < this.metadataSpecifications.entities.length; i++) {
                    var metadataEntitySpecification = this.metadataSpecifications.entities[i];
                    this.metadataSet.installMetadataObjectEntity(metadataEntitySpecification);
                }

                return this;
            },

            addMetadataEntitySpecification: function (metadataEntitySpecification) {
                this.metadataSpecifications.entities.push(metadataEntitySpecification);

                return this;
            },
            addMetadataEnumSpecification: function (metadataEnumSpecification) {
                this.metadataSpecifications.enums.push(metadataEnumSpecification);

                return this;
            },
            addMetadataEnumSpecificationJSON: function (metadataEntitySpecification_Entity) {

                var EntityClass = appUtils.Class(Entity);

                metadataEntitySpecification_Entity.entityClass = EntityClass;
                metadataEntitySpecification_Entity.metadataSet = metadataSet;
                if (('fmListForm' in metadataEntitySpecification_Entity)) {
                    if (('listType' in metadataEntitySpecification_Entity.fmListForm)) {
                        if (typeof metadataEntitySpecification_Entity.fmListForm.listType === 'string') {
                            metadataEntitySpecification_Entity.fmListForm.listType = fmListForm_TYPES[metadataEntitySpecification_Entity.fmListForm.listType];
                        }

                    }
                }

                metadataEntitySpecification_Entity.fnGetEntityInstance = function () {
                    return new EntityClass;
                };
                metadataEntitySpecification_Entity.entityField.defineField.representation.get = function () {
                    return '' + this.name;
                };

                var metadataEntitySpecification = new MetadataEntitySpecification();
                metadataEntitySpecification.init(metadataEntitySpecification_Entity);

                this.addMetadataEntitySpecification(metadataEntitySpecification);
                return this;
            }
        };

        appEnvironment
            .setMetadataSet(metadataSet)
            .addMetadataEnumSpecificationJSON(metadataEntitySpecificationJson_Project)

            .addMetadataEntitySpecification(metadataEntitySpecification_User)
            .addMetadataEntitySpecification(metadataEntitySpecification_Role)
            .addMetadataEntitySpecification(metadataEntitySpecification_Company)
            .addMetadataEntitySpecification(metadataEntitySpecification_Sensor)

            .initMetadataSet();

        return appEnvironment;
    };

})(window);