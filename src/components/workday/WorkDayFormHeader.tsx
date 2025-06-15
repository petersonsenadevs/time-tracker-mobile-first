
import React from 'react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface WorkDayFormHeaderProps {
  selectedDate: Date;
  onClose: () => void;
}

const WorkDayFormHeader = ({ selectedDate, onClose }: WorkDayFormHeaderProps) => {
  return (
    <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-700 flex-shrink-0">
      <div>
        <h2 className="text-lg sm:text-xl font-semibold text-white">Nueva Jornada</h2>
        <p className="text-xs sm:text-sm text-gray-400">
          {format(selectedDate, "EEEE, d 'de' MMMM 'de' yyyy", { locale: es })}
        </p>
      </div>
      <Button
        variant="ghost"
        size="sm"
        onClick={onClose}
        className="text-gray-400 hover:text-white h-8 w-8 p-0 flex-shrink-0"
      >
        <X className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default WorkDayFormHeader;
