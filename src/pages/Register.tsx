
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Form } from '@/components/ui/form';
import { RegisterData } from '@/services/authService';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import RegisterHeader from '@/components/register/RegisterHeader';
import RegisterProgress from '@/components/register/RegisterProgress';
import PersonalInfoStep from '@/components/register/PersonalInfoStep';
import RatesConfigStep from '@/components/register/RatesConfigStep';
import RegisterNavigation from '@/components/register/RegisterNavigation';

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
        <RegisterHeader />
        <RegisterProgress currentStep={currentStep} />

        {/* Formulario con Carrusel */}
        <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-8 border border-teal-500/20">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <Carousel className="w-full">
                <CarouselContent>
                  {/* Página 1: Información Personal */}
                  <CarouselItem className={currentStep === 0 ? 'block' : 'hidden'}>
                    <PersonalInfoStep control={form.control} isLoading={isLoading} />
                  </CarouselItem>

                  {/* Página 2: Tarifas y Configuración */}
                  <CarouselItem className={currentStep === 1 ? 'block' : 'hidden'}>
                    <RatesConfigStep control={form.control} isLoading={isLoading} />
                  </CarouselItem>
                </CarouselContent>
              </Carousel>

              <RegisterNavigation
                currentStep={currentStep}
                isLoading={isLoading}
                onPrevious={handlePrevious}
                onNext={handleNext}
              />
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
