import { Button } from '@/components/ui/button';
import { LogOut, RefreshCw, LucideIcon } from 'lucide-react';
import { User } from '@/services/userService';
import Logo from '@/components/ui/logo';

interface AppHeaderProps {
  pageTitle: string;
  pageIcon: LucideIcon;
  user?: User | null;
  onLogout?: () => void;
  onRefresh?: () => void;
  isRefreshing?: boolean;
  showUserInfo?: boolean;
  showActions?: boolean;
}

const AppHeader = ({ 
  pageTitle, 
  pageIcon: PageIcon, 
  user, 
  onLogout, 
  onRefresh, 
  isRefreshing = false,
  showUserInfo = true,
  showActions = true
}: AppHeaderProps) => {
  return (
    <header className="bg-gray-900/95 backdrop-blur-sm border-b border-teal-500/20 fixed top-0 left-0 right-0 z-50 h-16">
      <div className="px-4 py-3 h-full">
        <div className="flex items-center justify-between h-full">
          {/* Left side - Logo + Page Title */}
          <div className="flex items-center space-x-4">
            <Logo size="sm" showLink={false} />
            <div className="hidden sm:flex items-center space-x-2 border-l border-gray-700 pl-4">
              <PageIcon className="h-5 w-5 text-teal-400" />
              <span className="text-white font-medium">{pageTitle}</span>
            </div>
          </div>

          {/* Right side - User info + Actions */}
          {showActions && (
            <div className="flex items-center space-x-3">
              {showUserInfo && user && (
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-medium text-white">{user.name}</p>
                  <p className="text-xs text-gray-400">{user.email}</p>
                </div>
              )}
              
              {onRefresh && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onRefresh}
                  disabled={isRefreshing}
                  className="text-gray-400 hover:text-teal-400 hover:bg-teal-500/10 h-8 w-8 p-0"
                >
                  <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                </Button>
              )}
              
              {onLogout && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onLogout}
                  className="text-gray-400 hover:text-red-400 hover:bg-red-500/10 h-8 w-8 p-0"
                >
                  <LogOut className="h-4 w-4" />
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
