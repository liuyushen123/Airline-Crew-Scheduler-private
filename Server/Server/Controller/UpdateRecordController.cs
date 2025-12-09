using Microsoft.AspNetCore.Mvc;
using Server.Model.Database;
using Server.Model.Update;
using Microsoft.EntityFrameworkCore;



/// THIS IS USED TO VIEW THE LOGS
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

        //GET: api/UpdateRecords
        //Get all logs
        [HttpGet]
        public async Task<ActionResult<IEnumerable<UpdateRecord>>> GetUpdateRecords()
        {
            return await _context.UpdateRecords
                .OrderByDescending(r => r.UpdateTime)
                .ToListAsync();
        }


        //GET: api/UpdateRecords/Aircraft/guid
        //Return history for a specific entity
        [HttpGet("{entityName}/{entityId}")]
        public async Task<ActionResult<IEnumerable<UpdateRecord>>> GetUpdateRecordsForEntity(string entityName, Guid entityId)
        {
            var records = await _context.UpdateRecords
                .Where(r => r.EntityName == entityName && r.EntityId == entityId)
                .OrderByDescending(r => r.UpdateTime)
                .ToListAsync();

            if (records == null || !records.Any())
            {
                return NotFound("No history found for this item.");
            }

            return records;
        }
    }
}
