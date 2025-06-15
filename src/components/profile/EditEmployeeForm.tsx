
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { User, Building, DollarSign, Save, X } from 'lucide-react';
import { Employee } from '@/services/userService';

interface EditEmployeeFormProps {
  employee: Employee;
  onSave: (data: any) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

const EditEmployeeForm = ({ employee, onSave, onCancel, isLoading = false }: EditEmployeeFormProps) => {
  const [formData, setFormData] = useState({
    name: employee.name || '',
    company_name: employee.company_name || '',
    normal_hourly_rate: employee.normal_hourly_rate || '',
    overtime_hourly_rate: employee.overtime_hourly_rate || '',
    night_hourly_rate: employee.night_hourly_rate || '',
    holiday_hourly_rate: employee.holiday_hourly_rate || '',
    irpf: employee.irpf || 0
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Card className="bg-gray-900/50 border-gray-700 h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white">
          <User className="h-5 w-5 text-teal-400" />
          Editar Información Personal
        </CardTitle>
        <CardDescription>
          Actualiza tus datos personales y salariales
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name" className="text-gray-300">Nombre Completo</Label>
            <Input
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              maxLength={55}
              className="bg-gray-800 border-gray-600 text-white"
              placeholder="Tu nombre completo"
            />
          </div>

          <div>
            <Label htmlFor="company_name" className="text-gray-300">Empresa</Label>
            <Input
              id="company_name"
              type="text"
              value={formData.company_name}
              onChange={(e) => handleChange('company_name', e.target.value)}
              maxLength={95}
              className="bg-gray-800 border-gray-600 text-white"
              placeholder="Nombre de la empresa"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="normal_rate" className="text-gray-300">Tarifa Normal (€/h)</Label>
              <Input
                id="normal_rate"
                type="number"
                step="0.01"
                min="0"
                max="999999.99"
                value={formData.normal_hourly_rate}
                onChange={(e) => handleChange('normal_hourly_rate', e.target.value)}
                className="bg-gray-800 border-gray-600 text-white"
                placeholder="10.40"
              />
            </div>

            <div>
              <Label htmlFor="overtime_rate" className="text-gray-300">Tarifa Horas Extra (€/h)</Label>
              <Input
                id="overtime_rate"
                type="number"
                step="0.01"
                min="0"
                max="999999.99"
                value={formData.overtime_hourly_rate}
                onChange={(e) => handleChange('overtime_hourly_rate', e.target.value)}
                className="bg-gray-800 border-gray-600 text-white"
                placeholder="15.60"
              />
            </div>

            <div>
              <Label htmlFor="night_rate" className="text-gray-300">Tarifa Nocturna (€/h)</Label>
              <Input
                id="night_rate"
                type="number"
                step="0.01"
                min="0"
                max="999999.99"
                value={formData.night_hourly_rate}
                onChange={(e) => handleChange('night_hourly_rate', e.target.value)}
                className="bg-gray-800 border-gray-600 text-white"
                placeholder="12.50"
              />
            </div>

            <div>
              <Label htmlFor="holiday_rate" className="text-gray-300">Tarifa Días Festivos (€/h)</Label>
              <Input
                id="holiday_rate"
                type="number"
                step="0.01"
                min="0"
                max="999999.99"
                value={formData.holiday_hourly_rate}
                onChange={(e) => handleChange('holiday_hourly_rate', e.target.value)}
                className="bg-gray-800 border-gray-600 text-white"
                placeholder="20.80"
              />
            </div>

            <div className="md:col-span-2">
              <Label htmlFor="irpf" className="text-gray-300">IRPF (%)</Label>
              <Input
                id="irpf"
                type="number"
                step="0.01"
                min="0"
                max="99.99"
                value={formData.irpf}
                onChange={(e) => handleChange('irpf', parseFloat(e.target.value) || 0)}
                className="bg-gray-800 border-gray-600 text-white"
                placeholder="15.00"
              />
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button 
              type="submit" 
              disabled={isLoading}
              className="flex-1 bg-teal-500 hover:bg-teal-600 text-black"
            >
              <Save className="h-4 w-4 mr-2" />
              {isLoading ? 'Guardando...' : 'Guardar Cambios'}
            </Button>
            <Button 
              type="button" 
              variant="outline"
              onClick={onCancel}
              disabled={isLoading}
              className="border-gray-600 text-gray-300 hover:bg-gray-800"
            >
              <X className="h-4 w-4 mr-2" />
              Cancelar
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default EditEmployeeForm;
