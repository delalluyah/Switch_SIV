using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using StocksAPI.Data;
using StocksApp.Utilities.Logging;

namespace StocksAppAPI.Controllers.Account
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private AppDbContext _db;
        private Logger _logger;

        public UserController(AppDbContext db, Logger logger)
        {
            _db = db;
            _logger = logger;
        }

        [HttpPost("Add")]
        public async Task<IActionResult> Create(User user)
        {
            try
            {
                var usernamelower = user.Username.ToLower();

                if (_db.User.Any(d => d.Username.ToLower() == usernamelower))
                    return BadRequest(new { Success = false, Error = "A User with this username already exists" });
                _db.User.Add(user);
                await _db.SaveChangesAsync();
                return Ok(new { Success = true });
            }
            catch (Exception e)
            {
                _logger.logError(e);
            }
            return BadRequest(new { Success = false });
        }

        [HttpPost("Update")]
        public async Task<IActionResult> Edit(User user)
        {
            try
            {
                var usernamelower = user.Username.ToLower();
                if (_db.User.Any(d => d.Username.ToLower() == usernamelower && d.UserId != user.UserId))
                    return BadRequest(new { Success = false, Error = "A record with this name already exists" });

                var entity = _db.User.FirstOrDefault(d => d.UserId == user.UserId);
                entity.Fullname = user.Fullname;
                entity.Password = user.Password;
                entity.Username = user.Username;
                entity.RoleId = user.RoleId;
                await _db.SaveChangesAsync();
                return Ok(new { Success = true });
            }
            catch (Exception e)
            {
                _logger.logError(e);
            }
            return BadRequest(new { Success = false });
        }

        [HttpDelete("Delete/{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                var entity = _db.User.FirstOrDefault(d => d.UserId == id);
                _db.User.Remove(entity);
                await _db.SaveChangesAsync();
                return Ok(new { Success = true });
            }
            catch (Exception e)
            {
                _logger.logError(e);
            }
            return BadRequest(new { Success = false });
        }

        [HttpGet("Index")]
        public async Task<IActionResult> Get()
        {
            try
            {
                var data = _db.User.ToList();
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