using System;
using System.Collections.Generic;
using System.Text;

namespace StocksAPI.Data.Custom
{
    public class DashboardSummary
    {
        public long TotalProducts { get; set; }
        public double TotalCost { get; set; }
        public double TotalPrice { get; set; }
        public TimeSummary Weekly { get; set; } = new TimeSummary();
        public TimeSummary Monthly { get; set; } = new TimeSummary();
        public TimeSummary Annual { get; set; } = new TimeSummary();
    }

    public class TimeSummary{
        public long ProductsAdded { get; set; }
        public long QuantityAdded { get; set; }
        public double Amount { get; set; }
    }
}
