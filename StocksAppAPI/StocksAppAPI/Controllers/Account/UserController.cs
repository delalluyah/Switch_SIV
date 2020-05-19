using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StocksAPI.Data;
using StocksAPI.Data.Custom;
using StocksApp.Utilities.Logging;
using StocksApp.Utilities.Security;

namespace StocksAppAPI.Controllers.Account
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private AppDbContext _db;
        private Logger _logger;
        private PasswordHasher _hasher;

        public UserController(AppDbContext db, Logger logger)
        {
            _db = db;
            _logger = logger;
            _hasher = new PasswordHasher();
        }

        [HttpPost("Update")]
        public async Task<IActionResult> Edit(UserModel user)
        {
            try
            {
                var usernamelower = user.Username.ToLower();
                if (_db.User.Any(d => d.Username.ToLower() == usernamelower && d.UserId != user.Id))
                    return BadRequest(new { Success = false, Error = "A record with this name already exists" });

                var entity = _db.User.FirstOrDefault(d => d.UserId == user.Id);
                entity.Fullname = user.Fullname;
                if (!string.IsNullOrWhiteSpace(user.Password))
                    entity.Password = _hasher.GenerateIdentityV3Hash(user.Password);
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
                var data = _db.User.Include(d => d.Role).ToList().Select(d => new UserModel(d));
                return Ok(new { Success = true, Data = data });
            }
            catch (Exception e)
            {
                _logger.logError(e);
            }
            return BadRequest(new { Success = false, Data = new List<object>() });
        }

        [HttpGet("GetById/{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            try
            {
                var entity = _db.User.Include(d => d.Role).FirstOrDefault(d => d.UserId == id);
                var data = new UserModel(entity);
                data.Password = "";

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