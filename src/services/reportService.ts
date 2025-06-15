
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
}

export const reportService = {
  async getMonthlyReport(month: number, year: number, token: string): Promise<MonthlyReportData> {
    try {
      console.log('Fetching monthly report for:', { month, year });
      return await apiClient.getWithAuth<MonthlyReportData>(`/api/monthly_report?month=${month}&year=${year}`, token);
    } catch (error: any) {
      console.error('Monthly report fetch error:', error);
      throw error;
    }
  }
};
