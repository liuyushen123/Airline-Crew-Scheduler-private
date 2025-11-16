namespace Server.Model.Aircraft
{
    public class Aircraft : IAircraft
    {
        public int AircraftID { get; set; }
        public string AircraftType { get; set; }
        public int MaxCapacity { get; set; }
        public string CurrentLocation { get; set; }
    }
}
