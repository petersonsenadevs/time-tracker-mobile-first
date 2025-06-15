
import { useState } from 'react';
import { X } from 'lucide-react';
import { Dialog, DialogContent, DialogOverlay, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';
import { onboardingSteps } from './onboarding/OnboardingStep';
import OnboardingProgress from './onboarding/OnboardingProgress';
import OnboardingContent from './onboarding/OnboardingContent';
import OnboardingNavigation from './onboarding/OnboardingNavigation';

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const OnboardingModal = ({ isOpen, onClose }: OnboardingModalProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isGlitching, setIsGlitching] = useState(false);
  const [dontShowAgain, setDontShowAgain] = useState(false);

  console.log('OnboardingModal - isOpen:', isOpen);
  console.log('OnboardingModal - currentStep:', currentStep);

  const nextStep = () => {
    console.log('Intentando ir al siguiente paso, currentStep actual:', currentStep);
    if (currentStep < onboardingSteps.length - 1) {
      triggerGlitch(() => {
        const newStep = currentStep + 1;
        console.log('Cambiando a paso:', newStep);
        setCurrentStep(newStep);
      });
    }
  };

  const prevStep = () => {
    console.log('Intentando ir al paso anterior, currentStep actual:', currentStep);
    if (currentStep > 0) {
      triggerGlitch(() => {
        const newStep = currentStep - 1;
        console.log('Cambiando a paso:', newStep);
        setCurrentStep(newStep);
      });
    }
  };

  const triggerGlitch = (callback: () => void) => {
    setIsGlitching(true);
    setTimeout(() => {
      callback();
      setTimeout(() => {
        setIsGlitching(false);
      }, 300);
    }, 150);
  };

  const handleClose = () => {
    console.log('OnboardingModal - handleClose called, dontShowAgain:', dontShowAgain);
    if (dontShowAgain) {
      localStorage.setItem('onboarding-completed', 'true');
      console.log('Guardado onboarding-completed en localStorage');
    }
    onClose();
  };

  const handleSkip = () => {
    console.log('OnboardingModal - handleSkip called, dontShowAgain:', dontShowAgain);
    if (dontShowAgain) {
      localStorage.setItem('onboarding-completed', 'true');
      console.log('Guardado onboarding-completed en localStorage (skip)');
    }
    onClose();
  };

  const handleFinish = () => {
    console.log('OnboardingModal - handleFinish called');
    localStorage.setItem('onboarding-completed', 'true');
    console.log('Guardado onboarding-completed en localStorage (finish)');
    onClose();
  };

  if (!isOpen) {
    console.log('OnboardingModal - No renderizando porque isOpen es false');
    return null;
  }

  console.log('OnboardingModal - Renderizando modal');

  const currentStepData = onboardingSteps[currentStep];

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogOverlay className="bg-black/90 backdrop-blur-sm" />
      <DialogContent className="max-w-4xl w-[90%] h-[80vh] bg-gray-900 border-gray-700 p-0 overflow-hidden rounded-xl">
        <DialogTitle className="sr-only">Tutorial de TimeTracker</DialogTitle>
        <DialogDescription className="sr-only">
          Aprende a usar la aplicación TimeTracker con este tutorial interactivo
        </DialogDescription>
        
        {/* Header */}
        <div className="relative p-6 border-b border-gray-700 bg-gray-800/50">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-white">Bienvenido a TimeTracker</h2>
              <p className="text-gray-400 text-sm mt-1">Descubre cómo usar la aplicación</p>
            </div>
            <button
              onClick={handleClose}
              className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-gray-700 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <OnboardingProgress 
            currentStep={currentStep} 
            totalSteps={onboardingSteps.length} 
          />
        </div>

        <OnboardingContent 
          step={currentStepData} 
          isGlitching={isGlitching} 
        />

        {/* Footer */}
        <div className="p-6 border-t border-gray-700 bg-gray-800/50">
          {/* Checkbox */}
          <div className="flex items-center space-x-3 mb-4">
            <Checkbox 
              id="dont-show-again"
              checked={dontShowAgain}
              onCheckedChange={(checked) => setDontShowAgain(checked as boolean)}
              className="border-gray-600 data-[state=checked]:bg-teal-500 data-[state=checked]:border-teal-500"
            />
            <label 
              htmlFor="dont-show-again" 
              className="text-sm text-gray-400 cursor-pointer"
            >
              No mostrar este tutorial nuevamente
            </label>
          </div>

          <OnboardingNavigation
            currentStep={currentStep}
            totalSteps={onboardingSteps.length}
            onPrevStep={prevStep}
            onNextStep={nextStep}
            onSkip={handleSkip}
            onFinish={handleFinish}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OnboardingModal;
