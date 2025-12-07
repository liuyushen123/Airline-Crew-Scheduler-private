import type { Aircraft } from './Aircraft';
import type { FlightCrew } from './FlightCrew';

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