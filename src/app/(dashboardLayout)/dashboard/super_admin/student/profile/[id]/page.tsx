
import type { Metadata } from 'next'
import StudentProfile from '../__components/StudentProfile'

export const metadata: Metadata = {
  title: 'Teacher Profile',
  description: 'Teacher profile dashboard',
}

export default function TeacherProfilePage({ params }: { params: { id: string } }) {
  return <StudentProfile params={params} />
}

