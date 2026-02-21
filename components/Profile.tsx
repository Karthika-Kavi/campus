
import React, { useState } from 'react';
import { User, Role } from '../types';

interface ProfileProps {
  user: User;
}

interface Certificate {
  id: string;
  name: string;
  url: string;
  date: string;
}

const Profile: React.FC<ProfileProps> = ({ user }) => {
  const [certificates, setCertificates] = useState<Certificate[]>([
    { id: 'c1', name: 'Cloud Computing Specialization', url: '#', date: 'Jan 2024' },
    { id: 'c2', name: 'Advanced Java Certification', url: '#', date: 'Mar 2023' }
  ]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      // Fix: Explicitly type 'file' as 'any' to resolve 'unknown' type errors on lines 27 and 28
      const newCerts: Certificate[] = Array.from(files).map((file: any) => ({
        id: Math.random().toString(36).substr(2, 9),
        name: file.name.replace(/\.[^/.]+$/, ""),
        url: URL.createObjectURL(file),
        date: new Date().toLocaleDateString('en-GB', { month: 'short', year: 'numeric' })
      }));
      setCertificates(prev => [...newCerts, ...prev]);
    }
  };

  const deleteCertificate = (id: string) => {
    if (window.confirm("Are you sure you want to remove this certificate from your profile?")) {
      setCertificates(prev => prev.filter(c => c.id !== id));
    }
  };

  const isStudent = user.role === Role.STUDENT;

  return (
    <div className="space-y-8">
      {/* Hero Profile Card */}
      <div className="bg-white rounded-[2rem] shadow-xl border border-gray-100 overflow-hidden">
        <div className="h-48 bg-gradient-to-r from-red-600 to-red-400 relative">
          <div className="absolute -bottom-16 left-12 p-2 bg-white rounded-[2rem] shadow-2xl border-4 border-white">
            <img 
              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.id}`} 
              className="w-32 h-32 rounded-[1.5rem] bg-red-50 object-cover"
              alt="Profile"
            />
          </div>
          <label className="absolute top-6 right-8 bg-white/20 backdrop-blur-md text-white px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest border border-white/30 hover:bg-white/30 transition-all cursor-pointer">
            <i className="fa-solid fa-camera mr-2"></i> Update Cover
            <input type="file" className="hidden" accept="image/*" />
          </label>
        </div>
        <div className="pt-20 pb-10 px-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center space-x-3 mb-1">
              <h2 className="text-3xl font-black text-gray-900 tracking-tight">{user.name}</h2>
              <span className={`px-3 py-1 ${isStudent ? 'bg-red-100 text-red-600' : 'bg-amber-100 text-amber-600'} text-[10px] font-black uppercase rounded-lg tracking-widest`}>
                Verified {user.role}
              </span>
            </div>
            <p className="text-gray-500 font-medium">{user.email}</p>
          </div>
          <div className="flex space-x-3">
            <div className="text-center px-6 py-2 bg-gray-50 rounded-2xl border border-gray-100">
              <p className="text-[10px] font-black text-gray-400 uppercase mb-0.5 tracking-tighter">Campus ID</p>
              <p className="font-bold text-gray-800 text-sm uppercase">{user.regNo || user.staffId}</p>
            </div>
            <div className="text-center px-6 py-2 bg-gray-50 rounded-2xl border border-gray-100">
              <p className="text-[10px] font-black text-gray-400 uppercase mb-0.5 tracking-tighter">Department</p>
              <p className="font-bold text-gray-800 text-[10px] uppercase">{user.department.split(' ')[0]}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Certificates Section - Now accessible to everyone including students */}
          <div className="bg-white p-10 rounded-[2.5rem] shadow-xl border border-gray-100">
            <div className="flex justify-between items-center mb-10 pb-6 border-b border-gray-50">
              <div>
                <h3 className="text-2xl font-black flex items-center text-gray-900 tracking-tight">
                  <i className="fa-solid fa-award text-red-600 mr-4 text-3xl"></i>
                  Portfolio & Certifications
                </h3>
                <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-1">Manage your academic achievements</p>
              </div>
              <label className="flex items-center px-5 py-3 bg-red-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-lg shadow-red-100 cursor-pointer hover:bg-red-700 hover:scale-105 transition-all">
                <i className="fa-solid fa-plus-circle mr-2 text-sm"></i>
                Add New
                <input 
                  type="file" 
                  className="hidden" 
                  multiple 
                  accept=".pdf,image/*" 
                  onChange={handleFileUpload} 
                />
              </label>
            </div>

            {certificates.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {certificates.map((cert) => (
                  <div key={cert.id} className="p-6 bg-gray-50 rounded-[2rem] border border-gray-100 hover:bg-white hover:shadow-xl hover:border-red-100 transition-all group">
                    <div className="flex items-start justify-between mb-6">
                      <div className="w-14 h-14 bg-white rounded-2xl shadow-sm text-red-600 flex items-center justify-center border border-gray-50 group-hover:bg-red-600 group-hover:text-white transition-all">
                        <i className="fa-solid fa-file-contract text-2xl"></i>
                      </div>
                      <button 
                        onClick={() => deleteCertificate(cert.id)}
                        className="text-gray-300 hover:text-red-500 transition-colors p-2"
                      >
                        <i className="fa-solid fa-trash-can text-sm"></i>
                      </button>
                    </div>
                    <div className="mb-6 min-h-[48px]">
                      <h4 className="font-black text-gray-800 tracking-tight line-clamp-2 leading-tight">{cert.name}</h4>
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-2">Achieved: {cert.date}</p>
                    </div>
                    <div className="flex space-x-2">
                       <button 
                        onClick={() => window.open(cert.url, '_blank')}
                        className="flex-1 py-3 bg-gray-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-black transition-all flex items-center justify-center"
                       >
                         <i className="fa-solid fa-eye mr-2"></i> View
                       </button>
                       <a 
                        href={cert.url} 
                        download={cert.name}
                        className="w-12 py-3 bg-white border border-gray-200 text-gray-500 rounded-xl hover:bg-red-50 hover:text-red-600 transition-all flex items-center justify-center"
                       >
                         <i className="fa-solid fa-download"></i>
                       </a>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-24 flex flex-col items-center justify-center opacity-30">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                  <i className="fa-solid fa-folder-open text-4xl text-gray-300"></i>
                </div>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">No achievements uploaded yet</p>
              </div>
            )}
          </div>

          <div className="bg-white p-8 rounded-[2rem] shadow-lg border border-gray-100">
            <div className="flex justify-between items-center mb-8 border-b border-gray-50 pb-4">
              <h3 className="text-xl font-black flex items-center text-gray-900 tracking-tight">
                <i className="fa-solid fa-graduation-cap text-red-600 mr-3"></i>
                Academic Performance
              </h3>
              {isStudent && (
                 <div className="text-right">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Aggregate Internals</p>
                    <p className="text-2xl font-black text-red-600">{user.internalMarks}%</p>
                 </div>
              )}
            </div>
            
            <div className="grid grid-cols-1 gap-6">
              {isStudent ? (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-5 rounded-2xl bg-gray-50 border border-gray-100">
                      <p className="text-[10px] font-black text-gray-400 uppercase mb-1 tracking-widest">Register Number</p>
                      <p className="text-lg font-black text-gray-800 tracking-tighter">{user.regNo}</p>
                    </div>
                    <div className="p-5 rounded-2xl bg-gray-50 border border-gray-100">
                      <p className="text-[10px] font-black text-gray-400 uppercase mb-1 tracking-widest">Date of Birth</p>
                      <p className="text-lg font-black text-gray-800 tracking-tighter">{user.dob}</p>
                    </div>
                  </div>

                  <div className="mt-4">
                    <h4 className="text-xs font-black text-gray-400 uppercase tracking-[0.3em] mb-6 flex items-center">
                      <span className="w-10 h-px bg-gray-100 mr-4"></span>
                      Subject-wise Internal Marks
                      <span className="w-10 h-px bg-gray-100 ml-4"></span>
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {user.subjectMarks ? Object.entries(user.subjectMarks).map(([subject, marks]) => (
                        <div key={subject} className="p-5 rounded-3xl bg-white border border-gray-100 hover:border-red-200 transition-all shadow-sm flex items-center justify-between group">
                          <div className="flex items-center space-x-4">
                             <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center font-black text-xs border border-red-100">
                                {subject.charAt(0)}
                             </div>
                             <div>
                                <p className="text-sm font-black text-gray-800 tracking-tight">{subject}</p>
                                <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">Core Paper</p>
                             </div>
                          </div>
                          <div className="text-right">
                            <p className={`text-xl font-black ${(marks as number) > 80 ? 'text-green-600' : (marks as number) > 40 ? 'text-amber-600' : 'text-red-600'}`}>
                               {marks}
                            </p>
                            <div className="w-12 h-1 bg-gray-100 rounded-full mt-1 overflow-hidden">
                               <div className={`h-full ${(marks as number) > 80 ? 'bg-green-500' : (marks as number) > 40 ? 'bg-amber-500' : 'bg-red-500'}`} style={{width: `${marks}%`}}></div>
                            </div>
                          </div>
                        </div>
                      )) : (
                        <p className="text-gray-400 text-sm font-medium italic col-span-2 text-center py-10">Detailed marks breakdown not yet released.</p>
                      )}
                    </div>
                  </div>
                </>
              ) : (
                <div className="p-5 rounded-2xl bg-gray-50 border border-gray-100">
                  <p className="text-xs font-bold text-gray-400 uppercase mb-3 tracking-widest">Assigned Faculty Subjects</p>
                  <div className="flex flex-wrap gap-2">
                    {user.assignedSubjects?.map(subj => (
                      <span key={subj} className="px-4 py-2 bg-white border border-gray-200 rounded-xl font-bold text-sm text-gray-700 shadow-sm">
                        {subj}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-8">
           <div className="bg-white p-8 rounded-[2rem] shadow-lg border border-gray-100">
            <h3 className="text-lg font-black text-gray-900 mb-6 tracking-tight">Support & Information</h3>
            <div className="space-y-6">
               <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-red-600">
                    <i className="fa-solid fa-phone"></i>
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Emergency Helpline</p>
                    <p className="text-sm font-black text-gray-800">+91 999 888 7777</p>
                  </div>
               </div>
               <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-red-600">
                    <i className="fa-solid fa-envelope"></i>
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Office Registry</p>
                    <p className="text-sm font-black text-gray-800">admin@sasurie.edu</p>
                  </div>
               </div>
               <hr className="border-gray-50" />
               <button className="w-full py-4 bg-gray-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-black transition-all shadow-xl shadow-gray-200">
                  Request Detail Change
               </button>
            </div>
           </div>

           <div className="bg-red-700 p-8 rounded-[2.5rem] text-white shadow-xl shadow-red-100 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform"></div>
              <h4 className="text-xl font-black mb-2 flex items-center">
                 <i className="fa-solid fa-star text-amber-400 mr-2"></i> Rank: Distinction
              </h4>
              <p className="text-sm text-red-100 font-medium mb-6">You are in the top 10% of your department this semester. Keep it up!</p>
              <div className="w-full bg-white/20 h-2 rounded-full overflow-hidden">
                 <div className="h-full bg-amber-400" style={{width: '92%'}}></div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
