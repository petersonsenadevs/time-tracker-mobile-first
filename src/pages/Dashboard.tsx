
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useQuery } from '@tanstack/react-query';
import { userService } from '@/services/userService';
import BottomNavBar from '@/components/BottomNavBar';
import WorkDayForm from '@/components/WorkDayForm';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import WelcomeSection from '@/components/dashboard/WelcomeSection';
import DashboardCarousel from '@/components/dashboard/DashboardCarousel';

const Dashboard = () => {
  const { user, dashboardStats, logout, token } = useAuth();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [isFormOpen, setIsFormOpen] = useState(false);

  const { data: employeeInfo, isLoading: isLoadingEmployee } = useQuery({
    queryKey: ['employee', token],
    queryFn: () => userService.getEmployee(token!),
    enabled: !!token,
  });

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      setSelectedDate(date);
      setIsFormOpen(true);
    }
  };

  const handleWorkDaySubmit = (data: any) => {
    console.log('WorkDay data:', { date: selectedDate, ...data });
  };

  const employee = employeeInfo?.employee;

  return (
    <div className="min-h-screen bg-black">
      <DashboardHeader user={user} onLogout={logout} />

      <main className="px-4 py-6 pb-20 md:pb-6">
        <WelcomeSection user={user} />
        
        <DashboardCarousel
          dashboardStats={dashboardStats}
          employee={employee}
          isLoadingEmployee={isLoadingEmployee}
          selectedDate={selectedDate}
          onDateSelect={handleDateSelect}
          onNewWorkDay={() => setIsFormOpen(true)}
        />
      </main>

      <BottomNavBar />

      <WorkDayForm
        selectedDate={selectedDate}
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleWorkDaySubmit}
      />
    </div>
  );
};

export default Dashboard;
