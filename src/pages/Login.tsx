
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Clock } from 'lucide-react';
import { LoginData } from '@/services/authService';

const loginSchema = z.object({
  email: z.string()
    .email('Email inválido')
    .max(255, 'Email no puede exceder 255 caracteres')
    .min(1, 'Email es requerido'),
  password: z.string()
    .min(8, 'Contraseña debe tener al menos 8 caracteres')
    .max(255, 'Contraseña no puede exceder 255 caracteres'),
});

type LoginFormData = z.infer<typeof loginSchema>;

const Login = () => {
  const { login, isLoading, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  // Redirigir al dashboard cuando el usuario esté autenticado
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const onSubmit = async (data: LoginFormData) => {
    try {
      const loginData: LoginData = {
        email: data.email,
        password: data.password,
      };
      await login(loginData);
      // La navegación se hará automáticamente por el useEffect cuando isAuthenticated cambie
    } catch (error) {
      console.error('Error en login:', error);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="w-full max-w-md space-y-8">
        {/* Logo */}
        <div className="text-center">
          <Link to="/" className="flex items-center justify-center space-x-2 mb-6 hover:opacity-80 transition-opacity">
            <Clock className="h-10 w-10 text-teal-400" />
            <span className="text-2xl font-bold text-white">TimeTracker</span>
          </Link>
          <h2 className="text-3xl font-bold text-white">Iniciar Sesión</h2>
          <p className="mt-2 text-gray-400">Accede a tu cuenta para gestionar tus horas</p>
        </div>

        {/* Formulario */}
        <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-8 border border-teal-500/20">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-300">Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="email"
                        placeholder="tu@email.com"
                        className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-teal-400"
                        disabled={isLoading}
                      />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-300">Contraseña</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="password"
                        placeholder="••••••••"
                        className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-teal-400"
                        disabled={isLoading}
                      />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full bg-teal-500 hover:bg-teal-600 text-black font-semibold"
                disabled={isLoading}
              >
                {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
              </Button>
            </form>
          </Form>

          <div className="mt-6 text-center">
            <p className="text-gray-400">
              ¿No tienes cuenta?{' '}
              <Link 
                to="/register" 
                className="text-teal-400 hover:text-teal-300 font-medium transition-colors"
              >
                Registrarse
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
