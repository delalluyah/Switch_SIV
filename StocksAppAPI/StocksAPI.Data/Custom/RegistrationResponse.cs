using System;
using System.Collections.Generic;
using System.Text;

namespace StocksAPI.Data.Custom
{
    public class RegistrationResponse
    {
        public bool Success { get; set; }
        public string Token { get; set; }
        public string RefreshToken { get; set; }
        public RegisterErrors Errors { get; set; }
    }

    public class RegisterErrors
    {
        public string FullName { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string RoleId { get; set; }
    }
}
