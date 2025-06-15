
interface OnboardingProgressProps {
  currentStep: number;
  totalSteps: number;
}

const OnboardingProgress = ({ currentStep, totalSteps }: OnboardingProgressProps) => {
  return (
    <div className="mt-4">
      <div className="flex space-x-2">
        {Array.from({ length: totalSteps }).map((_, index) => (
          <div
            key={index}
            className={`h-2 flex-1 rounded-full transition-all duration-300 ${
              index <= currentStep ? 'bg-teal-400' : 'bg-gray-600'
            }`}
          />
        ))}
      </div>
      <div className="flex justify-between mt-3 text-sm text-gray-400">
        <span>Paso {currentStep + 1} de {totalSteps}</span>
        <span>{Math.round(((currentStep + 1) / totalSteps) * 100)}% completado</span>
      </div>
    </div>
  );
};

export default OnboardingProgress;
