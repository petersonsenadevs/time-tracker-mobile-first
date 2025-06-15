
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface RegisterNavigationProps {
  currentStep: number;
  isLoading: boolean;
  onPrevious: () => void;
  onNext: () => void;
}

const RegisterNavigation = ({ currentStep, isLoading, onPrevious, onNext }: RegisterNavigationProps) => {
  return (
    <div className="flex justify-between">
      <Button
        type="button"
        variant="outline"
        onClick={onPrevious}
        disabled={currentStep === 0 || isLoading}
        className="border-gray-600 text-gray-300 hover:bg-gray-800 h-9 sm:h-10 text-sm"
      >
        <ChevronLeft className="w-4 h-4 mr-1 sm:mr-2" />
        <span className="hidden xs:inline">Anterior</span>
        <span className="xs:hidden">Atrás</span>
      </Button>

      {currentStep === 0 ? (
        <Button
          type="button"
          onClick={onNext}
          disabled={isLoading}
          className="bg-teal-500 hover:bg-teal-600 text-black font-semibold h-9 sm:h-10 text-sm"
        >
          <span className="hidden xs:inline">Siguiente</span>
          <span className="xs:hidden">Continuar</span>
          <ChevronRight className="w-4 h-4 ml-1 sm:ml-2" />
        </Button>
      ) : (
        <Button
          type="submit"
          className="bg-teal-500 hover:bg-teal-600 text-black font-semibold h-9 sm:h-10 text-sm"
          disabled={isLoading}
        >
          {isLoading ? 'Creando...' : 'Crear Cuenta'}
        </Button>
      )}
    </div>
  );
};

export default RegisterNavigation;
