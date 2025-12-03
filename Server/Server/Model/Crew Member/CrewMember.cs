using System.ComponentModel.DataAnnotations;
using Server.Model.Crew;
using Server.Model.Flight_Crew;

namespace Server.Model.Crew_Member // why does this have a space....
{
    public class CrewMember: ICrewMember
    {
        [Key]
        public Guid CrewMemberId { get; set; } = Guid.NewGuid();

        [Required]
        [MaxLength(100)]
        public string Name { get; set; } = string.Empty;

        [Required]
        public string Role { get; set; } = string.Empty;

        public string Location { get; set; } = string.Empty;

        public virtual ICollection<FlightCrew> JobHistory { get; set; } = new List<FlightCrew>();
    }
}
