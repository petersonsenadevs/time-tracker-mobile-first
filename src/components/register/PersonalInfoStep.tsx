
import { Control } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

interface PersonalInfoStepProps {
  control: Control<any>;
  isLoading: boolean;
}

const PersonalInfoStep = ({ control, isLoading }: PersonalInfoStepProps) => {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-white mb-4">Información Personal</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-300">Nombre *</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Tu nombre completo"
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
          name="company_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-300">Empresa</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Nombre de tu empresa"
                  className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-teal-400"
                  disabled={isLoading}
                />
              </FormControl>
              <FormMessage className="text-red-400" />
            </FormItem>
          )}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-300">Email *</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="email"
                  placeholder="tu@email.com"
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
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-300">Contraseña *</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="password"
                  placeholder="••••••••"
                  className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-teal-400"
                  disabled={isLoading}
                />
              </FormControl>
              <FormMessage className="text-red-400" />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default PersonalInfoStep;
