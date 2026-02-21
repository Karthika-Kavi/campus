
import React from 'react';
import { Role, User } from '../types';
import { MOCK_STUDENTS, MOCK_STAFF, MOCK_HOD, DEPARTMENTS } from '../constants.tsx';

interface DashboardProps {
  user: User;
  onNavigate: (tab: string) => void;
  notices: any[];
}

const Dashboard: React.FC<DashboardProps> = ({ user, onNavigate, notices }) => {
  const isStudent = user.role === Role.STUDENT;
  const isHOD = user.role === Role.HOD;
  const isStaff = user.role === Role.STAFF;
  const isPrincipal = user.role === Role.PRINCIPAL;

  const stats = isStudent ? [
    { label: 'Attendance', value: '88%', icon: 'fa-calendar-check', color: 'bg-green-500', tab: 'attendance' },
    { label: 'Internal Marks', value: user.internalMarks || 0, icon: 'fa-chart-simple', color: 'bg-red-500', tab: 'profile' },
    { label: 'Skills Progress', value: '65%', icon: 'fa-bolt', color: 'bg-blue-500', tab: 'skills' },
    { label: 'Assignments', value: '2 Pending', icon: 'fa-file-pen', color: 'bg-amber-500', tab: 'notes' },
  ] : isPrincipal ? [
    { label: 'Overall Student Count', value: '1,240+', icon: 'fa-user-graduate', color: 'bg-red-700', tab: 'student-management' },
    { label: 'Faculty Directory', value: MOCK_STAFF.length + MOCK_HOD.length, icon: 'fa-users-gear', color: 'bg-red-800', tab: 'staff-management' },
    { label: 'Academic Monitors', value: MOCK_STAFF.filter(s => s.isMentor).length, icon: 'fa-user-shield', color: 'bg-red-900', tab: 'dashboard' },
  ] : isHOD ? [
    { label: 'Total Students', value: MOCK_STUDENTS.length, icon: 'fa-user-graduate', color: 'bg-red-600', tab: 'student-management' },
    { label: 'Dept Faculty', value: MOCK_STAFF.length, icon: 'fa-users', color: 'bg-blue-600', tab: 'staff-management' },
    { label: 'Pending Leaves', value: '5', icon: 'fa-envelope-open', color: 'bg-amber-500', tab: 'leave' },
  ] : [
    { label: 'Assigned Classes', value: user.assignedSubjects?.length || 0, icon: 'fa-school', color: 'bg-red-500', tab: 'dashboard' },
    { label: 'Leave Requests', value: '3 New', icon: 'fa-envelope-open', color: 'bg-blue-500', tab: 'leave' },
    { label: 'Attendance Taken', value: '95%', icon: 'fa-check-double', color: 'bg-green-500', tab: 'attendance' },
    { label: 'Syllabus Coverage', value: '45%', icon: 'fa-percent', color: 'bg-purple-500', tab: 'workdone' },
  ];

  const monitors = MOCK_STAFF.filter(s => s.isMentor);

  if (isPrincipal) {
    return (
      <div className="space-y-8 animate-in fade-in duration-700">
        {/* Principal Global Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-gray-50 flex items-center space-x-6 hover:shadow-2xl transition-all group"
            >
              <div className={`w-16 h-16 ${stat.color} rounded-3xl flex items-center justify-center text-white shadow-lg text-2xl group-hover:scale-110 transition-transform`}>
                <i className={`fa-solid ${stat.icon}`}></i>
              </div>
              <div>
                <p className="text-gray-400 text-xs font-black uppercase tracking-[0.2em] mb-1">{stat.label}</p>
                <p className="text-3xl font-black text-gray-900 tracking-tighter">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* College Details Section */}
            <div className="bg-white p-10 rounded-[3rem] shadow-xl border border-gray-100 relative overflow-hidden">
               <div className="absolute top-0 right-0 w-64 h-64 bg-red-50 rounded-full -mr-32 -mt-32 -z-0"></div>
               <div className="relative z-10">
                  <div className="flex items-center space-x-5 mb-10">
                    <div className="w-20 h-20 bg-red-600 rounded-[2rem] flex items-center justify-center text-white text-4xl shadow-2xl">
                      <i className="fa-solid fa-hotel"></i>
                    </div>
                    <div>
                      <h3 className="text-3xl font-black text-gray-900 tracking-tight">College Command Center</h3>
                      <p className="text-sm text-red-600 font-bold uppercase tracking-widest">Sasurie College of Engineering • Global View</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
                    <div className="p-6 bg-gray-50 rounded-3xl border border-gray-100 text-center hover:bg-white hover:shadow-md transition-all">
                      <p className="text-3xl font-black text-red-600 mb-1">{MOCK_HOD.length}</p>
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">HODs</p>
                    </div>
                    <div className="p-6 bg-gray-50 rounded-3xl border border-gray-100 text-center hover:bg-white hover:shadow-md transition-all">
                      <p className="text-3xl font-black text-red-600 mb-1">{monitors.length}</p>
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Active Monitors</p>
                    </div>
                    <div className="p-6 bg-gray-50 rounded-3xl border border-gray-100 text-center hover:bg-white hover:shadow-md transition-all">
                      <p className="text-3xl font-black text-red-600 mb-1">04</p>
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Campus Blocks</p>
                    </div>
                    <div className="p-6 bg-gray-50 rounded-3xl border border-gray-100 text-center hover:bg-white hover:shadow-md transition-all">
                      <p className="text-3xl font-black text-red-600 mb-1">98%</p>
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Placement Avg</p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <h4 className="text-xs font-black text-gray-400 uppercase tracking-[0.3em] flex items-center">
                      <span className="w-8 h-px bg-gray-200 mr-4"></span>
                      Institutional Departments
                      <span className="w-8 h-px bg-gray-200 ml-4"></span>
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {DEPARTMENTS.map((dept, i) => (
                        <div key={i} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-2xl border border-gray-100 group hover:border-red-200 hover:bg-white transition-all">
                          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-red-600 font-black text-xs shadow-sm border border-gray-100">
                            {i+1}
                          </div>
                          <div>
                            <p className="text-sm font-black text-gray-800 tracking-tight">{dept}</p>
                            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Operational Block</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
               </div>
            </div>

            {/* Staff Details Section (Special Page Feature) */}
            <div className="bg-white p-10 rounded-[3rem] shadow-xl border border-gray-100">
              <div className="flex justify-between items-center mb-10">
                 <div>
                    <h3 className="text-2xl font-black text-gray-900 tracking-tight">Faculty Directory Overview</h3>
                    <p className="text-sm text-gray-400 font-bold uppercase tracking-widest">Total Active Staff Across Institution</p>
                 </div>
                 <button onClick={() => onNavigate('staff-management')} className="px-6 py-3 bg-red-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] shadow-lg shadow-red-100">View Full List</button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 {MOCK_STAFF.slice(0, 4).map(staff => (
                    <div key={staff.id} className="flex items-center space-x-4 p-5 bg-gray-50 rounded-[2rem] border border-gray-100 hover:bg-white hover:shadow-xl transition-all group">
                       <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-red-600 text-2xl font-black shadow-sm group-hover:bg-red-600 group-hover:text-white transition-all">
                          {staff.name.charAt(0)}
                       </div>
                       <div className="min-w-0">
                          <h4 className="font-black text-gray-900 truncate">{staff.name}</h4>
                          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest truncate">{staff.department}</p>
                          {staff.isMentor && <span className="mt-1 inline-block px-2 py-0.5 bg-red-100 text-red-600 text-[8px] font-black uppercase rounded">Monitor</span>}
                       </div>
                    </div>
                 ))}
              </div>
            </div>
          </div>

          <div className="space-y-8">
            {/* Principal's Admin Desk */}
            <div className="bg-red-700 p-10 rounded-[3rem] text-white shadow-2xl border-b-8 border-red-900 relative overflow-hidden group">
               <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/10 to-transparent pointer-events-none"></div>
               <h3 className="text-2xl font-black mb-4 flex items-center tracking-tight">
                 <i className="fa-solid fa-crown text-amber-400 mr-4 group-hover:rotate-12 transition-transform"></i>
                 Principal's Desk
               </h3>
               <p className="text-red-100 text-sm mb-10 leading-relaxed font-medium">
                 Central management system for all institutional operations. Issue notices, monitor faculty, and review academic strength.
               </p>
               <div className="space-y-4">
                 <button 
                   onClick={() => onNavigate('announcements')}
                   className="w-full py-4 bg-white text-red-700 rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-[1.02] transition-all shadow-xl flex items-center justify-center"
                 >
                   <i className="fa-solid fa-megaphone mr-2"></i> Post Official Notice
                 </button>
                 <button 
                   onClick={() => onNavigate('student-management')}
                   className="w-full py-4 bg-red-800 text-white border border-red-600 rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-[1.02] transition-all flex items-center justify-center"
                 >
                   <i className="fa-solid fa-graduation-cap mr-2"></i> Student Control
                 </button>
               </div>
            </div>

            {/* Leadership Board (Monitors & HODs) */}
            <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-gray-100">
               <h3 className="text-lg font-black text-gray-900 mb-6 tracking-tight">Leadership Board</h3>
               <div className="space-y-4">
                  <div className="p-5 bg-red-50 rounded-2xl border border-red-100 mb-6">
                    <p className="text-[10px] font-black text-red-600 uppercase tracking-widest mb-1">Head of Campus</p>
                    <p className="text-lg font-black text-gray-900">Dr. R. Kannan</p>
                  </div>
                  <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">Institutional HODs</h4>
                  <div className="space-y-3 max-h-64 overflow-y-auto pr-2">
                    {MOCK_HOD.map(hod => (
                      <div key={hod.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-2xl hover:bg-white hover:shadow-md transition-all group">
                         <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-red-600 font-black text-xs border border-gray-100 group-hover:bg-red-600 group-hover:text-white transition-all">
                           {hod.name.charAt(4)}
                         </div>
                         <div className="min-w-0">
                           <p className="text-xs font-black text-gray-800 truncate">{hod.name}</p>
                           <p className="text-[9px] text-gray-400 font-bold uppercase truncate">{hod.department}</p>
                         </div>
                      </div>
                    ))}
                  </div>
                  
                  <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-8 mb-4">Active Monitors (Mentors)</h4>
                  <div className="flex flex-wrap gap-2">
                     {monitors.map(mentor => (
                        <div key={mentor.id} className="px-3 py-1.5 bg-gray-50 rounded-lg border border-gray-100 text-[9px] font-black text-gray-600 uppercase tracking-widest">
                           {mentor.name}
                        </div>
                     ))}
                  </div>
               </div>
            </div>

            {/* Institutional Resource Hub */}
            <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-gray-100">
              <h3 className="text-lg font-black text-gray-900 mb-6 tracking-tight">Campus Services</h3>
              <div className="grid grid-cols-2 gap-3">
                {['Finance', 'Audit Hub', 'HR System', 'Estate Mgr', 'Admissions', 'Security'].map(item => (
                  <button key={item} className="p-3 text-[10px] font-black uppercase tracking-widest text-gray-500 bg-gray-50 rounded-xl hover:bg-red-50 hover:text-red-700 transition-all">
                    {item}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Standard Dashboard View for Staff/HOD/Student
  return (
    <div className="space-y-6">
      <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-${stats.length} gap-4`}>
        {stats.map((stat, idx) => (
          <button
            key={idx}
            onClick={() => onNavigate(stat.tab)}
            className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center space-x-4 hover:shadow-md transition-all group text-left"
          >
            <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center text-white shadow-lg`}>
              <i className={`fa-solid ${stat.icon} text-xl`}></i>
            </div>
            <div>
              <p className="text-gray-500 text-xs font-medium uppercase tracking-wider">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
            </div>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold mb-4 flex items-center">
              <i className={`fa-solid fa-bullhorn text-red-600 mr-2`}></i>
              {isHOD ? 'Department Sent Notices' : 'Official Announcements'}
            </h3>
            <div className="space-y-4">
              {notices.length > 0 ? notices.filter(n => !n.title.includes("Unit Test 2")).slice(0, 3).map((notice) => (
                <div key={notice.id} className="flex space-x-4 p-4 rounded-xl bg-gray-50 border border-gray-100">
                  <div className={`flex-shrink-0 w-10 h-10 bg-white rounded-lg flex items-center justify-center border border-gray-200 text-red-600 font-bold`}>
                    <i className="fa-solid fa-message text-xs"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">{notice.title}</h4>
                    <p className="text-sm text-gray-500 line-clamp-2">{notice.content}</p>
                    <span className="text-[10px] text-gray-400 mt-2 block font-black uppercase tracking-widest">{notice.date}</span>
                  </div>
                </div>
              )) : (
                <p className="text-gray-400 text-sm font-medium italic p-4 text-center">No recent notices found.</p>
              )}
            </div>
          </div>
          
          {isStaff && (
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold mb-4 flex justify-between items-center">
                <span>My Assigned Subjects</span>
                <span className="text-[10px] font-black text-red-600 uppercase bg-red-50 px-3 py-1 rounded-full">Active Term</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {user.assignedSubjects && user.assignedSubjects.length > 0 ? user.assignedSubjects.map((subject, idx) => (
                  <div key={idx} className="p-4 bg-gray-50 rounded-2xl border border-gray-100 flex items-center space-x-4 group hover:bg-white hover:shadow-md transition-all">
                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-red-600 border border-gray-100 shadow-sm font-black text-xs">
                      {idx + 1}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-black text-gray-800">{subject}</p>
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Section A & B • Room 204</p>
                    </div>
                  </div>
                )) : (
                  <p className="text-gray-400 text-sm font-medium italic col-span-2 text-center py-4">No subjects currently assigned.</p>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold mb-4 tracking-tight">Campus Resource Hub</h3>
            <div className="grid grid-cols-2 gap-3">
              {['Library', 'Exam Cell', 'Holidays', 'Gallery', 'Audit', 'Finance'].map(link => (
                <button key={link} className="p-3 text-[10px] font-black uppercase tracking-widest text-gray-500 bg-gray-50 rounded-xl hover:bg-red-50 hover:text-red-600 transition-all">
                  {link}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
