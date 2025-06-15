
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { workSessionService, WorkSession } from '@/services/workSessionService';
import { format } from 'date-fns';
import { Calendar } from 'lucide-react';
import BottomNavBar from '@/components/BottomNavBar';
import AppHeader from '@/components/AppHeader';
import EditWorkSessionForm from '@/components/EditWorkSessionForm';
import WorkDaysSearch from '@/components/workdays/WorkDaysSearch';
import WorkSessionCard from '@/components/workdays/WorkSessionCard';
import { LoadingState, ErrorState, EmptyState } from '@/components/workdays/WorkDaysStates';
import { toast } from '@/components/ui/use-toast';

const WorkDays = () => {
  const { token, logout } = useAuth();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [currentSearchDate, setCurrentSearchDate] = useState<string>(format(new Date(), 'yyyy-MM-dd'));
  const [editingSession, setEditingSession] = useState<WorkSession | null>(null);
  const queryClient = useQueryClient();

  const { data: workSessionData, isLoading, error } = useQuery({
    queryKey: ['workSessions', currentSearchDate, token],
    queryFn: () => {
      return workSessionService.getWorkSessions(currentSearchDate, token!);
    },
    enabled: !!token && !!currentSearchDate,
  });

  const deleteSessionMutation = useMutation({
    mutationFn: (date: string) => workSessionService.deleteWorkSession(date, token!),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workSessions', currentSearchDate, token] });
      toast({
        title: "Éxito",
        description: "Jornada eliminada correctamente",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "No se pudo eliminar la jornada",
        variant: "destructive",
      });
    },
  });

  const workSessions = workSessionData?.hour_session_with_hour_worked || [];

  const handleSearch = () => {
    if (selectedDate) {
      const formattedDate = format(selectedDate, 'yyyy-MM-dd');
      setCurrentSearchDate(formattedDate);
    }
  };

  const handleDateChange = (date: Date | undefined) => {
    if (date) {
      setSelectedDate(date);
      const formattedDate = format(date, 'yyyy-MM-dd');
      setCurrentSearchDate(formattedDate);
    }
  };

  const handleDeleteSession = (session: WorkSession) => {
    if (confirm('¿Estás seguro de que quieres eliminar esta jornada?')) {
      deleteSessionMutation.mutate(session.date);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <AppHeader 
        pageTitle="Días Trabajados"
        pageIcon={Calendar}
        onLogout={logout}
        showUserInfo={false}
        showActions={true}
      />

      <div className="container mx-auto px-4 py-6 max-w-4xl flex-1 pb-20 lg:pb-6">
        <div className="mb-6">
          <p className="text-gray-400 text-sm">
            {currentSearchDate && workSessions.length > 0 
              ? `Mostrando datos para ${format(new Date(currentSearchDate), 'dd/MM/yyyy')}`
              : 'Busca sesiones de trabajo por fecha'
            }
          </p>
        </div>

        <WorkDaysSearch
          selectedDate={selectedDate}
          onDateChange={handleDateChange}
          onSearch={handleSearch}
        />

        <div className="space-y-6">
          {isLoading ? (
            <LoadingState />
          ) : error ? (
            <ErrorState />
          ) : workSessions.length === 0 ? (
            <EmptyState currentSearchDate={currentSearchDate} />
          ) : (
            workSessions.map((session, index) => (
              <WorkSessionCard
                key={index}
                session={session}
                index={index}
                onEdit={setEditingSession}
                onDelete={handleDeleteSession}
              />
            ))
          )}
        </div>
      </div>

      <BottomNavBar />

      {editingSession && (
        <EditWorkSessionForm
          session={editingSession}
          isOpen={!!editingSession}
          onClose={() => setEditingSession(null)}
        />
      )}
    </div>
  );
};

export default WorkDays;
