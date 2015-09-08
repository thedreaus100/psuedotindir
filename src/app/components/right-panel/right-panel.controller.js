(function() {
    'use strict';

    angular
        .module('tindir.components')
        .controller('RightPanelController', RightPanelController);

    RightPanelController.$inject = ["$mdSidenav", "user", "sessionManager"];

    /* @ngInject */
    function RightPanelController($mdSidenav, user, sessionManager) {
        var vm = this;
        vm.title = 'RightPanelController';
        vm.close = close;
        activate();

        ////////////////

        function activate() {

            sessionManager.addListener("matchedUsers", function(users) {
                vm.users = users;
            });
        }

        function close($event) {
            $mdSidenav("right-panel").toggle();
        }
    }
})();
