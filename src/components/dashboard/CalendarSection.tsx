
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, CalendarDays, ChevronLeft, ChevronRight } from 'lucide-react';
import { es } from 'date-fns/locale';
import { format, isToday } from 'date-fns';
import { useState } from 'react';

interface CalendarSectionProps {
  selectedDate: Date;
  onDateSelect: (date: Date | undefined) => void;
  onNewWorkDay: () => void;
}

const CalendarSection = ({ selectedDate, onDateSelect, onNewWorkDay }: CalendarSectionProps) => {
  const [month, setMonth] = useState<Date>(selectedDate);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      const today = new Date();
      today.setHours(23, 59, 59, 999);
      
      if (date <= today) {
        onDateSelect(date);
        onNewWorkDay();
      }
    }
  };

  const goToToday = () => {
    const today = new Date();
    setMonth(today);
    onDateSelect(today);
  };

  const handlePreviousMonth = () => {
    const newMonth = new Date(month);
    newMonth.setMonth(newMonth.getMonth() - 1);
    setMonth(newMonth);
  };

  const handleNextMonth = () => {
    const newMonth = new Date(month);
    newMonth.setMonth(newMonth.getMonth() + 1);
    setMonth(newMonth);
  };

  const canGoNext = () => {
    const nextMonth = new Date(month);
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    const today = new Date();
    return nextMonth.getFullYear() <= today.getFullYear() && 
           (nextMonth.getFullYear() < today.getFullYear() || nextMonth.getMonth() <= today.getMonth());
  };

  const handleMonthYearChange = (newMonth: number, newYear: number) => {
    const newDate = new Date(newYear, newMonth, 1);
    setMonth(newDate);
    setIsDatePickerOpen(false);
  };

  const months = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, i) => currentYear - 5 + i);

  return (
    <Card className="bg-gray-900/50 border-gray-700 h-full">
      <CardContent className="p-4 h-full flex flex-col">
        {/* Action buttons */}
        <div className="flex justify-between items-center mb-4 flex-shrink-0">
          <Button
            size="sm"
            variant="outline"
            className="bg-gray-800 border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
            onClick={goToToday}
            disabled={isToday(selectedDate)}
          >
            <CalendarDays className="h-4 w-4 mr-2" />
            Hoy
          </Button>
          
          <Button
            size="sm"
            className="bg-teal-500 hover:bg-teal-600 text-black font-medium transition-colors"
            onClick={onNewWorkDay}
          >
            <Plus className="h-4 w-4 mr-2" />
            Nueva Jornada
          </Button>
        </div>

        {/* Month/Year navigation */}
        <div className="flex items-center justify-between px-2 py-2 bg-gray-800/50 rounded-lg mb-4 flex-shrink-0">
          <Button
            variant="ghost"
            size="sm"
            onClick={handlePreviousMonth}
            className="text-gray-300 hover:text-white hover:bg-gray-700 p-2"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          
          <Popover open={isDatePickerOpen} onOpenChange={setIsDatePickerOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                className="text-white font-semibold capitalize hover:bg-gray-700 px-4 py-2"
              >
                {format(month, "MMMM yyyy", { locale: es })}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-4 bg-gray-800 border-gray-600" align="center">
              <div className="space-y-4">
                <div className="text-center text-white font-medium">
                  Seleccionar mes y año
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm text-gray-300">Mes</label>
                    <Select
                      value={month.getMonth().toString()}
                      onValueChange={(value) => handleMonthYearChange(parseInt(value), month.getFullYear())}
                    >
                      <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-700 border-gray-600">
                        {months.map((monthName, index) => (
                          <SelectItem 
                            key={index} 
                            value={index.toString()}
                            className="text-white hover:bg-gray-600"
                          >
                            {monthName}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm text-gray-300">Año</label>
                    <Select
                      value={month.getFullYear().toString()}
                      onValueChange={(value) => handleMonthYearChange(month.getMonth(), parseInt(value))}
                    >
                      <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-700 border-gray-600">
                        {years.map((year) => (
                          <SelectItem 
                            key={year} 
                            value={year.toString()}
                            className="text-white hover:bg-gray-600"
                          >
                            {year}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="flex justify-center pt-2">
                  <Button
                    size="sm"
                    onClick={() => setIsDatePickerOpen(false)}
                    className="bg-teal-500 hover:bg-teal-600 text-black"
                  >
                    Confirmar
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={handleNextMonth}
            disabled={!canGoNext()}
            className="text-gray-300 hover:text-white hover:bg-gray-700 p-2 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        
        {/* Calendar */}
        <div className="flex-1 flex justify-center items-center min-h-0">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={handleDateSelect}
            month={month}
            onMonthChange={setMonth}
            locale={es}
            disabled={(date) => {
              const today = new Date();
              today.setHours(23, 59, 59, 999);
              return date > today;
            }}
            className="rounded-md border-gray-700 w-full max-w-sm"
            classNames={{
              months: "flex w-full justify-center",
              month: "space-y-2 w-full",
              caption: "hidden",
              nav: "hidden",
              table: "w-full border-collapse space-y-1",
              head_row: "flex w-full",
              head_cell: "text-gray-400 rounded-md w-full font-medium text-xs py-2 text-center",
              row: "flex w-full mt-1",
              cell: "relative w-full h-10 text-center text-sm p-0.5",
              day: "h-full w-full p-0 font-normal text-gray-300 hover:bg-gray-700 hover:text-white transition-all duration-200 rounded-md flex items-center justify-center cursor-pointer text-sm active:scale-95",
              day_selected: "bg-teal-500 text-black hover:bg-teal-600 hover:text-black focus:bg-teal-500 focus:text-black font-bold shadow-lg scale-105",
              day_today: "bg-gray-700 text-white font-bold border border-gray-500",
              day_outside: "text-gray-600 opacity-40",
              day_disabled: "text-gray-600 opacity-20 cursor-not-allowed",
            }}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default CalendarSection;
