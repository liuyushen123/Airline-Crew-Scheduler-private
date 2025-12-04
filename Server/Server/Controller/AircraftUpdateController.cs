using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Server.Model.Aircraft;
using Server.Model.Database;
using Server.Model.UpdateRecord;

namespace Server.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class AircraftUpdateController : ControllerBase
    {
        private readonly AirlineDbContext _context;
        public AircraftUpdateController(AirlineDbContext context)
        {
            _context = context;
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutAircraftUpdate(Guid id, Aircraft aircraft)
        {
            if (id != aircraft.AircraftID) return BadRequest();

            var existing = await _context.Aircraft.FindAsync(id);
            if (existing == null) return NotFound();

            if (string.IsNullOrEmpty(aircraft.CurrentLocation))
                return BadRequest("Aircraft location cannot be empty");

            existing.CurrentLocation = aircraft.CurrentLocation;

            await _context.SaveChangesAsync();

            _context.UpdateRecords.Add(new UpdateRecord
            {
                EntityName = "Aircraft",
                EntityId = existing.AircraftID,
                UpdateType = "LocationChange",
                Timestamp = DateTime.UtcNow,
                User = "API_User"
            });
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}