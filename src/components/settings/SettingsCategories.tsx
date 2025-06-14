
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { User, Bell, Shield, Palette, Database } from 'lucide-react';

const SettingsCategories = () => {
  const settingsCategories = [
    {
      title: "Perfil y Cuenta",
      icon: User,
      items: [
        { name: "Información Personal", description: "Gestiona tu información básica" },
        { name: "Actualizar Email", description: "Cambia tu dirección de correo" },
        { name: "Cambiar Contraseña", description: "Actualiza tu contraseña" }
      ]
    },
    {
      title: "Notificaciones",
      icon: Bell,
      items: [
        { name: "Notificaciones Push", description: "Configurar alertas en tiempo real" },
        { name: "Email Notifications", description: "Gestionar notificaciones por correo" },
        { name: "Recordatorios", description: "Configurar recordatorios automáticos" }
      ]
    },
    {
      title: "Seguridad y Privacidad",
      icon: Shield,
      items: [
        { name: "Autenticación de dos factores", description: "Añadir una capa extra de seguridad" },
        { name: "Sesiones Activas", description: "Ver y gestionar dispositivos conectados" },
        { name: "Permisos de Aplicación", description: "Controlar acceso a datos" }
      ]
    },
    {
      title: "Personalización",
      icon: Palette,
      items: [
        { name: "Tema de la Aplicación", description: "Cambiar entre modo oscuro/claro" },
        { name: "Idioma", description: "Seleccionar idioma preferido" },
        { name: "Formato de Fecha", description: "Configurar formato de fechas" }
      ]
    },
    {
      title: "Datos y Privacidad",
      icon: Database,
      items: [
        { name: "Exportar Datos", description: "Descargar una copia de tus datos" },
        { name: "Eliminar Datos", description: "Solicitar eliminación de información" },
        { name: "Políticas de Privacidad", description: "Revisar términos y condiciones" }
      ]
    }
  ];

  return (
    <div className="grid gap-6 mb-8">
      {settingsCategories.map((category, index) => (
        <Card key={index} className="bg-gray-900/50 border-gray-700">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <category.icon className="h-5 w-5 text-teal-400" />
              {category.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3">
              {category.items.map((item, itemIndex) => (
                <div key={itemIndex} className="flex items-center justify-between p-3 rounded-lg bg-gray-800/50 hover:bg-gray-800/70 transition-colors cursor-pointer">
                  <div>
                    <p className="text-white font-medium">{item.name}</p>
                    <p className="text-gray-400 text-sm">{item.description}</p>
                  </div>
                  <Button variant="ghost" size="sm" className="text-teal-400 hover:text-teal-300">
                    Configurar
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default SettingsCategories;
