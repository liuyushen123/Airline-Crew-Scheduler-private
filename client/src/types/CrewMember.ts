import type { FlightCrew } from './FlightCrew';

export interface CrewMember {
  crewMemberId: string;
  name: string;
  role: string;
  location: string;

  jobHistory?: FlightCrew[]; 
}