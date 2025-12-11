using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Server.Model.Aircraft;
using Server.Model.Database;

namespace Server.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class AircraftController : ControllerBase
    {
        private readonly AirlineDbContext _context;

        public AircraftController(AirlineDbContext context)
        {
            _context = context;
        }

        // GET: api/Aircraft
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Aircraft>>> GetAircraft()
        {
            return await _context.Aircrafts.ToListAsync();
        }

        // GET: api/Aircraft/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Aircraft>> GetAircraft(Guid id)
        {
            var aircraft = await _context.Aircrafts.FindAsync(id);

            if (aircraft == null)
            {
                return NotFound();
            }

            return aircraft;
        }

        // PUT: api/Aircraft/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAircraft(Guid id, Aircraft aircraft)
        {
            if (id != aircraft.AircraftID)
            {
                return BadRequest();
            }

            var existingPlane = await _context.Aircrafts.FindAsync(id);
            if (existingPlane == null)
            {
                return NotFound();
            }

            string logMessage = $"Updated Aircraft {existingPlane.AircraftType}. " + $"Loc: {existingPlane.CurrentLocation} -> {aircraft.CurrentLocation}";

            existingPlane.AircraftType = aircraft.AircraftType;
            existingPlane.MaxCapacity = aircraft.MaxCapacity;
            existingPlane.CurrentLocation = aircraft.CurrentLocation;


            _context.UpdateRecords.Add(new Server.Model.Update.UpdateRecord
            {
                EntityName = "Aircraft",
                EntityId = existingPlane.AircraftID,
                UpdateType = logMessage,
            });

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AircraftExists(id))
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

        // POST: api/Aircraft
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Aircraft>> PostAircraft(Aircraft aircraft)
        {
            _context.Aircrafts.Add(aircraft);

            _context.UpdateRecords.Add(new Server.Model.Update.UpdateRecord
            {
                EntityName = "Aircraft",
                EntityId = aircraft.AircraftID,
                UpdateType = $"Created new Aircraft: {aircraft.AircraftType} at {aircraft.CurrentLocation}",
            });

            await _context.SaveChangesAsync();

            return CreatedAtAction("GetAircraft", new { id = aircraft.AircraftID }, aircraft);
        }

        // DELETE: api/Aircraft/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAircraft(Guid id)
        {
            var aircraft = await _context.Aircrafts.FindAsync(id);
            if (aircraft == null)
            {
                return NotFound();
            }

            _context.UpdateRecords.Add(new Server.Model.Update.UpdateRecord
            {
                EntityName = "Aircraft",
                EntityId = aircraft.AircraftID,
                UpdateType = $"Deleted Aircraft: {aircraft.AircraftType} (Was at {aircraft.CurrentLocation})",
            });

            _context.Aircrafts.Remove(aircraft);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool AircraftExists(Guid id)
        {
            return _context.Aircrafts.Any(e => e.AircraftID == id);
        }
    }
}
