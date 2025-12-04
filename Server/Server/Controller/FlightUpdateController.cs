using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Server.Model.Flight;
using Server.Model.Database;
using Server.Model.UpdateRecord;

namespace Server.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class FlightUpdateController : ControllerBase
    {
        private readonly AirlineDbContext _context;
        public FlightUpdateController(AirlineDbContext context)
        {
            _context = context;
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutFlightUpdate(Guid id, CommercialFlight flight)
        {
            if (id != flight.FlightGuid) return BadRequest();

            var existing = await _context.Flights.FindAsync(id);
            if (existing == null) return NotFound();

            if (flight.SchedTakeoff >= flight.SchedTouchdown)
                return BadRequest("Scheduled takeoff must be before touchdown");

            existing.SchedTakeoff = flight.SchedTakeoff;
            existing.SchedTouchdown = flight.SchedTouchdown;

            await _context.SaveChangesAsync();

            _context.UpdateRecords.Add(new UpdateRecord
            {
                EntityName = "Flight",
                EntityId = existing.FlightGuid,
                UpdateType = "ScheduleChange",
                Timestamp = DateTime.UtcNow,
                User = "API_User"
            });
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}