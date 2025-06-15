
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { X } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { updateWorkSessionService, UpdateHourSessionData } from '@/services/updateWorkSessionService';
import { WorkSession } from '@/services/workSessionService';

const editWorkSessionSchema = z.object({
  start_time: z.string().min(1, 'Hora de inicio es requerida'),
  end_time: z.string().min(1, 'Hora de fin es requerida'),
  planned_hours: z.string().min(1, 'Horas planificadas son requeridas'),
  work_type: z.string().optional(),
});

type EditWorkSessionFormData = z.infer<typeof editWorkSessionSchema>;

interface EditWorkSessionFormProps {
  session: WorkSession;
  isOpen: boolean;
  onClose: () => void;
}

const EditWorkSessionForm = ({ session, isOpen, onClose }: EditWorkSessionFormProps) => {
  const { token } = useAuth();
  const queryClient = useQueryClient();

  const form = useForm<EditWorkSessionFormData>({
    resolver: zodResolver(editWorkSessionSchema),
    defaultValues: {
      start_time: session.start_time.slice(0, 5),
      end_time: session.end_time.slice(0, 5),
      planned_hours: session.planned_hours.toString(),
      work_type: session.work_type === 'is_normal' ? 'NORMAL' : 
                 session.work_type === 'is_overtime' ? 'OVERTIME' : 
                 session.work_type === 'is_holiday' ? 'HOLIDAY' : 'NORMAL',
    },
  });

  const updateSessionMutation = useMutation({
    mutationFn: async (formData: EditWorkSessionFormData) => {
      if (!token) throw new Error('No hay token de autenticación');
      
      console.log('Form data being sent:', formData);
      
      const plannedHoursNum = parseInt(formData.planned_hours);
      if (plannedHoursNum < 2) {
        throw new Error('Las horas planificadas deben ser mínimo 2');
      }

      const workTypeMap: Record<string, string> = {
        'NORMAL': 'is_normal',
        'OVERTIME': 'is_overtime', 
        'HOLIDAY': 'is_holiday'
      };

      const updateData: UpdateHourSessionData = {
        date: session.date,
        start_time: formData.start_time,
        end_time: formData.end_time,
        planned_hours: plannedHoursNum,
        work_type: formData.work_type ? workTypeMap[formData.work_type] : 'is_normal',
      };

      console.log('Update data being sent to API:', updateData);
      
      return await updateWorkSessionService.updateHourSession(updateData, session.date, token);
    },
    onSuccess: (response) => {
      console.log('Update response:', response);
      toast.success('Sesión actualizada exitosamente');
      queryClient.invalidateQueries({ queryKey: ['workSessions'] });
      onClose();
    },
    onError: (error: any) => {
      console.error('Error updating session:', error);
      toast.error(error.message || 'Error al actualizar la sesión');
    },
  });

  const handleSubmit = (data: EditWorkSessionFormData) => {
    console.log('Form submitted with data:', data);
    
    const plannedHoursNum = parseInt(data.planned_hours);
    if (plannedHoursNum < 2) {
      form.setError('planned_hours', {
        type: 'manual',
        message: 'Las horas planificadas deben ser mínimo 2'
      });
      return;
    }

    updateSessionMutation.mutate(data);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 rounded-xl border border-teal-500/20 w-full max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <h2 className="text-xl font-semibold text-white">Editar Sesión</h2>
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
              <FormField
                control={form.control}
                name="start_time"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-300">Hora de Inicio</FormLabel>
                    <FormControl>
                      <Input
                        type="time"
                        {...field}
                        className="bg-gray-800 border-gray-600 text-white"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="end_time"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-300">Hora de Fin</FormLabel>
                    <FormControl>
                      <Input
                        type="time"
                        {...field}
                        className="bg-gray-800 border-gray-600 text-white"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="planned_hours"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-300">Horas Planificadas</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="2"
                        {...field}
                        className="bg-gray-800 border-gray-600 text-white"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="work_type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-300">Tipo de Trabajo</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                          <SelectValue placeholder="Selecciona el tipo" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="NORMAL">Normal</SelectItem>
                        <SelectItem value="OVERTIME">Horas Extra</SelectItem>
                        <SelectItem value="HOLIDAY">Festivo</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Footer - Dentro del form para que el submit funcione */}
              <div className="flex gap-3 pt-4 border-t border-gray-700">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={onClose}
                  className="flex-1 text-gray-300 hover:text-white hover:bg-gray-800"
                  disabled={updateSessionMutation.isPending}
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  className="flex-1 bg-teal-500 hover:bg-teal-600 text-black font-semibold"
                  disabled={updateSessionMutation.isPending}
                >
                  {updateSessionMutation.isPending ? 'Guardando...' : 'Guardar'}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default EditWorkSessionForm;
