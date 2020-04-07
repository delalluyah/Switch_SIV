using System;
using System.Collections.Generic;

namespace StocksAPI.Data
{
    public partial class RefreshToken
    {
        public long Id { get; set; }
        public string Token { get; set; }
        public string JwtId { get; set; }
        public DateTime CreationDate { get; set; }
        public DateTime ExpirationDate { get; set; }
        public bool? Used { get; set; }
        public bool? Invalidated { get; set; }
        public int UserId { get; set; }

        public virtual User User { get; set; }
    }
}
