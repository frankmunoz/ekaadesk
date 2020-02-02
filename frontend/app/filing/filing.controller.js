/**
 * Filing Controller
 * @namespace Filing
 * @memberOf Controllers
 */

(function () {

    "use strict";

    angular
            .module("app.filing",[ 'smart-table'])
            .controller("filingCtrl", filingCtrl);

    filingCtrl.$inject = ["filingService","datagridService","validatorService","$translate","$location", "$routeParams","$filter"];

    function filingCtrl(filingService, datagridService, validatorService, $translate, $location, $routeParams,$filter) {
        var vm = this;

        vm.dgHandleFiling = __dgHandleFiling;
        vm.post = __post;
        vm.put = __put;
        vm.save = __save;
        vm.add = __add;
        vm.action = 'insert';
//        vm.dateFormat = 'dd/MM/yyyy';
        vm.dateFormat = 'yyyy-MM-dd';
        vm.RadicacionDateCalendar = {opened: false};
        activate();

        function activate() {
            initFiling();
        }

        function initFiling(){
            vm.id = $routeParams.id | 0;
            return filingService.get(vm.id).then(function (data) {
                try {
                    vm.filing = data;
                    vm.field = vm.filing.data;
                    vm.field.fecha_radicacion = new Date(vm.field.fecha_radicacion)
                    if (data.error) {
                        addNotification("danger", data.message.data.errors);
                    }
                    return data;
                } catch (error) {
                    //addNotification("danger", error);
                    return null;
                }
            });
        }

        function __dgHandleFiling(tableState) {
            return datagridService.getDataToController(filingService.all(tableState), tableState).then(function (data) {
                try {
                    console.log("data=>",data);
                    return setParamsDatagridFiling(data, tableState);
                } catch (error) {
                    addNotification("danger", error);
                    return null;
                }
            });
        }

        function setParamsDatagridFiling(data, tableState) {
            try {
                if (setParamsDatagrid(data, tableState)) {
                    vm.dgFilingBehavior = setDgFilingBehavior(data);
                    console.log("vm.dgFilingBehavior=>",vm.dgFilingBehavior);
                }
                return data;
            } catch (error) {
                addNotification("danger", error);
            }
        }


        function setParamsDatagrid(data, tableState) {
            try {
                if (data) {
                    tableState.pagination.numberOfPages = 1;
                    if (data.totalPages !== '' && data.totalPages > 1) {
                        tableState.pagination.numberOfPages = data.totalPages;
                    }
                    vm.totalRows = data.totalRows;
                    vm.loading = false;
                    vm.tableState = tableState;
                    vm.totalPages = data.totalPages;
                    return true;
                }
                return false;
            } catch (error) {
                addNotification("danger", error);
            }
        }

        function setDgFilingBehavior(data) {
            return {
                columns: [
                    {
                        xtype: 'actioncolumn',
                        width: '2%',
                        items: [{
                                action: 'edit',
                                tooltip: $translate.instant('EDIT'),
                                handler: function (row) {
                                    __editFiling(row);
                                }
                            }]
                    },
                    {
                        text: $translate.instant('CONSECUTIVE'),
                        sortable: true,
                        dataIndex: 'consecutivo'
                    },
                    {
                        text: $translate.instant('SENDER'),
                        sortable: true,
                        dataIndex: 'remitente'
                    },
                    {
                        text: $translate.instant('RECEIVER'),
                        sortable: true,
                        dataIndex: 'destinatario'
                    },
                    {
                        text: $translate.instant('DATE'),
                        sortable: true,
                        dataIndex: 'fecha_radicacion'
                    },
                    {
                        text: $translate.instant('USER'),
                        sortable: true,
                        dataIndex: 'usuario'
                    }
                ],
                exportExcel: true,
                dgHandleFiling: __dgHandleFiling,
                totalRows: vm.totalRows,
                data: data.data || []
            };
        }

        function addNotification(type, msg) {
            vm.notification = {type: type, msg: msg, view: true, close: __closeNotification};
        }

        function __closeNotification() {
            vm.notification = {view: false};
        }

        function __editFiling(row){
            console.log("row=>",row);
            vm.field = row;
            console.log(vm);
            vm.action = 'update'
            $location.path("filing/" + row.id);
        }

        function __save() {
            if(vm.id>0){
                vm.action = "update";
            }
            console.log("ACTION==>", vm.action);
            switch(vm.action){
                case "insert":
                    __post();
                break;
                case "update":
                    __put(vm.id);                  
                break;
            }
        }

        function __add() {
            $location.path("filing/");
        }

        function __post() {
            vm.success = false;
            var data = vm.field;
            return filingService.post({filing: data})
                    .then(postFrmComplete)
                    .catch(postFrmFailed);

            function postFrmComplete(data) {
                if (!data.success) {
                    addNotification("danger", data.message + " " + $translate.instant('CONSECUTIVE'));
                    validatorService.setData(data);
                } else {
                    addNotification("success", data.message + " " + $translate.instant('CONSECUTIVE'));
                    vm.id = data.data.id;
                    $location.path("filing/" + vm.id);
        //            $location.path(data.id, false);
                    __init();
                }
                vm.message = data.message;
                vm.success = true;
            }

            function postFrmFailed(error) {
                addNotification("danger", error);
            }
            
        }

        function __init() {
            vm.action = "update";
            return true;
        }


        function __put(id) {
            vm.success = false;
            var data = vm.field;
            data.id = id;
            return filingService.put({filing: data})
                    .then(putFrmComplete)
                    .catch(putFrmFailed);

            function putFrmComplete(data) {
                if (!data.success) {
                    addNotification("danger", data.message + " " +  $translate.instant('CONSECUTIVE'));
                    validatorService.setData(data);
                    vm.message = data;
                } else {
                    addNotification("success", data.message + " " +  $translate.instant('CONSECUTIVE'));
                    vm.id = id;
                    $location.path(data.id, false);
                    __init();
                }
                vm.message = data.message;
                vm.success = true;
            }

            function putFrmFailed(error) {
                addNotification("danger", error);
            }
        }        
    }

})();
