
import { Button } from '@/components/ui/button';

interface SettingsErrorStateProps {
  onRetry: () => void;
}

const SettingsErrorState = ({ onRetry }: SettingsErrorStateProps) => {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-center">
        <p className="text-red-400">Error al cargar la información del usuario</p>
        <Button onClick={onRetry} className="mt-4 bg-teal-500 hover:bg-teal-600 text-black">
          Reintentar
        </Button>
      </div>
    </div>
  );
};

export default SettingsErrorState;
