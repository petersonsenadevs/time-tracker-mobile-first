
import { useAuth } from '@/contexts/AuthContext';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { userService } from '@/services/userService';
import { authService } from '@/services/authService';
import { LayoutDashboard } from 'lucide-react';
import BottomNavBar from '@/components/BottomNavBar';
import AppHeader from '@/components/AppHeader';
import WelcomeSection from '@/components/dashboard/WelcomeSection';
import StatsCards from '@/components/dashboard/StatsCards';
import DashboardCarousel from '@/components/dashboard/DashboardCarousel';
import WorkDayForm from '@/components/WorkDayForm';
import OnboardingModal from '@/components/OnboardingModal';
import { useState, useEffect } from 'react';
import { toast } from 'sonner';

const Dashboard = () => {
  const { user, token, logout, dashboardStats, setDashboardStats } = useAuth();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [isWorkDayFormOpen, setIsWorkDayFormOpen] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const queryClient = useQueryClient();

  console.log('Dashboard - dashboardStats:', dashboardStats);
  console.log('Dashboard - countHourSessionDay específicamente:', dashboardStats?.countHourSessionDay);

  // Verificar si el usuario ya vio el onboarding
  useEffect(() => {
    console.log('Verificando onboarding - Usuario:', user);
    const onboardingCompleted = localStorage.getItem('onboarding-completed');
    console.log('Onboarding completed en localStorage:', onboardingCompleted);
    
    if (!onboardingCompleted && user) {
      console.log('Mostrando onboarding modal...');
      // Mostrar el modal después de un pequeño delay para que se cargue completamente el dashboard
      setTimeout(() => {
        setShowOnboarding(true);
        console.log('showOnboarding establecido a true');
      }, 1000);
    } else {
      console.log('No mostrando onboarding - completed:', onboardingCompleted, 'user:', user);
    }
  }, [user]);

  const { data: userInfo } = useQuery({
    queryKey: ['user', token],
    queryFn: () => userService.showUser(token!),
    enabled: !!token,
  });

  const { data: employeeInfo, isLoading: isLoadingEmployee } = useQuery({
    queryKey: ['employee', token],
    queryFn: () => userService.getEmployee(token!),
    enabled: !!token,
  });

  const currentUser = userInfo?.user;
  const employee = employeeInfo?.employee;

  const handleNewWorkDay = () => {
    setIsWorkDayFormOpen(true);
  };

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      setSelectedDate(date);
    }
  };

  const handleWorkDaySubmit = (data: any) => {
    console.log('Work day data:', data);
  };

  const handleCloseWorkDayForm = () => {
    setIsWorkDayFormOpen(false);
  };

  const handleRefresh = async () => {
    if (isRefreshing) return;
    
    try {
      setIsRefreshing(true);
      console.log('Iniciando actualización del dashboard...');
      
      await queryClient.invalidateQueries({ queryKey: ['user'] });
      await queryClient.invalidateQueries({ queryKey: ['employee'] });
      
      if (token) {
        const dashboardData = await authService.verifyDashboardAccess(token);
        console.log('Datos del dashboard actualizados:', dashboardData);
        
        if (dashboardData.dashboardData) {
          console.log('Estableciendo nuevos dashboardStats:', dashboardData.dashboardData);
          setDashboardStats(dashboardData.dashboardData);
        }
      }
      
      toast.success('Dashboard actualizado correctamente');
    } catch (error) {
      console.error('Error al actualizar el dashboard:', error);
      toast.error('Error al actualizar el dashboard');
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleCloseOnboarding = () => {
    console.log('Cerrando onboarding modal');
    setShowOnboarding(false);
  };

  console.log('Renderizando Dashboard - showOnboarding:', showOnboarding);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <AppHeader 
        pageTitle="Dashboard"
        pageIcon={LayoutDashboard}
        user={currentUser || { id: user?.id || '', email: user?.email || '', name: user?.name, role: user?.role || 'employee' }} 
        onLogout={logout}
        onRefresh={handleRefresh}
        isRefreshing={isRefreshing}
        showUserInfo={true}
        showActions={true}
      />
      
      <div className="flex-1 pt-4 pb-20 lg:pb-6 overflow-auto">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="space-y-6">
            <WelcomeSection 
              user={currentUser || { id: user?.id || '', email: user?.email || '', name: user?.name, role: user?.role || 'employee' }} 
            />
            
            <StatsCards dashboardStats={dashboardStats} />
            
            <div className="min-h-0">
              <DashboardCarousel
                dashboardStats={dashboardStats}
                employee={employee}
                isLoadingEmployee={isLoadingEmployee}
                selectedDate={selectedDate}
                onDateSelect={handleDateSelect}
                onNewWorkDay={handleNewWorkDay}
              />
            </div>
          </div>
        </div>
      </div>

      <WorkDayForm
        selectedDate={selectedDate}
        isOpen={isWorkDayFormOpen}
        onClose={handleCloseWorkDayForm}
        onSubmit={handleWorkDaySubmit}
      />

      <OnboardingModal
        isOpen={showOnboarding}
        onClose={handleCloseOnboarding}
      />

      <BottomNavBar />
    </div>
  );
};

export default Dashboard;
