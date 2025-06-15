
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
    <div className="flex justify-between pt-6">
      <Button
        type="button"
        variant="outline"
        onClick={onPrevious}
        disabled={currentStep === 0 || isLoading}
        className="border-gray-600 text-gray-300 hover:bg-gray-800"
      >
        <ChevronLeft className="w-4 h-4 mr-2" />
        Anterior
      </Button>

      {currentStep === 0 ? (
        <Button
          type="button"
          onClick={onNext}
          disabled={isLoading}
          className="bg-teal-500 hover:bg-teal-600 text-black font-semibold"
        >
          Siguiente
          <ChevronRight className="w-4 h-4 ml-2" />
        </Button>
      ) : (
        <Button
          type="submit"
          className="bg-teal-500 hover:bg-teal-600 text-black font-semibold"
          disabled={isLoading}
        >
          {isLoading ? 'Creando cuenta...' : 'Crear Cuenta'}
        </Button>
      )}
    </div>
  );
};

export default RegisterNavigation;
