
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { X, Clock, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';

const workDaySchema = z.object({
  startTime: z.string().min(1, 'Hora de inicio es requerida'),
  endTime: z.string().min(1, 'Hora de fin es requerida'),
  breakTime: z.string().optional(),
  location: z.string().optional(),
  description: z.string().optional(),
});

type WorkDayFormData = z.infer<typeof workDaySchema>;

interface WorkDayFormProps {
  selectedDate: Date;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: WorkDayFormData) => void;
}

const WorkDayForm = ({ selectedDate, isOpen, onClose, onSubmit }: WorkDayFormProps) => {
  const form = useForm<WorkDayFormData>({
    resolver: zodResolver(workDaySchema),
    defaultValues: {
      startTime: '',
      endTime: '',
      breakTime: '',
      location: '',
      description: '',
    },
  });

  const handleSubmit = (data: WorkDayFormData) => {
    onSubmit(data);
    form.reset();
    onClose();
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
                name="breakTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-300">Tiempo de Descanso (minutos)</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="number"
                        placeholder="0"
                        className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-teal-400"
                      />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-300 flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      Ubicación
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Oficina, cliente, remoto..."
                        className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-teal-400"
                      />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-300">Descripción</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Descripción de las actividades realizadas..."
                        rows={3}
                        className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-teal-400 resize-none"
                      />
                    </FormControl>
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
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  className="flex-1 bg-teal-500 hover:bg-teal-600 text-black font-semibold"
                >
                  Guardar Jornada
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
