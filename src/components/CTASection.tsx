
import { ArrowRight, Star } from 'lucide-react';

const CTASection = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-teal-500 to-teal-600 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, white 2px, transparent 2px),
                           radial-gradient(circle at 75% 75%, white 2px, transparent 2px)`,
          backgroundSize: '50px 50px'
        }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="flex justify-center mb-6">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-8 h-8 text-yellow-400 fill-current" />
          ))}
        </div>
        
        <h2 className="text-4xl md:text-6xl font-bold text-black mb-6">
          ¿Listo para Transformar tu 
          <br />
          <span className="text-white">Productividad?</span>
        </h2>
        
        <p className="text-xl text-black/80 mb-8 max-w-2xl mx-auto">
          Únete a más de 50,000 profesionales que ya optimizan su tiempo con TimeTracker
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <button className="bg-black text-white font-bold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-xl flex items-center group">
            Comenzar Prueba Gratuita
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </button>
          <button className="border-2 border-black text-black hover:bg-black hover:text-white font-bold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105">
            Hablar con Ventas
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="text-3xl font-bold text-black mb-2">14 días</div>
            <div className="text-black/70">Prueba gratuita</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-black mb-2">Sin tarjeta</div>
            <div className="text-black/70">No requiere pago</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-black mb-2">24/7</div>
            <div className="text-black/70">Soporte técnico</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
