
import { User, TimeRequest, AttendanceRecord } from '../types';

export const INITIAL_USERS: User[] = [
  { id: '1', name: 'John Doe', role: 'employee', holidayBalance: 20, extraHoursWallet: 8, sickDaysTaken: 2 },
  { id: '2', name: 'Jane Smith', role: 'employee', holidayBalance: 15, extraHoursWallet: 2, sickDaysTaken: 0 },
  { id: '3', name: 'Admin Boss', role: 'manager', holidayBalance: 25, extraHoursWallet: 0, sickDaysTaken: 0 },
];

export const INITIAL_REQUESTS: TimeRequest[] = [
  {
    id: 'req1',
    userId: '1',
    userName: 'John Doe',
    type: 'holiday',
    startDate: '2024-06-10',
    endDate: '2024-06-14',
    status: 'approved',
    reason: 'Family trip',
    createdAt: '2024-05-01T10:00:00Z',
  },
  {
    id: 'req2',
    userId: '2',
    userName: 'Jane Smith',
    type: 'extra-hours-usage',
    startDate: '2024-05-20',
    endDate: '2024-05-20',
    hours: 4,
    status: 'pending',
    reason: 'Doctor appointment',
    createdAt: '2024-05-18T09:30:00Z',
  },
];

export const INITIAL_ATTENDANCE: AttendanceRecord[] = [
  { id: 'att1', userId: '1', date: '2024-05-20', checkIn: '08:55', checkOut: '17:05' },
  { id: 'att2', userId: '1', date: '2024-05-21', checkIn: '09:02', checkOut: '18:15' },
];
