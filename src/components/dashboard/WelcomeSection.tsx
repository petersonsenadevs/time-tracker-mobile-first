
import { User } from '@/services/userService';

interface WelcomeSectionProps {
  user: User | null;
}

const WelcomeSection = ({ user }: WelcomeSectionProps) => {
  return (
    <div className="mb-6">
      <h1 className="text-2xl font-bold text-white mb-1">
        ¡Hola, {user?.name?.split(' ')[0]}! 👋
      </h1>
      <p className="text-gray-400">Gestiona tus jornadas laborales de forma fácil</p>
    </div>
  );
};

export default WelcomeSection;
