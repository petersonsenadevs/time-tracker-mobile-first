
import { Control } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

interface RatesConfigStepProps {
  control: Control<any>;
  isLoading: boolean;
}

const RatesConfigStep = ({ control, isLoading }: RatesConfigStepProps) => {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-white mb-4">Tarifas por Hora</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={control}
          name="normal_hourly_rate"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-300">Tarifa Normal (€/h) *</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="15.00"
                  className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-teal-400"
                  disabled={isLoading}
                />
              </FormControl>
              <FormMessage className="text-red-400" />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="overtime_hourly_rate"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-300">Tarifa Extra (€/h) *</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="22.50"
                  className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-teal-400"
                  disabled={isLoading}
                />
              </FormControl>
              <FormMessage className="text-red-400" />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="night_hourly_rate"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-300">Tarifa Nocturna (€/h) *</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="18.00"
                  className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-teal-400"
                  disabled={isLoading}
                />
              </FormControl>
              <FormMessage className="text-red-400" />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="holiday_hourly_rate"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-300">Tarifa Festivos (€/h) *</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="30.00"
                  className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-teal-400"
                  disabled={isLoading}
                />
              </FormControl>
              <FormMessage className="text-red-400" />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={control}
        name="irpf"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-gray-300">IRPF (%)</FormLabel>
            <FormControl>
              <Input
                {...field}
                placeholder="15.00"
                className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-teal-400 max-w-xs"
                disabled={isLoading}
              />
            </FormControl>
            <FormMessage className="text-red-400" />
          </FormItem>
        )}
      />
    </div>
  );
};

export default RatesConfigStep;
