
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { AlertCircle, Calendar as CalendarIcon } from 'lucide-react';

interface LoadingStateProps {}

export const LoadingState = ({}: LoadingStateProps) => {
  return (
    <Card className="bg-gray-900 border-gray-700">
      <CardContent className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-400 mx-auto mb-4"></div>
          <p className="text-gray-300">Cargando datos...</p>
        </div>
      </CardContent>
    </Card>
  );
};

interface ErrorStateProps {}

export const ErrorState = ({}: ErrorStateProps) => {
  return (
    <Card className="bg-red-900/20 border-red-500/30">
      <CardContent className="flex items-center gap-3 py-6">
        <AlertCircle className="h-6 w-6 text-red-400" />
        <span className="text-red-300">Error al cargar los datos</span>
      </CardContent>
    </Card>
  );
};

interface EmptyStateProps {
  currentSearchDate: string;
}

export const EmptyState = ({ currentSearchDate }: EmptyStateProps) => {
  const formatDateForDisplay = (dateString: string) => {
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
  };

  return (
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
  );
};
