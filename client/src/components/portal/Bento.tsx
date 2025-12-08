import { aircraftService, commercialFlightService, crewMemberService, flightCrewService } from "../../apiService";
import { useState, useEffect } from "react";
import type { Aircraft } from "../../types/Aircraft";
import type { CommercialFlight } from "../../types/CommercialFlight";
import type { CrewMember } from "../../types/CrewMember";

import AircraftCell from "./cells/AircraftCell";
import CrewCell from "./cells/CrewCell"; 
import FlightCell from "./cells/FlightCell";

export default function Bento({ searchTerm }: { searchTerm: 'crew' | 'flight' | 'aircraft' }) {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const config = {
    crew: {
      fetch: crewMemberService.getCrewMembers,
      component: CrewCell, 
    },flight: {
    
      fetch: commercialFlightService.getCommercialFlights,
      component: FlightCell,
    },
    aircraft: {
      fetch: aircraftService.getAircrafts,
      component: AircraftCell,
    },
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      
      const fetchFn = config[searchTerm].fetch;

      try {
        const response = await fetchFn();
        console.log(`${searchTerm} data:`, response.data);
        setData(response.data);
      } catch (error) {
        console.error(`Error fetching ${searchTerm}:`, error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [searchTerm]);

  const ActiveComponent = config[searchTerm].component;


  const handleUpdate = (data: Aircraft | CrewMember | CommercialFlight) => void {
    
  }

  return (
    <div className="h-full w-full overflow-y-auto">
      {loading ? (
        <div className="flex justify-center p-10">Loading {searchTerm}...</div>
      ) : (
        <div className="flex flex-col gap-2">
          <h2 className="text-xl font-bold mb-4 capitalize">
            {searchTerm} Data
          </h2>
          {data.map((item, index) => (
            <ActiveComponent key={item.id || index} data={item} onUpdate={handleUpdate} />
          ))}
        </div>
      )}
    </div>
  );
}