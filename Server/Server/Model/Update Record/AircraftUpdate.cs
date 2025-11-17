using System;

namespace Server.Model.Update
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
