
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Trash2, LogOut } from 'lucide-react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';

interface DangerZoneCardProps {
  onLogout: () => void;
  onDeleteAccount: () => void;
  isDeleting: boolean;
}

const DangerZoneCard = ({ onLogout, onDeleteAccount, isDeleting }: DangerZoneCardProps) => {
  return (
    <Card className="bg-gray-900/50 border-red-900/50 lg:col-span-2">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-red-400">
          <Trash2 className="h-5 w-5" />
          Zona Peligrosa
        </CardTitle>
        <CardDescription>
          Acciones irreversibles que afectarán tu cuenta
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Separator className="border-gray-700" />
        
        <div className="flex flex-col sm:flex-row gap-4">
          <Button
            onClick={onLogout}
            variant="outline"
            className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-800"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Cerrar Sesión
          </Button>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" className="flex-1">
                <Trash2 className="h-4 w-4 mr-2" />
                Eliminar Cuenta
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-gray-900 border-gray-700">
              <AlertDialogHeader>
                <AlertDialogTitle className="text-red-400">
                  ¿Estás completamente seguro?
                </AlertDialogTitle>
                <AlertDialogDescription className="text-gray-300">
                  Esta acción no se puede deshacer. Esto eliminará permanentemente tu cuenta
                  y removerá todos tus datos de nuestros servidores.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="bg-gray-800 border-gray-600 text-gray-300">
                  Cancelar
                </AlertDialogCancel>
                <AlertDialogAction
                  onClick={onDeleteAccount}
                  className="bg-red-600 hover:bg-red-700"
                  disabled={isDeleting}
                >
                  {isDeleting ? 'Eliminando...' : 'Sí, eliminar cuenta'}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </CardContent>
    </Card>
  );
};

export default DangerZoneCard;
