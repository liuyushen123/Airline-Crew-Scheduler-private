public interface ICrewMember
{
    int CrewMemberID { get; }
    string FirstName { get; set; }
    string LastName { get; set; }
    string Role { get; set; }
    string Location { get; set; }
}
    