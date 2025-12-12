import axios from 'axios';
import type { Aircraft } from './types/Aircraft';
import type { CommercialFlight } from './types/CommercialFlight';
import type { CrewMember } from './types/CrewMember';
import type { FlightCrew } from './types/FlightCrew';

const api = axios.create({
    baseURL: '/api',
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000,
});

export const aircraftService = {
  getAircrafts: () => api.get('/aircraft'),
  getAircraftById: (id: string) => api.get(`/aircraft/${id}`),
  updateAircraft: (id: string, data: Aircraft) => api.put(`/aircraft/${id}`, data),
  createAircraft: (data: Omit<Aircraft, 'aircraftId'>) => api.post('/aircraft', data),
  deleteAircraft: (id: string) => api.delete(`/aircraft/${id}`),
};

export const commercialFlightService = {
  getCommercialFlights: () => api.get('/commercialflights'),
  getCommercialFlightById: (id: string) => api.get(`/commercialflights/${id}`),
  updateCommercialFlight: (id: string, data: CommercialFlight) => api.put(`/commercialflights/${id}`, data),
  createCommercialFlight: (data: Omit<CommercialFlight, 'flightGuid'>) => api.post('/commercialflights', data),
  deleteCommercialFlight: (id: string) => api.delete(`/commercialflights/${id}`),
};

export const crewMemberService = {
  getCrewMembers: () => api.get('/crewmembers'),
  getCrewMemberById: (id: string) => api.get(`/crewmembers/${id}`),
  updateCrewMember: (id: string, data: CrewMember) => api.put(`/crewmembers/${id}`, data),
  createCrewMember: (data: Omit<CrewMember, 'crewMemberId'>) => api.post('/crewmembers', data),
  deleteCrewMember: (id: string) => api.delete(`/crewmembers/${id}`),
};

export const updateRecordService = {
  getUpdateRecords: () => api.get('/updaterecords'),
}

export const flightCrewService = {
  getFlightCrews: () => api.get('/flightcrews'),
  getFlightCrewById: (id: string) => api.get(`/flightcrews/${id}`),
  updateFlightCrew: (id: string, data: FlightCrew) => api.put(`/flightcrews/${id}`, data),
  deleteFlightCrew: (id: string) => api.delete(`/flightcrews/${id}`),
};

export function testApi() {
  aircraftService.getAircrafts().then(response => {
    console.log('Aircrafts:', response.data);
  }).catch(error => {
    console.error('Error fetching aircrafts:', error);
  });

  crewMemberService.getCrewMembers().then(response => {
    console.log('Crew Members:', response.data);
  }).catch(error => {
    console.error('Error fetching crew members:', error);
  });

  commercialFlightService.getCommercialFlights().then(response => {
    console.log('Commercial Flights:', response.data);
  }).catch(error => {
    console.error('Error fetching commercial flights:', error);
  });

  flightCrewService.getFlightCrews().then(response => {
    console.log('Flight Crews:', response.data);
  }).catch(error => {
    console.error('Error fetching flight crews:', error);
  });
}

export default api;