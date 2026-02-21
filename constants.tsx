
import { Role } from './types';

export const COLORS = {
  primary: '#e11d48', // Red-600
  secondary: '#4b5563',
  present: '#10b981', // Green-500
  absent: '#ef4444',  // Red-500
  od: '#3b82f6',      // Blue-500
  principal: '#b91c1c', // Deep Red
};

export const DEPARTMENTS = [
  "Computer Science and Engineering",
  "Cyber Security",
  "Artificial Intelligence and Data Science (AIDS)",
  "Mechanical Engineering",
  "Electronics and Communication Engineering (ECE)",
  "Electrical and Electronics Engineering (EEE)"
];

// Student Master Database - Expanded with subject-wise internal marks
export const MOCK_STUDENTS = [
  // Computer Science and Engineering
  {
    "id":"s1","Name":"Abinaya A","regNo":"732423104001","department":"Computer Science and Engineering","email":"abinayaa23cse@sasurie.com","dob":"02-05-2006","role":Role.STUDENT,
    "internalMarks":85,
    "subjectMarks": { "Business Analytics": 82, "OOSE": 88, "Embedded Systems": 84, "Ethical Hacking": 86 }
  },
  {
    "id":"s2","Name":"Abinaya S","regNo":"732423104002","department":"Computer Science and Engineering","email":"abinayas23cse@sasurie.com","dob":"23-08-2006","role":Role.STUDENT,
    "internalMarks":88,
    "subjectMarks": { "Business Analytics": 90, "OOSE": 85, "Embedded Systems": 89, "Ethical Hacking": 88 }
  },
  {
    "id":"s3","Name":"Balaji R","regNo":"732423104003","department":"Computer Science and Engineering","email":"balaji23cse@sasurie.com","dob":"12-04-2006","role":Role.STUDENT,
    "internalMarks":76,
    "subjectMarks": { "Business Analytics": 74, "OOSE": 78, "Embedded Systems": 75, "Ethical Hacking": 77 }
  },

  // Cyber Security
  {
    "id":"s6","Name":"Arul Jothi","regNo":"732423204001","department":"Cyber Security","email":"aruljothi23cy@sasurie.com","dob":"14-09-2006","role":Role.STUDENT,
    "internalMarks":82,
    "subjectMarks": { "Network Security": 80, "Cryptography": 84, "Digital Forensics": 82, "Ethical Hacking": 82 }
  },
  {
    "id":"s7","Name":"Hariswa P","regNo":"732423204002","department":"Cyber Security","email":"hariswa23cy@sasurie.com","dob":"03-03-2006","role":Role.STUDENT,
    "internalMarks":89,
    "subjectMarks": { "Network Security": 88, "Cryptography": 90, "Digital Forensics": 89, "Ethical Hacking": 89 }
  },

  // AIDS
  {
    "id":"s11","Name":"Asvika S","regNo":"732423304001","department":"Artificial Intelligence and Data Science (AIDS)","email":"asvika24aids@sasurie.com","dob":"05-05-2006","role":Role.STUDENT,
    "internalMarks":90,
    "subjectMarks": { "Machine Learning": 92, "Big Data Analytics": 88, "Neural Networks": 90, "Python for AI": 90 }
  },

  // Mechanical Engineering
  {
    "id":"s16","Name":"Balasubramaniam","regNo":"732423404001","department":"Mechanical Engineering","email":"bala23mech@sasurie.com","dob":"17-07-2006","role":Role.STUDENT,
    "internalMarks":78,
    "subjectMarks": { "Thermodynamics": 76, "Fluid Mechanics": 80, "Manufacturing Tech": 78, "Machine Design": 78 }
  },

  // ECE
  {
    "id":"s21","Name":"Harishwaran S","regNo":"732423504001","department":"Electronics and Communication Engineering (ECE)","email":"harishwaran23ece@sasurie.com","dob":"23-04-2004","role":Role.STUDENT,
    "internalMarks":77,
    "subjectMarks": { "Digital Electronics": 75, "Microprocessors": 78, "Signals & Systems": 77, "VLSI": 78 }
  },

  // EEE
  {
    "id":"s26","Name":"Priyadharshini","regNo":"732423604001","department":"Electrical and Electronics Engineering (EEE)","email":"priya23eee@sasurie.com","dob":"13-07-2006","role":Role.STUDENT,
    "internalMarks":86,
    "subjectMarks": { "Power Systems": 84, "Electrical Machines": 88, "Control Systems": 86, "Renewable Energy": 86 }
  }
].map(s => ({
  ...s,
  name: s.Name,
}));

