(function() {
    'use strict';

    angular
        .module('tindir', [
            'ngAnimate',
            'ngCookies',
            'ngTouch',
            'ngSanitize',
            'restangular',
            'ui.router',
            'ngMaterial',
            'ngMdIcons',

            //Local Dependencies 
            "tindir.common",
            "tindir.components",
            "tindir.core"
        ]);

})();
