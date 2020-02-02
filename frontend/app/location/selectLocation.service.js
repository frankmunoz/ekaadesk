/**
 * selectLocation Service
 * @namespace selectLocationservice
 * @memberOf Services
 */
(function () {
    'use strict';

    angular
            .module('app.selectLocation')
            .factory('selectLocationService', selectLocationService);

    selectLocationService.$inject = ['datagridService', 'appConfig', '$http'];

    /**
     * @namespace selectLocationService
     * @param datagridService
     * @param appConfig
     * @param $http
     * @memberOf selectLocation
     */
    function selectLocationService(datagridService, appConfig, $http) {
        var urlService = localStorage.getItem('path');
        var assistance = {};
        var service = {
            get: __get
        };     

        function __get(id) {
            var session = JSON.parse(localStorage.getItem('data'));
            var url = urlService + 'partner/'+session.partner+'/geolocationstype/2/parent/'+ id +'/geolocations/';
            return $http({
                url: url,
                method: 'GET'
            })
                    .then(getComplete)
                    .catch(getFailed);
        }        

        function getComplete(response) {
            return response.data;
        }

        function getFailed(error) {
            return {
                error: true,
                message: error
            };
        }

        return service;
    }
})();