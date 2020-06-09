using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using StocksAPI.Data;
using StocksApp.Utilities.Logging;

namespace StocksAppAPI.Controllers
{
    [Route("api/[controller]")]
    [Authorize(Roles ="Administrator")]
    [ApiController]
    public class RoleController : ControllerBase
    {
             private AppDbContext _db;
        private Logger _logger;

        public RoleController(AppDbContext db, Logger logger)
        {
            _db = db;
            _logger = logger;
        }


        [HttpGet("Index")]
        public async Task<IActionResult> Get()
        {

            try
            {
                var data = _db.Role.ToList();
                return Ok(new { Success = true, Data = data });
            }
            catch (Exception e)
            {
                _logger.logError(e);
            }
            return BadRequest(new { Success = false, Data = new List<object>() });
        }
    }
}