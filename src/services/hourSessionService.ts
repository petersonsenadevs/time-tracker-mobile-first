
import { apiClient } from './api';

export interface HourSessionData {
  date: string; // formato YYYY-MM-DD
  start_time: string; // formato H:i (ej: "09:00")
  end_time: string; // formato H:i (ej: "17:00")
  planned_hours: number; // mínimo 2
  work_type?: string;
}

interface HourSessionResponse {
  message: string;
}

export const hourSessionService = {
  async registerHourSession(data: HourSessionData, token: string): Promise<HourSessionResponse> {
    try {
      console.log('Registering hour session:', data);
      return await apiClient.postWithAuth<HourSessionResponse>('/api/hour_session', data, token);
    } catch (error) {
      console.error('Hour session registration error:', error);
      
      if (error instanceof Error) {
        // Mapear errores específicos de la API
        if (error.message.includes('HourSessionExistException')) {
          throw new Error('Ya existe una sesión registrada para esta fecha');
        }
        if (error.message.includes('TodayDateException')) {
          throw new Error('Error en la fecha seleccionada');
        }
        if (error.message.includes('TimeEntryException')) {
          throw new Error('Error en las horas ingresadas. Verifica el formato.');
        }
        throw error;
      }
      
      throw new Error('Error al registrar la sesión de horas');
    }
  }
};
