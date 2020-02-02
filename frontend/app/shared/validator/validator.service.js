/**
 * validator Service
 * @namespace validatorService
 * @memberOf Services
 */
(function () {
    'use strict';

    angular
            .module('app')
            .factory('validatorService', validatorService);

    validatorService.$inject = [];

    /**
     * @namespace validatorService
     * @memberOf validator
     */
    function validatorService() {
        var vm = this;
        vm.data = {data: {}};
        var service = {
            getData: __getData,
            setData: __setData
        };

        return service;

        function __getData() {
            return vm.data;
        }
        function __setData(data) {
            return vm.data = data;
        }
    }
})();
