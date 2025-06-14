
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { authService, LoginData, RegisterData } from '@/services/authService';

interface AuthUser {
  id: number;
  email: string;
  name: string;
  company_name?: string;
}

interface AuthContextType {
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isCheckingAuth: boolean;
  login: (data: LoginData) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  checkAuthStatus: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(false);
  const queryClient = useQueryClient();

  const loginMutation = useMutation({
    mutationFn: async (data: LoginData) => {
      return await authService.login(data);
    },
    onSuccess: async (data) => {
      setToken(data.token);
      localStorage.setItem('token', data.token);
      
      // Verificar inmediatamente el token y obtener datos del usuario
      try {
        const dashboardData = await authService.verifyDashboardAccess(data.token);
        setUser(dashboardData.user);
        toast.success('Sesión iniciada correctamente');
      } catch (error) {
        console.error('Error verifying dashboard access after login:', error);
        setToken(null);
        setUser(null);
        localStorage.removeItem('token');
        throw error;
      }
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const registerMutation = useMutation({
    mutationFn: async (data: RegisterData) => {
      return await authService.register(data);
    },
    onSuccess: async (_, originalData) => {
      toast.success('Empleado creado exitosamente');
      
      // Hacer login automático después del registro exitoso
      try {
        const loginData: LoginData = {
          email: originalData.email,
          password: originalData.password,
        };
        const loginResponse = await authService.login(loginData);
        setToken(loginResponse.token);
        localStorage.setItem('token', loginResponse.token);
        
        // Verificar el token y obtener datos del usuario
        const dashboardData = await authService.verifyDashboardAccess(loginResponse.token);
        setUser(dashboardData.user);
        toast.success('Sesión iniciada automáticamente');
      } catch (error) {
        console.error('Error during auto-login after registration:', error);
        toast.error('Registro exitoso. Por favor, inicia sesión manualmente.');
      }
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const checkAuthStatus = async () => {
    if (!token) return;
    
    setIsCheckingAuth(true);
    try {
      const dashboardData = await authService.verifyDashboardAccess(token);
      setUser(dashboardData.user);
    } catch (error) {
      console.error('Auth verification failed:', error);
      logout();
    } finally {
      setIsCheckingAuth(false);
    }
  };

  useEffect(() => {
    if (token) {
      checkAuthStatus();
    }
  }, [token]);

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
    queryClient.clear();
    toast.success('Sesión cerrada');
  };

  const login = async (data: LoginData) => {
    await loginMutation.mutateAsync(data);
  };

  const register = async (data: RegisterData) => {
    await registerMutation.mutateAsync(data);
  };

  const value: AuthContextType = {
    user,
    token,
    isAuthenticated: !!token && !!user,
    isLoading: loginMutation.isPending || registerMutation.isPending,
    isCheckingAuth,
    login,
    register,
    logout,
    checkAuthStatus,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
