using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Server.Model.Flight_Crew;
using Server.Model.Aircraft;

<<<<<<< HEAD
namespace Server.Model.Flight {
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
    public List<CrewMember> FlightAttendants { get; set; }

    public string Origin { get; set; }
    public string Destination { get; set; }

    public DateTime EstTouchdown { get; set; }
    public DateTime ActTouchdown { get; set; }
    public DateTime SchedTouchdown { get; set; }

    public DateTime EstTakeoff { get; set; }
    public DateTime ActTakeoff { get; set; }
    public DateTime SchedTakeoff { get; set; }
=======
namespace Server.Model.Flight
{
  public class CommercialFlight : IFlight
  {
    [Key]
    public Guid FlightGuid { get; set; } = Guid.NewGuid();
    
    public Guid AircraftId { get; set; }

    [ForeignKey("AircraftId")]
    public virtual Aircraft.Aircraft? Plane { get; set; }

    [Required]
    public string Origin { get; set; } = string.Empty;
    [Required]
    public string Destination { get; set; } = string.Empty;

    public DateTime? EstTouchdown { get; set; }
    public DateTime? ActTouchdown { get; set; }
    public DateTime? SchedTouchdown { get; set; }

    public DateTime? EstTakeoff { get; set; }
    public DateTime? ActTakeoff { get; set; }
    public DateTime? SchedTakeoff { get; set; }

    public virtual ICollection<FlightCrew> CrewAssignments { get; set; } = new List<FlightCrew>();
>>>>>>> 75f52b04da2fb9358233776265ee5a804ef8f565
  }
}