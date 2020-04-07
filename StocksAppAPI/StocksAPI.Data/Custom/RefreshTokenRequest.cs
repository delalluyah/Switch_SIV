using System;
using System.Collections.Generic;
using System.Text;

namespace StocksAPI.Data.Custom
{
    public class RefreshTokenRequest
    {
        public string Token { get; set; }
        public string RefreshToken { get; set; }
    }
}
