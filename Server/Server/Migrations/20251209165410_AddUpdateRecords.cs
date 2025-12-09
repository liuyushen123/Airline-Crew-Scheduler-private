using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Server.Migrations
{
    /// <inheritdoc />
    public partial class AddUpdateRecords : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_FlightCrew_CrewMember_CrewMemberId",
                table: "FlightCrew");

            migrationBuilder.DropForeignKey(
                name: "FK_Flights_Aircraft_AircraftId",
                table: "Flights");

            migrationBuilder.DropPrimaryKey(
                name: "PK_CrewMember",
                table: "CrewMember");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Aircraft",
                table: "Aircraft");

            migrationBuilder.RenameTable(
                name: "CrewMember",
                newName: "CrewMembers");

            migrationBuilder.RenameTable(
                name: "Aircraft",
                newName: "Aircrafts");

            migrationBuilder.AddPrimaryKey(
                name: "PK_CrewMembers",
                table: "CrewMembers",
                column: "CrewMemberId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Aircrafts",
                table: "Aircrafts",
                column: "AircraftID");

            migrationBuilder.CreateTable(
                name: "UpdateRecords",
                columns: table => new
                {
                    UpdateId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    UpdateTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    EntityName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    EntityId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    UpdateType = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    User = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UpdateRecords", x => x.UpdateId);
                });

            migrationBuilder.AddForeignKey(
                name: "FK_FlightCrew_CrewMembers_CrewMemberId",
                table: "FlightCrew",
                column: "CrewMemberId",
                principalTable: "CrewMembers",
                principalColumn: "CrewMemberId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Flights_Aircrafts_AircraftId",
                table: "Flights",
                column: "AircraftId",
                principalTable: "Aircrafts",
                principalColumn: "AircraftID",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_FlightCrew_CrewMembers_CrewMemberId",
                table: "FlightCrew");

            migrationBuilder.DropForeignKey(
                name: "FK_Flights_Aircrafts_AircraftId",
                table: "Flights");

            migrationBuilder.DropTable(
                name: "UpdateRecords");

            migrationBuilder.DropPrimaryKey(
                name: "PK_CrewMembers",
                table: "CrewMembers");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Aircrafts",
                table: "Aircrafts");

            migrationBuilder.RenameTable(
                name: "CrewMembers",
                newName: "CrewMember");

            migrationBuilder.RenameTable(
                name: "Aircrafts",
                newName: "Aircraft");

            migrationBuilder.AddPrimaryKey(
                name: "PK_CrewMember",
                table: "CrewMember",
                column: "CrewMemberId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Aircraft",
                table: "Aircraft",
                column: "AircraftID");

            migrationBuilder.AddForeignKey(
                name: "FK_FlightCrew_CrewMember_CrewMemberId",
                table: "FlightCrew",
                column: "CrewMemberId",
                principalTable: "CrewMember",
                principalColumn: "CrewMemberId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Flights_Aircraft_AircraftId",
                table: "Flights",
                column: "AircraftId",
                principalTable: "Aircraft",
                principalColumn: "AircraftID",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
