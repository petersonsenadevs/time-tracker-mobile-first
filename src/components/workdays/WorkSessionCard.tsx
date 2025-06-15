
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Timer, Clock, Briefcase, Pencil, Trash2 } from 'lucide-react';
import { WorkSession } from '@/services/workSessionService';

interface WorkSessionCardProps {
  session: WorkSession;
  index: number;
  onEdit: (session: WorkSession) => void;
  onDelete: (session: WorkSession) => void;
}

const WorkSessionCard = ({ session, index, onEdit, onDelete }: WorkSessionCardProps) => {
  const formatTime = (time: string) => {
    return time.slice(0, 5);
  };

  const parseHours = (hoursString: string) => {
    return parseFloat(hoursString);
  };

  const getTotalHours = (session: WorkSession) => {
    return parseHours(session.hour_worked.normal_hours) + 
           parseHours(session.hour_worked.overtime_hours) + 
           parseHours(session.hour_worked.night_hours) + 
           parseHours(session.hour_worked.holiday_hours);
  };

  return (
    <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700">
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
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onEdit(session)}
                className="text-gray-400 hover:text-teal-400 h-8 w-8 p-0"
              >
                <Pencil className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onDelete(session)}
                className="text-gray-400 hover:text-red-400 h-8 w-8 p-0"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
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
  );
};

export default WorkSessionCard;
