public class FlightAttendant : ICrewMember
{
    public int CrewMemberID { get;}
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Role { get; set; } = "Flight Attendant";
    public string Location { get; set; }
}