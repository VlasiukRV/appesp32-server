angular.module('module.config', 
	[
	'ngResource',

    'module.core',
    'module.ui.list-form'
	]
)

.constant('appConfig', 
	{
		name: 'Record Keeper',
        appName: 'api/v1.0',
    	version: '0.0.1',
    	appIcon: 'fa fa-database',
    	appUrl: '/'+this.appName,
	}
)

// Services
// 

.service ('appHttp', ['appConfig', '$location', function(appConfig, $location) {
    var location = $location;

    return {
        getAppHttpUrl: function(urlSuffix) {
                var appAddress = "http://" + location.$$host + ":" + location.$$port;

                return appAddress + "/" + appConfig.appName + urlSuffix;
            }
    }
}])

.service('appEnvironment', 
	[
        'MetadataEntitySpecification',
        'Entity',
        'metadataSet',
        'fmListForm_TYPES',

        'userInterface',
        'metadataEntitySpecification_User',
        'metadataEntitySpecification_Role',

        'metadataEntitySpecification_Company',
        'metadataEntitySpecification_Sensor',

	moduleConfig.appEnvironment
	]
)

// Domain model
// 

    .service('metadataEntitySpecification_Company', [
            'MetadataEntitySpecification',
            'Entity',
            'metadataSet',
            'fmListForm_TYPES',

            moduleConfig.metadataEntitySpecification_Company
        ]
    )

    .service('metadataEntitySpecification_Sensor', [
            'MetadataEntitySpecification',
            'Entity',
            'metadataSet',
            'fmListForm_TYPES',

            moduleConfig.metadataEntitySpecification_Sensor
        ]
    )

    .service('metadataEntitySpecification_User', [
            'MetadataEntitySpecification',
            'Entity',
            'metadataSet',
            'fmListForm_TYPES',

            moduleConfig.metadataEntitySpecification_User
        ]
    )

    .service('metadataEntitySpecification_Role', [
            'MetadataEntitySpecification',
            'Entity',
            'metadataSet',
            'fmListForm_TYPES',

            moduleConfig.metadataEntitySpecification_Role
        ]
    )

;
