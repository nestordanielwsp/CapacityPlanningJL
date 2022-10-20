<%@ Page Title="" Language="C#" MasterPageFile="~/includes/magnajs.Master" AutoEventWireup="true" CodeBehind="MainSheet.aspx.cs" Inherits="magnajs.Pages.MainSheet" %>


<asp:Content ID="Content1" ContentPlaceHolderID="main" runat="server">
    <div class="view dashboard" ng-controller="mainsheetController as vm" style="margin-top: 0px;">

       

        <div class="row">
            <div class="col-md-11 col-sm-12">
                 <h1>{{vm.titulo}}</h1>
            </div>
            <div class="col-md-1 col-sm-12" style="margin-top:10px;">
                <button type="button" class="btn btn-success" ng-click="vm.fnEncabezado('');">
                    <%= this.GetCommonMessage("lblTooltipRestablecer") %>
                </button>
            </div>

        </div>


        <div id="Home" class="mail-box padding-10 wrapper border-bottom" style="margin-top: 0px;">
            <div class="row" id="dshAnual" ng-show="vm.getAnual">
                <div class="col-md-1 col-sm-12"></div>
                <div class="col-md-10 col-sm-12">
                    <table class="jsgrid-table" style="width: 1150px; min-width: 1150px"
                        st-table="vm.encabezado" st-safe-src="vm.encabezado_">
                        <thead>
                            <tr style="background-color: black; color: white;">
                                <th ui-field width="150" class="text-center" style="font-weight: bold;"><%= this.GetMessage("gvEncabezado-Press") %></th>
                                <th ui-field width="100" class="text-center" style="font-weight: bold;"><%= this.GetMessage("gvEncabezado-HrsDay") %></th>
                                <th ui-field width="100" class="text-center" style="font-weight: bold;"><%= this.GetMessage("gvEncabezado-Lunch") %></th>
                                <th ui-field width="100" class="text-center" style="font-weight: bold;"><%= this.GetMessage("gvEncabezado-Shift") %></th>
                                <th ui-field width="100" class="text-center" style="font-weight: bold;"><%= this.GetMessage("gvEncabezado-SetUpTime") %></th>
                                <th ui-field width="100" class="text-center" style="font-weight: bold;"><%= this.GetMessage("gvEncabezado-Weeks") %></th>
                                <th ui-field width="100" class="text-center" style="font-weight: bold;"><%= this.GetMessage("gvEncabezado-ShiftxWks") %></th>
                                <th ui-field width="100" class="text-center" style="font-weight: bold;"><%= this.GetMessage("gvEncabezado-Shift1") %></th>
                                <th ui-field width="100" class="text-center" style="font-weight: bold;"><%= this.GetMessage("gvEncabezado-Shift2") %></th>
                                <th ui-field width="100" class="text-center" style="font-weight: bold;"><%= this.GetMessage("gvEncabezado-Shift3") %></th>
                                <th ui-field width="100" class="text-center" style="font-weight: bold;"><%= this.GetMessage("gvEncabezado-OverTime") %></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr ng-repeat="item in vm.encabezado">
                                <td st-ratio="150" class="text-center bold">
                                    <select ng-model="vm.IdLinea" class="form-control-select" ng-change="vm.fnEncabezado(vm.IdLinea);">
                                        <option value="31" selected>LINEA A</option>
                                        <option value="32">LINEA D</option>
                                        <option value="37">ZETA 5</option>
                                        <option value="38">ZETA 4</option>
                                        <option value="99">LINEA E</option>
                                    </select>
                                </td>
                                <td st-ratio="100" class="text-center">
                                    <input type="text" ng-model="item.HrsDay" class="form-control-input text-right" required ng-change="calcularEncabezado(item)" />
                                </td>
                                <td st-ratio="100" class="text-center">
                                    <input type="text" ng-model="item.Lunch" class="form-control-input text-right" required ng-change="calcularEncabezado(item)" />
                                </td>
                                <td st-ratio="100" class="text-center">
                                    <input type="text" ng-model="item.Shift" class="form-control-input text-right" required ng-change="calcularEncabezado(item)" />
                                </td>
                                <td st-ratio="100" class="text-center">
                                    <input type="text" ng-model="item.SetUpTime" class="form-control-input text-right" required ng-change="calcularEncabezado(item)" />
                                </td>
                                <td st-ratio="100" class="text-center">
                                    <input type="text" ng-model="item.Weeks" class="form-control-input text-right" required ng-change="calcularEncabezado(item)" />
                                </td>
                                <td st-ratio="100" class="text-center">
                                    <input type="text" ng-model="item.ShiftxWks" class="form-control-input text-right" required ng-change="calcularEncabezado(item)" />
                                </td>
                                <td st-ratio="100" class="text-center">
                                    <input type="text" ng-model="item.Shift1" class="form-control-input text-right" required ng-change="calcularEncabezado(item)" />
                                </td>
                                <td st-ratio="100" class="text-center">
                                    <input type="text" ng-model="item.Shift2" class="form-control-input text-right" required ng-change="calcularEncabezado(item)" />
                                </td>
                                <td st-ratio="100" class="text-center">
                                    <input type="text" ng-model="item.Shift3" class="form-control-input text-right" required ng-change="calcularEncabezado(item)" />
                                </td>
                                <td st-ratio="100" class="text-center">
                                    <input type="text" ng-model="item.OverTime" class="form-control-input text-right" required ng-change="calcularEncabezado(item)" />
                                </td>
                            </tr>
                            <tr ng-if="vm.encabezado.length == 0" class="nodata-row">
                                <td colspan="11" class="text-center">
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
                    <table class="jsgrid-table" style="width: 1100px; min-width: 1100px"
                        st-table="vm.encabezado" st-safe-src="vm.encabezado_">
                        <thead>
                            <tr style="background-color: black; color: white;">
                                <th ui-field width="100" class="text-center" style="font-weight: bold;"></th>
                                <th ui-field width="100" class="text-center" style="font-weight: bold;"><%= this.GetMessage("gvEncabezado-TotalWeekly") %></th>
                                <th ui-field width="100" class="text-center" style="font-weight: bold;"><%= this.GetMessage("gvEncabezado-AvailableTime") %></th>
                                <th ui-field width="100" class="text-center" style="font-weight: bold;"><%= this.GetMessage("gvEncabezado-QCOmin") %></th>
                                <th ui-field width="100" class="text-center" style="font-weight: bold;"><%= this.GetMessage("gvEncabezado-HrsxDay") %></th>
                                <th ui-field width="100" class="text-center" style="font-weight: bold;"><%= this.GetMessage("gvEncabezado-SPMa") %></th>
                                <th ui-field width="100" class="text-center" style="font-weight: bold;"><%= this.GetMessage("gvEncabezado-JPHa") %></th>
                                <th ui-field width="400" class="text-center" style="font-weight: bold;"></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr ng-repeat="item in vm.encabezado">
                                <td st-ratio="100" class="text-center"></td>
                                <td st-ratio="100" class="text-center" style="vertical-align: middle;">{{item.TotalWeeklyHour}}
                                </td>
                                <td st-ratio="100" class="text-center" style="vertical-align: middle;">{{item.AvailableTime}}
                                </td>
                                <td st-ratio="100" class="text-center">
                                    <input type="text" ng-model="item.QCOmin" class="form-control-input text-right" required ng-change="calcularQCOHrsTodos(item.QCOmin)" />
                                </td>
                                <td st-ratio="100" class="text-center" style="vertical-align: middle;">{{item.HrsxDay}}
                                </td>
                                <td st-ratio="100" class="text-center" style="vertical-align: middle;">{{item.SPM}}
                                </td>
                                <td st-ratio="100" class="text-center">
                                    <input type="text" ng-model="item.JPH" class="form-control-input text-right" required ng-change="calcularEncabezado(item)" />
                                </td>
                                <td st-ratio="400" class="text-center"></td>
                            </tr>
                            <tr ng-if="vm.encabezado.length == 0" class="nodata-row">
                                <td colspan="11" class="text-center">
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
        </div>
        <div id="Home2" class="mail-box padding-10 wrapper border-bottom" style="margin-top: 0px;">
            <div class="row" ng-show="vm.getAnual">
                <div class="col-md-11">
                    <table class="jsgrid-table"
                        st-table="vm.totalVolume" st-safe-src="vm.totalVolume_">
                        <tbody>
                            <tr>
                                <td st-ratio="100" class="text-center bold"><%= this.GetMessage("gvGeneral-JPH") %></td>
                                <td st-ratio="100" class="text-center" ng-repeat="item in vm.jPH">
                                    <input type="text" ng-model="item.cantidad" class="form-control-input text-center" required ng-change="calcularNetJPH($index);" />
                                </td>
                            </tr>
                            <tr>
                                <td st-ratio="100" class="text-center bold"><%= this.GetMessage("gvGeneral-Efficiency") %></td>
                                <td st-ratio="100" class="text-center" ng-repeat="item in vm.efficiency">
                                    <input type="text" ng-model="item.cantidad" class="form-control-input text-center" required ng-change="calcularNetJPH($index);" />
                                </td>
                            </tr>
                            <tr>
                                <td st-ratio="100" class="text-center bold"><%= this.GetMessage("gvGeneral-NetJPH") %></td>
                                <td st-ratio="100" class="text-center" ng-repeat="item in vm.netJPH" style="vertical-align: middle;">{{item.cantidad}}
                                </td>
                            </tr>
                            <tr>
                                <td st-ratio="100" class="text-center bold"><%= this.GetMessage("gvGeneral-Year") %></td>
                                <td st-ratio="100" class="text-center bold" ng-repeat="item in vm.years" style="background-color: cornflowerblue;">{{item.Anio}}
                                </td>
                            </tr>
                            <tr>
                                <td st-ratio="100" class="text-center bold"><%= this.GetMessage("gvGeneral-QCOqty") %></td>
                                <td st-ratio="100" class="text-center" ng-repeat="item in vm.qCOQty">
                                    <input type="text" ng-model="item.cantidad" class="form-control-input text-center" required ng_change="calcularQCOHrs($index);" />
                                </td>
                            </tr>
                            <tr>
                                <td st-ratio="100" class="text-center bold"><%= this.GetMessage("gvGeneral-QCOhrs") %></td>
                                <td st-ratio="100" class="text-center" ng-repeat="item in vm.qCOHrs" style="vertical-align: middle; text-align: right; padding-right: 1em;">{{item.cantidad}}
                                </td>
                            </tr>
                            <tr>
                                <td st-ratio="100" class="text-center bold"><%= this.GetMessage("gvGeneral-TotalTime") %></td>
                                <td st-ratio="100" class="text-center" ng-repeat="item in vm.totalTime" style="vertical-align: middle;">{{item.cantidad | number:0}}
                                </td>
                            </tr>
                            <tr>
                                <td st-ratio="100" class="text-center bold"><%= this.GetMessage("gvGeneral-Stokes") %></td>
                                <td st-ratio="100" class="text-center" ng-repeat="item in vm.stokes" style="vertical-align: middle;">{{item.cantidad | number:0}}
                                </td>
                            </tr>
                            <tr>
                                <td st-ratio="100" class="text-center bold"><%= this.GetMessage("gvGeneral-VolRequired") %></td>
                                <td st-ratio="100" ng-repeat="item in vm.totalVolume">
                                    <input type="text" ng-model="item.cantidad" money precision="0" class="form-control-input text-center" required ng-change="calcularUtilizacion($index);" />
                                </td>
                            </tr>
                            <tr style="background-color: #FFC7CE;">
                                <td st-ratio="100" class="text-center bold"><%= this.GetMessage("gvGeneral-Utilization") %></td>
                                <td st-ratio="100" class="text-center bold" ng-repeat="item in vm.utilizacion" style="vertical-align: middle; text-align: center">{{item.cantidad}} %
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
        </div>
        <div id="Home3" class="mail-box padding-10 wrapper border-bottom" style="margin-top: 0px;">
            <div class="table-responsive" style="overflow-x: hidden; overflow-y: hidden; margin-top: 0px;">
                <!-- table start -->
                <div class="row">
                    <div class="col-md-2"></div>
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
        <br />
        <script type="text/javascript" src="../Scripts/pages/mainsheetController.js?v=1.1<%=DateTime.Now.Millisecond %>"></script>
    </div>
</asp:Content>


