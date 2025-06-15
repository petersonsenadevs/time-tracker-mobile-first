
import { useAuth } from '@/contexts/AuthContext';
import { useQuery } from '@tanstack/react-query';
import { userService } from '@/services/userService';
import BottomNavBar from '@/components/BottomNavBar';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import WelcomeSection from '@/components/dashboard/WelcomeSection';
import StatsCards from '@/components/dashboard/StatsCards';
import DashboardCarousel from '@/components/dashboard/DashboardCarousel';
import WorkDayForm from '@/components/WorkDayForm';
import { useState } from 'react';

const Dashboard = () => {
  const { user, token, logout, dashboardStats } = useAuth();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [isWorkDayFormOpen, setIsWorkDayFormOpen] = useState(false);

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

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <DashboardHeader 
        user={currentUser || { id: user?.id || '', email: user?.email || '', name: user?.name, role: user?.role || 'employee' }} 
        onLogout={logout} 
      />
      
      <div className="flex-1 container mx-auto px-4 py-6 max-w-7xl pb-20">
        <WelcomeSection 
          user={currentUser || { id: user?.id || '', email: user?.email || '', name: user?.name, role: user?.role || 'employee' }} 
        />
        
        <StatsCards dashboardStats={dashboardStats} />
        
        <DashboardCarousel
          dashboardStats={dashboardStats}
          employee={employee}
          isLoadingEmployee={isLoadingEmployee}
          selectedDate={selectedDate}
          onDateSelect={handleDateSelect}
          onNewWorkDay={handleNewWorkDay}
        />
      </div>

      <WorkDayForm
        selectedDate={selectedDate}
        isOpen={isWorkDayFormOpen}
        onClose={handleCloseWorkDayForm}
        onSubmit={handleWorkDaySubmit}
      />

      <BottomNavBar />
    </div>
  );
};

export default Dashboard;
