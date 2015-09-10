(function() {
    'use strict';

    angular
        .module('tindir.common')
        .filter('filterMatches', matches);

    function matches() {
        return filterFilter;

        ////////////////

        function filterFilter(list, compareList) {

            if (!compareList) return list;
            return list.filter(function(item) {
                return compareList.indexOf(item) != -1;
            });
        }
    }

})();
