(function() {
    'use strict';

    angular
        .module('tindir')
        .controller('MainHeaderController', MainHeaderController);

    MainHeaderController.$inject = ["$mdSidenav"];

    /* @ngInject */
    function MainHeaderController($mdSidenav) {

        var vm = this;
        vm.title = 'MainHeaderController';
        vm.toggleLeftPanel = toggleLeftPanel;
        vm.toggleRightPanel = toggleRightPanel;

        activate();

        ////////////////

        function activate() {

        }

        function toggleLeftPanel($event) {

            $mdSidenav("left-panel").toggle()
        }

        function toggleRightPanel($event) {

            $mdSidenav("right-panel").toggle()
        }
    }
})();
