/**
 * datagrid Service
 * @namespace datagridService
 * @memberOf Services
 */
(function () {
    'use strict';

    angular
            .module('app')
            .factory('datagridService', datagridService);

    datagridService.$inject = ['$http'];

    /**
     * @namespace datagridService
     * @param $http
     * @memberOf datagrid
     */
    function datagridService($http) {
        var vm = this;
        vm.behavior = {};
        vm.params = {};
        var service = {
            setBehavior: __setBehavior,
            getDataToService: __getDataToService,
            getDataToController: __getDataToController,
            addRowToList: __addRowToList,
            addRowToEndOfList: __addRowToEndOfList,
            getRowFromList: __getRowFromList,
            removeRowFromList: __removeRowFromList,
            objectSize: __objectSize,
            evalDataObject: __evalDataObject,
            rowExists: __rowExists,
            isNeedleInList: __isNeedleInList,
            removeDeletedRows: __removeDeletedRows
        };

        return service;

        function __getDataToService(url, params, tableState) {
            vm.params.pagination = tableState.pagination;
            vm.params.page = vm.params.pagination.start || 0;
            vm.params.rows = vm.params.pagination.number || 10;
            vm.params.filter = tableState.search;
            vm.params.sort = tableState.sort;
            vm.params.id = tableState.id;
            vm.params.search = [];
            angular.forEach(params, function (value, key) {
                vm.params[key] = value;
            });
            if (Object.keys(vm.params.filter).length > 0) {
                vm.params.search = JSON.stringify(tableState.search.predicateObject);
            }
            return $http({
                url: url,
                params: vm.params,
                method: 'GET'
            })
                    .then(getAllComplete)
                    .catch(getAllFailed);

            function getAllComplete(response) {
                return response.data;
            }

            function getAllFailed(error) {
                console.log(error);
                return {
                    error: true,
                    message: error
                };
            }

        }

        function __getDataToController(data, tableState) {
            try {
                if (data) {
                    tableState.pagination.numberOfPages = 1;
                    if (data.totalPages !== '' && data.totalPages > 1) {
                        tableState.pagination.numberOfPages = data.totalPages;
                    }
                }
                return data;
            } catch (error) {
                console.log(error);
            }
            return data;
        }

        function __setBehavior(behavior) {
            vm.behavior = behavior;
        }


        function replacer(key, value) {
            if (key === "$$hashKey" || key === "filledField") {
                return undefined;
            }
            return value;
        }

        function __objectSize(obj) {
            return $.map(obj, function (n, i) {
                return i;
            }).length;
        }

        function __evalDataObject(object, property) {
            if (isDefinedObject(object) && object.hasOwnProperty(property)) {
                return object[property];
            }
            return null;
        }

        function isDefinedObject(object) {
            return object !== undefined && object !== null;
        }

        function __rowExists(obj, list) {
            if (__objectSize(obj)) {
                var i = list.length;
                while (i--) {
                    if (JSON.stringify(list[i], replacer) === JSON.stringify(obj)) {
                        return true;
                    }
                }
            }
            return false;
        }

        function updateRowFromList(row, list) {
            var hashKey = row.$$hashKey;
            var rowExist = false;
            if (list.length) {
                for (var key in list) {
                    if (hashKey.toString() === list[key]['$$hashKey'].toString()) {
                        list[key] = row;
                        rowExist = true;
                    }
                }
            }
            if (!rowExist || !list.length) {
                list.unshift(row);
            }
            return list;
        }

        function __addRowToList(row, list) {
            if (row && !__rowExists(row, list)) {
                row.filledField = true;
                if (!row.$$hashKey) {
                    list.unshift(row);
                } else {
                    list = updateRowFromList(row, list);
                }
                row = null;
            }
            return row;
        }

        function __addRowToEndOfList(row, list) {
            if (row && !__rowExists(row, list)) {
                row.filledField = true;
                if (!row.$$hashKey) {
                    list.push(row);
                } else {
                    list = updateRowFromList(row, list);
                }
                row = null;
            }
            return row;
        }

        function __getRowFromList(row, viewList, tmpList) {
            var hashKey = row.$$hashKey;
            for (var key in viewList) {
                if (hashKey === viewList[key]['$$hashKey']) {
                    tmpList[key]['$$hashKey'] = hashKey;
                    return tmpList[key];
                }
            }
            return null;
        }

        function __removeRowFromList(row, list) {
            var index = list.indexOf(row);
            if (index !== -1) {
                list.splice(index, 1);
            }
            return row;
        }

        function __isNeedleInList(needle, list) {
            if (list !== undefined) {
                for (var i in list) {
                    if (list[i].id === needle) {
                        return true;
                    }
                }
            }
            return false;
        }

        function __removeDeletedRows(data, persistList) {
            if (data !== 'undefined' && persistList !== 'undefined') {
                for (var key in persistList) {
                    for (var row in data.data) {
                        if (persistList[key].delete && data.data[row].id === persistList[key].id) {
                            data.data.splice(row, 1);
                        }
                    }
                }
            }
            return data;
        }


    }

})();
