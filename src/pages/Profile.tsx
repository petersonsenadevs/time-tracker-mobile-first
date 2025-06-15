
import { useAuth } from '@/contexts/AuthContext';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { userService } from '@/services/userService';
import BottomNavBar from '@/components/BottomNavBar';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import ProfileLoadingState from '@/components/profile/ProfileLoadingState';
import ProfileErrorState from '@/components/profile/ProfileErrorState';
import ProfileContent from '@/components/profile/ProfileContent';

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
    return <ProfileLoadingState onRetry={() => refetchEmployee()} />;
  }

  if (!employee || !currentUser) {
    return <ProfileErrorState onRetry={() => refetchEmployee()} />;
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <ProfileContent
        employee={employee}
        currentUser={currentUser}
        isEditing={isEditing}
        onEdit={() => setIsEditing(true)}
        onSave={handleSaveEmployee}
        onCancel={() => setIsEditing(false)}
        isUpdating={updateEmployeeMutation.isPending}
      />
      <BottomNavBar />
    </div>
  );
};

export default Profile;
