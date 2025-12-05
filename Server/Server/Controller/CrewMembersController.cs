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
            return await _context.CrewMember.ToListAsync();
        }

        // GET: api/CrewMembers/5
        [HttpGet("{id}")]
        public async Task<ActionResult<CrewMember>> GetCrewMember(Guid id)
        {
            var crewMember = await _context.CrewMember.FindAsync(id);

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

            _context.Entry(crewMember).State = EntityState.Modified;

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
            _context.CrewMember.Add(crewMember);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCrewMember", new { id = crewMember.CrewMemberId }, crewMember);
        }

        // DELETE: api/CrewMembers/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCrewMember(Guid id)
        {
            var crewMember = await _context.CrewMember.FindAsync(id);
            if (crewMember == null)
            {
                return NotFound();
            }

            _context.CrewMember.Remove(crewMember);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CrewMemberExists(Guid id)
        {
            return _context.CrewMember.Any(e => e.CrewMemberId == id);
        }
    }
}
