(function() {
    'use strict';

    angular
        .module('tindir.core')
        .service('sessionManager', sessionManager);

    sessionManager.$inject = ['$timeout'];

    /* @ngInject */
    function sessionManager($timeout) {

        /*Function is a misnomer pretty much sort of allows the sharing of scopes*/
        /*Consider Saving variables in the session manager*/

        var listeners = {};
        this.addListener = addListener;
        this.update = update;
        ////////////////

        function addListener(term, callback) {

            if (!listeners[term]) listeners[term] = [];
            listeners[term].push({
                term: term,
                callback: callback
            });
        }

        function update(term, value) {

            $timeout(function() {
                for (var li in listeners[term]) {
                    listeners[term][li].callback(value);
                }
            });

        }
    }
})();
