public class CoPilot : ICrewMember
{
    public int CrewMemberID { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Role { get; set; } = "First Officer";
    public string BaseAirport { get; set; }
    public string Qualification { get; set; }
}