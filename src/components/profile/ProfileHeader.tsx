
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { User, Edit } from 'lucide-react';
import { Employee } from '@/services/userService';
import { User as UserType } from '@/services/userService';

interface ProfileHeaderProps {
  employee: Employee;
  currentUser: UserType;
  onEdit: () => void;
}

const ProfileHeader = ({ employee, currentUser, onEdit }: ProfileHeaderProps) => {
  return (
    <div className="bg-gradient-to-r from-teal-500/20 to-blue-500/20 rounded-xl p-4 md:p-6">
      <div className="flex flex-col items-center gap-4 text-center">
        <Avatar className="h-20 w-20 md:h-24 md:w-24 border-4 border-teal-400/50">
          <AvatarFallback className="bg-teal-500/20 text-teal-400 text-2xl md:text-3xl">
            {employee.name?.charAt(0)?.toUpperCase() || 'E'}
          </AvatarFallback>
        </Avatar>
        
        <div className="flex-1">
          <h1 className="text-xl md:text-3xl font-bold text-white mb-1 md:mb-2">
            {employee.name || 'Empleado'}
          </h1>
          <p className="text-gray-300 text-sm md:text-lg mb-1">{currentUser.email}</p>
          <div className="flex items-center justify-center gap-2 text-teal-400 text-sm">
            <User className="h-3 w-3 md:h-4 md:w-4" />
            <span className="capitalize">
              {currentUser.role === 'employee' ? 'Empleado Activo' : currentUser.role}
            </span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-2">
          <div className="bg-green-500/20 text-green-400 px-3 py-1 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-medium">
            ● Activo
          </div>
          <Button
            onClick={onEdit}
            size="sm"
            className="bg-teal-500 hover:bg-teal-600 text-black text-xs md:text-sm"
          >
            <Edit className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
            Editar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
