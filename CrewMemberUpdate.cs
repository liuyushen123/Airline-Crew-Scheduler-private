using System;

namespace Server.Model.Update
{
    public class CrewMemberUpdate : IUpdateRecord
    {
        public int UpdateID { get; set; }
        public DateTime UpdateTime { get; set; }
        public string Description { get; set; }

        
        public string CrewName { get; set; }
        public string Role { get; set; } // Captain, First Officer, Flight Attendant
        public string Qualification { get; set; }
        public string Location { get; set; }

    }
}
