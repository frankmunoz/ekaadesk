/**
 * Validator Directive
 * @namespace Validator
 * @memberOf Directives
 */
//TODO BY FRANK: Incluir validación con máscaras
//TODO BY FRANK: En el servicio incluir el llamado del idioma
(function () {
    'use strict';

    angular
            .module('app')
            .directive('validator', validator);

    // @ngInject
    validator.$inject = ['validatorService', '$timeout', '$compile', '$filter'];

    /**
     * @namespace validator
     * @desc validator Directive
     * @param validatorService
     * @param $timeout
     * @param $compile
     * @memberOf validator.Controller
     */
    function validator(validatorService, $timeout, $compile, $filter) {
        var invalid = {};
        var type = {};
        var attributesField = {};
        var fields = [];
        var elementsForm = [];
        var submitFrm;
        var formName;
        var errorColor = '#FA787E';
        var directive = {
            controller: ControllerValidator,
            controllerAs: 'validatorCtrl',
            restrict: 'A',
            link: {
                pre: validatorFieldLink,
                post: validatorFormLink
            }
        };

        return directive;

        /**
         * @namespace validator
         * @desc validator Directive
         * @memberOf validator.Controller
         */
        function ControllerValidator() {
            init();
        }

        function init() {
            invalid = {
                req: 'El campo "%s" es requerido.',
                //isset: 'The "%s" field must have a value.',
                date: 'El campo "%s" debe contener una fecha válida.',
                email: 'El campo "%s" debe contener una dirección de correo electrónico válida.',
                //valid_emails: 'The "%s" field must contain all valid email addresses.',
                url: 'El campo "%s" debe contener una url válida.',
                ip: 'El campo "%s" debe contener una IP válida.',
                minLength: 'El campo "%s" debe tener un mínimo de %d caracteres.',
                maxLength: 'El campo "%s" debe tener un máximo de %d caracteres.',
                exactLength: 'The "%s" field must be exactly "%s" characters in length.',
                minValue: 'El campo "%s" debe tener un valor mínimo de %d.',
                maxValue: 'El campo "%s" debe tener un valor máximo de %d.',
                alpha: 'The "%s" field may only contain alphabetical characters.',
                greaterThan: 'El campo "%s" debe contener un valor mayor.',
                lessThan: 'El campo "%s" debe contener un valor menor.',
                greaterThanOrEqualTo: 'El campo "%s" debe contener un valor mayor.',
                lessThanOrEqualTo: 'El campo "%s" debe contener un valor menor.',
                alphaNumeric: 'The "%s" field may only contain alpha-numeric characters.',
                any: 'The "%s" field may only contain any character.',
                alphaDash: 'The "%s" field may only contain alpha-numeric characters, underscores, and dashes.',
                numeric: 'The "%s" field must contain only numbers.',
                mod: 'El campo "%s" debe ser múltiplo de %d.',
                //is_numeric: 'The "%s" field must contain only numeric characters.',
                integer: 'The "%s" field must contain an integer.',
                //regex_match: 'The "%s" field is not in the correct format.',
                matches: 'El campo "%s" no coincide con el campo "%s".',
                //is_unique: 'The "%s" field must contain a unique value.',
                natural: 'The "%s" field must contain only positive numbers.',
                naturalNoZero: 'The "%s" field must contain a number greater than zero.',
                decimal: 'The "%s" field must contain a decimal number.',
                //less_than: 'The "%s" field must contain a number less than "%s".',
                //greater_than: 'The "%s" field must contain a number greater than "%s".',
                password: 'El campo "%s" debe contener al menos: 8 caracteres, un caracter en mayúscula, un caracter en minúscula y un número.'
            };
            type = {
                req: /\S/,
                //isset: /[^]/,
                date: /^(\d{4})\D?(0[1-9]|1[0-2])\D?([12]\d|0[1-9]|3[01])$/, ///^((?:19|20)\d\d)\/((?:0?[1-9])|(?:1[0-2]))\/((?:0?[1-9])|(?:[12]\d)|(?:3[01]))$/
                email: /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/,
                //valid_emails: /[^]/,
                url: /^(https|ftp?:\/\/)?(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i,
                ip: /^(([1-9]?[0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]).){3}([1-9]?[0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/,
                minLength: {test: hasMinLength},
                maxLength: {test: hasMaxLength},
                exactLength: {test: hasExactLength},
                minValue: {test: hasMinValue},
                maxValue: {test: hasMaxValue},
                greaterThan: {test: greaterThan},
                lessThan: {test: lessThan},
                greaterThanOrEqualTo: {test: greaterThanOrEqualTo},
                lessThanOrEqualTo: {test: lessThanOrEqualTo},
                alpha: /^([A-Za-zÑñáéíóúÁÉÍÓÚ., ]+)$/,
                alphaNumeric: /^[a-z\d\-_\s]+$/i,
                any: /(.*?)/,
                alphaDash: /^[a-zA-Z0-9-_]+$/,
                numeric: /^-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/,
                mod: {test: hasModulusValue},
                //is_numeric: /[^]/,
                integer: /^-?\d+$/,
                //regex_match: /[^]/,
                matches: {test: hasMatch},
                //is_unique: /[^]/,
                natural: /^\d+$/,
                naturalNoZero: /^0[1-9]|([1-9]|[1-9]\d)+$/, //TODO BY FRANK: No acepta dos o más ceros consecutivos
                decimal: /^-?[0-9]([,\.][0-9]*)?$/, //TODO BY FRANK: Definir si el separador de decimales es . o , que sea configurable y que además no permita que se repita el caracter mas de una vez
                //less_than: /[^]/,
                //greater_than: /[^]/,
                own: {test: ownFunction},
                password: /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/
            };
        }

        function validatorFormLink(scope, el, attr, ctrl) {
            submitFrm = angular.element(attr.$$element[0].form);
            submitFrm = {$name: formName};
            var promise = null;

            if (promise !== null) {
                $timeout.cancel(promise);
            }
            promise = $timeout(function () {
                scope[formName].$myvalid = getFormValidated();
            }, 100);

            scope.$watch(function (scope) {
                if (attr.validator === "del") {
                    fields = [];
                }
                buildFormData(attr);
                scope[formName].$myvalid = getFormValidated();
                try {
                    var response = validatorService.getData();
                    if(response.message){
                        angular.forEach(response.message.data, function (error, key) {
                            if(fields[key]){
                                error = bindingBehaviorToField(error[0], scope, fields[key].el, fields[key].attr);
                                scope[formName].$myvalid = false;
                            }
                        });
                        validatorService.setData({data: {}});
                    }
                } catch (e) {
                    console.log("Errors : ", e + " fields:" + fields);
                }
                return el;


            });

//            counter++;
//            if (counter === 1) {
//            var formName = attr.$$element[0].form.getAttribute('name');

//            submitFrm = angular.element(attr.$$element[0].form);
//            submitFrm.bind('submit', function () {
//                return validateForm(scope);
////                scope[formName].$valid = validateForm(scope, el, attr);
//////               $compile(el)(scope);
////                //console.log("scope[formName].$valid:",scope[formName].$valid," el",el);
////                return scope[formName].$valid;
//            });
//
//            }
        }

        function buildFormData(attr) {
            if (attr.name) {
                fields[attr.name] = {
                    name: attr.name,
                    el: attr.$$element,
                    attr: attr,
                    valid: (attr.validator.indexOf("req") === 0) ? false : true
                };
            }
            formName = attr.$$element[0].form.getAttribute('name');
        }

        /**
         * @namespace validatorFieldLink
         * @desc validatorField Link
         * @param scope
         * @param el
         * @param attr
         * @param ctrl
         * @memberOf Directives.Link
         */
        function validatorFieldLink(scope, el, attr, ctrl) {
            try {
                var promise = null;
                var throttle = 0;
                buildFormData(attr);
                scope.disabled = true;
                angular.forEach(attr.validator.split('|'), function (value, key) {
                    if (value === "req") {
                        el.attr('ng-required', true);
                    }
                });
                el.removeAttr('validator');

                scope.$watch(attr.ngModel, function (value) {
                    if (promise !== null) {
                        $timeout.cancel(promise);
                    }
                    if (value) {
                        promise = $timeout(function () {
                            bindingBehaviorToField(validateField(attr), scope, el, attr);
                            scope[formName].$myvalid = getFormValidated();
                            promise = null;
                        }, throttle);
                    }
                });

            } catch (err) {
                console.error("error:", err);
            }
            return true;
        }

        function getFormValidated() {
            var validForm = true;
            var error = "";
            for (var attrs in fields) {
                error = validateField(fields[attrs].attr, false);
                fields[attrs].valid = error ? false : true;
                if (!fields[attrs].valid) {
                    validForm = fields[attrs].valid;
                }
            }
            return validForm;
        }

        function validateField(attr, displayError) {
            displayError = displayError || true;
            var value = validateBooleanField(attr);
            return validateSingleField(attr, value, displayError);
        }

        function validateBooleanField(attr) {
            var value = attr.$$element[0].value;
            var typeField = attr.$$element[0].type;
            if (typeField === "checkbox" || typeField === "radio") {
                var element = attr.$$element[0].form[attr.$$element[0].name];
                var flagChecked = false;
                for (var i = 0; i < element.length; i++) {
                    if (element[i].checked) {
                        flagChecked = true;
                    }
                }
                value = flagChecked ? value : "";
            }
            return value;
        }

        function validateSingleField(attr, value, displayError) {
            var error = "";
            var validationsField = {};
            var localDisplayError = displayError;
            var labelField = attr.$$element[0].title;
            angular.forEach(attr.validator.split('|'), function (validate, key) {
                var argumentName = validate.split("=")[0] || validate;
                var argumentValue = validate.split("=")[1];
                var regexp = type[argumentName];
                displayError = localDisplayError;
                if (argumentName === "req" && !value) {
                    error = sprintf(invalid[argumentName], labelField, argumentValue);
                    displayError = true;
                }
                try {
                    if (value && !regexp.test(value, argumentValue)) {
                        error = sprintf(invalid[argumentName], labelField, argumentValue);
                    }
                } catch (err) {
                }
                validationsField[argumentName] = {error: invalid[argumentName]};
                attributesField[attr.name] = {
                    name: attr.name,
                    type: validationsField,
                    value: value,
                    label: labelField,
                    error: error
                };
            });
            return error;
        }

        function bindingBehaviorToField(error, scope, el, attr) {
//            console.log("ERROR:", error);
            var form = scope[submitFrm.$name];
            try {
                destroyMessageEvent(attr.name);
                if (scope[form.$name][attr.name] !== undefined) {
                    scope[form.$name][attr.name].$valid = true;
                    var typeField = attr.$$element[0].type;

                    if (typeField === "checkbox" || typeField === "radio") {
                        bindingBehaviorToBinaryField(attr, error);
                    } else if (typeField === "select-one" || typeField === "select-multiple") {
                        bindingBehaviorToSelectField(error, el, typeField);
                    } else {
                        bindingBehaviorToSingleField(error, el);
                    }
                    if (error) {
                        var errorSpan = createMessageElement(attr.name, scope);
                        var messageError = document.createTextNode(error);
                        errorSpan.appendChild(messageError);
                        scope[form.$name][attr.name].$valid = false;
                        scope[form.$name].$myvalid = false;
                        findAndSetValidValueField(attr, false);
                    } else {
                        findAndSetValidValueField(attr, true);
                    }
                }
            } catch (err) {
                console.error("ERROR:" + err);
            }
            return error;
        }

        function findAndSetValidValueField(attr, flagValid) {
            for (var attrs in fields) {
                if (fields[attrs].attr.validator.indexOf("req") === 0 && attr.$$element[0].$$hashKey === fields[attrs].attr.$$element[0].$$hashKey) {
                    fields[attrs].valid = flagValid;
                }

            }
        }

        /**
         * @namespace bindingBehaviorToSelectField
         * @desc Special case for chosen-select styles
         * @param error
         * @param el
         * @param typeField
         * @memberOf validator.Controller
         */
        function bindingBehaviorToSelectField(error, el, typeField) {
            if (el.context.className.indexOf("chosen-select")) {
                var chosenDivUl = angular.element(el.siblings('div')[0].childNodes[0]);
                var chosenClass = getChosenClass(typeField);
                chosenDivUl.removeAttr('class');
                chosenDivUl.attr('class', chosenClass);
                if (error) {
                    chosenDivUl.attr('class', chosenClass + ' ng-pristine ng-scope ng-empty ng-invalid ng-touched');
                }
            } else {
                bindingBehaviorToSingleField(error, el);
            }
        }

        function getChosenClass(typeField) {
            var chosenClass = '';
            switch (typeField) {
                case "select-one":
                    chosenClass = 'chosen-single';
                    break;
                case "select-multiple":
                    chosenClass = 'chosen-choices';
                    break;
            }
            return chosenClass;
        }

        function bindingBehaviorToSingleField(error, el) {
            el.removeAttr('class');
            el.attr('class', 'form-control');
            if (error) {
                el.attr('class', 'form-control ng-pristine ng-scope ng-empty ng-invalid ng-touched');
            }
        }

        function bindingBehaviorToBinaryField(attr, error) {
            var element = attr.$$element[0].form[attr.$$element[0].name];
            for (var i = 0; i < element.length; i++) {
                var elementNode = angular.element(element[i]);
                elementNode.removeAttr('style');
                if (error) {
                    elementNode.attr('style', 'outline: 1px solid ' + errorColor + ';');
                }
            }
            return error;
        }

        function validateForm(scope) {
            angular.forEach(fields, function (value, key) {
                validateField(value.attr, false);
            });
            return bindingBehaviorToForm(scope);
        }

        function bindingBehaviorToForm(scope) {
            var formValid = true;
            angular.forEach(attributesField, function (field, key) {
                angular.forEach(field.type, function (type, validator) {
                    if (hasFieldRequiredEmpty(field, validator) || hasSomeError(field)) {
                        formValid = false;
                    }
                });
            });
            scope[submitFrm.$name].$myvalid = formValid;
            return formValid;
        }

        function hasFieldRequiredEmpty(field, validator) {
            return (validator === "req" && !field.value);
        }

        function hasSomeError(field) {
            return (field.value && field.error);
        }

        function isDateValid(str, fmt) {
            switch (fmt) {
                case "yyyy/mm/dd":
                    return str.match(/(19|20)\d{2}[-/.](0[1-9]|1[012])[-/.](0[1-9]|[12][0-9]|3[01])/);
                    break;
            }
            return false;
        }

        function hasMinLength(str, length) {
            return (eval("/^[^]{" + length + ",}$/")).test(str);
        }

        function hasMaxLength(str, length) {
            return (eval("/^[^]{0," + length + "}$/")).test(str);
        }

        function hasMinValue(str, value) {
            return Number(str) >= Number(value);
        }

        function hasMaxValue(str, value) {
            return Number(str) <= Number(value);
        }

        function hasModulusValue(str, value) {
            return Number(str) % value === 0;
        }

        function hasExactLength(str, length) {
            return (eval("/^[^]{" + length + "}$/")).test(str);
        }

        function hasMatch(str, fieldMatch) {
            var strMatch = document.getElementById(fieldMatch).value;
            return str === strMatch;
        }

        function greaterThan(str, fieldMatch) {
            var strMatch = document.getElementById(fieldMatch).value;
            console.log(str, "<=>", strMatch);
            if (isDate(strMatch)) {
//                console.log(setDate(strMatch).getTime(),"<=>",setDate(str).getTime());
                return (setDate(str).getTime() > setDate(strMatch).getTime());
            }
            return parseFloat(str) > parseFloat(strMatch);
        }

        function setDate(date) {
            var arrayDate = date.toString().split(/[.,\/ :-]/);
            var newDate = Date.parse(arrayDate.join("-"));
//            console.log(new Date(arrayDate.join("-")));
            return new Date(newDate);
        }

        function lessThan(str, fieldMatch) {
            var strMatch = document.getElementById(fieldMatch).value;
            if (isDate(strMatch)) {
                return (new Date(str).getTime() < new Date(strMatch).getTime());
            }
            return parseFloat(str) < parseFloat(strMatch);
        }

        function greaterThanOrEqualTo(str, fieldMatch) {
            var strMatch = document.getElementById(fieldMatch).value;
            if (isDate(strMatch)) {
                return (new Date(str).getTime() >= new Date(strMatch).getTime());
            }
            return parseFloat(str) >= parseFloat(strMatch);
        }

        function lessThanOrEqualTo(str, fieldMatch) {
            var strMatch = document.getElementById(fieldMatch).value;
            if (isDate(strMatch)) {
                return (new Date(str).getTime() <= new Date(strMatch).getTime());
            }
            return parseFloat(str) <= parseFloat(strMatch);
        }

        function isDate(date) {
            return typeof date.getMonth === 'function' || date instanceof Date || new Date(date.toString());
        }

        function ownFunction(fnc, str) {
            console.log("FNC=", fnc, " str:", str);
        }

        function createMessageElement(field, scope) {
            var inputField = document.getElementsByName(field)[0];
            var messageSpan = document.createElement('div');
            var element = inputField.parentNode.children[inputField.parentNode.children.length - 1];
            inputField.parentNode.insertBefore(messageSpan, element.nextSibling);
            messageSpan.setAttribute("class", "help-block");
            messageSpan.setAttribute("id", "error_" + field);
            return messageSpan;
        }

        function destroyMessageEvent(field) {
            var span = document.getElementById("error_" + field);
            if (span) {
                span.innerHTML = "";
                span.parentNode.removeChild(span);
            }
        }

    }
})();
