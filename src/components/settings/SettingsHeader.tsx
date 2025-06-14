
import { SettingsIcon } from 'lucide-react';

const SettingsHeader = () => {
  return (
    <div className="flex items-center gap-4 mb-8">
      <div className="p-3 bg-teal-500/20 rounded-xl">
        <SettingsIcon className="h-8 w-8 text-teal-400" />
      </div>
      <div>
        <h1 className="text-3xl font-bold text-white">Configuración</h1>
        <p className="text-gray-400">Gestiona tu cuenta y preferencias</p>
      </div>
    </div>
  );
};

export default SettingsHeader;
