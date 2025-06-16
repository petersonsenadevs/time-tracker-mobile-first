
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { DollarSign, Clock, CalendarDays, Moon } from 'lucide-react';
import { Employee } from '@/services/userService';

interface SalaryInfoCardProps {
  employee: Employee | undefined;
  isLoadingEmployee: boolean;
}

const SalaryInfoCard = ({ employee, isLoadingEmployee }: SalaryInfoCardProps) => {
  return (
    <Card className="bg-gray-900/50 border-gray-700 h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white">
          <DollarSign className="h-5 w-5 text-teal-400" />
          Información Salarial
        </CardTitle>
        <CardDescription className="text-gray-400">
          Tarifas por hora y detalles de compensación
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {isLoadingEmployee ? (
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-400 mx-auto mb-2"></div>
            <p className="text-gray-400">Cargando información salarial...</p>
          </div>
        ) : employee ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-4 bg-gray-800/50 rounded-lg">
                <Clock className="h-6 w-6 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-400">Tarifa Normal por Hora</p>
                  <p className="text-white font-bold text-xl">€{employee.normal_hourly_rate}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-4 bg-gray-800/50 rounded-lg">
                <Clock className="h-6 w-6 text-orange-400" />
                <div>
                  <p className="text-sm text-gray-400">Tarifa de Horas Extra</p>
                  <p className="text-white font-bold text-xl">€{employee.overtime_hourly_rate}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-gray-800/50 rounded-lg">
                <CalendarDays className="h-6 w-6 text-green-400" />
                <div>
                  <p className="text-sm text-gray-400">Tarifa de Días Festivos</p>
                  <p className="text-white font-bold text-xl">€{employee.holiday_hourly_rate}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-gray-800/50 rounded-lg">
                <Moon className="h-6 w-6 text-purple-400" />
                <div>
                  <p className="text-sm text-gray-400">Tarifa de Horas Nocturnas</p>
                  <p className="text-white font-bold text-xl">€{(employee as any).night_hourly_rate || employee.normal_hourly_rate}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-gray-800/50 rounded-lg">
                <DollarSign className="h-6 w-6 text-red-400" />
                <div>
                  <p className="text-sm text-gray-400">IRPF (%)</p>
                  <p className="text-white font-bold text-xl">{employee.irpf}%</p>
                </div>
              </div>
            </div>

           {/*  <div className="mt-6 p-4 bg-teal-500/10 border border-teal-500/20 rounded-lg">
              <h3 className="text-white font-semibold mb-2">Resumen de Tarifas</h3>
              <div className="text-sm text-gray-300 space-y-1">
                <p>• Horario normal: Lunes a Viernes, 8:00 AM - 6:00 PM</p>
                <p>• Horas extra: Después de 8 horas diarias o fines de semana</p>
                <p>• Horas nocturnas: Entre 10:00 PM y 6:00 AM</p>
                <p>• Días festivos: Días oficiales no laborables</p>
              </div>
            </div> */}
          </>
        ) : (
          <div className="text-center text-red-400">
            Error al cargar la información salarial
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SalaryInfoCard;
