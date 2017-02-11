var config = {};

config.app = {
	name:"itaAccessApp"
};

// ENVIRONMENTS NEW
config.app.specific_environments = {
    dev:{
        host:'http://54.213.206.26/',
        apiURL:'http://54.213.206.26/projects/bizquid/index.php/api/',
        filesURL:'http://54.213.206.26/projects/bizquid/'
    }
};
config.app.environment_structure = {
    host:'',
    apiURL:'index.php/api/',
    filesURL:''
};

/*----------------------------------------------------------------------------------*\
|
|  FRONT END ENVIRONMENTS
|  ! REQUIRES config
|
\*----------------------------------------------------------------------------------*/

function set_environment(routes){
    if (config != undefined) {
        for (var e in routes) {
            config[e] = routes[e];
        }
    }
    else{
        console.error("configuration file missing: variable 'config' is undefined");
    }
}
// NEW VERSION
var $environments = {
	// SETS DEFAULT ENVIRONMENT, IF NOT RECOGNIZED
	default:'remote',
	// DEFINES CURRENT HOST
	host:location.protocol + "//" + location.hostname + (location.port && ":" + location.port) + "/",
	// ENVIRONMENTS
	local:{
		host:'http://localhost:3030/',
		localApi:'http://localhost:3030/data/',
		apiURL:'http://localhost:8888/index.php/api-v1/',
		filesURL:'http://localhost:3030/public/uploads'
	},
	local2:{
		host:'http://localhost:8888/',
		localApi:'http://localhost:8888/app/data/',
		apiURL:'http://localhost:8888/index.php/api-v1/',
		filesURL:'http://localhost:8888/public/uploads'
	},
	local3:{
		host:'http://192.168.0.19:3030/',
		localApi:'http://192.168.0.19:3030/data/',
		apiURL:'http://107.20.247.15/api-v1/',
		filesURL:'http://192.168.0.19:3030/public/uploads'
	},
	local4:{
		host:'http://access.squid-agency.com/',
		localApi:'http://access.squid-agency.com/app/data/',
		apiURL:'http://107.20.247.15/api-v1/',
		filesURL:'http://access.squid-agency.com/app/public/uploads'
	},
	local5:{
		host:'http://192.168.0.17:8888/',
		localApi:'http://192.168.0.17:8888/app/data/',
		apiURL:'http://192.168.0.17:8888/index.php/api-v1/',
		filesURL:'http://192.168.0.17:3030/uploads'
	},
	local6:{
		host:'http://54.213.206.26/',
		localApi:'http://54.213.206.26/projects/ita-access/app/data/',
		apiURL:'http://107.20.247.15/api-v1/',
		filesURL:'http://54.213.206.26/projects/ita-access/app/public/uploads'
	},
	local7:{
		host:'http://104.236.55.131/',
		localApi:'http://104.236.55.131/ita-access/app/data/',
		apiURL:'http://104.236.55.131/ita-access/index.php/api-v1/',
		filesURL:'http://54.213.206.26/projects/ita-access/app/public/uploads'
	},
	local8:{
		host:'http://localhost/',
		localApi:'http://localhost/app/data/',
		apiURL:'http://localhost/index.php/api-v1/',
		filesURL:'http://localhost/projects/ita-access/app/public/uploads'
	},
	remote:{
		host:'http://localhost/',
		localApi:'http://localhost/data/',
		apiURL:'http://localhost/index.php/api-v1/',
		filesURL:'http://localhost/public/uploads'
	}
};

// ADD ENVIRONMENTS & AUTOMATICALLY DETECTS/SETS ENVIRONMENT
if (config != undefined && config.app.specific_environments != undefined) {
    //fill the specific environments
    for (var e in config.app.specific_environments) {
        $environments[e] = config.app.specific_environments[e];
    }
    // DEFAULT SETTINGS
    var found=false;
    for(var environment in $environments){
        if($environments.host == $environments[environment].host){
            set_environment($environments[environment]);
            found=true;
            break;
        }
    }
    //default environment style (remote, local, ip, ...)
    if(!found && config.app.environment_structure != undefined){
        var routes={};
        for(var key in config.app.environment_structure){
            routes[key]=$environments.host + config.app.environment_structure[key];
        }
        set_environment(routes);
    }
    else if(config.app.environment_structure==undefined){
        console.error("config environment structure file missing: variable 'config.app.environment_structure' is undefined");
    }
}
else{
    console.error("configuration file missing: variable 'config' is undefined");
}