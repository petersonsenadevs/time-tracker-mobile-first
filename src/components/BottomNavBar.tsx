
import { Home, Clock, BarChart3, User, Settings } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const BottomNavBar = () => {
  const location = useLocation();

  const navItems = [
    {
      icon: Clock,
      label: 'Jornadas',
      path: '/workdays',
      isActive: location.pathname === '/workdays'
    },
    {
      icon: BarChart3,
      label: 'Reportes',
      path: '/reports',
      isActive: location.pathname === '/reports'
    },
    {
      icon: Home,
      label: 'Dashboard',
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
      label: 'Ajustes',
      path: '/settings',
      isActive: location.pathname === '/settings'
    }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900/98 backdrop-blur-md border-t border-gray-800 lg:hidden z-50">
      <div className="safe-area-inset-bottom">
        <div className="flex items-center justify-around px-2 py-1 max-w-md mx-auto">
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
                }`}
              >
                {/* Active indicator */}
                {item.isActive && (
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-teal-400 rounded-full"></div>
                )}
                
                {/* Icon container */}
                <div className={`relative p-2 rounded-xl transition-all duration-300 ${
                  item.isActive 
                    ? 'bg-teal-500/20 shadow-lg' 
                    : 'group-hover:bg-gray-800/50 group-active:bg-gray-700/50'
                }`}>
                  <IconComponent className={`transition-all duration-300 ${
                    item.isHome ? 'h-6 w-6' : 'h-5 w-5'
                  }`} />
                  
                  {/* Home special indicator */}
                  {item.isHome && item.isActive && (
                    <div className="absolute inset-0 bg-teal-500/10 rounded-xl animate-pulse"></div>
                  )}
                </div>
                
                {/* Label - only show when active */}
                <span className={`text-xs font-medium mt-1 transition-all duration-300 text-center leading-tight truncate w-full ${
                  item.isActive 
                    ? 'opacity-100 transform translate-y-0' 
                    : 'opacity-0 transform translate-y-1 absolute'
                } ${item.isHome && item.isActive ? 'font-semibold' : ''}`}>
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
