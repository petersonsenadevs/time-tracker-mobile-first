
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import CalendarSection from './CalendarSection';
import SalaryInfoCard from './SalaryInfoCard';
import StatisticsCard from './StatisticsCard';
import { Employee } from '@/services/userService';

interface DashboardStats {
  totalHoursWorked?: number;
  dailyWorkHours?: any[];
  currentMonthSalary?: number;
  countHourSessionDay?: number;
}

interface DashboardCarouselProps {
  dashboardStats: DashboardStats | null;
  employee: Employee | undefined;
  isLoadingEmployee: boolean;
  selectedDate: Date;
  onDateSelect: (date: Date | undefined) => void;
  onNewWorkDay: () => void;
}

const DashboardCarousel = ({ 
  dashboardStats, 
  employee, 
  isLoadingEmployee, 
  selectedDate, 
  onDateSelect, 
  onNewWorkDay 
}: DashboardCarouselProps) => {
  const slides = [
    {
      id: 'calendar',
      title: 'Calendario',
      content: (
        <CalendarSection 
          selectedDate={selectedDate}
          onDateSelect={onDateSelect}
          onNewWorkDay={onNewWorkDay}
        />
      )
    },
    {
      id: 'salary',
      title: 'Información Salarial',
      content: (
        <SalaryInfoCard 
          employee={employee}
          isLoadingEmployee={isLoadingEmployee}
        />
      )
    },
    {
      id: 'stats',
      title: 'Estadísticas',
      content: (
        <StatisticsCard 
          employee={employee} 
          dashboardStats={dashboardStats}
        />
      )
    }
  ];

  return (
    <div className="h-full lg:h-[calc(100vh-200px)]">
      <Carousel className="w-full h-full">
        <CarouselContent className="h-full">
          {slides.map((slide, index) => (
            <CarouselItem key={slide.id} className="h-full">
              <div className="h-full flex flex-col">
                <div className="flex items-center justify-between mb-4 sm:mb-6 flex-shrink-0">
                  <h2 className="text-xl font-bold text-white">{slide.title}</h2>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-400">
                      {index + 1} de {slides.length}
                    </span>
                    <div className="flex gap-1">
                      {slides.map((_, i) => (
                        <div
                          key={i}
                          className={`w-2 h-2 rounded-full transition-colors ${
                            i === index ? 'bg-teal-400' : 'bg-gray-600'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex-1 min-h-0">
                  {slide.content}
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-4 bg-gray-800 border-gray-700 text-white hover:bg-gray-700" />
        <CarouselNext className="right-4 bg-gray-800 border-gray-700 text-white hover:bg-gray-700" />
      </Carousel>
    </div>
  );
};

export default DashboardCarousel;
