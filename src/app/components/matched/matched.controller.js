(function() {
    'use strict';

    angular
        .module('tindir.components')
        .controller('MatchedController', MatchedController);

    /* @ngInject */
    function MatchedController($mdDialog, me, user) {
        var vm = this;
        vm.title = 'MatchedController';
        vm.close = close;
        vm.me = me;
        vm.user = user;

        activate();

        ////////////////

        function activate() {

        }

        function close() {
            $mdDialog.hide();
        }
    }
})();
