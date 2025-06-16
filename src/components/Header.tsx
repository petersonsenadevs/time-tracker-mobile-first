
import { useState } from 'react';
import { Menu, X, LogIn, UserPlus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Logo from '@/components/ui/logo';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full z-50 bg-black/90 backdrop-blur-md border-b border-teal-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Logo height="h-24" />

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-300 hover:text-teal-400 transition-colors duration-200">
              Características
            </a>
            <a href="#pricing" className="text-gray-300 hover:text-teal-400 transition-colors duration-200">
              Precios
            </a>
            <a href="#contact" className="text-gray-300 hover:text-teal-400 transition-colors duration-200">
              Contacto
            </a>
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" className="text-gray-300 hover:text-teal-400 hover:bg-teal-500/10" asChild>
              <Link to="/login">
                <LogIn className="w-4 h-4 mr-2" />
                Iniciar Sesión
              </Link>
            </Button>
            <Button className="bg-teal-500 hover:bg-teal-600 text-black font-semibold" asChild>
              <Link to="/register">
                <UserPlus className="w-4 h-4 mr-2" />
                Registrarse
              </Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-teal-400 transition-colors duration-200"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-black/95 rounded-lg mt-2 border border-teal-500/20">
              <a
                href="#features"
                className="block px-3 py-2 text-gray-300 hover:text-teal-400 transition-colors duration-200"
                onClick={() => setIsOpen(false)}
              >
                Características
              </a>
              <a
                href="#pricing"
                className="block px-3 py-2 text-gray-300 hover:text-teal-400 transition-colors duration-200"
                onClick={() => setIsOpen(false)}
              >
                Precios
              </a>
              <a
                href="#contact"
                className="block px-3 py-2 text-gray-300 hover:text-teal-400 transition-colors duration-200"
                onClick={() => setIsOpen(false)}
              >
                Contacto
              </a>
              <div className="pt-4 border-t border-teal-500/20 space-y-2">
                <Button variant="ghost" className="w-full justify-start text-gray-300 hover:text-teal-400 hover:bg-teal-500/10" asChild>
                  <Link to="/login">
                    <LogIn className="w-4 h-4 mr-2" />
                    Iniciar Sesión
                  </Link>
                </Button>
                <Button className="w-full bg-teal-500 hover:bg-teal-600 text-black font-semibold" asChild>
                  <Link to="/register">
                    <UserPlus className="w-4 h-4 mr-2" />
                    Registrarse
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
