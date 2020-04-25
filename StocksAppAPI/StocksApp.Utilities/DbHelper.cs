using Microsoft.Extensions.Configuration;
using Npgsql;
using StocksAPI.Data.Custom;
using StocksApp.Utilities.Logging;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace StocksApp.Utilities
{
    public class DbHelper
    {
        public string Connstring { get; set; }
        public List<NpgsqlParameter> Params { get; set; } = new List<NpgsqlParameter>();
        public Logger Logger { get; set; }
        public DbHelper(Logger logger,IConfiguration config)
        {
            Connstring = config.GetConnectionString("DBConnectionString");
            Logger = logger;
        }

        public async Task<DashboardSummary> GetDashboardSummary()
        {
            try
            {
                using (var conn = new NpgsqlConnection(Connstring))
                {
                    var results = new DashboardSummary();
                    var cmd = new NpgsqlCommand("\"GetDashboardSummary\"", conn);
                    cmd.CommandType = System.Data.CommandType.StoredProcedure;

                    conn.Open(); var reader = await cmd.ExecuteReaderAsync();
                    while (reader.Read())
                    {
                        new DashboardSummary
                        {
                            TotalProducts = reader.GetFieldValue<long>(0),
                            TotalCost = reader.GetFieldValue<double>(1),
                            TotalPrice = reader.GetFieldValue<double>(2),
                            Weekly= new TimeSummary {
                                ProductsAdded = reader.GetFieldValue<long>(3), 
                                Amount = reader.GetFieldValue<double>(4), 
                                QuantityAdded = reader.GetFieldValue<long>(5), 
                            },
                            Monthly= new TimeSummary
                            {
                                ProductsAdded = reader.GetFieldValue<long>(6),
                                Amount = reader.GetFieldValue<double>(7),
                                QuantityAdded = reader.GetFieldValue<long>(8),
                            },
                            Annual= new TimeSummary
                            {
                                ProductsAdded = reader.GetFieldValue<long>(9),
                                Amount = reader.GetFieldValue<double>(10),
                                QuantityAdded = reader.GetFieldValue<long>(11),
                            }
                        };
                    }
                    conn.Close();
                    conn.Dispose();
                    return results;
                }
            }
            catch (Exception ex)
            {
                Logger.logError(ex);
                return new DashboardSummary();
            }
        }

        private void ClearParams()
        {
            Params = new List<NpgsqlParameter>();
        }
        private void AddParams(string name, NpgsqlTypes.NpgsqlDbType type, dynamic value)
        {
            var NewParameter = new NpgsqlParameter()
            {
                ParameterName = name,
                Value = value,
                NpgsqlDbType = type
            };
            Params.Add(NewParameter);
        }

    }
}
