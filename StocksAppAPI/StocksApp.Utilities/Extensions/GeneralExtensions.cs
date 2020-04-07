using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace StocksApp.Utilities.Extensions
{
    public static class GeneralExtensions
    {
        public static string GetUserId(this HttpContext httpContext)
        {
            if(httpContext.User == null || !httpContext.User.Claims.Any(x=>x.Type == "Id"))
            {
                return string.Empty;
            }
            return httpContext.User.Claims.Single(x => x.Type == "Id").Value;
        }
    }
}
