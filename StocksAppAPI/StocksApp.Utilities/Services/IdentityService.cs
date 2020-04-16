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
                    Errors = new List<string>
                    {
                       "User does not exist"
                    }
                };
            }
            if (!_hasher.VerifyIdentityV3Hash(password, user.Password))
            {
                return new LoginResponse
                {
                    Success = false,
                    Errors = new List<string>
                    {
                         "Password is incorrect"
                    }
                };
            }

            var token = await GenerateToken(user);
            return new LoginResponse
            {
                Token = token.Item1,
                Success = true,
                RefreshToken = token.Item2
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
                    Errors = new List<string>
                    {
                        "A user with this username already exists",
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

            var token = await GenerateToken(user);
            return new RegistrationResponse
            {
                Success = true,
                Token = token.Item1,
                RefreshToken = token.Item2
            };
        }
        public async Task<LoginResponse> RefreshTokenAsync(string token, string refreshToken)
        {
            var validatedToken = GetPrincipalFromToken(token);
            if (validatedToken == null)
            {
                return new LoginResponse()
                {
                    Success = false,
                    Errors = new List<string>
                    {
                        "Invalid Token"
                    }
                };
            }
            var expiryDateUnix = long.Parse(validatedToken.Claims.Single(x => x.Type == JwtRegisteredClaimNames.Exp).Value);
            var expiryDateTimeUTC = new DateTime(1970, 1, 1, 0, 0, 0, DateTimeKind.Utc)
                .AddSeconds(expiryDateUnix)
                .Subtract(_jwt.TokenLifetime);

            if (expiryDateTimeUTC > DateTime.UtcNow)
            {
                //
            }
            var jti = validatedToken.Claims.Single(x => x.Type == JwtRegisteredClaimNames.Jti).Value;

            var storedRefreshToken = _db.RefreshToken.FirstOrDefault(x => x.Token == refreshToken);
            if (storedRefreshToken == null)
            {
                return new LoginResponse
                {
                    Success = false,
                    Errors = new List<string>
                    {
                         "Token does not exist"
                    }
                };
            }
            if (DateTime.UtcNow > storedRefreshToken.ExpirationDate)
            {
                return new LoginResponse()
                {
                    Success = false,
                    Errors = new List<string>
                    {
                        "Refresh Token is expired"
                    }
                };
            }
            if ((bool)storedRefreshToken.Invalidated || (bool)storedRefreshToken.Used)
            {
                return new LoginResponse()
                {
                    Success = false,
                    Errors = new List<string>
                    {
                       "Refresh Token is invalidated or used"
                    }
                };
            }
            if (storedRefreshToken.JwtId != jti)
            {
                return new LoginResponse()
                {
                    Success = false,
                    Errors = new List<string>
                    {
                        "Wrong JWT ID"
                    }
                };
            }

            var userId = int.Parse(validatedToken.Claims.Single(x => x.Type == "Id").Value);
            storedRefreshToken.Used = true;
            await _db.SaveChangesAsync();

            var newToken = await GenerateToken(_db.User.FirstOrDefault(x => x.UserId == userId));
            return new LoginResponse
            {
                Success = true,
                Token = newToken.Item1,
                RefreshToken = newToken.Item2
            };

        }
        private ClaimsPrincipal GetPrincipalFromToken(string token)
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
        private async Task<Tuple<string, string>> GenerateToken(User user)
        {
            var role = _db.Role.FirstOrDefault(r => r.RoleId == user.RoleId);
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
                    new Claim("Id", user.UserId.ToString()),
                    new Claim("Role", role.Name)
                }),
                Expires = DateTime.UtcNow.Add(_jwt.TokenLifetime),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            var refreshToken = new RefreshToken
            {
                UserId = user.UserId,
                JwtId = token.Id,
                Used = false,
                Invalidated = false,
                CreationDate = DateTime.UtcNow,
                ExpirationDate = DateTime.UtcNow.AddMonths(6),
                Token = Guid.NewGuid().ToString()
            };
            _db.RefreshToken.Add(refreshToken);
            await _db.SaveChangesAsync();

            return new Tuple<string, string>(tokenHandler.WriteToken(token), refreshToken.Token);
        }
    }
}
