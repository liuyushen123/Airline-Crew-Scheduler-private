using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Server.Controller;
using Server.Model.Aircraft;
using Server.Model.Database;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Server.Controller.Testing
{
    [TestClass()]
    public class AircraftControllerTests
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
        public async Task GetAircraft_ReturnsAllItems()
        {
            //arrange
            _context.Aircrafts.Add(new Model.Aircraft.Aircraft { AircraftType = "A1", CurrentLocation = "JFK" });
            _context.Aircrafts.Add(new Model.Aircraft.Aircraft { AircraftType = "B1", CurrentLocation = "GFK" });
            await _context.SaveChangesAsync();

            var controller = new AircraftController(_context);

            //act
            var result = await controller.GetAircraft();

            //Assert
            Assert.IsNotNull(result.Value);
            Assert.AreEqual(2, result.Value.Count());
        }

        [TestMethod()]
        public async Task GetAircraft_ById_ReturnsItem_WhenExists()
        {
            // Arrange
            var id = Guid.NewGuid();
            _context.Aircrafts.Add(new Aircraft { AircraftID = id, AircraftType = "Cessna", CurrentLocation = "OMA" });
            await _context.SaveChangesAsync();

            var controller = new AircraftController(_context);

            // Act
            var result = await controller.GetAircraft(id);

            // Assert
            Assert.IsNotNull(result.Value);
            Assert.AreEqual("Cessna", result.Value.AircraftType);
        }

        [TestMethod]
        public async Task GetAircraft_ById_ReturnsNotFound_WhenMissing()
        {
            // Arrange
            var controller = new AircraftController(_context);

            // Act
            var result = await controller.GetAircraft(Guid.NewGuid());

            // Assert
            Assert.IsInstanceOfType(result.Result, typeof(NotFoundResult));
        }

        //PUT TESTS

        [TestMethod()]
        public async Task PutAircraft_UpdatesItem_WhenValid()
        {
            // Arrange
            var id = Guid.NewGuid();
            _context.Aircrafts.Add(new Aircraft { AircraftID = id, AircraftType = "OldType", CurrentLocation = "OldLoc" });
            await _context.SaveChangesAsync();

            _context.ChangeTracker.Clear();

            var controller = new AircraftController(_context);

            var modifiedPlane = new Aircraft { AircraftID = id, AircraftType = "NewType", CurrentLocation = "NewLoc" };

            // Act
            var result = await controller.PutAircraft(id, modifiedPlane);

            // Assert
            Assert.IsInstanceOfType(result, typeof(NoContentResult)); 

            var dbPlane = await _context.Aircrafts.FindAsync(id);
            Assert.AreEqual("NewType", dbPlane.AircraftType);
        }

        [TestMethod()]
        public async Task PutAircraft_ReturnsBadRequest_IfIdsDoNotMatch()
        {
            // Arrange
            var controller = new AircraftController(_context);
            var plane = new Aircraft { AircraftID = Guid.NewGuid() };

            // Act
            var result = await controller.PutAircraft(Guid.NewGuid(), plane);

            // Assert
            Assert.IsInstanceOfType(result, typeof(BadRequestResult));
        }

        [TestMethod]
        public async Task PutAircraft_ReturnsNotFound_WhenIdDoesNotExist()
        {
            // Arrange
            var controller = new AircraftController(_context);
            var randomId = Guid.NewGuid();
            var plane = new Aircraft { AircraftID = randomId, AircraftType = "GhostPlane" };

            // Act
            var result = await controller.PutAircraft(randomId, plane);

            // Assert
            Assert.IsInstanceOfType(result, typeof(NotFoundResult));
        }

        //POST TESTS

        [TestMethod()]
        public async Task PostAircraft_AddsItemToDatabase()
        {
            // Arrange
            var controller = new AircraftController(_context);
            var newPlane = new Aircraft { AircraftType = "TestJet", MaxCapacity = 10, CurrentLocation = "TestLoc" };

            // Act
            var result = await controller.PostAircraft(newPlane);

            // Assert
            Assert.IsInstanceOfType(result.Result, typeof(CreatedAtActionResult));

            var dbPlane = await _context.Aircrafts.FirstOrDefaultAsync(a => a.AircraftType == "TestJet");
            Assert.IsNotNull(dbPlane);
            Assert.AreEqual("TestLoc", dbPlane.CurrentLocation);
        }

        //DELETE TEST

        [TestMethod()]
        public async Task DeleteAircraft_RemovesItem()
        {
            // Arrange
            var id = Guid.NewGuid();
            _context.Aircrafts.Add(new Aircraft { AircraftID = id, AircraftType = "DeleteMe" });
            await _context.SaveChangesAsync();

            var controller = new AircraftController(_context);

            // Act
            var result = await controller.DeleteAircraft(id);

            // Assert
            Assert.IsInstanceOfType(result, typeof(NoContentResult));

            Assert.AreEqual(0, _context.Aircrafts.Count());
        }
        [TestMethod()]
        public async Task DeleteAircraft_ReturnsNotFound_WhenMissing()
        {
            // Arrange
            var controller = new AircraftController(_context);
            var randomId = Guid.NewGuid();

            // Act
            var result = await controller.DeleteAircraft(randomId);

            // Assert
            Assert.IsInstanceOfType(result, typeof(NotFoundResult));
        }
    }
}