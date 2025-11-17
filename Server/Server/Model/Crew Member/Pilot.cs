namespace Server.Model.Crew;

public class Pilot : ICrewMember
{
    public int CrewMemberID { get; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Role { get; set; } = "Pilot";
    public string Location { get; set; }
}