
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useQuery } from '@tanstack/react-query';
import { workSessionService, WorkSession } from '@/services/workSessionService';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, Calendar as CalendarIcon, AlertCircle } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import BottomNavBar from '@/components/BottomNavBar';

const WorkDays = () => {
  const { token } = useAuth();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const { data: workSessionData, isLoading, error } = useQuery({
    queryKey: ['workSessions', selectedDate, token],
    queryFn: () => workSessionService.getWorkSessions(format(selectedDate, 'yyyy-MM-dd'), token!),
    enabled: !!token,
  });

  const workSessions = workSessionData?.hour_session_with_hour_worked || [];

  const formatTime = (time: string) => {
    return time.slice(0, 5); // Eliminar los segundos
  };

  const parseHours = (hoursString: string) => {
    return parseFloat(hoursString);
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <div className="container mx-auto px-4 py-6 max-w-4xl flex-1 pb-20 lg:pb-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-white mb-2">Jornadas Laborales</h1>
          <p className="text-gray-400">Selecciona una fecha para ver los detalles de tu jornada</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Calendario */}
          <Card className="bg-gray-900 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <CalendarIcon className="h-5 w-5 text-teal-400" />
                Seleccionar Fecha
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={(date) => date && setSelectedDate(date)}
                className="rounded-md border border-gray-700 bg-gray-800"
                locale={es}
              />
            </CardContent>
          </Card>

          {/* Resumen del día seleccionado */}
          <Card className="bg-gray-900 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Clock className="h-5 w-5 text-teal-400" />
                {format(selectedDate, 'EEEE, d MMMM yyyy', { locale: es })}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="flex items-center justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-400"></div>
                </div>
              ) : error ? (
                <div className="flex items-center gap-2 text-red-400 py-4">
                  <AlertCircle className="h-5 w-5" />
                  <span>Error al cargar los datos</span>
                </div>
              ) : workSessions.length === 0 ? (
                <div className="text-center py-8 text-gray-400">
                  <Clock className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No hay jornadas registradas para esta fecha</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {workSessions.map((session, index) => (
                    <div key={index} className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-400">Horario</span>
                        <span className="text-white font-medium">
                          {formatTime(session.start_time)} - {formatTime(session.end_time)}
                        </span>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-400">Horas planificadas</span>
                        <span className="text-white font-medium">{session.planned_hours}h</span>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-400">Tipo de trabajo</span>
                        <span className="text-white font-medium capitalize">
                          {session.work_type.replace('is_', '').replace('_', ' ')}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Desglose de horas trabajadas */}
        {workSessions.length > 0 && (
          <Card className="bg-gray-900 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Desglose de Horas Trabajadas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {workSessions.map((session, sessionIndex) => (
                  <div key={sessionIndex} className="space-y-4">
                    <div className="bg-gradient-to-br from-teal-500/20 to-teal-600/10 border-teal-500/30 rounded-lg border p-4">
                      <div className="text-sm text-teal-300 mb-1">Horas Normales</div>
                      <div className="text-xl font-bold text-white">
                        {parseHours(session.hour_worked.normal_hours).toFixed(1)}h
                      </div>
                    </div>
                    
                    <div className="bg-gradient-to-br from-orange-500/20 to-orange-600/10 border-orange-500/30 rounded-lg border p-4">
                      <div className="text-sm text-orange-300 mb-1">Horas Extra</div>
                      <div className="text-xl font-bold text-white">
                        {parseHours(session.hour_worked.overtime_hours).toFixed(1)}h
                      </div>
                    </div>
                    
                    <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/10 border-purple-500/30 rounded-lg border p-4">
                      <div className="text-sm text-purple-300 mb-1">Horas Nocturnas</div>
                      <div className="text-xl font-bold text-white">
                        {parseHours(session.hour_worked.night_hours).toFixed(1)}h
                      </div>
                    </div>
                    
                    <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/10 border-blue-500/30 rounded-lg border p-4">
                      <div className="text-sm text-blue-300 mb-1">Horas Festivas</div>
                      <div className="text-xl font-bold text-white">
                        {parseHours(session.hour_worked.holiday_hours).toFixed(1)}h
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      <BottomNavBar />
    </div>
  );
};

export default WorkDays;
