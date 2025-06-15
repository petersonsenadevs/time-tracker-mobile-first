
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Lock } from 'lucide-react';
import { toast } from 'sonner';

interface PasswordFormData {
  old_password: string;
  new_password: string;
  password_confirmation: string;
}

interface ChangePasswordCardProps {
  onChangePassword: (data: PasswordFormData) => void;
  isLoading: boolean;
}

const ChangePasswordCard = ({ onChangePassword, isLoading }: ChangePasswordCardProps) => {
  const [passwordForm, setPasswordForm] = useState<PasswordFormData>({
    old_password: '',
    new_password: '',
    password_confirmation: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (passwordForm.new_password !== passwordForm.password_confirmation) {
      toast.error('Las contraseñas no coinciden');
      return;
    }
    
    if (passwordForm.new_password.length < 8) {
      toast.error('La nueva contraseña debe tener al menos 8 caracteres');
      return;
    }
    
    onChangePassword(passwordForm);
    setPasswordForm({
      old_password: '',
      new_password: '',
      password_confirmation: ''
    });
  };

  return (
    <Card className="bg-gray-900/50 border-gray-700">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-white text-lg">
          <Lock className="h-4 w-4 text-teal-400" />
          Cambiar Contraseña
        </CardTitle>
        <CardDescription className="text-sm">
          Actualiza tu contraseña para mantener tu cuenta segura
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="grid gap-3 sm:grid-cols-1">
            <div>
              <Label htmlFor="old_password" className="text-gray-300 text-sm">Contraseña Actual</Label>
              <Input
                id="old_password"
                type="password"
                value={passwordForm.old_password}
                onChange={(e) => setPasswordForm({ ...passwordForm, old_password: e.target.value })}
                className="bg-gray-800 border-gray-600 text-white text-sm h-9"
                required
              />
            </div>
            <div>
              <Label htmlFor="new_password" className="text-gray-300 text-sm">Nueva Contraseña</Label>
              <Input
                id="new_password"
                type="password"
                value={passwordForm.new_password}
                onChange={(e) => setPasswordForm({ ...passwordForm, new_password: e.target.value })}
                className="bg-gray-800 border-gray-600 text-white text-sm h-9"
                minLength={8}
                required
              />
            </div>
            <div>
              <Label htmlFor="password_confirmation" className="text-gray-300 text-sm">Confirmar Contraseña</Label>
              <Input
                id="password_confirmation"
                type="password"
                value={passwordForm.password_confirmation}
                onChange={(e) => setPasswordForm({ ...passwordForm, password_confirmation: e.target.value })}
                className="bg-gray-800 border-gray-600 text-white text-sm h-9"
                minLength={8}
                required
              />
            </div>
          </div>
          <Button
            type="submit"
            className="w-full bg-teal-500 hover:bg-teal-600 text-black text-sm h-9"
            disabled={isLoading}
          >
            {isLoading ? 'Cambiando...' : 'Cambiar Contraseña'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ChangePasswordCard;
