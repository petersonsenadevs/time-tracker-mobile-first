
import { OnboardingStep } from './OnboardingStep';

interface OnboardingContentProps {
  step: OnboardingStep;
  isGlitching: boolean;
}

const OnboardingContent = ({ step, isGlitching }: OnboardingContentProps) => {
  return (
    <div className="flex-1 flex overflow-hidden">
      {/* Image Section */}
      <div className="w-2/5 relative bg-black flex items-center justify-center p-6">
        <div 
          className={`relative w-full h-full flex items-center justify-center transition-all duration-300 ${
            isGlitching ? 'transform scale-105 brightness-50 hue-rotate-180' : 'transform scale-100'
          }`}
        >
          <img
            src={step.image}
            alt={step.title}
            className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
          />
          
          {isGlitching && (
            <>
              <div className="absolute inset-0 bg-teal-500/20 animate-pulse rounded-lg" />
              <div className="absolute inset-0 bg-black/80 animate-ping rounded-lg" style={{ animationDuration: '0.1s' }} />
            </>
          )}
        </div>
      </div>

      {/* Content Section */}
      <div className="w-3/5 p-8 flex flex-col justify-between">
        <div className="flex-1 space-y-6">
          <h3 className={`text-2xl font-bold mb-4 transition-all duration-300 ${
            isGlitching ? 'transform translate-x-2 text-teal-400' : 'transform translate-x-0 text-white'
          }`}>
            {step.title}
          </h3>
          
          <p className={`text-base text-gray-300 leading-relaxed transition-all duration-300 ${
            isGlitching ? 'opacity-50' : 'opacity-100'
          }`}>
            {step.description}
          </p>

          <div className="space-y-3">
            <h4 className="text-lg font-semibold text-teal-400 mb-3">Características principales:</h4>
            {step.features.map((feature, index) => (
              <div 
                key={index}
                className={`flex items-center space-x-3 transition-all duration-300 ${
                  isGlitching ? 'transform -translate-x-2' : 'transform translate-x-0'
                }`}
              >
                <div className="w-2 h-2 bg-teal-400 rounded-full flex-shrink-0" />
                <span className="text-gray-200 text-base">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingContent;
