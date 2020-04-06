using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace StocksAppAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        [HttpGet("Index")]
        public IActionResult Index()
        {
            return Ok(new { state="Uppity"});
        }

        [HttpGet]
        public IActionResult Logout()
        {
            return Ok("Logout");
        }

        [HttpPost]
        public IActionResult Register()
        {
            return Ok("Register");
        }

        [HttpPost]
        public IActionResult Login()
        {
            return Ok("Login");
        }

    }
}