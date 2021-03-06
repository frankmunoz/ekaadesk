/**
 * Kitchens Controller
 * @namespace Kitchens
 * @memberOf Controllers
 */

(function () {

    "use strict";

    angular
            .module("app.kitchens",[ 'smart-table'])
            .controller("kitchensCtrl", kitchensCtrl)
            .controller("attendanceCtrl", attendanceCtrl);

    kitchensCtrl.$inject = ["kitchensService","validatorService","$translate","$location", "$routeParams","$filter","$rootScope","logger","$document","$uibModal"];
    attendanceCtrl.$inject = ["kitchensService","$uibModalInstance","items","modalityType","$location","$translate","logger","$scope"];

    /*************************
    * attendanceCtrl
    **************************/
    function attendanceCtrl(kitchensService,$uibModalInstance,items,modalityType,$location,$translate,toast,$scope){
        var vm = this;
        vm.items = items;
        vm.modalityType = modalityType;
        vm.ok = function () {
            $uibModalInstance.close(vm.selected.item);
            if(vm.isObjectEmpty(vm.selected.item)){
                var attendance = vm.selected.item;
                var data = {
                    "lon":attendance.lon
                    ,"lat":attendance.lat
                    ,"institution": attendance.institution
                    ,"beneficiary": attendance.beneficiary
                    ,"person": attendance.person
                    ,"modality": attendance.id
                };

                kitchensService.postAttendances(data)
                    .then(frmComplete)
                    .catch(frmFailed);

            }
        };

        vm.isObjectEmpty = function(obj) {
          return !!Object.keys(obj).length;
        }

        vm.cancel = function () {
          $uibModalInstance.dismiss('cancel');
        };

        vm.doCheck = function(){
        };

        vm.selected = {
            item: {},
            data: {}
        };


        function frmComplete(data) {
            if (data.error) {
                toast.logError($translate.instant('ERROR'));
            } else {
                console.log("POST ATTEN===>",data);
                var attendance = vm.selected.item;
                vm.selected.data = data;

                vm.beneficiaryData = data;
                console.log("======>",$scope)
                if(data.has_diferent_modalities){
                    toast.logWarning($translate.instant('HAS_DIFFERENT_MODALITIES'));
                }

                toast.logSuccess($translate.instant('SUCCESS'));
                $location.path("kitchens");
            }
            vm.message = data.message;
            vm.success = true;
        }

        function frmFailed(error) {
            toast.logError($translate.instant('ERROR'));
        }

    }
    /*************************
    * kitchensCtrl
    **************************/

    function kitchensCtrl(kitchensService, validatorService, $translate, $location, $routeParams,$filter,$rootScope,toast,$document,$uibModal) {
        var vm = this;
        vm.searchKeywords = '';
        vm.post = __post;
        vm.put = __put;
        vm.save = __save;
        vm.add = __add;
        vm.next = __next;
        vm.previous = __previous;
        vm.edit = __edit;
        vm.onSelectGender = __onSelectGender;
        vm.getNameById = __getNameById;
        vm.search = __search;
        vm.action = 'insert';
        vm.dateFormat = 'dd/MM/yyyy';
        vm.birthDateCalendar = {opened: false};

        vm.items = [];
        vm.animationsEnabled = !0; 
        var __session;

        activate();

        function activate() {
            initKitchens();
            toast.log($translate.instant('KITCHENS'));
        }


        function initKitchens(){
            vm.id = $routeParams.id | 0;
            __session = JSON.parse(localStorage.getItem('data'));
            vm.genders = JSON.parse(localStorage.getItem('genders'));
            vm.disabilities = JSON.parse(localStorage.getItem('disabilities'));
            vm.documentstype = JSON.parse(localStorage.getItem('documentstype'));
            vm.householdroles = JSON.parse(localStorage.getItem('householdroles'));
            vm.maritalstatus = JSON.parse(localStorage.getItem('maritalstatus'));
            vm.migratorystatus = JSON.parse(localStorage.getItem('migratorystatus'));
            vm.nationalities = JSON.parse(localStorage.getItem('nationalities'));
            vm.recipients = JSON.parse(localStorage.getItem('recipients'));            
            return __get(vm.id);
        }


        function __getNameById(index,collection){
            for(var key in collection) {
                if(index == collection[key].id){
                   return collection[key].name;
                }
            }

        }

        function __getAttendances(){
            return kitchensService.getAttendances(vm.data.id).then(function (data) {
                try {
                    vm.attendances = data;
                    return data;
                } catch (error) {
                    toast.logError($translate.instant('ERROR'));
                    return null;
                }
            });
        }

        function __onSelectGender(item,model){
            var el = document.getElementById('div-pregnant');
            var display = 'block';
            if(model===2){
                vm.data.pregnant = '';
                display = 'none'; 
            }
            el.style.display = display;
        }

        function __edit(row){
            vm.field = row;
            vm.field.birth_date = new Date(vm.field.birth_date)
            vm.action = 'update'
            $location.path("kitchen/" + row.id);
        }


        function __convertDateFTB(date){
            if(date){
                var d = new Date(date),
                month = '' + (d.getMonth() + 1),
                day = '' + d.getDate(),
                year = d.getFullYear();

                if (month.length < 2) 
                    month = '0' + month;
                if (day.length < 2) 
                    day = '0' + day;

                return [month, day, year].join('/');
            }
        }

        function __convertDateBTF(date){
            if(date){
                date = date.replace(/\//g, '-');
                var arrayDate = date.split("-");
                date = arrayDate[1] + '/' + arrayDate[0] + '/' + arrayDate[2]
                return new Date(date);
            }
        }


        function __save() {
            if(vm.id>0){
                vm.action = "update";
            }
            vm.data.household_code = vm.data.document;
            vm.data.birth_date = __convertDateFTB(vm.data.birth_date);
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
            $location.path("kitchen/");
        }


        function __init() {
            vm.action = "update";
            return true;
        }


        function __get(query){
            return kitchensService.get(query).then(function (data) {
                try {
                    vm.data = data;
                    vm.beneficiaries = vm.data.results;
                    if(vm.id){
                        vm.data.birth_date = __convertDateBTF(vm.data.birth_date);
                        console.log("vm.data.birth_date===>",vm.data.birth_date);
                        __getAttendances();
                    }
                    if (data.error) {
                        toast.logError($translate.instant('ERROR 1'));
                        console.log("__session.user_id===>",__session.user_id);
                        if(__getSession()){
                            $location.path("kitchens/");
                        }
                    }
                    return data;
                } catch (error) {
                    toast.logError($translate.instant('ERROR 2'));
                    if(__getSession()){
                        $location.path("kitchens/");
                    }
                    return null;
                }
            });
        }

        function __post() {
            vm.success = false;
            var session = JSON.parse(localStorage.getItem('data'));
            vm.data.user = session.user_id;
            return kitchensService.post(vm.data)
                    .then(frmComplete)
                    .catch(frmFailed);
            
        }


        function __put(id) {
            vm.success = false;
            return kitchensService.put(vm.data)
                    .then(frmComplete)
                    .catch(frmFailed);

        }

        function __getSession(){
            try{
                if(__session.user_id){
                    return __session.user_id;
                }
            }catch(error){
                console.log("missing session");
            }
        }

        function frmComplete(data) {
            if (data.error) {
                toast.logError($translate.instant('ERROR'));
                validatorService.setData(data);
            } else {
                toast.logSuccess($translate.instant('SUCCESS'));
                vm.id = data.id;
                vm.data.birth_date = __convertDateBTF(vm.data.birth_date);
                $location.path("kitchen/" + vm.id);
                __init();
            }
            vm.message = data.message;
            vm.success = true;
        }

        function frmFailed(error) {
            toast.logError($translate.instant('ERROR'));
        }

        document.addEventListener('keypress', function(e){
            var charInput = e.keyCode;
            if (e.srcElement.type == 'text') {
                if((charInput >= 97) && (charInput <= 122)) { // lowercase
                  if(!e.ctrlKey && !e.metaKey && !e.altKey) { // no modifier key
                    var newChar = charInput - 32;
                    var start = e.target.selectionStart;
                    var end = e.target.selectionEnd;
                    e.target.value = e.target.value.substring(0, start) + String.fromCharCode(newChar) + e.target.value.substring(end);
                    e.target.setSelectionRange(start+1, start+1);
                    e.preventDefault();
                  }
                }
            }

        });

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
                if(i>0){
                    query = "?page=" + obj.substr(i+1);
                }
                return __get(query);
            }
        }

        /*
        Attendance
        */

        vm.onRegisterAttendance = function (beneficiary,modalSize) {
            var modalities = JSON.parse(localStorage.getItem('modalities'));
            var modalitiestype = JSON.parse(localStorage.getItem('modalitiestype'));
            var modalityTypeId = 0;
            var userInstitution = JSON.parse(localStorage.getItem('userInstitution'));
            var position = JSON.parse(localStorage.getItem('position'));
            var data = JSON.parse(localStorage.getItem('data'));
            var institution = JSON.parse(localStorage.getItem('userInstitution'));
            var attendanceToday =[];
            var i = 0;
            kitchensService.getAttendanceToday(beneficiary.id)
                .then(function(data){
                    angular.forEach(data, function(value, key){
                        attendanceToday[value.modality_id] = true;    
                    });

                    angular.forEach(modalities, function(value, key) {
                        if(value.modality_type == userInstitution.modality_type){
                            modalityTypeId = value.modality_type;
                            value.lat = position.latitude.toFixed(7);
                            value.lon = position.longitude.toFixed(7);
                            value.person = data.user_id;
                            value.partner = data.partner;
                            value.institution = institution.id;
                            value.beneficiary = beneficiary.id;
                            value.disabled = attendanceToday[value.id];
                            vm.items[i++] = value;
                        }
                    });

                    angular.forEach(modalitiestype, function(value, key) {
                        if(value.id == modalityTypeId){
                            vm.modalityType = value;
                        }
                    });

                    var modalInstance = $uibModal.open({
                        animation: vm.animationsEnabled,
                        templateUrl: "app/kitchens/kitchens-attendance.html",
                        controller: "attendanceCtrl",
                        controllerAs: "attendance",
                        size: modalSize,
                        resolve: {
                            items: function () {
                                return vm.items;
                            },
                            modalityType: function() {
                                return vm.modalityType;
                            }

                        }
                    });
                    modalInstance.result.then(function (selected) {
                        vm.selected = selected
                        console.log("vm.selected.data===>",selected)
                    }, function () {
                        console.log("Modal dismissed at: " + new Date)
                    })                    
                })
                .catch(frmFailed);
        }, vm.toggleAnimation = function () {
            vm.animationsEnabled = !vm.animationsEnabled
        };


    }

})();