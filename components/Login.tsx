
import React, { useState } from 'react';
import { Role, User } from '../types';
import { MOCK_STUDENTS, MOCK_STAFF, MOCK_HOD, MOCK_PRINCIPAL } from '../constants.tsx';

interface LoginProps {
  onLogin: (user: User) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [role, setRole] = useState<Role>(Role.STUDENT);
  const [regNo, setRegNo] = useState('');
  const [dob, setDob] = useState('');
  const [staffId, setStaffId] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showStaffPassword, setShowStaffPassword] = useState(false);
  const [error, setError] = useState('');
  const [showDemo, setShowDemo] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    let foundUser: any = null;
    if (role === Role.STUDENT) {
      foundUser = MOCK_STUDENTS.find(s => s.regNo === regNo && s.dob === dob);
    } else if (role === Role.STAFF) {
      foundUser = MOCK_STAFF.find(s => s.staffId === staffId && s.password === password);
    } else if (role === Role.HOD) {
      foundUser = MOCK_HOD.find(h => h.email === email);
    } else {
      foundUser = MOCK_PRINCIPAL.find(p => p.email === email);
    }

    if (foundUser) {
      const userObj: User = {
        id: foundUser.id,
        name: foundUser.Name || foundUser.name,
        email: foundUser.email || foundUser.EmailID,
        role: foundUser.role,
        regNo: foundUser.regNo,
        staffId: foundUser.staffId,
        department: foundUser.department,
        dob: foundUser.dob,
        internalMarks: foundUser.internalMarks,
        subjectMarks: foundUser.subjectMarks, 
        assignedSubjects: foundUser.assignedSubjects,
        isMentor: foundUser.isMentor,
        mentorDepartment: foundUser.mentorDepartment
      };
      onLogin(userObj);
    } else {
      setError('Invalid credentials. Please check and try again.');
    }
  };

  const fillDemo = (r: Role, idx: number = 0) => {
    setRole(r);
    if (r === Role.STUDENT) {
      const students = MOCK_STUDENTS;
      setRegNo(students[idx]?.regNo || students[0].regNo!);
      setDob(students[idx]?.dob || students[0].dob!);
    } else if (r === Role.STAFF) {
      setStaffId(MOCK_STAFF[idx].staffId!);
      setPassword(MOCK_STAFF[idx].password);
      setShowStaffPassword(false);
    } else if (r === Role.HOD) {
      setEmail(MOCK_HOD[idx].email);
      setPassword('');
    } else {
      setEmail(MOCK_PRINCIPAL[0].email);
      setPassword('');
    }
  };

  const getThemeColor = () => 'bg-red-600';

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="w-full max-w-md space-y-4">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
          <div className={`${getThemeColor()} p-10 text-white text-center relative overflow-hidden transition-colors duration-500`}>
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
            <h1 className="text-4xl font-black mb-2 tracking-tighter text-white">SASURIE HUB</h1>
            <p className="text-white/80 font-medium opacity-90 text-sm">Campus Management System</p>
          </div>
          
          <form onSubmit={handleLogin} className="p-8 space-y-6">
            <div className="flex bg-gray-100 p-1.5 rounded-2xl mb-6 overflow-x-auto">
              {[Role.STUDENT, Role.STAFF, Role.HOD, Role.PRINCIPAL].map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setRole(r)}
                  className={`flex-none px-4 py-2.5 text-[10px] font-black rounded-xl transition-all uppercase tracking-widest ${
                    role === r ? 'bg-white shadow-md text-red-600' : 'text-gray-400 hover:text-gray-600'
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>

            {error && (
              <div className="p-4 bg-red-50 text-red-600 text-xs font-bold rounded-2xl flex items-center animate-pulse">
                <i className="fa-solid fa-circle-exclamation mr-3 text-lg"></i>
                {error}
              </div>
            )}

            <div className="space-y-4">
              {role === Role.STUDENT ? (
                <div className="animate-in fade-in slide-in-from-top-2 duration-300 space-y-4">
                  <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5 ml-1">Register Number</label>
                    <input
                      type="text"
                      required
                      className="w-full px-5 py-4 rounded-2xl border-2 border-gray-100 focus:border-red-500 outline-none transition-all font-bold text-gray-700"
                      placeholder="7324..."
                      value={regNo}
                      onChange={(e) => setRegNo(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5 ml-1">Date of Birth (DD-MM-YYYY)</label>
                    <input
                      type="text"
                      required
                      className="w-full px-5 py-4 rounded-2xl border-2 border-gray-100 focus:border-red-500 outline-none transition-all font-bold text-gray-700"
                      placeholder="DD-MM-YYYY"
                      value={dob}
                      onChange={(e) => setDob(e.target.value)}
                    />
                  </div>
                </div>
              ) : role === Role.STAFF ? (
                <div className="animate-in fade-in slide-in-from-top-2 duration-300 space-y-4">
                  <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5 ml-1">Staff ID</label>
                    <input
                      type="text"
                      required
                      className="w-full px-5 py-4 rounded-2xl border-2 border-gray-100 focus:border-red-500 outline-none transition-all font-bold text-gray-700"
                      placeholder="e.g., SAS-STF-01"
                      value={staffId}
                      onChange={(e) => setStaffId(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5 ml-1">Password</label>
                    <div className="relative">
                      <input
                        type={showStaffPassword ? "text" : "password"}
                        required
                        className="w-full px-5 py-4 rounded-2xl border-2 border-gray-100 focus:border-red-500 outline-none transition-all font-bold text-gray-700 pr-14"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <button
                        type="button"
                        onClick={() => setShowStaffPassword(!showStaffPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center text-gray-400 hover:text-red-500 transition-colors focus:outline-none"
                      >
                        <i className={`fa-solid ${showStaffPassword ? 'fa-eye-slash' : 'fa-eye'} text-lg`}></i>
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="animate-in fade-in slide-in-from-top-2 duration-300 space-y-4">
                  <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5 ml-1">
                      {role === Role.PRINCIPAL ? 'Principal Email' : 'HOD Email'}
                    </label>
                    <input
                      type="email"
                      required
                      className="w-full px-5 py-4 rounded-2xl border-2 border-gray-100 focus:border-red-500 outline-none transition-all font-bold text-gray-700"
                      placeholder={role === Role.PRINCIPAL ? "principal@sasurie.edu" : "hod@sasurie.edu"}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
              )}
            </div>

            <button
              type="submit"
              className={`w-full ${getThemeColor()} text-white py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:brightness-110 shadow-xl transition-all active:scale-95 flex items-center justify-center group`}
            >
              Sign In to Hub
              <i className="fa-solid fa-arrow-right ml-3 group-hover:translate-x-1 transition-transform"></i>
            </button>
          </form>
        </div>

        <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-4 border border-gray-200 shadow-sm">
          <button 
            onClick={() => setShowDemo(!showDemo)}
            className="w-full flex items-center justify-between text-[10px] font-black text-gray-400 uppercase tracking-widest outline-none"
          >
            <span>Demo Access (Quick Login)</span>
            <i className={`fa-solid fa-chevron-${showDemo ? 'up' : 'down'}`}></i>
          </button>
          
          {showDemo && (
            <div className="mt-4 grid grid-cols-1 gap-2 animate-in fade-in slide-in-from-top-2">
               <button onClick={() => fillDemo(Role.STUDENT, 0)} className="flex items-center justify-between p-3 rounded-xl bg-white border border-gray-100 hover:bg-red-50 transition-all text-left">
                <div>
                  <p className="text-[10px] font-black text-red-600 uppercase">Abinaya A (Student)</p>
                  <p className="text-xs font-bold text-gray-600">CSE Department</p>
                </div>
                <i className="fa-solid fa-graduation-cap text-gray-300"></i>
              </button>
              <button onClick={() => fillDemo(Role.HOD, 0)} className="flex items-center justify-between p-3 rounded-xl bg-white border border-gray-100 hover:bg-red-50 transition-all text-left">
                <div>
                  <p className="text-[10px] font-black text-red-600 uppercase">Dr. Dinesh (HOD)</p>
                  <p className="text-xs font-bold text-gray-600">CSE Department</p>
                </div>
                <i className="fa-solid fa-user-shield text-blue-500"></i>
              </button>
              <button onClick={() => fillDemo(Role.PRINCIPAL)} className="flex items-center justify-between p-3 rounded-xl bg-white border-2 border-red-100 hover:bg-red-50 transition-all text-left">
                <div>
                  <p className="text-[10px] font-black text-red-600 uppercase">Dr. R. Kannan (Principal)</p>
                  <p className="text-xs font-bold text-gray-600">Global Admin Access</p>
                </div>
                <i className="fa-solid fa-crown text-amber-500"></i>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
