
import { useAuth } from '@/contexts/AuthContext';
import { useQuery } from '@tanstack/react-query';
import { userService } from '@/services/userService';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { User, MapPin, Clock, Calendar, Award, Phone, Mail } from 'lucide-react';
import BottomNavBar from '@/components/BottomNavBar';

const Profile = () => {
  const { token } = useAuth();

  // Obtener información del usuario desde la API
  const { data: userInfo, refetch, isLoading } = useQuery({
    queryKey: ['user', token],
    queryFn: () => userService.showUser(token!),
    enabled: !!token,
  });

  const currentUser = userInfo?.user;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-400 mx-auto mb-4"></div>
          <p className="text-gray-300">Cargando perfil del empleado...</p>
        </div>
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400">Error al cargar la información del empleado</p>
          <Button onClick={() => refetch()} className="mt-4 bg-teal-500 hover:bg-teal-600 text-black">
            Reintentar
          </Button>
        </div>
      </div>
    );
  }

  const employeeStats = [
    {
      title: "Días Trabajados",
      value: "120",
      icon: Calendar,
      color: "text-blue-400"
    },
    {
      title: "Horas Totales",
      value: "960h",
      icon: Clock,
      color: "text-green-400"
    },
    {
      title: "Promedio Diario",
      value: "8h",
      icon: Award,
      color: "text-purple-400"
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white pb-20 lg:pb-8">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header del Empleado */}
        <div className="relative mb-8">
          <div className="bg-gradient-to-r from-teal-500/20 to-blue-500/20 rounded-xl p-6">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <Avatar className="h-24 w-24 border-4 border-teal-400/50">
                <AvatarFallback className="bg-teal-500/20 text-teal-400 text-3xl">
                  {currentUser.email?.charAt(0)?.toUpperCase() || 'E'}
                </AvatarFallback>
              </Avatar>
              
              <div className="text-center md:text-left flex-1">
                <h1 className="text-3xl font-bold text-white mb-2">
                  Empleado #{currentUser.id.toString().slice(-6)}
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

        {/* Estadísticas del Empleado */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {employeeStats.map((stat, index) => (
            <Card key={index} className="bg-gray-900/50 border-gray-700">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm font-medium">{stat.title}</p>
                    <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-xl bg-gray-800/50 ${stat.color}`}>
                    <stat.icon className="h-6 w-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
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
                <Mail className="h-4 w-4 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-400">Email</p>
                  <p className="text-white font-medium">{currentUser.email}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <User className="h-4 w-4 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-400">ID de Empleado</p>
                  <p className="text-white font-medium font-mono">{currentUser.id}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Award className="h-4 w-4 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-400">Puesto</p>
                  <p className="text-white font-medium capitalize">
                    {currentUser.role === 'employee' ? 'Empleado' : currentUser.role}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Información de Contacto */}
          <Card className="bg-gray-900/50 border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Phone className="h-5 w-5 text-teal-400" />
                Información de Contacto
              </CardTitle>
              <CardDescription>
                Datos de contacto del empleado
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-400">Teléfono</p>
                  <p className="text-white font-medium">+1 (555) 123-4567</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-400">Ubicación</p>
                  <p className="text-white font-medium">Ciudad de México, México</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Clock className="h-4 w-4 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-400">Horario</p>
                  <p className="text-white font-medium">9:00 AM - 6:00 PM</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Actividad Reciente */}
          <Card className="bg-gray-900/50 border-gray-700 lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Clock className="h-5 w-5 text-teal-400" />
                Actividad Reciente
              </CardTitle>
              <CardDescription>
                Últimas jornadas laborales registradas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { date: "Hoy", hours: "8h 30m", status: "completed" },
                  { date: "Ayer", hours: "8h 00m", status: "completed" },
                  { date: "14 Jun", hours: "7h 45m", status: "completed" },
                  { date: "13 Jun", hours: "8h 15m", status: "completed" }
                ].map((activity, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gray-800/50">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span className="text-white font-medium">{activity.date}</span>
                    </div>
                    <div className="text-gray-300">{activity.hours}</div>
                  </div>
                ))}
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
