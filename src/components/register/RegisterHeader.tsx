
import { Link } from 'react-router-dom';

const RegisterHeader = () => {
  return (
    <div className="text-center mb-4 sm:mb-6 lg:mb-8">
      <Link to="/" className="flex items-center justify-center space-x-2 mb-2 sm:mb-4 hover:opacity-80 transition-opacity">
        <div className="relative">
          <img 
            src="/lovable-uploads/0b1264ea-90e2-493e-a376-3c9642216396.png" 
            alt="TimeTracker Logo" 
            className="h-8 w-8 sm:h-10 sm:w-10 object-contain rounded-md"
          />
        </div>
        <span className="text-xl sm:text-2xl font-bold text-white">TimeTracker</span>
      </Link>
      <h2 className="text-2xl sm:text-3xl font-bold text-white">Crear Cuenta</h2>
      <p className="mt-1 sm:mt-2 text-gray-400 text-sm sm:text-base">Regístrate para comenzar a gestionar tus horas</p>
    </div>
  );
};

export default RegisterHeader;
