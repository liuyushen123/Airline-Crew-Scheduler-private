using System;

class CommercialFlight : IFlight
{
  public CommercialFlight()
  {
    FlightGuid = Guid.NewGuid();
  }

  public Guid FlightGuid { get; private set; }
  public Aircraft Plane { get; set; }
  public CrewMember Pilot { get; set; }
  public CrewMember FirstOfficer { get; set; }
  public CrewMember[] FlightAttendants { get; set; }

  public string Origin { get; set; }
  public string Destination { get; set; }

  public DateTime EstTouchdown { get; set; }
  public DateTime ActTouchdown { get; set; }
  public DateTime SchedTouchdown { get; set; }

  public DateTime EstTakeoff { get; set; }
  public DateTime ActTakeoff { get; set; }
  public DateTime SchedTakeoff { get; set; }
}
