
import { apiClient } from './api';

export interface ExportParams {
  month: number;
  year: number;
  sendEmail: boolean;
}

export const exportService = {
  async exportToPDF(month: number, year: number, sendEmail: boolean, token: string): Promise<Blob> {
    try {
      console.log('Exporting to PDF:', { month, year, sendEmail });
      const response = await fetch(`${apiClient['baseURL']}/api/export/pdf?month=${month}&year=${year}&sendEmail=${sendEmail}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      return response.blob();
    } catch (error: any) {
      console.error('PDF export error:', error);
      throw error;
    }
  },

  async exportToCSV(month: number, year: number, sendEmail: boolean, token: string): Promise<Blob> {
    try {
      console.log('Exporting to CSV:', { month, year, sendEmail });
      const response = await fetch(`${apiClient['baseURL']}/api/export/csv?month=${month}&year=${year}&sendEmail=${sendEmail}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      return response.blob();
    } catch (error: any) {
      console.error('CSV export error:', error);
      throw error;
    }
  }
};
