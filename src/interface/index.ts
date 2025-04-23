export type TeacherStatus = "active" | "on leave" | "inactive"

export interface Teacher {
    id:number,
  _id: number
  name: string
  avatar: string
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