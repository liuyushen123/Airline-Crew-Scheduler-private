using System;

interface IFlight
{
  Guid FlightGuid { get; }
  Aircraft Plane { get; set; }

  CrewMember Pilot { get; set; }
  CrewMember FirstOfficer { get; set; }
  CrewMember[] FlightAttendants { get; set; }

  string Origin { get; set; }
  string Destination { get; set; }

  DateTime EstTouchdown { get; set; }
  DateTime ActTouchdown { get; set; }
  DateTime SchedTouchdown { get; set; }

  DateTime EstTakeoff { get; set; }
  DateTime ActTakeoff { get; set; }
  DateTime SchedTakeoff { get; set; }
}
