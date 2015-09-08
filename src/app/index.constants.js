/* global malarkey:false, toastr:false, moment:false */
(function() {
  'use strict';

  angular
    .module('tindir')
    .constant('malarkey', malarkey)
    .constant('toastr', toastr)
    .constant('moment', moment)
    .constant('assets',{
    	images:{
    		dir:"assets/images",
    		facebookLogin:"assets/images/fb-login-1.png"
    	}
    });

})();
