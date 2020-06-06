using System;
using System.Collections.Generic;

namespace StocksAPI.Data
{
    public partial class SalesRecord
    {
        public SalesRecord()
        {
            SalesRecordItem = new HashSet<SalesRecordItem>();
        }

        public long SalesRecordId { get; set; }
        public string ReceiptNumber { get; set; }
        public DateTime Date { get; set; }
        public string SalesPersonName { get; set; }
        public double GrandTotal { get; set; }
        public double AmountPaid { get; set; }
        public double Balance { get; set; }

        public virtual ICollection<SalesRecordItem> SalesRecordItem { get; set; }
    }
}
