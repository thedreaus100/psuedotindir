(function() {
    'use strict';

    angular
        .module('tindir.components')
        .service('matchedDialog', matchedDialog);

    matchedDialog.$inject = ['$mdDialog'];

    /* @ngInject */
    function matchedDialog($mdDialog) {

        this.open = openDialog;

        ////////////////

        function openDialog($event, me, user) {

            $mdDialog.show({
                targetEvent: $event,
                templateUrl: "app/components/matched/matched.html",
                controller: 'MatchedController',
                controllerAs: "mCtrl",
                clickOutsideToClose: true,
                escapeToClose:true,
                locals: {
                    me: me,
                    user: user
                }
            });
        }
    }
})();
