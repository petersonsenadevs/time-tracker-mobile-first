
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

interface DashboardResponse {
  user: {
    id: number;
    name: string;
    email: string;
    company_name?: string;
  };
  stats?: any;
}

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
      return await apiClient.getWithAuth<DashboardResponse>('/api/dashboard', token);
    } catch (error) {
      console.error('Dashboard verification error:', error);
      throw error;
    }
  }
};
