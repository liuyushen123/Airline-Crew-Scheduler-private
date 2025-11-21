namespace Server.Model.Aircraft
{
    public interface IAircraft
    {
        Guid aircraftID { get;}
        string aircraftType { get;}
        int maxCapacity { get; }
        string currentLocation { get; set; }
    }
}
