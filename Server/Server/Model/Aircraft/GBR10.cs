namespace Server.Model.Aircraft
{
    public class GBR10 : IAircraft
    {
        public Guid aircraftID { get; }
        public string aircraftType { get; }
        public int maxCapacity { get; }
        public string currentLocation { get; set; }
        public GBR10()
        {
            aircraftID = Guid.NewGuid();
            maxCapacity = 45;
            aircraftType = "GBR-10";
            currentLocation = string.Empty;
        }
    }
}
