using System;
using System.Collections.Generic;
using System.Text;

namespace StocksAPI.Data.Custom
{
    public class ProductModel
    {
        public ProductModel()
        {

        }
        public ProductModel(Product product)
        {
            Id = product.ProductId;
            Name = product.Name;
            Description = product.Description;
            Cost = product.Cost;
            UnitPrice = product.UnitPrice;
            BulkPrice = product.BulkPrice;
            BulkUnits = product.BulkUnits;
            CategoryId = (int)product.CategoryId;
            TypeId = (int)product.TypeId;
            TypeName = product.Type?.Name ?? "";
            CategoryName = product.Category?.Name ?? "";
            ManufacturerId = product.ManufacturerId ?? 0;
            Quantity = product.Quantity;
            Active = product.Active ?? false;
            Barcode = product.Barcode;
        }

        public long Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public double Cost { get; set; }
        public double UnitPrice { get; set; }
        public double BulkPrice { get; set; }
        public int  BulkUnits { get; set; }
        public int CategoryId { get; set; }
        public string CategoryName { get; set; }
        public int TypeId { get; set; }
        public string TypeName { get; set; }
        public int ManufacturerId { get; set; }
        public int Quantity { get; set; }
        public bool Active { get; set; }
        public string Barcode { get; set; }

        public int BulkQuantity { get { return Quantity / BulkUnits; }}
    }
}
