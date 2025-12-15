import { aircraftService, commercialFlightService, crewMemberService } from "../../apiService";
import { useState, useEffect } from "react";

import AircraftCell from "./cells/AircraftCell";
import CrewCell from "./cells/CrewCell"; 
import FlightCell from "./cells/FlightCell";

interface Props {
  searchTerm: 'crew' | 'flight' | 'aircraft';
  refreshTrigger: number;
  onEdit: (item: any) => void;
  onDelete: (id: string) => void;
}

export default function Bento({ searchTerm, refreshTrigger, onEdit, onDelete }: Props) {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const config = {
    crew: {
      fetch: crewMemberService.getCrewMembers,
      component: CrewCell, 
    },
    flight: {
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
      setData([]); 
      setLoading(true);
      
      const fetchFn = config[searchTerm].fetch;

      try {
        const response = await fetchFn();
        setData(response.data);
      } catch (error) {
        console.error(`Error fetching ${searchTerm}:`, error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [searchTerm, refreshTrigger]);

  const ActiveComponent = config[searchTerm].component;

  return (
    <div className="h-full w-full overflow-y-auto p-4 sm:p-5 rounded-xl border border-bg-faded/70 bg-bg-primary/95 shadow-sm">
      {loading ? (
        <div className="flex justify-center p-10 text-fg-faded font-medium">
          Loading {searchTerm}...
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {data.map((item, index) => (
              <ActiveComponent 
                key={index}
                data={item}
                onUpdate={() => onEdit(item)}
                onDelete={() => onDelete(item.aircraftID || item.flightGuid || item.crewMemberId)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
