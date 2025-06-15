
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, Calendar, Timer } from 'lucide-react';
import { WorkSession } from '@/services/workSessionService';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

interface WorkSessionCardProps {
  workSession: WorkSession | null;
  selectedDate: Date;
  isLoading: boolean;
}

const WorkSessionCard = ({ workSession, selectedDate, isLoading }: WorkSessionCardProps) => {
  const formatTime = (time: string) => {
    return time.slice(0, 5); // Remove seconds
  };

  const formatHours = (hours: string) => {
    return parseFloat(hours).toFixed(1);
  };

  if (isLoading) {
    return (
      <Card className="bg-gray-900/50 border-gray-700 h-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Clock className="h-5 w-5 text-teal-400" />
            Jornada Laboral
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-400"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!workSession) {
    return (
      <Card className="bg-gray-900/50 border-gray-700 h-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Clock className="h-5 w-5 text-teal-400" />
            Jornada Laboral
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <Calendar className="h-12 w-12 text-gray-500 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-300 mb-2">
              Sin jornada registrada
            </h3>
            <p className="text-gray-500 text-sm">
              No hay datos de trabajo para el {format(selectedDate, 'dd/MM/yyyy', { locale: es })}
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-gray-900/50 border-gray-700 h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white">
          <Clock className="h-5 w-5 text-teal-400" />
          Jornada del {format(selectedDate, 'dd/MM/yyyy', { locale: es })}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Horario de trabajo */}
        <div className="bg-gray-800/50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-3">
            <Timer className="h-4 w-4 text-blue-400" />
            <span className="text-blue-400 font-medium">Horario</span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-gray-400 text-sm">Inicio</p>
              <p className="text-white text-lg font-medium">{formatTime(workSession.start_time)}</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm">Fin</p>
              <p className="text-white text-lg font-medium">{formatTime(workSession.end_time)}</p>
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-gray-700">
            <p className="text-gray-400 text-sm">Horas planificadas</p>
            <p className="text-white font-medium">{workSession.planned_hours}h</p>
          </div>
        </div>

        {/* Horas trabajadas */}
        <div className="bg-gray-800/50 rounded-lg p-4">
          <h4 className="text-white font-medium mb-3">Horas Trabajadas</h4>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-gradient-to-br from-green-500/20 to-green-600/20 rounded-lg p-3 border border-green-500/30">
              <p className="text-green-400 text-sm">Normales</p>
              <p className="text-white text-lg font-bold">{formatHours(workSession.hour_worked.normal_hours)}h</p>
            </div>
            <div className="bg-gradient-to-br from-orange-500/20 to-orange-600/20 rounded-lg p-3 border border-orange-500/30">
              <p className="text-orange-400 text-sm">Extra</p>
              <p className="text-white text-lg font-bold">{formatHours(workSession.hour_worked.overtime_hours)}h</p>
            </div>
            <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 rounded-lg p-3 border border-purple-500/30">
              <p className="text-purple-400 text-sm">Nocturnas</p>
              <p className="text-white text-lg font-bold">{formatHours(workSession.hour_worked.night_hours)}h</p>
            </div>
            <div className="bg-gradient-to-br from-yellow-500/20 to-yellow-600/20 rounded-lg p-3 border border-yellow-500/30">
              <p className="text-yellow-400 text-sm">Festivas</p>
              <p className="text-white text-lg font-bold">{formatHours(workSession.hour_worked.holiday_hours)}h</p>
            </div>
          </div>
        </div>

        {/* Tipo de trabajo */}
        <div className="bg-gray-800/50 rounded-lg p-4">
          <p className="text-gray-400 text-sm mb-1">Tipo de jornada</p>
          <span className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${
            workSession.work_type === 'is_normal' 
              ? 'bg-teal-500/20 text-teal-400 border border-teal-500/30'
              : 'bg-orange-500/20 text-orange-400 border border-orange-500/30'
          }`}>
            {workSession.work_type === 'is_normal' ? 'Normal' : 'Especial'}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default WorkSessionCard;
