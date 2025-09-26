/* eslint-disable @typescript-eslint/no-explicit-any */
export type TeacherStatus = "active" | "on leave" | "inactive"

export interface Teacher {
    id:number,
  _id: number
  name: string
  teacherId:string;
  teacherPhoto: string
  department: string
  status: TeacherStatus
  email: string
  phone: string
  subjects: string[]
  classes: string[]
  experience: number
  rating: string
  performance: number
  students: number
  joinDate: string
  qualifications: string
}
export interface ITimeSlot {
  title?: string
  day: "Saturday" | "Sunday" | "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday"
  startTime: string
  endTime: string
  isActive?: boolean
}
export const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

export interface TimeSlotModalProps {
  open: boolean
  onClose: () => void
  onSave: (timeSlot: ITimeSlot) => void
  initialData?: ITimeSlot
}


export interface FormData {
  name: string
  classes: string
  capacity: number
  teachers: string
  rooms: string
  timeSlots: number[]
  description: string
  sectionType: number
  isActive: boolean
}
export interface Filters {
  class: string;
  subject: string;
  teacher: string;
  date: string;
  hour: string;
}

export interface IncomeItem {
  source: string;
  description: string;
  amount: string;
}

export interface TIncome {
  _id:string;
 category: {
    _id: string;
    name: string;
  };
  note: string;
  incomeDate: Date;
  paymentMethod: string;
  status: string;
  incomeItems: IncomeItem[];
  totalAmount:number
}
export interface TExpense {
  _id:string;
 category: {
    _id: string;
    name: string;
  };
  note: string;
  incomeDate: Date;
  paymentMethod: string;
  status: string;
  incomeItems: IncomeItem[];
  totalAmount:number
}

export interface IDailySession {
  para: string
  page: string
  amount: string
  mistakes: string
}

export interface IDayEntry {
  morning: IDailySession
  afternoon: IDailySession
  night: IDailySession
  totalRead: string
  duaHadithMasala: string
  mashq?: string
  tajweed?: string
}

export interface INazeraReport {
  _id: string
  teacherName: string
  studentName: string
  reportDate: string
  month: string
  weeklyTarget: string
  dailyEntries: {
    saturday: IDayEntry
    sunday: IDayEntry
    monday: IDayEntry
    tuesday: IDayEntry
    wednesday: IDayEntry
    thursday: IDayEntry
    friday: IDayEntry
  }
  totalPages: number
  totalMistakes: number
  totalDuas: number
  totalHadiths: number
  createdAt: string
  updatedAt: string
  totalDuaHadith:any
}

export type SessionKey = keyof Pick<IDayEntry, 'morning' | 'afternoon' | 'night'>;