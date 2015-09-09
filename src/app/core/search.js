(function() {
    'use strict';

    angular
        .module('tindir.core')
        .service('search', search);

    search.$inject = ['UserResource', 'geolocation', '$q'];

    /* @ngInject */
    function search(UserResource, geolocation, $q) {

        var vm = this;
        var _options;
        vm.users = [];
        vm.findMatches = findMatches;
        vm.next = next;

        ////////////////

        function findMatches(from, user, options) {

            //should pass in options instead

            var deferred = $q.defer();
            if ((vm.users && vm.users.length > 0) && JSON.stringify(_options) == JSON.stringify(options)) {
                console.log("already has users!!!");
                deferred.resolve(vm.users);
            } else {
                console.log("options have changed!");
                _options = options;
                geolocation.then(function(location) {
                    return UserResource.findMatches(location, user.interests, options, from);
                }).then(handleSuccess, handleFailure);
            }

            return deferred.promise;

            function handleSuccess(users) {
                vm.users = users.filter(removeDuplicates).map(mapDistance);
                console.log("retrieved: " + vm.users.length + " users");
                deferred.resolve(vm.users);
            }

            function handleFailure(err) {
                console.log(err);
                deferred.reject(err);
            }

            function removeDuplicates(user) {

                //temp way to remove yourself from the list!
                for (var vusers in vm.users) {
                    if (vm.users[vusers].id == user._id) {
                        return false
                    }
                }
                return true;
            }

            function mapDistance(user) {

                var u = user._source;
                u.distance = Math.round(user.sort[0]);
                return u;
            }
        }

        function next() {
            vm.users.shift();
            return vm.users;
        }
    }
})();
