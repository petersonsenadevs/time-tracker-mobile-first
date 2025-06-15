
import { apiClient } from './api';

export interface HourWorked {
  normal_hours: string;
  overtime_hours: string;
  night_hours: string;
  holiday_hours: string;
}

export interface WorkSession {
  date: string;
  start_time: string;
  end_time: string;
  planned_hours: number;
  work_type: string;
  hour_worked: HourWorked;
}

export interface WorkSessionResponse {
  hour_session_with_hour_worked: WorkSession[];
}

class WorkSessionService {
  async getWorkSessions(date: string, token: string): Promise<WorkSessionResponse> {
    // La fecha ya viene en formato yyyy-mm-dd desde el componente
    return apiClient.getWithAuth<WorkSessionResponse>(`/api/session_worked?date=${date}`, token);
  }
}

export const workSessionService = new WorkSessionService();
