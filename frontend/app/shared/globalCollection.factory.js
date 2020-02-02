/**
 * generalCollection Factory
 * @namespace globalCollectionFactory
 * @memberOf Services
 */
(function () {
    'use strict';

    angular
            .module('app')
            .factory('globalCollectionFactory', globalCollectionFactory);

    globalCollectionFactory.$inject = ['appConfig', '$http'];

    /**
     * @namespace assistanceService
     * @param appConfig
     * @param $http
     * @memberOf assistance
     */
    function globalCollectionFactory(appConfig, $http) {
        var urlService = localStorage.getItem('path');
        var service = {
            getHttpServiceCollection: __getHttpServiceCollection
        };

        return service;

        /*
         * Lists data
         */
        function __getHttpServiceCollection(service) {
            var url = urlService + 'collection/' + service;
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
    }
})();