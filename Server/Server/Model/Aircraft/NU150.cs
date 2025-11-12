namespace Server.Model.Aircraft
{
    public class NU150 : IAircraft
    {
        public Guid aircraftID { get; }
        public string aircraftType { get; }
        public int maxCapacity { get; }
        public string currentLocation { get; set; }
        public NU150()
        {
            aircraftID = Guid.NewGuid();
            maxCapacity = 75;
            aircraftType = "NU-150";
            currentLocation = string.Empty;

        }
    }
}
