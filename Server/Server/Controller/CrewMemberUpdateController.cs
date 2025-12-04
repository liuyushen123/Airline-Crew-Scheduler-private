using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Server.Model.Crew_Member;
using Server.Model.Database;
using Server.Model.UpdateRecord;

namespace Server.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class CrewMemberUpdateController : ControllerBase
    {
        private readonly AirlineDbContext _context;
        public CrewMemberUpdateController(AirlineDbContext context)
        {
            _context = context;
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutCrewMemberUpdate(Guid id, CrewMember crew)
        {
            if (id != crew.CrewMemberId) return BadRequest();

            var existing = await _context.CrewMember.FindAsync(id);
            if (existing == null) return NotFound();

            if (string.IsNullOrEmpty(crew.Role))
                return BadRequest("Crew member role cannot be empty");

            existing.Role = crew.Role;
            existing.Location = crew.Location;

            await _context.SaveChangesAsync();

            _context.UpdateRecords.Add(new UpdateRecord
            {
                EntityName = "CrewMember",
                EntityId = existing.CrewMemberId,
                UpdateType = "RoleChange",
                Timestamp = DateTime.UtcNow,
                User = "API_User"
            });
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}