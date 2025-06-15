
import { apiClient } from './api';

export interface UpdateHourSessionData {
  date: string;
  start_time: string;
  end_time: string;
  planned_hours: number;
  work_type?: string;
}

export interface UpdateHourSessionResponse {
  HourSession: any;
}

class UpdateWorkSessionService {
  async updateHourSession(data: UpdateHourSessionData, originalDate: string, token: string): Promise<UpdateHourSessionResponse> {
    console.log('Service - Data being sent:', data);
    console.log('Service - Original date for query:', originalDate);
    
    // Asegurar que los datos se envíen en el formato correcto
    const requestData = {
      date: data.date,
      start_time: data.start_time,
      end_time: data.end_time,
      planned_hours: data.planned_hours,
      work_type: data.work_type || 'is_normal'
    };
    
    console.log('Service - Request data formatted:', requestData);
    
    return apiClient.putWithAuth<UpdateHourSessionResponse>(`/api/hour_session?date=${originalDate}`, requestData, token);
  }
}

export const updateWorkSessionService = new UpdateWorkSessionService();
