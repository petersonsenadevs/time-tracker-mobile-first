
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CalendarDays, Plus } from 'lucide-react';

interface CalendarSectionProps {
  selectedDate: Date;
  onDateSelect: (date: Date | undefined) => void;
  onNewWorkDay: () => void;
}

const CalendarSection = ({ selectedDate, onDateSelect, onNewWorkDay }: CalendarSectionProps) => {
  return (
    <Card className="bg-gray-900/50 border-gray-700 flex-1">
      <CardHeader>
        <CardTitle className="text-white flex items-center justify-between">
          <span className="flex items-center">
            <CalendarDays className="h-5 w-5 mr-2 text-teal-400" />
            Calendario de Jornadas
          </span>
          <Button
            size="sm"
            className="bg-teal-500 hover:bg-teal-600 text-black"
            onClick={onNewWorkDay}
          >
            <Plus className="h-4 w-4 mr-1" />
            Nueva
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-center">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={onDateSelect}
            className="rounded-md border-gray-700"
            classNames={{
              day_selected: "bg-teal-500 text-black hover:bg-teal-600",
              day_today: "bg-gray-700 text-white",
              day: "text-gray-300 hover:bg-gray-700 hover:text-white",
              head_cell: "text-gray-400",
              caption_label: "text-white",
              nav_button: "text-gray-400 hover:text-white hover:bg-gray-700",
            }}
          />
        </div>
        <p className="text-center text-sm text-gray-400 mt-4">
          Toca una fecha para agregar una nueva jornada
        </p>
      </CardContent>
    </Card>
  );
};

export default CalendarSection;
