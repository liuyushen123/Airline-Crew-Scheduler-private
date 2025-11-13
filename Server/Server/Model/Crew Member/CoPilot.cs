public class Copilot : ICrewMember
{
    public int CrewMemberID { get; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Role { get; set; } = "Co-Pilot";
    public string Location { get; set; }
}