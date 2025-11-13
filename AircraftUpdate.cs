using System;

namespace Airline_Update
{
    public class AircraftUpdate : IUpdateRecord
    {
        public int UpdateID { get; set; }
        public DateTime UpdateTime { get; set; }
        public string Description { get; set; }

        public string AircraftType { get; set; }
        public string RegistrationNumber { get; set; }
        public int PassengerCapacity { get; set; }

        
    }
}
