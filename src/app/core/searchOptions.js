(function() {
    'use strict';

    angular
        .module('tindir.core')
        .service('searchOptions', searchOptions);

    searchOptions.$inject = ["sessionManager"];

    /* @ngInject */
    function searchOptions(sessionManager) {

        var vm = this;
        vm.options = {
            distance: 10
        }
        this.setFilterInterests = setFilterInterests;
        this.getFilterInterests = getFilterInterests;
        this.setInterests = setInterests;
        this.getInterests = getInterests;
        this.setDistance = setDistance;
        this.getDistance = getDistance;

        ////////////////

        function setFilterInterests(flag) {

            options.filterInterests = flag;
            update();
        }

        function getFilterInterests() {

            return vm.options.filterInterests;
        }

         function setInterests(interests) {

            options.interests = interests;
            update();
        }

        function getInterests() {

            return vm.options.interests;
        }

        function setDistance(dist) {
            vm.options.distance = dist;
            update();
        }

        function getDistance(dist) {
            return vm.options.distance;
        }

        function options() {
            return vm.options;
        }

        function update() {
            sessionManager.update("searchOptions", vm.options);
        }
    }
})();
