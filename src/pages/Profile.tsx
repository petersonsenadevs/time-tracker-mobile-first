
import { useAuth } from '@/contexts/AuthContext';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { userService } from '@/services/userService';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { User, Mail, Building, Award, Edit } from 'lucide-react';
import BottomNavBar from '@/components/BottomNavBar';
import { useState } from 'react';
import EditEmployeeForm from '@/components/profile/EditEmployeeForm';
import { useToast } from '@/hooks/use-toast';

const Profile = () => {
  const { token } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

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

  // Mutación para actualizar empleado
  const updateEmployeeMutation = useMutation({
    mutationFn: (data: any) => userService.updateEmployee(data, token!),
    onSuccess: (response) => {
      toast({
        title: "¡Éxito!",
        description: "Información del empleado actualizada correctamente",
      });
      setIsEditing(false);
      queryClient.invalidateQueries({ queryKey: ['employee', token] });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Error al actualizar la información del empleado",
        variant: "destructive",
      });
    },
  });

  const handleSaveEmployee = (data: any) => {
    updateEmployeeMutation.mutate(data);
  };

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
    <div className="min-h-screen bg-black text-white flex flex-col">
      <div className="flex-1 container mx-auto px-4 py-6 max-w-4xl pb-20">
        <div className="mb-4">
          <h2 className="text-xl md:text-2xl font-bold text-white">Información Personal</h2>
          <p className="text-sm md:text-base text-gray-400">Gestiona tu información personal y datos del empleado</p>
        </div>

        {isEditing ? (
          <EditEmployeeForm
            employee={employee}
            onSave={handleSaveEmployee}
            onCancel={() => setIsEditing(false)}
            isLoading={updateEmployeeMutation.isPending}
          />
        ) : (
          <div className="space-y-4 md:space-y-6">
            {/* Header del Empleado - Compacto */}
            <div className="bg-gradient-to-r from-teal-500/20 to-blue-500/20 rounded-xl p-4 md:p-6">
              <div className="flex flex-col items-center gap-4 text-center">
                <Avatar className="h-20 w-20 md:h-24 md:w-24 border-4 border-teal-400/50">
                  <AvatarFallback className="bg-teal-500/20 text-teal-400 text-2xl md:text-3xl">
                    {employee.name?.charAt(0)?.toUpperCase() || 'E'}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1">
                  <h1 className="text-xl md:text-3xl font-bold text-white mb-1 md:mb-2">
                    {employee.name || 'Empleado'}
                  </h1>
                  <p className="text-gray-300 text-sm md:text-lg mb-1">{currentUser.email}</p>
                  <div className="flex items-center justify-center gap-2 text-teal-400 text-sm">
                    <User className="h-3 w-3 md:h-4 md:w-4" />
                    <span className="capitalize">
                      {currentUser.role === 'employee' ? 'Empleado Activo' : currentUser.role}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-2">
                  <div className="bg-green-500/20 text-green-400 px-3 py-1 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-medium">
                    ● Activo
                  </div>
                  <Button
                    onClick={() => setIsEditing(true)}
                    size="sm"
                    className="bg-teal-500 hover:bg-teal-600 text-black text-xs md:text-sm"
                  >
                    <Edit className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
                    Editar
                  </Button>
                </div>
              </div>
            </div>

            {/* Información Personal Card - Optimizada */}
            <Card className="bg-gray-900/50 border-gray-700">
              <CardHeader className="pb-3 md:pb-6">
                <CardTitle className="flex items-center gap-2 text-white text-lg md:text-xl">
                  <User className="h-4 w-4 md:h-5 md:w-5 text-teal-400" />
                  Información Personal
                </CardTitle>
                <CardDescription className="text-sm">
                  Datos básicos del empleado
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 md:space-y-4 pt-0">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                  <div className="flex items-center gap-3 p-3 bg-gray-800/30 rounded-lg">
                    <User className="h-4 w-4 text-gray-400 flex-shrink-0" />
                    <div className="min-w-0 flex-1">
                      <p className="text-xs md:text-sm text-gray-400">Nombre Completo</p>
                      <p className="text-white font-medium text-sm md:text-base truncate">{employee.name}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-gray-800/30 rounded-lg">
                    <Mail className="h-4 w-4 text-gray-400 flex-shrink-0" />
                    <div className="min-w-0 flex-1">
                      <p className="text-xs md:text-sm text-gray-400">Email</p>
                      <p className="text-white font-medium text-sm md:text-base truncate">{currentUser.email}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 bg-gray-800/30 rounded-lg">
                    <Building className="h-4 w-4 text-gray-400 flex-shrink-0" />
                    <div className="min-w-0 flex-1">
                      <p className="text-xs md:text-sm text-gray-400">Empresa</p>
                      <p className="text-white font-medium text-sm md:text-base truncate">{employee.company_name || 'No especificada'}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-gray-800/30 rounded-lg">
                    <Award className="h-4 w-4 text-gray-400 flex-shrink-0" />
                    <div className="min-w-0 flex-1">
                      <p className="text-xs md:text-sm text-gray-400">ID de Empleado</p>
                      <p className="text-white font-medium font-mono text-sm md:text-base">{currentUser.id}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      <BottomNavBar />
    </div>
  );
};

export default Profile;
