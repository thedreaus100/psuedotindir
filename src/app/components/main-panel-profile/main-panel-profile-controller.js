(function() {
    'use strict';

    angular
        .module('tindir.components')
        .controller('ProfileController', ProfileController);

    ProfileController.$inject = ["user", "profile_user", "$scope", "$mdToast"];

    /* @ngInject */
    function ProfileController(user, profile_user, $scope, $mdToast) {
        var vm = this;
        vm.profile_user = profile_user;
        vm.title = 'ProfileController';

        vm.isMe = isMe;
        vm.updateInterests = updateInterests;

        activate();

        ////////////////

        function activate() {
            vm.profile_user.interests = vm.profile_user.interests || [];
            $scope.$on('$stateChangeStart',
                function(evt, toState, toParams, fromState, fromParams) {
                    if (isMe()) {
                        console.log("updating profile info!");
                        user.interests = profile_user.interests;
                        user.save().then(function(response) {
                            $mdToast.show($mdToast.simple().content('Updated Profile!'));
                        }, function(err) {
                            $mdToast.show($mdToast.simple().content(err));
                        });
                    }
                });
        }

        function isMe() {
            return user === profile_user;
        }

        function updateInterests(chip) {

            //check to see if its a valid interest
            console.log(chip);
            return chip;
        }
    }
})();
