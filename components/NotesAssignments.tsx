
import React, { useState } from 'react';
import { User, Role, Note } from '../types';

interface NotesProps {
  user: User;
  items: Note[];
  setItems: React.Dispatch<React.SetStateAction<Note[]>>;
}

const NotesAssignments: React.FC<NotesProps> = ({ user, items, setItems }) => {
  const [form, setForm] = useState({ title: '', subject: '', type: 'NOTE' as 'NOTE' | 'ASSIGNMENT' | 'SYLLABUS', content: '', deadline: '', file: null as File | null });
  const [preview, setPreview] = useState<string | null>(null);
  const [viewingNote, setViewingNote] = useState<Note | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setForm({ ...form, file });
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    const newItem: Note = {
      id: Math.random().toString(),
      staffId: user.id,
      subjectId: form.subject || 'GEN',
      title: form.title,
      fileUrl: preview || '#',
      content: form.content,
      type: form.type,
      deadline: form.type === 'ASSIGNMENT' ? form.deadline : undefined
    };

    setItems([newItem, ...items]);
    setForm({ title: '', subject: '', type: 'NOTE', content: '', deadline: '', file: null });
    setPreview(null);
    alert('Academic material published to students!');
  };

  const handleDownload = (item: Note) => {
    alert(`Downloading ${item.title}...`);
  };

  const isStaffOrHod = user.role === Role.STAFF || user.role === Role.HOD;

  return (
    <div className="space-y-8">
      {isStaffOrHod && (
        <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-gray-100">
          <h3 className="text-xl font-black mb-6 text-gray-900">Upload Center</h3>
          <form onSubmit={handleUpload} className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-5">
              <div>
                <label className="block text-[10px] font-black text-gray-400 uppercase mb-1.5 ml-1">Document Title</label>
                <input 
                  type="text" 
                  className="w-full px-5 py-4 rounded-2xl border-2 border-gray-50 bg-gray-50/50 outline-none focus:border-red-500 transition-all font-bold"
                  placeholder="e.g., Ethical Hacking Unit I"
                  required
                  value={form.title}
                  onChange={e => setForm({...form, title: e.target.value})}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-black text-gray-400 uppercase mb-1.5 ml-1">Subject</label>
                  <select 
                    className="w-full px-5 py-4 rounded-2xl border-2 border-gray-50 bg-gray-50/50 outline-none focus:border-red-500 font-bold"
                    required
                    value={form.subject}
                    onChange={e => setForm({...form, subject: e.target.value})}
                  >
                    <option value="">Select</option>
                    {user.assignedSubjects?.map(s => <option key={s} value={s}>{s}</option>)}
                    <option value="CCS344">Ethical Hacking (CCS344)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-black text-gray-400 uppercase mb-1.5 ml-1">Type</label>
                  <select 
                    className="w-full px-5 py-4 rounded-2xl border-2 border-gray-50 bg-gray-50/50 outline-none focus:border-red-500 font-bold"
                    value={form.type}
                    onChange={e => setForm({...form, type: e.target.value as any})}
                  >
                    <option value="NOTE">Study Notes</option>
                    <option value="ASSIGNMENT">Assignment</option>
                    <option value="SYLLABUS">Syllabus</option>
                  </select>
                </div>
              </div>
              {form.type === 'SYLLABUS' && (
                <div>
                  <label className="block text-[10px] font-black text-gray-400 uppercase mb-1.5 ml-1">Detailed Syllabus Content (Text)</label>
                  <textarea 
                    className="w-full px-5 py-4 rounded-2xl border-2 border-gray-50 bg-gray-50/50 outline-none focus:border-red-500 font-bold h-32"
                    placeholder="Enter unit-wise syllabus details..."
                    value={form.content}
                    onChange={e => setForm({...form, content: e.target.value})}
                  ></textarea>
                </div>
              )}
              {form.type === 'ASSIGNMENT' && (
                <div>
                  <label className="block text-[10px] font-black text-gray-400 uppercase mb-1.5 ml-1">Deadline Date</label>
                  <input 
                    type="date" 
                    className="w-full px-5 py-4 rounded-2xl border-2 border-gray-50 bg-gray-50/50 outline-none focus:border-red-500 font-bold"
                    value={form.deadline}
                    onChange={e => setForm({...form, deadline: e.target.value})}
                  />
                </div>
              )}
            </div>
            
            <div className="flex flex-col h-full">
              <label className="block text-[10px] font-black text-gray-400 uppercase mb-1.5 ml-1">Attachment (Optional if text provided)</label>
              <div className="flex-1 border-4 border-dashed border-gray-50 rounded-3xl p-6 flex flex-col items-center justify-center hover:bg-gray-50 transition-all relative">
                {preview ? (
                  <div className="text-center p-6 bg-red-50 rounded-2xl border border-red-100 w-full">
                    <i className="fa-solid fa-file-pdf text-red-500 text-4xl mb-3"></i>
                    <p className="text-xs font-black text-red-600 truncate">{form.file?.name || 'Uploaded File'}</p>
                  </div>
                ) : (
                  <>
                    <i className="fa-solid fa-cloud-arrow-up text-5xl text-gray-100 mb-4"></i>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Select Files</p>
                  </>
                )}
                <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={handleFileChange} />
              </div>
              <button className="mt-5 w-full bg-red-600 text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-red-700 shadow-xl shadow-red-100 transition-all">
                Publish Instantly
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map(item => (
          <div key={item.id} className="bg-white rounded-[2.5rem] shadow-xl border border-gray-100 overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all group">
            <div className={`p-5 ${
              item.type === 'SYLLABUS' ? 'bg-indigo-600' : 
              item.type === 'NOTE' ? 'bg-blue-600' : 'bg-red-600'
            } text-white flex justify-between items-center`}>
              <span className="text-[10px] font-black uppercase tracking-widest flex items-center">
                <i className={`fa-solid ${
                  item.type === 'SYLLABUS' ? 'fa-book' :
                  item.type === 'NOTE' ? 'fa-book-open' : 'fa-list-check'
                } mr-2`}></i>
                {item.type}
              </span>
              <span className="text-[10px] font-black bg-white/20 px-3 py-1 rounded-lg uppercase tracking-widest">{item.subjectId}</span>
            </div>
            <div className="p-8">
              <h4 className="text-lg font-black text-gray-900 mb-6 h-12 overflow-hidden leading-tight group-hover:text-red-600 transition-colors">{item.title}</h4>
              
              {item.deadline && (
                <div className="mb-8 p-4 bg-red-50 text-red-600 rounded-2xl text-[10px] font-black uppercase flex items-center border border-red-100 animate-pulse">
                  <i className="fa-solid fa-clock-rotate-left mr-3 text-base"></i> Submit By: {item.deadline}
                </div>
              )}

              {item.type === 'SYLLABUS' && (
                <div className="mb-8 p-4 bg-indigo-50 text-indigo-600 rounded-2xl text-[10px] font-black uppercase border border-indigo-100">
                  <i className="fa-solid fa-info-circle mr-3"></i> Core Subject Syllabus
                </div>
              )}

              <div className="grid grid-cols-2 gap-3">
                {item.content ? (
                  <button 
                    onClick={() => setViewingNote(item)}
                    className="py-3 bg-gray-900 text-white rounded-xl text-[10px] font-black text-center uppercase tracking-widest hover:bg-black transition-all"
                  >
                    View Content
                  </button>
                ) : (
                  <a href={item.fileUrl} target="_blank" rel="noreferrer" className="py-3 bg-gray-900 text-white rounded-xl text-[10px] font-black text-center uppercase tracking-widest hover:bg-black transition-all">View File</a>
                )}
                <button onClick={() => handleDownload(item)} className="py-3 bg-gray-100 text-gray-700 rounded-xl text-[10px] font-black text-center uppercase tracking-widest hover:bg-gray-200 transition-all">Download</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Syllabus Content Viewer Modal */}
      {viewingNote && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm animate-in fade-in duration-300"
            onClick={() => setViewingNote(null)}
          ></div>
          <div className="relative bg-white w-full max-w-4xl max-h-[90vh] rounded-[2.5rem] shadow-2xl border border-gray-100 overflow-hidden animate-in zoom-in slide-in-from-bottom-8 duration-300 flex flex-col">
            <div className="p-8 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
              <div>
                <span className="px-3 py-1 bg-indigo-100 text-indigo-600 text-[10px] font-black uppercase rounded-lg tracking-widest">{viewingNote.subjectId} • Academic Content</span>
                <h3 className="text-2xl font-black text-gray-900 mt-2">{viewingNote.title}</h3>
              </div>
              <div className="flex items-center space-x-3">
                <button className="w-10 h-10 rounded-xl bg-white border border-gray-200 text-gray-400 hover:text-red-600 transition-all flex items-center justify-center shadow-sm">
                   <i className="fa-solid fa-print"></i>
                </button>
                <button 
                  onClick={() => setViewingNote(null)}
                  className="w-10 h-10 rounded-xl bg-white border border-gray-200 text-gray-400 hover:text-red-600 transition-all flex items-center justify-center shadow-sm"
                >
                  <i className="fa-solid fa-times text-lg"></i>
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-12 bg-white selection:bg-red-100 selection:text-red-900">
              <div className="max-w-3xl mx-auto space-y-8 font-serif leading-relaxed text-gray-800">
                {viewingNote.content?.split('\n\n').map((paragraph, idx) => {
                  if (paragraph.startsWith('UNIT')) {
                    return (
                      <div key={idx} className="mt-10 mb-6 pb-2 border-b-2 border-red-500/20">
                        <h4 className="text-xl font-black text-red-600 font-sans tracking-tight flex items-center">
                          <i className="fa-solid fa-bookmark mr-3 text-sm opacity-50"></i>
                          {paragraph}
                        </h4>
                      </div>
                    );
                  }
                  return (
                    <p key={idx} className="text-lg leading-relaxed text-gray-700 text-justify">
                      {paragraph}
                    </p>
                  );
                })}
              </div>
            </div>

            <div className="p-6 bg-gray-50 border-t border-gray-100 text-center">
               <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">End of Official Syllabus Document • SASURIE HUB 2024</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotesAssignments;
