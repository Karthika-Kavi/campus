
export enum Role {
  STUDENT = 'STUDENT',
  STAFF = 'STAFF',
  HOD = 'HOD',
  PRINCIPAL = 'PRINCIPAL'
}

export enum AttendanceStatus {
  PRESENT = 'PRESENT',
  ABSENT = 'ABSENT',
  OD = 'OD'
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  regNo?: string;
  staffId?: string;
  department: string;
  dob?: string;
  internalMarks?: number;
  subjectMarks?: Record<string, number>; // New field for subject-wise breakdown
  assignedSubjects?: string[];
  isMentor?: boolean;
  mentorDepartment?: string;
}

export interface Skill {
  id: string;
  name: string;
  progress: number;
  marks: number;
}

export interface AttendanceRecord {
  studentId: string;
  date: string;
  mentorStatus: AttendanceStatus;
  hourAttendance: AttendanceStatus[];
}

export interface LeaveRequest {
  id: string;
  userId: string;
  userName: string;
  reason: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  date: string; // Used for "Period" or "Duration"
  fileUrl?: string; // For uploaded signed forms
  type: 'STUDENT' | 'STAFF';
  department: string;
  substitutionStaffName?: string; // New field for staff leave substitution
}

export interface GatePass {
  id: string;
  studentId: string;
  studentName: string;
  reason: string;
  date: string;
  time: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
}

export interface WorkDone {
  id: string;
  staffId: string;
  subjectId: string;
  date: string;
  topic: string;
  completionPercentage: number;
}

export interface Note {
  id: string;
  staffId: string;
  subjectId: string;
  title: string;
  fileUrl: string;
  content?: string;
  deadline?: string;
  type: 'NOTE' | 'ASSIGNMENT' | 'SYLLABUS';
}
