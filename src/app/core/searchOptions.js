(function() {
    'use strict';

    angular
        .module('tindir.core')
        .service('searchOptions', searchOptions);

    searchOptions.$inject = ["sessionManager"];

    /* @ngInject */
    function searchOptions(sessionManager) {

        var _options = {
            distance: 10
        }
        this.setFilterInterests = setFilterInterests;
        this.getFilterInterests = getFilterInterests;
        this.setDistance = setDistance;
        this.getDistance = getDistance;

        this.options = _options;
        ////////////////

        function setFilterInterests(flag) {

            _options.filterInterests = flag;
            update();
        }

        function getFilterInterests() {

            return _options.filterInterests;
        }

        function setDistance(dist) {
            _options.distance = dist;
            update();
        }

        function getDistance(dist) {
            return _options.distance;
        }

        function options() {
            return _options;
        }

        function update() {
            sessionManager.update("searchOptions", _options);
        }
    }
})();
