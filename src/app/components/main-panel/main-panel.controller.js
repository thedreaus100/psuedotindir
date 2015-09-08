(function() {
    'use strict';

    angular
        .module('tindir.components')
        .controller('MainPanelController', MainPanelController);

    MainPanelController.$inject = ["$timeout", "sessionManager", "user", "search", "$location", "matchedDialog"];

    /* @ngInject */
    function MainPanelController($timeout, sessionManager, user, search, $location, matchedDialog) {
        var vm = this;
        var from = 0;
        vm.title = 'MainPanelController';
        vm.users = [];
        vm.matchedUsers = [];

        vm.like = like;
        vm.dislike = dislike;
        vm.showProfile = showProfile

        activate();

        ////////////////

        function activate() {

            findMatches(from);
            sessionManager.addListener("searchOptions", function(searchOptions) {
                findMatches(from);
            });
        }

        function findMatches(from) {

            search
                .findMatches(from, user)
                .then(function(users) {
                    vm.users = users;
                });
        }

        function like(event, matchedUser) {

            vm.liked = true;
            if (!matchedUser) matchedUser = vm.users[0];
            vm.matchedUsers.push(matchedUser);
            sessionManager.update("matchedUsers", vm.matchedUsers);

            $timeout(function() {
                next();
                console.log(user, matchedUser);
                matchedDialog.open(event, user, matchedUser);
            });
        }

        function dislike(event, dislikedUser) {

            vm.liked = false;
            $timeout(function() {
                next();
            });
        }

        function next() {
            vm.users = search.next();
            if (vm.users.length == 0) {
                from += 10;
                findMatches(from);
            }
        }

        function showProfile(id) {
            $location.url("/home/" + id);
        }
    }
})();
