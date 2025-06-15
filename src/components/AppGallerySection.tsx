
import { useState } from 'react';
import { Play } from 'lucide-react';

const AppGallerySection = () => {
  const [currentImage, setCurrentImage] = useState(0);

  const galleryImages = [
    {
      src: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
      title: "Dashboard Principal",
      description: "Visualiza todas tus métricas de tiempo en un solo lugar"
    },
    {
      src: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
      title: "Seguimiento en Tiempo Real",
      description: "Controla tus horas de trabajo con precisión al segundo"
    },
    {
      src: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
      title: "Reportes Detallados",
      description: "Genera informes completos de tu productividad"
    },
    {
      src: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
      title: "Gestión de Equipos",
      description: "Administra proyectos y supervisa el progreso del equipo"
    }
  ];

  return (
    <section id="gallery" className="py-20 bg-gradient-to-b from-black to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ve <span className="text-teal-400">TimeTracker</span> en Acción
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Descubre cómo nuestra interfaz intuitiva hace que gestionar tu tiempo sea simple y efectivo
          </p>
        </div>

        <div className="relative">
          {/* Main Image Display */}
          <div className="relative aspect-video rounded-2xl overflow-hidden bg-gray-800 shadow-2xl">
            <img
              src={galleryImages[currentImage].src}
              alt={galleryImages[currentImage].title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            
            {/* Play Button Overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <button className="bg-teal-500/90 backdrop-blur-sm rounded-full p-6 hover:bg-teal-400 transition-all duration-300 transform hover:scale-110 shadow-xl">
                <Play className="w-8 h-8 text-black ml-1" fill="currentColor" />
              </button>
            </div>

            {/* Image Info */}
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <h3 className="text-2xl font-bold text-white mb-2">
                {galleryImages[currentImage].title}
              </h3>
              <p className="text-gray-200">
                {galleryImages[currentImage].description}
              </p>
            </div>
          </div>

          {/* Thumbnail Navigation */}
          <div className="flex justify-center mt-8 space-x-4">
            {galleryImages.map((image, index) => (
              <button
                key={index}
                onClick={() => setCurrentImage(index)}
                className={`relative w-20 h-20 rounded-lg overflow-hidden transition-all duration-300 ${
                  index === currentImage
                    ? 'ring-4 ring-teal-400 scale-110'
                    : 'opacity-60 hover:opacity-100'
                }`}
              >
                <img
                  src={image.src}
                  alt={image.title}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          <div className="text-center">
            <div className="text-4xl font-bold text-teal-400 mb-2">50,000+</div>
            <div className="text-gray-300">Usuarios Activos</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-teal-400 mb-2">1M+</div>
            <div className="text-gray-300">Horas Registradas</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-teal-400 mb-2">98%</div>
            <div className="text-gray-300">Satisfacción</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppGallerySection;
