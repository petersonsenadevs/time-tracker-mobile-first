
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface OnboardingNavigationProps {
  currentStep: number;
  totalSteps: number;
  onPrevStep: () => void;
  onNextStep: () => void;
  onSkip: () => void;
  onFinish: () => void;
}

const OnboardingNavigation = ({ 
  currentStep, 
  totalSteps, 
  onPrevStep, 
  onNextStep, 
  onSkip, 
  onFinish 
}: OnboardingNavigationProps) => {
  return (
    <div className="flex items-center justify-between pt-4">
      <button
        onClick={onPrevStep}
        disabled={currentStep === 0}
        className={`flex items-center space-x-2 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
          currentStep === 0 
            ? 'bg-gray-700 text-gray-500 cursor-not-allowed' 
            : 'bg-gray-700 text-white hover:bg-gray-600 transform hover:scale-105'
        }`}
      >
        <ChevronLeft className="w-4 h-4" />
        <span>Anterior</span>
      </button>

      <button
        onClick={onSkip}
        className="text-gray-400 hover:text-white transition-colors text-sm font-medium"
      >
        Saltar tutorial
      </button>

      {currentStep === totalSteps - 1 ? (
        <button
          onClick={onFinish}
          className="bg-teal-500 hover:bg-teal-600 text-black font-semibold px-6 py-3 rounded-lg text-sm transition-all duration-300 transform hover:scale-105"
        >
          ¡Comenzar!
        </button>
      ) : (
        <button
          onClick={onNextStep}
          className="flex items-center space-x-2 bg-teal-500 hover:bg-teal-600 text-black font-semibold px-4 py-3 rounded-lg text-sm transition-all duration-300 transform hover:scale-105"
        >
          <span>Siguiente</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

export default OnboardingNavigation;
