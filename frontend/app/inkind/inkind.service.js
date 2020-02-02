/**
 * assistance Service
 * @namespace assistanceservice
 * @memberOf Services
 */
(function () {
    'use strict';

    angular
            .module('app.inkind')
            .factory('inkindService', inkindService);

    inkindService.$inject = ['datagridService', 'appConfig', '$http'];

    /**
     * @namespace inkindService
     * @param datagridService
     * @param appConfig
     * @param $http
     * @memberOf assistance
     */
    function inkindService(datagridService, appConfig, $http) {
        var urlService = appConfig.path.service;
        var assistance = {};
        var service = {
            put: __put,
            post: __post,
            get: __get,
            all: __all,
        };

        return service;

        function __post(inkind) {
            return $http.post(urlService + 'beneficiary/', inkind)
                    .then(getComplete)
                    .catch(getFailed);
        }

        function __put(data) {
            console.log("dataPUT===============>",data);
            return $http.put(urlService + 'beneficiary/' + data.id + '/', data)
                    .then(getComplete)
                    .catch(getFailed);
        }

        function __get(id) {
            var url = urlService + "beneficiaries/" + (id?id:'');
            return $http({
                url: url,
                method: 'GET'
            })
                    .then(getComplete)
                    .catch(getFailed);
        }

        function __all(tableState) {
            var params = {};
            var url = urlService + "beneficiaries";
            return datagridService.getDataToService(url, params, tableState);
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
    }
})();