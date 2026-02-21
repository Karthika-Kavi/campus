
import React, { useState } from 'react';
import { User, Skill } from '../types';

interface SkillProps {
  user: User;
  onUpdateSkills: (marks: Record<string, number>) => void;
}

const SkillDevelopment: React.FC<SkillProps> = ({ user, onUpdateSkills }) => {
  const [skills, setSkills] = useState<Skill[]>([
    { id: 'comm', name: 'Communication Skills', progress: 0, marks: 0 },
    { id: 'apti', name: 'Aptitude', progress: 0, marks: 0 },
    { id: 'logic', name: 'Logical Reasoning', progress: 0, marks: 0 },
  ]);

  const [activeQuiz, setActiveQuiz] = useState<string | null>(null);
  const [showResult, setShowResult] = useState<number | null>(null);

  const startQuiz = (skillId: string) => {
    setActiveQuiz(skillId);
    setShowResult(null);
  };

  const finishQuiz = (score: number) => {
    if (!activeQuiz) return;
    
    const newSkills = skills.map(s => 
      s.id === activeQuiz ? { ...s, progress: 100, marks: score } : s
    );
    setSkills(newSkills);
    
    // Update parent state for internal marks sync
    const markMap: Record<string, number> = {};
    newSkills.forEach(s => markMap[s.id] = s.marks);
    onUpdateSkills(markMap);
    
    setShowResult(score);
    setActiveQuiz(null);
  };

  const totalSkillMarks = skills.reduce((acc, curr) => acc + curr.marks, 0);
  const averageProgress = Math.round(skills.reduce((acc, curr) => acc + curr.progress, 0) / skills.length);

  return (
    <div className="space-y-8">
      {activeQuiz ? (
        <div className="bg-white p-10 rounded-[3rem] shadow-2xl border border-red-50 max-w-2xl mx-auto animate-in zoom-in duration-300">
          <div className="text-center mb-8">
            <span className="px-4 py-1.5 bg-red-100 text-red-600 text-[10px] font-black rounded-full uppercase tracking-widest">Live Quiz Session</span>
            <h3 className="text-2xl font-black mt-4 text-gray-900">{skills.find(s => s.id === activeQuiz)?.name}</h3>
          </div>
          
          <div className="space-y-8">
            <div className="p-8 bg-gray-50 rounded-[2rem] border border-gray-100">
              <p className="font-bold text-xl mb-6 text-gray-800">Q1. Which of the following is an example of non-verbal communication?</p>
              <div className="grid grid-cols-1 gap-4">
                {[
                  { text: 'Speaking clearly', score: 0 },
                  { text: 'Facial expressions', score: 90 },
                  { text: 'Writing an email', score: 0 },
                  { text: 'Listening to music', score: 0 }
                ].map((opt, i) => (
                  <button 
                    key={i} 
                    onClick={() => finishQuiz(opt.score || 85)}
                    className="group p-5 text-left bg-white border-2 border-transparent rounded-2xl hover:border-red-500 hover:bg-red-50/50 transition-all flex items-center shadow-sm"
                  >
                    <span className="w-8 h-8 rounded-lg bg-gray-100 group-hover:bg-red-600 group-hover:text-white flex items-center justify-center font-bold text-sm mr-4 transition-colors">
                      {String.fromCharCode(65 + i)}
                    </span>
                    <span className="font-bold text-gray-700">{opt.text}</span>
                  </button>
                ))}
              </div>
            </div>
            <div className="flex justify-between items-center px-4">
               <span className="text-xs font-bold text-gray-400">Time Left: 09:42</span>
               <div className="flex space-x-1">
                  {[1,2,3,4,5].map(dot => <div key={dot} className={`w-2 h-2 rounded-full ${dot === 1 ? 'bg-red-600' : 'bg-gray-200'}`}></div>)}
               </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          {showResult !== null && (
            <div className="bg-green-600 p-6 rounded-3xl text-white shadow-2xl animate-in slide-in-from-top-10 duration-500 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center text-2xl">
                  🎉
                </div>
                <div>
                  <h4 className="text-xl font-black">Assessment Completed!</h4>
                  <p className="text-green-100 text-sm font-medium">You scored {showResult} / 100. Internal marks updated.</p>
                </div>
              </div>
              <button onClick={() => setShowResult(null)} className="text-white/60 hover:text-white text-2xl">
                 <i className="fa-solid fa-times"></i>
              </button>
            </div>
          )}

          <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-10 rounded-[3rem] text-white shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
            <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-10">
              <div className="max-w-md">
                <h3 className="text-3xl font-black mb-3 leading-tight tracking-tight">Level Up Your Skills</h3>
                <p className="text-gray-400 font-medium">Complete daily challenges in Communication, Aptitude, and Logic to boost your technical profile and internal scores.</p>
                <div className="mt-8 flex items-center space-x-4">
                  <div className="flex -space-x-3">
                    {[1,2,3,4].map(i => <img key={i} src={`https://i.pravatar.cc/100?u=${i}`} className="w-10 h-10 rounded-full border-2 border-gray-900" />)}
                  </div>
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">+120 Others Practicing</p>
                </div>
              </div>
              <div className="flex space-x-12 bg-white/5 backdrop-blur-md p-8 rounded-[2rem] border border-white/10">
                <div className="text-center">
                  <p className="text-4xl font-black text-red-500">{totalSkillMarks}</p>
                  <p className="text-[10px] uppercase font-black text-gray-400 tracking-tighter">Total Credits</p>
                </div>
                <div className="w-px h-12 bg-white/10 self-center"></div>
                <div className="text-center">
                  <p className="text-4xl font-black text-green-500">{averageProgress}%</p>
                  <p className="text-[10px] uppercase font-black text-gray-400 tracking-tighter">Syllabus Meta</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {skills.map(skill => (
              <div key={skill.id} className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-gray-100 group hover:-translate-y-2 transition-all duration-300">
                <div className="w-16 h-16 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-red-600 group-hover:text-white transition-all shadow-sm">
                  <i className={`fa-solid ${skill.id === 'comm' ? 'fa-comments' : skill.id === 'apti' ? 'fa-brain' : 'fa-code-branch'} text-2xl`}></i>
                </div>
                <h4 className="text-xl font-black text-gray-900 mb-2">{skill.name}</h4>
                <p className="text-sm text-gray-500 font-medium mb-8">Curated MCQ sets designed by industry experts to test your edge.</p>
                
                <div className="mb-8">
                  <div className="flex justify-between text-[10px] font-black mb-2">
                    <span className="text-gray-400 uppercase tracking-widest">MASTERY</span>
                    <span className="text-red-600">{skill.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden p-0.5">
                    <div 
                      className="bg-red-500 h-full rounded-full transition-all duration-1000 shadow-[0_0_10px_rgba(239,68,68,0.3)]" 
                      style={{ width: `${skill.progress}%` }}
                    ></div>
                  </div>
                </div>

                {skill.progress === 100 ? (
                  <div className="flex items-center justify-between p-4 bg-green-50 rounded-2xl text-green-700 font-black shadow-sm border border-green-100 animate-in fade-in zoom-in duration-500">
                    <span className="text-sm">SCORE: {skill.marks}</span>
                    <i className="fa-solid fa-circle-check text-xl"></i>
                  </div>
                ) : (
                  <button 
                    onClick={() => startQuiz(skill.id)}
                    className="w-full py-4 bg-gray-900 text-white rounded-2xl font-black hover:bg-black hover:shadow-2xl transition-all flex items-center justify-center group"
                  >
                    START TEST
                    <i className="fa-solid fa-arrow-right ml-2 group-hover:translate-x-1 transition-transform"></i>
                  </button>
                )}
              </div>
            ))}
          </div>

          <div className="p-8 bg-white rounded-[2.5rem] border border-gray-100 shadow-xl flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <div className="relative">
                <div className="w-24 h-24 rounded-full border-[6px] border-red-500 flex items-center justify-center">
                  <span className="text-3xl font-black text-red-600">+{Math.floor(totalSkillMarks / 30)}</span>
                </div>
                <div className="absolute -top-1 -right-1 w-8 h-8 bg-amber-400 rounded-full flex items-center justify-center text-white text-xs border-4 border-white shadow-lg">
                   <i className="fa-solid fa-star"></i>
                </div>
              </div>
              <div className="max-w-md">
                <h4 className="text-xl font-black text-gray-900 mb-1">Impact on Internals</h4>
                <p className="text-sm text-gray-500 font-medium">
                  Your skill development progress has contributed <span className="font-black text-red-600">+{Math.floor(totalSkillMarks / 30)} bonus marks</span> to your current internal assessment score.
                </p>
              </div>
            </div>
            <div className="hidden lg:block text-right">
               <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Status</p>
               <p className="text-green-500 font-black">AUTOMATICALLY SYNCED</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default SkillDevelopment;
