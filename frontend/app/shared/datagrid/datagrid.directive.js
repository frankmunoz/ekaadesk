/**
 * Datagrid Directive
 * @namespace Datagrid
 * @memberOf Directives
 */

(function () {
    'use strict';

    angular
            .module('app')
            .directive('datagrid', datagrid)
            ;

    // @ngInject
    datagrid.$inject = ['appConfig', 'datagridService'];

    /**
     * @namespace datagrid
     * @desc datagrid Directive
     * @memberOf datagrid.Controller
     * @param appConfig app.module.js
     */
    function datagrid(appConfig) {
        var directive = {
            retritc: 'EA',
            scope: {
                behavior: '=behavior',
                dgparam: '@dgparam'
            },
            templateUrl: appConfig.path.js + "shared/datagrid/datagrid.component.html",
            controllerAs: 'vm',
            bindToController: false,
            controller: DatagridController
        };
        return directive;
    }
    // Controller @ngInject
    DatagridController.$inject = ['appConfig', 'datagridService'];

    /**
     * @namespace DatagridController
     * @desc Datagrid Controller
     * @param appConfig trm.module.js
     * @param datagridService datagird.service.js
     * @memberOf Directives.Controller
     */
    function DatagridController(appConfig, datagridService) {
        var vm = this;
        vm.pathJs = appConfig.path.js;
        vm.pathCss = appConfig.path.css;
        vm.icon = {
            "delete": {
                icon: appConfig.icon.delete,
                color: "color:#bb0000;"
            },
            "edit": {
                icon: appConfig.icon.edit,
                color: "color:#294380;"
            },
            "contract": {
                icon: appConfig.icon.contract,
                color: "color:#4cae4c;"
            }
        };
    }

})();
