/**
 * assistance Service
 * @namespace assistanceservice
 * @memberOf Services
 */
(function () {
    'use strict';

    angular
            .module('app.filing')
            .factory('filingService', filingService);

    filingService.$inject = ['datagridService', 'appConfig', '$http'];

    /**
     * @namespace filingService
     * @param datagridService
     * @param appConfig
     * @param $http
     * @memberOf assistance
     */
    function filingService(datagridService, appConfig, $http) {
        var urlService = appConfig.path.service;
        var assistance = {};
        var service = {
            put: __put,
            post: __post,
            get: __get,
            all: __all,
            getCards: __getCards,
            getRating: __getRating,
            getCourtesy: __getCourtesy,
            getComment: __getComment,
            getPhones: __getPhones,
            getAddress: __getAddress,
            getEmail: __getEmail,
            getElegibleToContract: __getElegibleToContract
        };

        return service;

        function __post(filing) {
            return $http.post(urlService + 'correspondencia/', filing)
                    .then(getComplete)
                    .catch(getFailed);
        }

        function __put(assistance) {
            return $http.put(urlService + 'correspondencia/', assistance)
                    .then(getComplete)
                    .catch(getFailed);
        }

        function __get(id) {
            var url = urlService + "correspondencia/" + id;
            return $http({
                url: url,
                method: 'GET'
            })
                    .then(getCompleteAssistance)
                    .catch(getFailed);
        }

        function __all(tableState) {
            var params = {};
            var url = urlService + "correspondencia";
            return datagridService.getDataToService(url, params, tableState);
        }

        /*
         * Assistance Data
         */
        function __getRating(tableState) {
            this.getRating = function (tableState) {
                this.getRating = function (tableState) {
                    var params = {assistance: tableState.id};
                    var url = urlService + "assistance/ratings";
                    return datagridService.getDataToService(url, params, tableState);
                };
                return datagridService.evalDataObject(assistance.data, 'ratingList');
            };
        }

        function __getCourtesy(tableState) {
            this.getCourtesy = function (tableState) {
                this.getCourtesy = function (tableState) {
                    var params = {assistance: tableState.id};
                    var url = urlService + "assistance/courtesies";
                    return datagridService.getDataToService(url, params, tableState);
                };
                return datagridService.evalDataObject(assistance.data, 'courtesyList');
            };
        }

        function __getComment(tableState) {
            this.getComment = function (tableState) {
                this.getComment = function (tableState) {
                    var params = {assistance: tableState.id};
                    var url = urlService + "assistance/comments";
                    return datagridService.getDataToService(url, params, tableState);
                };
                return datagridService.evalDataObject(assistance.data, 'commentList');
            };
        }

        /*
         * Affiliated Data
         */
        function __getPhones() {
            this.getPhones = function (type, tableState) {
                this.getPhones = function (type, tableState) {
                    var params = {'type': type, "affiliated": tableState.id};
                    var url = urlService + "affiliated/phones";
                    return datagridService.getDataToService(url, params, tableState);
                };
                return datagridService.evalDataObject(assistance.data[type], 'phoneList');
            };
        }

        function __getAddress() {
            this.getAddress = function (type, tableState) {
                this.getAddress = function (type, tableState) {
                    var params = {'type': type, "affiliated": tableState.id};
                    var url = urlService + "affiliated/addresses";
                    return datagridService.getDataToService(url, params, tableState);
                };
                return datagridService.evalDataObject(assistance.data[type], 'addressList');
            };
        }

        function __getEmail() {
            this.getEmail = function (type, tableState) {
                this.getEmail = function (type, tableState) {
                    var params = {'type': type, "affiliated": tableState.id};
                    var url = urlService + "affiliated/emails";
                    return datagridService.getDataToService(url, params, tableState);
                };
                return datagridService.evalDataObject(assistance.data[type], 'emailList');
            };
        }

        function __getCards() {
            this.getCards = function (type, tableState) {
                this.getCards = function (type, tableState) {
                    var params = {'type': type, "affiliated": tableState.id};
                    var url = urlService + "affiliated/cards";
                    return datagridService.getDataToService(url, params, tableState);
                };
                return datagridService.evalDataObject(assistance.data[type], 'cardList');
            };
        }

        function __getElegibleToContract(assistanceId) {
            return $http.get(urlService + 'contract/eligibletocontract/' + assistanceId)
                    .then(getComplete)
                    .catch(getFailed);
        }

        function getCompleteAssistance(response) {
            assistance = {};
            assistance = response.data;
            return assistance;
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