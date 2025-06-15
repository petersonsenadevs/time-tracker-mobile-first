
import { useAuth } from '@/contexts/AuthContext';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { userService } from '@/services/userService';
import { User2 } from 'lucide-react';
import BottomNavBar from '@/components/BottomNavBar';
import AppHeader from '@/components/AppHeader';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import ProfileLoadingState from '@/components/profile/ProfileLoadingState';
import ProfileErrorState from '@/components/profile/ProfileErrorState';
import ProfileContent from '@/components/profile/ProfileContent';

const Profile = () => {
  const { token, logout } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: employeeInfo, refetch: refetchEmployee, isLoading: isLoadingEmployee } = useQuery({
    queryKey: ['employee', token],
    queryFn: () => userService.getEmployee(token!),
    enabled: !!token,
  });

  const { data: userInfo, isLoading: isLoadingUser } = useQuery({
    queryKey: ['user', token],
    queryFn: () => userService.showUser(token!),
    enabled: !!token,
  });

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
      <AppHeader 
        pageTitle="Perfil"
        pageIcon={User2}
        onLogout={logout}
        showUserInfo={false}
        showActions={true}
      />

      <div className="flex-1 pb-20 lg:pb-6">
        <ProfileContent
          employee={employee}
          currentUser={currentUser}
          isEditing={isEditing}
          onEdit={() => setIsEditing(true)}
          onSave={handleSaveEmployee}
          onCancel={() => setIsEditing(false)}
          isUpdating={updateEmployeeMutation.isPending}
        />
      </div>

      <BottomNavBar />
    </div>
  );
};

export default Profile;
