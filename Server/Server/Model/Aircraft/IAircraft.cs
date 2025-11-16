namespace Server.Model.Aircraft
{
    public interface IAircraft
    {
        int AircraftID { get;}
        string AircraftType { get;}
        int MaxCapacity { get; }
        string CurrentLocation { get; set; }
    }
}
