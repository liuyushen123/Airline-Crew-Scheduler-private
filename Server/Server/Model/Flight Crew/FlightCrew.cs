using Server.Model.Crew_Member;
using Server.Model.Flight;
using System.ComponentModel.DataAnnotations;

namespace Server.Model.Flight_Crew
{
    public class FlightCrew
    {
        public Guid FlightId { get; set; }
        //silences warning, because flightcrew record will always have a flight
        public virtual CommercialFlight Flight { get; set; } = null!;

        public Guid CrewMemberId { get; set; }
        // same thing with Crewmember
        public virtual CrewMember CrewMember { get; set; } = null!;


        [Required]
        public string RoleOnFlight { get; set; } = string.Empty;
    }
}
