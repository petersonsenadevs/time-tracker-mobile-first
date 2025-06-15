const API_BASE_URL = 'https://jornalia-api.fly.dev';

interface ApiError {
  message: string;
  errors?: Record<string, string[]>;
}

class ApiClient {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  // Getter público para acceder a la baseURL
  get baseURL() {
    return this.baseURL;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    const response = await fetch(url, config);
    
    if (!response.ok) {
      const errorData: ApiError = await response.json().catch(() => ({
        message: 'Error de conexión con el servidor'
      }));
      
      // Crear error con información de validación si existe
      const error = new Error(errorData.message || `Error ${response.status}`) as any;
      if (errorData.errors) {
        error.errors = errorData.errors;
      }
      throw error;
    }

    return response.json();
  }

  async post<T>(endpoint: string, data: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async postWithAuth<T>(endpoint: string, data: any, token: string): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
  }

  async put<T>(endpoint: string, data: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async putWithAuth<T>(endpoint: string, data: any, token: string): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
  }

  async get<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'GET',
    });
  }

  async getWithAuth<T>(endpoint: string, token: string): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
  }
}

export const apiClient = new ApiClient(API_BASE_URL);
