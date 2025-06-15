import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useQuery } from '@tanstack/react-query';
import { workSessionService, WorkSession } from '@/services/workSessionService';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Clock, Search, Calendar as CalendarIcon, AlertCircle, Timer, Briefcase, Pencil } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import BottomNavBar from '@/components/BottomNavBar';
import EditWorkSessionForm from '@/components/EditWorkSessionForm';

const WorkDays = () => {
  const { token } = useAuth();
  const [searchDate, setSearchDate] = useState<string>(format(new Date(), 'yyyy-MM-dd'));
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
    if (searchDate && searchDate.match(/^\d{4}-\d{2}-\d{2}$/)) {
      setCurrentSearchDate(searchDate);
    }
  };

  const handleDateInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, ''); // Solo números
    
    if (value.length >= 4) {
      value = value.substring(0, 4) + '-' + value.substring(4);
    }
    if (value.length >= 7) {
      value = value.substring(0, 7) + '-' + value.substring(7, 9);
    }
    
    setSearchDate(value);
  };

  const formatTime = (time: string) => {
    return time.slice(0, 5);
  };

  const parseHours = (hoursString: string) => {
    return parseFloat(hoursString);
  };

  const formatDateForDisplay = (dateString: string) => {
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
  };

  const formatDateWithDayName = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, 'EEEE, d MMMM yyyy', { locale: es });
  };

  const getTotalHours = (session: WorkSession) => {
    return parseHours(session.hour_worked.normal_hours) + 
           parseHours(session.hour_worked.overtime_hours) + 
           parseHours(session.hour_worked.night_hours) + 
           parseHours(session.hour_worked.holiday_hours);
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <div className="container mx-auto px-4 py-6 max-w-4xl flex-1 pb-20 lg:pb-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
            <Clock className="h-8 w-8 text-teal-400" />
            Jornadas Laborales
          </h1>
          <p className="text-gray-400">Busca y consulta los detalles de tus jornadas de trabajo</p>
        </div>

        {/* Search Section */}
        <Card className="bg-gradient-to-r from-gray-900 to-gray-800 border-gray-700 mb-8">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Search className="h-5 w-5 text-teal-400" />
              Buscar por Fecha
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4 items-end">
              <div className="flex-1">
                <label htmlFor="date-search" className="block text-sm font-medium text-gray-300 mb-2">
                  Fecha (YYYY-MM-DD)
                </label>
                <Input
                  id="date-search"
                  type="text"
                  placeholder="2025-06-15"
                  value={searchDate}
                  onChange={handleDateInputChange}
                  className="bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:ring-teal-400 focus:border-teal-400"
                  maxLength={10}
                />
              </div>
              <Button 
                onClick={handleSearch}
                className="bg-teal-500 hover:bg-teal-600 text-white px-6"
              >
                <Search className="h-4 w-4 mr-2" />
                Buscar
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Results Section */}
        <div className="space-y-6">
          {isLoading ? (
            <Card className="bg-gray-900 border-gray-700">
              <CardContent className="flex items-center justify-center py-12">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-400 mx-auto mb-4"></div>
                  <p className="text-gray-300">Cargando datos...</p>
                </div>
              </CardContent>
            </Card>
          ) : error ? (
            <Card className="bg-red-900/20 border-red-500/30">
              <CardContent className="flex items-center gap-3 py-6">
                <AlertCircle className="h-6 w-6 text-red-400" />
                <span className="text-red-300">Error al cargar los datos</span>
              </CardContent>
            </Card>
          ) : workSessions.length === 0 ? (
            <Card className="bg-gray-900 border-gray-700">
              <CardContent className="text-center py-12">
                <CalendarIcon className="h-16 w-16 mx-auto mb-4 text-gray-600" />
                <h3 className="text-xl font-semibold text-gray-300 mb-2">
                  No hay jornadas registradas
                </h3>
                <p className="text-gray-500">
                  No se encontraron datos para la fecha {formatDateForDisplay(currentSearchDate)}
                </p>
              </CardContent>
            </Card>
          ) : (
            <>
              {/* Date Header */}
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-teal-400">
                  {formatDateWithDayName(currentSearchDate)}
                </h2>
                <p className="text-gray-400 mt-1">
                  {formatDateForDisplay(currentSearchDate)}
                </p>
              </div>

              {/* Work Sessions */}
              {workSessions.map((session, index) => (
                <Card key={index} className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Briefcase className="h-5 w-5 text-teal-400" />
                        Jornada {index + 1}
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-lg font-bold text-teal-400">
                          {getTotalHours(session).toFixed(1)}h total
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setEditingSession(session)}
                          className="text-gray-400 hover:text-teal-400 h-8 w-8 p-0"
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Schedule Info */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-gray-800/50 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Timer className="h-4 w-4 text-blue-400" />
                          <span className="text-sm text-gray-400">Horario</span>
                        </div>
                        <div className="text-lg font-semibold text-white">
                          {formatTime(session.start_time)} - {formatTime(session.end_time)}
                        </div>
                      </div>
                      
                      <div className="bg-gray-800/50 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Clock className="h-4 w-4 text-green-400" />
                          <span className="text-sm text-gray-400">Horas Planificadas</span>
                        </div>
                        <div className="text-lg font-semibold text-white">
                          {session.planned_hours}h
                        </div>
                      </div>
                      
                      <div className="bg-gray-800/50 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Briefcase className="h-4 w-4 text-purple-400" />
                          <span className="text-sm text-gray-400">Tipo de Trabajo</span>
                        </div>
                        <div className="text-lg font-semibold text-white capitalize">
                          {session.work_type.replace('is_', '').replace('_', ' ')}
                        </div>
                      </div>
                    </div>

                    {/* Hours Breakdown */}
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-4">Desglose de Horas Trabajadas</h4>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="bg-gradient-to-br from-teal-500/20 to-teal-600/10 border-teal-500/30 rounded-lg border p-4">
                          <div className="text-sm text-teal-300 mb-1">Normales</div>
                          <div className="text-xl font-bold text-white">
                            {parseHours(session.hour_worked.normal_hours).toFixed(1)}h
                          </div>
                        </div>
                        
                        <div className="bg-gradient-to-br from-orange-500/20 to-orange-600/10 border-orange-500/30 rounded-lg border p-4">
                          <div className="text-sm text-orange-300 mb-1">Extra</div>
                          <div className="text-xl font-bold text-white">
                            {parseHours(session.hour_worked.overtime_hours).toFixed(1)}h
                          </div>
                        </div>
                        
                        <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/10 border-purple-500/30 rounded-lg border p-4">
                          <div className="text-sm text-purple-300 mb-1">Nocturnas</div>
                          <div className="text-xl font-bold text-white">
                            {parseHours(session.hour_worked.night_hours).toFixed(1)}h
                          </div>
                        </div>
                        
                        <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/10 border-blue-500/30 rounded-lg border p-4">
                          <div className="text-sm text-blue-300 mb-1">Festivas</div>
                          <div className="text-xl font-bold text-white">
                            {parseHours(session.hour_worked.holiday_hours).toFixed(1)}h
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </>
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
