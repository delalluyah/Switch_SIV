using StocksAPI.Data;
using StocksAPI.Data.Custom;
using System;
using System.Collections.Generic;
using System.Text;
using System.Linq;
using System.Threading.Tasks;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using StocksApp.Utilities.Logging;
using StocksApp.Utilities.Security;

namespace StocksApp.Utilities.Services
{
    public class IdentityService : IIdentityService
    {
        private AppDbContext _db;
        private JWTSettings _jwt;
        private Logger _logger;
        private PasswordHasher _hasher;
        private TokenValidationParameters _tokenValidationParameters;

        public IdentityService(AppDbContext db, JWTSettings jwt, Logger logger, TokenValidationParameters tokenValidationParameters)
        {
            _db = db;
            _jwt = jwt;
            _logger = logger;
            _hasher = new PasswordHasher();
            _tokenValidationParameters = tokenValidationParameters;
        }

        public async Task<LoginResponse> LoginAsync(string username, string password)
        {
            username = username.ToLower().Trim();
            var user = _db.User.AsQueryable().FirstOrDefault(x => x.Username == username);
            if (user == null)
            {
                return new LoginResponse
                {
                    Success = false,
                    Errors = new LoginErrors
                    {
                        Username = "User does not exist"
                    }
                };
            }
            if (!_hasher.VerifyIdentityV3Hash(password, user.Password))
            {
                return new LoginResponse
                {
                    Success = false,
                    Errors = new LoginErrors
                    {
                        Password = "Password is incorrect"
                    }
                };
            }

            var token = GenerateToken(user);
            return new LoginResponse
            {
                Token = token,
                Success = true
            };
        }

        public async Task<RegistrationResponse> RegisterAsync(string fullName, string username, string password, int roleid)
        {
            username = username.ToLower();
            var existing = _db.User.AsQueryable().FirstOrDefault(d => d.Username == username);
            if (existing != null)
            {
                return new RegistrationResponse
                {
                    Errors = new RegisterErrors
                    {
                        Username = "A user with this username already exists",
                    }
                };
            }
            password = _hasher.GenerateIdentityV3Hash(password);
            var user = new User
            {
                Fullname = fullName,
                Username = username,
                Password = password,
                RoleId = roleid
            };
            _db.User.Add(user);
            await _db.SaveChangesAsync();

            var token = GenerateToken(user);
            return new RegistrationResponse
            {
                Success = true,
                Token = token
            };
        }
        public async Task<LoginResponse> RefreshTokenAsync(string token, string refreshToken)
        {
            throw new NotImplementedException();
        }
        private ClaimsPrincipal GetrincipalFromToken(string token)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            try
            {
                var principal = tokenHandler.ValidateToken(token, _tokenValidationParameters, out var validatedToken);
                if (isJwtWithValidSecurityAlgorithm(validatedToken))
                    return principal;
            }
            catch (Exception e)
            {
                _logger.logError(e);
            }
            return null;
        }

        private bool isJwtWithValidSecurityAlgorithm(SecurityToken validatedToken)
        {
            return (validatedToken is JwtSecurityToken jwtSecurityToken) &&
                jwtSecurityToken.Header.Alg.Equals(SecurityAlgorithms.HmacSha256, StringComparison.InvariantCultureIgnoreCase);
        }
        private string GenerateToken(User user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_jwt.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor()
            {
                Subject = new ClaimsIdentity(new[]
            {
                    new Claim(JwtRegisteredClaimNames.Sub, user.Username),
                    new Claim(JwtRegisteredClaimNames.UniqueName, user.Username),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                    new Claim(JwtRegisteredClaimNames.GivenName, user.Fullname),
                    new Claim("Id", user.UserId.ToString())
                }),
                Expires = DateTime.UtcNow.Add(_jwt.TokenLifetime),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);
        }
    }
}
