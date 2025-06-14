
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
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900/95 backdrop-blur-sm border-t border-teal-500/20 lg:hidden z-50">
      <div className="flex items-center justify-center py-2 px-4">
        <div className="flex items-center justify-between w-full max-w-sm">
          {navItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`relative flex flex-col items-center py-2 px-3 rounded-lg transition-all duration-300 ease-in-out transform ${
                  item.isActive
                    ? 'text-teal-400 scale-110'
                    : 'text-gray-400 hover:text-teal-300 hover:scale-105'
                } ${item.isHome ? 'mx-4' : ''}`}
              >
                {item.isHome && item.isActive && (
                  <div className="absolute -top-1 -left-1 -right-1 -bottom-1 bg-teal-500/20 rounded-xl animate-pulse"></div>
                )}
                <div className={`p-2 rounded-xl transition-all duration-300 ${
                  item.isHome && item.isActive 
                    ? 'bg-teal-500/30 shadow-lg shadow-teal-500/25' 
                    : item.isActive 
                    ? 'bg-teal-500/20' 
                    : 'hover:bg-gray-700/50'
                }`}>
                  <IconComponent className={`h-5 w-5 transition-all duration-300 ${
                    item.isHome ? 'h-6 w-6' : 'h-5 w-5'
                  }`} />
                </div>
                <span className={`text-xs font-medium mt-1 transition-all duration-300 ${
                  item.isHome ? 'text-xs font-semibold' : 'text-xs'
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
