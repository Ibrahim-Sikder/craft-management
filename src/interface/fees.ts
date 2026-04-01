/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dispatch, SetStateAction } from "react";

export interface FeeItem {
  feeType: string;
  amount: number;
  _id: string;
  discount?: number;
  discountType?: "flat" | "percentage";
  advanceAmount?: number;
  isMonthly?: boolean;
  discountRangeStart?: string;
  discountRangeEnd?: string;
  discountRangeAmount?: number;
  isCustom?: boolean;
}

export interface FeeCategory {
  _id: string;
  categoryName: string;
  className: string;
  feeItems: FeeItem[];
  createdAt: string;
  updatedAt: string;
}

export interface AddFeeModalProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  student: any;
  refetch?: () => void;
  debug?: boolean;
}
