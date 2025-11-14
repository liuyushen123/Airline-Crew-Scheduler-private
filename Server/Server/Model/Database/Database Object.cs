using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.SqlClient;



namespace Server.Model.Database
{
    class Program
    {
        static void Main()
        {
            string connectionString = "Server=YOUR_SERVER_NAME;Database=YOUR_DATABASE_NAME;User Id=YOUR_USERNAME;Password=YOUR_PASSWORD;";

            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                try
                {
                    connection.Open();
                    Console.WriteLine("you are connected to the database");


                }
                catch
                {
                    Console.WriteLine("HAHA you failed to connect LOL");
                }
            }
        }
    }
}
