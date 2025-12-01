export interface Flight {
  id: string;
  flightNumber: string;
  origin: string;
  destination: string;
  departureTime: string;
  status: 'On Time' | 'Delayed' | 'Boarding' | 'Departed';
  gate: string;
}