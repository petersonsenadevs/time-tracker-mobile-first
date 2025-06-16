import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import CalendarSection from './CalendarSection';
import SalaryInfoCard from './SalaryInfoCard';
import StatisticsCard from './StatisticsCard';
import { Employee } from '@/services/userService';
import { useState, useEffect } from 'react';
import { type CarouselApi } from '@/components/ui/carousel';

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
  const [api, setApi] = useState<CarouselApi>();
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  useEffect(() => {
    if (!api) {
      return;
    }

    const updateScrollState = () => {
      setCanScrollPrev(api.canScrollPrev());
      setCanScrollNext(api.canScrollNext());
    };

    updateScrollState();
    api.on("reInit", updateScrollState);
    api.on("select", updateScrollState);

    return () => {
      api?.off("select", updateScrollState);
    };
  }, [api]);

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
      id: 'stats',
      title: 'Estadísticas',
      content: (
        <StatisticsCard 
          employee={employee} 
          dashboardStats={dashboardStats}
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
   
  ];

  return (
    <div className="h-full">
      <Carousel className="w-full h-full" setApi={setApi}>
        <CarouselContent className="h-full">
          {slides.map((slide, index) => (
            <CarouselItem key={slide.id} className="h-full">
              <div className="h-full flex flex-col">
                <div className="flex items-center justify-between mb-3 flex-shrink-0">
                  <h2 className="text-lg font-bold text-white">{slide.title}</h2>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-400">
                      {index + 1} de {slides.length}
                    </span>
                    <div className="flex gap-1">
                      {slides.map((_, i) => (
                        <div
                          key={i}
                          className={`w-1.5 h-1.5 rounded-full transition-colors ${
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
        {canScrollPrev && (
          <CarouselPrevious className="left-2 bg-gray-800 border-gray-700 text-white hover:bg-gray-700" />
        )}
        {canScrollNext && (
          <CarouselNext className="right-2 bg-gray-800 border-gray-700 text-white hover:bg-gray-700" />
        )}
      </Carousel>
    </div>
  );
};

export default DashboardCarousel;
