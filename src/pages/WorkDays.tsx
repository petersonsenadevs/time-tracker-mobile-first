
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useQuery } from '@tanstack/react-query';
import { workSessionService, WorkSession } from '@/services/workSessionService';
import { format } from 'date-fns';
import BottomNavBar from '@/components/BottomNavBar';
import EditWorkSessionForm from '@/components/EditWorkSessionForm';
import WorkDaysHeader from '@/components/workdays/WorkDaysHeader';
import WorkDaysSearch from '@/components/workdays/WorkDaysSearch';
import WorkSessionCard from '@/components/workdays/WorkSessionCard';
import { LoadingState, ErrorState, EmptyState } from '@/components/workdays/WorkDaysStates';

const WorkDays = () => {
  const { token } = useAuth();
  const [searchDate, setSearchDate] = useState<string>(format(new Date(), 'dd/MM/yyyy'));
  const [currentSearchDate, setCurrentSearchDate] = useState<string>(format(new Date(), 'yyyy-MM-dd'));
  const [editingSession, setEditingSession] = useState<WorkSession | null>(null);

  const { data: workSessionData, isLoading, error } = useQuery({
    queryKey: ['workSessions', currentSearchDate, token],
    queryFn: () => {
      return workSessionService.getWorkSessions(currentSearchDate, token!);
    },
    enabled: !!token && !!currentSearchDate,
  });

  const workSessions = workSessionData?.hour_session_with_hour_worked || [];

  const handleSearch = () => {
    if (searchDate && searchDate.match(/^\d{2}\/\d{2}\/\d{4}$/)) {
      const [day, month, year] = searchDate.split('/');
      const formattedDate = `${year}-${month}-${day}`;
      setCurrentSearchDate(formattedDate);
    }
  };

  const handleDateInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, ''); // Solo números
    
    if (value.length >= 2) {
      value = value.substring(0, 2) + '/' + value.substring(2);
    }
    if (value.length >= 5) {
      value = value.substring(0, 5) + '/' + value.substring(5, 9);
    }
    
    setSearchDate(value);
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <div className="container mx-auto px-4 py-6 max-w-4xl flex-1 pb-20 lg:pb-6">
        <WorkDaysHeader 
          currentSearchDate={currentSearchDate} 
          hasData={workSessions.length > 0}
        />

        <WorkDaysSearch
          searchDate={searchDate}
          onSearchDateChange={handleDateInputChange}
          onSearch={handleSearch}
        />

        {/* Results Section */}
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
              />
            ))
          )}
        </div>
      </div>

      <BottomNavBar />

      {/* Edit Form Modal */}
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
