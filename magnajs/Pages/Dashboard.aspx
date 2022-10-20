<%@ Page Title="" Language="C#" MasterPageFile="~/includes/magnajs.Master" AutoEventWireup="true" CodeBehind="Dashboard.aspx.cs" Inherits="magnajs.Pages.Dashboard" %>


<asp:Content ID="Content1" ContentPlaceHolderID="main" runat="server">
    <div class="view dashboard" ng-controller="dashboardController as vm" style="margin-top: 0px;">
        <h1>{{vm.titulo}}</h1>
        <div id="Home" class="mail-box padding-10 wrapper border-bottom" style="margin-top: 0px;">
            <div class="row">
                <div class="col-md-8"></div>
                <div class="col-md-2" style="overflow-x: auto;">
                     <select ng-model="filtro.IdLinea" class="form-control-select" ng-change="vm.AnualTR('', '', filtro.IdLinea);">
                            <option value=""><%= this.GetCommonMessage("lblSeleccionar") %></option>
                            <option value="31">LINEA A</option>
                            <option value="32">LINEA D</option>
                            <option value="37">ZETA 5</option>
                            <option value="38">ZETA 4</option>
                            <option value="99">LINEA E</option>
                      </select>

                </div>
                <div class="col-md-1" style="overflow-x: auto;">
                    <button type="button" class="btn btn-success" ng-click="vm.graficas();">
                        <%= this.GetCommonMessage("lblTooltipRestablecer") %>
                    </button>
                </div>
            </div>
            <div class="table-responsive" style="overflow-x: hidden; overflow-y: hidden; margin-top: 0px;">
                <!-- table start -->
                <div class="row">
                    <div class="col-md-1"></div>
                    <div class="col-md-6" style="overflow-x: auto;" ng-show="vm.getAnual">
                        <canvas id="canvasAnualTR" style="width: 20px;"></canvas>
                    </div>
                    <div class="col-md-6" style="overflow-x: auto;" ng-show="vm.getMensual">
                        <canvas id="canvasMensualTR" style="width: 20px;"></canvas>
                    </div>
                    <div class="col-md-6" style="overflow-x: auto;" ng-show="vm.getSemanal">
                        <canvas id="canvasSemanalTR" style="width: 20px;"></canvas>
                    </div>
                </div>
                <br />

                <!-- table ends -->
            </div>
        </div>
        <div id="Home2" class="mail-box padding-10 wrapper border-bottom" style="margin-top: 0px;">
            <div class="row" id="dshAnual" ng-show="vm.getAnual">
                <div class="col-md-1"></div>
                <div class="col-md-6">
                    <div ui-table="vm.principal" st-fixed style="width: 100%">
                        <table class="jsgrid-table" style="width: 460px; min-width: 460px"
                            st-table="vm.principal" st-safe-src="vm.principal_">
                            <thead>
                                <tr style="background-color: blue;">
                                    <th ui-field width="100" class="text-center" style="font-weight: bold;"><%= this.GetMessage("gvGeneral-Anio") %></th>
                                    <th ui-field width="150" class="text-center" style="font-weight: bold;"><%= this.GetMessage("gvGeneral-Programa") %></th>
                                    <th ui-field width="100" class="text-center" style="font-weight: bold;"><%= this.GetMessage("gvGeneral-Teorico") %></th>
                                    <th ui-field width="100" class="text-center" style="font-weight: bold;"><%= this.GetMessage("gvGeneral-Real") %></th>
                                    <th ui-field width="10"></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr ng-repeat="item in vm.principal">
                                    <td st-ratio="100" class="text-center">{{item.Anio}}</td>
                                    <td st-ratio="150" class="text-center">{{item.Etiqueta}}</td>
                                    <td st-ratio="100" class="text-center">
                                        <input type="text" ng-model="item.Teorico" class="form-control-input" ng-blur="vm.makeAnualTR(vm.principal, vm.datos2, vm.principal3);" money required />
                                    </td>
                                    <td st-ratio="100" class="text-center">
                                        <input type="text" ng-model="item.Real" class="form-control-input" ng-blur="vm.makeAnualTR(vm.principal, vm.datos2, vm.principal3);" money required />
                                    </td>
                                    <td st-ratio="10" class="text-center"></td>
                                </tr>
                                <tr>
                                    <td colspan="6" style="height: 30px;"></td>
                                </tr>
                                <tr ng-if="vm.principal.length == 0" class="nodata-row">
                                    <td colspan="6" class="text-center">
                                        <%=  this.GetCommonMessage("msgGridSinInformacion") %>
                                    </td>
                                </tr>
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td colspan="6">
                                        <div st-pagination="10" st-items-by-page="100" st-template="../templates/pagination.html"></div>
                                    </td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>
                <div class="col-md-1"></div>
                <div class="col-md-4">
                    <div ui-table="vm.principal3" st-fixed style="width: 80%">
                        <table class="jsgrid-table" style="width: 310px; min-width: 310px"
                            st-table="vm.principal3" st-safe-src="vm.principal3_">
                            <thead>
                                <tr style="background-color: green;">
                                    <th ui-field width="100" class="text-center" style="font-weight: bold;"><%= this.GetMessage("gvGeneral-Anio") %></th>
                                    <th ui-field width="100" class="text-center" style="font-weight: bold;"><%= this.GetMessage("gvGeneral-Tipo") %></th>
                                    <th ui-field width="100" class="text-center" style="font-weight: bold;"><%= this.GetMessage("gvGeneral-Capacidad") %></th>
                                    <th ui-field width="10"></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr ng-repeat="item in vm.principal3">
                                    <td st-ratio="100" class="text-center">{{item.Anio}}</td>
                                    <td st-ratio="100" class="text-center" ng-show="item.Teorico"><%= this.GetMessage("gvGeneral-Teorico") %></td>
                                    <td st-ratio="100" class="text-center" ng-show="!item.Teorico"><%= this.GetMessage("gvGeneral-Real") %></td>
                                    <td st-ratio="100" class="text-center">
                                        <input type="text" ng-model="item.Capacidad" class="form-control-input" ng-blur="vm.makeAnualTR(vm.principal, vm.datos2, vm.principal3);" money required />
                                    </td>
                                    <td st-ratio="10" class="text-center"></td>
                                </tr>
                                <tr ng-if="vm.principal3.length == 0" class="nodata-row">
                                    <td colspan="4" class="text-center">
                                        <%=  this.GetCommonMessage("msgGridSinInformacion") %>
                                    </td>
                                </tr>
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td colspan="4">
                                        <div st-pagination="10" st-items-by-page="100" st-template="../templates/pagination.html"></div>
                                    </td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>
            </div>
            <div class="row" id="dshMensual" ng-show="vm.getMensual">
                <div class="col-md-1"></div>
                <div class="col-md-6">
                    <div ui-table="vm.principalM" st-fixed style="width: 100%">
                        <table class="jsgrid-table" style="width: 560px; min-width: 560px"
                            st-table="vm.principalM" st-safe-src="vm.principalM_">
                            <thead>
                                <tr style="background-color: blue;">
                                    <th ui-field width="100" class="text-center" style="font-weight: bold;"><%= this.GetMessage("gvGeneral-Anio") %></th>
                                    <th ui-field width="100" class="text-center" style="font-weight: bold;"><%= this.GetMessage("gvGeneral-Mes") %></th>
                                    <th ui-field width="150" class="text-center" style="font-weight: bold;"><%= this.GetMessage("gvGeneral-Programa") %></th>
                                    <th ui-field width="100" class="text-center" style="font-weight: bold;"><%= this.GetMessage("gvGeneral-Teorico") %></th>
                                    <th ui-field width="100" class="text-center" style="font-weight: bold;"><%= this.GetMessage("gvGeneral-Real") %></th>
                                    <th ui-field width="10"></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr ng-repeat="item in vm.principalM">
                                    <td st-ratio="100" class="text-center">{{item.Anio}}</td>
                                    <td st-ratio="100" class="text-center">{{item.Mes}}</td>
                                    <td st-ratio="150" class="text-center">{{item.Etiqueta}}</td>
                                    <td st-ratio="100" class="text-center">
                                        <input type="text" ng-model="item.Teorico" class="form-control-input" ng-blur="vm.makeMensualTR(vm.principalM, vm.datos2M, vm.principal3M);" money required />
                                    </td>
                                    <td st-ratio="100" class="text-center">
                                        <input type="text" ng-model="item.Real" class="form-control-input" ng-blur="vm.makeMensualTR(vm.principalM, vm.datos2M, vm.principal3M);" money required />
                                    </td>
                                    <td st-ratio="10" class="text-center"></td>
                                </tr>
                                <tr>
                                    <td colspan="6" style="height: 30px;"></td>
                                </tr>
                                <tr ng-if="vm.principalM.length == 0" class="nodata-row">
                                    <td colspan="6" class="text-center">
                                        <%=  this.GetCommonMessage("msgGridSinInformacion") %>
                                    </td>
                                </tr>
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td colspan="6">
                                        <div st-pagination="10" st-items-by-page="100" st-template="../templates/pagination.html"></div>
                                    </td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>
                <div class="col-md-1"></div>
                <div class="col-md-4">
                    <div ui-table="vm.principal3M" st-fixed style="width: 80%">
                        <table class="jsgrid-table" style="width: 410px; min-width: 410px"
                            st-table="vm.principal3M" st-safe-src="vm.principal3M_">
                            <thead>
                                <tr style="background-color: green;">
                                    <th ui-field width="100" class="text-center" style="font-weight: bold;"><%= this.GetMessage("gvGeneral-Anio") %></th>
                                    <th ui-field width="100" class="text-center" style="font-weight: bold;"><%= this.GetMessage("gvGeneral-Mes") %></th>
                                    <th ui-field width="100" class="text-center" style="font-weight: bold;"><%= this.GetMessage("gvGeneral-Tipo") %></th>
                                    <th ui-field width="100" class="text-center" style="font-weight: bold;"><%= this.GetMessage("gvGeneral-Capacidad") %></th>
                                    <th ui-field width="10"></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr ng-repeat="item in vm.principal3M">
                                    <td st-ratio="100" class="text-center">{{item.Anio}}</td>
                                    <td st-ratio="100" class="text-center">{{item.Mes}}</td>
                                    <td st-ratio="100" class="text-center" ng-show="item.Teorico"><%= this.GetMessage("gvGeneral-Teorico") %></td>
                                    <td st-ratio="100" class="text-center" ng-show="!item.Teorico"><%= this.GetMessage("gvGeneral-Real") %></td>
                                    <td st-ratio="100" class="text-center">
                                        <input type="text" ng-model="item.Capacidad" class="form-control-input" ng-blur="vm.makeMensualTR(vm.principalM, vm.datos2M, vm.principal3M);" money required />
                                    </td>
                                    <td st-ratio="10" class="text-center"></td>
                                </tr>
                                <tr ng-if="vm.principal3M.length == 0" class="nodata-row">
                                    <td colspan="4" class="text-center">
                                        <%=  this.GetCommonMessage("msgGridSinInformacion") %>
                                    </td>
                                </tr>
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td colspan="4">
                                        <div st-pagination="10" st-items-by-page="100" st-template="../templates/pagination.html"></div>
                                    </td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>
            </div>
            <div class="row" id="dshSemanal"  ng-show="vm.getSemanal">
                <div class="col-md-1"></div>
                <div class="col-md-6">
                    <div ui-table="vm.principalS" st-fixed style="width: 100%">
                        <table class="jsgrid-table" style="width: 460px; min-width: 460px"
                            st-table="vm.principalS" st-safe-src="vm.principalS_">
                            <thead>
                                <tr style="background-color: blue;">
                                    <th ui-field width="100" class="text-center" style="font-weight: bold;"><%= this.GetMessage("gvGeneral-Semana") %></th>
                                    <th ui-field width="150" class="text-center" style="font-weight: bold;"><%= this.GetMessage("gvGeneral-Programa") %></th>
                                    <th ui-field width="100" class="text-center" style="font-weight: bold;"><%= this.GetMessage("gvGeneral-Teorico") %></th>
                                    <th ui-field width="100" class="text-center" style="font-weight: bold;"><%= this.GetMessage("gvGeneral-Real") %></th>
                                    <th ui-field width="10"></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr ng-repeat="item in vm.principalS">
                                    <td st-ratio="100" class="text-center">{{item.Semana}}</td>
                                    <td st-ratio="150" class="text-center">{{item.Etiqueta}}</td>
                                    <td st-ratio="100" class="text-center">
                                        <input type="text" ng-model="item.Teorico" class="form-control-input" ng-blur="vm.makeSemanalTR(vm.principalS, vm.datos2S, vm.principal3S);" money required />
                                    </td>
                                    <td st-ratio="100" class="text-center">
                                        <input type="text" ng-model="item.Real" class="form-control-input" ng-blur="vm.makeSemanalTR(vm.principalS, vm.datos2S, vm.principal3S);" money required />
                                    </td>
                                    <td st-ratio="10" class="text-center"></td>
                                </tr>
                                <tr>
                                    <td colspan="6" style="height: 30px;"></td>
                                </tr>
                                <tr ng-if="vm.principalS.length == 0" class="nodata-row">
                                    <td colspan="6" class="text-center">
                                        <%=  this.GetCommonMessage("msgGridSinInformacion") %>
                                    </td>
                                </tr>
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td colspan="6">
                                        <div st-pagination="10" st-items-by-page="100" st-template="../templates/pagination.html"></div>
                                    </td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>
                <div class="col-md-1"></div>
                <div class="col-md-4">
                    <div ui-table="vm.principal3S" st-fixed style="width: 80%">
                        <table class="jsgrid-table" style="width: 310px; min-width: 310px"
                            st-table="vm.principal3S" st-safe-src="vm.principal3S_">
                            <thead>
                                <tr style="background-color: green;">
                                    <th ui-field width="100" class="text-center" style="font-weight: bold;"><%= this.GetMessage("gvGeneral-Semana") %></th>
                                    <th ui-field width="100" class="text-center" style="font-weight: bold;"><%= this.GetMessage("gvGeneral-Tipo") %></th>
                                    <th ui-field width="100" class="text-center" style="font-weight: bold;"><%= this.GetMessage("gvGeneral-Capacidad") %></th>
                                    <th ui-field width="10"></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr ng-repeat="item in vm.principal3S">
                                    <td st-ratio="100" class="text-center">{{item.Semana}}</td>
                                    <td st-ratio="100" class="text-center" ng-show="item.Teorico"><%= this.GetMessage("gvGeneral-Teorico") %></td>
                                    <td st-ratio="100" class="text-center" ng-show="!item.Teorico"><%= this.GetMessage("gvGeneral-Real") %></td>
                                    <td st-ratio="100" class="text-center">
                                        <input type="text" ng-model="item.Capacidad" class="form-control-input" ng-blur="vm.makeSemanalTR(vm.principalS, vm.datos2S, vm.principal3S);" money required />
                                    </td>
                                    <td st-ratio="10" class="text-center"></td>
                                </tr>
                                <tr ng-if="vm.principal3S.length == 0" class="nodata-row">
                                    <td colspan="4" class="text-center">
                                        <%=  this.GetCommonMessage("msgGridSinInformacion") %>
                                    </td>
                                </tr>
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td colspan="4">
                                        <div st-pagination="10" st-items-by-page="100" st-template="../templates/pagination.html"></div>
                                    </td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>
            </div>
            <br />
        </div>

        <br />
        <script type="text/javascript" src="../Scripts/pages/dashBoardController.js?v=1.1<%=DateTime.Now.Millisecond %>"></script>
    </div>
</asp:Content>
