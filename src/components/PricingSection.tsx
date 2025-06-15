
import { Check, Star } from 'lucide-react';

const PricingSection = () => {
  const plans = [
    {
      name: "Básico",
      price: "Gratis",
      period: "siempre",
      description: "Perfecto para freelancers y uso personal",
      features: [
        "Seguimiento de tiempo ilimitado",
        "Reportes básicos",
        "1 proyecto",
        "Soporte por email"
      ],
      popular: false,
      buttonText: "Comenzar Gratis",
      buttonClass: "border-2 border-teal-500 text-teal-400 hover:bg-teal-500 hover:text-black"
    },
    {
      name: "Profesional",
      price: "$9",
      period: "/mes",
      description: "Ideal para profesionales y pequeños equipos",
      features: [
        "Todo lo del plan Básico",
        "Proyectos ilimitados",
        "Reportes avanzados",
        "Gestión de equipos (hasta 10)",
        "Integraciones",
        "Soporte prioritario"
      ],
      popular: true,
      buttonText: "Probar 14 días gratis",
      buttonClass: "bg-teal-500 text-black hover:bg-teal-400"
    },
    {
      name: "Empresarial",
      price: "$29",
      period: "/mes",
      description: "Para empresas que necesitan control total",
      features: [
        "Todo lo del plan Profesional",
        "Equipos ilimitados",
        "API completa",
        "SSO y seguridad avanzada",
        "Reportes personalizados",
        "Gerente de cuenta dedicado"
      ],
      popular: false,
      buttonText: "Contactar Ventas",
      buttonClass: "border-2 border-gray-500 text-gray-300 hover:bg-gray-500 hover:text-black"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Planes que se Adaptan a 
            <span className="text-teal-400"> tu Negocio</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Desde freelancers hasta empresas, tenemos el plan perfecto para optimizar tu gestión del tiempo
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border transition-all duration-300 hover:scale-105 ${
                plan.popular
                  ? 'border-teal-400 shadow-2xl shadow-teal-500/20'
                  : 'border-gray-700 hover:border-teal-500/50'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <div className="bg-teal-500 text-black px-4 py-1 rounded-full text-sm font-semibold flex items-center space-x-1">
                    <Star className="w-4 h-4 fill-current" />
                    <span>Más Popular</span>
                  </div>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <p className="text-gray-400 mb-4">{plan.description}</p>
                <div className="flex items-baseline justify-center">
                  <span className="text-4xl font-bold text-white">{plan.price}</span>
                  <span className="text-gray-400 ml-1">{plan.period}</span>
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start space-x-3">
                    <Check className="w-5 h-5 text-teal-400 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>

              <button className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-300 ${plan.buttonClass}`}>
                {plan.buttonText}
              </button>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-400 mb-4">
            ¿Necesitas algo más específico? 
            <span className="text-teal-400 hover:text-teal-300 cursor-pointer"> Contáctanos</span>
          </p>
          <div className="flex justify-center items-center space-x-6 text-sm text-gray-500">
            <span>✓ Sin compromisos a largo plazo</span>
            <span>✓ Cancela cuando quieras</span>
            <span>✓ Soporte 24/7</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
