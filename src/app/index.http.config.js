(function() {
    'use strict';

    angular
        .module('tindir')
        .config(httpConfig);

    /** @ngInject */
    function httpConfig($httpProvider) {

        $httpProvider.interceptors.push(function($q, $location) {
            return {
                responseError: function(response) {

                    if (response) {
                        console.log(response);
                        if (response.status === 401) {
                            console.log("forbidden");
                            $location.url("/signin");
                            return $q.reject(response)
                        }
                    }
                    return $q.reject(response);
                }
            };
        });
    }

})();
