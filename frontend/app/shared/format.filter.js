'use strict';
(
        function () {
            angular.module('app')
                    .filter('format', function ($interpolate) {
                        return function () {
                            if (arguments[1] === undefined) {
                                return arguments[0];
                            }
                            try {
                                var date = new Date(arguments[0].substring(0, 10));
                                if (date instanceof Date) {
                                    arguments[0] = new Date(arguments[0]);
                                }
                            } catch (e) {
                            }

                            var result = $interpolate('{{value | ' + arguments[1] + '}}');
                            return result({value: arguments[0]});
                        };
                    });
        }
)();