export interface PromotionHistoryModalProps {
  open: boolean;
  onClose: () => void;
  studentId: string;
  studentName: string;
}

export interface HistoryItem {
  enrollmentId: string;
  className: string;
  status: string;
  admissionType: string;
  roll: string;
  createdAt: string;
}
