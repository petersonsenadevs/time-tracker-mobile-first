
import { Button } from '@/components/ui/button';
import { Clock, LogOut, RefreshCcw } from 'lucide-react';
import { User } from '@/services/userService';

interface DashboardHeaderProps {
  user: User | null;
  onLogout: () => void;
  onRefresh: () => void;
}

const DashboardHeader = ({ user, onLogout, onRefresh }: DashboardHeaderProps) => {
  return (
    <header className="bg-gray-900/90 backdrop-blur-sm border-b border-teal-500/20 sticky top-0 z-40">
      <div className="px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Clock className="h-8 w-8 text-teal-400" />
            <span className="text-lg font-bold text-white">TimeTracker</span>
          </div>

          <div className="flex items-center space-x-3">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium text-white">{user?.name}</p>
              <p className="text-xs text-gray-400">{user?.email}</p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onRefresh}
              className="text-gray-400 hover:text-teal-400 hover:bg-teal-500/10 h-8 w-8 p-0"
            >
              <RefreshCcw className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={onLogout}
              className="text-gray-400 hover:text-red-400 hover:bg-red-500/10 h-8 w-8 p-0"
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
