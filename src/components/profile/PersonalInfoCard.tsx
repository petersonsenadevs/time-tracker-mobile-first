
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { User, Mail, Building, Award } from 'lucide-react';
import { Employee } from '@/services/userService';
import { User as UserType } from '@/services/userService';

interface PersonalInfoCardProps {
  employee: Employee;
  currentUser: UserType;
}

const PersonalInfoCard = ({ employee, currentUser }: PersonalInfoCardProps) => {
  return (
    <Card className="bg-gray-900/50 border-gray-700">
      <CardHeader className="pb-3 md:pb-6">
        <CardTitle className="flex items-center gap-2 text-white text-lg md:text-xl">
          <User className="h-4 w-4 md:h-5 md:w-5 text-teal-400" />
          Información Personal
        </CardTitle>
        <CardDescription className="text-sm">
          Datos básicos del empleado
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3 md:space-y-4 pt-0">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
          <div className="flex items-center gap-3 p-3 bg-gray-800/30 rounded-lg">
            <User className="h-4 w-4 text-gray-400 flex-shrink-0" />
            <div className="min-w-0 flex-1">
              <p className="text-xs md:text-sm text-gray-400">Nombre Completo</p>
              <p className="text-white font-medium text-sm md:text-base truncate">{employee.name}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-gray-800/30 rounded-lg">
            <Mail className="h-4 w-4 text-gray-400 flex-shrink-0" />
            <div className="min-w-0 flex-1">
              <p className="text-xs md:text-sm text-gray-400">Email</p>
              <p className="text-white font-medium text-sm md:text-base truncate">{currentUser.email}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 p-3 bg-gray-800/30 rounded-lg">
            <Building className="h-4 w-4 text-gray-400 flex-shrink-0" />
            <div className="min-w-0 flex-1">
              <p className="text-xs md:text-sm text-gray-400">Empresa</p>
              <p className="text-white font-medium text-sm md:text-base truncate">{employee.company_name || 'No especificada'}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-gray-800/30 rounded-lg">
            <Award className="h-4 w-4 text-gray-400 flex-shrink-0" />
            <div className="min-w-0 flex-1">
              <p className="text-xs md:text-sm text-gray-400">ID de Empleado</p>
              <p className="text-white font-medium font-mono text-sm md:text-base">{currentUser.id}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PersonalInfoCard;
