<%@ Page Title="" Language="C#" MasterPageFile="~/includes/magnajs.Master" AutoEventWireup="true" CodeBehind="Inicio.aspx.cs" Inherits="magnajs.Pages.Inicio" %>


<asp:Content ID="Content1" ContentPlaceHolderID="main" runat="server">
    <div class="view dashboard" ng-controller="inicioController as vm" style="margin-top: 0px;">
        <h1>{{vm.titulo}}</h1>
        <div id="Home" class="mail-box padding-10 wrapper border-bottom" style="margin-top: 0px;">
            <div class="row">
                <div class="col-md-10"></div>              
                <div class="col-md-1" style="overflow-x: auto;">
                    <button type="button" class="btn btn-success" ng-click="vm.guardar();">
                        <%= this.GetCommonMessage("lblTooltipActualizar") %>
                    </button>
                </div>
            </div>
            <div class="row">
                <div class="col-md-1"></div>
                <div class="col-md-4">
                    <br />
                    <div class="md-whiteframe-1dp">
                        <h2><%= this.GetMessage("TituloE") %></h2>
                    </div>
                    <br />
                    <div ui-table="vm.efficiency" st-fixed style="width: 100%">
                        <table class="jsgrid-table" style="width: 165px; max-width: 165px"
                            st-table="vm.efficiency" st-safe-src="vm.efficiency_">
                            <thead>
                                <tr style="background-color: gainsboro;">
                                    <th ui-field width="15">
                                        <button type="button" class="btn btn-link" ng-click="agregarEfficiency()">
                                            <i class="glyphicon glyphicon-plus"></i>
                                        </button>
                                    </th>
                                    <th ui-field width="55" class="text-center" style="font-weight: bold;"><%= this.GetMessage("gvGeneral-Linea") %></th>
                                    <th ui-field width="40" class="text-center" style="font-weight: bold;"><%= this.GetMessage("gvGeneral-Anio") %></th>
                                    <th ui-field width="40" class="text-center" style="font-weight: bold;"><%= this.GetMessage("gvGeneral-Cantidad") %></th>
                                    <th ui-field width="15"></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr ng-repeat="item in vm.efficiency">
                                    <td st-ratio="15" class="text-center">
                                        <button type="button" class="btn btn-link" ng-click="eliminarEfficiency(item)" ng-if="item.Editable">
                                            <i class="glyphicon glyphicon-trash" style="color: red;"></i>
                                        </button>
                                    </td>
                                    <td st-ratio="55" class="text-center">
                                        <select class="form-control-select" ng-model="item.IdLinea"
                                            ng-options="item.IdLinea as item.Linea for item in lineas"
                                            required>
                                            <option value=""><%= this.GetMessage("lblSelect") %></option>
                                        </select>
                                    </td>
                                    <td st-ratio="40" class="text-center">
                                        <input type="text" class="form-control-input" ng-model="item.Anio"
                                            required precision="0" style="text-align: right"
                                            ng-disabled="vm.efficiency.IdEfficiency" />
                                    </td>
                                    <td st-ratio="40" class="text-center">
                                        <input type="text" class="form-control-input" ng-model="item.Cantidad"
                                            required precision="0" style="text-align: right"
                                            ng-disabled="vm.efficiency.IdEfficiency" />
                                    </td>
                                    <td st-ratio="15" class="text-center"></td>
                                </tr>
                                <tr ng-if="vm.efficiency.length == 0" class="nodata-row">
                                    <td colspan="5" class="text-center">
                                        <%=  this.GetCommonMessage("msgGridSinInformacion") %>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="col-md-1"></div>
                <div class="col-md-4">
                    <br />
                    <div class="md-whiteframe-1dp">
                        <h2><%= this.GetMessage("TituloQCO") %></h2>
                    </div>
                    <br />
                    <div ui-table="vm.qcoqty" st-fixed style="width: 100%">
                        <table class="jsgrid-table" style="width: 165px; max-width: 165px"
                            st-table="vm.qcoqty" st-safe-src="vm.qcoqty_">
                            <thead>
                                <tr style="background-color: gainsboro;">
                                    <th ui-field width="15">
                                        <button type="button" class="btn btn-link" ng-click="agregarQcoQty()">
                                            <i class="glyphicon glyphicon-plus"></i>
                                        </button>
                                    </th>
                                    <th ui-field width="55" class="text-center" style="font-weight: bold;"><%= this.GetMessage("gvGeneral-Linea") %></th>
                                    <th ui-field width="40" class="text-center" style="font-weight: bold;"><%= this.GetMessage("gvGeneral-Anio") %></th>
                                    <th ui-field width="40" class="text-center" style="font-weight: bold;"><%= this.GetMessage("gvGeneral-Cantidad") %></th>
                                    <th ui-field width="15"></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr ng-repeat="item in vm.qcoqty">
                                    <td st-ratio="15" class="text-center">
                                        <button type="button" class="btn btn-link" ng-click="eliminarQcoQty(item)" ng-if="item.Editable">
                                            <i class="glyphicon glyphicon-trash" style="color: red;"></i>
                                        </button>
                                    </td>
                                    <td st-ratio="55" class="text-center">
                                        <select class="form-control-select" ng-model="item.IdLinea"
                                            ng-options="item.IdLinea as item.Linea for item in lineas"
                                            required>
                                            <option value=""><%= this.GetMessage("lblSelect") %></option>
                                        </select>
                                    </td>
                                    <td st-ratio="40" class="text-center">
                                        <input type="text" class="form-control-input" ng-model="item.Anio"
                                            required precision="0" style="text-align: right"
                                            ng-disabled="vm.efficiency.IdEfficiency" />
                                    </td>
                                    <td st-ratio="40" class="text-center">
                                        <input type="text" class="form-control-input" ng-model="item.Cantidad"
                                            required precision="0" style="text-align: right"
                                            ng-disabled="vm.efficiency.IdEfficiency" />
                                    </td>
                                    <td st-ratio="15" class="text-center"></td>
                                </tr>
                                <tr ng-if="vm.qcoqty.length == 0" class="nodata-row">
                                    <td colspan="5" class="text-center">
                                        <%=  this.GetCommonMessage("msgGridSinInformacion") %>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <br />
            <div class="row">
                <div class="col-md-1"></div>
                <div class="col-md-4">
                    <br />
                    <div class="md-whiteframe-1dp">
                        <h2><%= this.GetMessage("TituloSPH") %></h2>
                    </div>
                    <br />
                    <div ui-table="vm.sph" st-fixed style="width: 100%">
                        <table class="jsgrid-table" style="width: 165px; max-width: 165px"
                            st-table="vm.sph" st-safe-src="vm.sph_">
                            <thead>
                                <tr style="background-color: gainsboro;">
                                    <th ui-field width="15">
                                        <button type="button" class="btn btn-link" ng-click="agregarSPH()">
                                            <i class="glyphicon glyphicon-plus"></i>
                                        </button>
                                    </th>
                                    <th ui-field width="55" class="text-center" style="font-weight: bold;"><%= this.GetMessage("gvGeneral-Linea") %></th>
                                    <th ui-field width="40" class="text-center" style="font-weight: bold;"><%= this.GetMessage("gvGeneral-Anio") %></th>
                                    <th ui-field width="40" class="text-center" style="font-weight: bold;"><%= this.GetMessage("gvGeneral-Cantidad") %></th>
                                    <th ui-field width="15"></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr ng-repeat="item in vm.sph">
                                    <td st-ratio="15" class="text-center">
                                        <button type="button" class="btn btn-link" ng-click="eliminarSPH(item)" ng-if="item.Editable">
                                            <i class="glyphicon glyphicon-trash" style="color: red;"></i>
                                        </button>
                                    </td>
                                    <td st-ratio="55" class="text-center">
                                        <select class="form-control-select" ng-model="item.IdLinea"
                                            ng-options="item.IdLinea as item.Linea for item in lineas"
                                            required>
                                            <option value=""><%= this.GetMessage("lblSelect") %></option>
                                        </select>
                                    </td>
                                    <td st-ratio="40" class="text-center">
                                        <input type="text" class="form-control-input" ng-model="item.Anio"
                                            required precision="0" style="text-align: right"
                                            ng-disabled="vm.efficiency.IdEfficiency" />
                                    </td>
                                    <td st-ratio="40" class="text-center">
                                        <input type="text" class="form-control-input" ng-model="item.Cantidad"
                                            required precision="0" style="text-align: right"
                                            ng-disabled="vm.efficiency.IdEfficiency" />
                                    </td>
                                    <td st-ratio="15" class="text-center"></td>
                                </tr>
                                <tr ng-if="vm.sph.length == 0" class="nodata-row">
                                    <td colspan="5" class="text-center">
                                        <%=  this.GetCommonMessage("msgGridSinInformacion") %>
                                    </td>
                                </tr>

                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="col-md-1"></div>
                <div class="col-md-4">
                    <br />
                    <div class="md-whiteframe-1dp">
                        <h2><%= this.GetMessage("TituloTV") %></h2>
                    </div>
                    <br />
                    <div ui-table="vm.totalvolume" st-fixed style="width: 100%">
                        <table class="jsgrid-table" style="width: 165px; max-width: 165px"
                            st-table="vm.totalvolume" st-safe-src="vm.totalvolume_">
                            <thead>
                                <tr style="background-color: gainsboro;">
                                    <th ui-field width="15">
                                        <button type="button" class="btn btn-link" ng-click="agregarTotalVolume()">
                                            <i class="glyphicon glyphicon-plus"></i>
                                        </button>
                                    </th>
                                    <th ui-field width="55" class="text-center" style="font-weight: bold;"><%= this.GetMessage("gvGeneral-Linea") %></th>
                                    <th ui-field width="40" class="text-center" style="font-weight: bold;"><%= this.GetMessage("gvGeneral-Anio") %></th>
                                    <th ui-field width="40" class="text-center" style="font-weight: bold;"><%= this.GetMessage("gvGeneral-Cantidad") %></th>
                                    <th ui-field width="15"></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr ng-repeat="item in vm.totalvolume">
                                    <td st-ratio="15" class="text-center">
                                        <button type="button" class="btn btn-link" ng-click="eliminarTotalVolume(item)" ng-if="item.Editable">
                                            <i class="glyphicon glyphicon-trash" style="color: red;"></i>
                                        </button>
                                    </td>
                                    <td st-ratio="55" class="text-center">
                                        <select class="form-control-select" ng-model="item.IdLinea"
                                            ng-options="item.IdLinea as item.Linea for item in lineas"
                                            required>
                                            <option value=""><%= this.GetMessage("lblSelect") %></option>
                                        </select>
                                    </td>
                                    <td st-ratio="40" class="text-center">
                                        <input type="text" class="form-control-input" ng-model="item.Anio"
                                            required precision="0" style="text-align: right"
                                            ng-disabled="vm.efficiency.IdEfficiency" />
                                    </td>
                                    <td st-ratio="40" class="text-center">
                                        <input type="text" class="form-control-input" ng-model="item.Cantidad"
                                            required precision="0" style="text-align: right"
                                            ng-disabled="vm.efficiency.IdEfficiency" />
                                    </td>
                                    <td st-ratio="15" class="text-center"></td>
                                </tr>
                                <tr ng-if="vm.totalvolume.length == 0" class="nodata-row">
                                    <td colspan="5" class="text-center">
                                        <%=  this.GetCommonMessage("msgGridSinInformacion") %>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </div>
        <ui-modal modal="modalNotas">
            <div class="modal-dialog" form="modalForm">
                <div class="modal-content" ng-form="notasForma">
                    <div class="modal-header">
                        <button type="button" class="close no-disabled" data-dismiss="modal">&times;</button>
                        <h4 class="modal-title"><%= this.GetMessage("TituloModal") %></h4>
                    </div>

                    <div class="modal-body" ng-class="{'submitted': submitted}">
                    </div>

                    <div class="modal-footer">
                        <button type="button" class="btn btn-success" ng-click="vm.guardar(vm.item.cve_alerta_calidad)" ng-show="(vm.usuario.Loggeado && vm.item.es_campo != 'Aprobado')">
                            <%= this.GetCommonMessage("lblTooltipGuardar") %>
                        </button>
                        <button type="button" class="btn btn-default" data-dismiss="modal">
                            <%= this.GetCommonMessage("lblTooltipCerrar") %>
                        </button>
                    </div>
                </div>
            </div>
        </ui-modal>
        <script type="text/javascript" src="../Scripts/pages/inicioController.js?v=1.1<%=DateTime.Now.Millisecond %>"></script>
    </div>


</asp:Content>

