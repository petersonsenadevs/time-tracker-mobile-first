
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
      startTime: '',
      endTime: '',
      plannedHours: '8',
      workType: 'NORMAL',
    },
  });

  const registerHourSessionMutation = useMutation({
    mutationFn: async (data: HourSessionData) => {
      if (!token) throw new Error('No hay token de autenticación');
      return await hourSessionService.registerHourSession(data, token);
    },
    onSuccess: () => {
      toast.success('Jornada registrada exitosamente');
      form.reset();
      onClose();
    },
    onError: (error) => {
      console.error('Error registering hour session:', error);
      toast.error(error.message || 'Error al registrar la jornada');
    },
  });

  const handleSubmit = (data: WorkDayFormData) => {
    const hourSessionData: HourSessionData = {
      date: format(selectedDate, 'yyyy-MM-dd'),
      start_time: data.startTime,
      end_time: data.endTime,
      planned_hours: parseInt(data.plannedHours),
      work_type: data.workType || undefined,
    };

    console.log('Submitting hour session:', hourSessionData);
    registerHourSessionMutation.mutate(hourSessionData);
    
    // También llamar al callback original por compatibilidad
    onSubmit(data);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 rounded-xl border border-teal-500/20 w-full max-w-md max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <div>
            <h2 className="text-xl font-semibold text-white">Nueva Jornada</h2>
            <p className="text-sm text-gray-400">
              {format(selectedDate, "EEEE, d 'de' MMMM 'de' yyyy", { locale: es })}
            </p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-gray-400 hover:text-white h-8 w-8 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Form */}
        <div className="p-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="startTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300 flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        Hora Inicio
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="time"
                          className="bg-gray-800 border-gray-700 text-white focus:border-teal-400"
                        />
                      </FormControl>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="endTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300 flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        Hora Fin
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="time"
                          className="bg-gray-800 border-gray-700 text-white focus:border-teal-400"
                        />
                      </FormControl>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="plannedHours"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-300">Horas Planificadas</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="number"
                        min="2"
                        placeholder="8"
                        className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-teal-400"
                      />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="workType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-300">Tipo de Trabajo</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="bg-gray-800 border-gray-700 text-white focus:border-teal-400">
                          <SelectValue placeholder="Selecciona el tipo" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-gray-800 border-gray-700">
                        <SelectItem value="NORMAL" className="text-white hover:bg-gray-700">Normal</SelectItem>
                        <SelectItem value="OVERTIME" className="text-white hover:bg-gray-700">Overtime</SelectItem>
                        <SelectItem value="HOLIDAY" className="text-white hover:bg-gray-700">Holiday</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />

              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={onClose}
                  className="flex-1 text-gray-300 hover:text-white hover:bg-gray-800"
                  disabled={registerHourSessionMutation.isPending}
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  className="flex-1 bg-teal-500 hover:bg-teal-600 text-black font-semibold"
                  disabled={registerHourSessionMutation.isPending}
                >
                  {registerHourSessionMutation.isPending ? 'Guardando...' : 'Guardar Jornada'}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default WorkDayForm;
