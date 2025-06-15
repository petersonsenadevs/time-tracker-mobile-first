
interface DashboardStats {
  totalHoursWorked?: number;
  dailyWorkHours?: any[];
  currentMonthSalary?: number;
  countHourSessionDay?: number;
}

interface StatsCardsProps {
  dashboardStats: DashboardStats | null;
}

const StatsCards = ({ dashboardStats }: StatsCardsProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
      <div className="bg-gradient-to-br from-teal-500/20 to-teal-600/10 border-teal-500/30 rounded-lg border p-4">
        <div className="pb-2">
          <h3 className="text-white flex items-center text-sm font-semibold">
            <svg className="h-4 w-4 mr-2 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
            Horas este mes
          </h3>
        </div>
        <div>
          <div className="text-2xl font-bold text-white mb-1">
            {dashboardStats?.totalHoursWorked?.toFixed(1) || '0.0'}h
          </div>
          <p className="text-teal-300 text-xs">
            {dashboardStats?.countHourSessionDay || 0} días trabajados
          </p>
        </div>
      </div>

      <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/10 border-blue-500/30 rounded-lg border p-4">
        <div className="pb-2">
          <h3 className="text-white flex items-center text-sm font-semibold">
            <svg className="h-4 w-4 mr-2 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Salario actual
          </h3>
        </div>
        <div>
          <div className="text-2xl font-bold text-white mb-1">
            €{dashboardStats?.currentMonthSalary?.toFixed(2) || '0.00'}
          </div>
          <p className="text-blue-300 text-xs">este mes</p>
        </div>
      </div>
    </div>
  );
};

export default StatsCards;
