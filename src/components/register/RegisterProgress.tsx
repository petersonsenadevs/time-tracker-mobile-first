
interface RegisterProgressProps {
  currentStep: number;
}

const RegisterProgress = ({ currentStep }: RegisterProgressProps) => {
  return (
    <div className="mb-4 sm:mb-6">
      <div className="flex items-center justify-center space-x-4">
        <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-sm sm:text-base ${
          currentStep === 0 ? 'bg-teal-500 text-black' : 'bg-teal-500 text-black'
        }`}>
          1
        </div>
        <div className={`h-1 w-12 sm:w-16 ${currentStep === 1 ? 'bg-teal-500' : 'bg-gray-600'}`}></div>
        <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-sm sm:text-base ${
          currentStep === 1 ? 'bg-teal-500 text-black' : 'bg-gray-600 text-gray-300'
        }`}>
          2
        </div>
      </div>
      <div className="flex justify-between mt-2 text-xs sm:text-sm text-gray-400">
        <span>Información Personal</span>
        <span>Tarifas y Configuración</span>
      </div>
    </div>
  );
};

export default RegisterProgress;
