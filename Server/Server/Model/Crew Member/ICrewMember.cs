namespace Server.Model.Crew;

public interface ICrewMember
{
    Guid CrewMemberId { get; set; }
    string Name { get; set; }
    string Role { get; set; }
    string Location { get; set; }
}
    