import axios from 'axios';
import type { Aircraft } from './types/Aircraft';
import type { CommercialFlight } from './types/CommercialFlight';
import type { CrewMember } from './types/CrewMember';
import type { FlightCrew } from './types/FlightCrew';

interface FlightFormData extends Omit<CommercialFlight, 'flightGuid'> {
  captainId?: string | null;
  firstOfficerId?: string | null;
  flightAttendantIds?: string[];
  flightGuid?: string; 
}

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

const buildCrewAssignments = (data: FlightFormData) => {
  const assignments: Partial<FlightCrew>[] = [];

  if (data.captainId) {
    assignments.push({
      crewMemberId: data.captainId,
      roleOnFlight: "Captain"
    });
  }

  if (data.firstOfficerId) {
    assignments.push({
      crewMemberId: data.firstOfficerId,
      roleOnFlight: "First Officer"
    });
  }

  if (data.flightAttendantIds && data.flightAttendantIds.length > 0) {
    data.flightAttendantIds.forEach(id => {
      assignments.push({
        crewMemberId: id,
        roleOnFlight: "Flight Attendant"
      });
    });
  }

  return assignments;
};

export const aircraftService = {
  getAircrafts: () => api.get<Aircraft[]>('/aircraft'),
  getAircraftById: (id: string) => api.get<Aircraft>(`/aircraft/${id}`),
  updateAircraft: (id: string, data: Aircraft) => api.put(`/aircraft/${id}`, data),
  createAircraft: (data: Omit<Aircraft, 'aircraftId'>) => api.post('/aircraft', data),
  deleteAircraft: (id: string) => api.delete(`/aircraft/${id}`),
};

export const commercialFlightService = {
  getCommercialFlights: () => api.get<CommercialFlight[]>('/commercialflights'),
  getCommercialFlightById: (id: string) => api.get<CommercialFlight>(`/commercialflights/${id}`),
  updateCommercialFlight: (id: string, data: FlightFormData) => {
    const payload = {
      ...data,
      crewAssignments: buildCrewAssignments(data), 
    };

    delete payload.captainId;
    delete payload.firstOfficerId;
    delete payload.flightAttendantIds;

    return api.put(`/commercialflights/${id}`, payload);
  },
  createCommercialFlight: (data: FlightFormData) => {
    const payload = {
      ...data,
      crewAssignments: buildCrewAssignments(data),
    };

    delete payload.captainId;
    delete payload.firstOfficerId;
    delete payload.flightAttendantIds;

    return api.post('/commercialflights', payload);
  },
  deleteCommercialFlight: (id: string) => api.delete(`/commercialflights/${id}`),
};

export const crewMemberService = {
  getCrewMembers: () => api.get<CrewMember[]>('/crewmembers'),
  getCrewMemberById: (id: string) => api.get<CrewMember>(`/crewmembers/${id}`),
  updateCrewMember: (id: string, data: CrewMember) => api.put(`/crewmembers/${id}`, data),
  createCrewMember: (data: Omit<CrewMember, 'crewMemberId'>) => api.post('/crewmembers', data),
  deleteCrewMember: (id: string) => api.delete(`/crewmembers/${id}`),
};

export const updateRecordService = {
  getUpdateRecords: () => api.get('/updaterecords'),
}

export const crewAssignmentservice = {
  getcrewAssignments: () => api.get<FlightCrew[]>('/crewAssignments'),
  getFlightCrewById: (id: string) => api.get<FlightCrew>(`/crewAssignments/${id}`),
  createFlightCrew: (data: FlightCrew) => api.post('/crewAssignments', data),
  updateFlightCrew: (id: string, data: FlightCrew) => api.put(`/crewAssignments/${id}`, data),
  deleteFlightCrew: (id: string) => api.delete(`/crewAssignments/${id}`),
};

export default api;