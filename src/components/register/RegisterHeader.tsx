
import { Link } from 'react-router-dom';
import Logo from '@/components/ui/logo';

const RegisterHeader = () => {
  return (
    <div className="text-center mb-8">
      <div className="flex items-center justify-center mb-4">
        <Logo size="lg" />
      </div>
      <h2 className="text-3xl font-bold text-white">Crear Cuenta</h2>
      <p className="mt-2 text-gray-400">Regístrate para comenzar a gestionar tus horas</p>
    </div>
  );
};

export default RegisterHeader;
