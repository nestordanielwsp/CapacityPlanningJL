(function () {
    'use strict';

    angular.module(appName)
        .controller('mainsheetController', mainsheetController);

    mainsheetController.$inject = ['$scope', '$http', '$rootScope'];

    function mainsheetController($scope, $http, $rootScope) {
        var service = $Ex;
        service.Http = $http;
        var vm = this;
        vm.viewDetail = false;
        vm.titulo = Ex.GetResourceValue("Titulo") || '';
        vm.isValid = true;
        vm.grafica1 = [];
        vm.grafica3 = [];
        vm.usuario = {};
        vm.usuario.Loggeado = LoggeadoInfo;

        vm.principal = [];
        vm.datos2 = [];
        vm.principal3 = [];

        vm.principalM = [];
        vm.datos2M = [];
        vm.principal3M = [];

        vm.principalS = [];
        vm.datos2S = [];
        vm.principal3S = [];

        vm.encabezado = [];
        vm.jPH = [];
        vm.efficiency = [];
        vm.netJPH = [];
        vm.years = [];
        vm.qCOQty = [];
        vm.qCOHrs = [];
        vm.totalTime = [];
        vm.stokes = [];
        vm.totalVolume = [];
        vm.utilizacion = [];


        var ctxAnualTR;
        var chartAnualTR;

        var ctxMensualTR;
        var chartMensualTR;

        var ctxSemanalTR;
        var chartSemanalTR;
        var date = new Date();
        var dd = date.getDate();
        var mm = date.getMonth();
        var aaaa = date.getFullYear();
        vm.diaHoy = new Date(aaaa, mm, dd);

        vm.getAnual = false;
        vm.getMensual = false;
        vm.getSemanal = false;
        vm.IdLinea = 31;


        vm.graficas = function () {
            vm.AnualTR();
        }

       

        $scope.calcularEncabezado = function (item) {
            item.TotalWeeklyHour = parseInt(isNaN(item.Shift1) ? 0 : item.Shift1) + parseInt(isNaN(item.Shift2) ? 0 : item.Shift2) + parseInt(isNaN(item.Shift3) ? 0 : item.Shift3) + parseInt(isNaN(item.OverTime) ? 0 : item.OverTime);
            item.AvailableTime = Math.round(parseFloat(isNaN(item.TotalWeeklyHour) ? 0 : item.TotalWeeklyHour) - ((parseFloat(isNaN(item.ShiftxWks) ? 0 : item.ShiftxWks) * (parseFloat(isNaN(item.Lunch) ? 0 : item.Lunch) + parseFloat(isNaN(item.SetUpTime) ? 0 : item.SetUpTime)))));            
            item.HrsxDay = parseFloat(isNaN(item.HrsDay) ? 0 : item.HrsDay) - (parseFloat(isNaN(item.Lunch) ? 0 : item.Lunch) * parseFloat(isNaN(item.Shift) ? 0 : item.Shift)) - (parseFloat(isNaN(item.SetUpTime) ? 0 : item.SetUpTime) * parseFloat(isNaN(item.Shift) ? 0 : item.Shift));
            item.SPM = (parseFloat((isNaN(item.JPH) ? 0 : item.JPH) / 60)).toFixed(1);
            for (var index = 0; index < vm.totalTime.length; index++) {
                vm.totalTime[index].cantidad = Math.round(parseFloat(isNaN(item.AvailableTime) ? 0 : item.AvailableTime) - parseFloat(isNaN(vm.qCOHrs[index].cantidad) ? 0 : vm.qCOHrs[index].cantidad));
                vm.stokes[index].cantidad = Math.round(parseFloat(isNaN(vm.netJPH[index].cantidad) ? 0 : vm.netJPH[index].cantidad) * parseFloat(isNaN(vm.totalTime[index].cantidad) ? 0 : vm.totalTime[index].cantidad) * parseFloat(isNaN(vm.encabezado[0].Weeks) ? 0 : vm.encabezado[0].Weeks));
                vm.utilizacion[index].cantidad = Math.round(parseFloat(isNaN(vm.totalVolume[index].cantidad) ? 0 : vm.totalVolume[index].cantidad) / parseFloat(isNaN(vm.stokes[index].cantidad) ? 0 : vm.stokes[index].cantidad)*100);
            }
            vm.makeAnualTR(vm.totalVolume, vm.stokes, vm.utilizacion);

        };


        $scope.calcularNetJPH = function (index) {
            vm.netJPH[index].cantidad = parseFloat(isNaN(vm.jPH[index].cantidad) ? 0 : vm.jPH[index].cantidad) * parseFloat(isNaN(vm.efficiency[index].cantidad) ? 0 : vm.efficiency[index].cantidad / 100);
            vm.stokes[index].cantidad = Math.round(parseFloat(isNaN(vm.netJPH[index].cantidad) ? 0 : vm.netJPH[index].cantidad) * parseFloat(isNaN(vm.totalTime[index].cantidad) ? 0 : vm.totalTime[index].cantidad) * parseFloat(isNaN(vm.encabezado[0].Weeks) ? 0 : vm.encabezado[0].Weeks));
            vm.utilizacion[index].cantidad = Math.round(parseFloat(isNaN(vm.totalVolume[index].cantidad) ? 0 : vm.totalVolume[index].cantidad) / parseFloat(isNaN(vm.stokes[index].cantidad) ? 0 : vm.stokes[index].cantidad)*100);
            vm.makeAnualTR(vm.totalVolume, vm.stokes, vm.utilizacion);
        }

        $scope.calcularQCOHrs = function (index) {
            vm.qCOHrs[index].cantidad = (parseFloat(isNaN(vm.qCOQty[index].cantidad) ? 0 : vm.qCOQty[index].cantidad) * parseFloat(isNaN(vm.encabezado[0].QCOmin) ? 0 : vm.encabezado[0].QCOmin / 60)).toFixed(2);
            vm.totalTime[index].cantidad = Math.round(parseFloat(isNaN(vm.encabezado[0].AvailableTime) ? 0 : vm.encabezado[0].AvailableTime) - parseFloat(isNaN(vm.qCOHrs[index].cantidad) ? 0 : vm.qCOHrs[index].cantidad));
            vm.stokes[index].cantidad = Math.round(parseFloat(isNaN(vm.netJPH[index].cantidad) ? 0 : vm.netJPH[index].cantidad) * parseFloat(isNaN(vm.totalTime[index].cantidad) ? 0 : vm.totalTime[index].cantidad) * parseFloat(isNaN(vm.encabezado[0].Weeks) ? 0 : vm.encabezado[0].Weeks));
            vm.utilizacion[index].cantidad = Math.round(parseFloat(isNaN(vm.totalVolume[index].cantidad) ? 0 : vm.totalVolume[index].cantidad) / parseFloat(isNaN(vm.stokes[index].cantidad) ? 0 : vm.stokes[index].cantidad)*100);
            vm.makeAnualTR(vm.totalVolume, vm.stokes, vm.utilizacion);
        }
        
        $scope.calcularQCOHrsTodos = function (valor) {
            for (var index = 0; index < vm.qCOQty.length; index++) {
                vm.qCOHrs[index].cantidad = (parseFloat(isNaN(vm.qCOQty[index].cantidad) ? 0 : vm.qCOQty[index].cantidad) * parseFloat(isNaN(valor) ? 0 : valor / 60)).toFixed(2);
                vm.totalTime[index].cantidad = Math.round(parseFloat(isNaN(vm.encabezado[0].AvailableTime) ? 0 : vm.encabezado[0].AvailableTime) - parseFloat(isNaN(vm.qCOHrs[index].cantidad) ? 0 : vm.qCOHrs[index].cantidad));
                vm.stokes[index].cantidad = Math.round(parseFloat(isNaN(vm.netJPH[index].cantidad) ? 0 : vm.netJPH[index].cantidad) * parseFloat(isNaN(vm.totalTime[index].cantidad) ? 0 : vm.totalTime[index].cantidad) * parseFloat(isNaN(vm.encabezado[0].Weeks) ? 0 : vm.encabezado[0].Weeks));
                vm.utilizacion[index].cantidad = Math.round(parseFloat(isNaN(vm.totalVolume[index].cantidad) ? 0 : vm.totalVolume[index].cantidad) / parseFloat(isNaN(vm.stokes[index].cantidad) ? 0 : vm.stokes[index].cantidad)*100);
            }
            vm.makeAnualTR(vm.totalVolume, vm.stokes, vm.utilizacion);
        }

        $scope.calcularUtilizacion = function (index) {
            vm.utilizacion[index].cantidad = Math.round(parseFloat(isNaN(vm.totalVolume[index].cantidad) ? 0 : vm.totalVolume[index].cantidad) / parseFloat(isNaN(vm.stokes[index].cantidad) ? 0 : vm.stokes[index].cantidad)*100);
            vm.makeAnualTR(vm.totalVolume, vm.stokes, vm.utilizacion);
        }



        vm.fnEncabezado = function (plinea) {
            try {
                //Ex.load(true);
                if (plinea == '') {
                    plinea = '31';
                    vm.IdLinea = 31;
                }
                vm.getAnual = true;
                vm.getMensual = false;
                vm.getSemanal = false;
                var datos = { Idlinea: plinea };
                service.Execute('GetInformacion', datos, function (response) {
                    if (response.d) {
                        vm.encabezado = response.d.Encabezado;
                        vm.jPH = response.d.JPH;
                        vm.efficiency = response.d.Efficiency;
                        vm.netJPH = response.d.NetJPH;
                        vm.years = response.d.Years;
                        vm.qCOQty = response.d.QCOQty;
                        vm.qCOHrs = response.d.QCOHrs;
                        vm.totalTime = response.d.TotalTime;
                        vm.stokes = response.d.Stokes;
                        vm.totalVolume = response.d.TotalVolume;
                        vm.utilizacion = response.d.Utilizacion;                       

                        vm.encabezado_ = angular.copy(vm.encabezado);
                        vm.jPH_ = angular.copy(vm.jPH);
                        vm.efficiency_ = angular.copy(vm.efficiency);
                        vm.netJPH_ = angular.copy(vm.netJPH);
                        vm.years_ = angular.copy(vm.years);
                        vm.qCOQty_ = angular.copy(vm.qCOQty);
                        vm.qCOHrs_ = angular.copy(vm.qCOHrs);
                        vm.totalTime_ = angular.copy(vm.totalTime);
                        vm.stokes_ = angular.copy(vm.stokes); // TEORICO
                        vm.totalVolume_ = angular.copy(vm.totalVolume); // REAL
                        vm.utilizacion_ = angular.copy(vm.utilizacion);
                       
                        vm.graficas();
                    }

                });
                Ex.load(false);
            }
            catch (ex) {
                //   Ex.mensajes(ex.message, 4);
                Ex.load(false);
            }

        }


        vm.AnualTR = function () {
            try {
                //Ex.load(true);
                vm.getAnual = true;
                vm.getMensual = false;
                vm.getSemanal = false;
               
                vm.makeAnualTR(vm.totalVolume, vm.stokes, vm.utilizacion);

                Ex.load(false);
            }
            catch (ex) {
                //   Ex.mensajes(ex.message, 4);
                Ex.load(false);
            }
        }

        vm.MensualTR = function (pAnio, plinea) {
            try {
                // Ex.load(true);   
                vm.getAnual = false;
                vm.getMensual = true;
                vm.getSemanal = false;
                var datos = { anio: pAnio, linea: plinea };
                service.Execute('GetInformacionMensual', datos, function (response) {
                    if (response.d) {
                        vm.principalM = response.d.Grafica1;
                        vm.datos2M = response.d.Grafica2;
                        vm.principal3M = response.d.Grafica3;

                        vm.principalM_ = angular.copy(vm.principalM);
                        vm.principal3M_ = angular.copy(vm.principal3M);
                        vm.makeMensualTR(vm.principalM, vm.datos2M, vm.principal3M);
                        vm.getAnual = false;
                    }

                });
                Ex.load(false);
            }
            catch (ex) {
                //   Ex.mensajes(ex.message, 4);
                Ex.load(false);
            }

        }

        vm.SemanalTR = function (pAnio, pMes, plinea) {
            try {
                // Ex.load(true);    
                vm.getAnual = false;
                vm.getMensual = false;
                vm.getSemanal = true;
                var datos = { anio: pAnio, mes: pMes, linea: plinea };
                service.Execute('GetInformacionSemanal', datos, function (response) {
                    if (response.d) {
                        vm.principalS = response.d.Grafica1;
                        vm.datos2S = response.d.Grafica2;
                        vm.principal3S = response.d.Grafica3;

                        vm.principalS_ = angular.copy(vm.principalS);
                        vm.principal3S_ = angular.copy(vm.principal3S);
                        vm.makeSemanalTR(vm.principalS, vm.datos2S, vm.principal3S);
                    }

                });
                Ex.load(false);
            }
            catch (ex) {
                //   Ex.mensajes(ex.message, 4);
                Ex.load(false);
            }

        }

        vm.ColorCode = function (opcion) {
            var color = "#FFFFFF";

            if (opcion == 1)
                color = "#4285F4";
            else if (opcion == 2)
                color = "#EA4335";
            else if (opcion == 3)
                color = "#FBBC05";
            else if (opcion == 4)
                color = "#34A853";
            else if (opcion == 5)
                color = "#F89A20";
            else if (opcion == 6)
                color = "#1D9FD9";
            else if (opcion == 7)
                color = "#883D22";
            else if (opcion == 8)
                color = "#00D7AB";
            else if (opcion == 9)
                color = "#DE158C";
            else if (opcion == 10)
                color = "#764C9E";
            else if (opcion == 100)
                color = "#000";
            else if (opcion == 200)
                color = "#0000C0";


            return color;
        };


        vm.makeAnualTR = function (datos, stokes, capacidad) {
           
            var labelsf = [];            
            var todo = [];           
            var valores_c = [];
            var valores_a = [];
            var valores_s = [];
            var lineaB = '';
            
            for (let i = 0; i < datos.length; i++) {
                labelsf.push(datos[i].Anio);
                valores_a.push(datos[i].cantidad);              

                if (i == 0)
                    lineaB = "Gráfica Anual de: " + datos[i].Linea;
            }

            for (let i = 0; i < stokes.length; i++) {
                valores_s.push(stokes[i].cantidad);
            }


            for (let i = 0; i < capacidad.length; i++) {
                valores_c.push(capacidad[i].cantidad);
            }

            var linea_a =
            {
                label: '% Utilization',
                backgroundColor: vm.ColorCode(3),
                type: 'bar',
                yAxisID: 'WIP2',
                data: valores_c
            };

            todo.push(linea_a);

            var linea_s =
            {
                label: 'Stokes CAP (5 days 85%)',
                backgroundColor: vm.ColorCode(5),
                type: 'bar',
                data: valores_s
            };

            todo.push(linea_s);

            var linea_c =
            {
                label: 'Vol Required',
                borderColor: vm.ColorCode(100),
                type: 'line',               
                fill: false,
                data: valores_a
            };

            todo.push(linea_c);


            var barChartData = {
                labels: labelsf,
                datasets: todo
            };

            var ctx = document.getElementById("canvasAnualTR").getContext("2d");


            chartAnualTR = new Chart(ctx, {
                type: 'bar',
                data: barChartData,
                options:
                {
                    //events: ["mousemove", "mouseout", "click", "touchstart", "touchmove", "touchend"],
                    //onClick: function (e, data) {
                    //    vm.MensualTR(data[0]._view.label.substring(0, 4), 31);

                    //},
                    title: {
                        display: true,
                        text: lineaB,
                        fontSize: 25
                    },
                    tooltips: {
                        mode: 'label'
                    },
                    responsive: true,
                    scales: {
                        xAxes: [{
                            stacked: true,
                        }],
                        yAxes: [{
                            stacked: true
                        },
                        {
                            id: 'WIP2',
                            type: 'linear',
                            position: 'right',
                            stacked: false,
                            ticks: { beginAtZero: true, fontColor: "#1E90FF" }
                        }]
                    }
                }
            });



        }

        vm.makeMensualTR = function (datos, meses, capacidad) {
            var todoF = [];
            var labelsf = [];
            var todoA = [];
            var todo = [];
            var valores_t = [];
            var valores_c = [];
            var lineaB = '';

            var col = 1;
            for (let i = 0; i < meses.length; i++) {
                labelsf.push(meses[i].Mes + "-Teorico");
                labelsf.push(meses[i].Mes + "-Real");

                var datosA = _.where(datos, { Mes: meses[i].Mes });
                for (let j = 0; j < datosA.length; j++) {
                    if (j == 0)
                        lineaB = "Gráfica Mensual de: " + datosA[j].Linea;

                    var resultados = [];
                    resultados.push(datosA[j].Teorico);
                    resultados.push(datosA[j].Real);
                    var valor_1 = {};
                    var valor_2 = {};
                    if (i == 0) {
                        valor_1 = { label: datosA[j].Etiqueta, backgroundColor: vm.ColorCode(col), data: resultados };
                        todoF.push(valor_1);
                        if (valores_t.length == 0) {
                            valores_t.push(datosA[j].Total_T);
                            valores_t.push(datosA[j].Total_R);
                        }
                    }
                    else {
                        todoA = _.where(todoF, { label: datosA[j].Etiqueta });
                        todoA[0].data.push(datosA[j].Teorico);
                        todoA[0].data.push(datosA[j].Real);
                        valor_2 = { label: todoA[0].label, backgroundColor: todoA[0].backgroundColor, data: todoA[0].data };
                        todo.push(valor_2);
                        if (j == 0) {
                            valores_t.push(datosA[j].Total_T);
                            valores_t.push(datosA[j].Total_R);
                        }
                    }


                    if (meses.length == 1)
                        todo = todoF;

                    col++;
                }

            }



            var linea_t = {
                label: 'Total Linea',
                borderColor: vm.ColorCode(200),
                type: 'line',
                fill: false,
                data: valores_t
            };

            todo.push(linea_t);

            for (let i = 0; i < capacidad.length; i++) {
                valores_c.push(capacidad[i].Capacidad);
            }

            var linea_c =
            {
                label: 'Capacidad',
                borderColor: vm.ColorCode(100),
                type: 'line',
                yAxisID: 'WIP2',
                fill: false,
                data: valores_c
            };

            todo.push(linea_c);


            var barChartData = {
                labels: labelsf,
                datasets: todo
            };

            var ctx = document.getElementById("canvasMensualTR").getContext("2d");


            chartMensualTR = new Chart(ctx, {
                type: 'bar',
                data: barChartData,
                options: {
                    events: ["mousemove", "mouseout", "click", "touchstart", "touchmove", "touchend"],
                    onClick: function (e, data) {
                        vm.SemanalTR(2022, data[0]._view.label.substring(0, 2));
                    },
                    title: {
                        display: true,
                        text: lineaB,
                        fontSize: 25
                    },
                    tooltips: {
                        mode: 'label'
                    },
                    responsive: true,
                    scales: {
                        xAxes: [{
                            stacked: true,
                        }],
                        yAxes: [{
                            stacked: true
                        },
                        {
                            id: 'WIP2',
                            type: 'linear',
                            position: 'right',
                            stacked: false,
                            ticks: { beginAtZero: true, fontColor: "#1E90FF" }
                        }]
                    }
                }
            });



        }

        vm.makeSemanalTR = function (datos, meses, capacidad) {
            var todoF = [];
            var labelsf = [];
            var todoA = [];
            var todo = [];
            var valores_t = [];
            var valores_c = [];
            var lineaB = '';

            var col = 1;
            for (let i = 0; i < meses.length; i++) {
                labelsf.push(meses[i].Semana + "-Teorico");
                labelsf.push(meses[i].Semana + "-Real");

                var datosA = _.where(datos, { Semana: meses[i].Semana });
                for (let j = 0; j < datosA.length; j++) {
                    if (j == 0)
                        lineaB = "Gráfica Semanal de: " + datosA[j].Linea;

                    var resultados = [];
                    resultados.push(datosA[j].Teorico);
                    resultados.push(datosA[j].Real);
                    var valor_1 = {};
                    var valor_2 = {};
                    if (i == 0) {
                        valor_1 = { label: datosA[j].Etiqueta, backgroundColor: vm.ColorCode(col), data: resultados };
                        todoF.push(valor_1);
                        if (valores_t.length == 0) {
                            valores_t.push(datosA[j].Total_T);
                            valores_t.push(datosA[j].Total_R);
                        }
                    }
                    else {
                        todoA = _.where(todoF, { label: datosA[j].Etiqueta });
                        todoA[0].data.push(datosA[j].Teorico);
                        todoA[0].data.push(datosA[j].Real);
                        valor_2 = { label: todoA[0].label, backgroundColor: todoA[0].backgroundColor, data: todoA[0].data };
                        todo.push(valor_2);
                        if (j == 0) {
                            valores_t.push(datosA[j].Total_T);
                            valores_t.push(datosA[j].Total_R);
                        }
                    }




                    col++;
                }

            }



            var linea_t = {
                label: 'Total Linea',
                borderColor: vm.ColorCode(200),
                type: 'line',
                fill: false,
                data: valores_t
            };

            todo.push(linea_t);

            for (let i = 0; i < capacidad.length; i++) {
                valores_c.push(capacidad[i].Capacidad);
            }

            var linea_c =
            {
                label: 'Capacidad',
                borderColor: vm.ColorCode(100),
                type: 'line',
                yAxisID: 'WIP2',
                fill: false,
                data: valores_c
            };

            todo.push(linea_c);


            var barChartData = {
                labels: labelsf,
                datasets: todo
            };

            var ctx = document.getElementById("canvasSemanalTR").getContext("2d");


            chartSemanalTR = new Chart(ctx, {
                type: 'bar',
                data: barChartData,
                options: {
                    title: {
                        display: true,
                        text: lineaB,
                        fontSize: 25
                    },
                    tooltips: {
                        mode: 'label'
                    },
                    responsive: true,
                    scales: {
                        xAxes: [{
                            stacked: true,
                        }],
                        yAxes: [{
                            stacked: true
                        },
                        {
                            id: 'WIP2',
                            type: 'linear',
                            position: 'right',
                            stacked: false,
                            ticks: { beginAtZero: true, fontColor: "#1E90FF" }
                        }]
                    }
                }
            });



        }

        vm.randomScalingFactor = function () {
            var makingColorCode = '0123456789ABCDEF';
            var finalCode = '#';
            for (var counter = 0; counter < 6; counter++) {
                finalCode = finalCode + makingColorCode[Math.floor(Math.random() * 16)];
            }
            return finalCode;
        }

        vm.exportar = function () {
            try {
                Ex.load(true);
                vm.graficas();
            }
            catch (ex) {
                Ex.mensajes(ex.message, 4);
                Ex.load(false);
            }
        }

        $scope.getEliminar = function (item) {
            try {
                Ex.load(true);
                var i = vm.principal.indexOf(item);
                if (i !== -1) {
                    vm.principal.splice(i, 1);
                    vm.principal_ = angular.copy(vm.principal);
                    //vm.makeAnualTR(vm.principal, vm.datos2, vm.principal3);
                }
            } catch (ex) {
                Ex.mensajes(ex.message, 4);
                Ex.load(false);
            }
        };

        var init = function () {
            vm.fnEncabezado('');            
        }

        init();

    }
})();