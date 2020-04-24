using System;
using System.Collections.Generic;

namespace StocksAPI.Data
{
    public partial class InventoryActivityLog
    {
        public long ActivityLogId { get; set; }
        public int InventoryActionId { get; set; }
        public long? ProductId { get; set; }
        public int? Quantity { get; set; }
        public DateTime? CreatedAt { get; set; }
        public double? TotalAmount { get; set; }

        public virtual InventoryAction InventoryAction { get; set; }
        public virtual Product Product { get; set; }
    }
}
