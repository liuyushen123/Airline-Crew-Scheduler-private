import type { CommercialFlight } from './CommercialFlight';
import type { CrewMember } from './CrewMember';

export interface FlightCrew {
  flightId: string;
  
  flight?: CommercialFlight;

  crewMemberId: string;
  
  crewMember?: CrewMember;

  roleOnFlight: string;
}