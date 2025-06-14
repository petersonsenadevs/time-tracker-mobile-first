
import React, { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { Clock, LogOut, TrendingUp, CalendarDays, Plus } from 'lucide-react';
import BottomNavBar from '@/components/BottomNavBar';
import WorkDayForm from '@/components/WorkDayForm';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      setSelectedDate(date);
      setIsFormOpen(true);
    }
  };

  const handleWorkDaySubmit = (data: any) => {
    console.log('WorkDay data:', { date: selectedDate, ...data });
    // TODO: Implementar envío de datos al servidor
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Mobile Header */}
      <header className="bg-gray-900/90 backdrop-blur-sm border-b border-teal-500/20 sticky top-0 z-40">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <Clock className="h-8 w-8 text-teal-400" />
              <span className="text-lg font-bold text-white">TimeTracker</span>
            </div>

            {/* User Info + Logout */}
            <div className="flex items-center space-x-3">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium text-white">{user?.name}</p>
                <p className="text-xs text-gray-400">{user?.email}</p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={logout}
                className="text-gray-400 hover:text-red-400 hover:bg-red-500/10 h-8 w-8 p-0"
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 py-6 pb-20 md:pb-6">
        {/* Welcome Section */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-white mb-1">
            ¡Hola, {user?.name?.split(' ')[0]}! 👋
          </h1>
          <p className="text-gray-400">Gestiona tus jornadas laborales de forma fácil</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <Card className="bg-gradient-to-br from-teal-500/20 to-teal-600/10 border-teal-500/30">
            <CardHeader className="pb-3">
              <CardTitle className="text-white flex items-center text-base">
                <TrendingUp className="h-5 w-5 mr-2 text-teal-400" />
                Horas este mes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white mb-1">156.5h</div>
              <p className="text-teal-300 text-sm">+12h vs mes anterior</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-500/20 to-blue-600/10 border-blue-500/30">
            <CardHeader className="pb-3">
              <CardTitle className="text-white flex items-center text-base">
                <CalendarDays className="h-5 w-5 mr-2 text-blue-400" />
                Días trabajados
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white mb-1">22</div>
              <p className="text-blue-300 text-sm">de 30 días del mes</p>
            </CardContent>
          </Card>
        </div>

        {/* Calendar Section */}
        <Card className="bg-gray-900/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center justify-between">
              <span className="flex items-center">
                <CalendarDays className="h-5 w-5 mr-2 text-teal-400" />
                Calendario de Jornadas
              </span>
              <Button
                size="sm"
                className="bg-teal-500 hover:bg-teal-600 text-black"
                onClick={() => setIsFormOpen(true)}
              >
                <Plus className="h-4 w-4 mr-1" />
                Nueva
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={handleDateSelect}
                className="rounded-md border-gray-700"
                classNames={{
                  day_selected: "bg-teal-500 text-black hover:bg-teal-600",
                  day_today: "bg-gray-700 text-white",
                  day: "text-gray-300 hover:bg-gray-700 hover:text-white",
                  head_cell: "text-gray-400",
                  caption_label: "text-white",
                  nav_button: "text-gray-400 hover:text-white hover:bg-gray-700",
                }}
              />
            </div>
            <p className="text-center text-sm text-gray-400 mt-4">
              Toca una fecha para agregar una nueva jornada
            </p>
          </CardContent>
        </Card>
      </main>

      {/* Bottom Navigation (Mobile only) */}
      <BottomNavBar />

      {/* Work Day Form Modal */}
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
