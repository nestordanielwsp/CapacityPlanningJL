using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Script.Services;
using System.Web.Services;
using System.Configuration;
using System.Data;
using System.Drawing;
using System.IO;
using logic;
using magnajs.Codes;
using logic.Class;
using System.Transactions;
using Infraestructura.Archivos;
using Newtonsoft.Json;
using OfficeOpenXml;
using OfficeOpenXml.Style;
using System.Text;
using System.Threading.Tasks;

namespace magnajs.Pages
{
    public partial class Inicio : BasePage
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            this.LoadJs("LoggeadoInfo", "false");
            this.LoadJs("EsAprobadorInfo", "false");
            this.LoadJs("EsCapturaInfo", "false");
            if (HttpContext.Current.Session["UsuarioId"] != null)
            {
                this.LoadJs("UsuarioIdInfo", HttpContext.Current.Session["UsuarioId"].ToString());

                if (HttpContext.Current.Session["PerfilId"].ToString() == "2")
                {
                    this.LoadJs("EsAprobadorInfo", "true");
                    this.LoadJs("LoggeadoInfo", "true");
                }

                if (HttpContext.Current.Session["PerfilId"].ToString() == "1")
                {
                    this.LoadJs("EsCapturaInfo", "true");
                    this.LoadJs("LoggeadoInfo", "true");
                }
            }

