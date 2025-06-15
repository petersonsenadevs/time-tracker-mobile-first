
import { Button } from '@/components/ui/button';

interface ProfileLoadingStateProps {
  onRetry: () => void;
}

const ProfileLoadingState = ({ onRetry }: ProfileLoadingStateProps) => {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-400 mx-auto mb-4"></div>
        <p className="text-gray-300">Cargando información del empleado...</p>
      </div>
    </div>
  );
};

export default ProfileLoadingState;
