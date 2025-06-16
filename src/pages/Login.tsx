import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { LoginData } from '@/services/authService';
import Logo from '@/components/ui/logo';
import AuthBackground from '@/components/auth/AuthBackground';

const loginSchema = z.object({
  email: z.string()
    .email('Email inválido')
    .max(255, 'Email no puede exceder 255 caracteres')
    .min(1, 'Email es requerido'),
  password: z.string()
    .min(8, 'Contraseña debe tener al menos 8 caracteres')
    .max(255, 'Contraseña no puede exceder 255 caracteres'),
  rememberMe: z.boolean().default(false),
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
      rememberMe: false,
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
      <div className="flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md space-y-8">
          {/* Logo */}
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <Logo height="h-32" />
            </div>
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

                <FormField
                  control={form.control}
                  name="rememberMe"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="border-gray-600 data-[state=checked]:bg-teal-500 data-[state=checked]:border-teal-500"
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="text-gray-300 text-sm font-normal cursor-pointer">
                          Recordarme
                        </FormLabel>
                      </div>
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
