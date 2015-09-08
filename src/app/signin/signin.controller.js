(function() {
    'use strict';

    angular
        .module('tindir')
        .controller('SignInController', SignInController);

    SignInController.$inject = ["assets"];

    /* @ngInject */
    function SignInController(assets) {
        
        var vm = this;
        vm.slides = [];
        vm.fbicon = assets.images.facebookLogin;

        activate();

        ////////////////

        function activate() {

        	vm.slides.push(assets.images.dir + "/" + "friends1.jpg");
            vm.slides.push(assets.images.dir + "/" + "couple1.jpg");
            vm.slides.push(assets.images.dir + "/" + "couple2.jpg");
        }
    }
})();