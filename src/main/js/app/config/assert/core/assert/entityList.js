;
(function (exp) {
    if (!exp.moduleConfigSystem) {
        exp.moduleConfigSystem = new Object(null);
    }
    var moduleConfigSystem = exp.moduleConfigSystem;

    moduleConfigSystem.EntityList = function (resourceService) {
        var EntityList = appUtils.Class();
        (function () {
            EntityList.prototype.$_buildObject = function () {
                this.includeFd(
                    {
                        metadataName: '',
                        list: [],
                        metadataObject: null
                    });
            };
            var updateEnt = function (self, data, fCallBack) {

                if (data.status === 200) {
                    var originalUserList = data.data;
                    if (originalUserList) {
                        originalUserList.forEach(function (item) {
                            var entity = self.metadataObject.getEntityInstance();
                            appUtils.fillValuesProperty(item, entity);
                            self.addEntity(entity);
                        }, self);
                    }
                    console.log('Update ' + self.metadataObject.metadataName);
                }

                if (fCallBack) {
                    fCallBack(self.list);
                }
            };

            var deleteEnt = function (self, data, id, fCallBack) {

                if (data.status === 200) {
                    self.list.forEach(function (item, i) {
                        if (item.id === id) {
                            self.list.splice(i, 1);
                            return true;
                        }
                    }, self);
                }

                if (fCallBack) {
                    fCallBack(self.list);
                }
            };

            EntityList.includeMthd({
                addEntity: function (entity) {

                    var self = this;
                    var entityAdded = false;

                    for (var index = 0; index < self.list.length; ++index) {
                        var item = self.list[index];
                        if (item.id === entity.id) {
                            self.list[index] = entity;
                            entityAdded = true;
                            return;
                        }
                    }
                    if (!entityAdded) {
                        self.list.push(entity);
                    }
                },
                findEntityById: function (id) {

                    var self = this;

                    for (var index = 0; index < self.list.length; ++index) {
                        var item = self.list[index];
                        if (item.id === id) {
                            return item;
                        }
                    }

                    return undefined;

                },
                addEntityByTemplate: function (template, fCallBack) {

                    var self = this;
                    var entity = undefined;

                    if (('id' in template)) {
                        entity = self.findEntityById(template.id);
                    }

                    if (entity === undefined) {
                        entity = self.metadataObject.getEntityInstance(self.metadataName);
                    }

                    appUtils.fillValuesProperty(template, entity);
                    entity.createEntity(function (data) {
                        self.addEntity(data);
                        fCallBack();
                    });

                },
                update: function (fCallBack) {

                    var self = this;
                    self.list = [];
                    var data = resourceService.getEntityEditService().getEntity({
                        entityName: self.metadataName
                    });

                    data.$promise.then(function () {

                        updateEnt(self, data, fCallBack);

                        }
                    );

                },
                findEntity: function (searchEx, fCallBack) {

                    var self = this;
                    self.list = [];
                    var data = resourceService.getEntityEditService().getEntity({
                        entityName: self.metadataName,
                        search: searchEx
                    });

                    data.$promise.then(function () {

                        updateEnt(self, data, fCallBack);

                    });

                },
                deleteEntity: function (id, fCallBack) {

                    var self = this;
                    var data = resourceService.getEntityEditService().deleteEntity({
                        entityName: self.metadataName,
                        entityId: id
                    });

                    data.$promise.then(function () {

                        deleteEnt(self, data, id, fCallBack);

                    });
                }

            });
        })();

        return EntityList;
    }

})(window);