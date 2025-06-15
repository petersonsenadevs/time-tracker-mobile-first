
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, Calendar, TrendingUp } from 'lucide-react';
import { MonthlyReportData } from '@/services/reportService';

interface ReportSummaryProps {
  reportData: MonthlyReportData;
}

const ReportSummary = ({ reportData }: ReportSummaryProps) => {
  const formatHours = (hours: number, minutes: number) => {
    return `${hours}h ${minutes}m`;
  };

  return (
    <Card className="bg-gray-900/50 border-gray-700">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white">
          <TrendingUp className="h-5 w-5 text-teal-400" />
          Resumen del Mes
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-lg border border-blue-500/30">
            <Clock className="h-8 w-8 text-blue-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white mb-1">
              {formatHours(reportData.totalNormalHours.hours, reportData.totalNormalHours.minutes)}
            </div>
            <div className="text-gray-400 text-sm">Horas Normales</div>
          </div>

          <div className="text-center p-4 bg-gradient-to-br from-orange-500/20 to-orange-600/20 rounded-lg border border-orange-500/30">
            <Clock className="h-8 w-8 text-orange-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white mb-1">
              {formatHours(reportData.totalOvertimeHours.hours, reportData.totalOvertimeHours.minutes)}
            </div>
            <div className="text-gray-400 text-sm">Horas Extra</div>
          </div>

          <div className="text-center p-4 bg-gradient-to-br from-green-500/20 to-green-600/20 rounded-lg border border-green-500/30">
            <Calendar className="h-8 w-8 text-green-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white mb-1">
              {formatHours(reportData.totalHolidayHours.hours, reportData.totalHolidayHours.minutes)}
            </div>
            <div className="text-gray-400 text-sm">Horas Festivas</div>
          </div>

          <div className="text-center p-4 bg-gradient-to-br from-teal-500/20 to-teal-600/20 rounded-lg border border-teal-500/30">
            <TrendingUp className="h-8 w-8 text-teal-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white mb-1">
              {formatHours(reportData.totalHours.hours, reportData.totalHours.minutes)}
            </div>
            <div className="text-gray-400 text-sm">Total Horas</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReportSummary;
