
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/contexts/AuthContext';
import { reportService } from '@/services/reportService';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';
import BottomNavBar from '@/components/BottomNavBar';
import StatisticsHeader from '@/components/statistics/StatisticsHeader';
import MonthYearSelector from '@/components/statistics/MonthYearSelector';
import ReportSummary from '@/components/statistics/ReportSummary';
import DailyBreakdown from '@/components/statistics/DailyBreakdown';
import SalaryInfo from '@/components/statistics/SalaryInfo';

const Statistics = () => {
  const { token } = useAuth();
  const currentDate = new Date();
  const [selectedMonth, setSelectedMonth] = useState(currentDate.getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(currentDate.getFullYear());

  const { data: reportData, isLoading } = useQuery({
    queryKey: ['monthly-report', selectedMonth, selectedYear, token],
    queryFn: () => reportService.getMonthlyReport(selectedMonth, selectedYear, token!),
    enabled: !!token,
    retry: false, // No reintentar en caso de error
  });

  const handleMonthYearChange = (month: number, year: number) => {
    setSelectedMonth(month);
    setSelectedYear(year);
  };

  const monthNames = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <StatisticsHeader />
      
      <div className="flex-1 container mx-auto px-4 py-6 max-w-7xl pb-20 lg:pb-6 space-y-6">
        <MonthYearSelector 
          selectedMonth={selectedMonth}
          selectedYear={selectedYear}
          onMonthYearChange={handleMonthYearChange}
          isLoading={isLoading}
        />

        {isLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-400 mx-auto mb-4"></div>
            <p className="text-gray-300">Cargando estadísticas...</p>
          </div>
        ) : (
          <>
            {reportData && !reportData.hasData && (
              <Alert className="bg-gray-900/50 border-yellow-600 border">
                <AlertTriangle className="h-4 w-4 text-yellow-400" />
                <AlertDescription className="text-yellow-200">
                  No hay datos disponibles para {monthNames[selectedMonth - 1]} de {selectedYear}. 
                  Los valores se muestran en cero.
                </AlertDescription>
              </Alert>
            )}

            {reportData && (
              <>
                <ReportSummary reportData={reportData} />
                <SalaryInfo salary={reportData.salary} hasData={reportData.hasData} />
                <DailyBreakdown hourWorkedData={reportData.hourWorkedData} hasData={reportData.hasData} />
              </>
            )}
          </>
        )}
      </div>

      <BottomNavBar />
    </div>
  );
};

export default Statistics;
