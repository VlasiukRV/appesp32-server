;
(function (exp) {
    if (!exp.appService) {
        exp.appService = new Object(null);
    }
    var appService = exp.appService;

    if (!appService.forms) {
        appService.forms = new Object(null);
    }
    var forms = appService.forms;

    forms.EditEntityController = function ($scope, $location, dataStorage, EntityEditForm) {

        var self = this;
        self.appMetadataSet = dataStorage.getAppMetadataSet();
        self.currentEntity = dataStorage.getCurrentEntityByName(self.metadataName);

        var entityList = self.appMetadataSet.getEntityList(self.metadataName);
        entityList.update(function () {

            self.currentEntity = entityList.metadataObject.getEntityInstance();
            if ("entityId" in self) {
                var entity = entityList.findEntityById(self.entityId);
                if (entity !== undefined) {
                    appUtils.fillValuesProperty(entity, self.currentEntity);
                }
            }

            dataStorage.setCurrentEntityByName(self.metadataName, self.currentEntity);
            self.initController();
            self.updateForm();
        });


        self.initController = function () {
            $scope.$parent.openEditForm = self.openEditForm;
            $scope.$parent.closeEditForm = self.closeEditForm;

            var metadataSpecification = self.appMetadataSet.getEntityList(self.metadataName);

            var entityEditForm = new EntityEditForm();
            entityEditForm.metadataName = self.metadataName;
            entityEditForm.appMetadataSet = self.appMetadataSet;
            entityEditForm.metadataSpecification = metadataSpecification;
            entityEditForm.editFormName = 'New ' + self.metadataName + ':';
            entityEditForm.formProperties = metadataSpecification.metadataObject.fmEditForm.metadataEditFieldsSet;
            entityEditForm.formPropertiesPlacing = metadataSpecification.metadataObject.fmEditForm.metadataEditFieldsPlacing;

            entityEditForm.eventCloseForm = self.closeEditForm;
            entityEditForm.eventUpdateForm = self.updateForm;
            entityEditForm.eventCreateEntity = self.createEntity;

            entityEditForm.openEditForm = self.openEditForm;
            entityEditForm.closeEditForm = self.closeEditForm;
            entityEditForm.updateForm = self.updateForm;
            entityEditForm.createEntity = self.createEntity;

            $scope.entityEditForm = entityEditForm;
            $scope.$parent.entityEditForm = entityEditForm;
        };

        self.updateForm = function () {
            $scope.entityEditForm.currentEntity = dataStorage.getCurrentEntityByName(self.metadataName);
        };

        self.createEntity = function (template) {
            var entityList = self.appMetadataSet.getEntityList(self.metadataName);
            entityList.addEntityByTemplate(template, function () {
                self.closeEditForm();
            });
        };

        self.openEditForm = function () {
            //$scope.$parent.showEditForm = true;
            self.entityEditForm.updateForm();
        };

        self.closeEditForm = function () {
            //$scope.$parent.showEditForm = false;
            //$scope.$parent.openListForm();
            $location.path('/entity/' + self.metadataName, false);
        };

    };

    forms.entityEditService = function (resource, appHttp) {
        return resource(
            appHttp.getAppHttpUrl('/entity/:entityName/:entityId'),
            {
                entityName: '@entityName',
                entityId: '@entityId'
            },
            {
                getEntity: {
                    method: 'GET'
                },
                createEntity: {
                    method: 'POST'
                },
                deleteEntity: {
                    method: 'DELETE'
                }
            }
        );
    };

})(window);