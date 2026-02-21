
import React from 'react';
import { Role, User } from '../types';

interface SidebarProps {
  user: User;
  activeTab: string;
  onNavigate: (tab: string) => void;
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ user, activeTab, onNavigate, onLogout }) => {
  const isStudent = user.role === Role.STUDENT;
  const isStaff = user.role === Role.STAFF;
  const isHOD = user.role === Role.HOD;
  const isPrincipal = user.role === Role.PRINCIPAL;

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: 'fa-gauge' },
    { id: 'profile', label: 'My Profile', icon: 'fa-user' },
    ...(!isHOD && !isPrincipal ? [{ id: 'attendance', label: 'Attendance', icon: 'fa-calendar-check' }] : []),
    ...(isPrincipal ? [] : [{ id: 'timetable', label: 'Timetable', icon: 'fa-clock' }]),
    ...(isStudent ? [
      { id: 'skills', label: 'Skill Hub', icon: 'fa-bolt' },
      { id: 'notes', label: 'Notes & Assignments', icon: 'fa-file-lines' },
    ] : []),
    ...(isStaff ? [
      ...(user.isMentor ? [{ id: 'mentor-wards', label: 'My Wards', icon: 'fa-user-group' }] : []),
      { id: 'workdone', label: 'Work Done', icon: 'fa-list-check' },
      { id: 'notes', label: 'Upload Content', icon: 'fa-upload' },
    ] : []),
    ...(isHOD || isPrincipal ? [
      { id: 'staff-management', label: 'Faculty Directory', icon: 'fa-users-gear' },
      { id: 'student-management', label: 'Student Directory', icon: 'fa-user-graduate' },
      { id: 'announcements', label: isPrincipal ? 'College Notices' : 'Send Notices', icon: 'fa-bullhorn' },
    ] : []),
    ...(isPrincipal ? [] : [
      { id: 'leave', label: 'Leave Manager', icon: 'fa-envelope-open-text' },
      { id: 'gatepass', label: 'Gate Pass', icon: 'fa-id-card' }
    ]),
  ];

  return (
    <aside className="w-full md:w-64 bg-white border-r border-gray-200 flex flex-col h-auto md:h-screen sticky top-0 z-40">
      <div className="p-6 flex items-center space-x-3 border-b border-gray-100">
        <div className={`w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-red-100`}>
          {isPrincipal ? 'P' : 'S'}
        </div>
        <span className="text-xl font-bold tracking-tight text-gray-800">SASURIE HUB</span>
      </div>

      <nav className="flex-1 overflow-y-auto p-4 space-y-1">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
              activeTab === item.id 
                ? `bg-red-50 text-red-600 font-semibold` 
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <i className={`fa-solid ${item.icon} w-6 text-center`}></i>
            <span className="text-sm">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-gray-100">
        <button 
          onClick={onLogout}
          className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 transition-all font-medium"
        >
          <i className="fa-solid fa-right-from-bracket w-6 text-center"></i>
          <span className="text-sm">Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
