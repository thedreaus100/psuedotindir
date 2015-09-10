!function(){"use strict";angular.module("tindir",["ngAnimate","ngCookies","ngTouch","ngSanitize","restangular","ui.router","ngMaterial","ngMdIcons","tindir.common","tindir.components","tindir.core"])}(),function(){"use strict";function e(){function e(){return t}var t=[{title:"AngularJS",url:"https://angularjs.org/",description:"HTML enhanced for web apps!",logo:"angular.png"},{title:"BrowserSync",url:"http://browsersync.io/",description:"Time-saving synchronised browser testing.",logo:"browsersync.png"},{title:"GulpJS",url:"http://gulpjs.com/",description:"The streaming build system.",logo:"gulp.png"},{title:"Jasmine",url:"http://jasmine.github.io/",description:"Behavior-Driven JavaScript.",logo:"jasmine.png"},{title:"Karma",url:"http://karma-runner.github.io/",description:"Spectacular Test Runner for JavaScript.",logo:"karma.png"},{title:"Protractor",url:"https://github.com/angular/protractor",description:"End to end test framework for AngularJS applications built on top of WebDriverJS.",logo:"protractor.png"},{title:"Angular Material Design",url:"https://material.angularjs.org/#/",description:"The Angular reference implementation of the Google's Material Design specification.",logo:"angular-material.png"},{title:"Sass (Ruby)",url:"http://sass-lang.com/",description:"Original Syntactically Awesome StyleSheets implemented in Ruby",logo:"ruby-sass.png"}];this.getTec=e}angular.module("tindir").service("webDevTec",e)}(),function(){"use strict";angular.module("tindir.components",[])}(),function(){"use strict";function e(e,t,n){function i(){n.addListener("matchedUsers",function(e){a.users=e})}function o(t){e("right-panel").toggle()}var a=this;a.title="RightPanelController",a.close=o,i()}angular.module("tindir.components").controller("RightPanelController",e),e.$inject=["$mdSidenav","user","sessionManager"]}(),function(){"use strict";function e(e){function t(t,n,i){e.show({targetEvent:t,templateUrl:"app/components/matched/matched.html",controller:"MatchedController",controllerAs:"mCtrl",clickOutsideToClose:!0,escapeToClose:!0,locals:{me:n,user:i}})}this.open=t}angular.module("tindir.components").service("matchedDialog",e),e.$inject=["$mdDialog"]}(),function(){"use strict";function e(e,t,n){function i(){}function o(){e.hide()}var a=this;a.title="MatchedController",a.close=o,a.me=t,a.user=n,i()}angular.module("tindir.components").controller("MatchedController",e),e.$inject=["$mdDialog","me","user"]}(),function(){"use strict";function e(e){function t(t,n,i,o){var a,s=e(n[0],{typeSpeed:40,deleteSpeed:40,pauseDelay:800,loop:!0,postfix:" "});n.addClass("acme-malarkey"),angular.forEach(t.extraValues,function(e){s.type(e).pause()["delete"]()}),a=t.$watch("vm.contributors",function(){angular.forEach(o.contributors,function(e){s.type(e.login).pause()["delete"]()})}),t.$on("$destroy",function(){a()})}function n(e,t){function n(){return i().then(function(){e.info("Activated Contributors View")})}function i(){return t.getContributors(10).then(function(e){return o.contributors=e,o.contributors})}var o=this;o.contributors=[],n()}var i={restrict:"E",scope:{extraValues:"="},template:"&nbsp;",link:t,controller:n,controllerAs:"vm"};return n.$inject=["$log","githubContributor"],i}angular.module("tindir").directive("acmeMalarkey",e),e.$inject=["malarkey"]}(),function(){"use strict";function e(e,t,n,i,o){function a(){c.profile_user.interests=c.profile_user.interests||[],n.$on("$stateChangeStart",l)}function s(){return e===t}function r(e){return console.log(e),e}function l(n,a,r,l,c){s()&&(console.log("updating profile info!"),e.interests=t.interests,e.save().then(function(t){o.setInterests(e.interests),i.show(i.simple().content("Updated Profile!"))},function(e){i.show(i.simple().content(e))}))}var c=this;c.profile_user=t,c.title="ProfileController",c.isMe=s,c.updateInterests=r,a()}angular.module("tindir.components").controller("ProfileController",e),e.$inject=["user","profile_user","$scope","$mdToast","searchOptions"]}(),function(){"use strict";function e(e,t,n,i,o,a,s){function r(){g.displayInterests=s.getSortByInterests(),s.setInterests(n.interests,!1),l(p,s.options),t.addListener("searchOptions",function(e){g.displayInterests=s.getSortByInterests(),l(p,e)})}function l(e,t){i.findMatches(e,n,t).then(function(e){g.users=e})}function c(i,o){g.liked=!0,o||(o=g.users[0]),g.matchedUsers.push(o),t.update("matchedUsers",g.matchedUsers),e(function(){u(),a.open(i,n,o)})}function d(t,n){g.liked=!1,e(function(){u()})}function u(){g.users=i.next(),0==g.users.length&&(p+=10,l(p,s.options))}function m(e){o.url("/home/"+e)}var g=this,p=0;g.title="MainPanelController",g.displayInterests=!1,g.users=[],g.sessionUser=n,g.matchedUsers=[],g.like=c,g.dislike=d,g.showProfile=m,r()}angular.module("tindir.components").controller("MainPanelController",e),e.$inject=["$timeout","sessionManager","user","search","$location","matchedDialog","searchOptions"]}(),function(){"use strict";function e(e,t,n,i,o){function a(){r.user.firstName||(r.user.firstName=r.user.displayName.split(" ")[0]),r.distance=i.getDistance()}function s(t){e("left-panel").toggle()}var r=this;r.title="LeftPanelController",r.user=n,r.close=s,r.setSortByInterests=i.setSortByInterests,r.getSortByInterests=i.getSortByInterests,r.setDistance=i.setDistance,r.getDistance=i.getDistance,a()}angular.module("tindir.components").controller("LeftPanelController",e),e.$inject=["$mdSidenav","sessionManager","user","searchOptions","$scope"]}(),function(){"use strict";function e(e,t){function n(n){function o(e){return e.data}function a(t){e.error("XHR Failed for getContributors.\n"+angular.toJson(t.data,!0))}return n||(n=30),t.get(i+"/contributors?per_page="+n).then(o)["catch"](a)}var i="https://api.github.com/repos/Swiip/generator-gulp-angular",o={apiHost:i,getContributors:n};return o}angular.module("tindir").factory("githubContributor",e),e.$inject=["$log","$http"]}(),function(){"use strict";angular.module("tindir.common",["common.background-slider"])}(),function(){"use strict";function e(e){function n(t,n,i){function o(e){var i=n.width()/n.height()>e.width/e.height;return e.width<n.width()&&e.height<n.height()?"0":i&&!t.fit||!i&&t.fit?1:2}t.$watch("vm.fit",function(e){t.fit=e}),t.$watch("vm.src",function(n){if(n){var i=new Image;i.onload=function(n){e(function(){t.orientation=o(i)})},i.src=n}})}var i={bindToController:!0,controller:t,controllerAs:"vm",link:n,restrict:"E",templateUrl:"app/common/dynamic-image/dynamic-image.html",scope:{src:"=",fit:"="}};return i}function t(){this.orientation=1}angular.module("tindir.common").directive("dynamicImage",e),e.$inject=["$timeout"]}(),function(){"use strict";angular.module("common.background-slider",[])}(),function(){"use strict";function e(){function e(e,t,n){}var n={bindToController:!0,controller:t,controllerAs:"vm",link:e,restrict:"E",templateUrl:"app/common/background-slider/common.background-slider.html",scope:{slides:"="}};return n}function t(e,t,n,i){function o(){s.activeIndex=0,s.landscape=!0,t.$watch("vm.slides",function(e){e&&n(a,5e3)}),t.$watch(function(){return i("sm")},function(e){s.landscape=!e})}function a(){s.activeIndex=(s.activeIndex+1+s.slides.length)%s.slides.length}var s=this;o()}angular.module("common.background-slider").directive("backgroundSlider",e),e.$inject=[],t.$inject=["$document","$scope","$interval","$mdMedia"]}(),function(){"use strict";function e(e){function t(){n.slides.push(e.images.dir+"/friends1.jpg"),n.slides.push(e.images.dir+"/couple1.jpg"),n.slides.push(e.images.dir+"/couple2.jpg")}var n=this;n.slides=[],n.fbicon=e.images.facebookLogin,t()}angular.module("tindir").controller("SignInController",e),e.$inject=["assets"]}(),function(){"use strict";function e(e){function t(){}function n(t){e("left-panel").toggle()}function i(t){e("right-panel").toggle()}var o=this;o.title="MainHeaderController",o.toggleLeftPanel=n,o.toggleRightPanel=i,t()}angular.module("tindir").controller("MainHeaderController",e),e.$inject=["$mdSidenav"]}(),function(){"use strict";function e(e,t,n,i){function o(){}function a(){}var s=this;s.awesomeThings=[],s.classAnimation="",s.creationDate=1440775347047,s.showToastr=a,s.queryMedia=i,o()}angular.module("tindir").controller("MainController",e),e.$inject=["$timeout","webDevTec","toastr","$mdMedia"]}(),function(){"use strict";angular.module("tindir.core",[])}(),function(){"use strict";function e(e){function t(){return e.one("api/user","me").get()}function n(t){return e.one("api/user",t).get()}function i(t,n,i){var o={lat:t.lat,lon:t.lon,distance:n.distance,sortbyinterests:n.sortByInterests,interests:n.interests,from:i||0};return e.one("api/user/search").getList("matches",o)}this.getSessionUser=t,this.findMatches=i,this.getUserById=n}angular.module("tindir.core").service("UserResource",e),e.$inject=["Restangular"]}(),function(){"use strict";function e(e){function t(e,t){i[e]||(i[e]=[]),i[e].push({term:e,callback:t})}function n(t,n){e(function(){for(var e in i[t])i[t][e].callback(n)})}var i={};this.addListener=t,this.update=n}angular.module("tindir.core").service("sessionManager",e),e.$inject=["$timeout"]}(),function(){"use strict";function e(e){function t(e,t){l.options.sortByInterests=e,r(t)}function n(){return l.options.sortByInterests}function i(e,t){l.options.interests=e,r(t)}function o(){return l.options.interests}function a(e,t){l.options.distance=e,r(t)}function s(e){return l.options.distance}function r(t){(void 0==t||t)&&e.update("searchOptions",l.options)}var l=this;l.options={distance:10},this.setSortByInterests=t,this.getSortByInterests=n,this.setInterests=i,this.getInterests=o,this.setDistance=a,this.getDistance=s}angular.module("tindir.core").service("searchOptions",e),e.$inject=["sessionManager"]}(),function(){"use strict";function e(e,t,n){function i(i,o,l){function c(e){r.users=e.map(u),console.log("retrieved: "+r.users.length+" users"),m.resolve(r.users)}function d(e){console.log(e),m.reject(e)}function u(e){var t=e._source;return e.sort&&(t.distance=Math.round(e.sort[0])),t}var m=n.defer();return r.users&&r.users.length>0&&JSON.stringify(s)==JSON.stringify(l)?m.resolve(r.users):(s=a(l),t.then(function(t){return e.findMatches(t,l,i)}).then(c,d)),m.promise}function o(){return r.users.shift(),r.users}function a(e){var t={};for(var n in e)t[n]=e[n];return t}var s,r=this;r.users=[],r.findMatches=i,r.next=o}angular.module("tindir.core").service("search",e),e.$inject=["UserResource","geolocation","$q"]}(),function(){"use strict";function e(e){function t(){var t=e.defer();return"geolocation"in navigator?navigator.geolocation.getCurrentPosition(function(e){e?t.resolve({lat:e.coords.latitude,lon:e.coords.longitude}):t.reject()}):t.reject(),t.promise}return t()}angular.module("tindir.core").factory("geolocation",e),e.$inject=["$q"]}(),function(){"use strict";function e(){function e(e,t){return e.filter(function(e){return-1!=t.indexOf(e)})}return e}angular.module("tindir.common").filter("filterMatches",e)}(),function(){"use strict";function e(){function e(e){return e.split(" ")[0]}return e}angular.module("tindir.common").filter("firstName",e)}(),function(){"use strict";function e(e){e.theme("default").primaryPalette("light-blue",{"default":"400","hue-1":"100","hue-2":"600","hue-3":"900"}).accentPalette("indigo",{"default":"200","hue-1":"100","hue-2":"400","hue-3":"700"})}angular.module("tindir").config(e),e.$inject=["$mdThemingProvider"]}(),function(){"use strict";function e(e,t){e.debug("runBlock end")}angular.module("tindir").run(e),e.$inject=["$log","$location"]}(),function(){"use strict";function e(e,t){e.state("signin",{url:"/signin",views:{header:{templateUrl:"src/app/signin-header/signin-header.html"},main:{templateUrl:"src/app/signin/signin.html",controller:"SignInController",controllerAs:"signIn"}}}).state("home",{url:"/home",resolve:{user:["UserResource","$q",function(e,t){var n=t.defer();return e.getSessionUser().then(function(e){n.resolve(e)},function(e){n.resolve(null)}),n.promise}]},views:{header:{templateUrl:"src/app/main-header/main-header.html",controller:"MainHeaderController",controllerAs:"mainHeader"},main:{templateUrl:"src/app/main/main.html",controller:"MainController",controllerAs:"main"},"leftpanel@home":{templateUrl:"src/app/components/left-panel/left-panel.html",controller:"LeftPanelController",controllerAs:"leftPanel"},"mainpanel@home":{templateUrl:"src/app/components/main-panel/main-panel.html",controller:"MainPanelController",controllerAs:"mainPanel"},"rightpanel@home":{templateUrl:"src/app/components/right-panel/right-panel.html",controller:"RightPanelController",controllerAs:"rightPanel"}}}).state("home.profile",{url:"/:userid",views:{mainpanel:{templateUrl:"src/app/components/main-panel-profile/main-panel-profile.html",controller:"ProfileController",controllerAs:"profilePanel",resolve:{profile_user:["user","$stateParams","UserResource",function(e,t,n){return t.userid?n.getUserById(t.userid):e}]}}}}),t.otherwise("/home")}angular.module("tindir").config(e),e.$inject=["$stateProvider","$urlRouterProvider"]}(),function(){"use strict";function e(e){e.interceptors.push(["$q","$location",function(e,t){return{responseError:function(n){return n&&(console.log(n),401===n.status)?(console.log("forbidden"),t.url("/signin"),e.reject(n)):e.reject(n)}}}])}function t(e){e.setRestangularFields({id:"_id"})}angular.module("tindir").config(e).config(t),e.$inject=["$httpProvider"],t.$inject=["RestangularProvider"]}(),function(){"use strict";angular.module("tindir").constant("malarkey",malarkey).constant("toastr",toastr).constant("moment",moment).constant("assets",{images:{dir:"assets/images",facebookLogin:"assets/images/fb-login-1.png"}})}(),function(){"use strict";function e(e,t){e.debugEnabled(!0),t.options.timeOut=3e3,t.options.positionClass="toast-top-right",t.options.preventDuplicates=!0,t.options.progressBar=!0}function t(e){var t="bower_components/material-design-icons/sprites/svg-sprite/svg-sprite-action.svg",n="bower_components/material-design-icons/sprites/svg-sprite/svg-sprite-communication.svg",i="bower_components/material-design-icons/sprites/svg-sprite/svg-sprite-social.svg",o="bower_components/material-design-icons/sprites/svg-sprite/svg-sprite-content.svg",a="bower_components/material-design-icons/sprites/svg-sprite/svg-sprite-av.svg";e.defaultFontSet("fontawesome").defaultIconSet(t).iconSet("action",t).iconSet("communication",n).iconSet("social",i).iconSet("content",o).iconSet("av",a)}angular.module("tindir").config(e).config(t),e.$inject=["$logProvider","toastr"],t.$inject=["$mdIconProvider"]}(),angular.module("tindir").run(["$templateCache",function(e){e.put("app/main/main.html",'<div layout="column" flex="" layout-fill=""><md-sidenav md-component-id="left-panel" class="md-sidenav-left left-panel md-whiteframe-z4" layout="column" ng-class="{full:main.queryMedia(\'sm\')}"><div ui-view="leftpanel" flex="" layout="column"></div></md-sidenav><section layout="row" flex=""><md-content class="main-panel" flex="" layout="column" layout-align-gt-sm="center center"><div ui-view="mainpanel" layout="column" flex=""></div></md-content><md-sidenav class="md-sidenav-right md-whiteframe-z2 right-panel" md-component-id="right-panel" md-is-locked-open="$mdMedia(\'gt-md\')" flex-sm="100" ng-class="{full:main.queryMedia(\'sm\')}"><div ui-view="rightpanel" flex="" layout="column"></div></md-sidenav></section></div>'),e.put("app/main-header/main-header.html",'<md-toolbar class="header md-whiteframe-z2"><div class="main-header"><div class="md-toolbar-tools"><md-button aria-label="Open Left Panel" class="md-icon-button" ng-click="mainHeader.toggleLeftPanel($event)"><md-icon md-svg-icon="ic_view_headline_24px" aria-label="Left Menu" class="md-accent md-hue-1"></md-icon></md-button><md-divider></md-divider><md-button ng-href="/#/home" class="md-icon-button"><md-icon md-svg-icon="social:ic_whatshot_24px" aria-label="logo" class="logo md-accent"></md-icon></md-button><span hide-sm="" class="md-accent md-hue-1">Psuedo-Tindir</span><md-button aria-label="Open Right Panel" class="md-icon-button" ng-click="mainHeader.toggleRightPanel($event)" hide-gt-md=""><md-icon md-svg-icon="communication:ic_chat_24px" aria-label="Left Menu" class="md-primary md-hue-1"></md-icon></md-button><span flex=""></span> <span></span></div></div></md-toolbar>'),e.put("app/signin/signin.html",'<background-slider slides="signIn.slides"></background-slider><div flex="" layout="row" layout-align="space-around end" class="signin-container"><div layout="column" class="button-container"><div class="caption" layout="column" layout-align="center center"><h2 class="md-display-2"><q>Any swipe can change your life.</q></h2></div><div layout="column" layout-align="center center"><a href="/api/auth/facebook"><img ng-src="{{signIn.fbicon}}" class="md-whiteframe-z2"></a></div></div></div>'),e.put("app/signin-header/signin-header.html",'<div class="signin-header"><md-toolbar class="header fixed"><div class="md-toolbar-tools"><md-icon md-svg-icon="social:ic_whatshot_24px" aria-label="logo" class="logo md-primary hue-1"></md-icon><span hide-sm="" class="md-primary hue-1">Psuedo-Tindir</span> <span flex=""></span><div layout="row" hide-sm=""><md-button flex="" class="md-accent hue-1">Blog</md-button><md-button flex="" class="md-accent hue-1">Support</md-button><md-button flex="" class="md-accent hue-1">Jobs</md-button><md-button flex="" class="md-accent hue-1">Press</md-button></div><div hide-gt-sm=""><md-menu class="signin-menu"><md-button aria-label="Open Blog" class="md-icon-button" ng-click="$mdOpenMenu($event)"><md-icon md-svg-icon="ic_view_headline_24px" aria-label="Menu" md-menu-origin="" md-position-mode="target-right target"></md-icon></md-button><md-menu-content width="4" hide-gt-sm=""><md-menu-item class="sign-in"><md-button aria-label="Open Blog"><md-icon md-svg-icon="communication:ic_comment_24px" aria-label="android" md-menu-align-target=""></md-icon>Blog</md-button></md-menu-item><md-menu-item class="sign-in"><md-button aria-label="Open Blog"><md-icon md-svg-icon="communication:ic_live_help_24px" aria-label="android" md-menu-align-target=""></md-icon>Help</md-button></md-menu-item><md-menu-item class="sign-in"><md-button aria-label="Open Blog"><md-icon md-svg-icon="ic_work_24px" aria-label="android" md-menu-align-target=""></md-icon>Jobs</md-button></md-menu-item><md-divider></md-divider><md-menu-item class="sign-in"><md-button aria-label="Open Blog"><md-icon md-svg-icon="communication:ic_forum_24px" aria-label="android" md-menu-align-target=""></md-icon>Press</md-button></md-menu-item></md-menu-content></md-menu></div></div></md-toolbar></div>'),e.put("app/common/background-slider/common.background-slider.html",'<div layout-fill="" ng-repeat="slide in vm.slides" class="slide" style="background:url({{slide}}) 50% 0% no-repeat;background-size:{{vm.landscape?\'100% auto\':\'auto 100%\'}}" ng-hide="$index != vm.activeIndex"></div>'),e.put("app/common/dynamic-image/dynamic-image.html",'<div flex="" layout-fill="" style="background:url({{vm.src}}) 50% 50% no-repeat;background-size:{{orientation==0?\'initial initial\':(orientation==1?\'100% auto\':\'auto 100%\')}}" class="dynamic-image"></div>'),e.put("app/components/left-panel/left-panel.html",'<md-toolbar class="md-accent md-hue-1 md-tall" layout="column"><img ng-src="{{leftPanel.user.photos[0].value}}" class="background"><md-button aria-label="Close Right Panel" class="md-icon-button exit-button" ng-click="leftPanel.close($event)"><md-icon md-svg-icon="content:ic_clear_24px" aria-label="Left Menu"></md-icon></md-button><div class="inner" layout="row" layout-fill="" layout-align="center center"><div layout="column"><img ng-src="{{leftPanel.user.photos[0].value}}" class="profile_pic md-whiteframe-1"></div><div layout="column"><h3 class="displayName">{{leftPanel.user.firstName}} <a href="#/home/"><small>View Profile</small></a></h3></div></div></md-toolbar><md-content flex="" layout-padding=""><div flex="" layout-padding=""><md-list layout-padding=""><md-list-item class="md-3-line"><md-icon md-svg-icon="ic_search_24px" aria-label="Left Menu"></md-icon><div class="md-list-item-text"><h3>Search Options</h3><p layout-align="start start"><label>Sort By Interests:</label><md-switch ng-model="leftPanel.sortByInterests" aria-label="Toggle Sort" ng-change="leftPanel.setSortByInterests(leftPanel.sortByInterests)">{{ leftPanel.getSortByInterests() ? \'yes\':\'no\'}}</md-switch></p></div></md-list-item><md-divider></md-divider><md-list-item class="md-3-line"><md-icon md-svg-icon="ic_search_24px" aria-label="Left Menu"></md-icon><div class="md-list-item-text"><h3>Search Options</h3><p layout-align="start start"><label>Distance: {{leftPanel.distance}} miles</label><md-slider ng-model="leftPanel.distance" step="5" min="5" max="100" ng-change="leftPanel.setDistance(leftPanel.distance)" aria-label="Set Distance"></md-slider></p></div></md-list-item></md-list></div></md-content>'),e.put("app/components/main-panel/main-panel.html",'<div layout="column" flex="" layout-padding=""><div flex="" class="card-container" layout-fill="" ng-class="{centered:main.queryMedia(\'gt-sm\')}" ng-show="mainPanel.users.length>0"><md-card class="stacked" ng-repeat="user in mainPanel.users | limitTo:3" ng-class="{z1:$index==0,z2:$index==1,z3:$index==2,like:mainPanel.liked}" md-padding="" md-swipe-left="mainPanel.dislike($event,user)" md-swipe-right="mainPanel.like($event,user)" layout="column" ng-click="mainPanel.showProfile(user.id)"><dynamic-image src="user.photos[0].value" layout="column" flex=""></dynamic-image><div layout="row" layout-padding="" md-padding=""><span>{{user.displayName | firstName}}</span> <span flex=""></span> <span ng-show="!mainPanel.displayInterests">{{user.distance}} miles</span> <span ng-show="mainPanel.displayInterests"><span ng-repeat="interest in user.interests | filterMatches:mainPanel.sessionUser.interests">{{interest}}</span></span></div></md-card></div><div flex="" layout-fill="" ng-show="mainPanel.users.length==0" layout-align="center center" layout="column"><div align="center"><h3>Sorry There Is No one Out there, Try broadening your search or try Moving!</h3><div><small>Requires Geolocation...We $q not to follow you.</small></div></div></div></div><div class="seperator"></div><div layout="column" layout-align="center center" ng-show="mainPanel.users.length>0"><div flex="" class="actions-panel"><md-button class="md-whiteframe-z1 md-fab action small"><md-icon md-svg-icon="av:ic_replay_24px" aria-label="Left Menu"></md-icon></md-button><md-button class="md-whiteframe-z3 md-fab action large" ng-click="mainPanel.dislike($event)"><md-icon md-svg-icon="content:ic_clear_24px" aria-label="Left Menu"></md-icon></md-button><md-button class="md-whiteframe-z3 md-fab action large" ng-click="mainPanel.like($event)"><md-icon md-svg-icon="social:ic_whatshot_24px" aria-label="Left Menu"></md-icon></md-button><md-button class="md-whiteframe-z1 md-fab action small"><md-icon md-svg-icon="communication:ic_location_on_24px" aria-label="Left Menu"></md-icon></md-button></div></div><div class="seperator"></div>'),e.put("app/components/main-panel-profile/main-panel-profile.html",'<div layout="column" flex="" layout-padding=""><div flex="" class="card-container" layout-fill="" ng-class="{centered:main.queryMedia(\'gt-sm\')}" ng-show="profilePanel.profile_user"><md-card class="stacked z1" md-padding="" layout="column" layout-padding=""><dynamic-image src="profilePanel.profile_user.photos[0].value" layout="column" flex="" fit="true"></dynamic-image><div layout="row" layout-padding="" md-padding=""><span>{{profilePanel.profile_user.displayName}}</span> <span flex=""></span></div><div layout-padding=""><md-subheader>Interests</md-subheader><md-padding><md-chips ng-model="profilePanel.profile_user.interests" readonly="!profilePanel.isMe()" placeholder="What are you interested in?" md-on-append="profilePanel.updateInterests($chip)"></md-chips></md-padding></div></md-card></div><div flex="" layout-fill="" ng-show="!profilePanel.profile_user" layout-align="center center" layout="column"><div align="center"><h3>profilePanel.profile_user Doesn\'t Exist</h3></div></div></div><div class="seperator"></div>'),e.put("app/components/matched/matched.html",'<md-dialog aria-label="List dialog" class="matched"><md-dialog-content layout="column" layout-align="center center"><h1>Its a Match</h1><div layout="row"><dynamic-image src="mCtrl.me.photos[0].value" class="image-icon medium md-whiteframe-z1" alt="{{mCtrl.me.displayName}}"></dynamic-image><dynamic-image src="mCtrl.user.photos[0].value" class="image-icon medium md-whiteframe-z1" alt="{{mCtrl.user.displayName}}"></dynamic-image></div><div>You and {{mCtrl.user.displayName | firstName}} have liked each other!</div><div layout="row"><md-button class="match-options md-whiteframe-z1" ng-click="mCtrl.close()">Message</md-button><md-button class="match-options md-whiteframe-z1" ng-click="mCtrl.close()">Keep Playing</md-button></div></md-dialog-content></md-dialog>'),e.put("app/components/right-panel/right-panel.html",'<md-toolbar class="md-accent md-hue-1"><div class="md-toolbar-tools" layout="column"><h1>Messages</h1><div flex=""></div><md-button aria-label="Close Right Panel" class="md-icon-button" ng-click="rightPanel.close($event)" hide-gt-md=""><md-icon md-svg-icon="content:ic_clear_24px" aria-label="Left Menu"></md-icon></md-button></div></md-toolbar><md-content flex="" layout="column"><md-list flex=""><md-list-item class="md-3-line" ng-repeat="user in rightPanel.users"><div layout="column" layout-align="center center" layout-padding=""><dynamic-image src="user.photos[0].value" class="image-icon medium md-whiteframe-z1" alt="{{user.displayName}}"></dynamic-image></div><div class="md-list-item-text"><h3>{{user.displayName}}</h3><h4>Start the conversation</h4></div><md-divider></md-divider></md-list-item></md-list></md-content>')}]);