using System;
using System.Collections.Generic;

namespace StocksAPI.Data
{
    public partial class InventoryAction
    {
        public InventoryAction()
        {
            InventoryActivityLog = new HashSet<InventoryActivityLog>();
        }

        public int InventoryActionId { get; set; }
        public string Name { get; set; }

        public virtual ICollection<InventoryActivityLog> InventoryActivityLog { get; set; }
    }
}
