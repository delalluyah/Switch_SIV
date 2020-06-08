using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace StocksAPI.Data.Custom
{
    public class SalesRecordModel
    {
        public SalesRecordModel(SalesRecord sale)
        {
            Id = sale.SalesRecordId;
            ReceiptNumber = sale.ReceiptNumber;
            Date = sale.Date;
            SalesPerson = sale.SalesPersonName;
            GrandTotal = sale.GrandTotal;
            AmountPaid = sale.AmountPaid;
            Balance = sale.Balance;
            Products = sale.SalesRecordItem != null && sale.SalesRecordItem.Count > 0 ?
                sale.SalesRecordItem.Select(p => new SalesRecordItemModel(p)).ToList() : new List<SalesRecordItemModel>();
        }
        public long Id { get; set; }
        public string ReceiptNumber { get; set; }
        public DateTime Date { get; set; }
        public string DateStr
        {
            get
            { return Date.ToString("MMM-dd-yyyy"); }
        }
        public string SalesPerson { get; set; }
        public double GrandTotal { get; set; }
        public double AmountPaid { get; set; }
        public double Balance { get; set; }
        public List<SalesRecordItemModel> Products { get; set; } = new List<SalesRecordItemModel>();

        public SalesRecordModel()
        {

        }

        public SalesRecord ToSalesRecord()
        {
            return new SalesRecord
            {
                SalesRecordId = Id,
                SalesPersonName = SalesPerson,
                ReceiptNumber = ReceiptNumber,
                Date = Date,
                GrandTotal = GrandTotal,
                AmountPaid = AmountPaid,
                Balance = Balance
            };
        }

    }

    public class SalesRecordItemModel
    {
        public SalesRecordItemModel()
        {

        }
        public SalesRecordItemModel(SalesRecordItem item)
        {
            Id = item.SalesRecordItemId;
            SalesRecordId = item.SalesRecordId;
            ProductName = item.ProductName;
            Quantity = item.Quantity;
            SaleType = item.SaleType;
            SingleItemAmount = item.SingleItemAmount;
            TotalAmount = item.TotalAmount;
        }
        public long Id { get; set; }
        public long ProductId { get; set; }
        public int SaleTypeId { get; set; }
        public long SalesRecordId { get; set; }
        public string ProductName { get; set; }
        public int Quantity { get; set; }
        public string SaleType { get; set; }
        public double SingleItemAmount { get; set; }
        public double TotalAmount { get; set; }

        public SalesRecordItem ToSalesRecordItem()
        {
            return new SalesRecordItem
            {
                SalesRecordItemId = Id,
                SalesRecordId = SalesRecordId,
                ProductName = ProductName,
                SaleType = SaleType,
                Quantity = Quantity,
                SingleItemAmount = SingleItemAmount,
                TotalAmount = TotalAmount
            };
        }
    }
}
