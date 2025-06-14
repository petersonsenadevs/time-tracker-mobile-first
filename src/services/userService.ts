import { apiClient } from './api';

export interface UpdateEmailData {
  email: string;
}

export interface ChangePasswordData {
  old_password: string;
  new_password: string;
  password_confirmation: string;
}

export interface User {
  id: number | string;
  name?: string;
  email: string;
  role: string;
}

export interface Employee {
  name: string;
  company_name: string;
  normal_hourly_rate: string;
  overtime_hourly_rate: string;
  holiday_hourly_rate: string;
  irpf: number;
}

export interface UpdateEmployeeData {
  name?: string;
  company_name?: string;
  normal_hourly_rate?: string;
  overtime_hourly_rate?: string;
  holiday_hourly_rate?: string;
  irpf?: number;
}

interface UpdateEmailResponse {
  message: string;
  user: User;
}

interface ShowUserResponse {
  message: string;
  user: User;
}

interface DeleteUserResponse {
  message: string;
}

interface ChangePasswordResponse {
  message: string;
}

interface EmployeeResponse {
  employee: Employee;
}

interface UpdateEmployeeResponse {
  message: string;
  employee: Employee;
}

export const userService = {
  async updateEmail(data: UpdateEmailData, token: string): Promise<UpdateEmailResponse> {
    try {
      return await apiClient.putWithAuth<UpdateEmailResponse>('/api/user/update', data, token);
    } catch (error) {
      console.error('Update email error:', error);
      
      if (error instanceof Error) {
        throw error;
      }
      
      throw new Error('Error al actualizar el email');
    }
  },

  async showUser(token: string): Promise<ShowUserResponse> {
    try {
      return await apiClient.getWithAuth<ShowUserResponse>('/api/user/show', token);
    } catch (error) {
      console.error('Show user error:', error);
      
      if (error instanceof Error) {
        throw error;
      }
      
      throw new Error('Error al obtener información del usuario');
    }
  },

  async getEmployee(token: string): Promise<EmployeeResponse> {
    try {
      return await apiClient.getWithAuth<EmployeeResponse>('/api/employee', token);
    } catch (error) {
      console.error('Get employee error:', error);
      
      if (error instanceof Error) {
        throw error;
      }
      
      throw new Error('Error al obtener información del empleado');
    }
  },

  async deleteUser(token: string): Promise<DeleteUserResponse> {
    try {
      return await apiClient.postWithAuth<DeleteUserResponse>('/api/user/delete', {}, token);
    } catch (error) {
      console.error('Delete user error:', error);
      
      if (error instanceof Error) {
        throw error;
      }
      
      throw new Error('Error al eliminar usuario');
    }
  },

  async changePassword(data: ChangePasswordData, token: string): Promise<ChangePasswordResponse> {
    try {
      return await apiClient.putWithAuth<ChangePasswordResponse>('/api/user/change_password', data, token);
    } catch (error) {
      console.error('Change password error:', error);
      
      if (error instanceof Error) {
        // Mapear errores específicos de la API
        if (error.message.includes('ChangePassWordException')) {
          throw new Error('Error al cambiar la contraseña');
        }
        throw error;
      }
      
      throw new Error('Error al cambiar la contraseña');
    }
  },

  async updateEmployee(data: UpdateEmployeeData, token: string): Promise<UpdateEmployeeResponse> {
    try {
      return await apiClient.putWithAuth<UpdateEmployeeResponse>('/api/employee', data, token);
    } catch (error) {
      console.error('Update employee error:', error);
      
      if (error instanceof Error) {
        throw error;
      }
      
      throw new Error('Error al actualizar información del empleado');
    }
  }
};
