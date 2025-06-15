
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import PersonalInfoCard from './PersonalInfoCard';
import UpdateEmailCard from './UpdateEmailCard';
import ChangePasswordCard from './ChangePasswordCard';
import DangerZoneCard from './DangerZoneCard';
import NotificationsCard from './NotificationsCard';
import { Employee, UpdateEmailData, ChangePasswordData } from '@/services/userService';

interface SettingsCarouselProps {
  user: any;
  onUpdateEmail: (email: string) => void;
  onChangePassword: (data: ChangePasswordData) => void;
  onLogout: () => void;
  onDeleteAccount: () => void;
  isEmailLoading: boolean;
  isPasswordLoading: boolean;
  isDeleting: boolean;
}

const SettingsCarousel = ({ 
  user,
  onUpdateEmail,
  onChangePassword,
  onLogout,
  onDeleteAccount,
  isEmailLoading,
  isPasswordLoading,
  isDeleting
}: SettingsCarouselProps) => {
  const slides = [
    {
      id: 'personal',
      title: 'Información Personal',
      content: (
        <PersonalInfoCard user={user} />
      )
    },
    {
      id: 'account',
      title: 'Gestión de Cuenta',
      content: (
        <div className="space-y-6">
          <UpdateEmailCard 
            onUpdateEmail={onUpdateEmail}
            isLoading={isEmailLoading}
          />
          <ChangePasswordCard 
            onChangePassword={onChangePassword}
            isLoading={isPasswordLoading}
          />
        </div>
      )
    },
    {
      id: 'notifications',
      title: 'Notificaciones',
      content: (
        <NotificationsCard />
      )
    },
    {
      id: 'danger',
      title: 'Zona de Peligro',
      content: (
        <DangerZoneCard 
          onLogout={onLogout}
          onDeleteAccount={onDeleteAccount}
          isDeleting={isDeleting}
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
                <div className="flex-1 min-h-0 overflow-y-auto">
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

export default SettingsCarousel;
