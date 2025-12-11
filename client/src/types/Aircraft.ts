import type { CommercialFlight } from './CommercialFlight';

export interface Aircraft {
  aircraftID: string;
  aircraftType: string;
  maxCapacity: number;
  currentLocation: string;
  
  flights?: CommercialFlight[]; 
}