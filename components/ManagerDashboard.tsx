
import React, { useState } from 'react';
import { User, TimeRequest, AttendanceRecord } from '../types';
import AttendanceTracker from './AttendanceTracker';

interface ManagerDashboardProps {
  users: User[];
  requests: TimeRequest[];
  attendance: AttendanceRecord[];
  activeTab: 'dashboard' | 'attendance' | 'requests';
  onUpdateStatus: (requestId: string, status: 'approved' | 'declined') => void;
}

const ManagerDashboard: React.FC<ManagerDashboardProps> = ({ users, requests, attendance, activeTab, onUpdateStatus }) => {
  const [selectedUserId, setSelectedUserId] = useState<string | 'all'>('all');
  const [viewMode, setViewMode] = useState<'pending' | 'overview'>('pending');
  const [attendanceSubjectId, setAttendanceSubjectId] = useState<string>(users.find(u => u.role === 'employee')?.id || '');

  const pendingRequests = requests.filter(r => r.status === 'pending');
  const filteredUsers = selectedUserId === 'all' ? users.filter(u => u.role === 'employee') : users.filter(u => u.id === selectedUserId);

  const totalEmployees = users.filter(u => u.role === 'employee').length;
  const today = new Date().toISOString().split('T')[0];
  const presentTodayCount = attendance.filter(a => a.date === today).length;

  const renderDashboard = () => (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Stats Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2">Staff Present Today</p>
          <div className="flex items-center justify-between">
            <span className="text-4xl font-black text-blue-600">{presentTodayCount} / {totalEmployees}</span>
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center">
               <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 20 20" fill="currentColor"><path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3.005 3.005 0 013.75-2.906z" /></svg>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2">Pending Requests</p>
          <div className="flex items-center justify-between">
            <span className="text-4xl font-black text-amber-600">{pendingRequests.length}</span>
            <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-full flex items-center justify-center">
               <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" /></svg>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2">Upcoming Holidays</p>
          <div className="flex items-center justify-between">
            <span className="text-4xl font-black text-indigo-600">{requests.filter(r => r.type === 'holiday' && r.status === 'approved' && new Date(r.startDate) >= new Date()).length}</span>
            <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center">
               <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" /></svg>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-4 border-b border-slate-200">
        <button 
          onClick={() => setViewMode('pending')}
          className={`pb-4 px-2 text-sm font-bold transition-all ${viewMode === 'pending' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-slate-400 hover:text-slate-600'}`}
        >
          Pending Actions
        </button>
        <button 
          onClick={() => setViewMode('overview')}
          className={`pb-4 px-2 text-sm font-bold transition-all ${viewMode === 'overview' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-slate-400 hover:text-slate-600'}`}
        >
          Team Overview
        </button>
      </div>

      {viewMode === 'pending' ? (
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-slate-800">Requests for Approval</h3>
          {pendingRequests.length === 0 ? (
            <div className="bg-white p-12 text-center rounded-2xl border border-dashed border-slate-300">
              <p className="text-slate-400">Everything up to date! No pending requests.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {pendingRequests.map(req => (
                <div key={req.id} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <p className="font-bold text-slate-900">{req.userName}</p>
                      <p className="text-xs text-blue-600 font-semibold uppercase tracking-tighter">{req.type.replace('-', ' ')}</p>
                    </div>
                    <span className="text-xs text-slate-400">{new Date(req.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-xl mb-4">
                    <p className="text-sm text-slate-700">
                      <strong>Dates:</strong> {req.startDate} to {req.endDate}
                    </p>
                    {req.hours && <p className="text-sm text-slate-700"><strong>Hours:</strong> {req.hours}</p>}
                    <p className="text-sm text-slate-500 mt-2 italic">"{req.reason || 'No reason provided'}"</p>
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => onUpdateStatus(req.id, 'approved')}
                      className="flex-1 bg-emerald-600 text-white py-2 rounded-xl text-sm font-bold hover:bg-emerald-700 transition-colors"
                    >
                      Approve
                    </button>
                    <button 
                      onClick={() => onUpdateStatus(req.id, 'declined')}
                      className="flex-1 bg-white border border-rose-200 text-rose-600 py-2 rounded-xl text-sm font-bold hover:bg-rose-50 transition-colors"
                    >
                      Decline
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <h3 className="text-lg font-bold text-slate-800">Global Employee Status</h3>
            <select 
              value={selectedUserId}
              onChange={(e) => setSelectedUserId(e.target.value)}
              className="bg-white border border-slate-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-auto"
            >
              <option value="all">All Employees</option>
              {users.filter(u => u.role === 'employee').map(u => (
                <option key={u.id} value={u.id}>{u.name}</option>
              ))}
            </select>
          </div>

          <div className="bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 border-b border-slate-100">
                  <tr>
                    <th className="px-6 py-4 font-bold text-slate-500 uppercase text-[10px]">Employee</th>
                    <th className="px-6 py-4 font-bold text-slate-500 uppercase text-[10px]">Holidays Left</th>
                    <th className="px-6 py-4 font-bold text-slate-500 uppercase text-[10px]">Extra Hours</th>
                    <th className="px-6 py-4 font-bold text-slate-500 uppercase text-[10px]">Sick Days (YTD)</th>
                    <th className="px-6 py-4 font-bold text-slate-500 uppercase text-[10px]">Present Today</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredUsers.map(u => {
                    const isPresent = attendance.some(a => a.userId === u.id && a.date === today);
                    return (
                      <tr key={u.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-500">
                              {u.name.charAt(0)}
                            </div>
                            <span className="font-semibold text-slate-900">{u.name}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`font-bold ${u.holidayBalance < 5 ? 'text-rose-600' : 'text-blue-600'}`}>
                            {u.holidayBalance} days
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="bg-emerald-50 text-emerald-700 px-2 py-1 rounded-lg font-medium">
                            {u.extraHoursWallet}h
                          </span>
                        </td>
                        <td className="px-6 py-4 text-slate-500">{u.sickDaysTaken} days</td>
                        <td className="px-6 py-4">
                          {isPresent ? (
                            <span className="flex items-center gap-1.5 text-emerald-600 font-bold">
                              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                              Yes
                            </span>
                          ) : (
                            <span className="flex items-center gap-1.5 text-slate-400">
                              <span className="w-2 h-2 bg-slate-300 rounded-full"></span>
                              No
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderAttendance = () => (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Team Attendance Logs</h2>
          <p className="text-slate-500 text-sm">Review and print weekly reports for any employee.</p>
        </div>
        <select 
          value={attendanceSubjectId}
          onChange={(e) => setAttendanceSubjectId(e.target.value)}
          className="bg-white border border-slate-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-64 shadow-sm"
        >
          {users.filter(u => u.role === 'employee').map(u => (
            <option key={u.id} value={u.id}>{u.name}</option>
          ))}
        </select>
      </div>
      
      <AttendanceTracker 
        records={attendance.filter(a => a.userId === attendanceSubjectId)} 
        onCheckIn={() => {}} 
        onCheckOut={() => {}} 
      />
    </div>
  );

  const renderRequestsHistory = () => (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4">
        <h2 className="text-2xl font-bold text-slate-800">Full Request History</h2>
        <div className="flex gap-2 w-full sm:w-auto">
          <select 
            className="bg-white border border-slate-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 flex-1 sm:w-48 shadow-sm"
            onChange={(e) => setSelectedUserId(e.target.value)}
            value={selectedUserId}
          >
            <option value="all">All Employees</option>
            {users.filter(u => u.role === 'employee').map(u => (
              <option key={u.id} value={u.id}>{u.name}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-500 border-b border-slate-100">
              <tr>
                <th className="px-6 py-4 font-bold uppercase text-[10px]">Employee</th>
                <th className="px-6 py-4 font-bold uppercase text-[10px]">Type</th>
                <th className="px-6 py-4 font-bold uppercase text-[10px]">Dates</th>
                <th className="px-6 py-4 font-bold uppercase text-[10px]">Status</th>
                <th className="px-6 py-4 font-bold uppercase text-[10px]">Reason</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {requests
                .filter(r => selectedUserId === 'all' || r.userId === selectedUserId)
                .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                .map(req => (
                <tr key={req.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-semibold text-slate-900">{req.userName}</td>
                  <td className="px-6 py-4 capitalize text-slate-600">{req.type.replace('-', ' ')}</td>
                  <td className="px-6 py-4 text-slate-500">{req.startDate} - {req.endDate}</td>
                  <td className="px-6 py-4">
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full ${
                      req.status === 'approved' ? 'bg-emerald-100 text-emerald-700' :
                      req.status === 'declined' ? 'bg-rose-100 text-rose-700' :
                      'bg-slate-100 text-slate-600'
                    }`}>
                      {req.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-400 italic max-w-xs truncate">{req.reason || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {requests.length === 0 && <p className="p-8 text-center text-slate-400">No requests found.</p>}
        </div>
      </div>
    </div>
  );

  return (
    <div className="pb-10">
      {activeTab === 'dashboard' && renderDashboard()}
      {activeTab === 'attendance' && renderAttendance()}
      {activeTab === 'requests' && renderRequestsHistory()}
    </div>
  );
};

export default ManagerDashboard;
