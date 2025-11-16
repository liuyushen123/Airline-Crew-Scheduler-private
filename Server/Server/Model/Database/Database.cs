using System;

using Microsoft.Data.SqlClient;


namespace Server.Model.Database
{
    public class DatabaseService
    {

        //connection string is in appsettings.json
        private readonly string _connectionString;
        
        public DatabaseService(string connectionString)
        {
            _connectionString = connectionString;
        }

        public void TestDatabaseConnection()
        {
            Console.WriteLine("testing DB connection");
            try
            {
                using (var connection = new SqlConnection(_connectionString))
                {
                    connection.Open();
                    Console.WriteLine("DB SUCCESS");
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
            }
            Console.WriteLine();
        }
        
    }
}
