

using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Server.Controller;
using Server.Model.Database;
using Server.Model.Update;

namespace ServerTests.Controllers
{
    public class UpdateRecordsControllerTests
    {
        private AirlineDbContext GetDbContext()
        {
            var options = new DbContextOptionsBuilder<AirlineDbContext>()
                .UseInMemoryDatabase(Guid.NewGuid().ToString())
                .Options;

            return new AirlineDbContext(options);
        }

        
        [Fact]
        public async Task CreateUpdateRecord_ShouldAddRecord()
        {
            var context = GetDbContext();

            var record = new UpdateRecord
            {
                Id = Guid.NewGuid(),
                EntityName = "Aircraft",
                EntityId = Guid.NewGuid(),
                UpdateType = "Create",
                UpdateDescription = "Created Aircraft",
                UpdateTime = DateTime.UtcNow
            };

            context.UpdateRecords.Add(record);
            await context.SaveChangesAsync();

            Assert.Equal(1, context.UpdateRecords.Count());
        }

        
        [Fact]
        public async Task GetUpdateRecords_ShouldReturnAllRecords()
        {
            var context = GetDbContext();

            context.UpdateRecords.Add(new UpdateRecord
            {
                Id = Guid.NewGuid(),
                EntityName = "Aircraft",
                EntityId = Guid.NewGuid(),
                UpdateType = "Create",
                UpdateDescription = "Created Aircraft",
                UpdateTime = DateTime.UtcNow
            });

            await context.SaveChangesAsync();

            var controller = new UpdateRecordsController(context);

            var result = await controller.GetUpdateRecords();
            var ok = Assert.IsType<ActionResult<IEnumerable<UpdateRecord>>>(result);

            Assert.Single(ok.Value!);
        }

        
        [Fact]
        public async Task GetUpdateRecordsForEntity_ShouldReturnRecords()
        {
            var context = GetDbContext();

            Guid eid = Guid.NewGuid();

            context.UpdateRecords.Add(new UpdateRecord
            {
                Id = Guid.NewGuid(),
                EntityName = "Aircraft",
                EntityId = eid,
                UpdateType = "Modify",
                UpdateDescription = "Changed Tail Number",
                UpdateTime = DateTime.UtcNow
            });

            await context.SaveChangesAsync();

            var controller = new UpdateRecordsController(context);

            var result = await controller.GetUpdateRecordsForEntity("Aircraft", eid);
            var ok = Assert.IsType<ActionResult<IEnumerable<UpdateRecord>>>(result);

            Assert.Single(ok.Value!);
        }

        
        [Fact]
        public async Task GetUpdateRecordsForEntity_NotFound_WhenNoRecords()
        {
            var context = GetDbContext();
            var controller = new UpdateRecordsController(context);

            var result = await controller.GetUpdateRecordsForEntity("Aircraft", Guid.NewGuid());

            var notFound = Assert.IsType<NotFoundObjectResult>(result.Result);
            Assert.Equal("No history found for this item.", notFound.Value);
        }

        
        [Fact]
        public void Update_ShouldNotBeAllowed()
        {
            
            var controllerType = typeof(UpdateRecordsController);
            var putAttribute = controllerType.GetMethods()
                .Where(m => m.GetCustomAttributes(typeof(HttpPutAttribute), false).Any());

            Assert.Empty(putAttribute);
        }

       
        [Fact]
        public void Delete_ShouldNotBeAllowed()
        {
            var controllerType = typeof(UpdateRecordsController);
            var delAttribute = controllerType.GetMethods()
                .Where(m => m.GetCustomAttributes(typeof(HttpDeleteAttribute), false).Any());

            Assert.Empty(delAttribute);
        }
    }
}
