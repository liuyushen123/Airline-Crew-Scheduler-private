using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Server.Controller;
using Server.Model;
using Server.Model.Aircraft;
using Server.Model.Database;
using Server.Model.Flight;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Server.Controller.Testing
{
    [TestClass()]
    public class CommercialFlightsControllerTests
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

        private async Task<Guid> CreateTestAircraft()
        {
            var planeId = Guid.NewGuid();
            _context.Aircrafts.Add(new Aircraft
            {
                AircraftID = planeId,
                AircraftType = "test",
                CurrentLocation = "Home"
            });
            await _context.SaveChangesAsync();
            return planeId;
        }


        [TestMethod]
        public async Task GetCommercialFlights_ReturnsAllItems()
        {
            // Arrange
            var planeId = await CreateTestAircraft();

            _context.Flights.Add(new CommercialFlight { AircraftId = planeId, Origin = "A", Destination = "B" });
            _context.Flights.Add(new CommercialFlight { AircraftId = planeId, Origin = "C", Destination = "D" });
            await _context.SaveChangesAsync();

            var controller = new CommercialFlightsController(_context);

            // Act
            var result = await controller.GetCommercialFlights();

            // Assert
            Assert.IsNotNull(result.Value);
            Assert.AreEqual(2, result.Value.Count());
        }

        [TestMethod]
        public async Task GetCommercialFlight_ById_ReturnsItem_WhenExists()
        {
            // Arrange
            var planeId = await CreateTestAircraft();
            var flightId = Guid.NewGuid();

            _context.Flights.Add(new CommercialFlight
            {
                FlightGuid = flightId,
                AircraftId = planeId,
                Origin = "OMA",
                Destination = "DEN"
            });
            await _context.SaveChangesAsync();

            var controller = new CommercialFlightsController(_context);

            // Act
            var result = await controller.GetCommercialFlight(flightId);

            // Assert
            Assert.IsNotNull(result.Value);
            Assert.AreEqual("OMA", result.Value.Origin);
        }

        [TestMethod]
        public async Task GetCommercialFlight_ById_ReturnsNotFound_WhenMissing()
        {
            // Arrange
            var controller = new CommercialFlightsController(_context);

            // Act
            var result = await controller.GetCommercialFlight(Guid.NewGuid());

            // Assert
            Assert.IsInstanceOfType(result.Result, typeof(NotFoundResult));
        }

        [TestMethod]
        public async Task PostCommercialFlight_AddsItemToDatabase()
        {
            // Arrange
            var planeId = await CreateTestAircraft();
            var controller = new CommercialFlightsController(_context);

            var newFlight = new CommercialFlight
            {
                AircraftId = planeId,
                Origin = "JFK",
                Destination = "LHR",
                SchedTakeoff = DateTime.Now.AddDays(1)
            };

            // Act
            var result = await controller.PostCommercialFlight(newFlight);

            // Assert
            Assert.IsInstanceOfType(result.Result, typeof(CreatedAtActionResult));

            var dbFlight = await _context.Flights.FirstOrDefaultAsync(f => f.Origin == "JFK");
            Assert.IsNotNull(dbFlight);
            Assert.AreEqual("LHR", dbFlight.Destination);
        }

        [TestMethod]
        public async Task PutCommercialFlight_UpdatesItem_WhenValid()
        {
            // Arrange
            var planeId = await CreateTestAircraft();
            var flightId = Guid.NewGuid();

            _context.Flights.Add(new CommercialFlight
            {
                FlightGuid = flightId,
                AircraftId = planeId,
                Origin = "OldOrigin",
                Destination = "OldDest"
            });
            await _context.SaveChangesAsync();

            _context.ChangeTracker.Clear();

            var controller = new CommercialFlightsController(_context);

            var modifiedFlight = new CommercialFlight
            {
                FlightGuid = flightId,
                AircraftId = planeId,
                Origin = "NewOrigin", 
                Destination = "NewDest"
            };

            // Act
            var result = await controller.PutCommercialFlight(flightId, modifiedFlight);

            // Assert
            Assert.IsInstanceOfType(result, typeof(NoContentResult));

            var dbFlight = await _context.Flights.FindAsync(flightId);
            Assert.AreEqual("NewOrigin", dbFlight.Origin);
        }

        [TestMethod]
        public async Task PutCommercialFlight_ReturnsBadRequest_IfIdsDoNotMatch()
        {
            // Arrange
            var controller = new CommercialFlightsController(_context);
            var flight = new CommercialFlight { FlightGuid = Guid.NewGuid() };

            // Act
            var result = await controller.PutCommercialFlight(Guid.NewGuid(), flight);

            // Assert
            Assert.IsInstanceOfType(result, typeof(BadRequestResult));
        }

        [TestMethod]
        public async Task PutCommercialFlight_ReturnsNotFound_WhenIdDoesNotExist()
        {
            // Arrange
            var controller = new CommercialFlightsController(_context);
            var randomId = Guid.NewGuid();

            // We need a valid object structure, but the ID won't match DB
            var flight = new CommercialFlight { FlightGuid = randomId, Origin = "Ghost", Destination = "Town" };

            // Act
            var result = await controller.PutCommercialFlight(randomId, flight);

            // Assert
            Assert.IsInstanceOfType(result, typeof(NotFoundResult));
        }

        // --- DELETE TESTS ---

        [TestMethod]
        public async Task DeleteCommercialFlight_RemovesItem()
        {
            // Arrange
            var planeId = await CreateTestAircraft();
            var flightId = Guid.NewGuid();

            _context.Flights.Add(new CommercialFlight
            {
                FlightGuid = flightId,
                AircraftId = planeId,
                Origin = "Delete",
                Destination = "Me"
            });
            await _context.SaveChangesAsync();

            var controller = new CommercialFlightsController(_context);

            // Act
            var result = await controller.DeleteCommercialFlight(flightId);

            // Assert
            Assert.IsInstanceOfType(result, typeof(NoContentResult));
            Assert.AreEqual(0, _context.Flights.Count());
        }

        [TestMethod]
        public async Task DeleteCommercialFlight_ReturnsNotFound_WhenIdDoesNotExist()
        {
            // Arrange
            var controller = new CommercialFlightsController(_context);

            // Act
            var result = await controller.DeleteCommercialFlight(Guid.NewGuid());

            // Assert
            Assert.IsInstanceOfType(result, typeof(NotFoundResult));
        }
    }
}