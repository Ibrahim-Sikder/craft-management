export type TeacherStatus = "active" | "on leave" | "inactive"

export interface Teacher {
    id:number,
  _id: number
  name: string
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
