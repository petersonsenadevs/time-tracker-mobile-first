
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface RegisterNavigationProps {
  currentStep: number;
  isLoading: boolean;
  onPrevious: () => void;
  onNext: () => void;
}

const RegisterNavigation = ({ currentStep, isLoading, onPrevious, onNext }: RegisterNavigationProps) => {
  return (
    <div className="space-y-4">
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

      <div className="text-center border-t border-gray-700 pt-4">
        <p className="text-gray-400 text-sm">
          ¿Ya tienes cuenta?{' '}
          <Link 
            to="/login" 
            className="text-teal-400 hover:text-teal-300 font-medium transition-colors underline"
          >
            Iniciar Sesión
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterNavigation;
