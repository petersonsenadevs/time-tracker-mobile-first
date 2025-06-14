
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
      <div className="flex-1 container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-white">Información Personal</h2>
          <p className="text-gray-400">Gestiona tu información personal y datos del empleado</p>
        </div>

        {isEditing ? (
          <EditEmployeeForm
            employee={employee}
            onSave={handleSaveEmployee}
            onCancel={() => setIsEditing(false)}
            isLoading={updateEmployeeMutation.isPending}
          />
        ) : (
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

                <div className="flex flex-col items-center gap-2">
                  <div className="bg-green-500/20 text-green-400 px-4 py-2 rounded-full text-sm font-medium">
                    ● Activo
                  </div>
                  <Button
                    onClick={() => setIsEditing(true)}
                    size="sm"
                    className="bg-teal-500 hover:bg-teal-600 text-black"
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Editar
                  </Button>
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
        )}
      </div>

      <BottomNavBar />
    </div>
  );
};

export default Profile;
