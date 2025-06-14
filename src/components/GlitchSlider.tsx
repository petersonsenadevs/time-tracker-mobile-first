
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const GlitchSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isGlitching, setIsGlitching] = useState(false);

  const slides = [
    {
      image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=1200&h=600&fit=crop",
      title: "Gestiona tu Tiempo",
      subtitle: "Controla cada minuto de tu productividad",
      description: "Herramientas avanzadas para el seguimiento preciso de horas laborales"
    },
    {
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=600&fit=crop",
      title: "Reportes Inteligentes",
      subtitle: "Análisis detallados de tu rendimiento",
      description: "Visualiza patrones, tendencias y optimiza tu flujo de trabajo"
    },
    {
      image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=1200&h=600&fit=crop",
      title: "Equipos Sincronizados",
      subtitle: "Colaboración en tiempo real",
      description: "Coordina proyectos y mantén a tu equipo alineado"
    }
  ];

  const nextSlide = () => {
    setIsGlitching(true);
    setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
      setIsGlitching(false);
    }, 200);
  };

  const prevSlide = () => {
    setIsGlitching(true);
    setTimeout(() => {
      setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
      setIsGlitching(false);
    }, 200);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background Image */}
      <div 
        className={`absolute inset-0 bg-cover bg-center transition-all duration-500 ${
          isGlitching ? 'transform scale-105 brightness-50 hue-rotate-180' : 'transform scale-100'
        }`}
        style={{
          backgroundImage: `url(${slides[currentSlide].image})`,
        }}
      >
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Glitch Effect Overlay */}
      {isGlitching && (
        <>
          <div className="absolute inset-0 bg-teal-500/20 animate-pulse" />
          <div className="absolute inset-0 bg-black/80 animate-ping" style={{ animationDuration: '0.1s' }} />
        </>
      )}

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center h-full">
        <div className="text-center max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className={`text-6xl md:text-8xl font-bold mb-6 transition-all duration-300 ${
            isGlitching ? 'transform translate-x-2 text-teal-400' : 'transform translate-x-0 text-white'
          }`}>
            {slides[currentSlide].title}
          </h1>
          <h2 className={`text-2xl md:text-3xl font-light mb-4 transition-all duration-300 ${
            isGlitching ? 'transform -translate-x-2 text-gray-400' : 'transform translate-x-0 text-teal-300'
          }`}>
            {slides[currentSlide].subtitle}
          </h2>
          <p className={`text-lg md:text-xl mb-8 max-w-2xl mx-auto transition-all duration-300 ${
            isGlitching ? 'opacity-50' : 'opacity-100 text-gray-200'
          }`}>
            {slides[currentSlide].description}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="bg-teal-500 hover:bg-teal-600 text-black font-bold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg shadow-teal-500/25">
              Comenzar Gratis
            </button>
            <button className="border-2 border-teal-400 text-teal-400 hover:bg-teal-400 hover:text-black font-bold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105">
              Ver Demo
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-teal-500/50 text-white p-3 rounded-full transition-all duration-300 backdrop-blur-sm"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-teal-500/50 text-white p-3 rounded-full transition-all duration-300 backdrop-blur-sm"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setIsGlitching(true);
              setTimeout(() => {
                setCurrentSlide(index);
                setIsGlitching(false);
              }, 200);
            }}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? 'bg-teal-400 shadow-lg shadow-teal-400/50' 
                : 'bg-white/50 hover:bg-white/75'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default GlitchSlider;
