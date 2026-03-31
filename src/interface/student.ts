/* eslint-disable @typescript-eslint/no-explicit-any */
export interface StudentFeeProps {
  studentFees: any[];
  loading?: boolean;
  onView?: (fee: any) => void;
  onEdit?: (fee: any) => void;
  onDelete?: (fee: any) => void;
  onDownload?: (fee: any) => void;
  onPay?: (fee: any) => void;
  onAddFee?: (feeData: any) => void;
  student?: any;
  refetch?: () => void;
}
export interface StudentFeeProps {
  studentFees: any[];
  loading?: boolean;
  onView?: (fee: any) => void;
  onEdit?: (fee: any) => void;
  onDelete?: (fee: any) => void;
  onDownload?: (fee: any) => void;
  onPay?: (fee: any) => void;
  onAddFee?: (feeData: any) => void;
  student?: any;
  refetch?: () => void;
}

export interface ReceiptHistoryProps {
  studentId: string;
  studentName: string;
}
export interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}
export interface PageProps {
  params: {
    id: string;
  };
}
