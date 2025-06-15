
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Euro, TrendingUp } from 'lucide-react';
import { SalaryData } from '@/services/reportService';

interface SalaryInfoProps {
  salary: SalaryData;
  hasData?: boolean;
}

const SalaryInfo = ({ salary, hasData = true }: SalaryInfoProps) => {
  return (
    <Card className="bg-gray-900/50 border-gray-700">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white">
          <Euro className="h-5 w-5 text-teal-400" />
          Información Salarial
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className={`flex justify-between items-center p-3 rounded-lg ${
              hasData ? 'bg-gray-800/50' : 'bg-gray-800/30'
            }`}>
              <span className="text-gray-400">Salario Bruto</span>
              <span className={`font-semibold ${hasData ? 'text-white' : 'text-gray-500'}`}>
                €{salary.total_gross_salary}
              </span>
            </div>
            <div className={`flex justify-between items-center p-3 rounded-lg ${
              hasData ? 'bg-gray-800/50' : 'bg-gray-800/30'
            }`}>
              <span className="text-gray-400">Salario Neto</span>
              <span className={`font-semibold ${hasData ? 'text-green-400' : 'text-gray-500'}`}>
                €{salary.total_net_salary}
              </span>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Horas Normales:</span>
              <span className={hasData ? 'text-white' : 'text-gray-500'}>
                {salary.total_normal_hours}h
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Horas Extra:</span>
              <span className={hasData ? 'text-white' : 'text-gray-500'}>
                {salary.total_overtime_hours}h
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Horas Festivas:</span>
              <span className={hasData ? 'text-white' : 'text-gray-500'}>
                {salary.total_holiday_hours}h
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Horas Nocturnas:</span>
              <span className={hasData ? 'text-white' : 'text-gray-500'}>
                {salary.total_night_hours}h
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SalaryInfo;
