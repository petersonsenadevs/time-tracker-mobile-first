
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Clock } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export type WorkDayFormData = {
  date: string;
  startTime: string;
  endTime: string;
  plannedHours: string;
  workType?: string;
};

interface WorkDayFormFieldsProps {
  form: UseFormReturn<WorkDayFormData>;
}

const WorkDayFormFields = ({ form }: WorkDayFormFieldsProps) => {
  return (
    <div className="space-y-3 sm:space-y-4">
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
    </div>
  );
};

export default WorkDayFormFields;
