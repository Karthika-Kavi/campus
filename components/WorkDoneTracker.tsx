
import React, { useState } from 'react';
import { User, WorkDone } from '../types';

interface WorkDoneProps {
  user: User;
  history: WorkDone[];
  setHistory: React.Dispatch<React.SetStateAction<WorkDone[]>>;
}

const WorkDoneTracker: React.FC<WorkDoneProps> = ({ user, history, setHistory }) => {
  const [form, setForm] = useState({ subject: '', topic: '', progress: 0 });

  const addEntry = (e: React.FormEvent) => {
    e.preventDefault();
    const entry: WorkDone = {
      id: Math.random().toString(),
      staffId: user.id,
      subjectId: form.subject,
      date: new Date().toISOString().split('T')[0],
      topic: form.topic,
      completionPercentage: form.progress
    };
    setHistory([entry, ...history]);
    setForm({ subject: '', topic: '', progress: 0 });
    alert("Syllabus tracking updated successfully!");
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-gray-100">
            <h3 className="text-xl font-black mb-6">Update Tracker</h3>
            <form onSubmit={addEntry} className="space-y-5">
              <div>
                <label className="block text-[10px] font-black text-gray-400 uppercase mb-1.5 ml-1">Subject</label>
                <select 
                  className="w-full px-5 py-4 rounded-2xl border-2 border-gray-50 bg-gray-50/50 outline-none focus:border-red-500 font-bold"
                  required
                  value={form.subject}
                  onChange={e => setForm({...form, subject: e.target.value})}
                >
                  <option value="">-- Choose --</option>
                  {user.assignedSubjects?.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-black text-gray-400 uppercase mb-1.5 ml-1">Topic Completed</label>
                <input 
                  type="text" 
                  required
                  className="w-full px-5 py-4 rounded-2xl border-2 border-gray-50 bg-gray-50/50 outline-none focus:border-red-500 transition-all font-bold"
                  placeholder="e.g., Unit 3: Transformers"
                  value={form.topic}
                  onChange={e => setForm({...form, topic: e.target.value})}
                />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase">Total Coverage</label>
                  <span className="text-xs font-black text-red-600">{form.progress}%</span>
                </div>
                <input 
                  type="range" 
                  className="w-full h-1.5 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-red-600"
                  min="0" max="100"
                  value={form.progress}
                  onChange={e => setForm({...form, progress: parseInt(e.target.value)})}
                />
              </div>
              <button className="w-full bg-red-600 text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-red-700 shadow-xl shadow-red-100 transition-all">
                Submit Progress
              </button>
            </form>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-gray-100">
            <h3 className="text-xl font-black mb-6">Activity Timeline</h3>
            <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
              {history.length > 0 ? history.map(item => (
                <div key={item.id} className="flex items-center justify-between p-6 rounded-3xl border border-gray-100 hover:bg-gray-50 transition-all bg-white">
                  <div className="flex items-center space-x-5">
                    <div className="w-14 h-14 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center font-black text-[10px] border border-red-100 uppercase tracking-tighter">
                      {item.subjectId}
                    </div>
                    <div>
                      <h4 className="font-black text-gray-800 tracking-tight">{item.topic}</h4>
                      <p className="text-[10px] text-gray-400 font-bold uppercase">{item.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-black text-gray-800 mb-1">{item.completionPercentage}%</div>
                    <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden shadow-inner">
                      <div className="h-full bg-green-500 shadow-[0_0_8px_rgba(16,185,129,0.3)] transition-all duration-1000" style={{ width: `${item.completionPercentage}%` }}></div>
                    </div>
                  </div>
                </div>
              )) : (
                <div className="p-12 text-center">
                   <i className="fa-solid fa-layer-group text-4xl text-gray-100 mb-4"></i>
                   <p className="text-gray-400 font-bold uppercase text-[10px] tracking-widest">No history recorded yet</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkDoneTracker;
