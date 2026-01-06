
export type Role = 'employee' | 'manager';

export interface User {
  id: string;
  name: string;
  role: Role;
  holidayBalance: number;
  extraHoursWallet: number;
  sickDaysTaken: number;
}

export type RequestStatus = 'pending' | 'approved' | 'declined';

export type RequestType = 'holiday' | 'extra-hours-usage' | 'extra-hours-earning' | 'sick-leave' | 'not-justified';

export interface TimeRequest {
  id: string;
  userId: string;
  userName: string;
  type: RequestType;
  startDate: string;
  endDate: string;
  hours?: number;
  status: RequestStatus;
  reason?: string;
  createdAt: string;
}

export interface AttendanceRecord {
  id: string;
  userId: string;
  date: string;
  checkIn?: string;
  checkOut?: string;
}
