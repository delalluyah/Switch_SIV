using System;
using System.Collections.Generic;

namespace StocksAPI.Data
{
    public partial class ProductManufacturer
    {
        public ProductManufacturer()
        {
            Product = new HashSet<Product>();
        }

        public int ProductManufacturerId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string ContactEmail { get; set; }
        public string ContactPhone { get; set; }
        public bool? Active { get; set; }

        public virtual ICollection<Product> Product { get; set; }
    }
}