// Staff Master Database
const RAW_STAFF_DATA = [
  { "staffName": "S. Prabakaran", "department": "Computer Science and Engineering", "subjectHandling": "Business Analytics", "isMentor": true, "mentorDepartment": "Computer Science and Engineering" },
  { "staffName": "V. Gunasundhari", "department": "Cyber Security", "subjectHandling": "Network Security", "isMentor": true, "mentorDepartment": "Cyber Security" },
  { "staffName": "K. Vinitha", "department": "Artificial Intelligence and Data Science (AIDS)", "subjectHandling": "Machine Learning", "isMentor": true, "mentorDepartment": "Artificial Intelligence and Data Science (AIDS)" },
  { "staffName": "C. Kiruthika", "department": "Mechanical Engineering", "subjectHandling": "Thermodynamics", "isMentor": false },
  { "staffName": "E. Senthil Kumar", "department": "Electronics and Communication Engineering (ECE)", "subjectHandling": "Digital Electronics", "isMentor": true, "mentorDepartment": "Electronics and Communication Engineering (ECE)" },
  { "staffName": "A. Divya", "department": "Electrical and Electronics Engineering (EEE)", "subjectHandling": "Power Systems", "isMentor": false },
  { "staffName": "Maheswari", "department": "Cyber Security", "subjectHandling": "Information Security", "isMentor": false },
  { "staffName": "Dinesh", "department": "Computer Science and Engineering", "subjectHandling": "Operating Systems", "isMentor": false },
  { "staffName": "Sabarishwari", "department": "Artificial Intelligence and Data Science (AIDS)", "subjectHandling": "Data Mining", "isMentor": false }
];

export const MOCK_STAFF = RAW_STAFF_DATA.map((staff, index) => ({
  id: `st${index + 1}`,
  staffId: `SAS-STF-${(index + 1).toString().padStart(2, '0')}`,
  name: staff.staffName,
  email: `${staff.staffName.toLowerCase().replace(/\s+/g, '')}@sasurie.com`,
  password: 'Staff@123',
  role: Role.STAFF,
  department: staff.department,
  assignedSubjects: [staff.subjectHandling],
  isMentor: staff.isMentor,
  mentorDepartment: staff.mentorDepartment || ''
}));

export const MOCK_HOD = [
  { id: 'hod1', name: 'Dr. Dinesh', email: 'hoddinesh@sasurie.edu', role: Role.HOD, department: 'Computer Science and Engineering' },
  { id: 'hod2', name: 'Dr. Maheswari', email: 'hodmaheswari@sasurie.edu', role: Role.HOD, department: 'Cyber Security' },
  { id: 'hod3', name: 'Dr. Vinitha', email: 'hodvinitha@sasurie.edu', role: Role.HOD, department: 'Artificial Intelligence and Data Science (AIDS)' },
  { id: 'hod4', name: 'Dr. Senthil Kumar', email: 'hodsenthil@sasurie.edu', role: Role.HOD, department: 'Mechanical Engineering' },
  { id: 'hod5', name: 'Dr. Kiruthika', email: 'hodkiruthika@sasurie.edu', role: Role.HOD, department: 'Electronics and Communication Engineering (ECE)' },
  { id: 'hod6', name: 'Dr. Divya', email: 'hoddivya@sasurie.edu', role: Role.HOD, department: 'Electrical and Electronics Engineering (EEE)' },
  { id: 'hod7', name: 'Dr. Gunasundhari', email: 'hodguna@sasurie.edu', role: Role.HOD, department: 'Cyber Security' },
  { id: 'hod8', name: 'Dr. Sabarishwari', email: 'hodsabari@sasurie.edu', role: Role.HOD, department: 'Artificial Intelligence and Data Science (AIDS)' }
];

export const MOCK_PRINCIPAL = [
  { id: 'prin1', name: 'Dr. R. Kannan', email: 'principal@sasurie.edu', role: Role.PRINCIPAL, department: 'ADMIN' }
];

export const TIMETABLE = [
  { day: 'Monday', schedule: [
    { hour: 1, subject: 'Business Analytics', staff: 'S. Prabakaran', time: '09:00 - 10:00' },
    { hour: 2, subject: 'Ethical Hacking', staff: 'E. Senthil Kumar', time: '10:00 - 11:00' },
  ]}
];
