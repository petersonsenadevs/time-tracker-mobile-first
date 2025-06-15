
import { apiClient } from './api';

export interface HourData {
  hours: number;
  minutes: number;
}

export interface DayReport {
  date: string;
  normal_hours: HourData;
  overtime_hours: HourData;
  holiday_hours: HourData;
  night_hours: HourData;
}

export interface DecimalTotals {
  normalHours: number;
  overtimeHours: number;
  holidayHours: number;
  nightHours: number;
  totalHours: number;
}

export interface SalaryData {
  total_normal_hours: string;
  total_overtime_hours: string;
  total_night_hours: string;
  total_holiday_hours: string;
  total_gross_salary: string;
  total_net_salary: string;
}

export interface MonthlyReportData {
  month: number;
  year: number;
  hourWorkedData: Record<string, DayReport>;
  totalNormalHours: HourData;
  totalOvertimeHours: HourData;
  totalNightHours: HourData;
  totalHolidayHours: HourData;
  totalHours: HourData;
  decimalTotals: DecimalTotals;
  salary: SalaryData;
  hasData: boolean;
}

const createEmptyReport = (month: number, year: number): MonthlyReportData => ({
  month,
  year,
  hourWorkedData: {},
  totalNormalHours: { hours: 0, minutes: 0 },
  totalOvertimeHours: { hours: 0, minutes: 0 },
  totalNightHours: { hours: 0, minutes: 0 },
  totalHolidayHours: { hours: 0, minutes: 0 },
  totalHours: { hours: 0, minutes: 0 },
  decimalTotals: {
    normalHours: 0,
    overtimeHours: 0,
    holidayHours: 0,
    nightHours: 0,
    totalHours: 0
  },
  salary: {
    total_normal_hours: "0.00",
    total_overtime_hours: "0.00",
    total_night_hours: "0.00",
    total_holiday_hours: "0.00",
    total_gross_salary: "0.00",
    total_net_salary: "0.00"
  },
  hasData: false
});

export const reportService = {
  async getMonthlyReport(month: number, year: number, token: string): Promise<MonthlyReportData> {
    try {
      console.log('Fetching monthly report for:', { month, year });
      const data = await apiClient.getWithAuth<MonthlyReportData>(`/api/monthly_report?month=${month}&year=${year}`, token);
      return { ...data, hasData: true };
    } catch (error: any) {
      console.error('Monthly report fetch error:', error);
      
      // Si es un 404, devolver datos vacíos en lugar de fallar
      if (error.message?.includes('404') || error.message?.includes('Not Found')) {
        console.log('No data found for this period, returning empty report');
        return createEmptyReport(month, year);
      }
      
      throw error;
    }
  }
};
