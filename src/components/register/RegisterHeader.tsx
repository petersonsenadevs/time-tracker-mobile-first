
import { Link } from 'react-router-dom';

const RegisterHeader = () => {
  return (
    <div className="text-center mb-8">
      <Link to="/" className="flex items-center justify-center mb-4 hover:opacity-80 transition-opacity">
        <div className="relative">
          <img 
            src="https://iwxedutdoaukcadsvqux.supabase.co/storage/v1/object/public/klk//Logo%20JORNALIA_BLANCO.png" 
            alt="Jornalia Logo" 
            className="h-12 w-auto object-contain"
          />
        </div>
      </Link>
      <h2 className="text-3xl font-bold text-white">Crear Cuenta</h2>
      <p className="mt-2 text-gray-400">Regístrate para comenzar a gestionar tus horas</p>
    </div>
  );
};

export default RegisterHeader;
