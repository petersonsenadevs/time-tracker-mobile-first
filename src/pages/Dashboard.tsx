
import React, { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useQuery } from '@tanstack/react-query';
import { userService } from '@/services/userService';
import { Clock, LogOut, TrendingUp, CalendarDays, Plus, DollarSign, Award, User as UserIcon } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import BottomNavBar from '@/components/BottomNavBar';
import WorkDayForm from '@/components/WorkDayForm';

const Dashboard = () => {
  const { user, dashboardStats, logout, token } = useAuth();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [isFormOpen, setIsFormOpen] = useState(false);

  // Obtener información del empleado desde la API
  const { data: employeeInfo, isLoading: isLoadingEmployee } = useQuery({
    queryKey: ['employee', token],
    queryFn: () => userService.getEmployee(token!),
    enabled: !!token,
  });

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      setSelectedDate(date);
      setIsFormOpen(true);
    }
  };

  const handleWorkDaySubmit = (data: any) => {
    console.log('WorkDay data:', { date: selectedDate, ...data });
    // TODO: Implementar envío de datos al servidor
  };

  const employee = employeeInfo?.employee;

  const slides = [
    // Slide 1: Stats Cards + Calendar
    {
      id: 'overview',
      title: 'Resumen General',
      content: (
        <div className="space-y-6 h-full">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Card className="bg-gradient-to-br from-teal-500/20 to-teal-600/10 border-teal-500/30">
              <CardHeader className="pb-3">
                <CardTitle className="text-white flex items-center text-base">
                  <TrendingUp className="h-5 w-5 mr-2 text-teal-400" />
                  Horas este mes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-white mb-1">
                  {dashboardStats?.totalHoursWorked?.toFixed(1) || '0.0'}h
                </div>
                <p className="text-teal-300 text-sm">
                  {dashboardStats?.dailyWorkHours?.length || 0} días trabajados
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-blue-500/20 to-blue-600/10 border-blue-500/30">
              <CardHeader className="pb-3">
                <CardTitle className="text-white flex items-center text-base">
                  <CalendarDays className="h-5 w-5 mr-2 text-blue-400" />
                  Salario actual
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-white mb-1">
                  €{dashboardStats?.currentMonthSalary?.toFixed(2) || '0.00'}
                </div>
                <p className="text-blue-300 text-sm">este mes</p>
              </CardContent>
            </Card>
          </div>

          {/* Calendar Section */}
          <Card className="bg-gray-900/50 border-gray-700 flex-1">
            <CardHeader>
              <CardTitle className="text-white flex items-center justify-between">
                <span className="flex items-center">
                  <CalendarDays className="h-5 w-5 mr-2 text-teal-400" />
                  Calendario de Jornadas
                </span>
                <Button
                  size="sm"
                  className="bg-teal-500 hover:bg-teal-600 text-black"
                  onClick={() => setIsFormOpen(true)}
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Nueva
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={handleDateSelect}
                  className="rounded-md border-gray-700"
                  classNames={{
                    day_selected: "bg-teal-500 text-black hover:bg-teal-600",
                    day_today: "bg-gray-700 text-white",
                    day: "text-gray-300 hover:bg-gray-700 hover:text-white",
                    head_cell: "text-gray-400",
                    caption_label: "text-white",
                    nav_button: "text-gray-400 hover:text-white hover:bg-gray-700",
                  }}
                />
              </div>
              <p className="text-center text-sm text-gray-400 mt-4">
                Toca una fecha para agregar una nueva jornada
              </p>
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
            <CardDescription className="text-gray-400">
              Tarifas por hora y detalles de compensación
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {isLoadingEmployee ? (
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-400 mx-auto mb-2"></div>
                <p className="text-gray-400">Cargando información salarial...</p>
              </div>
            ) : employee ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-center gap-3 p-4 bg-gray-800/50 rounded-lg">
                    <Clock className="h-6 w-6 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-400">Tarifa Normal por Hora</p>
                      <p className="text-white font-bold text-2xl">€{employee.normal_hourly_rate}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-4 bg-gray-800/50 rounded-lg">
                    <Clock className="h-6 w-6 text-orange-400" />
                    <div>
                      <p className="text-sm text-gray-400">Tarifa de Horas Extra</p>
                      <p className="text-white font-bold text-2xl">€{employee.overtime_hourly_rate}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-4 bg-gray-800/50 rounded-lg">
                    <CalendarDays className="h-6 w-6 text-green-400" />
                    <div>
                      <p className="text-sm text-gray-400">Tarifa de Días Festivos</p>
                      <p className="text-white font-bold text-2xl">€{employee.holiday_hourly_rate}</p>
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
              </>
            ) : (
              <div className="text-center text-red-400">
                Error al cargar la información salarial
              </div>
            )}
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
            <CardDescription className="text-gray-400">
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
                <div className="text-4xl font-bold text-white mb-2">
                  {employee ? `€${employee.normal_hourly_rate}` : '€0.00'}
                </div>
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
    <div className="min-h-screen bg-black">
      {/* Mobile Header */}
      <header className="bg-gray-900/90 backdrop-blur-sm border-b border-teal-500/20 sticky top-0 z-40">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <Clock className="h-8 w-8 text-teal-400" />
              <span className="text-lg font-bold text-white">TimeTracker</span>
            </div>

            {/* User Info + Logout */}
            <div className="flex items-center space-x-3">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium text-white">{user?.name}</p>
                <p className="text-xs text-gray-400">{user?.email}</p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={logout}
                className="text-gray-400 hover:text-red-400 hover:bg-red-500/10 h-8 w-8 p-0"
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 py-6 pb-20 md:pb-6">
        {/* Welcome Section */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-white mb-1">
            ¡Hola, {user?.name?.split(' ')[0]}! 👋
          </h1>
          <p className="text-gray-400">Gestiona tus jornadas laborales de forma fácil</p>
        </div>

        {/* Carousel Section */}
        <div className="h-[calc(100vh-200px)]">
          <Carousel className="w-full h-full">
            <CarouselContent className="h-full">
              {slides.map((slide, index) => (
                <CarouselItem key={slide.id} className="h-full">
                  <div className="h-full flex flex-col">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-xl font-bold text-white">{slide.title}</h2>
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
      </main>

      {/* Bottom Navigation (Mobile only) */}
      <BottomNavBar />

      {/* Work Day Form Modal */}
      <WorkDayForm
        selectedDate={selectedDate}
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleWorkDaySubmit}
      />
    </div>
  );
};

export default Dashboard;
