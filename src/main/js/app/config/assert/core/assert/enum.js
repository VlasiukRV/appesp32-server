;
(function (exp) {
    if (!exp.moduleConfigSystem) {
        exp.moduleConfigSystem = new Object(null);
    }
    var moduleConfigSystem = exp.moduleConfigSystem;

    moduleConfigSystem.Enum = function (resourceService) {

        var Enum = appUtils.Class();
        (function () {
            Enum.prototype.$_buildObject = function () {
                this.includeFd(
                    {
                        metadataName: '',
                        list: {}
                    });
            };

            Enum.includeMthd({
                update: function () {
                    var source = this;

                    var data = resourceService.getEntityEditService()
                        .getEntity({entityName: 'enum', entityId: this.metadataName});


                    data.$promise.then(function () {
                        source.list = data.data;
                    });

                }

            });
        })();

        return Enum;
    }

})(window);