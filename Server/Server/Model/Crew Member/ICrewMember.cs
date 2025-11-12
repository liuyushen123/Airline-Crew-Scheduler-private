public interface ICrewMember
{
    int CrewMemberID { get; set; }
    string FirstName { get; set; }
    string LastName { get; set; }
    string Role { get; set; }
    string BaseAirport { get; set; }
    string Qualification { get; set; }
}
    