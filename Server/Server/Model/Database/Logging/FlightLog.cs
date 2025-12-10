using System;
using Server.Model.Database;
using Server.Model.Flight;

namespace Server.Model.Database.Logging {
  class FlightLog : ILog<CommercialFlight>
  {

    public FlightLog(DatabaseService dbService)
    {
      LogGuid = Guid.NewGuid();
      DBService = dbService;
      LogTime = DateTime.Now;
    }

    public Guid LogGuid { get; }
    public DateTime LogTime { get; set; }

    public DatabaseService DBService { get; set; }

    public void createUpdateRecord(CommercialFlight flight, string action) {
      // implement logging logic here
    }
  }
}