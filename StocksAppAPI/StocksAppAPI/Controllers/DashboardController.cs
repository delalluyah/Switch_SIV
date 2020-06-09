using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using StocksAPI.Data;
using StocksApp.Utilities;
using StocksApp.Utilities.Logging;

namespace StocksAppAPI.Controllers
{
    [Route("api/[controller]")]
    [Authorize(Roles ="Administrator")]
    [ApiController]
    public class DashboardController : ControllerBase
    {
        private AppDbContext _db;
        private Logger _logger;
        private DbHelper _helper;

        public DashboardController(AppDbContext db, Logger logger,DbHelper helper)
        {
            _db = db;
            _logger = logger;
            _helper = helper;
        }

        [HttpGet("GetSummary")]
        public async Task<IActionResult> GetSummary()
        {
            try
            {
                var data = await _helper.GetDashboardSummary();
                return Ok(new { Success = true, Data = data });
            }
            catch (Exception e)
            {
                _logger.logError(e);
                return Ok(new{ Success=false});
            }
        }

    }
}