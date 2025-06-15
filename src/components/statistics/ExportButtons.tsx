
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { FileText, Download } from 'lucide-react';
import { exportService } from '@/services/exportService';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

interface ExportButtonsProps {
  selectedMonth: number;
  selectedYear: number;
  hasData: boolean;
}

const ExportButtons = ({ selectedMonth, selectedYear, hasData }: ExportButtonsProps) => {
  const { token } = useAuth();
  const [sendEmail, setSendEmail] = useState(false);
  const [isExporting, setIsExporting] = useState<'pdf' | 'csv' | null>(null);

  const downloadFile = (blob: Blob, filename: string) => {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  const handleExportPDF = async () => {
    if (!token) {
      toast.error('No hay sesión activa');
      return;
    }

    setIsExporting('pdf');
    try {
      const blob = await exportService.exportToPDF(selectedMonth, selectedYear, sendEmail, token);
      
      if (sendEmail) {
        toast.success('Reporte PDF enviado por email exitosamente');
      } else {
        const filename = `reporte_${selectedMonth}_${selectedYear}.pdf`;
        downloadFile(blob, filename);
        toast.success('Reporte PDF descargado exitosamente');
      }
    } catch (error: any) {
      toast.error(`Error al exportar PDF: ${error.message}`);
    } finally {
      setIsExporting(null);
    }
  };

  const handleExportCSV = async () => {
    if (!token) {
      toast.error('No hay sesión activa');
      return;
    }

    setIsExporting('csv');
    try {
      const blob = await exportService.exportToCSV(selectedMonth, selectedYear, sendEmail, token);
      
      if (sendEmail) {
        toast.success('Reporte CSV enviado por email exitosamente');
      } else {
        const filename = `reporte_${selectedMonth}_${selectedYear}.csv`;
        downloadFile(blob, filename);
        toast.success('Reporte CSV descargado exitosamente');
      }
    } catch (error: any) {
      toast.error(`Error al exportar CSV: ${error.message}`);
    } finally {
      setIsExporting(null);
    }
  };

  const monthNames = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  return (
    <Card className="bg-gray-900/50 border-gray-700">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white">
          <Download className="h-5 w-5 text-teal-400" />
          Exportar Reporte
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="sendEmail" 
            checked={sendEmail} 
            onCheckedChange={(checked) => setSendEmail(checked as boolean)}
            className="border-gray-600 data-[state=checked]:bg-teal-600"
          />
          <label 
            htmlFor="sendEmail" 
            className="text-sm text-gray-300 cursor-pointer"
          >
            Enviar por email
          </label>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Button
            onClick={handleExportPDF}
            disabled={!hasData || isExporting === 'pdf'}
            variant="outline"
            className={`border-red-600 hover:bg-red-600/10 ${
              hasData ? 'text-red-400 hover:text-red-300' : 'text-gray-500 border-gray-600'
            }`}
          >
            <FileText className="h-4 w-4 mr-2" />
            {isExporting === 'pdf' ? 'Exportando...' : 'PDF'}
          </Button>

          <Button
            onClick={handleExportCSV}
            disabled={!hasData || isExporting === 'csv'}
            variant="outline"
            className={`border-green-600 hover:bg-green-600/10 ${
              hasData ? 'text-green-400 hover:text-green-300' : 'text-gray-500 border-gray-600'
            }`}
          >
            <FileText className="h-4 w-4 mr-2" />
            {isExporting === 'csv' ? 'Exportando...' : 'CSV'}
          </Button>
        </div>

        {!hasData && (
          <p className="text-gray-400 text-sm text-center">
            No hay datos disponibles para exportar en {monthNames[selectedMonth - 1]} de {selectedYear}
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default ExportButtons;
