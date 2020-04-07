using Microsoft.IdentityModel.Tokens;
using StocksAPI.Data;
using StocksAPI.Data.Custom;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace StocksApp.Utilities.Services
{
    public interface IIdentityService
    {
        Task<RegistrationResponse> RegisterAsync(string fullName, string username, string password,int roleid);
        string GenerateToken(User user);
        Task<LoginResponse> LoginAsync(string username, string password);
    }
}
