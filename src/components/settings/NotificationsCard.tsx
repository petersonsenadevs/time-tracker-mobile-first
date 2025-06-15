
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bell, Clock } from 'lucide-react';

const NotificationsCard = () => {
  const notificationOptions = [
    {
      title: "Notificaciones Push",
      description: "Recibir alertas en tiempo real",
      enabled: false
    },
    {
      title: "Notificaciones por Email",
      description: "Gestionar notificaciones por correo",
      enabled: false
    },
    {
      title: "Recordatorios",
      description: "Configurar recordatorios automáticos",
      enabled: false
    },
    {
      title: "Resúmenes Semanales",
      description: "Recibir reportes de actividad semanal",
      enabled: false
    }
  ];

  return (
    <Card className="bg-gray-900/50 border-gray-700">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-white text-lg">
          <Bell className="h-4 w-4 text-gray-500" />
          Configuración de Notificaciones
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 pt-0">
        <div className="flex items-center gap-2 p-3 bg-yellow-900/20 border border-yellow-700/50 rounded-lg">
          <Clock className="h-4 w-4 text-yellow-400" />
          <span className="text-yellow-300 font-medium text-sm">Próximamente</span>
        </div>
        
        <div className="space-y-2 opacity-50">
          {notificationOptions.map((option, index) => (
            <div 
              key={index} 
              className="flex items-center justify-between p-2.5 rounded-lg bg-gray-800/30 border border-gray-700/50"
            >
              <div>
                <p className="text-white font-medium text-sm">{option.title}</p>
                <p className="text-gray-400 text-xs">{option.description}</p>
              </div>
              <div className="w-8 h-5 bg-gray-700 rounded-full cursor-not-allowed">
                <div className="w-3 h-3 bg-gray-500 rounded-full mt-1 ml-1 transition-transform"></div>
              </div>
            </div>
          ))}
        </div>
        
        <p className="text-gray-500 text-xs text-center mt-3">
          Las opciones de notificaciones estarán disponibles en una próxima actualización.
        </p>
      </CardContent>
    </Card>
  );
};

export default NotificationsCard;
