using System;
using System.Collections.Generic;

namespace StocksAPI.Data
{
    public partial class Product
    {
        public Product()
        {
            InventoryActivityLog = new HashSet<InventoryActivityLog>();
        }

        public long ProductId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public double Cost { get; set; }
        public double UnitPrice { get; set; }
        public int? CategoryId { get; set; }
        public int? TypeId { get; set; }
        public int? ManufacturerId { get; set; }
        public int Quantity { get; set; }
        public bool? Active { get; set; }
        public string Barcode { get; set; }
        public double BulkPrice { get; set; }
        public int BulkUnits { get; set; }

        public virtual ProductCategory Category { get; set; }
        public virtual ProductManufacturer Manufacturer { get; set; }
        public virtual ProductType Type { get; set; }
        public virtual ICollection<InventoryActivityLog> InventoryActivityLog { get; set; }
    }
}
