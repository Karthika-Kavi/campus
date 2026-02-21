
import React from 'react';
import { User } from '../types';
import { TIMETABLE } from '../constants.tsx';

interface TimetableProps {
  user: User;
}

const Timetable: React.FC<TimetableProps> = ({ user }) => {
  return (
    <div className="space-y-6">
      {TIMETABLE.map((dayData, idx) => (
        <div key={idx} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="bg-red-600 px-6 py-4 text-white font-bold flex justify-between items-center">
            <span>{dayData.day}</span>
            <span className="text-xs opacity-80 uppercase tracking-widest">Full Day Schedule</span>
          </div>
          <div className="divide-y divide-gray-50">
            {dayData.schedule.map((slot, i) => (
              <div key={i} className="p-4 flex flex-col md:flex-row md:items-center justify-between hover:bg-gray-50 transition-colors">
                <div className="flex items-center space-x-6">
                  <div className="flex-shrink-0 w-12 text-center">
                    <p className="text-xs font-bold text-gray-400 uppercase">Hour</p>
                    <p className="text-xl font-bold text-red-600">{slot.hour}</p>
                  </div>
                  <div className="w-px h-10 bg-gray-100 hidden md:block"></div>
                  <div>
                    <h4 className="font-bold text-gray-800">{slot.subject}</h4>
                    <p className="text-sm text-gray-500">{slot.staff}</p>
                  </div>
                </div>
                <div className="mt-3 md:mt-0 px-4 py-2 bg-gray-100 rounded-xl text-gray-600 text-sm font-semibold">
                  {slot.time}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Timetable;
