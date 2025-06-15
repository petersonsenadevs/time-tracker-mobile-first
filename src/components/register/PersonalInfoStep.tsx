
import { Control } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

interface PersonalInfoStepProps {
  control: Control<any>;
  isLoading: boolean;
}

const PersonalInfoStep = ({ control, isLoading }: PersonalInfoStepProps) => {
  return (
    <div className="space-y-4 sm:space-y-6">
      <h3 className="text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">Información Personal</h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        <FormField
          control={control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-300 text-sm">Nombre *</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Tu nombre completo"
                  className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-teal-400 h-9 sm:h-10"
                  disabled={isLoading}
                />
              </FormControl>
              <FormMessage className="text-red-400 text-xs" />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="company_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-300 text-sm">Empresa</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Nombre de tu empresa"
                  className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-teal-400 h-9 sm:h-10"
                  disabled={isLoading}
                />
              </FormControl>
              <FormMessage className="text-red-400 text-xs" />
            </FormItem>
          )}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        <FormField
          control={control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-300 text-sm">Email *</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="email"
                  placeholder="tu@email.com"
                  className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-teal-400 h-9 sm:h-10"
                  disabled={isLoading}
                />
              </FormControl>
              <FormMessage className="text-red-400 text-xs" />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-300 text-sm">Contraseña *</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="password"
                  placeholder="••••••••"
                  className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-teal-400 h-9 sm:h-10"
                  disabled={isLoading}
                />
              </FormControl>
              <FormMessage className="text-red-400 text-xs" />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default PersonalInfoStep;
