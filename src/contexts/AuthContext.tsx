
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { authService, LoginData, RegisterData } from '@/services/authService';

interface AuthUser {
  id: number | string;
  email: string;
  name?: string;
  role?: string;
  company_name?: string;
}

interface DashboardStats {
  totalHoursWorked: number;
  currentMonthSalary: number;
  countHourSessionDay: number;
  dailyWorkHours: Array<{
    date: string;
    startTime: string;
    endTime: string;
    plannedHours: number;
    actualHours: number;
    workType: 'NORMAL' | 'OVERTIME' | 'HOLIDAY';
  }>;
}

interface AuthContextType {
  user: AuthUser | null;
  token: string | null;
  dashboardStats: DashboardStats | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isCheckingAuth: boolean;
  login: (data: LoginData) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  checkAuthStatus: () => Promise<void>;
  setDashboardStats: (stats: DashboardStats | null) => void;
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
  const [dashboardStats, setDashboardStats] = useState<DashboardStats | null>(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true); // Start as true to check on load
  const queryClient = useQueryClient();

  const loginMutation = useMutation({
    mutationFn: async (data: LoginData) => {
      return await authService.login(data);
    },
    onSuccess: async (data) => {
      console.log('Login successful, setting token:', data.token);
      const newToken = data.token;
      setToken(newToken);
      localStorage.setItem('token', newToken);
      
      // Inmediatamente marcar como autenticado con datos básicos
      // Esto permite la redirección mientras se cargan los datos del dashboard
      setUser({ 
        id: 0, 
        email: '', 
        name: 'Usuario' 
      });
      
      // Luego verificar y obtener datos completos del dashboard
      try {
        setIsCheckingAuth(true);
        const dashboardResponse = await authService.verifyDashboardAccess(newToken);
        console.log('Dashboard data received after login:', dashboardResponse);
        
        // Actualizar con datos reales del usuario y estadísticas
        if (dashboardResponse.user && dashboardResponse.user.id) {
          setUser(dashboardResponse.user);
        }
        setDashboardStats(dashboardResponse.dashboardData);
        
        toast.success('Sesión iniciada correctamente');
      } catch (error) {
        console.error('Error verifying dashboard access after login:', error);
        // Mantener la autenticación básica incluso si falla el dashboard
        toast.success('Sesión iniciada correctamente');
      } finally {
        setIsCheckingAuth(false);
      }
    },
    onError: (error) => {
      console.error('Login error:', error);
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
        await loginMutation.mutateAsync(loginData);
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
    if (!token) {
      console.log('No token found, not authenticated');
      setUser(null);
      setIsCheckingAuth(false);
      return;
    }
    
    console.log('Checking auth status with token:', token);
    setIsCheckingAuth(true);
    try {
      const dashboardResponse = await authService.verifyDashboardAccess(token);
      console.log('Auth verification successful:', dashboardResponse);
      
      // Verificar si hay datos de usuario válidos
      if (dashboardResponse.user && dashboardResponse.user.id) {
        setUser(dashboardResponse.user);
        console.log('User authenticated:', dashboardResponse.user);
      } else {
        // Si no hay datos de usuario válidos, crear un usuario básico
        const basicUser = { 
          id: 1, 
          email: 'user@example.com', 
          name: 'Usuario' 
        };
        setUser(basicUser);
        console.log('Using basic user data:', basicUser);
      }
      setDashboardStats(dashboardResponse.dashboardData);
    } catch (error) {
      console.error('Auth verification failed:', error);
      setToken(null);
      setUser(null);
      localStorage.removeItem('token');
    } finally {
      setIsCheckingAuth(false);
    }
  };

  // Run auth check when component mounts or token changes
  useEffect(() => {
    checkAuthStatus();
  }, [token]);

  const logout = () => {
    console.log('Logging out user');
    setToken(null);
    setUser(null);
    setDashboardStats(null);
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
    dashboardStats,
    isAuthenticated: !!token && !!user,
    isLoading: loginMutation.isPending || registerMutation.isPending,
    isCheckingAuth,
    login,
    register,
    logout,
    checkAuthStatus,
    setDashboardStats,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
