export interface Student {
  _id: string;
  name: string;
  studentId: string;
  mobile: string;
}

export interface Fee {
  _id: string;
  feeType: string;
  month: string;
  class: string;
  amount: number;
  paidAmount: number;
  dueAmount: number;
  status: string;
  academicYear?: string;
  isCurrentMonth?: boolean;
  advanceUsed?: number;
  discount?: number;
  waiver?: number;
  computedDue?: number;
}

export interface Enrollment {
  _id: string;
  rollNumber: string;
  studentName?: string;
  className?: string[];
}

export interface StudentWithFees {
  student: Student;
  enrollment: Enrollment;
  fees: Fee[];
  totalDue: number;
  totalPaid: number;
  totalAmount: number;
  feesCount?: number;
}

export interface Summary {
  totalStudents: number;
  totalFees: number;
  totalDueAmount: number;
  totalPaidAmount: number;
  totalAmount: number;
}

export interface StudentTableRow {
  _id: string;
  studentName: string;
  studentId: string;
  rollNumber: string;
  mobile: string;
  className: string;
  totalAmount: number;
  totalPaid: number;
  totalDue: number;
  feesCount: number;
  overallStatus: string;
}
