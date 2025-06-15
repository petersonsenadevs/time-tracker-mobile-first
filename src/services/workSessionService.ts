
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
  async getWorkSession(token: string, date: Date): Promise<WorkSessionResponse> {
    const formattedDate = date.toISOString().slice(0, 10).replace(/-/g, '');
    console.log('Fetching work session for date:', formattedDate);
    
    const response = await apiClient.getWithAuth<WorkSessionResponse>(
      `/api/session_worked?date=${formattedDate}`,
      token
    );
    
    console.log('Work session response:', response);
    return response;
  }
}

export const workSessionService = new WorkSessionService();
