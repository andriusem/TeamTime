
import React, { useState, useEffect } from 'react';
import { User, Role, TimeRequest, AttendanceRecord } from './types';
import { INITIAL_USERS, INITIAL_REQUESTS, INITIAL_ATTENDANCE } from './services/mockData';
import Layout from './components/Layout';
import EmployeeDashboard from './components/EmployeeDashboard';
import ManagerDashboard from './components/ManagerDashboard';
import Login from './components/Login';

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>(INITIAL_USERS);
  const [requests, setRequests] = useState<TimeRequest[]>(INITIAL_REQUESTS);
  const [attendance, setAttendance] = useState<AttendanceRecord[]>(INITIAL_ATTENDANCE);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'attendance' | 'requests'>('dashboard');

  // Persistence simulation
  useEffect(() => {
    const savedUser = localStorage.getItem('teamtime_user');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogin = (userId: string) => {
    const user = users.find(u => u.id === userId);
    if (user) {
      setCurrentUser(user);
      localStorage.setItem('teamtime_user', JSON.stringify(user));
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('teamtime_user');
  };

  const addRequest = (req: Omit<TimeRequest, 'id' | 'userName' | 'status' | 'createdAt'>) => {
    if (!currentUser) return;
    const newRequest: TimeRequest = {
      ...req,
      id: Math.random().toString(36).substr(2, 9),
      userName: currentUser.name,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };
    setRequests(prev => [newRequest, ...prev]);
  };

  const updateRequestStatus = (requestId: string, status: 'approved' | 'declined') => {
    setRequests(prev => prev.map(req => {
      if (req.id === requestId) {
        // Logic to update balances if approved
        if (status === 'approved') {
          setUsers(prevUsers => prevUsers.map(u => {
            if (u.id === req.userId) {
              const updated = { ...u };
              if (req.type === 'holiday') {
                const days = Math.ceil((new Date(req.endDate).getTime() - new Date(req.startDate).getTime()) / (1000 * 3600 * 24)) + 1;
                updated.holidayBalance -= days;
              } else if (req.type === 'extra-hours-earning') {
                updated.extraHoursWallet += (req.hours || 0);
              } else if (req.type === 'extra-hours-usage') {
                updated.extraHoursWallet -= (req.hours || 0);
              } else if (req.type === 'sick-leave') {
                const days = Math.ceil((new Date(req.endDate).getTime() - new Date(req.startDate).getTime()) / (1000 * 3600 * 24)) + 1;
                updated.sickDaysTaken += days;
              }
              return updated;
            }
            return u;
          }));
        }
        return { ...req, status };
      }
      return req;
    }));
  };

  const handleCheckIn = () => {
    if (!currentUser) return;
    const today = new Date().toISOString().split('T')[0];
    const existing = attendance.find(a => a.userId === currentUser.id && a.date === today);
    if (existing) return;

    const newRecord: AttendanceRecord = {
      id: Math.random().toString(36).substr(2, 9),
      userId: currentUser.id,
      date: today,
      checkIn: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setAttendance(prev => [newRecord, ...prev]);
  };

  const handleCheckOut = () => {
    if (!currentUser) return;
    const today = new Date().toISOString().split('T')[0];
    setAttendance(prev => prev.map(a => {
      if (a.userId === currentUser.id && a.date === today) {
        return { ...a, checkOut: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
      }
      return a;
    }));
  };

  if (!currentUser) {
    return <Login users={users} onLogin={handleLogin} />;
  }

  return (
    <Layout 
      user={currentUser} 
      onLogout={handleLogout} 
      activeTab={activeTab} 
      setActiveTab={setActiveTab}
    >
      {currentUser.role === 'employee' ? (
        <EmployeeDashboard 
          user={currentUser} 
          requests={requests.filter(r => r.userId === currentUser.id)} 
          attendance={attendance.filter(a => a.userId === currentUser.id)}
          activeTab={activeTab}
          onSubmitRequest={addRequest}
          onCheckIn={handleCheckIn}
          onCheckOut={handleCheckOut}
        />
      ) : (
        <ManagerDashboard 
          users={users}
          requests={requests}
          attendance={attendance}
          activeTab={activeTab}
          onUpdateStatus={updateRequestStatus}
        />
      )}
    </Layout>
  );
};

export default App;
