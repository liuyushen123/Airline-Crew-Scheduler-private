using System;

namespace Server.Model.Update
{
    public class CrewMemberUpdate : IUpdateRecord
    {
        public int UpdateID { get; set; }
        public DateTime UpdateTime { get; set; }
        public string Description { get; set; }
    }
}
