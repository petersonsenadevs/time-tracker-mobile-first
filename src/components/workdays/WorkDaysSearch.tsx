
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Search, CalendarIcon } from 'lucide-react';
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
              <PopoverContent className="w-auto p-0 bg-gray-900 border-gray-700" align="start">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={onDateChange}
                  initialFocus
                  locale={es}
                  className={cn("p-3 pointer-events-auto bg-gray-900 text-white")}
                />
              </PopoverContent>
            </Popover>
          </div>
          <Button 
            onClick={onSearch}
            className="bg-teal-500 hover:bg-teal-600 text-white px-6"
          >
            <Search className="h-4 w-4 mr-2" />
            Buscar
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default WorkDaysSearch;
