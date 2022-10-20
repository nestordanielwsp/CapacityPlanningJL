(function () {
    'use strict';

    angular.module(appName)
        .controller('dashboardController', dashboardController);

    dashboardController.$inject = ['$scope', '$http', '$rootScope'];

    function dashboardController($scope, $http, $rootScope) {
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

        vm.graficas = function () {           
            vm.AnualTR("", "", "");            
        }


        

        vm.AnualTR = function (pfechaInicio, pfechaFinal, plinea) {
            try {
                //Ex.load(true);
                vm.getAnual = true;
                vm.getMensual = false;
                vm.getSemanal = false;
                var datos = { anioInicio: pfechaInicio, aniofinal: pfechaFinal, linea: plinea };
                service.Execute('GetInformacion', datos, function (response) {
                    if (response.d) {
                        vm.principal = response.d.Grafica1;
                        vm.datos2 = response.d.Grafica2;
                        vm.principal3 = response.d.Grafica3;

                        vm.principal_ = angular.copy(vm.principal);
                        vm.principal3_ = angular.copy(vm.principal3);
                        vm.makeAnualTR(vm.principal, vm.datos2, vm.principal3);
                    }

                });
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


        vm.makeAnualTR = function (datos, anios, capacidad) {
            var todoF = [];
            var labelsf = [];
            var todoA = [];
            var todo = [];
            var valores_t = [];
            var valores_c = [];
            var lineaB = '';

            var col = 1;
            for (let i = 0; i < anios.length; i++) {
                labelsf.push(anios[i].Anio + "-Teorico");
               // labelsf.push("<a onclick='vm.MensualTR(" + anios[i].Anio + ",0,31);'>" + anios[i].Anio + "-Teorico</a>");
                labelsf.push(anios[i].Anio + "-Real");

                var datosA = _.where(datos, { Anio: anios[i].Anio });
                for (let j = 0; j < datosA.length; j++) {
                    if (j == 0)
                        lineaB = "Gráfica Anual de: " + datosA[j].Linea;

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

            var ctx = document.getElementById("canvasAnualTR").getContext("2d");


            chartAnualTR = new Chart(ctx, {
                type: 'bar',
                data: barChartData,
                options: 
                    {
                    events: ["mousemove", "mouseout", "click", "touchstart", "touchmove", "touchend"],
                    onClick: function (e, data) {                        
                        vm.MensualTR(data[0]._view.label.substring(0, 4), 31);                  
                                           
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
            vm.graficas();
        }

        init();

    }
})();