
import React from 'react';
import { AttendanceRecord } from '../types';

interface AttendanceTrackerProps {
  records: AttendanceRecord[];
  onCheckIn: () => void;
  onCheckOut: () => void;
}

const AttendanceTracker: React.FC<AttendanceTrackerProps> = ({ records, onCheckIn, onCheckOut }) => {
  const sortedRecords = [...records].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-4 no-print">
        <h2 className="text-2xl font-bold text-slate-800">Attendance Log</h2>
        <button 
          onClick={handlePrint}
          className="flex items-center gap-2 bg-white border border-slate-200 px-4 py-2 rounded-xl text-sm font-semibold hover:bg-slate-50 transition-all shadow-sm"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" /></svg>
          Print Weekly Report
        </button>
      </div>

      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden card">
        <div className="p-6 border-b border-slate-50 flex justify-between items-center bg-slate-50/50">
          <div>
            <h3 className="font-bold text-slate-900">Weekly Summary</h3>
            <p className="text-xs text-slate-500">Official log for signature</p>
          </div>
          <div className="text-right print-only hidden">
            <div className="mt-8 border-t-2 border-slate-900 w-48 text-center pt-2 font-bold">Employee Signature</div>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-white text-slate-400">
              <tr>
                <th className="px-6 py-4 font-bold uppercase text-[10px]">Date</th>
                <th className="px-6 py-4 font-bold uppercase text-[10px]">Check In</th>
                <th className="px-6 py-4 font-bold uppercase text-[10px]">Check Out</th>
                <th className="px-6 py-4 font-bold uppercase text-[10px]">Total Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {sortedRecords.map(rec => {
                let diff = '-';
                if (rec.checkIn && rec.checkOut) {
                  const [h1, m1] = rec.checkIn.split(':').map(Number);
                  const [h2, m2] = rec.checkOut.split(':').map(Number);
                  const totalMinutes = (h2 * 60 + m2) - (h1 * 60 + m1);
                  diff = `${Math.floor(totalMinutes / 60)}h ${totalMinutes % 60}m`;
                }
                return (
                  <tr key={rec.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 font-medium text-slate-900">{rec.date}</td>
                    <td className="px-6 py-4">
                      <span className="text-emerald-600 font-semibold">{rec.checkIn || '--:--'}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-rose-600 font-semibold">{rec.checkOut || '--:--'}</span>
                    </td>
                    <td className="px-6 py-4 text-slate-500 font-bold">{diff}</td>
                  </tr>
                );
              })}
              {sortedRecords.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-slate-400">No records found for this period.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="print-only hidden mt-12">
        <div className="flex justify-between items-end gap-20">
          <div className="flex-1 border-t-2 border-slate-900 pt-2 text-center text-sm font-bold">Employee Name & Date</div>
          <div className="flex-1 border-t-2 border-slate-900 pt-2 text-center text-sm font-bold">Manager Approval</div>
        </div>
      </div>
    </div>
  );
};

export default AttendanceTracker;
