/**
 * Paginator Directive
 * @namespace Paginator
 * @memberOf Directives
 */
(function () {
    'use strict';

    angular
            .module('app')
            .directive('paginator', paginator);

    // @ngInject
    paginator.$inject = [];

    /**
     * @namespace paginator
     * @desc paginator Directive
     * @memberOf paginator.Controller
     */
    function paginator() {
        var directive = {
            restrict: 'E',
            template: '<input type="text" class="select-page datagrid-filter" ng-model="inputPage" ng-change="selectPage(inputPage)">',
            link: function (scope, element, attrs) {
                scope.$watch('currentPage', function (c) {
                    scope.inputPage = c;
                });
            }
        };
        return directive;

    }
})();
