
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
    <Card className="bg-gray-900/50 border-gray-700 h-full flex flex-col overflow-hidden">
      <CardHeader className="pb-2 flex-shrink-0">
        <CardTitle className="flex items-center gap-2 text-white text-sm">
          <Bell className="h-4 w-4 text-gray-500" />
          Configuración de Notificaciones
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pt-0 flex flex-col overflow-hidden">
        <div className="flex items-center gap-2 p-2 bg-yellow-900/20 border border-yellow-700/50 rounded-lg mb-3 flex-shrink-0">
          <Clock className="h-3 w-3 text-yellow-400" />
          <span className="text-yellow-300 font-medium text-xs">Próximamente</span>
        </div>
        
        <div className="space-y-2 opacity-50 flex-1 overflow-y-auto">
          {notificationOptions.map((option, index) => (
            <div 
              key={index} 
              className="flex items-center justify-between p-2 rounded-lg bg-gray-800/30 border border-gray-700/50"
            >
              <div className="flex-1 min-w-0">
                <p className="text-white font-medium text-xs truncate">{option.title}</p>
                <p className="text-gray-400 text-xs truncate">{option.description}</p>
              </div>
              <div className="w-7 h-4 bg-gray-700 rounded-full cursor-not-allowed ml-2 flex-shrink-0">
                <div className="w-2.5 h-2.5 bg-gray-500 rounded-full mt-0.5 ml-0.5 transition-transform"></div>
              </div>
            </div>
          ))}
        </div>
        
        <p className="text-gray-500 text-xs text-center mt-2 flex-shrink-0">
          Las opciones de notificaciones estarán disponibles en una próxima actualización.
        </p>
      </CardContent>
    </Card>
  );
};

export default NotificationsCard;
