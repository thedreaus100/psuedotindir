(function() {
    'use strict';

    angular
        .module('common.background-slider')
        .directive('backgroundSlider', backgroundSlider);

    backgroundSlider.$inject = [];

    /* @ngInject */
    function backgroundSlider() {
        // Usage:
        //
        // Creates:
        //
        var directive = {
            bindToController: true,
            controller: Controller,
            controllerAs: 'vm',
            link: link,
            restrict: 'E',
            templateUrl: "app/common/background-slider/common.background-slider.html",
            scope: {
                slides: "="
            }
        };
        return directive;

        function link(scope, element, attrs) {}
    }

    /* @ngInject */
    function Controller($document, $scope, $interval,$mdMedia) {

        var vm = this;

        ////////

        activate();

        function activate() {

            vm.activeIndex = 0;
            vm.landscape = true;

            $scope.$watch("vm.slides", function(slides) {

                if (slides) $interval(nextSlide, 5000);
            });

            $scope.$watch(function(){
                return $mdMedia("sm");
            },function(sm){

                vm.landscape = !sm;
            });
        }

        function nextSlide(){
           
            vm.activeIndex = (vm.activeIndex + 1 + vm.slides.length) % vm.slides.length;
        }
    }
})();
