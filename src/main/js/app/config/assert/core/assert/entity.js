;
(function (exp) {
    if (!exp.moduleConfigSystem) {
        exp.moduleConfigSystem = new Object(null);
    }
    var moduleConfigSystem = exp.moduleConfigSystem;

    moduleConfigSystem.Entity = function (resourceService) {
        var Entity = appUtils.Class();
        (function () {
            Entity.prototype.includeEntityFd = function (fd, entityFd, defineFd) {
                var strEntityFd = '';
                this.includeFd({entityFd: ''});
                if (fd) {
                    this.includeFd(fd);
                }
                if (entityFd) {
                    this.includeFd(entityFd);
                    for (var key in entityFd) {
                        strEntityFd = '' + strEntityFd + ', ' + key;
                    }
                    if (strEntityFd.length > 0) {
                        strEntityFd = strEntityFd.slice(2);
                    }
                    this.includeFd({entityFd: strEntityFd});
                }
                if (defineFd) {
                    for (var key in defineFd) {
                        this.includeDefineFd(key, defineFd[key]);
                    }
                }
            };

            Entity.prototype.$_buildObject = function () {
                this.includeEntityFd(
                    {
                        // object field
                        metadataName: '',
                        icon: 'fa-folder-o',
                    }, {
                        // entity field
                        id: null,
                        description: ''
                    }, {
                        // define field
                        representation: {
                            enumerable: true,
                            get: function () {
                                if (this.name) {
                                    return '' + this.name;
                                } else {
                                    return 'entity [' + this.metadataName + '] id: ' + this.id + '';
                                }
                            }
                        }
                    }
                );

            };

            var baseCreateEntity = function (self, data, fCallBack) {

                if (data.status === 200) {
                    var originalEntity = data.data;
                    if (originalEntity) {
                        appUtils.fillValuesProperty(originalEntity, self);
                        fCallBack(self);
                    }
                }
            };

            Entity.includeMthd({
                isEmpty: function () {
                    // ToDo write what attribute of empty entity
                    return this.id === 0 || this.id == null || this.id === '';
                },

                translateToEntityJSON: function () {
                    var self = this;
                    var replacer = self.entityFd.split(', ');
                    return JSON.stringify(self, replacer);
                },

                createEntity: function (fCallBack) {
                    var self = this;

                    if (!self.metadataName) {

                    }

                    var entityJSON = self.translateToEntityJSON();

                    var data = resourceService.getEntityEditService().createEntity({
                            entityName: self.metadataName
                        },
                        entityJSON);

                    data.$promise.then(function () {

                        baseCreateEntity(self, data, fCallBack)

                    });

                }

            });
        })();

        return Entity;
    }

})(window);