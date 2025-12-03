using System;

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
}