
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { RegisterData } from '@/services/authService';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

const registerSchema = z.object({
  name: z.string()
    .min(1, 'Nombre es requerido')
    .max(55, 'Nombre no puede exceder 55 caracteres'),
  company_name: z.string()
    .max(55, 'Nombre de empresa no puede exceder 55 caracteres')
    .optional(),
  email: z.string()
    .email('Email inválido')
    .max(70, 'Email no puede exceder 70 caracteres')
    .min(1, 'Email es requerido'),
  password: z.string()
    .min(8, 'Contraseña debe tener al menos 8 caracteres')
    .max(40, 'Contraseña no puede exceder 40 caracteres'),
  normal_hourly_rate: z.string()
    .regex(/^\d{1,6}(\.\d{1,2})?$/, 'Formato inválido (máx. 6 dígitos, 2 decimales)')
    .min(1, 'Tarifa normal es requerida'),
  overtime_hourly_rate: z.string()
    .regex(/^\d{1,6}(\.\d{1,2})?$/, 'Formato inválido (máx. 6 dígitos, 2 decimales)')
    .min(1, 'Tarifa extra es requerida'),
  night_hourly_rate: z.string()
    .regex(/^\d{1,6}(\.\d{1,2})?$/, 'Formato inválido (máx. 6 dígitos, 2 decimales)')
    .min(1, 'Tarifa nocturna es requerida'),
  holiday_hourly_rate: z.string()
    .regex(/^\d{1,6}(\.\d{1,2})?$/, 'Formato inválido (máx. 6 dígitos, 2 decimales)')
    .min(1, 'Tarifa festivos es requerida'),
  irpf: z.string()
    .regex(/^\d{1,2}(\.\d{1,2})?$/, 'Formato inválido (máx. 2 dígitos, 2 decimales)')
    .optional(),
});

type RegisterFormData = z.infer<typeof registerSchema>;

