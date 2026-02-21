
import React, { useState } from 'react';
import { MOCK_STAFF, MOCK_HOD, DEPARTMENTS } from '../constants.tsx';
import { User, Role } from '../types';

interface StaffManagementProps {
  user: User;
}

const StaffManagement: React.FC<StaffManagementProps> = ({ user }) => {
  const isPrincipal = user.role === Role.PRINCIPAL;
  const isHOD = user.role === Role.HOD;
  const [activeView, setActiveView] = useState<'FACULTY' | 'HOD'>('FACULTY');
  
  // Principal sees all, HOD sees dept only
  const facultyList = isPrincipal ? MOCK_STAFF : MOCK_STAFF.filter(s => s.department === user.department);
  const hodList = MOCK_HOD; // Only relevant for Principal

  const [staffList, setStaffList] = useState(facultyList);
  const [currentHods, setCurrentHods] = useState(hodList);
  const [selectedStaff, setSelectedStaff] = useState<any>(null);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [newSubject, setNewSubject] = useState('');

  const handleAssignSubject = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedStaff && newSubject) {
      if (activeView === 'FACULTY') {
        const updatedList = staffList.map(s => {
          if (s.id === selectedStaff.id) {
            const currentSubjects = s.assignedSubjects || [];
            if (!currentSubjects.includes(newSubject)) {
              return { ...s, assignedSubjects: [...currentSubjects, newSubject] };
            }
          }
          return s;
        });
        setStaffList(updatedList);
      }
      setIsAssignModalOpen(false);
      setNewSubject('');
      setSelectedStaff(null);
      alert('Subject/Responsibility assigned successfully!');
    }
  };

  return (
    <div className="space-y-6">
      {/* Principal Header & Tabs */}
      <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-gray-100">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
           <div>
              <h3 className="text-2xl font-black text-gray-900">
                {isPrincipal ? 'Institutional Personnel' : 'Department Faculty'}
              </h3>
              <p className="text-sm text-gray-500 font-medium tracking-tight">
                {isPrincipal 
                  ? 'Master registry of HODs and Faculty members across all wings.' 
                  : `Faculty directory for ${user.department}`}
              </p>
           </div>
           
           {isPrincipal && (
             <div className="flex bg-gray-100 p-1.5 rounded-2xl">
               <button 
                 onClick={() => setActiveView('FACULTY')}
                 className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeView === 'FACULTY' ? 'bg-white text-red-600 shadow-md' : 'text-gray-400'}`}
               >
                 Faculty
               </button>
               <button 
                 onClick={() => setActiveView('HOD')}
                 className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeView === 'HOD' ? 'bg-white text-amber-600 shadow-md' : 'text-gray-400'}`}
               >
                 HODs
               </button>
             </div>
           )}
        </div>

        {activeView === 'FACULTY' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {staffList.map(staff => (
              <div key={staff.id} className="p-6 bg-gray-50 rounded-3xl border border-gray-100 hover:bg-white hover:shadow-xl transition-all group relative overflow-hidden">
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center ${isPrincipal ? 'text-indigo-900' : 'text-red-600'} text-2xl font-black border border-gray-100`}>
                    {staff.name.charAt(0)}
                  </div>
                  {staff.isMentor && (
                    <span className="px-3 py-1 bg-blue-100 text-blue-600 text-[10px] font-black uppercase rounded-lg">Mentor</span>
                  )}
                </div>
                <h4 className="text-lg font-black text-gray-900 mb-1">{staff.name}</h4>
                <p className="text-xs text-gray-400 font-bold uppercase mb-1 tracking-wider truncate">{staff.email}</p>
                {isPrincipal && <p className="text-[10px] text-red-600 font-black uppercase mb-4">{staff.department}</p>}
                
                <div className="space-y-3">
                  <div className="p-3 bg-white rounded-xl border border-gray-100">
                    <p className="text-[10px] font-black text-gray-400 uppercase mb-1">Assigned Load</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {staff.assignedSubjects?.map((subj, i) => (
                        <span key={i} className="px-2 py-0.5 bg-gray-100 rounded text-[9px] font-black text-gray-600 uppercase">{subj}</span>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="flex-1 py-2.5 bg-gray-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-black transition-all">
                      Profile
                    </button>
                    {(isHOD || isPrincipal) && (
                      <button 
                        onClick={() => { setSelectedStaff(staff); setIsAssignModalOpen(true); }}
                        className={`flex-1 py-2.5 bg-red-50 text-red-600 border border-red-100 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all`}
                      >
                        Assign Class
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* HOD VIEW FOR PRINCIPAL */
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {currentHods.map(hod => (
              <div key={hod.id} className="p-8 bg-white rounded-[2.5rem] border-2 border-amber-100 shadow-xl relative overflow-hidden group hover:border-amber-400 transition-all">
                <div className="absolute top-0 right-0 p-3 bg-amber-500 text-white text-[8px] font-black uppercase tracking-widest -mr-8 mt-4 rotate-45 w-32 text-center shadow-md">
                   HEAD OF DEPT
                </div>
                <div className="flex items-center space-x-5 mb-6">
                  <div className="w-16 h-16 bg-amber-50 text-amber-600 rounded-[1.5rem] flex items-center justify-center text-3xl font-black shadow-inner border border-amber-100 group-hover:bg-amber-500 group-hover:text-white transition-all">
                    {hod.name.split(' ').pop()?.charAt(0) || 'H'}
                  </div>
                  <div>
                    <h4 className="text-xl font-black text-gray-900 tracking-tight">{hod.name}</h4>
                    <p className="text-[10px] text-amber-600 font-black uppercase tracking-widest">{hod.department}</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-gray-50 rounded-2xl border border-gray-100">
                      <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest mb-1">Faculty count</p>
                      <p className="text-sm font-black text-gray-800">12 Active</p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-2xl border border-gray-100">
                      <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest mb-1">Students</p>
                      <p className="text-sm font-black text-gray-800">180+</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <button className="flex-1 py-3 bg-gray-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-black transition-all">
                      Communicate
                    </button>
                    <button 
                      onClick={() => { setSelectedStaff(hod); setIsAssignModalOpen(true); }}
                      className="flex-1 py-3 bg-amber-50 text-amber-600 border border-amber-200 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-amber-500 hover:text-white transition-all"
                    >
                      Management
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Assign Modal */}
      {isAssignModalOpen && selectedStaff && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm" onClick={() => setIsAssignModalOpen(false)}></div>
          <div className="relative bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl border border-gray-100 p-10 animate-in zoom-in slide-in-from-bottom-8">
            <h3 className={`text-2xl font-black text-gray-900 mb-2 tracking-tight`}>Assign Responsibility</h3>
            <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-8">Role: {selectedStaff.role} • {selectedStaff.name}</p>
            
            <form onSubmit={handleAssignSubject} className="space-y-6">
              <div>
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5 ml-1">Type or Select Duty</label>
                <input 
                  type="text"
                  className="w-full px-5 py-4 rounded-2xl border-2 border-gray-50 bg-gray-50 focus:bg-white focus:border-red-500 outline-none transition-all font-bold text-gray-700"
                  required
                  placeholder="e.g., Exam Cell Coordinator"
                  value={newSubject}
                  onChange={(e) => setNewSubject(e.target.value)}
                />
              </div>

              <div className="pt-4 flex gap-4">
                <button 
                  type="button"
                  onClick={() => setIsAssignModalOpen(false)}
                  className="flex-1 py-4 bg-gray-100 text-gray-500 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className={`flex-[2] bg-red-600 text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:brightness-110 shadow-xl`}
                >
                  Confirm Assignment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default StaffManagement;
