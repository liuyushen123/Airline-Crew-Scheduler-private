import axios from 'axios';
//@ts-ignore
import { Aircraft, CommercialFlight, CrewMember, FlightCrew } from './types/types';

const api = axios.create({
    baseURL: 'https://localhost:7241/api/',
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000,
});

export const aircraftService = {
  getAircrafts: () => api.get('/Aircraft'),
  getAircraftById: (id: string) => api.get(`/Aircraft/${id}`),
  updateAircraft: (id: string, data: Aircraft) => api.put(`/Aircraft/${id}`, data),
  createAircraft: (data: Aircraft) => api.post('/Aircraft', data),
  deleteAircraft: (id: string) => api.delete(`/Aircraft/${id}`),
};

export const commercialFlightService = {
  getCommercialFlights: () => api.get('/CommercialFlight'),
  getCommercialFlightById: (id: string) => api.get(`/CommercialFlight/${id}`),
  updateCommercialFlight: (id: string, data: CommercialFlight) => api.put(`/CommercialFlight/${id}`, data),
  createCommercialFlight: (data: CommercialFlight) => api.post('/CommercialFlight', data),
  deleteCommercialFlight: (id: string) => api.delete(`/CommercialFlight/${id}`),
};

export const crewMemberService = {
  getCrewMembers: () => api.get('/CrewMember'),
  getCrewMemberById: (id: string) => api.get(`/CrewMember/${id}`),
  updateCrewMember: (id: string, data: CrewMember) => api.put(`/CrewMember/${id}`, data),
  createCrewMember: (data: CrewMember) => api.post('/CrewMember', data),
  deleteCrewMember: (id: string) => api.delete(`/CrewMember/${id}`),
};

export const flightCrewService = {
  getFlightCrews: () => api.get('/FlightCrews'),
  getFlightCrewById: (id: string) => api.get(`/FlightCrews/${id}`),
  updateFlightCrew: (id: string, data: FlightCrew) => api.put(`/FlightCrews/${id}`, data),
  createFlightCrew: (data: FlightCrew) => api.post('/FlightCrews', data),
  deleteFlightCrew: (id: string) => api.delete(`/FlightCrews/${id}`),
};

export default api;