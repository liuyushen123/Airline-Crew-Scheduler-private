using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Server.Controller;
using Server.Model.Aircraft;
using Server.Model.Crew_Member;
using Server.Model.Database;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Server.Controller.Testing
{
    [TestClass()]
    public class CrewMembersControllerTests
    {

        private AirlineDbContext _context = null!;

        [TestInitialize] //initalizes in memory database
        public void Setup()
        {
            var options = new DbContextOptionsBuilder<AirlineDbContext>()
                    .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
                    .Options;
            _context = new AirlineDbContext(options);
        }

        [TestCleanup] //clean up memory
        public void Cleanup()
        {
            _context.Dispose();
        }
        //GET TESTS






        [TestMethod()]
        public async Task CrewMembersControllerTest_ReturnsAllItems()
        {
            //arrange
            _context.CrewMembers.Add(new Model.Crew_Member.CrewMember { CrewMemberId = Guid.NewGuid(), Name = "JFK", Role = "Pilot", Location = "UnderTheBridge"});
            _context.CrewMembers.Add(new Model.Crew_Member.CrewMember { CrewMemberId = Guid.NewGuid(), Name = "GFK", Role = "Pilot", Location = "MyCloset"});
            await _context.SaveChangesAsync();

            var controller = new CrewMembersController(_context);

            //act
            var result = await controller.GetCrewMember();

            //Assert
            Assert.IsNotNull(result.Value);
            Assert.AreEqual(2, result.Value.Count());
        }

        [TestMethod()]
        public async Task GetCrewMember_ById_ReturnsItem_WhenExists()
        {
            // Arrange
            var id = Guid.NewGuid();
            _context.CrewMembers.Add(new Model.Crew_Member.CrewMember { CrewMemberId = id, Name = "JFK", Role = "Pilot", Location = "UnderTheBridge" });
            await _context.SaveChangesAsync();

            var controller = new CrewMembersController(_context);

            // Act
            var result = await controller.GetCrewMember(id);

            // Assert
            Assert.IsNotNull(result.Value);
            Assert.AreEqual(id, result.Value.CrewMemberId);
        }

        [TestMethod()]
        public async Task GetCrewMember_ById_ReturnsNotFound_WhenMissing()
        {
            // Arrange
            var controller = new CrewMembersController(_context);

            // Act
            var result = await controller.GetCrewMember(Guid.NewGuid());

            // Assert
            Assert.IsInstanceOfType(result.Result, typeof(NotFoundResult));
        }

        [TestMethod()]
        public async Task PutCrewMember_UpdatesItem_WhenValid()
        {
            // Arrange
            var id = Guid.NewGuid();
            _context.CrewMembers.Add(new Model.Crew_Member.CrewMember { CrewMemberId = id, Name = "JFK", Role = "Pilot", Location = "UnderTheBridge" });
            await _context.SaveChangesAsync();

            _context.ChangeTracker.Clear();

            var controller = new CrewMembersController(_context);

            var modifiedCrewMember = new CrewMember { CrewMemberId = id, Name = "NewType", Role = "NewType", Location = "NewLoc" };

            // Act
            var result = await controller.PutCrewMember(id, modifiedCrewMember);

            // Assert
            Assert.IsInstanceOfType(result, typeof(NoContentResult));

            var dbCrewMember = await _context.CrewMembers.FindAsync(id);
            Assert.AreEqual("NewType", dbCrewMember.Name);
            Assert.AreEqual("NewType", dbCrewMember.Role);
            Assert.AreEqual("NewLoc", dbCrewMember.Location);
        }

        [TestMethod()]
        public async Task PutCrewMember_ReturnsBadRequest_IfIdsDoNotMatch()
        {
            // Arrange
            var controller = new CrewMembersController(_context);
            var CrewMember = new CrewMember { CrewMemberId = Guid.NewGuid() };

            // Act
            var result = await controller.PutCrewMember(Guid.NewGuid(), CrewMember);

            // Assert
            Assert.IsInstanceOfType(result, typeof(BadRequestResult));
        }

        [TestMethod()]
        public async Task PutCrewMember_ReturnsNotFound_WhenIdDoesNotExist()
        {
            // Arrange
            var controller = new CrewMembersController(_context);
            var randomId = Guid.NewGuid();
            var CrewMember = new CrewMember { CrewMemberId = randomId, Name = "GhostCrewMember" };

            // Act
            var result = await controller.PutCrewMember(randomId, CrewMember);

            // Assert
            Assert.IsInstanceOfType(result, typeof(NotFoundResult));
        }


        //POST TESTS

        [TestMethod()]
        public async Task PostCrewMember_AddsItemToDatabase()
        {
            // Arrange
            var controller = new CrewMembersController(_context);
            var newCrewMember = new CrewMember { Name = "JFK", Role = "Pilot", Location = "UnderTheBridge" };

            // Act
            var result = await controller.PostCrewMember(newCrewMember);

            // Assert
            Assert.IsInstanceOfType(result.Result, typeof(CreatedAtActionResult));

            var dbCrewMember = await _context.CrewMembers.FirstOrDefaultAsync(a => a.Name == "JFK");
            Assert.IsNotNull(dbCrewMember);
            Assert.AreEqual("UnderTheBridge", dbCrewMember.Location);
        }



        [TestMethod()]
        public async Task DeleteCrewMember_RemovesItem()
        {
            // Arrange
            var id = Guid.NewGuid();
            _context.CrewMembers.Add(new Model.Crew_Member.CrewMember { CrewMemberId = id, Name = "JFK", Role = "Pilot", Location = "DeleteMe" });
            await _context.SaveChangesAsync();

            var controller = new CrewMembersController(_context);

            // Act
            var result = await controller.DeleteCrewMember(id);

            // Assert
            Assert.IsInstanceOfType(result, typeof(NoContentResult));

            Assert.AreEqual(0, _context.CrewMembers.Count());
        }
        [TestMethod()]
        public async Task DeleteCrewMember_ReturnsNotFound_WhenMissing()
        {
            // Arrange
            var controller = new CrewMembersController(_context);
            var randomId = Guid.NewGuid();

            // Act
            var result = await controller.DeleteCrewMember(randomId);

            // Assert
            Assert.IsInstanceOfType(result, typeof(NotFoundResult));
        }
    }
}