
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { es } from 'date-fns/locale';

interface CalendarSectionProps {
  selectedDate: Date;
  onDateSelect: (date: Date | undefined) => void;
  onNewWorkDay: () => void;
}

const CalendarSection = ({ selectedDate, onDateSelect, onNewWorkDay }: CalendarSectionProps) => {
  return (
    <Card className="bg-gray-900/50 border-gray-700 flex-1 w-full">
      <CardContent className="p-4 sm:p-6">
        <div className="flex flex-col space-y-4">
          <div className="flex justify-end">
            <Button
              size="sm"
              className="bg-teal-500 hover:bg-teal-600 text-black font-medium transition-colors"
              onClick={onNewWorkDay}
              aria-label="Crear nueva jornada de trabajo"
            >
              <Plus className="h-4 w-4 mr-2" />
              Nueva Jornada
            </Button>
          </div>
          
          <div className="flex justify-center w-full">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={onDateSelect}
              locale={es}
              className="rounded-md border-gray-700 w-full max-w-sm"
              classNames={{
                months: "flex w-full justify-center",
                month: "space-y-4 w-full",
                caption: "flex justify-center pt-1 relative items-center mb-4",
                caption_label: "text-white text-lg font-semibold",
                nav: "space-x-1 flex items-center",
                nav_button: "text-gray-400 hover:text-white hover:bg-gray-700 h-8 w-8 bg-transparent p-0 opacity-70 hover:opacity-100 transition-all duration-200 rounded-md",
                nav_button_previous: "absolute left-1",
                nav_button_next: "absolute right-1",
                table: "w-full border-collapse space-y-1",
                head_row: "flex w-full",
                head_cell: "text-gray-400 rounded-md w-full font-medium text-sm py-2 text-center",
                row: "flex w-full mt-2",
                cell: "relative w-full h-12 text-center text-sm p-0 focus-within:relative focus-within:z-20",
                day: "h-12 w-full p-0 font-normal text-gray-300 hover:bg-gray-700 hover:text-white transition-all duration-200 rounded-md flex items-center justify-center cursor-pointer",
                day_range_end: "day-range-end",
                day_selected: "bg-teal-500 text-black hover:bg-teal-600 hover:text-black focus:bg-teal-500 focus:text-black font-semibold",
                day_today: "bg-gray-700 text-white font-semibold border border-gray-500",
                day_outside: "text-gray-600 opacity-50 aria-selected:bg-gray-800 aria-selected:text-gray-400 aria-selected:opacity-30",
                day_disabled: "text-gray-600 opacity-30 cursor-not-allowed",
                day_range_middle: "aria-selected:bg-gray-700 aria-selected:text-white",
                day_hidden: "invisible",
              }}
              components={{
                IconLeft: ({ ...props }) => (
                  <svg
                    {...props}
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                ),
                IconRight: ({ ...props }) => (
                  <svg
                    {...props}
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                ),
              }}
              aria-label="Calendario para seleccionar fecha de jornada laboral"
              role="application"
            />
          </div>
          
          <p className="text-center text-sm text-gray-400 mt-4 px-2">
            Selecciona una fecha para gestionar tu jornada laboral
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default CalendarSection;
