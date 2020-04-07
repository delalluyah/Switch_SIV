using System;
using System.Collections.Generic;

namespace StocksAPI.Data
{
    public partial class User
    {
        public User()
        {
            RefreshToken = new HashSet<RefreshToken>();
        }

        public int UserId { get; set; }
        public string Fullname { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public int RoleId { get; set; }

        public virtual Role Role { get; set; }
        public virtual ICollection<RefreshToken> RefreshToken { get; set; }
    }
}
