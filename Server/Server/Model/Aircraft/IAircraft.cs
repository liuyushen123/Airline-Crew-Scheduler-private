namespace Server.Model.Aircraft
{
    public interface IAircraft
    {
        Guid AircraftID { get; set; }
        string AircraftType { get; set; } 
        int MaxCapacity { get; set; }
        string CurrentLocation { get; set; }
    }
}
