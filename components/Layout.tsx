
import React from 'react';
import { User } from '../types';

interface LayoutProps {
  user: User;
  onLogout: () => void;
  activeTab: 'dashboard' | 'attendance' | 'requests';
  setActiveTab: (tab: 'dashboard' | 'attendance' | 'requests') => void;
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ user, onLogout, activeTab, setActiveTab, children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50 px-4 py-3 flex items-center justify-between no-print">
        <div className="flex items-center gap-2">
          <div className="bg-blue-600 text-white p-1.5 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
          </div>
          <h1 className="text-xl font-bold text-slate-800 tracking-tight">TeamTime Pro</h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden sm:block text-right">
            <p className="text-sm font-semibold text-slate-900">{user.name}</p>
            <p className="text-xs text-slate-500 capitalize">{user.role}</p>
          </div>
          <button 
            onClick={onLogout}
            className="p-2 hover:bg-slate-100 rounded-full transition-colors"
            title="Logout"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 pb-24 sm:pb-8 p-4 max-w-5xl mx-auto w-full">
        {children}
      </main>

      {/* Navigation - Bottom for Mobile, Fixed for PWA feel */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t flex justify-around p-2 z-50 sm:hidden no-print">
        <button 
          onClick={() => setActiveTab('dashboard')}
          className={`flex flex-col items-center p-2 rounded-lg transition-all ${activeTab === 'dashboard' ? 'text-blue-600' : 'text-slate-500'}`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
          <span className="text-[10px] mt-1">Dash</span>
        </button>
        <button 
          onClick={() => setActiveTab('attendance')}
          className={`flex flex-col items-center p-2 rounded-lg transition-all ${activeTab === 'attendance' ? 'text-blue-600' : 'text-slate-500'}`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          <span className="text-[10px] mt-1">Clock</span>
        </button>
        <button 
          onClick={() => setActiveTab('requests')}
          className={`flex flex-col items-center p-2 rounded-lg transition-all ${activeTab === 'requests' ? 'text-blue-600' : 'text-slate-500'}`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
          <span className="text-[10px] mt-1">Requests</span>
        </button>
      </nav>

      {/* Desktop Navigation Side-link (Visible only on desktop) */}
      <div className="hidden sm:flex fixed left-4 top-24 flex-col gap-4 no-print">
          <button onClick={() => setActiveTab('dashboard')} className={`p-3 rounded-xl transition-all shadow-sm ${activeTab === 'dashboard' ? 'bg-blue-600 text-white' : 'bg-white text-slate-600 hover:bg-slate-50 border'}`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
          </button>
          <button onClick={() => setActiveTab('attendance')} className={`p-3 rounded-xl transition-all shadow-sm ${activeTab === 'attendance' ? 'bg-blue-600 text-white' : 'bg-white text-slate-600 hover:bg-slate-50 border'}`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          </button>
          <button onClick={() => setActiveTab('requests')} className={`p-3 rounded-xl transition-all shadow-sm ${activeTab === 'requests' ? 'bg-blue-600 text-white' : 'bg-white text-slate-600 hover:bg-slate-50 border'}`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
          </button>
      </div>
    </div>
  );
};

export default Layout;
