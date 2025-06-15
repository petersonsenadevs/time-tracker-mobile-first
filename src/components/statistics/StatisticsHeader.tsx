
import { BarChart3 } from 'lucide-react';

const StatisticsHeader = () => {
  return (
    <div className="bg-gray-900/50 border-b border-gray-700 p-4">
      <div className="container mx-auto max-w-7xl">
        <div className="flex items-center gap-3">
          <BarChart3 className="h-6 w-6 text-teal-400" />
          <h1 className="text-xl font-bold text-white">Estadísticas</h1>
        </div>
        <p className="text-gray-400 text-sm mt-1">Reporte mensual de horas trabajadas</p>
      </div>
    </div>
  );
};

export default StatisticsHeader;
