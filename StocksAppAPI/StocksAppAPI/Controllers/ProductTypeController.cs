using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using StocksAPI.Data;
using StocksApp.Utilities.Logging;

namespace StocksAppAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductTypeController : ControllerBase
    {
        private AppDbContext _db;
        private Logger _logger;

        public ProductTypeController(AppDbContext db, Logger logger)
        {
            _db = db;
            _logger = logger;
        }

        [HttpPost("Add")]
        public async Task<IActionResult> Create(ProductType data)
        {
            try
            {
                var prodnamelower = data.Name.ToLower();
                if (_db.ProductType.Any(d => d.Name.ToLower() == prodnamelower && d.Active == true))
                    return Ok(new { Success = false, Error = "A record with this name already exists" });
                _db.ProductType.Add(data);
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
        public async Task<IActionResult> Edit(ProductType data)
        {
            try
            {
                var prodnamelower = data.Name.ToLower();
                if (_db.ProductType.Any(d => d.Name.ToLower() == prodnamelower && d.ProductTypeId != data.ProductTypeId && d.Active == true))
                    return Ok(new { Success = false, Error = "A record with this name already exists" });

                var entity = _db.ProductType.FirstOrDefault(d => d.ProductTypeId == data.ProductTypeId);
                entity.Name = data.Name;
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
                var entity = _db.ProductType.FirstOrDefault(d => d.ProductTypeId == id);
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
                var data = _db.ProductType.Where(d => d.Active == true).ToList();
                return Ok(new { Success = true, Data = data });
            }
            catch (Exception e)
            {
                _logger.logError(e);
            }
            return Ok(new { Success = false, Data = new List<object>() });
        }
    }
}
