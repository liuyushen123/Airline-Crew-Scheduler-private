using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Server.Model.Crew_Member;
using Server.Model.Database;

namespace Server.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class CrewMembersController : ControllerBase
    {
        private readonly AirlineDbContext _context;

        public CrewMembersController(AirlineDbContext context)
        {
            _context = context;
        }

        // GET: api/CrewMembers
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CrewMember>>> GetCrewMember()
        {
            return await _context.CrewMembers.ToListAsync();
        }

        // GET: api/CrewMembers/5
        [HttpGet("{id}")]
        public async Task<ActionResult<CrewMember>> GetCrewMember(Guid id)
        {
            var crewMember = await _context.CrewMembers.FindAsync(id);

            if (crewMember == null)
            {
                return NotFound();
            }

            return crewMember;
        }

        // PUT: api/CrewMembers/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCrewMember(Guid id, CrewMember crewMember)
        {
            if (id != crewMember.CrewMemberId)
            {
                return BadRequest();
            }

            var existingCrew = await _context.CrewMembers.FindAsync(id);
            if (existingCrew == null)
            {
                return NotFound();
            }

            string logMessage = $"Updated Crew {existingCrew.Name}. " + $"Role: {existingCrew.Role} -> {crewMember.Role}";

            existingCrew.Name = crewMember.Name;
            existingCrew.Role = crewMember.Role;

            _context.UpdateRecords.Add(new Server.Model.Update.UpdateRecord
            {
                EntityName = "CrewMember",
                EntityId = existingCrew.CrewMemberId,
                UpdateType = logMessage,
            });

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CrewMemberExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/CrewMembers
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<CrewMember>> PostCrewMember(CrewMember crewMember)
        {
            _context.CrewMembers.Add(crewMember);
            _context.UpdateRecords.Add(new Server.Model.Update.UpdateRecord
            {
                EntityName = "CrewMember",
                EntityId = crewMember.CrewMemberId,
                UpdateType = $"Hired new Crew Member: {crewMember.Name} ({crewMember.Role})",
            });

            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCrewMember", new { id = crewMember.CrewMemberId }, crewMember);
        }

        // DELETE: api/CrewMembers/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCrewMember(Guid id)
        {
            var crewMember = await _context.CrewMembers.FindAsync(id);
            if (crewMember == null)
            {
                return NotFound();
            }

            _context.UpdateRecords.Add(new Server.Model.Update.UpdateRecord
            {
                EntityName = "CrewMember",
                EntityId = crewMember.CrewMemberId,
                UpdateType = $"Fired/Removed Crew Member: {crewMember.Name} ({crewMember.Role})",
            });

            _context.CrewMembers.Remove(crewMember);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CrewMemberExists(Guid id)
        {
            return _context.CrewMembers.Any(e => e.CrewMemberId == id);
        }
    }
}
