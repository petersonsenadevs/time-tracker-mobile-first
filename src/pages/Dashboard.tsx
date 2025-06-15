
import { useAuth } from '@/contexts/AuthContext';
import { useQuery } from '@tanstack/react-query';
import { userService } from '@/services/userService';
import BottomNavBar from '@/components/BottomNavBar';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import WelcomeSection from '@/components/dashboard/WelcomeSection';
import StatsCards from '@/components/dashboard/StatsCards';
import CalendarSection from '@/components/dashboard/CalendarSection';
import SalaryInfoCard from '@/components/dashboard/SalaryInfoCard';
import StatisticsCard from '@/components/dashboard/StatisticsCard';
import DashboardCarousel from '@/components/dashboard/DashboardCarousel';
import { useState } from 'react';

const Dashboard = () => {
  const { user, token, logout, dashboardStats } = useAuth();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

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
    console.log('Nueva jornada de trabajo');
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
          onDateSelect={setSelectedDate}
          onNewWorkDay={handleNewWorkDay}
        />
      </div>

      <BottomNavBar />
    </div>
  );
};

export default Dashboard;
