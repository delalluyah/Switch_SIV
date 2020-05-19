using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
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
        public async Task<IActionResult> RecordSales(RecordSalesModel data)
        {
            try
            {
                var salesHistory = new List<InventoryActivityLog>();
                if (data != null && data.Products != null)
                {
                    foreach (var item in data.Products)
                    {
                        var product = _db.Product.FirstOrDefault(pr => pr.ProductId == item.Id);
                        if (product.Quantity < item.Quantity)
                        {
                            return Ok(new { success = false, errors = new List<string> { $"Selected Quantity for {item.Name} is more than available amount" } });
                        }
                        product.Quantity = product.Quantity - item.Quantity;
                        var activityLog = new InventoryActivityLog
                        {
                            Quantity = item.Quantity,
                            ProductId = item.Id,
                            InventoryActionId = (int)InventoryActionType.Purchase,
                            CreatedAt = DateTime.Now,
                           // TotalAmount = item.Quantity * item.Price
                        };
                        salesHistory.Add(activityLog);
                    };
                    salesHistory.ForEach(s=>
                    {
                        _db.InventoryActivityLog.Add(s);
                    });
                    await _db.SaveChangesAsync();
                    return Ok(new { success = true });
                }
            }
            catch (Exception e)
            {
                _logger.logError(e);
            }
            return Ok(new { success = false , errors = new List<string> { $"Sorry, an error occured, please try again" } });
        }
    }
}