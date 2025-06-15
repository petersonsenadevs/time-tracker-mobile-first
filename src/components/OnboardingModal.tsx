
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { Dialog, DialogContent, DialogOverlay } from '@/components/ui/dialog';

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const OnboardingModal = ({ isOpen, onClose }: OnboardingModalProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isGlitching, setIsGlitching] = useState(false);
  const [showModal, setShowModal] = useState(isOpen);

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
    // Guardar en localStorage que el usuario ya vio el onboarding
    localStorage.setItem('onboarding-completed', 'true');
    setShowModal(false);
    onClose();
  };

  const handleSkip = () => {
    localStorage.setItem('onboarding-completed', 'true');
    setShowModal(false);
    onClose();
  };

  if (!showModal) return null;

  const currentStepData = steps[currentStep];

  return (
    <Dialog open={showModal} onOpenChange={handleClose}>
      <DialogOverlay className="bg-black/90 backdrop-blur-sm" />
      <DialogContent className="max-w-4xl w-full h-[90vh] bg-gray-900 border-gray-700 p-0 overflow-hidden">
        {/* Header */}
        <div className="relative p-6 border-b border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white">Bienvenido a TimeTracker</h2>
              <p className="text-gray-400 mt-1">Descubre cómo usar la aplicación</p>
            </div>
            <button
              onClick={handleClose}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-4">
            <div className="flex space-x-2">
              {steps.map((_, index) => (
                <div
                  key={index}
                  className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                    index <= currentStep ? 'bg-teal-400' : 'bg-gray-600'
                  }`}
                />
              ))}
            </div>
            <div className="flex justify-between mt-2 text-sm text-gray-400">
              <span>Paso {currentStep + 1} de {steps.length}</span>
              <span>{Math.round(((currentStep + 1) / steps.length) * 100)}% completado</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 flex overflow-hidden">
          {/* Image Section */}
          <div className="w-1/2 relative bg-black flex items-center justify-center">
            <div 
              className={`relative w-full h-full flex items-center justify-center transition-all duration-300 ${
                isGlitching ? 'transform scale-105 brightness-50 hue-rotate-180' : 'transform scale-100'
              }`}
            >
              <img
                src={currentStepData.image}
                alt={currentStepData.title}
                className="max-w-full max-h-full object-contain rounded-lg"
              />
              
              {/* Glitch Effect Overlay */}
              {isGlitching && (
                <>
                  <div className="absolute inset-0 bg-teal-500/20 animate-pulse" />
                  <div className="absolute inset-0 bg-black/80 animate-ping" style={{ animationDuration: '0.1s' }} />
                </>
              )}
            </div>
          </div>

          {/* Content Section */}
          <div className="w-1/2 p-8 flex flex-col">
            <div className="flex-1">
              <h3 className={`text-3xl font-bold mb-4 transition-all duration-300 ${
                isGlitching ? 'transform translate-x-2 text-teal-400' : 'transform translate-x-0 text-white'
              }`}>
                {currentStepData.title}
              </h3>
              
              <p className={`text-lg text-gray-300 mb-6 leading-relaxed transition-all duration-300 ${
                isGlitching ? 'opacity-50' : 'opacity-100'
              }`}>
                {currentStepData.description}
              </p>

              <div className="space-y-3">
                <h4 className="text-xl font-semibold text-teal-400 mb-3">Características principales:</h4>
                {currentStepData.features.map((feature, index) => (
                  <div 
                    key={index}
                    className={`flex items-center space-x-3 transition-all duration-300 ${
                      isGlitching ? 'transform -translate-x-2' : 'transform translate-x-0'
                    }`}
                  >
                    <div className="w-2 h-2 bg-teal-400 rounded-full" />
                    <span className="text-gray-200">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8">
              <button
                onClick={prevStep}
                disabled={currentStep === 0}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
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
                className="text-gray-400 hover:text-white transition-colors"
              >
                Saltar tutorial
              </button>

              {currentStep === steps.length - 1 ? (
                <button
                  onClick={handleClose}
                  className="bg-teal-500 hover:bg-teal-600 text-black font-semibold px-6 py-2 rounded-lg transition-all duration-300 transform hover:scale-105"
                >
                  ¡Comenzar!
                </button>
              ) : (
                <button
                  onClick={nextStep}
                  className="flex items-center space-x-2 bg-teal-500 hover:bg-teal-600 text-black font-semibold px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-105"
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
