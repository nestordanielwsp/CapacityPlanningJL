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
    public partial class Dashboard : BasePage
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
            DataTable Dt1 = a.ExecuteQuery("CP_GetTeoricovsRealAnual ", datos).Tables[0];
            DataTable Dt2 = a.ExecuteQuery("CP_GetTeoricovsRealAnual ", datos).Tables[1];
            DataTable Dt3 = a.ExecuteQuery("CP_GetTeoricovsRealAnual ", datos).Tables[2];
            //Response
            response["Grafica1"] = page.DataTableToMap(Dt1);
            response["Grafica2"] = page.DataTableToMap(Dt2);
            response["Grafica3"] = page.DataTableToMap(Dt3);

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