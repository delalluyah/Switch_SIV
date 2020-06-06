using System;
using System.Collections.Generic;

namespace StocksAPI.Data
{
    public partial class SalesRecordItem
    {
        public long SalesRecordItemId { get; set; }
        public long SalesRecordId { get; set; }
        public string ProductName { get; set; }
        public int Quantity { get; set; }
        public string SaleType { get; set; }
        public double SingleItemAmount { get; set; }
        public double TotalAmount { get; set; }

        public virtual SalesRecord SalesRecord { get; set; }
    }
}
