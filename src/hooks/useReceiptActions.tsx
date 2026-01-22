/* eslint-disable @typescript-eslint/no-explicit-any */
import { generateReceiptHTML } from "@/utils/receiptUtils";
import React from "react";

interface UseReceiptActionsProps {
  setSnackbar: React.Dispatch<
    React.SetStateAction<{
      open: boolean;
      message: string;
      severity: "success" | "error" | "info" | "warning";
    }>
  >;
  refetch: () => void;
  setSelectedReceipt: React.Dispatch<React.SetStateAction<any>>;
  setShowDialog: React.Dispatch<React.SetStateAction<boolean>>;
  setShowCraftReceipt: React.Dispatch<React.SetStateAction<boolean>>;
  studentName: string;
}

export const useReceiptActions = ({
  setSnackbar,
  refetch,
  setSelectedReceipt,
  setShowDialog,
  setShowCraftReceipt,
  studentName,
}: UseReceiptActionsProps) => {
  // টেস্ট ডিলিট ফাংশন
  const handleDeleteReceipt = (receipt: any) => {
    console.log("Deleting receipt:", receipt.receiptNo);
    // এখানে আপনার ডিলিট API কল যোগ করুন
    setSnackbar({
      open: true,
      message: `Receipt ${receipt.receiptNo} marked for deletion`,
      severity: "warning",
    });
  };

  // টেস্ট বাল্ক ডিলিট ফাংশন
  const handleBulkDelete = (selectedRows: any[]) => {
    console.log("Bulk deleting receipts:", selectedRows);
    setSnackbar({
      open: true,
      message: `${selectedRows.length} receipts marked for deletion`,
      severity: "warning",
    });
  };

  // রিসিট প্রিন্ট করার ফাংশন
  const handlePrintReceipt = (receipt: any) => {
    const printContent = generateReceiptHTML(receipt, studentName);
    const printWindow = window.open("", "_blank");
    if (printWindow) {
      printWindow.document.write(printContent);
      printWindow.document.close();
      printWindow.focus();
    }
  };

  // রিসিট ডাউনলোড করার ফাংশন
  const handleDownloadReceipt = (receipt: any) => {
    const printContent = generateReceiptHTML(receipt, studentName);
    const blob = new Blob([printContent], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `receipt-${receipt.receiptNo}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // রিসিট ইমেইল করার ফাংশন (টেস্ট)
  const handleEmailReceipt = (receipt: any) => {
    console.log("Emailing receipt:", receipt.receiptNo);
    setSnackbar({
      open: true,
      message: `Receipt ${receipt.receiptNo} emailed successfully`,
      severity: "success",
    });
  };

  // টেস্ট এডিট ফাংশন
  const handleEditReceipt = (receipt: any) => {
    console.log("Editing receipt:", receipt.receiptNo);
    setSnackbar({
      open: true,
      message: `Edit mode for receipt ${receipt.receiptNo}`,
      severity: "info",
    });
  };

  // রিসিট দেখানোর ফাংশন
  const handleViewReceipt = (receipt: any) => {
    setSelectedReceipt(receipt);
    setShowDialog(true);
  };

  // ক্যাফ্ট রিসিট দেখানোর ফাংশন
  const handleViewCraftReceipt = (receipt: any) => {
    setSelectedReceipt(receipt);
    setShowCraftReceipt(true);
  };

  // টেস্ট রিফ্রেশ ফাংশন
  const handleRefresh = () => {
    refetch();
    setSnackbar({
      open: true,
      message: "Receipts refreshed successfully",
      severity: "success",
    });
  };

  // টেস্ট এক্সপোর্ট ফাংশন
  const handleExportData = () => {
    console.log("Exporting data:");
    setSnackbar({
      open: true,
      message: "Data exported successfully",
      severity: "success",
    });
  };

  return {
    handleDeleteReceipt,
    handleBulkDelete,
    handlePrintReceipt,
    handleDownloadReceipt,
    handleEmailReceipt,
    handleEditReceipt,
    handleViewReceipt,
    handleViewCraftReceipt,
    handleRefresh,
    handleExportData,
  };
};
