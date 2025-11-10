using System;

interface Flight
{
  Guid FlightGuid;
  Aircraft Plane;

  CrewMember Pilot;
  CrewMember FirstOfficer;
  CrewMember[] FlightAttendants;

  string Origin;
  string Destination;

  DateTime estTouchdown;
  DateTime actTouchdown;
  DateTime schedTouchdown;

  DateTime estTakeoff;
  DateTime actTakeoff;
  DateTime schedTakeoff;

}