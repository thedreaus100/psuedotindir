(function() {
    'use strict';

    angular
        .module('tindir.core')
        .service('UserResource', UserResource);

    UserResource.$inject = ["Restangular"];

    /* @ngInject */
    function UserResource(Restangular) {

        this.getSessionUser = getSessionUser;
        this.findMatches = findMatches;
        this.getUserById = getUserById;
        ////////////////

        //Executes
        function getSessionUser() {

            return Restangular.one("api/user", "me").get();
        }

        function getUserById(id) {

            return Restangular.one("api/user", id).get();
        }

        //Doesn't Execute just need base url
        function findMatches(location, searchOptions, from) {

            var data = {
                lat: location.lat,
                lon: location.lon,
                distance: searchOptions.distance,
                sortbyinterests: searchOptions.sortByInterests,
                interests:searchOptions.interests,
                from: from || 0
            }
            return Restangular.one("api/user/search").getList("matches", data);
        }
    }
})();
