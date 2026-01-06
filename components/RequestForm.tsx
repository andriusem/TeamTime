
import React, { useState } from 'react';
import { RequestType } from '../types';

interface RequestFormProps {
  initialType: RequestType;
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

const RequestForm: React.FC<RequestFormProps> = ({ initialType, onSubmit, onCancel }) => {
  const [type, setType] = useState<RequestType>(initialType);
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [endDate, setEndDate] = useState(new Date().toISOString().split('T')[0]);
  const [hours, setHours] = useState(1);
  const [reason, setReason] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      type,
      startDate,
      endDate,
      hours: type.includes('extra-hours') ? hours : undefined,
      reason
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Request Type</label>
        <select 
          value={type} 
          onChange={(e) => setType(e.target.value as RequestType)}
          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
        >
          <option value="holiday">Holiday / Vacation</option>
          <option value="sick-leave">Sick Leave</option>
          <option value="extra-hours-earning">Register Overtime Work</option>
          <option value="extra-hours-usage">Use Extra Hours Off</option>
          <option value="not-justified">Justify Absence</option>
        </select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">From</label>
          <input 
            type="date" 
            value={startDate} 
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">To</label>
          <input 
            type="date" 
            value={endDate} 
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          />
        </div>
      </div>

      {type.includes('extra-hours') && (
        <div>
          <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Total Hours</label>
          <input 
            type="number" 
            min="0.5" 
            step="0.5"
            value={hours} 
            onChange={(e) => setHours(parseFloat(e.target.value))}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          />
        </div>
      )}

      <div>
        <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Reason / Description</label>
        <textarea 
          placeholder="e.g. Worked late for project X, Family trip, Flu..."
          value={reason} 
          onChange={(e) => setReason(e.target.value)}
          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all h-24"
        />
      </div>

      <div className="flex gap-3 pt-2">
        <button 
          type="button" 
          onClick={onCancel}
          className="flex-1 bg-white border border-slate-200 text-slate-600 py-3 rounded-2xl font-bold hover:bg-slate-50 transition-colors"
        >
          Cancel
        </button>
        <button 
          type="submit" 
          className="flex-1 bg-blue-600 text-white py-3 rounded-2xl font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default RequestForm;
