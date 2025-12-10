using System;
using Server.Model.Database;

namespace Server.Model.Database.Logging {
  interface ILog<T>
  {
    Guid LogGuid { get; }
    DateTime LogTime { get; set; }

    DatabaseService DBService { get; set; }

    void createUpdateRecord(T item, string action);
  }
}