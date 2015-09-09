(function() {
    'use strict';

    angular
        .module('tindir.components')
        .controller('MainPanelController', MainPanelController);

    MainPanelController.$inject = ["$timeout", "sessionManager", "user", "search", "$location", "matchedDialog", "searchOptions"];

    /* @ngInject */
    function MainPanelController($timeout, sessionManager, user, search, $location, matchedDialog, searchOptions) {
        var vm = this;
        var from = 0;
        vm.title = 'MainPanelController';
        vm.displayInterests = false;
        vm.users = [];
        vm.sessionUser = user;
        vm.matchedUsers = [];

        vm.like = like;
        vm.dislike = dislike;
        vm.showProfile = showProfile

        activate();

        ////////////////

        function activate() {

            vm.displayInterests = searchOptions.getSortByInterests();
            searchOptions.setInterests(user.interests, false); //false means don't propagate
            findMatches(from, searchOptions.options);
            sessionManager.addListener("searchOptions", function(options) {
                vm.displayInterests = searchOptions.getSortByInterests();
                findMatches(from, options);
            });
        }

        function findMatches(from, options) {

            search
                .findMatches(from, user, options)
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
                findMatches(from, searchOptions.options);
            }
        }

        function showProfile(id) {
            $location.url("/home/" + id);
        }
    }
})();
