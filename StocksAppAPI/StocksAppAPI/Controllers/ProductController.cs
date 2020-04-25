using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using StocksAPI.Data;
using StocksAPI.Data.Custom;
using StocksApp.Utilities.Logging;

namespace StocksAppAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private AppDbContext _db;
        private Logger _logger;

        public ProductController(AppDbContext db, Logger logger)
        {
            _db = db;
            _logger = logger;
        }

        [HttpPost("Add")]
        public async Task<IActionResult> Create(ProductModel data)
        {
            try
            {
                long productId = 0;
                var prodcodelower = data.Barcode.ToLower();
                if (_db.Product.Any(d => d.Barcode.ToLower() == prodcodelower && d.Active == true))
                {
                    var entity = _db.Product.FirstOrDefault(d => d.Barcode.ToLower() == prodcodelower && d.Active == true);
                    entity.Name = data.Name;
                    entity.CategoryId = data.CategoryId;
                    entity.TypeId = data.TypeId;
                    entity.Description = data.Description;
                    entity.Cost = data.Cost;
                    entity.Price = data.Price;
                    entity.Quantity += data.Quantity;
                    productId = entity.ProductId;
                }
                else
                {
                    var entity = new Product
                    {
                        Name = data.Name,
                        CategoryId = data.CategoryId,
                        TypeId = data.TypeId,
                        Description = data.Description,
                        Cost = data.Cost,
                        Price = data.Price,
                        Quantity = data.Quantity,
                        Barcode = data.Barcode,
                        Active = true
                    };
                    await _db.Product.AddAsync(entity);
                    await _db.SaveChangesAsync();
                    productId = entity.ProductId;
                }
                var activityLog = new InventoryActivityLog
                {
                    InventoryActionId = 1,
                    CreatedAt = DateTime.Now,
                    TotalAmount = data.Quantity * data.Cost,
                    Quantity = data.Quantity,
                    ProductId = productId
                };
                _db.InventoryActivityLog.Add(activityLog);
                await _db.SaveChangesAsync();
                return Ok(new { Success = true });
            }
            catch (Exception e)
            {
                _logger.logError(e);
            }
            return Ok(new { Success = false });
        }

        [HttpPost("Update")]
        public async Task<IActionResult> Edit(ProductModel data)
        {
            try
            {
                data.Description = string.IsNullOrWhiteSpace(data.Description) ? "" : data.Description;
                var entity = _db.Product.FirstOrDefault(d => d.ProductId == data.Id && d.Active == true);
                entity.Name = data.Name;
                entity.CategoryId = data.CategoryId;
                entity.TypeId = data.TypeId;
                entity.Description = data.Description;
                entity.Price = data.Price;
                await _db.SaveChangesAsync();
                return Ok(new { Success = true });
            }
            catch (Exception e)
            {
                _logger.logError(e);
            }
            return Ok(new { Success = false });
        }

        [HttpDelete("Delete/{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                var entity = _db.Product.FirstOrDefault(d => d.ProductId == id);
                entity.Active = false;
                await _db.SaveChangesAsync();
                return Ok(new { Success = true });
            }
            catch (Exception e)
            {
                _logger.logError(e);
            }
            return Ok(new { Success = false });
        }

        [HttpGet("Index")]
        public async Task<IActionResult> Get()
        {
            try
            {
                var data = _db.Product.Include(p => p.Category)
                    .Include(p => p.Type).Include(p => p.Manufacturer)
                    .Where(d => d.Active == true)
                    .Select(d => new ProductModel(d))
                    .ToList();
                return Ok(new { Success = true, Data = data });
            }
            catch (Exception e)
            {
                _logger.logError(e);
            }
            return Ok(new { Success = false, Data = new List<object>() });
        }

        [HttpPost("SearchByCode")]
        public IActionResult SearchByCode([FromBody]string code)
        {
            try
            {
                code = code.Trim();
                var entity = _db.Product
                    .Include(p => p.Type).Include(p => p.Manufacturer).Include(p => p.Category)
                    .FirstOrDefault(d => d.Barcode == code);
                return (entity == null) ? Ok(new { Success = false }) : Ok(new { Success = true, Data = new ProductModel(entity) });
            }
            catch (Exception e)
            {
                _logger.logError(e);
            }
            return Ok(new { Success = false });
        }

        [HttpGet("SearchById/{id}")]
        public IActionResult SearchById(long id)
        {
            try
            {
                var entity = _db.Product
                    .Include(p => p.Type).Include(p => p.Manufacturer).Include(p => p.Category)
                    .FirstOrDefault(d => d.ProductId == id);
                return (entity == null) ? Ok(new { Success = false }) : Ok(new { Success = true, Data = new ProductModel(entity) });
            }
            catch (Exception e)
            {
                _logger.logError(e);
            }
            return Ok(new { Success = false });
        }

        [HttpPost("Search")]
        public IActionResult Search(SearchProductModel form)
      {
            try
            {
                form.code = form.code.ToLower().Trim() ?? "";
                form.name = form.name.ToLower().Trim() ?? "";
                var data = _db.Product
                    .Include(p => p.Type).Include(p => p.Manufacturer).Include(p=>p.Category)
                    .Where(d => d.Barcode.ToLower().Contains(form.code) && d.Name.ToLower().Contains(form.name))
                    .Select(d => new ProductModel(d));
                return Ok(new { Success = true, Data = data });
            }
            catch (Exception e)
            {
                _logger.logError(e);
            }
            return Ok(new { Success = false });
        }
    }
}