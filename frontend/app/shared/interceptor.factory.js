/**
 * interceptor Service
 * @namespace interceptor
 * @memberOf Services
 */
(function () {
    'use strict';

    angular
            .module('app')
            .factory('httpInterceptor', httpInterceptor);

    httpInterceptor.$inject = ['$rootScope'];

    /**
     * @namespace interceptor
     * @param $rootScope
     * @memberOf interceptor
     */
    function httpInterceptor($rootScope) {
        var service = {
            request: __request,
            requestError: __requestError,
            response: __response,
            responseError: __responseError
        };

        return service;

        function __request(config) {
            $rootScope.$broadcast('start', config.url);
            return config;
        }

        function __requestError(rejection) {
            $rootScope.$broadcast('stop', rejection);
            return rejection;
        }

        function __response(response) {
            $rootScope.$broadcast('stop', response);
            return response;
        }

        function __responseError(rejection) {
            $rootScope.$broadcast('stop', rejection);
            return rejection;
        }
    }
})();
