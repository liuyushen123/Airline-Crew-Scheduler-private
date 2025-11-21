using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Server.Model.Flight_Crew;
using Server.Model.Aircraft;

namespace Server.Model.Flight
{
  public class CommercialFlight : IFlight
  {
    [Key]
    public Guid FlightGuid { get; set; } = Guid.NewGuid();
    
    public Guid AircraftId { get; set; }

    [ForeignKey("AircraftId")]
    public virtual Airplane Plane { get; set; } = null!;

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
  }
}