import type { Metadata } from "next";
import StudentProfile from "../__components/StudentProfile";

export const metadata: Metadata = {
  title: "Student Profile",
  description: "Student profile dashboard",
};

export default function StudentProfilePage({
  params,
}: {
  params: { id: string };
}) {
  return <StudentProfile params={params} />;
}
