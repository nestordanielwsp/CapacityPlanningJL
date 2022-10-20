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
    public partial class MainSheet : BasePage
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            this.LoadJs("LoggeadoInfo", "false");
            this.LoadJs("EsAprobadorInfo", "false");
            this.LoadJs("EsCapturaInfo", "false");
            if (HttpContext.Current.Session["UsuarioId"] != null)
            {
                this.LoadJs("UsuarioIdInfo", HttpContext.Current.Session["UsuarioId"].ToString());

                if (HttpContext.Current.Session["UsuarioId"].ToString() == "2")
                {
                    this.LoadJs("EsAprobadorInfo", "true");
                    this.LoadJs("LoggeadoInfo", "true");
                }

                if (HttpContext.Current.Session["UsuarioId"].ToString() == "1")
                {
                    this.LoadJs("EsCapturaInfo", "true");
                    this.LoadJs("LoggeadoInfo", "true");
                }
            }
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod]
        static public Dictionary<string, object> GetInformacion(Dictionary<string, object> datos)
        {
            var page = new logic.BasePage();
            var a = new logic_acces(ConexionDB);
            var response = new Dictionary<string, object>();
            DataTable Dt0 = a.ExecuteQuery("CP_GetMainSheet ", datos).Tables[0];
            DataTable Dt1 = a.ExecuteQuery("CP_GetMainSheet ", datos).Tables[1];
            DataTable Dt2 = a.ExecuteQuery("CP_GetMainSheet ", datos).Tables[2];
            DataTable Dt3 = a.ExecuteQuery("CP_GetMainSheet ", datos).Tables[3];
            DataTable Dt4 = a.ExecuteQuery("CP_GetMainSheet ", datos).Tables[4];
            DataTable Dt5 = a.ExecuteQuery("CP_GetMainSheet ", datos).Tables[5];
            DataTable Dt6 = a.ExecuteQuery("CP_GetMainSheet ", datos).Tables[6];
            DataTable Dt7 = a.ExecuteQuery("CP_GetMainSheet ", datos).Tables[7];
            DataTable Dt8 = a.ExecuteQuery("CP_GetMainSheet ", datos).Tables[8];
            DataTable Dt9 = a.ExecuteQuery("CP_GetMainSheet ", datos).Tables[9];
            DataTable Dt10 = a.ExecuteQuery("CP_GetMainSheet ", datos).Tables[10];
          

            //Response
            response["Encabezado"] = page.DataTableToMap(Dt0);
            response["JPH"] = page.DataTableToMap(Dt1);
            response["Efficiency"] = page.DataTableToMap(Dt2);
            response["NetJPH"] = page.DataTableToMap(Dt3);
            response["Years"] = page.DataTableToMap(Dt4);
            response["QCOQty"] = page.DataTableToMap(Dt5);
            response["QCOHrs"] = page.DataTableToMap(Dt6);
            response["TotalTime"] = page.DataTableToMap(Dt7);
            response["Stokes"] = page.DataTableToMap(Dt8);
            response["TotalVolume"] = page.DataTableToMap(Dt9);
            response["Utilizacion"] = page.DataTableToMap(Dt10);
         

            return response;

        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod]
        static public Dictionary<string, object> GetInformacionMensual(Dictionary<string, object> datos)
        {
            var page = new logic.BasePage();
            var a = new logic_acces(ConexionDB);
            var response = new Dictionary<string, object>();
            DataTable Dt1 = a.ExecuteQuery("CP_GetTeoricovsRealMensual ", datos).Tables[0];
            DataTable Dt2 = a.ExecuteQuery("CP_GetTeoricovsRealMensual ", datos).Tables[1];
            DataTable Dt3 = a.ExecuteQuery("CP_GetTeoricovsRealMensual ", datos).Tables[2];
            //Response
            response["Grafica1"] = page.DataTableToMap(Dt1);
            response["Grafica2"] = page.DataTableToMap(Dt2);
            response["Grafica3"] = page.DataTableToMap(Dt3);

            return response;

        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod]
        static public Dictionary<string, object> GetInformacionSemanal(Dictionary<string, object> datos)
        {
            var page = new logic.BasePage();
            var a = new logic_acces(ConexionDB);
            var response = new Dictionary<string, object>();
            DataTable Dt1 = a.ExecuteQuery("CP_GetTeoricovsRealSemanal ", datos).Tables[0];
            DataTable Dt2 = a.ExecuteQuery("CP_GetTeoricovsRealSemanal ", datos).Tables[1];
            DataTable Dt3 = a.ExecuteQuery("CP_GetTeoricovsRealSemanal ", datos).Tables[2];
            //Response
            response["Grafica1"] = page.DataTableToMap(Dt1);
            response["Grafica2"] = page.DataTableToMap(Dt2);
            response["Grafica3"] = page.DataTableToMap(Dt3);

            return response;

        }
    }
}