const Register = () => {
  const { register, isLoading, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);

  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      company_name: '',
      email: '',
      password: '',
      normal_hourly_rate: '',
      overtime_hourly_rate: '',
      night_hourly_rate: '',
      holiday_hourly_rate: '',
      irpf: '',
    },
  });

  // Redirigir al dashboard cuando el usuario esté autenticado
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const onSubmit = async (data: RegisterFormData) => {
    try {
      const registerData: RegisterData = {
        name: data.name,
        company_name: data.company_name || undefined,
        email: data.email,
        password: data.password,
        normal_hourly_rate: parseFloat(data.normal_hourly_rate),
        overtime_hourly_rate: parseFloat(data.overtime_hourly_rate),
        night_hourly_rate: parseFloat(data.night_hourly_rate),
        holiday_hourly_rate: parseFloat(data.holiday_hourly_rate),
        irpf: data.irpf ? parseFloat(data.irpf) : undefined,
      };
      await register(registerData);
    } catch (error) {
      console.error('Error en registro:', error);
    }
  };

  const validateCurrentStep = async () => {
    if (currentStep === 0) {
      // Validar campos del paso 1
      const fieldsToValidate = ['name', 'company_name', 'email', 'password'] as const;
      const isValid = await form.trigger(fieldsToValidate);
      return isValid;
    }
    return true;
  };

  const handleNext = async () => {
    const isValid = await validateCurrentStep();
    if (isValid && currentStep < 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="min-h-screen bg-black py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="flex items-center justify-center space-x-2 mb-4 hover:opacity-80 transition-opacity">
            <div className="relative">
              <img 
                src="/lovable-uploads/0b1264ea-90e2-493e-a376-3c9642216396.png" 
                alt="TimeTracker Logo" 
                className="h-10 w-10 object-contain rounded-md"
              />
            </div>
            <span className="text-2xl font-bold text-white">TimeTracker</span>
          </Link>
          <h2 className="text-3xl font-bold text-white">Crear Cuenta</h2>
          <p className="mt-2 text-gray-400">Regístrate para comenzar a gestionar tus horas</p>
        </div>

        {/* Progress indicator */}
        <div className="mb-6">
          <div className="flex items-center justify-center space-x-4">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              currentStep === 0 ? 'bg-teal-500 text-black' : 'bg-teal-500 text-black'
            }`}>
              1
            </div>
            <div className={`h-1 w-16 ${currentStep === 1 ? 'bg-teal-500' : 'bg-gray-600'}`}></div>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              currentStep === 1 ? 'bg-teal-500 text-black' : 'bg-gray-600 text-gray-300'
            }`}>
              2
            </div>
          </div>
          <div className="flex justify-between mt-2 text-sm text-gray-400">
            <span>Información Personal</span>
            <span>Tarifas y Configuración</span>
          </div>
        </div>

        {/* Formulario con Carrusel */}
        <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-8 border border-teal-500/20">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <Carousel className="w-full">
                <CarouselContent>
                  {/* Página 1: Información Personal */}
                  <CarouselItem className={currentStep === 0 ? 'block' : 'hidden'}>
                    <div className="space-y-6">
                      <h3 className="text-xl font-semibold text-white mb-4">Información Personal</h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-gray-300">Nombre *</FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  placeholder="Tu nombre completo"
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
                          name="company_name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-gray-300">Empresa</FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  placeholder="Nombre de tu empresa"
                                  className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-teal-400"
                                  disabled={isLoading}
                                />
                              </FormControl>
                              <FormMessage className="text-red-400" />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-gray-300">Email *</FormLabel>
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
                              <FormLabel className="text-gray-300">Contraseña *</FormLabel>
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
                      </div>
                    </div>
                  </CarouselItem>

                  {/* Página 2: Tarifas y Configuración */}
                  <CarouselItem className={currentStep === 1 ? 'block' : 'hidden'}>
                    <div className="space-y-6">
                      <h3 className="text-xl font-semibold text-white mb-4">Tarifas por Hora</h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="normal_hourly_rate"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-gray-300">Tarifa Normal (€/h) *</FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  placeholder="15.00"
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
                          name="overtime_hourly_rate"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-gray-300">Tarifa Extra (€/h) *</FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  placeholder="22.50"
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
                          name="night_hourly_rate"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-gray-300">Tarifa Nocturna (€/h) *</FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  placeholder="18.00"
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
                          name="holiday_hourly_rate"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-gray-300">Tarifa Festivos (€/h) *</FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  placeholder="30.00"
                                  className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-teal-400"
                                  disabled={isLoading}
                                />
                              </FormControl>
                              <FormMessage className="text-red-400" />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="irpf"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-300">IRPF (%)</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                placeholder="15.00"
                                className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-teal-400 max-w-xs"
                                disabled={isLoading}
                              />
                            </FormControl>
                            <FormMessage className="text-red-400" />
                          </FormItem>
                        )}
                      />
                    </div>
                  </CarouselItem>
                </CarouselContent>
              </Carousel>

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handlePrevious}
                  disabled={currentStep === 0 || isLoading}
                  className="border-gray-600 text-gray-300 hover:bg-gray-800"
                >
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  Anterior
                </Button>

                {currentStep === 0 ? (
                  <Button
                    type="button"
                    onClick={handleNext}
                    disabled={isLoading}
                    className="bg-teal-500 hover:bg-teal-600 text-black font-semibold"
                  >
                    Siguiente
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    className="bg-teal-500 hover:bg-teal-600 text-black font-semibold"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Creando cuenta...' : 'Crear Cuenta'}
                  </Button>
                )}
              </div>
            </form>
          </Form>

          <div className="mt-6 text-center">
            <p className="text-gray-400">
              ¿Ya tienes cuenta?{' '}
              <Link 
                to="/login" 
                className="text-teal-400 hover:text-teal-300 font-medium transition-colors"
              >
                Iniciar Sesión
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
