using System;

namespace Server.Model.Update
{
    public class FlightUpdate : IUpdateRecord
    {
        public int UpdateId { get; set; }
        public DateTime UpdateTime { get; set; }
        public string UpdateType { get; set; }
        public string Description { get; set; }

        
        public string FlightNumber { get; set; }
        public string Origin { get; set; }
        public string Destination { get; set; }

        public DateTime ScheduledTakeoff { get; set; }
        public DateTime? EstimatedTakeoff { get; set; }
        public DateTime? ActualTakeoff { get; set; }

        public string WeatherCondition { get; set; }
        public int WeatherDelayMinutes { get; set; }
        public DateTime? FinalArrivalEstimate { get; set; }
        public string Status { get; set; }

       
        
    }
}
