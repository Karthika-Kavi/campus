
import React, { useState } from 'react';
import { User } from '../types';

interface HodAnnouncementsProps {
  user: User;
  announcements: any[];
  setAnnouncements: React.Dispatch<React.SetStateAction<any[]>>;
}

const HodAnnouncements: React.FC<HodAnnouncementsProps> = ({ user, announcements, setAnnouncements }) => {
  const [form, setForm] = useState({ title: '', content: '' });

  const handlePost = (e: React.FormEvent) => {
    e.preventDefault();
    const newMsg = {
      id: Math.random().toString(),
      title: form.title,
      content: form.content,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
      target: 'Staff'
    };
    setAnnouncements([newMsg, ...announcements]);
    setForm({ title: '', content: '' });
    alert("Notice published to department dashboard!");
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-1">
        <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-gray-100 sticky top-8">
           <h3 className="text-xl font-black mb-6 tracking-tight">Post New Notice</h3>
           <form onSubmit={handlePost} className="space-y-5">
              <div>
                <label className="block text-[10px] font-black text-gray-400 uppercase mb-1.5 ml-1">Subject Header</label>
                <input 
                  type="text" 
                  required
                  className="w-full px-5 py-4 rounded-2xl border-2 border-gray-50 bg-gray-50/50 outline-none focus:border-red-500 transition-all font-bold"
                  placeholder="e.g., Semester Review"
                  value={form.title}
                  onChange={e => setForm({...form, title: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-[10px] font-black text-gray-400 uppercase mb-1.5 ml-1">Instructions / Body</label>
                <textarea 
                  required
                  className="w-full px-5 py-4 rounded-2xl border-2 border-gray-50 bg-gray-50/50 outline-none focus:border-red-500 transition-all font-bold h-32"
                  placeholder="Details for faculty members..."
                  value={form.content}
                  onChange={e => setForm({...form, content: e.target.value})}
                ></textarea>
              </div>
              <button className="w-full bg-red-600 text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-red-700 shadow-xl shadow-red-100 transition-all group">
                 Publish To Portal
                 <i className="fa-solid fa-paper-plane ml-2 group-hover:translate-x-1 transition-transform"></i>
              </button>
           </form>
        </div>
      </div>

      <div className="lg:col-span-2 space-y-6">
         <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-gray-100">
            <h3 className="text-xl font-black mb-6">Dispatch History</h3>
            <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
               {announcements.map(notice => (
                 <div key={notice.id} className="p-8 bg-gray-50 rounded-[2rem] border border-gray-100 hover:bg-white transition-all group">
                    <div className="flex justify-between items-start mb-4">
                       <h4 className="text-lg font-black text-gray-900 group-hover:text-red-600 transition-colors">{notice.title}</h4>
                       <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{notice.date}</span>
                    </div>
                    <p className="text-sm text-gray-600 font-medium leading-relaxed mb-6 italic">"{notice.content}"</p>
                    <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                       <div className="flex items-center space-x-2">
                          <span className="px-3 py-1 bg-red-600 text-white text-[10px] font-black uppercase rounded-lg">Official</span>
                          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">To: {notice.target}</span>
                       </div>
                       <button className="text-gray-300 hover:text-red-500 transition-colors">
                          <i className="fa-solid fa-trash-can"></i>
                       </button>
                    </div>
                 </div>
               ))}
            </div>
         </div>
      </div>
    </div>
  );
};

export default HodAnnouncements;
