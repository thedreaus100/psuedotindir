(function() {
    'use strict';

    angular
        .module('tindir.core')
        .factory('geolocation', geolocation);

    geolocation.$inject = ["$q"];

    /* @ngInject */
    function geolocation($q) {

        return getLocation();

        function getLocation() {

            var deferred = $q.defer();

            if ("geolocation" in navigator) {
                navigator.geolocation.getCurrentPosition(function(position) {
                    if (position) {
                        deferred.resolve({
                            lat: position.coords.latitude,
                            lon: position.coords.longitude
                        });
                    } else {
                        deferred.reject();
                    }
                });
            } else {
                deferred.reject();
            }

            return deferred.promise;
        }
    }
})();
