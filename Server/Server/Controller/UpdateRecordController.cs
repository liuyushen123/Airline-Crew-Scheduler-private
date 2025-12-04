using Microsoft.AspNetCore.Mvc;
using Server.Model.Database;
using Server.Model.UpdateRecord;
using Microsoft.EntityFrameworkCore;

namespace Server.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class UpdateRecordsController : ControllerBase
    {
        private readonly AirlineDbContext _context;
        public UpdateRecordsController(AirlineDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<UpdateRecord[]>> GetUpdateRecords([FromQuery] string entity, [FromQuery] Guid id)
        {
            var records = await _context.UpdateRecords
                .Where(r => r.EntityName == entity && r.EntityId == id)
                .OrderByDescending(r => r.Timestamp)
                .ToArrayAsync();
            return records;
        }
    }
}
