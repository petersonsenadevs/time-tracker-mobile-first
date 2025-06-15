
import { useMutation, useQuery } from '@tanstack/react-query';
import { useAuth } from '@/contexts/AuthContext';
import { userService, UpdateEmailData, ChangePasswordData } from '@/services/userService';
import { toast } from 'sonner';
import { Settings as SettingsIcon } from 'lucide-react';
import BottomNavBar from '@/components/BottomNavBar';
import AppHeader from '@/components/AppHeader';
import SettingsCarousel from '@/components/settings/SettingsCarousel';
import SettingsLoadingState from '@/components/settings/SettingsLoadingState';
import SettingsErrorState from '@/components/settings/SettingsErrorState';

const Settings = () => {
  const { token, logout } = useAuth();

  const { data: userInfo, refetch, isLoading } = useQuery({
    queryKey: ['user', token],
    queryFn: () => userService.showUser(token!),
    enabled: !!token,
  });

  const updateEmailMutation = useMutation({
    mutationFn: (data: UpdateEmailData) => userService.updateEmail(data, token!),
    onSuccess: (response) => {
      toast.success(response.message);
      refetch();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const changePasswordMutation = useMutation({
    mutationFn: (data: ChangePasswordData) => userService.changePassword(data, token!),
    onSuccess: (response) => {
      toast.success(response.message);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const deleteUserMutation = useMutation({
    mutationFn: () => userService.deleteUser(token!),
    onSuccess: (response) => {
      toast.success(response.message);
      logout();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleEmailUpdate = (email: string) => {
    updateEmailMutation.mutate({ email });
  };

  const handlePasswordChange = (data: ChangePasswordData) => {
    changePasswordMutation.mutate(data);
  };

  const handleDeleteAccount = () => {
    deleteUserMutation.mutate();
  };

  const currentUser = userInfo?.user;

  if (isLoading) {
    return <SettingsLoadingState />;
  }

  if (!currentUser) {
    return <SettingsErrorState onRetry={() => refetch()} />;
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col overflow-hidden lg:overflow-auto">
      <AppHeader 
        pageTitle="Configuración"
        pageIcon={SettingsIcon}
        onLogout={logout}
        showUserInfo={false}
        showActions={true}
      />

      <div className="flex-1 container mx-auto px-4 py-4 max-w-7xl pb-20 lg:pb-6 overflow-hidden lg:overflow-auto">
        <div className="h-full flex flex-col lg:block">
          <div className="flex-1 lg:flex-none">
            <SettingsCarousel
              user={currentUser}
              onUpdateEmail={handleEmailUpdate}
              onChangePassword={handlePasswordChange}
              onLogout={logout}
              onDeleteAccount={handleDeleteAccount}
              isEmailLoading={updateEmailMutation.isPending}
              isPasswordLoading={changePasswordMutation.isPending}
              isDeleting={deleteUserMutation.isPending}
            />
          </div>
        </div>
      </div>

      <BottomNavBar />
    </div>
  );
};

export default Settings;
