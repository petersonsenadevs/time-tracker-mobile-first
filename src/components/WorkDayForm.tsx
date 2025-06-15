
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { format } from 'date-fns';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { Form } from '@/components/ui/form';
import { useAuth } from '@/contexts/AuthContext';
import { hourSessionService, HourSessionData } from '@/services/hourSessionService';
import WorkDayFormHeader from '@/components/workday/WorkDayFormHeader';
import WorkDayFormFields, { WorkDayFormData } from '@/components/workday/WorkDayFormFields';
import WorkDayFormFooter from '@/components/workday/WorkDayFormFooter';

const workDaySchema = z.object({
  date: z.string().min(1, 'La fecha es requerida'),
  startTime: z.string().min(1, 'Hora de inicio es requerida'),
  endTime: z.string().min(1, 'Hora de fin es requerida'),
  plannedHours: z.string().min(1, 'Horas planificadas son requeridas'),
  workType: z.string().optional(),
});

interface WorkDayFormProps {
  selectedDate: Date;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: WorkDayFormData) => void;
}

const WorkDayForm = ({ selectedDate, isOpen, onClose, onSubmit }: WorkDayFormProps) => {
  const { token } = useAuth();
  const form = useForm<WorkDayFormData>({
    resolver: zodResolver(workDaySchema),
    defaultValues: {
      date: format(selectedDate, 'yyyy-MM-dd'),
      startTime: '',
      endTime: '',
      plannedHours: '8',
      workType: 'NORMAL',
    },
  });

  // Actualizar la fecha cuando cambie selectedDate
  React.useEffect(() => {
    form.setValue('date', format(selectedDate, 'yyyy-MM-dd'));
  }, [selectedDate, form]);

  const registerHourSessionMutation = useMutation({
    mutationFn: async (data: HourSessionData) => {
      if (!token) throw new Error('No hay token de autenticación');
      console.log('Sending to API:', data);
      return await hourSessionService.registerHourSession(data, token);
    },
    onSuccess: () => {
      toast.success('Jornada registrada exitosamente');
      form.reset();
      onClose();
    },
    onError: (error: any) => {
      console.error('Error registering hour session:', error);
      
      // Mostrar errores específicos de validación si existen
      if (error?.errors) {
        Object.entries(error.errors).forEach(([field, messages]: [string, any]) => {
          if (Array.isArray(messages) && messages.length > 0) {
            // Mapear los nombres de campos de la API a los del formulario
            const fieldMap: Record<string, string> = {
              'date': 'date',
              'start_time': 'startTime',
              'end_time': 'endTime',
              'planned_hours': 'plannedHours',
              'work_type': 'workType',
            };
            
            const formField = fieldMap[field] as keyof WorkDayFormData;
            if (formField) {
              form.setError(formField, { 
                type: 'server', 
                message: messages[0] 
              });
            }
          }
        });
      }
      
      toast.error(error.message || 'Error al registrar la jornada');
    },
  });

  const handleSubmit = (data: WorkDayFormData) => {
    console.log('Form data submitted:', data);
    
    // Validar que planned_hours sea al menos 2
    const plannedHoursNum = parseInt(data.plannedHours);
    if (plannedHoursNum < 2) {
      form.setError('plannedHours', {
        type: 'manual',
        message: 'Las horas planificadas deben ser mínimo 2'
      });
      return;
    }

    // Formatear datos exactamente como los espera la API
    const hourSessionData: HourSessionData = {
      date: data.date, // Formato YYYY-MM-DD
      start_time: data.startTime, // Formato H:i (ej: "09:00")
      end_time: data.endTime, // Formato H:i (ej: "17:00")
      planned_hours: plannedHoursNum, // Entero, mínimo 2
      work_type: data.workType || undefined, // String opcional
    };

    console.log('Formatted data for API:', hourSessionData);
    registerHourSessionMutation.mutate(hourSessionData);
    
    // También llamar al callback original por compatibilidad
    onSubmit(data);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4">
      <div className="bg-gray-900 rounded-xl border border-teal-500/20 w-full max-w-md max-h-[95vh] sm:max-h-[90vh] overflow-hidden flex flex-col">
        <WorkDayFormHeader selectedDate={selectedDate} onClose={onClose} />

        {/* Form - Scrollable content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
              <WorkDayFormFields form={form} />
            </form>
          </Form>
        </div>

        <WorkDayFormFooter
          onClose={onClose}
          onSubmit={form.handleSubmit(handleSubmit)}
          isLoading={registerHourSessionMutation.isPending}
        />
      </div>
    </div>
  );
};

export default WorkDayForm;
