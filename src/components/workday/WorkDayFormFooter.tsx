
import React from 'react';
import { Button } from '@/components/ui/button';

interface WorkDayFormFooterProps {
  onClose: () => void;
  onSubmit: () => void;
  isLoading: boolean;
}

const WorkDayFormFooter = ({ onClose, onSubmit, isLoading }: WorkDayFormFooterProps) => {
  return (
    <div className="flex gap-2 sm:gap-3 p-4 sm:p-6 border-t border-gray-700 flex-shrink-0">
      <Button
        type="button"
        variant="ghost"
        onClick={onClose}
        className="flex-1 text-gray-300 hover:text-white hover:bg-gray-800 h-9 text-sm"
        disabled={isLoading}
      >
        Cancelar
      </Button>
      <Button
        type="submit"
        onClick={onSubmit}
        className="flex-1 bg-teal-500 hover:bg-teal-600 text-black font-semibold h-9 text-sm"
        disabled={isLoading}
      >
        {isLoading ? 'Guardando...' : 'Guardar'}
      </Button>
    </div>
  );
};

export default WorkDayFormFooter;
