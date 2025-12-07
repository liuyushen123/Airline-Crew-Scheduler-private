import type { CommercialFlight } from './CommercialFlight';

export interface Aircraft {
  aircraftId: string;
  aircraftType: string;
  maxCapacity: number;
  currentLocation: string;
  
  flights?: CommercialFlight[]; 
}