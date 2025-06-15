
import { useMutation, useQuery } from '@tanstack/react-query';
import { useAuth } from '@/contexts/AuthContext';
import { userService, UpdateEmailData, ChangePasswordData } from '@/services/userService';
import { toast } from 'sonner';
import { Settings as SettingsIcon } from 'lucide-react';
import BottomNavBar from '@/components/BottomNavBar';
import AppHeader from '@/components/AppHeader';
import SettingsCategories from '@/components/settings/SettingsCategories';
import PersonalInfoCard from '@/components/settings/PersonalInfoCard';
import UpdateEmailCard from '@/components/settings/UpdateEmailCard';
import ChangePasswordCard from '@/components/settings/ChangePasswordCard';
import DangerZoneCard from '@/components/settings/DangerZoneCard';
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
    <div className="min-h-screen bg-black text-white pb-20 lg:pb-8">
      <AppHeader 
        pageTitle="Configuración"
        pageIcon={SettingsIcon}
        onLogout={logout}
        showUserInfo={false}
        showActions={true}
      />

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="mb-8">
          <p className="text-gray-400">Gestiona tu cuenta y preferencias</p>
        </div>

        <SettingsCategories />

        <div className="grid gap-6 lg:grid-cols-2">
          <PersonalInfoCard user={currentUser} />
          <UpdateEmailCard 
            onUpdateEmail={handleEmailUpdate}
            isLoading={updateEmailMutation.isPending}
          />
          <ChangePasswordCard 
            onChangePassword={handlePasswordChange}
            isLoading={changePasswordMutation.isPending}
          />
          <DangerZoneCard 
            onLogout={logout}
            onDeleteAccount={handleDeleteAccount}
            isDeleting={deleteUserMutation.isPending}
          />
        </div>
      </div>

      <BottomNavBar />
    </div>
  );
};

export default Settings;
