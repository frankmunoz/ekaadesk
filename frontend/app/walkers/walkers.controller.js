/**
 * Kitchens Controller
 * @namespace Kitchens
 * @memberOf Controllers
 */

(function () {

    "use strict";

    angular
            .module("app.walkers",[ 'smart-table'])
            .controller("walkersCtrl", walkersCtrl);

    walkersCtrl.$inject = ["walkersService","validatorService","$translate","$location", "$routeParams","$filter","logger"];

    function walkersCtrl(walkersService, validatorService, $translate, $location, $routeParams,$filter,toast) {
        var vm = this;
        vm.searchKeywords = '';
        vm.post = __post;
        vm.put = __put;
        vm.save = __save;
        vm.add = __add;
        vm.next = __next;
        vm.previous = __previous;
        vm.edit = __edit;

        vm.genders =[{"id":1,"name":"f"},{"id":2,"name":"m"}]

        vm.search = __search;
        vm.action = 'insert';
        vm.dateFormat = 'dd/MM/yyyy';
        vm.birthDateCalendar = {opened: false};

        activate();

        function activate() {
            initWalkers();
            toast.log($translate.instant('WALKERS'));
        }


        function initWalkers(){
            vm.id = $routeParams.id | 0;
            return __get(vm.id);
        }

        function addNotification(type, msg) {
            vm.notification = {type: type, msg: msg, view: true, close: __closeNotification};
        }

        function __closeNotification() {
            vm.notification = {view: false};
        }

        function __edit(row){
            vm.field = row;
            vm.field.birth_date = new Date(vm.field.birth_date)
            vm.action = 'update'
            $location.path("walker/" + row.id);
        }

        function __save() {
            if(vm.id>0){
                vm.action = "update";
            }
            console.log("ACTION==>", vm.action, "  vm.id======>" , vm.id);
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
            $location.path("walker/");
        }


        function __init() {
            vm.action = "update";
            return true;
        }

        function __get(query){
            return walkersService.get(query).then(function (data) {
                try {
                    vm.data = data;
                    vm.beneficiaries = vm.data.results;
                    vm.data.birth_date = __formatDate(vm.data.birth_date);
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

        function __formatDate(date){
            date = date.replace(/\//g, '-');
            var arrayDate = date.split("-");
            date = arrayDate[1] + '-' + arrayDate[0] + '-' + arrayDate[2]
            return new Date(date);
        }

        function __post() {
            vm.success = false;
            vm.data.household_code = vm.data.document;
            return walkersService.post(vm.data)
                    .then(postFrmComplete)
                    .catch(postFrmFailed);

            function postFrmComplete(data) {
                if (!data.success) {
                    addNotification("danger", data.message + " " + $translate.instant('CONSECUTIVE'));
                    validatorService.setData(data);
                } else {
                    addNotification("success", data.message + " " + $translate.instant('CONSECUTIVE'));
                    vm.id = data.data.id;
                    $location.path("walkers/" + vm.id);
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

        function __put(id) {
            vm.success = false;
            return walkersService.put(vm.data)
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

        /*
        Datagrid
        */
        function __search(){
            if(vm.searchKeywords){
                var query = "?q=" + vm.searchKeywords;
                return __get(query);
            }
        }

        function __next(){
            return __page(vm.data.next);
        }

        function __previous(){
            return __page(vm.data.previous);
        }

        function __page(obj){
            if(obj){
                var i = obj.indexOf("=");
                var query = "";
                console.log("i====>",i)
                if(i>0){
                    query = "?page=" + obj.substr(i+1);
                }
                return __get(query);
            }
        }

    }

})();