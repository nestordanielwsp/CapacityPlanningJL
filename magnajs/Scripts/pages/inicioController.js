(function () {
    'use strict';

    angular.module(appName)
        .controller('inicioController', inicioController);

    inicioController.$inject = ['$scope', '$http', '$rootScope'];

    function inicioController($scope, $http, $rootScope) {
        var service = $Ex;
        service.Http = $http;
        var vm = this;
        vm.viewDetail = false;
        vm.titulo = Ex.GetResourceValue("Titulo") || '';
        vm.isValid = true;
        vm.efficiency = [];
        vm.qcoqty = [];
        vm.sph = [];
        vm.totalvolume = [];
        vm.archivos = [];
        vm.resultado = [];
        vm.usuario = {};
        vm.usuario.EsAprobador = EsAprobadorInfo;
        vm.usuario.EsCaptura = EsCapturaInfo;
        vm.usuario.Loggeado = LoggeadoInfo;
        $scope.lineas = LineaInfo;
        


        var date = new Date();
        var dd = date.getDate();
        var mm = date.getMonth();
        var aaaa = date.getFullYear();        
        vm.diaHoy = new Date(aaaa, mm, dd);


        $scope.fileOptionsDetalle = {
            url: "../Codes/UploadFile.ashx",
            autoUpload: true,
            //validExtensions: Ex.GetResourceValue('validExtensions'),
            maxFilesize: Ex.GetResourceValue('maxFileSize'),
            puedeEliminar: vm.usuario.EsCaptura ? true : false
        };


        $scope.fileParameters = { Folder: Ex.GetResourceValue("folderArchivos") };



        $scope.openDocumento = function (info) {
            try {

                vm.evidenciaAbierta = true;

                document.body.style.cursor = 'wait';
                var url = '../Documentos/' + $scope.fileParameters.Folder + '/' + info.rutaarchivo + '?' + $scope.numeroAleatorio(1, 1000);
                window.open(url);
                document.body.style.cursor = '';
                return false;

            } catch (ex) {
                Ex.mensajes(ex.message, 4);
            }
        };

        $scope.numeroAleatorio = function (min, max) {
            return Math.round(Math.random() * (max - min) + min);
        }


        $scope.setParametrosArchivo = function (response, item) {
                item.UID = response.UID;
                item.rutaarchivo = response.rutaarchivo;
                item.EsArchivoNuevo = response.EsNuevo;
                item.nombrearchivo = response.nombrearchivo;            
        };

        $scope.agregarEfficiency = function(){
            vm.efficiency.push({Editable: 1});
        }

        $scope.eliminarEfficiency = function (item) {
            try {
                Ex.load(true);
                var i = vm.efficiency.indexOf(item);
                if (i !== -1) {
                    vm.efficiency.splice(i, 1);
                }
               // vm.efficiency_ = angular.copy(vm.efficiency);

            } catch (ex) {
                Ex.mensajes(ex.message, 4);
                Ex.load(false);
            }
        };

        $scope.agregarQcoQty = function(){
            vm.qcoqty.push({ Editable: 1});
        }

        $scope.eliminarQcoQty = function (item) {
            try {
                Ex.load(true);
                var i = vm.qcoqty.indexOf(item);
                if (i !== -1) {
                    vm.qcoqty.splice(i, 1);
                }
                // vm.qcoqty_ = angular.copy(vm.qcoqty);

            } catch (ex) {
                Ex.mensajes(ex.message, 4);
                Ex.load(false);
            }
        };

        $scope.agregarSPH = function(){
            vm.sph.push({ Editable: 1});
        }

        $scope.eliminarSPH = function (item) {
            try {
                Ex.load(true);
                var i = vm.sph.indexOf(item);
                if (i !== -1) {
                    vm.sph.splice(i, 1);
                }
                // vm.sph_ = angular.copy(vm.sph);

            } catch (ex) {
                Ex.mensajes(ex.message, 4);
                Ex.load(false);
            }
        };

        $scope.agregarTotalVolume = function () {
            vm.totalvolume.push({ Editable: 1});
        };

        $scope.eliminarTotalVolume = function (item) {
            try {
                Ex.load(true);
                var i = vm.totalvolume.indexOf(item);
                if (i !== -1) {
                    vm.totalvolume.splice(i, 1);
                }
                // vm.totalvolume_ = angular.copy(vm.totalvolume);

            } catch (ex) {
                Ex.mensajes(ex.message, 4);
                Ex.load(false);
            }
        };

        vm.guardar = function () {
            try {
                Ex.load(true);
                var Todos = { efficiency: vm.efficiency, qcoqty: vm.qcoqty, sph: vm.sph, totalvolume: vm.totalvolume };

                
                service.Execute('Guardar', Todos, function (response) {
                    if (response.d) {
                        Ex.mensajes('Se guardó con exito!', 1);
                        vm.consultar();
                    }
                    Ex.load(false)
                })
                $scope.modalNotas.close();
            }
            catch (ex) {
                Ex.mensajes(ex.message, 4);
                Ex.load(false);
            }
        }


        vm.consultar = function () {
            try {
                Ex.load(true);
                var datos = {};
                service.Execute('GetInformacion', datos, function (response) {
                    if (response.d) {
                       
                        vm.efficiency = response.d.Efficiency;
                        vm.qcoqty = response.d.QCOQty;
                        vm.sph = response.d.SPH;
                        vm.totalvolume = response.d.TotalVolume;

                        vm.principal_ = angular.copy(vm.principal);
                        vm.qcoqty_ = angular.copy(vm.qcoqty);
                        vm.sph_ = angular.copy(vm.sph);
                        vm.totalvolume_ = angular.copy(vm.totalvolume);

                    }
                    Ex.load(false)
                })
            }
            catch (ex) {
                Ex.mensajes(ex.message, 4);
                Ex.load(false);
            }
        }

        
        vm.openModalNotas = function (pItem, num) {            

            try {
                Ex.load(true);               
                vm.item = {};
                vm.item = pItem;

                m.item.co_campo = pItem.co_lecciones_aprendidas;                

            }
            catch (ex) {
                Ex.mensajes(ex.message, 4);
                Ex.load(false);
            }

            Ex.load(false);
            $scope.modalNotas.open();
        };

        $scope.agregarArchivo = function (num) {
            vm.archivos.detalle.push({ EsNuevo: true, Numero: num });
        };

        $scope.quitarArchivo = function (item) {
            item.EsEliminar = true;
        };

        var init = function () {
            vm.consultar();
        }


        init();


    }
})();
