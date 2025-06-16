const API_BASE_URL = 'https://jornalia-api.fly.dev';

interface ApiError {
  message: string;
  errors?: Record<string, string[]>;
}

class ApiClient {
  public baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;

    // Preparamos headers
    const headers: Record<string, string> = {
      ...((options.headers as Record<string, string>) || {}),
    };

    if (options.body) {
      headers['Content-Type'] = headers['Content-Type'] || 'application/json';
    }

    const config: RequestInit = {
      ...options,
      headers,
    };

    console.log('Sending request to:', url);
    console.log('With headers:', config.headers);
    console.log('And body:', config.body);

    const response = await fetch(url, config);

    if (!response.ok) {
      const errorData: ApiError = await response.json().catch(() => ({
        message: 'Error de conexión con el servidor',
      }));

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
        Authorization: `Bearer ${token}`,
      },
    });
  }

  // Otros métodos siguen igual...
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
        Authorization: `Bearer ${token}`,
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
        Authorization: `Bearer ${token}`,
      },
    });
  }

  async deleteWithAuth<T>(endpoint: string, token: string): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}

export const apiClient = new ApiClient(API_BASE_URL);
