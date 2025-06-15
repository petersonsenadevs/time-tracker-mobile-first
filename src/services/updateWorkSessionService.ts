
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
    return apiClient.putWithAuth<UpdateHourSessionResponse>(`/api/hour_session?date=${originalDate}`, data, token);
  }
}

export const updateWorkSessionService = new UpdateWorkSessionService();
