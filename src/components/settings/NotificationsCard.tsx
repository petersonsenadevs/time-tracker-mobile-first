
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
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white">
          <Bell className="h-5 w-5 text-gray-500" />
          Configuración de Notificaciones
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-2 p-4 bg-yellow-900/20 border border-yellow-700/50 rounded-lg">
          <Clock className="h-5 w-5 text-yellow-400" />
          <span className="text-yellow-300 font-medium">Próximamente</span>
        </div>
        
        <div className="space-y-3 opacity-50">
          {notificationOptions.map((option, index) => (
            <div 
              key={index} 
              className="flex items-center justify-between p-3 rounded-lg bg-gray-800/30 border border-gray-700/50"
            >
              <div>
                <p className="text-white font-medium">{option.title}</p>
                <p className="text-gray-400 text-sm">{option.description}</p>
              </div>
              <div className="w-10 h-6 bg-gray-700 rounded-full cursor-not-allowed">
                <div className="w-4 h-4 bg-gray-500 rounded-full mt-1 ml-1 transition-transform"></div>
              </div>
            </div>
          ))}
        </div>
        
        <p className="text-gray-500 text-sm text-center mt-4">
          Las opciones de notificaciones estarán disponibles en una próxima actualización.
        </p>
      </CardContent>
    </Card>
  );
};

export default NotificationsCard;
