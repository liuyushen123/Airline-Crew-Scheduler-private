using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Server.Model.Database;
using Server.Model.Flight;

namespace Server.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommercialFlightsController : ControllerBase
    {
        private readonly AirlineDbContext _context;

        public CommercialFlightsController(AirlineDbContext context)
        {
            _context = context;
        }

        // GET: api/CommercialFlights
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CommercialFlight>>> GetCommercialFlights()
        {
            return await _context.Flights
                .Include(f => f.Plane)
                .Include(f => f.CrewAssignments)
                .ThenInclude(fc => fc.CrewMember)
                .ToListAsync();
        }

        // GET: api/CommercialFlights/5
        [HttpGet("{id}")]
        public async Task<ActionResult<CommercialFlight>> GetCommercialFlight(Guid id)
        {
            var commercialFlight = await _context.Flights
                .Include(f => f.Plane)
                .Include(f => f.CrewAssignments)
                .ThenInclude(fc => fc.CrewMember)
                .FirstOrDefaultAsync(f => f.FlightGuid == id);

            if (commercialFlight == null)
            {
                return NotFound();
            }

            return commercialFlight;
        }

        // PUT: api/CommercialFlights/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCommercialFlight(Guid id, CommercialFlight commercialFlight)
        {
            if (id != commercialFlight.FlightGuid)
            {
                return BadRequest();
            }

            _context.Entry(commercialFlight).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CommercialFlightExists(id))
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

        // POST: api/CommercialFlights
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<CommercialFlight>> PostCommercialFlight(CommercialFlight commercialFlight)
        {
            _context.Flights.Add(commercialFlight);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCommercialFlight", new { id = commercialFlight.FlightGuid }, commercialFlight);
        }

        // DELETE: api/CommercialFlights/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCommercialFlight(Guid id)
        {
            var commercialFlight = await _context.Flights.FindAsync(id);
            if (commercialFlight == null)
            {
                return NotFound();
            }

            _context.Flights.Remove(commercialFlight);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CommercialFlightExists(Guid id)
        {
            return _context.Flights.Any(e => e.FlightGuid == id);
        }
    }
}
