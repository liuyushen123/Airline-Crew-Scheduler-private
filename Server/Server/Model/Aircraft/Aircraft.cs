using Server.Model.Flight;
using System.ComponentModel.DataAnnotations;

namespace Server.Model.Aircraft
{

    //THIS IS AIRPLANE NOT AIRCRAFT
    public class Airplane : IAircraft
    {
        [Key]
        public Guid AircraftID { get; set; } = Guid.NewGuid();

        [Required]
        public string AircraftType { get; set; } = string.Empty;

        [Range(1,1000)]
        public int MaxCapacity { get; set; }

        [Required]
        public string CurrentLocation { get; set; } = string.Empty;

        public virtual ICollection<CommercialFlight> Flights { get; set; } = new List<CommercialFlight>();

    }
}
