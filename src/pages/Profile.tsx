import { useAuth } from '@/contexts/AuthContext';
import { useQuery } from '@tanstack/react-query';
import { userService } from '@/services/userService';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { User, MapPin, Clock, Calendar, Award, Phone, Mail, DollarSign, Building, ChevronLeft, ChevronRight } from 'lucide-react';
import BottomNavBar from '@/components/BottomNavBar';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { useState } from 'react';

const Profile = () => {
  const { token } = useAuth();
  const [currentSlide, setCurrentSlide] = useState(0);

  // Obtener información del empleado desde la API
  const { data: employeeInfo, refetch: refetchEmployee, isLoading: isLoadingEmployee } = useQuery({
    queryKey: ['employee', token],
    queryFn: () => userService.getEmployee(token!),
    enabled: !!token,
  });

  // Obtener información básica del usuario
  const { data: userInfo, isLoading: isLoadingUser } = useQuery({
    queryKey: ['user', token],
    queryFn: () => userService.showUser(token!),
    enabled: !!token,
  });

  const isLoading = isLoadingEmployee || isLoadingUser;
  const employee = employeeInfo?.employee;
  const currentUser = userInfo?.user;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-400 mx-auto mb-4"></div>
          <p className="text-gray-300">Cargando información del empleado...</p>
        </div>
      </div>
    );
  }

  if (!employee || !currentUser) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400">Error al cargar la información del empleado</p>
          <Button onClick={() => refetchEmployee()} className="mt-4 bg-teal-500 hover:bg-teal-600 text-black">
            Reintentar
          </Button>
        </div>
      </div>
    );
  }

  const slides = [
    // Slide 1: Header + Personal Info
    {
      id: 'personal',
      title: 'Información Personal',
      content: (
        <div className="space-y-6">
          {/* Header del Empleado */}
          <div className="bg-gradient-to-r from-teal-500/20 to-blue-500/20 rounded-xl p-6">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <Avatar className="h-24 w-24 border-4 border-teal-400/50">
                <AvatarFallback className="bg-teal-500/20 text-teal-400 text-3xl">
                  {employee.name?.charAt(0)?.toUpperCase() || 'E'}
                </AvatarFallback>
              </Avatar>
              
              <div className="text-center md:text-left flex-1">
                <h1 className="text-3xl font-bold text-white mb-2">
                  {employee.name || 'Empleado'}
                </h1>
                <p className="text-gray-300 text-lg mb-1">{currentUser.email}</p>
                <div className="flex items-center justify-center md:justify-start gap-2 text-teal-400">
                  <User className="h-4 w-4" />
                  <span className="capitalize">
                    {currentUser.role === 'employee' ? 'Empleado Activo' : currentUser.role}
                  </span>
                </div>
              </div>

              <div className="text-center">
                <div className="bg-green-500/20 text-green-400 px-4 py-2 rounded-full text-sm font-medium">
                  ● Activo
                </div>
              </div>
            </div>
          </div>

          {/* Información Personal Card */}
          <Card className="bg-gray-900/50 border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <User className="h-5 w-5 text-teal-400" />
                Información Personal
              </CardTitle>
              <CardDescription>
                Datos básicos del empleado
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <User className="h-4 w-4 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-400">Nombre Completo</p>
                  <p className="text-white font-medium">{employee.name}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-400">Email</p>
                  <p className="text-white font-medium">{currentUser.email}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Building className="h-4 w-4 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-400">Empresa</p>
                  <p className="text-white font-medium">{employee.company_name || 'No especificada'}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Award className="h-4 w-4 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-400">ID de Empleado</p>
                  <p className="text-white font-medium font-mono">{currentUser.id}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )
    },
    // Slide 2: Salary Info
    {
      id: 'salary',
      title: 'Información Salarial',
      content: (
        <Card className="bg-gray-900/50 border-gray-700 h-full">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <DollarSign className="h-5 w-5 text-teal-400" />
              Información Salarial
            </CardTitle>
            <CardDescription>
              Tarifas por hora y detalles de compensación
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center gap-3 p-4 bg-gray-800/50 rounded-lg">
                <Clock className="h-6 w-6 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-400">Tarifa Normal por Hora</p>
                  <p className="text-white font-bold text-2xl">${employee.normal_hourly_rate}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-4 bg-gray-800/50 rounded-lg">
                <Clock className="h-6 w-6 text-orange-400" />
                <div>
                  <p className="text-sm text-gray-400">Tarifa de Horas Extra</p>
                  <p className="text-white font-bold text-2xl">${employee.overtime_hourly_rate}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-gray-800/50 rounded-lg">
                <Calendar className="h-6 w-6 text-green-400" />
                <div>
                  <p className="text-sm text-gray-400">Tarifa de Días Festivos</p>
                  <p className="text-white font-bold text-2xl">${employee.holiday_hourly_rate}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-gray-800/50 rounded-lg">
                <DollarSign className="h-6 w-6 text-red-400" />
                <div>
                  <p className="text-sm text-gray-400">IRPF (%)</p>
                  <p className="text-white font-bold text-2xl">{employee.irpf}%</p>
                </div>
              </div>
            </div>

            <div className="mt-8 p-6 bg-teal-500/10 border border-teal-500/20 rounded-lg">
              <h3 className="text-white font-semibold mb-2">Resumen de Tarifas</h3>
              <div className="text-sm text-gray-300 space-y-1">
                <p>• Horario normal: Lunes a Viernes, 8:00 AM - 6:00 PM</p>
                <p>• Horas extra: Después de 8 horas diarias o fines de semana</p>
                <p>• Días festivos: Días oficiales no laborables</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )
    },
    // Slide 3: Statistics
    {
      id: 'stats',
      title: 'Estadísticas',
      content: (
        <Card className="bg-gray-900/50 border-gray-700 h-full">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <Award className="h-5 w-5 text-teal-400" />
              Estadísticas del Empleado
            </CardTitle>
            <CardDescription>
              Resumen de actividad laboral
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="text-center p-6 bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-lg border border-blue-500/30">
                <div className="text-4xl font-bold text-white mb-2">0</div>
                <div className="text-gray-400 text-sm">Días Trabajados</div>
                <div className="text-blue-400 text-xs mt-1">Este mes</div>
              </div>
              <div className="text-center p-6 bg-gradient-to-br from-green-500/20 to-green-600/20 rounded-lg border border-green-500/30">
                <div className="text-4xl font-bold text-white mb-2">0h</div>
                <div className="text-gray-400 text-sm">Horas Totales</div>
                <div className="text-green-400 text-xs mt-1">Acumuladas</div>
              </div>
              <div className="text-center p-6 bg-gradient-to-br from-teal-500/20 to-teal-600/20 rounded-lg border border-teal-500/30">
                <div className="text-4xl font-bold text-white mb-2">${employee.normal_hourly_rate}</div>
                <div className="text-gray-400 text-sm">Tarifa por Hora</div>
                <div className="text-teal-400 text-xs mt-1">Actual</div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-gray-800/50 rounded-lg">
                <h4 className="text-white font-medium mb-2">Rendimiento Semanal</h4>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div className="bg-teal-400 h-2 rounded-full w-0"></div>
                </div>
                <p className="text-gray-400 text-sm mt-1">0% de la meta semanal completada</p>
              </div>

              <div className="p-4 bg-gray-800/50 rounded-lg">
                <h4 className="text-white font-medium mb-2">Últimas Actividades</h4>
                <p className="text-gray-400 text-sm">No hay registros de actividad aún</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <div className="flex-1 container mx-auto px-4 py-8 max-w-4xl">
        <Carousel className="w-full h-full">
          <CarouselContent className="h-full">
            {slides.map((slide, index) => (
              <CarouselItem key={slide.id} className="h-full">
                <div className="h-full flex flex-col">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-white">{slide.title}</h2>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-400">
                        {index + 1} de {slides.length}
                      </span>
                      <div className="flex gap-1">
                        {slides.map((_, i) => (
                          <div
                            key={i}
                            className={`w-2 h-2 rounded-full transition-colors ${
                              i === index ? 'bg-teal-400' : 'bg-gray-600'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 overflow-y-auto">
                    {slide.content}
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-4 bg-gray-800 border-gray-700 text-white hover:bg-gray-700" />
          <CarouselNext className="right-4 bg-gray-800 border-gray-700 text-white hover:bg-gray-700" />
        </Carousel>
      </div>

      <BottomNavBar />
    </div>
  );
};

export default Profile;
