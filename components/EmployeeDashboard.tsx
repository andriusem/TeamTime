
import React, { useState } from 'react';
import { User, TimeRequest, AttendanceRecord, RequestType } from '../types';
import RequestForm from './RequestForm';
import AttendanceTracker from './AttendanceTracker';

interface EmployeeDashboardProps {
  user: User;
  requests: TimeRequest[];
  attendance: AttendanceRecord[];
  activeTab: 'dashboard' | 'attendance' | 'requests';
  onSubmitRequest: (req: any) => void;
  onCheckIn: () => void;
  onCheckOut: () => void;
}

const EmployeeDashboard: React.FC<EmployeeDashboardProps> = ({ 
  user, 
  requests, 
  attendance, 
  activeTab,
  onSubmitRequest,
  onCheckIn,
  onCheckOut
}) => {
  const [showForm, setShowForm] = useState(false);
  const [selectedRequestType, setSelectedRequestType] = useState<RequestType>('holiday');

  const openRequest = (type: RequestType) => {
    setSelectedRequestType(type);
    setShowForm(true);
  };

  const renderDashboard = () => (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
      {/* Wallet / Balance Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Holidays Left</span>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-3xl font-bold text-blue-600">{user.holidayBalance}</span>
            <span className="text-sm text-slate-500">Days</span>
          </div>
          <button onClick={() => openRequest('holiday')} className="mt-4 text-xs font-medium text-blue-600 bg-blue-50 py-1.5 px-3 rounded-lg hover:bg-blue-100 transition-colors w-fit">Book Now</button>
        </div>
        
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Extra Wallet</span>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-3xl font-bold text-emerald-600">{user.extraHoursWallet}</span>
            <span className="text-sm text-slate-500">Hours</span>
          </div>
          <button onClick={() => openRequest('extra-hours-earning')} className="mt-4 text-xs font-medium text-emerald-600 bg-emerald-50 py-1.5 px-3 rounded-lg hover:bg-emerald-100 transition-colors w-fit">Add Hours</button>
        </div>

        <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Sick Days</span>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-3xl font-bold text-amber-600">{user.sickDaysTaken}</span>
            <span className="text-sm text-slate-500">Total</span>
          </div>
          <button onClick={() => openRequest('sick-leave')} className="mt-4 text-xs font-medium text-amber-600 bg-amber-50 py-1.5 px-3 rounded-lg hover:bg-amber-100 transition-colors w-fit">Report Sick</button>
        </div>

        <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Unjustified</span>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-3xl font-bold text-rose-600">0</span>
            <span className="text-sm text-slate-500">Days</span>
          </div>
          <button onClick={() => openRequest('not-justified')} className="mt-4 text-xs font-medium text-rose-600 bg-rose-50 py-1.5 px-3 rounded-lg hover:bg-rose-100 transition-colors w-fit">Explain</button>
        </div>
      </div>

      {/* Quick Check-in/out */}
      <div className="bg-slate-900 text-white p-6 rounded-3xl shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="text-xl font-bold">Good Morning, {user.name.split(' ')[0]}!</h3>
          <p className="text-slate-400 text-sm">Don't forget to track your arrival today.</p>
        </div>
        <div className="flex gap-4">
          <button onClick={onCheckIn} className="bg-white text-slate-900 px-6 py-3 rounded-2xl font-bold text-sm shadow-sm hover:bg-slate-100 transition-all flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-emerald-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
            </svg>
            Check In
          </button>
          <button onClick={onCheckOut} className="bg-slate-800 text-white border border-slate-700 px-6 py-3 rounded-2xl font-bold text-sm shadow-sm hover:bg-slate-700 transition-all flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-rose-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
            </svg>
            Check Out
          </button>
        </div>
      </div>

      {/* Recent Requests Preview */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-bold text-slate-800">Your Recent Requests</h4>
          <button onClick={() => setShowForm(true)} className="text-sm font-semibold text-blue-600">View All</button>
        </div>
        <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm">
          {requests.slice(0, 3).map((req, idx) => (
            <div key={req.id} className={`p-4 flex items-center justify-between ${idx !== requests.length - 1 ? 'border-b border-slate-50' : ''}`}>
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  req.type === 'holiday' ? 'bg-blue-100 text-blue-600' : 
                  req.type === 'sick-leave' ? 'bg-amber-100 text-amber-600' :
                  'bg-emerald-100 text-emerald-600'
                }`}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-sm text-slate-900 capitalize">{req.type.replace('-', ' ')}</p>
                  <p className="text-xs text-slate-500">{req.startDate} to {req.endDate}</p>
                </div>
              </div>
              <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full ${
                req.status === 'approved' ? 'bg-emerald-100 text-emerald-700' :
                req.status === 'declined' ? 'bg-rose-100 text-rose-700' :
                'bg-slate-100 text-slate-600'
              }`}>
                {req.status}
              </span>
            </div>
          ))}
          {requests.length === 0 && <p className="p-8 text-center text-slate-400 text-sm">No recent requests.</p>}
        </div>
      </section>
    </div>
  );

  return (
    <div className="pb-10">
      {activeTab === 'dashboard' && renderDashboard()}
      {activeTab === 'attendance' && <AttendanceTracker records={attendance} onCheckIn={onCheckIn} onCheckOut={onCheckOut} />}
      {activeTab === 'requests' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-slate-800">Requests History</h2>
            <button 
              onClick={() => openRequest('holiday')}
              className="bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-semibold shadow-sm hover:bg-blue-700 transition-all"
            >
              New Request
            </button>
          </div>
          <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 text-slate-500">
                  <tr>
                    <th className="px-6 py-4 font-semibold uppercase tracking-wider text-[10px]">Type</th>
                    <th className="px-6 py-4 font-semibold uppercase tracking-wider text-[10px]">Dates</th>
                    <th className="px-6 py-4 font-semibold uppercase tracking-wider text-[10px]">Status</th>
                    <th className="px-6 py-4 font-semibold uppercase tracking-wider text-[10px]">Reason</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {requests.map(req => (
                    <tr key={req.id}>
                      <td className="px-6 py-4 font-medium text-slate-900 capitalize">{req.type.replace('-', ' ')}</td>
                      <td className="px-6 py-4 text-slate-600">{req.startDate} - {req.endDate}</td>
                      <td className="px-6 py-4">
                        <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full ${
                          req.status === 'approved' ? 'bg-emerald-100 text-emerald-700' :
                          req.status === 'declined' ? 'bg-rose-100 text-rose-700' :
                          'bg-slate-100 text-slate-600'
                        }`}>
                          {req.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-slate-500 italic">{req.reason || '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Request Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
             <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-slate-800">Submit New Request</h3>
                  <button onClick={() => setShowForm(false)} className="p-2 text-slate-400 hover:text-slate-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                  </button>
                </div>
                <RequestForm 
                  initialType={selectedRequestType}
                  onCancel={() => setShowForm(false)}
                  onSubmit={(data) => {
                    onSubmitRequest({ ...data, userId: user.id });
                    setShowForm(false);
                  }}
                />
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeDashboard;
