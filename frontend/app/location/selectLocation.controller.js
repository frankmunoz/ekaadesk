/**
 * selectLocation Controller
 * @namespace selectLocation
 * @memberOf Controllers
 */

(function () {

    "use strict";

    angular
            .module("app.selectLocation",[ 'smart-table'])
            .controller("selectLocationCtrl", selectLocationCtrl);

    selectLocationCtrl.$inject = ["selectLocationService","$translate","$location", "$routeParams","$rootScope","logger"];

    function selectLocationCtrl( selectLocationService,$translate, $location, $routeParams,$rootScope,toast) {
        var vm = this;
        vm.doNext = __doNext;
        vm.clean = __clean;
        activate();

        function activate() {
            initSelectLocation();
            toast.log($translate.instant('SELECT-LOCATION'));
        }

        function initSelectLocation(){
            vm.id = $routeParams.id | 0;
            vm.geolocations = JSON.parse(localStorage.getItem('geolocationsByPartner'));
            vm.institutions = JSON.parse(localStorage.getItem('institutionsByPartner'));
        }

        function __clean(obj){
            switch(obj){
                case "all":
                    selectLocationService.get(vm.data.departamento).then(function(data){
                        vm.geolocationsByparent = data;
                    });
                    vm.data.municipio = null;
                    vm.data.institution = null;
                break;
                case "ins":
                    vm.data.institution = null;
                break;
            }
        }

        function __doNext(){
            angular.forEach(vm.institutions, function(value, key) {
              if(value.id == vm.data.institution){
                localStorage.setItem('userInstitution',JSON.stringify(value) );
              }
            });            
            $location.path("welcome/");
        }

    }

})();