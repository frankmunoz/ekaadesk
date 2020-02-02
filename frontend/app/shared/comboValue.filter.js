/**
 * 
 * @returns {undefined}
 * @sample <span ng-repeat="(key,value) in assistance.field.comboLocationList| comboValue: {id:assistance.field.salesRoom}">{{value.description}}
 */

'use strict';
(
        function () {
            angular.module('app')
                    .filter('comboValue', function () {
                        return function () {
                            var result = {};
                            var id = arguments[1].id;
                            angular.forEach(arguments[0], function (value, key) {
                                if (value.id === id) {
                                    result[key] = value;
                                }
                            });
                            return result;
                        };
                    });
        }
)();