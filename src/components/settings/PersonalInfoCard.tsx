
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { User } from 'lucide-react';

interface PersonalInfoCardProps {
  user: {
    id: number | string;
    email: string;
    role?: string;
  };
}

const PersonalInfoCard = ({ user }: PersonalInfoCardProps) => {
  return (
    <Card className="bg-gray-900/50 border-gray-700">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white">
          <User className="h-5 w-5 text-teal-400" />
          Información Personal
        </CardTitle>
        <CardDescription>
          Tu información básica de perfil
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label className="text-sm font-medium text-gray-300">ID de Usuario</Label>
          <p className="text-white font-medium font-mono text-sm">{user.id}</p>
        </div>
        <div>
          <Label className="text-sm font-medium text-gray-300">Email</Label>
          <p className="text-white font-medium">{user.email}</p>
        </div>
        <div>
          <Label className="text-sm font-medium text-gray-300">Rol</Label>
          <p className="text-white font-medium capitalize">
            {user.role === 'employee' ? 'Empleado' : user.role}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default PersonalInfoCard;
