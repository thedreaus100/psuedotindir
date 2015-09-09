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
        this.setSortByInterests = setSortByInterests;
        this.getSortByInterests = getSortByInterests;
        this.setInterests = setInterests;
        this.getInterests = getInterests;
        this.setDistance = setDistance;
        this.getDistance = getDistance;

        ////////////////

        function setSortByInterests(flag, propagate) {

            vm.options.sortByInterests = flag;
            update(propagate);
        }

        function getSortByInterests() {

            return vm.options.sortByInterests;
        }

        function setInterests(interests, propagate) {

            vm.options.interests = interests;
            update(propagate);
        }

        function getInterests() {
            return vm.options.interests;
        }

        function setDistance(dist, propagate) {
            vm.options.distance = dist;
            update(propagate);
        }

        function getDistance(dist) {
            return vm.options.distance;
        }

        function options() {
            return vm.options;
        }

        function update(propagate) {

            if (propagate == undefined || propagate)
                sessionManager.update("searchOptions", vm.options);
        }
    }
})();
