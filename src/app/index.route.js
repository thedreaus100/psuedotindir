(function() {
    'use strict';

    angular
        .module('tindir')
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('signin', {
                url: '/signin',
                views: {
                    "header": {
                        templateUrl: 'src/app/signin-header/signin-header.html'
                    },
                    "main": {
                        templateUrl: 'src/app/signin/signin.html',
                        controller: 'SignInController',
                        controllerAs: 'signIn'
                    }
                }
            })
            .state('home', {
                url: '/home',
                resolve: {
                    user: function(UserResource, $q) {

                        var deferred = $q.defer();

                        UserResource.getSessionUser().then(function(user) {
                            deferred.resolve(user);
                        }, function(err) {
                            deferred.resolve(null);
                        });
                        return deferred.promise;
                    }
                },
                views: {
                    "header": {
                        templateUrl: 'src/app/main-header/main-header.html',
                        controller: 'MainHeaderController',
                        controllerAs: 'mainHeader'
                    },
                    "main": {
                        templateUrl: 'src/app/main/main.html',
                        controller: 'MainController',
                        controllerAs: 'main'
                    },
                    "leftpanel@home": {
                        templateUrl: "src/app/components/left-panel/left-panel.html",
                        controller: "LeftPanelController",
                        controllerAs: "leftPanel"
                    },
                    "mainpanel@home": {
                        templateUrl: "src/app/components/main-panel/main-panel.html",
                        controller: "MainPanelController",
                        controllerAs: "mainPanel"
                    },
                    "rightpanel@home": {
                        templateUrl: "src/app/components/right-panel/right-panel.html",
                        controller: "RightPanelController",
                        controllerAs: "rightPanel"
                    }
                }
            })
            .state("home.profile", {
                url: '/:userid',
                views: {
                    "mainpanel": {
                        templateUrl: "src/app/components/main-panel-profile/main-panel-profile.html",
                        controller: "ProfileController",
                        controllerAs: "profilePanel",
                        resolve: {
                            profile_user: function(user, $stateParams, UserResource) {

                                if ($stateParams.userid)
                                    return UserResource.getUserById($stateParams.userid);
                                else return user;
                            }
                        }
                    }
                }
            });

        $urlRouterProvider.otherwise('/home');
    }

})();