            this.FillCmb("CP_Linea_Cmb", "LineaInfo");


        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod]
        static public Dictionary<string, object> GetInformacion(Dictionary<string, object> datos)
        {
            var page = new logic.BasePage();
            var a = new logic_acces(ConexionDB);
            var response = new Dictionary<string, object>();
            DataSet Ds = a.ExecuteQuery("CP_Informacion", datos);
            DataTable Dt1 = Ds.Tables[0];
            DataTable Dt2 = Ds.Tables[1];
            DataTable Dt3 = Ds.Tables[2];
            DataTable Dt4 = Ds.Tables[3];
            //Response
            response["Efficiency"] = page.DataTableToMap(Dt1);
            response["QCOQty"] = page.DataTableToMap(Dt2);
            response["SPH"] = page.DataTableToMap(Dt3);
            response["TotalVolume"] = page.DataTableToMap(Dt4);

            return response;

        }

        //[WebMethod(EnableSession = true)]
        //[ScriptMethod]
        //static public Dictionary<string, object> GetInformacionArchivos(Dictionary<string, object> datos)
        //{
        //    var page = new logic.BasePage();
        //    var a = new logic_acces(ConexionDB);
        //    var response = new Dictionary<string, object>();
        //    DataTable Dt1 = a.ExecuteQuery("sp_FR_GetList_AlertaCalidadArchivos", datos).Tables[0];
        //    DataTable Dt2 = a.ExecuteQuery("sp_FR_GetList_AlertaCalidadArchivos", datos).Tables[1];
        //    //Response
        //    response["InformacionPrincipal"] = page.DataTableToMap(Dt1);
        //    response["Resultado"] = page.DataTableToMap(Dt2);

        //    return response;

        //}

        //[WebMethod(EnableSession = true)]
        //[ScriptMethod]
        //public static Dictionary<string, object> Guardar(Dictionary<string, object> datos)
        //{
        //    var page = new Inicio();
        //    var archivos = Utilities.StringToList(datos["detalle"]);
        //    var rutaArchivos = ConfigurationManager.AppSettings["CarpetaArchivos"] +
        //                           page.GetMessage("folderArchivos") + "/";

        //    var a = new logic_acces(ConexionDB);

        //    Utilities.DeleteFiles(rutaArchivos, 2);

        //    using (TransactionScope scope = new TransactionScope())
        //    {
        //        if (datos.ContainsKey("cve_alerta_calidad"))
        //        {
        //            a.ExecuteNonQuery("sp_FR_AlertaCalidadArchivos_I", datos);
        //        }

        //        foreach (var archivo in archivos)
        //        {
        //            if (!archivo.ContainsKey("cve"))
        //            {
        //                archivo["cve"] = 0;
        //            }
        //            archivo["Usuario"] = HttpContext.Current.Session["CveUsuario"].ToString();
        //            archivo["cve_alerta_calidad"] = datos["cve_alerta_calidad"];

        //            a.ExecuteNonQuery("sp_FR_AlertaCalidadArchivosDetalle_IU", archivo);

        //        }




        //        scope.Complete();
        //    }

        //    var response = new Dictionary<string, object>();
        //    DataTable Dt1 = a.ExecuteQuery("sp_FR_GetList_AlertaCalidad", datos).Tables[0];

        //    //Response
        //    response["InformacionPrincipal"] = page.DataTableToMap(Dt1);
        //    return response;
        //    //return datos;
        //}


        [WebMethod(EnableSession = true)]
        [ScriptMethod]
        public static Dictionary<string, object> Guardar(Dictionary<string, object> datos)
        {
            var page = new Inicio();
            var a = new logic_acces(ConexionDB);

           

            using (TransactionScope scope = new TransactionScope())
            {

                var efficiencies = Utilities.StringToList(datos["efficiency"]);

                foreach (var efficiency in efficiencies)
                {
                    if (efficiency.ContainsKey("Editable"))
                    {
                        if (Convert.ToBoolean(efficiency["Editable"]) == true)
                            a.ExecuteNonQuery("CP_Efficiency_IU", efficiency);
                    }

                }

                var qcoqties = Utilities.StringToList(datos["qcoqty"]);

                foreach (var qcoqty in qcoqties)
                {
                    if (qcoqty.ContainsKey("Editable"))
                    {
                        if (Convert.ToBoolean(qcoqty["Editable"]) == true)
                            a.ExecuteNonQuery("CP_QCOQty_IU", qcoqty);
                    }

                }

                var sphies = Utilities.StringToList(datos["sph"]);

                foreach (var sph in sphies)
                {
                    if (sph.ContainsKey("Editable"))
                    {
                        if (Convert.ToBoolean(sph["Editable"]) == true)
                            a.ExecuteNonQuery("CP_SPH_IU", sph);
                    }

                }

                var totalvolumenes = Utilities.StringToList(datos["totalvolume"]);

                foreach (var totalvolumen in totalvolumenes)
                {
                    if (totalvolumen.ContainsKey("Editable"))
                    {
                        if (Convert.ToBoolean(totalvolumen["Editable"]) == true)
                            a.ExecuteNonQuery("CP_TotalVolume_IU", totalvolumen);
                    }

                }

                scope.Complete();
            }

            var response = new Dictionary<string, object>();
            DataSet Ds = a.ExecuteQuery("CP_Informacion", datos);
            DataTable Dt1 = Ds.Tables[0];
            DataTable Dt2 = Ds.Tables[1];
            DataTable Dt3 = Ds.Tables[2];
            DataTable Dt4 = Ds.Tables[3];
            //Response
            response["Efficiency"] = page.DataTableToMap(Dt1);
            response["QCOQty"] = page.DataTableToMap(Dt2);
            response["SPH"] = page.DataTableToMap(Dt3);
            response["TotalVolume"] = page.DataTableToMap(Dt4);

            return response;

        }


        [WebMethod(EnableSession = true)]
        [ScriptMethod]
        static public Dictionary<string, object> Salir(Dictionary<string, string> datos)
        {
            var page = new logic.BasePage();
            var a = new logic_acces(ConfigurationManager.ConnectionStrings["ConexionDB"].ToString());
            var response = new Dictionary<string, object>();
            HttpContext.Current.Session.Abandon();
            response["Data"] = true;
            return response;
        }

        //[WebMethod(EnableSession = true)]
        //[ScriptMethod]
        //public static bool OpenDocumento(Dictionary<string, object> datos)
        //{
        //    if (datos["RutaArchivo"] != null)
        //    {
        //        var storage = new AlmacenamientoAzureServicio();
        //        var page = new Inicio();
        //        var rutaArchivos = ConfigurationManager.AppSettings["CarpetaArchivos"] +
        //            page.GetMessage("folderArchivos") + "/" + datos["RutaArchivo"];

        //        var bytes = storage.ObtenerArchivo(rutaArchivos);
        //        var extension = Path.GetExtension(datos["RutaArchivo"].ToString()).Substring(1);
        //        page.Session["ArchivoADescargar"] = new AnexoInfo(datos["NombreArchivoNuevo"].ToString(), "application/octet-stream", bytes, extension);
        //        return true;
        //    }
        //    return true;
        //}




    }
}