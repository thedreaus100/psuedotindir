(function() {
  'use strict';

  angular
    .module('tindir')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log,$location) {

    $log.debug('runBlock end');
    //$location.url("/signin");
  }

})();
