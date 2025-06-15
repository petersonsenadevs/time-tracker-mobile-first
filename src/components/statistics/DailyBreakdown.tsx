
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Calendar } from 'lucide-react';
import { DayReport } from '@/services/reportService';

interface DailyBreakdownProps {
  hourWorkedData: Record<string, DayReport>;
  hasData?: boolean;
}

const DailyBreakdown = ({ hourWorkedData, hasData = true }: DailyBreakdownProps) => {
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

  const textColorClass = hasData ? 'text-white' : 'text-gray-500';
  const cellColorClasses = hasData ? {
    normal: 'text-blue-400',
    overtime: 'text-orange-400',
    holiday: 'text-green-400',
    night: 'text-purple-400'
  } : {
    normal: 'text-gray-500',
    overtime: 'text-gray-500',
    holiday: 'text-gray-500',
    night: 'text-gray-500'
  };

  return (
    <Card className="bg-gray-900/50 border-gray-700">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white">
          <Calendar className="h-5 w-5 text-teal-400" />
          Desglose Diario
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        {sortedEntries.length === 0 ? (
          <div className="p-6 text-center">
            <p className="text-gray-400">No hay registros de trabajo para este período</p>
          </div>
        ) : (
          <ScrollArea className="h-[500px] w-full">
            <Table>
              <TableHeader>
                <TableRow className="border-gray-700">
                  <TableHead className="text-gray-300 w-[120px] min-w-[120px]">Fecha</TableHead>
                  <TableHead className="text-gray-300 w-[80px] min-w-[80px] text-center">Normal</TableHead>
                  <TableHead className="text-gray-300 w-[80px] min-w-[80px] text-center">Extra</TableHead>
                  <TableHead className="text-gray-300 w-[80px] min-w-[80px] text-center">Festivo</TableHead>
                  <TableHead className="text-gray-300 w-[80px] min-w-[80px] text-center">Nocturno</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedEntries.map(([key, dayData]) => (
                  <TableRow key={key} className="border-gray-700">
                    <TableCell className={`${textColorClass} font-medium w-[120px] min-w-[120px]`}>
                      {formatDate(dayData.date)}
                    </TableCell>
                    <TableCell className={`${cellColorClasses.normal} w-[80px] min-w-[80px] text-center text-sm`}>
                      {formatHours(dayData.normal_hours.hours, dayData.normal_hours.minutes)}
                    </TableCell>
                    <TableCell className={`${cellColorClasses.overtime} w-[80px] min-w-[80px] text-center text-sm`}>
                      {formatHours(dayData.overtime_hours.hours, dayData.overtime_hours.minutes)}
                    </TableCell>
                    <TableCell className={`${cellColorClasses.holiday} w-[80px] min-w-[80px] text-center text-sm`}>
                      {formatHours(dayData.holiday_hours.hours, dayData.holiday_hours.minutes)}
                    </TableCell>
                    <TableCell className={`${cellColorClasses.night} w-[80px] min-w-[80px] text-center text-sm`}>
                      {formatHours(dayData.night_hours.hours, dayData.night_hours.minutes)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  );
};

export default DailyBreakdown;
