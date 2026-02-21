
import React from 'react';
import { MOCK_STUDENTS } from '../constants.tsx';
import { User } from '../types';

interface MentorWardsProps {
  user: User;
}

const MentorWards: React.FC<MentorWardsProps> = ({ user }) => {
  // Only show students from the mentor's specific department
  const myWards = MOCK_STUDENTS.filter(s => s.department === (user.mentorDepartment || user.department));

  return (
    <div className="space-y-6">
      <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-gray-100">
        <div className="flex justify-between items-center mb-8">
           <div>
              <h3 className="text-2xl font-black text-gray-900">My Wards</h3>
              <p className="text-sm text-gray-500 font-medium tracking-tight">Assigned students for {user.mentorDepartment} mentorship program</p>
           </div>
           <div className="px-5 py-2.5 bg-blue-50 text-blue-600 rounded-xl text-xs font-black uppercase tracking-widest">
              Total: {myWards.length} Students
           </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Student Name</th>
                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Reg No</th>
                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Avg Attendance</th>
                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Internals</th>
                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {myWards.map(student => (
                <tr key={student.id} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="px-6 py-4 flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-red-600 font-black text-xs border border-gray-200">
                      {student.name.charAt(0)}
                    </div>
                    <span className="text-sm font-black text-gray-800">{student.name}</span>
                  </td>
                  <td className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">{student.regNo}</td>
                  <td className="px-6 py-4 text-center">
                    <span className="text-sm font-black text-green-600">88%</span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={`px-3 py-1 rounded-lg text-xs font-black ${
                      (student.internalMarks || 0) > 80 ? 'bg-green-100 text-green-600' : 'bg-amber-100 text-amber-600'
                    }`}>
                      {student.internalMarks || 0}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-[10px] font-black text-gray-400 uppercase hover:text-red-600 transition-colors">
                      View Profile
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MentorWards;
