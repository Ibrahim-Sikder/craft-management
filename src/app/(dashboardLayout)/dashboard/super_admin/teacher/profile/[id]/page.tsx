
import type { Metadata } from 'next'
import TeacherProfile from '../_components/TeacherProfile'

export const metadata: Metadata = {
  title: 'Teacher Profile',
  description: 'Teacher profile dashboard',
}

export default function TeacherProfilePage({ params }: { params: { id: string } }) {
  return <TeacherProfile params={params} />
}