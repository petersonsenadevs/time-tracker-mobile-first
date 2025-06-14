
import { Home, Clock, BarChart3, User } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const BottomNavBar = () => {
  const location = useLocation();

  const navItems = [
    {
      icon: Home,
      label: 'Dashboard',
      path: '/dashboard',
      isActive: location.pathname === '/dashboard'
    },
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
      icon: User,
      label: 'Perfil',
      path: '/profile',
      isActive: location.pathname === '/profile'
    }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900/95 backdrop-blur-sm border-t border-teal-500/20 md:hidden z-50">
      <div className="flex items-center justify-around py-2">
        {navItems.map((item) => {
          const IconComponent = item.icon;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center py-2 px-3 rounded-lg transition-colors ${
                item.isActive
                  ? 'text-teal-400'
                  : 'text-gray-400 hover:text-teal-300'
              }`}
            >
              <IconComponent className="h-5 w-5 mb-1" />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNavBar;
