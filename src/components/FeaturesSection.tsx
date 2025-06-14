
import { Clock, BarChart3, Users, Zap, Shield, Smartphone } from 'lucide-react';

const FeaturesSection = () => {
  const features = [
    {
      icon: Clock,
      title: "Seguimiento Preciso",
      description: "Registra tiempo con precisión al segundo, pausas automáticas y recordatorios inteligentes."
    },
    {
      icon: BarChart3,
      title: "Análisis Avanzado",
      description: "Dashboards interactivos, reportes personalizables y métricas de productividad."
    },
    {
      icon: Users,
      title: "Gestión de Equipos",
      description: "Administra proyectos, asigna tareas y supervisa el progreso de tu equipo."
    },
    {
      icon: Zap,
      title: "Automatización",
      description: "Workflows automáticos, integración con calendarios y notificaciones inteligentes."
    },
    {
      icon: Shield,
      title: "Datos Seguros",
      description: "Encriptación de extremo a extremo, backups automáticos y cumplimiento GDPR."
    },
    {
      icon: Smartphone,
      title: "Multiplataforma",
      description: "Acceso desde cualquier dispositivo, sincronización en tiempo real y modo offline."
    }
  ];

  return (
    <section id="features" className="py-20 bg-gradient-to-b from-black to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Características que 
            <span className="text-teal-400"> Marcan la Diferencia</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Descubre cómo nuestra plataforma revoluciona la gestión del tiempo con tecnología de vanguardia
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-teal-500/20 hover:border-teal-400/50 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-teal-500/10"
            >
              <div className="flex items-center justify-center w-16 h-16 bg-teal-500/20 rounded-lg mb-6">
                <feature.icon className="w-8 h-8 text-teal-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">{feature.title}</h3>
              <p className="text-gray-300 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
