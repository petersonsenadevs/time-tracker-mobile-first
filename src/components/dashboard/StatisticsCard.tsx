
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Award } from 'lucide-react';
import { Employee } from '@/services/userService';

interface StatisticsCardProps {
  employee: Employee | undefined;
}

const StatisticsCard = ({ employee }: StatisticsCardProps) => {
  return (
    <Card className="bg-gray-900/50 border-gray-700 h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white">
          <Award className="h-5 w-5 text-teal-400" />
          Estadísticas del Empleado
        </CardTitle>
        <CardDescription className="text-gray-400">
          Resumen de actividad laboral
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="text-center p-6 bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-lg border border-blue-500/30">
            <div className="text-4xl font-bold text-white mb-2">0</div>
            <div className="text-gray-400 text-sm">Días Trabajados</div>
            <div className="text-blue-400 text-xs mt-1">Este mes</div>
          </div>
          <div className="text-center p-6 bg-gradient-to-br from-green-500/20 to-green-600/20 rounded-lg border border-green-500/30">
            <div className="text-4xl font-bold text-white mb-2">0h</div>
            <div className="text-gray-400 text-sm">Horas Totales</div>
            <div className="text-green-400 text-xs mt-1">Acumuladas</div>
          </div>
          <div className="text-center p-6 bg-gradient-to-br from-teal-500/20 to-teal-600/20 rounded-lg border border-teal-500/30">
            <div className="text-4xl font-bold text-white mb-2">
              {employee ? `€${employee.normal_hourly_rate}` : '€0.00'}
            </div>
            <div className="text-gray-400 text-sm">Tarifa por Hora</div>
            <div className="text-teal-400 text-xs mt-1">Actual</div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="p-4 bg-gray-800/50 rounded-lg">
            <h4 className="text-white font-medium mb-2">Rendimiento Semanal</h4>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div className="bg-teal-400 h-2 rounded-full w-0"></div>
            </div>
            <p className="text-gray-400 text-sm mt-1">0% de la meta semanal completada</p>
          </div>

          <div className="p-4 bg-gray-800/50 rounded-lg">
            <h4 className="text-white font-medium mb-2">Últimas Actividades</h4>
            <p className="text-gray-400 text-sm">No hay registros de actividad aún</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatisticsCard;
