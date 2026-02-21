
import React, { useState, useEffect } from 'react';
import { Role, User, LeaveRequest, GatePass, Note, WorkDone, AttendanceStatus } from './types';
import { MOCK_STUDENTS, MOCK_STAFF, MOCK_HOD } from './constants.tsx';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Profile from './components/Profile';
import Attendance from './components/Attendance';
import Timetable from './components/Timetable';
import SkillDevelopment from './components/SkillDevelopment';
import LeaveModule from './components/LeaveModule';
import GatePassModule from './components/GatePassModule';
import WorkDoneTracker from './components/WorkDoneTracker';
import NotesAssignments from './components/NotesAssignments';
import StaffManagement from './components/StaffManagement';
import HodAnnouncements from './components/HodAnnouncements';
import MentorWards from './components/MentorWards';
import StudentManagement from './components/StudentManagement';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [history, setHistory] = useState<string[]>(['dashboard']);
  
  // Central Data States
  const [leaves, setLeaves] = useState<LeaveRequest[]>([
    // Fixed: Added missing required 'department' property
    { id: 'l1', userId: 's1', userName: 'Abinaya A', reason: 'Medical Checkup', status: 'PENDING', date: '2024-10-12', type: 'STUDENT', department: 'Computer Science and Engineering' }
  ]);
  const [gatePasses, setGatePasses] = useState<GatePass[]>([
    { id: 'g1', studentId: 's1', studentName: 'Abinaya A', reason: 'Emergency at home', date: '2024-10-10', time: '14:30', status: 'APPROVED' }
  ]);
  const [notes, setNotes] = useState<Note[]>([
    { 
      id: 'syl-ccs344', 
      staffId: 'st5', 
      subjectId: 'CCS344', 
      title: 'CCS344 Ethical Hacking - Official Syllabus', 
      fileUrl: '#', 
      type: 'SYLLABUS',
      content: `UNIT I INTRODUCTION
Ethical Hacking Overview – Role of Security and Penetration Testers – Penetration Testing Methodologies – Laws of the Land – Overview of TCP/IP – The Application Layer – The Transport Layer – The Internet Layer – IP Addressing – Network and Computer Attacks – Malware – Protecting Against Malware Attacks – Intruder Attacks – Addressing Physical Security.

UNIT II FOOTPRINTING, RECONNAISSANCE AND SCANNING NETWORKS
Footprinting Concepts – Footprinting through Search Engines, Web Services, Social Networking Sites, Website, Email – Competitive Intelligence – Footprinting through Social Engineering – Footprinting Tools – Network Scanning Concepts – Port-Scanning Tools – Scanning Techniques – Scanning Beyond IDS and Firewall.

UNIT III ENUMERATION AND VULNERABILITY ANALYSIS
Enumeration Concepts – NetBIOS Enumeration – SNMP, LDAP, NTP, SMTP and DNS Enumeration – Vulnerability Assessment Concepts – Desktop and Server OS Vulnerabilities – Windows OS Vulnerabilities – Tools for Identifying Vulnerabilities in Windows – Linux OS Vulnerabilities – Vulnerabilities of Embedded OS.

UNIT IV SYSTEM HACKING
Hacking Web Servers – Web Application Components – Vulnerabilities – Tools for Web Attackers and Security Testers – Hacking Wireless Networks – Components of a Wireless Network – Wardriving – Wireless Hacking – Tools of the Trade.

UNIT V NETWORK PROTECTION SYSTEMS
Access Control Lists – Cisco Adaptive Security Appliance Firewall – Configuration and Risk Analysis Tools for Firewalls and Routers – Intrusion Detection and Prevention Systems – Network-Based and Host-Based IDSs and IPSs – Web Filtering – Security Incident Response Teams – Honeypots`
    },
    { id: 'n1', staffId: 'st1', subjectId: 'BA', title: 'Unit 1: Business Analytics Intro', fileUrl: '#', type: 'NOTE' },
    { id: 'a1', staffId: 'st5', subjectId: 'EH', title: 'Ethical Hacking Lab Manual', fileUrl: '#', deadline: '2024-10-25', type: 'ASSIGNMENT' }
  ]);
  const [workDoneHistory, setWorkDoneHistory] = useState<WorkDone[]>([]);
  const [staffNotices, setStaffNotices] = useState<any[]>([
    { id: '1', title: 'Welcome to Sasurie Hub', content: 'Institutional command center is now active for all departments.', date: 'Oct 15, 2024', target: 'All' }
  ]);

  const [skillMarks, setSkillMarks] = useState<Record<string, number>>({});

  const handleNavigate = (tab: string) => {
    setActiveTab(tab);
    setHistory(prev => [...prev, tab]);
  };

  const handleBack = () => {
    if (history.length > 1) {
      const newHistory = [...history];
      newHistory.pop();
      const prevTab = newHistory[newHistory.length - 1];
      setHistory(newHistory);
      setActiveTab(prevTab);
    }
  };

  useEffect(() => {
    if (user && user.role === Role.STUDENT) {
      const keys = Object.keys(skillMarks);
      const totalSkillScore = keys.reduce((acc: number, key: string) => {
        const val = skillMarks[key];
        return acc + (typeof val === 'number' ? val : 0);
      }, 0);
      
      const bonus = Math.floor(totalSkillScore / 30);
      const studentData = MOCK_STUDENTS.find(s => s.id === user.id);
      const baseMarks = Number(studentData?.internalMarks || 0);
      
      setUser(prev => prev ? ({
        ...prev,
        internalMarks: Math.min(100, baseMarks + bonus)
      }) : null);
    }
  }, [skillMarks, user?.id]);

  if (!user) return <Login onLogin={setUser} />;

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <Dashboard user={user} onNavigate={handleNavigate} notices={staffNotices} />;
      case 'profile': return <Profile user={user} />;
      case 'attendance': return <Attendance user={user} />;
      case 'timetable': return <Timetable user={user} />;
      case 'skills': return <SkillDevelopment user={user} onUpdateSkills={setSkillMarks} />;
      case 'leave': return <LeaveModule user={user} requests={leaves} setRequests={setLeaves} />;
      case 'gatepass': return <GatePassModule user={user} passes={gatePasses} setPasses={setGatePasses} />;
      case 'workdone': return <WorkDoneTracker user={user} history={workDoneHistory} setHistory={setWorkDoneHistory} />;
      case 'notes': return <NotesAssignments user={user} items={notes} setItems={setNotes} />;
      case 'staff-management': return <StaffManagement user={user} />;
      case 'student-management': return <StudentManagement user={user} />;
      case 'announcements': return <HodAnnouncements user={user} announcements={staffNotices} setAnnouncements={setStaffNotices} />;
      case 'mentor-wards': return <MentorWards user={user} />;
      default: return <Dashboard user={user} onNavigate={handleNavigate} notices={staffNotices} />;
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50 text-gray-800">
      <Sidebar 
        user={user} 
        activeTab={activeTab} 
        onNavigate={handleNavigate} 
        onLogout={() => { setUser(null); setHistory(['dashboard']); }}
      />

      <main className="flex-1 overflow-y-auto p-4 md:p-8 relative">
        <div className="max-w-6xl mx-auto pb-24">
          <header className="flex justify-between items-center mb-8 bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
            <div>
              <h1 className="text-xl font-black text-gray-900 capitalize tracking-tight">
                {activeTab.replace('-', ' ')}
              </h1>
              <p className="text-xs text-gray-400 font-bold uppercase">{user.department} Department Portal</p>
            </div>
            <div className="flex items-center space-x-3">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-black text-gray-800">{user.name}</p>
                <p className="text-[10px] text-red-600 font-bold uppercase">{user.role}</p>
              </div>
              <div className="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center text-white font-bold shadow-lg shadow-red-200">
                {user.name.charAt(0)}
              </div>
            </div>
          </header>
          
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            {renderContent()}
          </div>
        </div>

        <button
          onClick={handleBack}
          className="fixed bottom-6 right-6 w-14 h-14 bg-red-600 text-white rounded-full shadow-2xl flex items-center justify-center hover:bg-red-700 hover:scale-110 active:scale-95 transition-all z-50 group border-4 border-white"
        >
          <i className="fa-solid fa-arrow-left text-xl"></i>
        </button>
      </main>
    </div>
  );
};

export default App;
