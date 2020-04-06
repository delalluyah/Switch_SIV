﻿using System;
using System.Collections.Generic;

namespace StocksAPI.Data
{
    public partial class ProductType
    {
        public ProductType()
        {
            Product = new HashSet<Product>();
        }

        public int ProductTypeId { get; set; }
        public string Name { get; set; }
        public bool? Active { get; set; }

        public virtual ICollection<Product> Product { get; set; }
    }
}
