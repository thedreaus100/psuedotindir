(function() {
    'use strict';

    angular
        .module('tindir.components')
        .controller('ProfileController', ProfileController);

    ProfileController.$inject = ["user", "profile_user"];

    /* @ngInject */
    function ProfileController(user, profile_user) {
        var vm = this;
        vm.profile_user = profile_user;
        vm.title = 'ProfileController';

        vm.isMe = isMe;

        activate();

        ////////////////

        function activate() {
            vm.profile_user.interests = vm.profile_user.interests || [];
        }

        function isMe() {
            return user === profile_user;
        }
    }
})();
