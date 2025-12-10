using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Server.Model.Database;
using Server.Model.Flight_Crew;

namespace Server.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class FlightCrewsController : ControllerBase
    {
        private readonly AirlineDbContext _context;

        public FlightCrewsController(AirlineDbContext context)
        {
            _context = context;
        }

        // GET: api/FlightCrews
        [HttpGet]
        public async Task<ActionResult<IEnumerable<FlightCrew>>> GetFlightCrew()
        {
            return await _context.FlightCrew
                .Include(fc => fc.Flight)
                .Include(fc => fc.CrewMember)
                .ToListAsync();
        }

        // GET: api/FlightCrews/flightId/CrewID
        [HttpGet("{flightId}/{crewMemberId}")]
        public async Task<ActionResult<FlightCrew>> GetFlightCrew(Guid flightId, Guid crewMemberId)
        {
            var flightCrew = await _context.FlightCrew
                .Include(fc => fc.Flight)
                .Include(fc => fc.CrewMember)
                .FirstOrDefaultAsync(fc => fc.FlightId == flightId && fc.CrewMemberId == crewMemberId);

            if (flightCrew == null)
            {
                return NotFound();
            }

            return flightCrew;
        }

        // POST: api/FlightCrews
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<FlightCrew>> PostFlightCrew(FlightCrew flightCrew)
        {
            if (FlightCrewExists(flightCrew.FlightId, flightCrew.CrewMemberId))
            {
                return Conflict("This crew member is already assigned to this flight.");
            }

            _context.FlightCrew.Add(flightCrew);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (FlightCrewExists(flightCrew.FlightId, flightCrew.CrewMemberId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetFlightCrew", new { flightId = flightCrew.FlightId, crewMemberId = flightCrew.CrewMemberId }, flightCrew);
        }

        // DELETE: api/FlightCrews/flightId/crewID
        [HttpDelete("{flightId}/{crewMemberId}")]
        public async Task<IActionResult> DeleteFlightCrew(Guid flightId, Guid crewMemberId)
        {
            var flightCrew = await _context.FlightCrew.FindAsync(flightId, crewMemberId);
            if (flightCrew == null)
            {
                return NotFound();
            }

            _context.FlightCrew.Remove(flightCrew);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool FlightCrewExists(Guid flightId, Guid crewMemberId)
        {
            return _context.FlightCrew.Any(e => e.FlightId == flightId && e.CrewMemberId == crewMemberId);
        }
    }
}
