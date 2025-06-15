
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { Dialog, DialogContent, DialogOverlay } from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const OnboardingModal = ({ isOpen, onClose }: OnboardingModalProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isGlitching, setIsGlitching] = useState(false);
  const [showModal, setShowModal] = useState(isOpen);
  const [dontShowAgain, setDontShowAgain] = useState(false);

  const steps = [
    {
      title: "Gestiona tus Jornadas Laborales",
      description: "Controla todas tus horas trabajadas de forma fácil e intuitiva. Visualiza tu progreso mensual y mantén un registro detallado de tu tiempo.",
      image: "/lovable-uploads/bfd99b63-af51-4f55-b15d-b526c781aec2.png",
      features: ["Seguimiento de horas mensuales", "Cálculo automático de salario", "Calendario interactivo"]
    },
    {
      title: "Crea Nuevas Jornadas",
      description: "Registra fácilmente nuevas jornadas de trabajo con hora de inicio, fin y tipo de trabajo. Todo en una interfaz simple y clara.",
      image: "/lovable-uploads/66f39635-85e3-4f8c-b1f3-14a00e3ba067.png",
      features: ["Configuración rápida", "Tipos de trabajo flexibles", "Validación inteligente"]
    },
    {
      title: "Reportes y Estadísticas",
      description: "Accede a reportes detallados con estadísticas de tu rendimiento. Visualiza tus horas normales y extra de forma clara.",
      image: "/lovable-uploads/eec8982f-0585-4f4c-ae65-a0518519858f.png",
      features: ["Reportes mensuales", "Estadísticas visuales", "Exportación de datos"]
    }
  ];

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      triggerGlitch(() => {
        setCurrentStep(prev => prev + 1);
      });
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      triggerGlitch(() => {
        setCurrentStep(prev => prev - 1);
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
    if (dontShowAgain) {
      localStorage.setItem('onboarding-completed', 'true');
    }
    setShowModal(false);
    onClose();
  };

  const handleSkip = () => {
    if (dontShowAgain) {
      localStorage.setItem('onboarding-completed', 'true');
    }
    setShowModal(false);
    onClose();
  };

  const handleFinish = () => {
    localStorage.setItem('onboarding-completed', 'true');
    setShowModal(false);
    onClose();
  };

  if (!showModal) return null;

  const currentStepData = steps[currentStep];

  return (
    <Dialog open={showModal} onOpenChange={handleClose}>
      <DialogOverlay className="bg-black/90 backdrop-blur-sm" />
      <DialogContent className="max-w-5xl w-[95%] h-[85vh] bg-gray-900 border-gray-700 p-0 overflow-hidden rounded-2xl">
        {/* Header Compacto */}
        <div className="relative p-4 border-b border-gray-700 bg-gray-800/50">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-white">Bienvenido a TimeTracker</h2>
              <p className="text-gray-400 text-sm mt-1">Descubre cómo usar la aplicación</p>
            </div>
            <button
              onClick={handleClose}
              className="text-gray-400 hover:text-white transition-colors p-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          {/* Progress Bar Compacto */}
          <div className="mt-3">
            <div className="flex space-x-1">
              {steps.map((_, index) => (
                <div
                  key={index}
                  className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                    index <= currentStep ? 'bg-teal-400' : 'bg-gray-600'
                  }`}
                />
              ))}
            </div>
            <div className="flex justify-between mt-2 text-xs text-gray-400">
              <span>Paso {currentStep + 1} de {steps.length}</span>
              <span>{Math.round(((currentStep + 1) / steps.length) * 100)}% completado</span>
            </div>
          </div>
        </div>

        {/* Content Layout Horizontal Compacto */}
        <div className="flex-1 flex overflow-hidden">
          {/* Image Section - Más pequeña */}
          <div className="w-2/5 relative bg-black flex items-center justify-center p-4">
            <div 
              className={`relative w-full h-full flex items-center justify-center transition-all duration-300 ${
                isGlitching ? 'transform scale-105 brightness-50 hue-rotate-180' : 'transform scale-100'
              }`}
            >
              <img
                src={currentStepData.image}
                alt={currentStepData.title}
                className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
              />
              
              {/* Glitch Effect Overlay */}
              {isGlitching && (
                <>
                  <div className="absolute inset-0 bg-teal-500/20 animate-pulse rounded-lg" />
                  <div className="absolute inset-0 bg-black/80 animate-ping rounded-lg" style={{ animationDuration: '0.1s' }} />
                </>
              )}
            </div>
          </div>

          {/* Content Section - Más amplia */}
          <div className="w-3/5 p-6 flex flex-col justify-between">
            <div className="flex-1">
              <h3 className={`text-2xl font-bold mb-3 transition-all duration-300 ${
                isGlitching ? 'transform translate-x-2 text-teal-400' : 'transform translate-x-0 text-white'
              }`}>
                {currentStepData.title}
              </h3>
              
              <p className={`text-base text-gray-300 mb-4 leading-relaxed transition-all duration-300 ${
                isGlitching ? 'opacity-50' : 'opacity-100'
              }`}>
                {currentStepData.description}
              </p>

              <div className="space-y-2">
                <h4 className="text-lg font-semibold text-teal-400 mb-2">Características principales:</h4>
                {currentStepData.features.map((feature, index) => (
                  <div 
                    key={index}
                    className={`flex items-center space-x-2 transition-all duration-300 ${
                      isGlitching ? 'transform -translate-x-2' : 'transform translate-x-0'
                    }`}
                  >
                    <div className="w-1.5 h-1.5 bg-teal-400 rounded-full flex-shrink-0" />
                    <span className="text-gray-200 text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Checkbox para no mostrar más */}
            <div className="flex items-center space-x-2 mb-4 pt-4 border-t border-gray-700">
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

            {/* Navigation Compacta */}
            <div className="flex items-center justify-between">
              <button
                onClick={prevStep}
                disabled={currentStep === 0}
                className={`flex items-center space-x-1 px-3 py-2 rounded-lg text-sm transition-all duration-300 ${
                  currentStep === 0 
                    ? 'bg-gray-700 text-gray-500 cursor-not-allowed' 
                    : 'bg-gray-700 text-white hover:bg-gray-600'
                }`}
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Anterior</span>
              </button>

              <button
                onClick={handleSkip}
                className="text-gray-400 hover:text-white transition-colors text-sm"
              >
                Saltar tutorial
              </button>

              {currentStep === steps.length - 1 ? (
                <button
                  onClick={handleFinish}
                  className="bg-teal-500 hover:bg-teal-600 text-black font-semibold px-4 py-2 rounded-lg text-sm transition-all duration-300 transform hover:scale-105"
                >
                  ¡Comenzar!
                </button>
              ) : (
                <button
                  onClick={nextStep}
                  className="flex items-center space-x-1 bg-teal-500 hover:bg-teal-600 text-black font-semibold px-3 py-2 rounded-lg text-sm transition-all duration-300 transform hover:scale-105"
                >
                  <span>Siguiente</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OnboardingModal;
