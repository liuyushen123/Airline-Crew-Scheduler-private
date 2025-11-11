namespace Server.Model.Aircraft
{
    public interface IAircraft
    {
        Guid aircraftID { get;}
        string aircraftType { get;}
        int maxCapacity { get; }

    }

    public class GBR10 : IAircraft
    {
        public Guid aircraftID { get; }
        public string aircraftType { get; }
        public int maxCapacity { get; }

        public GBR10() 
        {
            aircraftID = Guid.NewGuid();
            maxCapacity = 45;
            aircraftType = "GBR-10";
        
        }
    }

    public class NU150 : IAircraft
    {
        public Guid aircraftID { get; }
        public string aircraftType { get; }
        public int maxCapacity { get; }

        public NU150()
        {
            aircraftID = Guid.NewGuid();
            maxCapacity = 75;
            aircraftType = "NU-150";

        }
    }


}
