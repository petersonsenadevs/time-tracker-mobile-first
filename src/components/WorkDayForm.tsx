
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { X, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/contexts/AuthContext';
import { hourSessionService, HourSessionData } from '@/services/hourSessionService';

const workDaySchema = z.object({
  date: z.string().min(1, 'La fecha es requerida'),
  startTime: z.string().min(1, 'Hora de inicio es requerida'),
  endTime: z.string().min(1, 'Hora de fin es requerida'),
  plannedHours: z.string().min(1, 'Horas planificadas son requeridas'),
  workType: z.string().optional(),
});

type WorkDayFormData = z.infer<typeof workDaySchema>;

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
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-700 flex-shrink-0">
          <div>
            <h2 className="text-lg sm:text-xl font-semibold text-white">Nueva Jornada</h2>
            <p className="text-xs sm:text-sm text-gray-400">
              {format(selectedDate, "EEEE, d 'de' MMMM 'de' yyyy", { locale: es })}
            </p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-gray-400 hover:text-white h-8 w-8 p-0 flex-shrink-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Form - Scrollable content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-3 sm:space-y-4">
              {/* Campo de fecha (oculto en móvil para ahorrar espacio) */}
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="hidden sm:block">
                    <FormLabel className="text-gray-300 text-sm">Fecha</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="date"
                        className="bg-gray-800 border-gray-700 text-white focus:border-teal-400 h-9"
                        readOnly
                      />
                    </FormControl>
                    <FormMessage className="text-red-400 text-xs" />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <FormField
                  control={form.control}
                  name="startTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300 flex items-center text-sm">
                        <Clock className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                        Hora Inicio
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="time"
                          className="bg-gray-800 border-gray-700 text-white focus:border-teal-400 h-9 text-sm"
                          placeholder="09:00"
                        />
                      </FormControl>
                      <FormMessage className="text-red-400 text-xs" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="endTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300 flex items-center text-sm">
                        <Clock className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                        Hora Fin
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="time"
                          className="bg-gray-800 border-gray-700 text-white focus:border-teal-400 h-9 text-sm"
                          placeholder="17:00"
                        />
                      </FormControl>
                      <FormMessage className="text-red-400 text-xs" />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="plannedHours"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-300 text-sm">Horas Planificadas (mín. 2)</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="number"
                        min="2"
                        placeholder="8"
                        className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-teal-400 h-9 text-sm"
                      />
                    </FormControl>
                    <FormMessage className="text-red-400 text-xs" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="workType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-300 text-sm">Tipo de Trabajo</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="bg-gray-800 border-gray-700 text-white focus:border-teal-400 h-9 text-sm">
                          <SelectValue placeholder="Selecciona el tipo" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-gray-800 border-gray-700">
                        <SelectItem value="NORMAL" className="text-white hover:bg-gray-700 text-sm">Normal</SelectItem>
                        <SelectItem value="OVERTIME" className="text-white hover:bg-gray-700 text-sm">Overtime</SelectItem>
                        <SelectItem value="HOLIDAY" className="text-white hover:bg-gray-700 text-sm">Holiday</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-red-400 text-xs" />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </div>

        {/* Footer - Fixed at bottom */}
        <div className="flex gap-2 sm:gap-3 p-4 sm:p-6 border-t border-gray-700 flex-shrink-0">
          <Button
            type="button"
            variant="ghost"
            onClick={onClose}
            className="flex-1 text-gray-300 hover:text-white hover:bg-gray-800 h-9 text-sm"
            disabled={registerHourSessionMutation.isPending}
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            onClick={form.handleSubmit(handleSubmit)}
            className="flex-1 bg-teal-500 hover:bg-teal-600 text-black font-semibold h-9 text-sm"
            disabled={registerHourSessionMutation.isPending}
          >
            {registerHourSessionMutation.isPending ? 'Guardando...' : 'Guardar'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WorkDayForm;
