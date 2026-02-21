
import React, { useState } from 'react';
import { MOCK_STUDENTS, DEPARTMENTS } from '../constants.tsx';
import { User, Role } from '../types';

interface StudentManagementProps {
  user: User;
}

const StudentManagement: React.FC<StudentManagementProps> = ({ user }) => {
  const isPrincipal = user.role === Role.PRINCIPAL;
  const isHOD = user.role === Role.HOD;
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDept, setSelectedDept] = useState('ALL');
  
  const initialStudents = isPrincipal ? MOCK_STUDENTS : MOCK_STUDENTS.filter(s => s.department === user.department);
  const [students, setStudents] = useState<any[]>(initialStudents);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [newStudent, setNewStudent] = useState({
    name: '',
    regNo: '',
    email: '',
    dob: '',
    dept: user.department === 'ADMIN' ? 'Computer Science and Engineering' : user.department
  });

  const filteredStudents = students.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase()) || s.regNo?.includes(searchTerm);
    const matchesDept = selectedDept === 'ALL' || s.department === selectedDept;
    return matchesSearch && matchesDept;
  });

  const handleEnroll = (e: React.FormEvent) => {
    e.preventDefault();
    const studentToAdd = {
      id: `s-new-${Date.now()}`,
      name: newStudent.name,
      Name: newStudent.name,
      regNo: newStudent.regNo,
      department: newStudent.dept,
      email: newStudent.email,
      dob: newStudent.dob,
      role: Role.STUDENT,
      internalMarks: 0,
      subjectMarks: {}
    };
    setStudents([studentToAdd, ...students]);
    setIsModalOpen(false);
    alert(`Institutional admission complete for ${newStudent.name}!`);
  };

  return (
    <div className="space-y-6 relative">
      <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-gray-100">
        <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-6 mb-8">
           <div>
              <h3 className="text-2xl font-black text-gray-900">{isPrincipal ? 'Institutional Student Registry' : 'Department Student Directory'}</h3>
              <p className="text-sm text-gray-500 font-medium tracking-tight">
                {isPrincipal 
                  ? `Global database access for ${students.length} active students institution-wide.` 
                  : `Department oversight for ${user.department}`}
              </p>
           </div>
           
           <div className="flex flex-wrap gap-3 w-full xl:w-auto">
              {isPrincipal && (
                <select 
                  className="px-4 py-2.5 rounded-xl border border-gray-200 text-[10px] font-black uppercase outline-none focus:border-red-500 bg-gray-50"
                  value={selectedDept}
                  onChange={(e) => setSelectedDept(e.target.value)}
                >
                  <option value="ALL">All Departments</option>
                  {DEPARTMENTS.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
              )}
              
              <div className="relative flex-1 md:w-64 min-w-[200px]">
                <i className="fa-solid fa-search absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
                <input 
                  type="text" 
                  placeholder="Search student..." 
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-xs font-bold outline-none focus:border-red-500 transition-all"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <button 
                onClick={() => setIsModalOpen(true)}
                className={`px-5 py-2.5 bg-red-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg hover:brightness-110 transition-all flex items-center`}
              >
                <i className="fa-solid fa-user-plus mr-2"></i>
                Admit Student
              </button>
           </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Student Credentials</th>
                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Reg No</th>
                {isPrincipal && <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Department</th>}
                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Internals</th>
                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Admin Control</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredStudents.length > 0 ? filteredStudents.map(student => (
                <tr key={student.id} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="px-6 py-4 flex items-center space-x-4">
                    <div className={`w-10 h-10 rounded-2xl bg-white shadow-sm flex items-center justify-center text-red-600 font-black text-sm border border-gray-100 group-hover:bg-red-600 group-hover:text-white transition-all`}>
                      {student.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-black text-gray-800 tracking-tight">{student.name}</p>
                      <p className="text-[10px] text-gray-400 font-bold uppercase">{student.email}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-[10px] font-black text-gray-500 tracking-widest">{student.regNo}</td>
                  {isPrincipal && (
                    <td className="px-6 py-4">
                       <span className="px-3 py-1 bg-red-50 text-red-600 text-[9px] font-black uppercase rounded-lg border border-red-100">
                         {student.department.split(' ')[0]}
                       </span>
                    </td>
                  )}
                  <td className="px-6 py-4 text-center">
                    <span className={`px-3 py-1 rounded-lg text-xs font-black ${
                      (student.internalMarks || 0) > 80 ? 'bg-green-100 text-green-600' : 
                      (student.internalMarks || 0) > 40 ? 'bg-amber-100 text-amber-600' : 'bg-red-100 text-red-600'
                    }`}>
                      {student.internalMarks || 0}%
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                       <button className="w-8 h-8 rounded-xl bg-gray-50 text-gray-400 hover:text-red-600 transition-all border border-gray-100">
                          <i className="fa-solid fa-file-invoice text-[10px]"></i>
                       </button>
                       <button className="w-8 h-8 rounded-xl bg-gray-50 text-gray-400 hover:text-red-600 transition-all border border-gray-100">
                          <i className="fa-solid fa-pen-to-square text-[10px]"></i>
                       </button>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={isPrincipal ? 5 : 4} className="px-6 py-20 text-center">
                    <i className="fa-solid fa-graduation-cap text-4xl text-gray-100 mb-4"></i>
                    <p className="text-gray-400 font-black uppercase text-[10px] tracking-widest">Registry entry not found</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Enrollment Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
          <div className="relative bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl border border-gray-100 p-10 animate-in zoom-in slide-in-from-bottom-8">
            <h3 className="text-2xl font-black text-gray-900 tracking-tight">New Admission</h3>
            <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-1 mb-8">Official Institutional Entry</p>

            <form onSubmit={handleEnroll} className="space-y-5">
              <div className="space-y-4">
                <input
                  type="text"
                  required
                  className="w-full px-5 py-4 rounded-2xl border-2 border-gray-50 bg-gray-50 focus:bg-white focus:border-red-500 outline-none font-bold text-gray-700"
                  placeholder="Student Full Name"
                  onChange={(e) => setNewStudent({...newStudent, name: e.target.value})}
                />
                <input
                  type="text"
                  required
                  className="w-full px-5 py-4 rounded-2xl border-2 border-gray-50 bg-gray-50 focus:bg-white focus:border-red-500 outline-none font-bold text-gray-700"
                  placeholder="Register Number"
                  onChange={(e) => setNewStudent({...newStudent, regNo: e.target.value})}
                />
                <select 
                   className="w-full px-5 py-4 rounded-2xl border-2 border-gray-50 bg-gray-50 focus:bg-white focus:border-red-500 outline-none font-bold"
                   onChange={e => setNewStudent({...newStudent, dept: e.target.value})}
                 >
                   {DEPARTMENTS.map(dept => <option key={dept} value={dept}>{dept}</option>)}
                 </select>
                <input
                  type="email"
                  required
                  className="w-full px-5 py-4 rounded-2xl border-2 border-gray-50 bg-gray-50 focus:bg-white focus:border-red-500 outline-none font-bold text-gray-700"
                  placeholder="Institutional Email"
                  onChange={(e) => setNewStudent({...newStudent, email: e.target.value})}
                />
              </div>

              <div className="pt-4 flex gap-4">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-4 bg-gray-100 text-gray-500 rounded-2xl font-black text-[10px] uppercase tracking-widest">Cancel</button>
                <button type="submit" className="flex-[2] bg-red-600 text-white py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl">Complete Admission</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentManagement;
