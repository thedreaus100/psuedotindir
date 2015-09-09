(function() {
    'use strict';

    angular
        .module('tindir.common')
        .directive('dynamicImage', dynamicImage);

    dynamicImage.$inject = ["$timeout"];

    /* @ngInject */
    function dynamicImage($timeout) {
        // Usage:
        //
        // Creates:
        //
        var dynamicImage = {
            bindToController: true,
            controller: Controller,
            controllerAs: 'vm',
            link: link,
            restrict: 'E',
            templateUrl: "app/common/dynamic-image/dynamic-image.html",
            scope: {
                src: "=",
                fit: "="
            }
        };
        return dynamicImage;

        function link(scope, element, attrs) {

            scope.$watch("vm.fit", function(fit) {
                scope.fit = fit;
            });

            scope.$watch("vm.src", function(src) {

                if (src) {
                    var img = new Image();
                    img.onload = function(event) {
                        $timeout(function() {
                            scope.orientation = getOrientation(img);
                        });
                    }
                    img.src = src;
                }
            });

            function getOrientation(img) {

                var rc = (element.width() / element.height() > img.width / img.height); //ration comparison
                if (img.width < element.width() && img.height < element.height())
                    return "0"; //fit
                else if ((rc && !scope.fit) || (!rc && scope.fit)) {
                    return 1; //landscape
                } else return 2; //potrait
            }
        }
    }

    /* @ngInject */
    function Controller() {

        var vm = this;
        this.orientation = 1;
    }
})();
