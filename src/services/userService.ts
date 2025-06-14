
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
  id: number;
  name: string;
  email: string;
  role: string;
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

export const userService = {
  async updateEmail(data: UpdateEmailData, token: string): Promise<UpdateEmailResponse> {
    try {
      return await apiClient.putWithAuth<UpdateEmailResponse>('/api/v1/user/update', data, token);
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
      return await apiClient.getWithAuth<ShowUserResponse>('/api/v1/user/show', token);
    } catch (error) {
      console.error('Show user error:', error);
      
      if (error instanceof Error) {
        throw error;
      }
      
      throw new Error('Error al obtener información del usuario');
    }
  },

  async deleteUser(token: string): Promise<DeleteUserResponse> {
    try {
      return await apiClient.postWithAuth<DeleteUserResponse>('/api/v1/user/delete', {}, token);
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
      return await apiClient.putWithAuth<ChangePasswordResponse>('/api/v1/user/change_password', data, token);
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
  }
};
