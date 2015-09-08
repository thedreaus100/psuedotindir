(function() {
    'use strict';

    angular
        .module('tindir')
        .config(config)
        .config(icons);

    /** @ngInject */
    function config($logProvider, toastr) {
        // Enable log
        $logProvider.debugEnabled(true);

        // Set options third-party lib
        toastr.options.timeOut = 3000;
        toastr.options.positionClass = 'toast-top-right';
        toastr.options.preventDuplicates = true;
        toastr.options.progressBar = true;
    }

    function icons($mdIconProvider) {

        var actionSet = 'bower_components/material-design-icons/sprites/svg-sprite/svg-sprite-action.svg';
        var communicationSet = 'bower_components/material-design-icons/sprites/svg-sprite/svg-sprite-communication.svg';
        var socialSet = 'bower_components/material-design-icons/sprites/svg-sprite/svg-sprite-social.svg';
        var contentSet = 'bower_components/material-design-icons/sprites/svg-sprite/svg-sprite-content.svg';
         var avSet = 'bower_components/material-design-icons/sprites/svg-sprite/svg-sprite-av.svg';
        
        $mdIconProvider
            .defaultFontSet('fontawesome')
            .defaultIconSet(actionSet)
            .iconSet('action', actionSet)
            .iconSet('communication', communicationSet)
            .iconSet('social', socialSet)
            .iconSet('content', contentSet)
            .iconSet('av', avSet)
            ;
    }

})();
