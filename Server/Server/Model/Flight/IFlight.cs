using System;

<<<<<<< HEAD
namespace Server.Model.Flight {
  interface IFlight
  {
    Guid FlightGuid { get; }
    Aircraft Plane { get; set; }

    CrewMember Pilot { get; set; }
    CrewMember FirstOfficer { get; set; }
    List<CrewMember> FlightAttendants { get; set; }

    string Origin { get; set; }
    string Destination { get; set; }

    DateTime EstTouchdown { get; set; }
    DateTime ActTouchdown { get; set; }
    DateTime SchedTouchdown { get; set; }

    DateTime EstTakeoff { get; set; }
    DateTime ActTakeoff { get; set; }
    DateTime SchedTakeoff { get; set; }
  }
=======
namespace Server.Model.Flight
{
    interface IFlight
    {
        Guid FlightGuid { get; set; }

        Guid AircraftId { get; set; }

        string Origin { get; set; }
        string Destination { get; set; }

        DateTime? EstTouchdown { get; set; }
        DateTime? ActTouchdown { get; set; }
        DateTime? SchedTouchdown { get; set; }

        DateTime? EstTakeoff { get; set; }
        DateTime? ActTakeoff { get; set; }
        DateTime? SchedTakeoff { get; set; }
    }
>>>>>>> 75f52b04da2fb9358233776265ee5a804ef8f565
}