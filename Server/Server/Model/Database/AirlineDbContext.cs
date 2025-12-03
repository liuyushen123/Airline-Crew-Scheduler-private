using Microsoft.EntityFrameworkCore;
using Server.Model.Aircraft;
using Server.Model.Crew_Member;
using Server.Model.Flight;
using Server.Model.Flight_Crew;


namespace Server.Model.Database
{
    public class AirlineDbContext : DbContext
    {
        public AirlineDbContext(DbContextOptions<AirlineDbContext> options): base(options)
        {
        }

        public DbSet <CommercialFlight> Flights { get; set; }
        public DbSet <Aircraft.Aircraft> Aircraft { get; set; }
        public DbSet <CrewMember> CrewMember { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Configure the Many-to-Many Bridge Table
            modelBuilder.Entity<FlightCrew>(entity =>
            {
                // define the Composite Primary Key
                entity.HasKey(fc => new { fc.FlightId, fc.CrewMemberId });

                // Connect to Flight
                entity.HasOne(fc => fc.Flight)
                      .WithMany(f => f.CrewAssignments)
                      .HasForeignKey(fc => fc.FlightId);

                // Connect to CrewMember
                entity.HasOne(fc => fc.CrewMember)
                      .WithMany(c => c.JobHistory)
                      .HasForeignKey(fc => fc.CrewMemberId);
            });

            // Standard defaults
            modelBuilder.Entity<Aircraft.Aircraft>()
                .Property(a => a.AircraftID).HasDefaultValueSql("NEWID()");
        }

    }
}
