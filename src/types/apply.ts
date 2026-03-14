/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ApplicationRow {
  _id: string;
  applicationId: string;
  status: string;
  academicYear: string;
  nameBangla: string;
  nameEnglish: string;
  studentPhoto?: string;
  department: string;
  class: string;
  _classFlat: string;
  mobile: string;
  fatherMobile: string;
  studentInfo: any;
  parentInfo: any;
  academicInfo: any;
  address: any;
  createdAt?: string;
  updatedAt?: string;
}

export interface AdmissionApplicationListProps {
  type: "pending" | "approved" | "rejected" | "enrolled";
}
