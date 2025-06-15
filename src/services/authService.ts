
import { apiClient } from './api';

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  company_name?: string;
  password: string;
  email: string;
  normal_hourly_rate: number;
  overtime_hourly_rate: number;
  night_hourly_rate: number;
  holiday_hourly_rate: number;
  irpf?: number;
}

interface LoginResponse {
  token: string;
}

interface RegisterResponse {
  message: string;
}

interface DailyWorkHour {
  date: string;
  startTime: string;
  endTime: string;
  plannedHours: number;
  actualHours: number;
  workType: 'NORMAL' | 'OVERTIME' | 'HOLIDAY';
}

interface DashboardData {
  totalHoursWorked: number;
  currentMonthSalary: number;
  countHourSessionDay: number;
  dailyWorkHours: DailyWorkHour[];
}

interface DashboardResponse {
  message: string;
  dashboardData: DashboardData;
  user?: {
    id: number;
    name: string;
    email: string;
    company_name?: string;
  };
}

// Tipo para la respuesta actual del endpoint
interface ApiDashboardResponse {
  total_hours_worked: string; // Formato "H:M" como "16:0"
  current_month_salary: string; // Formato "211.20"
  count_hour_session_day: number; // Campo de días trabajados
  user?: {
    id: number;
    name: string;
    email: string;
    company_name?: string;
  };
}

// Función auxiliar para convertir formato "H:M" a decimal de horas
const convertTimeToHours = (timeString: string): number => {
  if (!timeString || typeof timeString !== 'string') return 0;
  
  const parts = timeString.split(':');
  if (parts.length !== 2) return 0;
  
  const hours = parseInt(parts[0]) || 0;
  const minutes = parseInt(parts[1]) || 0;
  
  return hours + (minutes / 60);
};

export const authService = {
  async login(data: LoginData): Promise<LoginResponse> {
    try {
      return await apiClient.post<LoginResponse>('/api/login', data);
    } catch (error) {
      console.error('Login error:', error);
      
      if (error instanceof Error) {
        // Mapear errores específicos de la API
        if (error.message.includes('User not found') || error.message.includes('UserNotFound')) {
          throw new Error('Usuario no encontrado');
        }
        if (error.message.includes('Unauthorized') || error.message.includes('UnauthorizedException')) {
          throw new Error('Credenciales incorrectas');
        }
        if (error.message.includes('User is not active') || error.message.includes('UserIsNotActiveException')) {
          throw new Error('Usuario inactivo. Contacta al administrador.');
        }
        throw error;
      }
      
      throw new Error('Error al iniciar sesión');
    }
  },

  async register(data: RegisterData): Promise<RegisterResponse> {
    try {
      return await apiClient.post<RegisterResponse>('/api/register', data);
    } catch (error) {
      console.error('Register error:', error);
      
      if (error instanceof Error) {
        // Mapear errores específicos de la API
        if (error.message.includes('User already exists') || error.message.includes('UserAlReadyExists')) {
          throw new Error('Ya existe un usuario con este email');
        }
        if (error.message.includes('Null data') || error.message.includes('NullDataException')) {
          throw new Error('Datos inválidos. Verifica todos los campos.');
        }
        throw error;
      }
      
      throw new Error('Error al registrar usuario');
    }
  },

  async verifyDashboardAccess(token: string): Promise<DashboardResponse> {
    try {
      const response = await apiClient.getWithAuth<ApiDashboardResponse>('/api/dashboard', token);
      console.log('Dashboard API response raw:', response);
      
      // Convertir el formato de tiempo "H:M" a decimal de horas
      const totalHoursWorked = convertTimeToHours(response.total_hours_worked);
      
      // Convertir el salario string a number
      const currentMonthSalary = parseFloat(response.current_month_salary) || 0;
      
      // Obtener el conteo de días trabajados directamente del campo
      const countHourSessionDay = response.count_hour_session_day || 0;
      
      console.log('Converted dashboard data:', {
        totalHoursWorked,
        currentMonthSalary,
        countHourSessionDay,
        originalTime: response.total_hours_worked,
        originalSalary: response.current_month_salary,
        originalDays: response.count_hour_session_day
      });
      
      const dashboardData: DashboardData = {
        totalHoursWorked,
        currentMonthSalary,
        countHourSessionDay,
        dailyWorkHours: []
      };
      
      return {
        message: "Dashboard retrieved successfully",
        dashboardData,
        user: response.user
      };
    } catch (error) {
      console.error('Dashboard verification error:', error);
      throw error;
    }
  }
};
