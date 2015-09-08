(function() {
    'use strict';

    angular
        .module('tindir')
        .config(theme);

    /** @ngInject */
    function theme($mdThemingProvider) {

        $mdThemingProvider.theme('default')
            .primaryPalette('light-blue', {
                'default': '400',
                'hue-1': '100',
                'hue-2': '600',
                'hue-3': '900'
            })
            .accentPalette('indigo', {
                'default': '200',
                "hue-1": '100',
                "hue-2": '400',
                "hue-3": '700'
            });
    }

})();
