
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Calendar } from 'lucide-react';
import { DayReport } from '@/services/reportService';

interface DailyBreakdownProps {
  hourWorkedData: Record<string, DayReport>;
}

const DailyBreakdown = ({ hourWorkedData }: DailyBreakdownProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', { 
      weekday: 'short', 
      day: 'numeric', 
      month: 'short' 
    });
  };

  const formatHours = (hours: number, minutes: number) => {
    if (hours === 0 && minutes === 0) return '-';
    return `${hours}h ${minutes}m`;
  };

  const sortedEntries = Object.entries(hourWorkedData).sort((a, b) => 
    new Date(a[1].date).getTime() - new Date(b[1].date).getTime()
  );

  return (
    <Card className="bg-gray-900/50 border-gray-700">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white">
          <Calendar className="h-5 w-5 text-teal-400" />
          Desglose Diario
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-gray-700">
                <TableHead className="text-gray-300">Fecha</TableHead>
                <TableHead className="text-gray-300">Normal</TableHead>
                <TableHead className="text-gray-300">Extra</TableHead>
                <TableHead className="text-gray-300">Festivo</TableHead>
                <TableHead className="text-gray-300">Nocturno</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedEntries.map(([key, dayData]) => (
                <TableRow key={key} className="border-gray-700">
                  <TableCell className="text-white font-medium">
                    {formatDate(dayData.date)}
                  </TableCell>
                  <TableCell className="text-blue-400">
                    {formatHours(dayData.normal_hours.hours, dayData.normal_hours.minutes)}
                  </TableCell>
                  <TableCell className="text-orange-400">
                    {formatHours(dayData.overtime_hours.hours, dayData.overtime_hours.minutes)}
                  </TableCell>
                  <TableCell className="text-green-400">
                    {formatHours(dayData.holiday_hours.hours, dayData.holiday_hours.minutes)}
                  </TableCell>
                  <TableCell className="text-purple-400">
                    {formatHours(dayData.night_hours.hours, dayData.night_hours.minutes)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default DailyBreakdown;
