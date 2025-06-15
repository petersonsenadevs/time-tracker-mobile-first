
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Mail } from 'lucide-react';
import { toast } from 'sonner';

interface UpdateEmailCardProps {
  onUpdateEmail: (email: string) => void;
  isLoading: boolean;
}

const UpdateEmailCard = ({ onUpdateEmail, isLoading }: UpdateEmailCardProps) => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error('Por favor, ingresa un email válido');
      return;
    }
    onUpdateEmail(email);
    setEmail('');
  };

  return (
    <Card className="bg-gray-900/50 border-gray-700">
      <CardHeader className="pb-2 pt-4 px-4">
        <CardTitle className="flex items-center gap-2 text-white text-sm">
          <Mail className="h-4 w-4 text-teal-400" />
          Actualizar Email
        </CardTitle>
        <CardDescription className="text-xs text-gray-400">
          Cambia tu dirección de correo electrónico
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-0 px-4 pb-4">
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="space-y-1">
            <Label htmlFor="email" className="text-gray-300 text-xs">Nuevo Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="nuevo@email.com"
              className="bg-gray-800 border-gray-600 text-white text-sm h-8"
              required
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-teal-500 hover:bg-teal-600 text-black text-sm h-8"
            disabled={isLoading}
          >
            {isLoading ? 'Actualizando...' : 'Actualizar Email'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default UpdateEmailCard;
