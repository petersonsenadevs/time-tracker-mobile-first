
import { useAuth } from '@/contexts/AuthContext';
import { useQuery } from '@tanstack/react-query';
import { userService } from '@/services/userService';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { User, MapPin, Clock, Calendar, Award, Phone, Mail, DollarSign, Building } from 'lucide-react';
import BottomNavBar from '@/components/BottomNavBar';

const Profile = () => {
  const { token } = useAuth();

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

  return (
    <div className="min-h-screen bg-black text-white pb-20 lg:pb-8">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header del Empleado */}
        <div className="relative mb-8">
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
        </div>

        {/* Información Detallada */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Información Personal */}
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

          {/* Información Salarial */}
          <Card className="bg-gray-900/50 border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <DollarSign className="h-5 w-5 text-teal-400" />
                Información Salarial
              </CardTitle>
              <CardDescription>
                Tarifas por hora y detalles de compensación
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Clock className="h-4 w-4 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-400">Tarifa Normal por Hora</p>
                  <p className="text-white font-medium">${employee.normal_hourly_rate}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Clock className="h-4 w-4 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-400">Tarifa de Horas Extra</p>
                  <p className="text-white font-medium">${employee.overtime_hourly_rate}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Calendar className="h-4 w-4 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-400">Tarifa de Días Festivos</p>
                  <p className="text-white font-medium">${employee.holiday_hourly_rate}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <DollarSign className="h-4 w-4 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-400">IRPF (%)</p>
                  <p className="text-white font-medium">{employee.irpf}%</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Estadísticas */}
          <Card className="bg-gray-900/50 border-gray-700 lg:col-span-2">
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
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-gray-800/50 rounded-lg">
                  <div className="text-2xl font-bold text-white mb-2">0</div>
                  <div className="text-gray-400 text-sm">Días Trabajados</div>
                </div>
                <div className="text-center p-4 bg-gray-800/50 rounded-lg">
                  <div className="text-2xl font-bold text-white mb-2">0h</div>
                  <div className="text-gray-400 text-sm">Horas Totales</div>
                </div>
                <div className="text-center p-4 bg-gray-800/50 rounded-lg">
                  <div className="text-2xl font-bold text-white mb-2">${employee.normal_hourly_rate}</div>
                  <div className="text-gray-400 text-sm">Tarifa por Hora</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <BottomNavBar />
    </div>
  );
};

export default Profile;
