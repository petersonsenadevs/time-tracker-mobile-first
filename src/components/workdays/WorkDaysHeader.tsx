
import React from 'react';
import { Clock } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

interface WorkDaysHeaderProps {
  currentSearchDate: string;
  hasData: boolean;
}

const WorkDaysHeader = ({ currentSearchDate, hasData }: WorkDaysHeaderProps) => {
  const formatDateForDisplay = (dateString: string) => {
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
  };

  const formatDateWithDayName = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, 'EEEE, d MMMM yyyy', { locale: es });
  };

  return (
    <>
      {/* Main Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
          <Clock className="h-8 w-8 text-teal-400" />
          Jornadas Laborales
        </h1>
        <p className="text-gray-400">Busca y consulta los detalles de tus jornadas de trabajo</p>
      </div>

      {/* Date Header - only show when there's data */}
      {hasData && (
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-teal-400">
            {formatDateWithDayName(currentSearchDate)}
          </h2>
          <p className="text-gray-400 mt-1">
            {formatDateForDisplay(currentSearchDate)}
          </p>
        </div>
      )}
    </>
  );
};

export default WorkDaysHeader;
