using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using Microsoft.EntityFrameworkCore;
using StocksAPI.Data;
using StocksAPI.Data.Custom;
using StocksApp.Utilities.Logging;

namespace StocksAppAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SalesController : ControllerBase
    {
        private AppDbContext _db;
        private Logger _logger;

        public SalesController(AppDbContext db, Logger logger)
        {
            _db = db;
            _logger = logger;
        }

        [HttpPost("RecordSales")]
        public async Task<IActionResult> RecordSales(SalesRecordModel data)
        {
            try
            {
                var salesHistory = new List<InventoryActivityLog>();
                if (data != null && data.Products != null)
                {
                    foreach (var item in data.Products)
                    {
                        var qty = item.Quantity;
                        var product = _db.Product.FirstOrDefault(pr => pr.ProductId == item.ProductId);
                        if (item.SaleTypeId == SalesTypes.BulkPurchase)
                            qty = product.BulkUnits * item.Quantity;

                        if (product.Quantity < item.Quantity)
                        {
                            return Ok(new { success = false, errors = new List<string> { $"Selected Quantity for {item.ProductName} is more than available amount" } });
                        }
                        product.Quantity -= qty;

                        var activityLog = new InventoryActivityLog
                        {
                            Quantity = item.Quantity,
                            ProductId = item.ProductId,
                            InventoryActionId = InventoryActionType.Purchase,
                            CreatedAt = DateTime.Now,
                            TotalAmount = item.TotalAmount
                        };
                        salesHistory.Add(activityLog);
                    };
                    salesHistory.ForEach(s =>
                    {
                        _db.InventoryActivityLog.Add(s);
                    });
                    //save sales record HERE
                    var record = data.ToSalesRecord();
                    var items = data.Products.Select(p => p.ToSalesRecordItem()).ToList();

                    _db.SalesRecord.Add(record);
                    await _db.SaveChangesAsync();

                    items.ForEach(i =>
                    {
                        i.SalesRecordId = record.SalesRecordId;
                        _db.SalesRecordItem.Add(i);
                    });
                    await _db.SaveChangesAsync();
                    return Ok(new { success = true });
                }
            }
            catch (Exception e)
            {
                _logger.logError(e);
            }
            return Ok(new { success = false, errors = new List<string> { $"Sorry, an error occured, please try again" } });
        }

        [HttpGet("SalesRecords")]
        public async Task<IActionResult> SalesRecords()
        {
            try
            {
                var data = await _db.SalesRecord.Include(r => r.SalesRecordItem)
                    .Select(r => new SalesRecordModel(r)).ToListAsync();
                return Ok(new { success = true, data });
            }
            catch (Exception e)
            {
                _logger.logError(e);
            }
            return Ok(new { success = false, errors = new List<string> { $"Sorry, an error occured, please try again" } });
        }

        [HttpPost("SalesRecordsByDate")]
        public async Task<IActionResult> SalesRecordsByDateRange(DateRange dateRange)
        {
            try
            {
                var data = await _db.SalesRecord.Include(r => r.SalesRecordItem)
                    .Where(d => d.Date >= dateRange.StartDate && d.Date <= dateRange.EndDate)
                    .Select(r => new SalesRecordModel(r)).ToListAsync();
                return Ok(new { success = true, data });
            }
            catch (Exception e)
            {
                _logger.logError(e);
            }
            return Ok(new { success = false, errors = new List<string> { $"Sorry, an error occured, please try again" } });
        }

        [HttpGet("SalesRecordsById/{id}")]
        public async Task<IActionResult> SalesRecordsById(long id)
        {
            try
            {
                var data = new SalesRecordModel(await _db.SalesRecord.Include(r => r.SalesRecordItem)
                    .FirstOrDefaultAsync(x => x.SalesRecordId == id));
                return Ok(new { success = true, data });
            }
            catch (Exception e)
            {
                _logger.logError(e);
            }
            return Ok(new { success = false, errors = new List<string> { $"Sorry, an error occured, please try again" } });
        }

    }
}