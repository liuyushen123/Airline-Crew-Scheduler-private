using System;
using Server.Model.Database;
using Server.Model.Crew_Member;

namespace Server.Model.Database.Logging {
  class CrewLog : ILog<CrewMember>
  {

    public CrewLog(DatabaseService dbService)
    {
      LogGuid = Guid.NewGuid();
      DBService = dbService;
      LogTime = DateTime.Now;
    }

    public Guid LogGuid { get; }
    public DateTime LogTime { get; set; }

    public DatabaseService DBService { get; set; }

    public void createUpdateRecord(CrewMember crew, string action) {
      // implement logging logic here
    }
  }
}