
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { authService, LoginData, RegisterData } from '@/services/authService';

interface AuthUser {
  email: string;
  name: string;
  company_name?: string;
}

interface AuthContextType {
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (data: LoginData) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
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
  const queryClient = useQueryClient();

  const loginMutation = useMutation({
    mutationFn: async (data: LoginData) => {
      return await authService.login(data);
    },
    onSuccess: (data) => {
      setToken(data.token);
      localStorage.setItem('token', data.token);
      toast.success('Sesión iniciada correctamente');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const registerMutation = useMutation({
    mutationFn: async (data: RegisterData) => {
      return await authService.register(data);
    },
    onSuccess: () => {
      toast.success('Empleado creado exitosamente');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

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
    isAuthenticated: !!token,
    isLoading: loginMutation.isPending || registerMutation.isPending,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
