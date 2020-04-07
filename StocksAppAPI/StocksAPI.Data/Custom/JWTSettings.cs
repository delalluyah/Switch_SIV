using System;
using System.Collections.Generic;
using System.Text;

namespace StocksAPI.Data.Custom
{
    public class JWTSettings
    {
        public string Secret { get; set; }
        public TimeSpan TokenLifetime { get; set; }
    }
}
