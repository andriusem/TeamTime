
import React from 'react';
import { User } from '../types';

interface LoginProps {
  users: User[];
  onLogin: (userId: string) => void;
}

const Login: React.FC<LoginProps> = ({ users, onLogin }) => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-[2rem] shadow-2xl p-8 border border-slate-100">
        <div className="flex flex-col items-center mb-8">
          <div className="bg-blue-600 text-white p-3 rounded-2xl mb-4 shadow-lg shadow-blue-200">
             <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          </div>
          <h1 className="text-3xl font-black text-slate-800 tracking-tight">TeamTime</h1>
          <p className="text-slate-500 mt-1 font-medium">Internal Management Suite</p>
        </div>

        <div className="space-y-4">
          <p className="text-sm font-bold text-slate-400 uppercase tracking-widest text-center mb-4">Choose Profile to Enter</p>
          {users.map(u => (
            <button
              key={u.id}
              onClick={() => onLogin(u.id)}
              className="w-full flex items-center justify-between bg-slate-50 hover:bg-blue-50 hover:border-blue-200 border border-slate-200 p-4 rounded-2xl transition-all group"
            >
              <div className="flex items-center gap-4 text-left">
                <div className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center font-bold text-slate-400 group-hover:text-blue-600 group-hover:border-blue-200 shadow-sm transition-all">
                  {u.name.charAt(0)}
                </div>
                <div>
                  <p className="font-bold text-slate-900 leading-tight">{u.name}</p>
                  <p className="text-xs text-slate-400 uppercase tracking-wider">{u.role}</p>
                </div>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-slate-300 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </button>
          ))}
        </div>

        <div className="mt-8 text-center">
          <p className="text-xs text-slate-400">PWA Ready • Secure Session • Team Internal</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
