/**
 * assistance Service
 * @namespace assistanceservice
 * @memberOf Services
 */
(function () {
    'use strict';

    angular
            .module('app.kitchens')
            .factory('kitchensService', kitchensService);

    kitchensService.$inject = ['datagridService', 'appConfig', '$http'];

    /**
     * @namespace kitchensService
     * @param datagridService
     * @param appConfig
     * @param $http
     * @memberOf assistance
     */
    function kitchensService(datagridService, appConfig, $http) {
        var urlService = localStorage.getItem('path');
        var assistance = {};
        var service = {
            put: __put,
            post: __post,
            get: __get,
            getAttendances: __getAttendances,
            postAttendances: __postAttendances,
            getAttendanceToday: __getAttendanceToday,
            all: __all
        };

        return service;

        function __post(kitchens) {
            return $http.post(urlService + 'beneficiary/', kitchens)
                    .then(getComplete)
                    .catch(getFailed);
        }

        function __put(data) {
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

        function __getAttendances(id) {
            var url = urlService + "attendance/detail/beneficiary/" + id;
            return $http({
                url: url,
                method: 'GET'
            })
                    .then(getComplete)
                    .catch(getFailed);
        }

        function __getAttendanceToday(id) {
            var url = urlService + "attendance/today/beneficiary/" + id;
            return $http({
                url: url,
                method: 'GET'
            })
                    .then(getComplete)
                    .catch(getFailed);
        }

        function __postAttendances(attendance) {
            return $http.post(urlService + 'attendances/', attendance)
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