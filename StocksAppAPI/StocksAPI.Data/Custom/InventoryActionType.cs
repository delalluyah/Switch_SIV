using System;
using System.Collections.Generic;
using System.Text;

namespace StocksAPI.Data.Custom
{
    public static class InventoryActionType
    {
        public static int StockIn { get; set; } = 1;
        public static int Purchase { get; set; } = 2;
    }
}
