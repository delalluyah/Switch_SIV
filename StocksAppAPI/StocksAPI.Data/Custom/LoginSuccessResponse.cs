using System;
using System.Collections.Generic;
using System.Text;

namespace StocksAPI.Data.Custom
{
    public class LoginResponse
    {
        public bool Success { get; set; }
        public string Token { get; set; }
        public LoginErrors Errors { get; set; }
    }
    public class LoginErrors
    {
        public string Username { get; set; }
        public string Password { get; set; }
    }
}
