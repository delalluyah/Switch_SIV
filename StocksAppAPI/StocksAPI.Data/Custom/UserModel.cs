using System;
using System.Collections.Generic;
using System.Text;

namespace StocksAPI.Data.Custom
{
    public class UserModel
    {
        public UserModel()
        {

        }
        public UserModel(User user)
        {
            Id = user.UserId;
            Fullname = user.Fullname;
            Username = user.Username;
            Password = user.Password;
            RoleId = user.RoleId;
            RoleName = user?.Role?.Name ?? "";
        }
        public int Id { get; set; }
        public string Fullname { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public int RoleId { get; set; }
        public string RoleName { get; set; }
    }
}
