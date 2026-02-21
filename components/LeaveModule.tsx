
import React, { useState } from 'react';
import { User, Role, LeaveRequest } from '../types';
import { MOCK_STAFF } from '../constants.tsx';

interface LeaveProps {
  user: User;
  requests: LeaveRequest[];
  setRequests: React.Dispatch<React.SetStateAction<LeaveRequest[]>>;
}

const LeaveModule: React.FC<LeaveProps> = ({ user, requests, setRequests }) => {
  const [form, setForm] = useState({ 
    period: '', 
    reason: '', 
    file: null as File | null,
    substitutionStaffId: '' 
  });
  const [preview, setPreview] = useState<string | null>(null);

  const isStudent = user.role === Role.STUDENT;
  const isStaff = user.role === Role.STAFF;
  const isHOD = user.role === Role.HOD;
  const isMentor = user.isMentor === true;

  // Filter other staff from the same department for substitution
  const availableSubstitutionStaff = MOCK_STAFF.filter(
    s => s.department === user.department && s.id !== user.id
  );

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setForm({ ...form, file });
      // In a real app, this would be an S3/Cloudinary URL after upload
      setPreview(URL.createObjectURL(file));
    }
  };

  const submitLeave = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isStudent && !form.file) {
      alert('Please upload your signed leave form (PDF or Image).');
      return;
    }

    if (isStaff && !form.substitutionStaffId) {
      alert('Please select a substitution staff member for your classes.');
      return;
    }

    const subStaff = MOCK_STAFF.find(s => s.id === form.substitutionStaffId);

    const newReq: LeaveRequest = {
      id: Math.random().toString(36).substr(2, 9),
      userId: user.id,
      userName: user.name,
      reason: form.reason,
      status: 'PENDING',
      date: form.period, 
      type: isStudent ? 'STUDENT' : 'STAFF',
      fileUrl: preview || undefined,
      department: user.department,
      substitutionStaffName: subStaff ? subStaff.name : undefined
    };

    setRequests([newReq, ...requests]);
    setForm({ period: '', reason: '', file: null, substitutionStaffId: '' });
    setPreview(null);
    alert('Leave application submitted for review!');
  };

  const handleStatus = (id: string, status: 'APPROVED' | 'REJECTED') => {
    setRequests(prev => prev.map(r => r.id === id ? { ...r, status } : r));
  };

  // Visibility Logic for the List View
  const filteredRequests = requests.filter(req => {
    // Students see their own
    if (isStudent) return req.userId === user.id;
    
    // HODs see Staff requests from their department
    if (isHOD) return req.type === 'STAFF' && req.department === user.department;
    
    // Mentors see Student requests from their mentored department
    if (isStaff && isMentor) {
      if (req.type === 'STUDENT' && req.department === (user.mentorDepartment || user.department)) return true;
      // Also show their own requests sent to HOD
      if (req.userId === user.id) return true;
      return false;
    }
    
    // Regular Staff see their own
    if (isStaff) return req.userId === user.id;

    return false;
  });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Application Side */}
      <div className="space-y-6">
        <div className="bg-white p-10 rounded-[2.5rem] shadow-xl border border-gray-100 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 bg-red-50 rounded-full -mr-20 -mt-20 opacity-40"></div>
          
          <div className="mb-8 relative z-10">
            <h3 className="text-2xl font-black text-gray-900 tracking-tight">
              {isStudent ? 'Apply for Leave' : 'Faculty Leave Request'}
            </h3>
            <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-1">
              {isStudent ? 'Signed document upload required' : 'Substitution staff arrangement required'}
            </p>
          </div>

          <form onSubmit={submitLeave} className="space-y-6 relative z-10">
            <div>
              <label className="block text-[10px] font-black text-gray-400 uppercase mb-2 ml-1 tracking-widest">Leave Duration / Period</label>
              <input 
                type="text" 
                required
                placeholder="e.g. Oct 12-14 or Monday FN"
                className="w-full px-5 py-4 rounded-2xl border-2 border-gray-50 bg-gray-50/50 outline-none focus:bg-white focus:border-red-500 transition-all font-bold text-gray-700"
                value={form.period}
                onChange={e => setForm({...form, period: e.target.value})}
              />
            </div>

            {isStaff && (
              <div>
                <label className="block text-[10px] font-black text-gray-400 uppercase mb-2 ml-1 tracking-widest">Substitution Arranged With</label>
                <select 
                  required
                  className="w-full px-5 py-4 rounded-2xl border-2 border-gray-50 bg-gray-50/50 outline-none focus:bg-white focus:border-red-500 transition-all font-bold text-gray-700"
                  value={form.substitutionStaffId}
                  onChange={e => setForm({...form, substitutionStaffId: e.target.value})}
                >
                  <option value="">Select a Faculty Member</option>
                  {availableSubstitutionStaff.map(staff => (
                    <option key={staff.id} value={staff.id}>{staff.name}</option>
                  ))}
                </select>
                <p className="mt-2 text-[9px] text-gray-400 font-bold italic ml-1">The HOD will verify the substitution arrangement with this faculty.</p>
              </div>
            )}

            <div>
              <label className="block text-[10px] font-black text-gray-400 uppercase mb-2 ml-1 tracking-widest">Reason for Absence</label>
              <textarea 
                required
                className="w-full px-5 py-4 rounded-2xl border-2 border-gray-50 bg-gray-50/50 outline-none focus:bg-white focus:border-red-500 transition-all font-bold text-gray-700 h-24 resize-none"
                placeholder="Briefly explain your absence..."
                value={form.reason}
                onChange={e => setForm({...form, reason: e.target.value})}
              ></textarea>
            </div>

            {isStudent && (
              <div>
                <label className="block text-[10px] font-black text-gray-400 uppercase mb-2 ml-1 tracking-widest">Signed Leave Form (Required)</label>
                <div className={`relative border-4 border-dashed rounded-[2rem] p-8 flex flex-col items-center justify-center transition-all ${preview ? 'border-green-100 bg-green-50/30' : 'border-gray-100 bg-gray-50/50 hover:bg-white hover:border-red-200'}`}>
                  {preview ? (
                    <div className="text-center">
                      <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center text-green-600 mb-3 mx-auto border border-green-100">
                        <i className="fa-solid fa-file-signature text-2xl"></i>
                      </div>
                      <p className="text-[10px] font-black text-green-700 uppercase">{form.file?.name}</p>
                      <button 
                        type="button"
                        onClick={() => { setPreview(null); setForm({...form, file: null}); }}
                        className="mt-2 text-[9px] font-black text-red-500 uppercase hover:underline"
                      >
                        Click to change file
                      </button>
                    </div>
                  ) : (
                    <>
                      <i className="fa-solid fa-file-arrow-up text-4xl text-gray-200 mb-4"></i>
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">
                        Drop signed document here<br/>PDF or Image
                      </p>
                    </>
                  )}
                  <input 
                    type="file" 
                    accept="image/*,.pdf"
                    className="absolute inset-0 opacity-0 cursor-pointer" 
                    onChange={handleFile}
                  />
                </div>
              </div>
            )}

            <button className="w-full bg-red-600 text-white py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-red-700 shadow-xl shadow-red-100 transition-all flex items-center justify-center group">
              Submit to {isStudent ? 'Mentor' : 'HOD'}
              <i className="fa-solid fa-paper-plane ml-3 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"></i>
            </button>
          </form>
        </div>
      </div>

      {/* Review Side */}
      <div className="space-y-6">
        <div className="bg-white p-10 rounded-[2.5rem] shadow-xl border border-gray-100 min-h-[500px]">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-xl font-black text-gray-900 tracking-tight">
              {isMentor || isHOD ? 'Pending Approvals' : 'Application Status'}
            </h3>
            <div className="flex space-x-2">
               <span className="px-3 py-1 bg-amber-50 text-amber-600 text-[10px] font-black uppercase rounded-lg">
                  {filteredRequests.filter(r => r.status === 'PENDING').length} New
               </span>
            </div>
          </div>

          <div className="space-y-4 max-h-[700px] overflow-y-auto pr-2 custom-scrollbar">
            {filteredRequests.length > 0 ? filteredRequests.map(req => (
              <div key={req.id} className="p-6 rounded-[2rem] bg-gray-50 border border-gray-100 hover:bg-white hover:shadow-xl transition-all group">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-red-600 font-black text-lg border border-gray-100">
                      {req.userName.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-black text-gray-800 tracking-tight">{req.userName}</h4>
                      <div className="flex items-center space-x-2">
                        <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{req.date}</span>
                        <span className="w-1 h-1 bg-gray-200 rounded-full"></span>
                        <span className={`text-[9px] font-black uppercase ${req.type === 'STUDENT' ? 'text-red-600' : 'text-indigo-600'}`}>
                          {req.type}
                        </span>
                      </div>
                    </div>
                  </div>
                  <span className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest ${
                    req.status === 'PENDING' ? 'bg-amber-100 text-amber-600' :
                    req.status === 'APPROVED' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                  }`}>
                    {req.status}
                  </span>
                </div>
                
                <div className="bg-white/60 p-4 rounded-2xl border border-gray-100 mb-4">
                  <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Reason Statement</p>
                  <p className="text-sm text-gray-600 font-medium italic">"{req.reason}"</p>
                </div>

                {req.substitutionStaffName && (
                  <div className="mb-4 flex items-center px-4 py-2 bg-indigo-50/50 border border-indigo-100 rounded-xl">
                    <i className="fa-solid fa-people-arrows text-indigo-600 mr-3 text-xs"></i>
                    <div>
                      <p className="text-[8px] font-black text-indigo-400 uppercase tracking-widest">Substitution Arrangements</p>
                      <p className="text-[10px] font-black text-indigo-700">{req.substitutionStaffName}</p>
                    </div>
                  </div>
                )}

                {req.fileUrl && (
                  <div className="mb-6">
                    <button 
                      onClick={() => window.open(req.fileUrl, '_blank')}
                      className="w-full py-3 bg-indigo-50 text-indigo-600 border border-indigo-100 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-600 hover:text-white transition-all flex items-center justify-center"
                    >
                      <i className="fa-solid fa-file-magnifying-glass mr-2"></i>
                      Review Signed Form
                    </button>
                  </div>
                )}
                
                {/* Approval Actions for Mentor/HOD */}
                {((isMentor && req.type === 'STUDENT') || (isHOD && req.type === 'STAFF')) && req.status === 'PENDING' && (
                  <div className="flex space-x-3 mt-4">
                    <button 
                      onClick={() => handleStatus(req.id, 'APPROVED')}
                      className="flex-1 bg-green-500 text-white py-3.5 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-green-600 shadow-lg shadow-green-100 transition-all active:scale-95"
                    >
                      Grant Approval
                    </button>
                    <button 
                      onClick={() => handleStatus(req.id, 'REJECTED')}
                      className="flex-1 bg-red-500 text-white py-3.5 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-red-600 shadow-lg shadow-red-100 transition-all active:scale-95"
                    >
                      Deny Request
                    </button>
                  </div>
                )}
              </div>
            )) : (
              <div className="flex flex-col items-center justify-center py-24 opacity-20">
                <i className="fa-solid fa-envelope-circle-check text-6xl mb-4"></i>
                <p className="text-[10px] font-black uppercase tracking-widest">No applications to display</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaveModule;
