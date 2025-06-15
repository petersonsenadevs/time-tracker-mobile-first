
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/contexts/AuthContext';
import { reportService } from '@/services/reportService';
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

  const { data: reportData, isLoading, error } = useQuery({
    queryKey: ['monthly-report', selectedMonth, selectedYear, token],
    queryFn: () => reportService.getMonthlyReport(selectedMonth, selectedYear, token!),
    enabled: !!token,
  });

  const handleMonthYearChange = (month: number, year: number) => {
    setSelectedMonth(month);
    setSelectedYear(year);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-400 mx-auto mb-4"></div>
          <p className="text-gray-300">Cargando estadísticas...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400 mb-4">Error al cargar las estadísticas</p>
          <p className="text-gray-400">{error instanceof Error ? error.message : 'Error desconocido'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <StatisticsHeader />
      
      <div className="flex-1 container mx-auto px-4 py-6 max-w-7xl pb-20 lg:pb-6 space-y-6">
        <MonthYearSelector 
          selectedMonth={selectedMonth}
          selectedYear={selectedYear}
          onMonthYearChange={handleMonthYearChange}
        />

        {reportData && (
          <>
            <ReportSummary reportData={reportData} />
            <SalaryInfo salary={reportData.salary} />
            <DailyBreakdown hourWorkedData={reportData.hourWorkedData} />
          </>
        )}
      </div>

      <BottomNavBar />
    </div>
  );
};

export default Statistics;
