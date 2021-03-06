using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using StocksAPI.Data.Custom;
using StocksApp.Utilities.Extensions;
using StocksApp.Utilities.Logging;
using StocksApp.Utilities.Services;


namespace StocksAppAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private IIdentityService _identityService;
        private Logger _logger;

        public AuthController(IIdentityService identityService, Logger logger)
        {
            _identityService = identityService;
            _logger = logger;
        }

        [Authorize]
        [HttpGet("Index")]
        public IActionResult Index()
        {
            var userId = HttpContext.GetUserId();
            return Ok(new { msg = $"Hello User {userId}!" });
        }

        [HttpGet("Logout")]
        public IActionResult Logout()
        {
            return Ok("Logout");
        }

        [HttpPost("Register")]
        public async Task<IActionResult> Register(RegisterRequestModel request)
        {
            try
            {
                var authResponse = await _identityService.RegisterAsync(request.FullName, request.Username, request.Password, request.RoleId);
                return Ok(authResponse);
            }
            catch (Exception e)
            {
                _logger.logError(e);
                return BadRequest(new RegistrationResponse
                {
                    Success = false,
                    Errors = new List<string>() { "Sorry an error occured, please try again" }
                });
            }
        }

        [HttpPost("Login")]
        public async Task<IActionResult> Login(LoginRequestModel request)
        {
            try
            {
                LoginResponse authResponse = await _identityService.LoginAsync(request.Username, request.Password);
                return Ok(authResponse);
            }
            catch (Exception e)
            {
                _logger.logError(e);
                return Ok(new LoginResponse
                {
                    Success = false,
                    Errors = new List<string> { "Sorry an error occured, please try again" }
                });
            }
        }

        [HttpPost("Refresh")]
        public async Task<IActionResult> Refresh(RefreshTokenRequest request)
        {
            try
            {
                LoginResponse authResponse = await _identityService.RefreshTokenAsync(request.Token, request.RefreshToken);
                return Ok(authResponse);
            }
            catch (Exception e)
            {
                _logger.logError(e);
                return Ok(new LoginResponse
                {
                    Success = false,
                    Errors = new List<string>
                    {
                        "Sorry an error occured, please try again"
                    }
                });
            }
        }


    }
}