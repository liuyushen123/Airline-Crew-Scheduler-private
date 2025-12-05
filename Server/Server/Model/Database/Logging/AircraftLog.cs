using System;
using Server.Model.Database;
using Server.Model.Aircraft;

namespace Server.Model.Database.Logging {
  class AircraftLog : ILog<Aircraft.Aircraft>
  {

    public AircraftLog(DatabaseService dbService)
    {
      LogGuid = Guid.NewGuid();
      DBService = dbService;
      LogTime = DateTime.Now;
    }

    public Guid LogGuid { get; }
    public DateTime LogTime { get; set; }

    public DatabaseService DBService { get; set; }

    public void createUpdateRecord(Aircraft.Aircraft aircraft, string action) {
      // implement logging logic here
    }
  }
}