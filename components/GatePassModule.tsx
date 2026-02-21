
import React, { useState } from 'react';
import { User, Role, GatePass } from '../types';

interface GatePassProps {
  user: User;
  passes: GatePass[];
  setPasses: React.Dispatch<React.SetStateAction<GatePass[]>>;
}

const GatePassModule: React.FC<GatePassProps> = ({ user, passes, setPasses }) => {
  const [form, setForm] = useState({ date: '', time: '', reason: '' });

  const submitPass = (e: React.FormEvent) => {
    e.preventDefault();
    const newPass: GatePass = {
      id: Math.random().toString(),
      studentId: user.id,
      studentName: user.name,
      reason: form.reason,
      date: form.date,
      time: form.time,
      status: 'PENDING'
    };
    setPasses([newPass, ...passes]);
    setForm({ date: '', time: '', reason: '' });
    alert('Gate pass request sent to staff!');
  };

  const handleAction = (id: string, status: 'APPROVED' | 'REJECTED') => {
    setPasses(prev => prev.map(p => p.id === id ? { ...p, status } : p));
  };

  const isStaffOrHod = user.role === Role.STAFF || user.role === Role.HOD;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {user.role === Role.STUDENT && (
        <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-gray-100 h-fit">
          <h3 className="text-xl font-black mb-6">Exit Campus Request</h3>
          <form onSubmit={submitPass} className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-black text-gray-400 uppercase mb-1.5 ml-1">Date</label>
                <input 
                  type="date" 
                  required
                  className="w-full px-5 py-4 rounded-2xl border-2 border-gray-50 bg-gray-50/50 outline-none focus:border-red-500 transition-all font-bold"
                  value={form.date}
                  onChange={e => setForm({...form, date: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-[10px] font-black text-gray-400 uppercase mb-1.5 ml-1">Time</label>
                <input 
                  type="time" 
                  required
                  className="w-full px-5 py-4 rounded-2xl border-2 border-gray-50 bg-gray-50/50 outline-none focus:border-red-500 transition-all font-bold"
                  value={form.time}
                  onChange={e => setForm({...form, time: e.target.value})}
                />
              </div>
            </div>
            <div>
              <label className="block text-[10px] font-black text-gray-400 uppercase mb-1.5 ml-1">Purpose</label>
              <textarea 
                required
                className="w-full px-5 py-4 rounded-2xl border-2 border-gray-50 bg-gray-50/50 outline-none focus:border-red-500 transition-all font-bold h-24"
                placeholder="Brief reason for exiting..."
                value={form.reason}
                onChange={e => setForm({...form, reason: e.target.value})}
              ></textarea>
            </div>
            <button className="w-full bg-red-600 text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-red-700 shadow-xl shadow-red-100 transition-all">
              Request Gate Pass
            </button>
          </form>
        </div>
      )}

      <div className={`space-y-6 ${user.role === Role.STUDENT ? '' : 'lg:col-span-2'}`}>
        <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-gray-100">
          <h3 className="text-xl font-black mb-6">{isStaffOrHod ? 'Student Requests' : 'Your Permits'}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-6">
            {passes
              .filter(p => isStaffOrHod ? true : p.studentId === user.id)
              .map(pass => (
              <div key={pass.id} className="p-6 rounded-[2rem] bg-gray-50 border border-gray-100 hover:bg-white hover:shadow-xl transition-all group">
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-2xl bg-white shadow-sm text-red-600 flex items-center justify-center font-black text-xl border border-gray-100">
                      {pass.studentName.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-black text-gray-800 tracking-tight">{pass.studentName}</h4>
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{pass.date} • {pass.time}</p>
                    </div>
                  </div>
                  <span className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest ${
                    pass.status === 'PENDING' ? 'bg-amber-100 text-amber-600' :
                    pass.status === 'APPROVED' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                  }`}>
                    {pass.status}
                  </span>
                </div>
                
                <div className="bg-white p-4 rounded-2xl border border-gray-100 mb-6">
                  <p className="text-[10px] font-black text-gray-400 uppercase mb-2">Stated Reason</p>
                  <p className="text-sm text-gray-600 font-medium italic">"{pass.reason}"</p>
                </div>

                {isStaffOrHod && pass.status === 'PENDING' && (
                  <div className="flex space-x-3">
                    <button 
                      onClick={() => handleAction(pass.id, 'APPROVED')}
                      className="flex-1 bg-green-500 text-white py-3 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-green-600 transition-all"
                    >
                      Authorize
                    </button>
                    <button 
                      onClick={() => handleAction(pass.id, 'REJECTED')}
                      className="flex-1 bg-red-500 text-white py-3 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-red-600 transition-all"
                    >
                      Deny
                    </button>
                  </div>
                )}
                
                {pass.status === 'APPROVED' && (
                  <div className="text-center p-3 bg-green-50 border border-green-100 rounded-2xl text-green-600 text-[10px] font-black uppercase tracking-widest flex items-center justify-center animate-pulse">
                    <i className="fa-solid fa-qrcode mr-2 text-base"></i> Active Permit - Scan at Gate
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GatePassModule;
