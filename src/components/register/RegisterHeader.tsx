
import { Link } from 'react-router-dom';

const RegisterHeader = () => {
  return (
    <div className="text-center mb-8">
      <Link to="/" className="flex items-center justify-center space-x-2 mb-4 hover:opacity-80 transition-opacity">
        <div className="relative">
          <img 
            src="/lovable-uploads/0b1264ea-90e2-493e-a376-3c9642216396.png" 
            alt="TimeTracker Logo" 
            className="h-10 w-10 object-contain rounded-md"
          />
        </div>
        <span className="text-2xl font-bold text-white">TimeTracker</span>
      </Link>
      <h2 className="text-3xl font-bold text-white">Crear Cuenta</h2>
      <p className="mt-2 text-gray-400">Regístrate para comenzar a gestionar tus horas</p>
    </div>
  );
};

export default RegisterHeader;
