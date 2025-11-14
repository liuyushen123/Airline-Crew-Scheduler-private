using System;

class FlightRecord : IRecord
{
  public FlightRecord(RecordController recordController)
  {
    recordGuid = Guid.NewGuid();
    this.recordController = recordController;
  }

  public Guid recordGuid { get; private set; }

  public List<Update> updates { get; set; }

  public Flight flight { get; set; }

  private RecordController recordController { get; set; }

  public void AddUpdate(Update update)
  {
    if (update == null)
    {
      return;
    }
    else
    {
      recordController.PostUpdate(update, flight); // hypothetical db call
      updates.Add(update);
    }
  }
}
