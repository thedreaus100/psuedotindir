(function() {
    'use strict';

    angular
        .module('tindir.common')
        .filter('firstName', firstName);

    function firstName() {
        return firstNameFilter;

        ////////////////

        function firstNameFilter(input) {
            return input.split(" ")[0];
        }
    }

})();
