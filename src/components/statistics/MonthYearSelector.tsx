
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, Search } from 'lucide-react';

interface MonthYearSelectorProps {
  selectedMonth: number;
  selectedYear: number;
  onMonthYearChange: (month: number, year: number) => void;
  isLoading?: boolean;
}

const months = [
  { value: 1, label: 'Enero' },
  { value: 2, label: 'Febrero' },
  { value: 3, label: 'Marzo' },
  { value: 4, label: 'Abril' },
  { value: 5, label: 'Mayo' },
  { value: 6, label: 'Junio' },
  { value: 7, label: 'Julio' },
  { value: 8, label: 'Agosto' },
  { value: 9, label: 'Septiembre' },
  { value: 10, label: 'Octubre' },
  { value: 11, label: 'Noviembre' },
  { value: 12, label: 'Diciembre' },
];

const MonthYearSelector = ({ selectedMonth, selectedYear, onMonthYearChange, isLoading }: MonthYearSelectorProps) => {
  const [tempMonth, setTempMonth] = useState(selectedMonth);
  const [tempYear, setTempYear] = useState(selectedYear);
  
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 5 }, (_, i) => currentYear - 2 + i);

  const handleSearch = () => {
    onMonthYearChange(tempMonth, tempYear);
  };

  const hasChanges = tempMonth !== selectedMonth || tempYear !== selectedYear;

  return (
    <Card className="bg-gray-900/50 border-gray-700">
      <CardContent className="p-4">
        <div className="flex items-center gap-3 mb-4">
          <Calendar className="h-5 w-5 text-teal-400" />
          <h3 className="text-white font-medium">Seleccionar Período</h3>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-gray-400 text-sm mb-2">Mes</label>
            <Select value={tempMonth.toString()} onValueChange={(value) => setTempMonth(parseInt(value))}>
              <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-600">
                {months.map((month) => (
                  <SelectItem key={month.value} value={month.value.toString()} className="text-white hover:bg-gray-700">
                    {month.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-gray-400 text-sm mb-2">Año</label>
            <Select value={tempYear.toString()} onValueChange={(value) => setTempYear(parseInt(value))}>
              <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-600">
                {years.map((year) => (
                  <SelectItem key={year} value={year.toString()} className="text-white hover:bg-gray-700">
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button 
          onClick={handleSearch}
          disabled={!hasChanges || isLoading}
          className="w-full bg-teal-600 hover:bg-teal-700 text-white"
        >
          <Search className="h-4 w-4 mr-2" />
          {isLoading ? 'Buscando...' : 'Buscar Reporte'}
        </Button>
      </CardContent>
    </Card>
  );
};

export default MonthYearSelector;
