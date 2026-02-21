
import React, { useState, useEffect } from 'react';
import { User, Role, AttendanceStatus, AttendanceRecord } from '../types';
import { MOCK_STUDENTS } from '../constants.tsx';

interface AttendanceProps {
  user: User;
}

const Attendance: React.FC<AttendanceProps> = ({ user }) => {
  const isStudent = user.role === Role.STUDENT;
  const isHOD = user.role === Role.HOD;
  const isStaff = user.role === Role.STAFF;
  const isPrincipal = user.role === Role.PRINCIPAL;
  const canMarkMentor = (isStaff && user.isMentor) || isHOD || isPrincipal;

  const [records, setRecords] = useState<AttendanceRecord[]>([]);

  useEffect(() => {
    // Initialize attendance records for all students in the database
    const initial = MOCK_STUDENTS.map(s => ({
      studentId: s.id,
      date: new Date().toISOString().split('T')[0],
      mentorStatus: AttendanceStatus.PRESENT,
      hourAttendance: Array(7).fill(AttendanceStatus.PRESENT)
    }));
    setRecords(initial);
  }, []);

  const updateMentorStatus = (studentId: string, status: AttendanceStatus) => {
    if (!canMarkMentor) {
      alert("Only Mentors, HODs or Principal can update the Master Attendance.");
      return;
    }
    setRecords(prev => prev.map(r => 
      r.studentId === studentId ? { ...r, mentorStatus: status } : r
    ));
  };

  const updateHourStatus = (studentId: string, hourIdx: number, status: AttendanceStatus) => {
    setRecords(prev => prev.map(r => {
      if (r.studentId === studentId) {
        if (r.mentorStatus !== AttendanceStatus.PRESENT) {
          alert("Cannot modify hour status because student is marked ABSENT or OD by Mentor.");
          return r;
        }
        const newHours = [...r.hourAttendance];
        newHours[hourIdx] = status;
        return { ...r, hourAttendance: newHours };
      }
      return r;
    }));
  };

  // Logic to filter which students the current user can see/mark
  const filteredRecords = isPrincipal 
    ? records // Principal sees everyone
    : isHOD 
    ? records.filter(r => MOCK_STUDENTS.find(s => s.id === r.studentId)?.department === user.department)
    : (isStaff && user.isMentor)
    ? records.filter(r => MOCK_STUDENTS.find(s => s.id === r.studentId)?.department === user.mentorDepartment)
    : isStaff
    ? records.filter(r => MOCK_STUDENTS.find(s => s.id === r.studentId)?.department === user.department)
    : records;

  if (isStudent) {
    const studentRecord = records.find(r => r.studentId === user.id);
    return (
      <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
        <h3 className="text-xl font-black mb-8">My Attendance Record</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="p-6 rounded-2xl bg-gray-50 border border-gray-100 text-center">
             <p className="text-[10px] font-black text-gray-400 uppercase mb-2">Master Status (Mentor)</p>
             <div className={`text-lg font-black ${
               studentRecord?.mentorStatus === AttendanceStatus.PRESENT ? 'text-green-600' : 
               studentRecord?.mentorStatus === AttendanceStatus.OD ? 'text-blue-600' : 'text-red-600'
             }`}>
               {studentRecord?.mentorStatus}
             </div>
          </div>
          <div className="md:col-span-2 grid grid-cols-7 gap-2">
            {studentRecord?.hourAttendance.map((status, i) => (
              <div key={i} className="text-center">
                 <p className="text-[10px] font-bold text-gray-400 mb-1">H{i+1}</p>
                 <div className={`w-full py-3 rounded-xl font-black text-xs text-white ${
                   status === AttendanceStatus.PRESENT ? 'bg-green-500' : 'bg-red-500'
                 }`}>
                   {status[0]}
                 </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
           <h3 className="font-black text-gray-900">Attendance Entry Console</h3>
           <p className="text-xs text-gray-400">
             {isPrincipal ? "Global Institution Tracking" : (canMarkMentor ? `Master Attendance: ${user.mentorDepartment || user.department}` : `Subject Tracking: ${user.assignedSubjects?.[0]}`)}
           </p>
        </div>
        <div className="flex gap-2">
           <div className="flex items-center text-[10px] font-black px-3 py-1.5 bg-green-50 text-green-600 rounded-lg">PRESENT</div>
           <div className="flex items-center text-[10px] font-black px-3 py-1.5 bg-red-50 text-red-600 rounded-lg">ABSENT</div>
           <div className="flex items-center text-[10px] font-black px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg">OD</div>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Student Info</th>
                <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Master (Mentor)</th>
                <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center" colSpan={7}>Session Hours (1 - 7)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredRecords.length > 0 ? filteredRecords.map(record => {
                const student = MOCK_STUDENTS.find(s => s.id === record.studentId);
                const isDisabled = record.mentorStatus !== AttendanceStatus.PRESENT;
                
                return (
                  <tr key={record.studentId} className={`transition-colors ${isDisabled ? 'bg-red-50/5' : 'hover:bg-gray-50/50'}`}>
                    <td className="px-6 py-4">
                      <p className="text-sm font-black text-gray-800">{student?.name}</p>
                      <p className="text-[10px] text-gray-400 font-bold">{student?.regNo}</p>
                      <p className="text-[8px] text-red-600 font-black uppercase">{student?.department.split(' ')[0]}</p>
                    </td>
                    <td className="px-6 py-4">
                      <select 
                        disabled={!canMarkMentor}
                        value={record.mentorStatus}
                        onChange={(e) => updateMentorStatus(record.studentId, e.target.value as AttendanceStatus)}
                        className={`text-[10px] font-black p-2 rounded-xl outline-none ring-2 ring-offset-1 transition-all ${
                          !canMarkMentor ? 'opacity-50 cursor-not-allowed' : ''
                        } ${
                          record.mentorStatus === AttendanceStatus.PRESENT ? 'bg-green-100 text-green-700 ring-green-100' :
                          record.mentorStatus === AttendanceStatus.ABSENT ? 'bg-red-100 text-red-700 ring-red-100' : 'bg-blue-100 text-blue-700 ring-blue-100'
                        }`}
                      >
                        <option value={AttendanceStatus.PRESENT}>Present</option>
                        <option value={AttendanceStatus.ABSENT}>Absent</option>
                        <option value={AttendanceStatus.OD}>OD</option>
                      </select>
                    </td>
                    {record.hourAttendance.map((status, i) => (
                      <td key={i} className="px-1 py-4 text-center">
                        <button
                          disabled={isDisabled}
                          onClick={() => updateHourStatus(record.studentId, i, status === AttendanceStatus.PRESENT ? AttendanceStatus.ABSENT : AttendanceStatus.PRESENT)}
                          className={`w-8 h-8 rounded-xl text-[10px] font-black transition-all ${
                            status === AttendanceStatus.PRESENT ? 'bg-green-500 text-white shadow-sm' : 'bg-red-500 text-white'
                          } ${isDisabled ? 'opacity-10 cursor-not-allowed' : 'hover:scale-110 active:scale-95'}`}
                        >
                          {status[0]}
                        </button>
                      </td>
                    ))}
                  </tr>
                );
              }) : (
                <tr>
                   <td colSpan={9} className="px-6 py-20 text-center">
                      <i className="fa-solid fa-users-slash text-4xl text-gray-100 mb-4"></i>
                      <p className="text-gray-400 font-black uppercase text-[10px] tracking-widest">No students found in this department</p>
                   </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Attendance;
