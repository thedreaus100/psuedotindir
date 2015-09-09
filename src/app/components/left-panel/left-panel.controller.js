(function() {
    'use strict';

    angular
        .module('tindir.components')
        .controller('LeftPanelController', LeftPanelController);

    LeftPanelController.$inject = ["$mdSidenav", "sessionManager", "user", "searchOptions", "$scope"];

    /* @ngInject */
    function LeftPanelController($mdSidenav, sessionManager, user, searchOptions, $scope) {
        var vm = this;
        vm.title = 'LeftPanelController';
        vm.user = user;

        vm.close = close;
        vm.setSortByInterests = searchOptions.setSortByInterests;
        vm.getSortByInterests = searchOptions.getSortByInterests;
        vm.setDistance = searchOptions.setDistance;
        vm.getDistance = searchOptions.getDistance;

        activate();

        ////////////////

        function activate() {

            if (!vm.user.firstName) vm.user.firstName = vm.user.displayName.split(" ")[0];
            vm.distance = searchOptions.getDistance();
        }

        function close($event) {
            $mdSidenav("left-panel").toggle();
        }
    }
})();
