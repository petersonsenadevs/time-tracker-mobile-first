
import { Home, Clock, BarChart3, User, Settings } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

const BottomNavBar = () => {
  const location = useLocation();
  const [isGlitching, setIsGlitching] = useState(false);
  const [prevPath, setPrevPath] = useState(location.pathname);

  const navItems = [
    {
      icon: Clock,
      label: 'Horas',
      path: '/workdays',
      isActive: location.pathname === '/workdays'
    },
    {
      icon: BarChart3,
      label: 'Stats',
      path: '/statistics',
      isActive: location.pathname === '/statistics'
    },
    {
      icon: Home,
      label: 'Inicio',
      path: '/dashboard',
      isActive: location.pathname === '/dashboard',
      isHome: true
    },
    {
      icon: User,
      label: 'Perfil',
      path: '/profile',
      isActive: location.pathname === '/profile'
    },
    {
      icon: Settings,
      label: 'Config',
      path: '/settings',
      isActive: location.pathname === '/settings'
    }
  ];

  // Trigger glitch effect when route changes
  useEffect(() => {
    if (prevPath !== location.pathname) {
      setIsGlitching(true);
      const timer = setTimeout(() => {
        setIsGlitching(false);
      }, 300);
      setPrevPath(location.pathname);
      return () => clearTimeout(timer);
    }
  }, [location.pathname, prevPath]);

  return (
    <div className={`fixed bottom-0 left-0 right-0 bg-gray-900/98 backdrop-blur-md border-t border-gray-800 z-50 transition-all duration-300 ${
      isGlitching ? 'glitch' : ''
    }`}>
      <div className="safe-area-inset-bottom">
        <div className={`flex items-center justify-around px-2 py-1 max-w-md mx-auto transition-all duration-300 ${
          isGlitching ? 'transform translate-x-1' : ''
        }`}>
          {navItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`relative flex flex-col items-center justify-center py-2 px-3 rounded-2xl transition-all duration-300 ease-out min-w-0 flex-1 max-w-20 group ${
                  item.isActive
                    ? 'text-teal-400'
                    : 'text-gray-500 hover:text-gray-300 active:scale-95'
                } ${isGlitching ? 'animate-pulse' : ''}`}
              >
                {/* Active indicator */}
                {item.isActive && (
                  <div className={`absolute top-0 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-teal-400 rounded-full transition-all duration-300 ${
                    isGlitching ? 'bg-red-400 animate-ping' : ''
                  }`}></div>
                )}
                
                {/* Icon container */}
                <div className={`relative p-2 rounded-xl transition-all duration-300 ${
                  item.isActive 
                    ? 'bg-teal-500/20 shadow-lg' 
                    : 'group-hover:bg-gray-800/50 group-active:bg-gray-700/50'
                } ${isGlitching && item.isActive ? 'bg-red-500/20 shadow-red-500/25' : ''}`}>
                  <IconComponent className={`transition-all duration-300 ${
                    item.isHome ? 'h-6 w-6' : 'h-5 w-5'
                  } ${isGlitching ? 'text-red-400' : ''}`} />
                  
                  {/* Home special indicator */}
                  {item.isHome && item.isActive && (
                    <div className={`absolute inset-0 bg-teal-500/10 rounded-xl animate-pulse ${
                      isGlitching ? 'bg-red-500/20' : ''
                    }`}></div>
                  )}
                </div>
                
                {/* Label - only show when active */}
                <span className={`text-xs font-medium mt-1 transition-all duration-300 text-center leading-tight truncate w-full ${
                  item.isActive 
                    ? 'opacity-100 transform translate-y-0' 
                    : 'opacity-0 transform translate-y-1 absolute'
                } ${item.isHome && item.isActive ? 'font-semibold' : ''} ${
                  isGlitching ? 'text-red-400 animate-pulse' : ''
                }`}>
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BottomNavBar;
