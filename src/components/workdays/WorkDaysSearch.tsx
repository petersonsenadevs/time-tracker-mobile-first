
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Search, Calendar as CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { cn } from '@/lib/utils';

interface WorkDaysSearchProps {
  selectedDate: Date;
  onDateChange: (date: Date | undefined) => void;
  onSearch: () => void;
}

const WorkDaysSearch = ({ selectedDate, onDateChange, onSearch }: WorkDaysSearchProps) => {
  return (
    <Card className="bg-gradient-to-r from-gray-900 to-gray-800 border-gray-700 mb-8">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Search className="h-5 w-5 text-teal-400" />
          Buscar por Fecha
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex gap-4 items-end">
          <div className="flex-1">
            <label htmlFor="date-search" className="block text-sm font-medium text-gray-300 mb-2">
              Selecciona una fecha
            </label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="date-search"
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal bg-gray-800 border-gray-600 text-white hover:bg-gray-700 hover:text-white",
                    !selectedDate && "text-gray-400"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4 text-teal-400" />
                  {selectedDate ? (
                    format(selectedDate, "EEEE, d 'de' MMMM 'de' yyyy", { locale: es })
                  ) : (
                    <span>Selecciona una fecha</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 bg-gray-900 border-gray-700 z-50" align="start">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={onDateChange}
                  initialFocus
                  locale={es}
                  className="p-3 pointer-events-auto bg-gray-900 text-white rounded-md"
                  classNames={{
                    months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
                    month: "space-y-4",
                    caption: "flex justify-center pt-1 relative items-center text-white",
                    caption_label: "text-sm font-medium text-white",
                    nav: "space-x-1 flex items-center",
                    nav_button: "h-7 w-7 bg-gray-800 p-0 text-gray-300 hover:bg-gray-700 hover:text-white border border-gray-600 rounded-md",
                    nav_button_previous: "absolute left-1",
                    nav_button_next: "absolute right-1",
                    table: "w-full border-collapse space-y-1",
                    head_row: "flex",
                    head_cell: "text-gray-400 rounded-md w-9 font-normal text-[0.8rem]",
                    row: "flex w-full mt-2",
                    cell: "h-9 w-9 text-center text-sm p-0 relative text-white hover:bg-gray-800 rounded-md",
                    day: "h-9 w-9 p-0 font-normal text-white hover:bg-gray-700 rounded-md transition-colors",
                    day_selected: "bg-teal-500 text-white hover:bg-teal-600 focus:bg-teal-500 focus:text-white rounded-md",
                    day_today: "bg-gray-700/50 text-teal-400 rounded-md",
                    day_outside: "text-gray-600 opacity-50",
                    day_disabled: "text-gray-600 opacity-30",
                  }}
                />
              </PopoverContent>
            </Popover>
          </div>
          <Button 
            onClick={onSearch}
            size="icon"
            className="bg-teal-500 hover:bg-teal-600 text-white h-10 w-10 flex-shrink-0"
          >
            <Search className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default WorkDaysSearch;
