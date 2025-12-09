using System.ComponentModel.DataAnnotations;

namespace Server.Model.Update
{
    public class UpdateRecord : IUpdateRecord
    {
        [Key]
        public Guid UpdateId { get; set; } = Guid.NewGuid();
        public DateTime UpdateTime { get; set; } = DateTime.UtcNow;

        // What was changed? (e.g., "Aircraft", "CrewMember")
        [Required]
        public string EntityName { get; set; } = string.Empty;

        // Which specific record? (The GUID of the plane/person)
        public Guid EntityId { get; set; }

        // What happened? (e.g., "Location Changed to JFK") (description
        [Required]
        public string UpdateType { get; set; } = string.Empty;

        public string User { get; set; } = "API_user"; 
    }
}