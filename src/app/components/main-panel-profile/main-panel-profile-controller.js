(function() {
    'use strict';

    angular
        .module('tindir.components')
        .controller('ProfileController', ProfileController);

    ProfileController.$inject = ["user", "profile_user", "$scope", "$mdToast", "searchOptions"];

    /* @ngInject */
    function ProfileController(user, profile_user, $scope, $mdToast, searchOptions) {
        var vm = this;
        vm.profile_user = profile_user;
        vm.title = 'ProfileController';

        vm.isMe = isMe;
        vm.updateInterests = updateInterests;

        activate();

        ////////////////

        function activate() {
            vm.profile_user.interests = vm.profile_user.interests || [];
            $scope.$on('$stateChangeStart', saveProfile);
        }

        function isMe() {
            return user === profile_user;
        }

        function updateInterests(chip) {

            //check to see if its a valid interest
            console.log(chip);
            return chip;
        }

        function saveProfile(evt, toState, toParams, fromState, fromParams) {

            if (isMe()) {
                console.log("updating profile info!");
                user.interests = profile_user.interests;
                user.save().then(function(response) {
                    searchOptions.setInterests(user.interests);
                    $mdToast.show($mdToast.simple().content('Updated Profile!'));
                }, function(err) {
                    $mdToast.show($mdToast.simple().content(err));
                });
            }
        }
    }
})();
