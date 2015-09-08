(function() {
  'use strict';

  describe('controllers', function(){

    beforeEach(module('tindir'));

    it('should define SignInController', inject(function($controller) {
      var vm = $controller('SignInController');

      expect(vm).not.toBeUndefined();
    }));
  });
})();
