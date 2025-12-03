
export interface Aircraft {
  aircraftId: string;
  aircraftType: string;
  maxCapacity: number;
  currentLocation: string;
  
  flights?: CommercialFlight[]; 
}

export interface CrewMember {
  crewMemberId: string;
  name: string;
  role: string;
  location: string;

  jobHistory?: FlightCrew[]; 
}

export interface FlightCrew {
  flightId: string;
  
  flight?: CommercialFlight;

  crewMemberId: string;
  
  crewMember?: CrewMember;

  roleOnFlight: string;
}

export interface CommercialFlight {
  flightGuid: string;
  aircraftId: string;

  plane?: Aircraft;

  origin: string;
  destination: string;

  estTouchdown: string | null;
  actTouchdown: string | null;
  schedTouchdown: string | null;

  estTakeoff: string | null;
  actTakeoff: string | null;
  schedTakeoff: string | null;

  crewAssignments?: FlightCrew[];
}