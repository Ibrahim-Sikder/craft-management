/* eslint-disable @typescript-eslint/no-explicit-any */

import CraftTable, { BulkAction, Column, RowAction } from "@/components/Table";
import { useGetCompleteReceiptsQuery } from "@/redux/api/receiptApi";
import {
  Close,
  Delete,
  Download,
  Edit,
  Email,
  MoreVert,
  Print,
  Visibility,
} from "@mui/icons-material";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  Paper,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

interface ReceiptHistoryProps {
  studentId: string;
  studentName: string;
}

const ReceiptHistory: React.FC<ReceiptHistoryProps> = ({
  studentId,
  studentName,
}) => {
  const [selectedReceipt, setSelectedReceipt] = useState<any>(null);
  const [showDialog, setShowDialog] = useState(false);
  const [showCraftReceipt, setShowCraftReceipt] = useState(false);
  const [, setSearchTerm] = useState("");
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error" | "info" | "warning";
  }>({
    open: false,
    message: "",
    severity: "info",
  });

  // Redux API ব্যবহার করে ডাটা লোড করুন
  const {
    data: receiptsData,
    isLoading,
    error,
    refetch,
  } = useGetCompleteReceiptsQuery(studentId, {
    skip: !studentId,
    refetchOnMountOrArgChange: true,
  });

  const receipts = receiptsData?.data || [];

  // স্ট্যাটাসের জন্য কালার ফাংশন
  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case "active":
        return "success";
      case "cancelled":
        return "error";
      case "refunded":
        return "warning";
      default:
        return "default";
    }
  };

  // পেমেন্ট মেথড আইকন
  const getPaymentMethodIcon = (method: string) => {
    switch (method?.toLowerCase()) {
      case "cash":
        return "💰";
      case "bkash":
        return "📱";
      case "nagad":
        return "💳";
      case "bank":
        return "🏦";
      case "card":
        return "💳";
      default:
        return "💵";
    }
  };

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
    const printContent = generateReceiptHTML(receipt);
    const printWindow = window.open("", "_blank");
    if (printWindow) {
      printWindow.document.write(printContent);
      printWindow.document.close();
      printWindow.focus();
    }
  };

  // রিসিট ডাউনলোড করার ফাংশন
  const handleDownloadReceipt = (receipt: any) => {
    const printContent = generateReceiptHTML(receipt);
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
    console.log("Exporting data:", receipts);
    setSnackbar({
      open: true,
      message: "Data exported successfully",
      severity: "success",
    });
  };

  // CraftTable-এর জন্য কলাম ডেফিনিশন
  const columns: Column[] = [
    {
      id: "receiptNo",
      label: "রিসিট নং",
      minWidth: 150,
      sortable: true,
      filterable: true,
      visible: true,
      type: "text",
    },
    {
      id: "paymentDate",
      label: "তারিখ",
      minWidth: 120,
      align: "center",
      sortable: true,
      filterable: true,
      visible: true,
      type: "date",
      format: (value: string) => {
        try {
          return new Date(value).toLocaleDateString("bn-BD");
        } catch {
          return value;
        }
      },
    },
    {
      id: "paymentMethod",
      label: "পেমেন্ট পদ্ধতি",
      minWidth: 130,
      align: "center",
      sortable: true,
      filterable: true,
      visible: true,
      type: "text",
      render: (row: any) => (
        <Box display="flex" alignItems="center" gap={1}>
          <Typography>{getPaymentMethodIcon(row.paymentMethod)}</Typography>
          <Typography variant="body2">
            {row.paymentMethod?.toUpperCase()}
          </Typography>
        </Box>
      ),
      filterOptions: [
        { label: "Cash", value: "cash" },
        { label: "bKash", value: "bkash" },
        { label: "Nagad", value: "nagad" },
        { label: "Bank", value: "bank" },
        { label: "Card", value: "card" },
      ],
    },
    {
      id: "totalAmount",
      label: "মোট টাকা",
      minWidth: 120,
      align: "right",
      sortable: true,
      filterable: false,
      visible: true,
      type: "number",
      format: (value: number) => (
        <Typography variant="body2" fontWeight="bold" color="primary">
          ৳{value?.toLocaleString() || "0"}
        </Typography>
      ),
    },
    {
      id: "fees",
      label: "ফি আইটেম",
      minWidth: 100,
      align: "center",
      sortable: false,
      filterable: false,
      visible: true,
      type: "number",
      render: (row: any) => (
        <Chip
          label={`${row.fees?.length || 0} টি`}
          color="info"
          size="small"
          variant="outlined"
        />
      ),
    },
    {
      id: "status",
      label: "স্ট্যাটাস",
      minWidth: 120,
      align: "center",
      sortable: true,
      filterable: true,
      visible: true,
      type: "status",
      filterOptions: [
        { label: "Active", value: "active" },
        { label: "Cancelled", value: "cancelled" },
        { label: "Refunded", value: "refunded" },
      ],
    },
    {
      id: "collectedBy",
      label: "সংগ্রহকারী",
      minWidth: 120,
      sortable: true,
      filterable: true,
      visible: true,
      type: "text",
    },
    {
      id: "summary",
      label: "ডিটেইলস",
      minWidth: 200,
      sortable: false,
      filterable: false,
      visible: true,
      render: (row: any) => (
        <Box>
          <Typography variant="caption" display="block" color="textSecondary">
            {row.fees
              ?.slice(0, 2)
              .map(
                (fee: any) =>
                  `${fee.feeType}: ৳${fee.paidAmount?.toLocaleString()}`
              )
              .join(", ")}
          </Typography>
          {row.fees && row.fees.length > 2 && (
            <Typography variant="caption" color="textSecondary">
              +{row.fees.length - 2} more
            </Typography>
          )}
        </Box>
      ),
    },
  ];

  // Row Actions ডেফিনিশন
  const rowActions: RowAction[] = [
    {
      label: "View",
      icon: <Visibility fontSize="small" />,
      onClick: handleViewReceipt,
      color: "primary",
      tooltip: "বিস্তারিত দেখুন",
      alwaysShow: true,
    },
    {
      label: "Print",
      icon: <Print fontSize="small" />,
      onClick: handlePrintReceipt,
      color: "info",
      tooltip: "প্রিন্ট করুন",
      alwaysShow: true,
    },
    {
      label: "Craft Receipt",
      icon: <Print fontSize="small" />,
      onClick: handleViewCraftReceipt,
      color: "secondary",
      tooltip: "Craft রিসিট দেখুন",
      alwaysShow: true,
    },
    {
      label: "Download",
      icon: <Download fontSize="small" />,
      onClick: handleDownloadReceipt,
      color: "success",
      tooltip: "ডাউনলোড করুন",
      inMenu: false,
    },
    {
      label: "Edit",
      icon: <Edit fontSize="small" />,
      onClick: handleEditReceipt,
      color: "warning",
      tooltip: "এডিট করুন",
      inMenu: true,
    },
    {
      label: "Email",
      icon: <Email fontSize="small" />,
      onClick: handleEmailReceipt,
      color: "info",
      tooltip: "ইমেইল করুন",
      inMenu: true,
    },
    {
      label: "Delete",
      icon: <Delete fontSize="small" />,
      onClick: handleDeleteReceipt,
      color: "error",
      tooltip: "ডিলিট করুন",
      inMenu: false,
    },
    {
      label: "More Actions",
      icon: <MoreVert fontSize="small" />,
      onClick: () => {},
      inMenu: false,
      alwaysShow: false,
    },
  ];

  // Bulk Actions ডেফিনিশন
  const bulkActions: BulkAction[] = [
    {
      label: "Bulk Print",
      icon: <Print fontSize="small" />,
      onClick: (selectedRows: any) => {
        selectedRows.forEach((row: any) => handlePrintReceipt(row));
      },
      color: "info",
    },
    {
      label: "Bulk Download",
      icon: <Download fontSize="small" />,
      onClick: (selectedRows: any) => {
        selectedRows.forEach((row: any) => handleDownloadReceipt(row));
      },
      color: "success",
    },
    {
      label: "Bulk Delete",
      icon: <Delete fontSize="small" />,
      onClick: handleBulkDelete,
      color: "error",
    },
  ];

  // HTML জেনারেট করার ফাংশন
  const generateReceiptHTML = (receipt: any) => {
    const paymentDate = new Date(receipt.paymentDate);
    const formattedDate = paymentDate.toLocaleDateString("bn-BD", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    const formattedTime = paymentDate.toLocaleTimeString("bn-BD", {
      hour: "2-digit",
      minute: "2-digit",
    });

    // ফি আইটেমগুলোর জন্য টেবিল কনটেন্ট
    let feesTableHTML = "";
    if (receipt.fees && receipt.fees.length > 0) {
      feesTableHTML = `
        <table class="fees-table">
          <thead>
            <tr>
              <th>ক্রমিক</th>
              <th>ফি ধরণ</th>
              <th>মাস</th>
              <th>মূল পরিমাণ</th>
              <th>ডিসকাউন্ট</th>
              <th>ছাড়</th>
              <th>নিট পরিমাণ</th>
              <th>পরিশোধিত</th>
            </tr>
          </thead>
          <tbody>
            ${receipt.fees
              .map(
                (fee: any, index: number) => `
              <tr>
                <td>${index + 1}</td>
                <td>${fee.feeType || "N/A"}</td>
                <td>${fee.month || "N/A"}</td>
                <td class="amount-cell">৳${fee.originalAmount?.toLocaleString() || "0"}</td>
                <td class="amount-cell">৳${fee.discount?.toLocaleString() || "0"}</td>
                <td class="amount-cell">৳${fee.waiver?.toLocaleString() || "0"}</td>
                <td class="amount-cell">৳${fee.netAmount?.toLocaleString() || "0"}</td>
                <td class="amount-cell">৳${fee.paidAmount?.toLocaleString() || "0"}</td>
              </tr>
            `
              )
              .join("")}
          </tbody>
        </table>
      `;
    } else {
      feesTableHTML = `<p style="text-align: center; color: #666;">কোন ফি আইটেম পাওয়া যায়নি</p>`;
    }

    const summary = receipt.summary || {};

    return `
      <!DOCTYPE html>
      <html>
      <head>
        <title>রিসিট - ${receipt.receiptNo}</title>
        <meta charset="UTF-8">
        <style>
          @import url('https://fonts.maateen.me/solaiman-lipi/font.css');
          
          body { 
            font-family: 'SolaimanLipi', Arial, sans-serif; 
            margin: 0;
            padding: 20px;
            background: #f5f5f5;
            color: #333;
          }
          
          .receipt-container {
            width: 210mm;
            min-height: 297mm;
            margin: 0 auto;
            padding: 25px;
            background: white;
            box-shadow: 0 0 15px rgba(0,0,0,0.1);
            border-radius: 8px;
          }
          
          .header {
            text-align: center;
            border-bottom: 3px double #2c3e50;
            padding-bottom: 20px;
            margin-bottom: 25px;
          }
          
          .institute-name {
            font-size: 32px;
            font-weight: 700;
            color: #2c3e50;
            margin: 15px 0 8px 0;
            letter-spacing: 1px;
          }
          
          .institute-address {
            font-size: 16px;
            color: #555;
            margin: 5px 0;
          }
          
          .contact-info {
            display: flex;
            justify-content: center;
            flex-wrap: wrap;
            gap: 20px;
            margin: 15px 0;
            font-size: 14px;
            color: #666;
          }
          
          .receipt-title {
            text-align: center;
            font-size: 28px;
            font-weight: 600;
            color: #2c3e50;
            margin: 25px 0;
            text-transform: uppercase;
            letter-spacing: 1.5px;
            text-decoration: underline;
          }
          
          .receipt-info {
            display: flex;
            justify-content: space-between;
            margin-bottom: 20px;
            padding: 15px;
            background: #f8f9fa;
            border-radius: 6px;
            border: 1px solid #dee2e6;
          }
          
          .student-info {
            margin: 20px 0;
            padding: 20px;
            background: #f8f9fa;
            border-radius: 8px;
            border: 1px solid #dee2e6;
          }
          
          .info-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 15px;
            margin-top: 10px;
          }
          
          .info-item {
            display: flex;
            justify-content: space-between;
            padding: 8px 0;
            border-bottom: 1px dashed #ddd;
          }
          
          .info-label {
            font-weight: 600;
            color: #2c3e50;
          }
          
          .info-value {
            color: #555;
          }
          
          .fees-table {
            width: 100%;
            border-collapse: collapse;
            margin: 25px 0;
            font-size: 14px;
            border: 1px solid #dee2e6;
          }
          
          .fees-table th {
            background: #2c3e50;
            color: white;
            padding: 12px 8px;
            text-align: left;
            font-weight: 600;
            border: 1px solid #dee2e6;
          }
          
          .fees-table td {
            padding: 10px 8px;
            border: 1px solid #dee2e6;
          }
          
          .amount-cell {
            text-align: right;
            font-family: 'Courier New', monospace;
            font-weight: 500;
          }
          
          .summary-section {
            margin: 25px 0;
            padding: 20px;
            background: #e8f4f8;
            border-radius: 8px;
            border: 1px solid #b3e0f2;
          }
          
          .summary-title {
            font-size: 20px;
            font-weight: 600;
            color: #2c3e50;
            margin-bottom: 15px;
            text-align: center;
          }
          
          .summary-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 12px;
          }
          
          .summary-item {
            display: flex;
            justify-content: space-between;
            padding: 8px 0;
            border-bottom: 1px dashed #b3e0f2;
          }
          
          .summary-label {
            font-weight: 600;
            color: #2c3e50;
          }
          
          .summary-value {
            font-weight: 500;
            color: #2c3e50;
          }
          
          .total-amount {
            grid-column: span 2;
            font-size: 22px;
            font-weight: 700;
            text-align: center;
            padding: 15px;
            margin-top: 10px;
            background: #2c3e50;
            color: white;
            border-radius: 6px;
          }
          
          .payment-details {
            margin: 20px 0;
            padding: 20px;
            background: #f8f9fa;
            border-radius: 8px;
            border: 1px solid #dee2e6;
          }
          
          .signature-section {
            display: flex;
            justify-content: space-between;
            margin-top: 40px;
            padding-top: 20px;
            border-top: 2px solid #2c3e50;
          }
          
          .signature {
            text-align: center;
            width: 30%;
          }
          
          .signature-line {
            border-top: 1px solid #333;
            width: 150px;
            margin: 40px auto 10px auto;
          }
          
          .footer {
            text-align: center;
            margin-top: 30px;
            padding-top: 15px;
            border-top: 1px solid #bdc3c7;
            font-size: 12px;
            color: #7f8c8d;
          }
          
          .status-badge {
            display: inline-block;
            padding: 4px 12px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: 600;
          }
          
          .status-active {
            background: #d4edda;
            color: #155724;
          }
          
          .status-cancelled {
            background: #f8d7da;
            color: #721c24;
          }
          
          .status-refunded {
            background: #fff3cd;
            color: #856404;
          }
          
          @media print {
            body {
              background: white;
              margin: 0;
              padding: 10px;
            }
            .receipt-container {
              width: 100%;
              box-shadow: none;
              padding: 15px;
              border: none;
            }
            .no-print {
              display: none;
            }
          }
        </style>
      </head>
      <body>
        <div class="receipt-container">
          <div class="header">
            <div class="institute-name">Craft International Institute</div>
            <div class="institute-address">123 Education Street, Dhaka, Bangladesh</div>
            <div class="contact-info">
              <div>📞 ফোন: +880 1300-726000</div>
              <div>📱 মোবাইল: +880 1830-678383</div>
              <div>✉️ ইমেইল: info@craftinstitute.edu.bd</div>
              <div>🌐 ওয়েবসাইট: www.craftinstitute.edu.bd</div>
            </div>
          </div>
          
          <div class="receipt-title">ফি পরিশোধের রসিদ</div>
          
          <div class="receipt-info">
            <div>
              <div><strong>রসিদ নং:</strong> ${receipt.receiptNo}</div>
              <div><strong>তারিখ:</strong> ${formattedDate}</div>
              <div><strong>সময়:</strong> ${formattedTime}</div>
            </div>
            <div>
              <div><strong>স্ট্যাটাস:</strong> 
                <span class="status-badge status-${receipt.status || "active"}">${(
                  receipt.status || "active"
                ).toUpperCase()}</span>
              </div>
              <div><strong>সংগ্রহকারী:</strong> ${receipt.collectedBy || "N/A"}</div>
            </div>
          </div>
          
          <div class="student-info">
            <h3 style="margin-top: 0; color: #2c3e50;">শিক্ষার্থীর তথ্য</h3>
            <div class="info-grid">
              <div class="info-item">
                <span class="info-label">শিক্ষার্থীর নাম:</span>
                <span class="info-value">${
                  receipt.studentName || studentName
                }</span>
              </div>
              <div class="info-item">
                <span class="info-label">শিক্ষার্থী আইডি:</span>
                <span class="info-value">${receipt.studentId || "N/A"}</span>
              </div>
              <div class="info-item">
                <span class="info-label">ক্লাস:</span>
                <span class="info-value">${receipt.className || "N/A"}</span>
              </div>
              <div class="info-item">
                <span class="info-label">পেমেন্ট পদ্ধতি:</span>
                <span class="info-value">${
                  receipt.paymentMethod?.toUpperCase() || "N/A"
                }</span>
              </div>
              ${
                receipt.transactionId
                  ? `
                <div class="info-item">
                  <span class="info-label">লেনদেন আইডি:</span>
                  <span class="info-value">${receipt.transactionId}</span>
                </div>
                `
                  : ""
              }
              ${
                receipt.note
                  ? `
                <div class="info-item" style="grid-column: span 2;">
                  <span class="info-label">মন্তব্য:</span>
                  <span class="info-value">${receipt.note}</span>
                </div>
                `
                  : ""
              }
            </div>
          </div>
          
          <h3 style="color: #2c3e50; margin-bottom: 15px;">ফি বিশদ বিবরণ</h3>
          ${feesTableHTML}
          
          <div class="summary-section">
            <div class="summary-title">ফি সারাংশ</div>
            <div class="summary-grid">
              <div class="summary-item">
                <span class="summary-label">মোট আইটেম:</span>
                <span class="summary-value">${
                  summary.totalItems || receipt.fees?.length || 0
                }</span>
              </div>
              <div class="summary-item">
                <span class="summary-label">মোট পরিমাণ:</span>
                <span class="summary-value">৳${(
                  summary.subtotal ||
                  receipt.totalAmount ||
                  0
                ).toLocaleString()}</span>
              </div>
              <div class="summary-item">
                <span class="summary-label">মোট ডিসকাউন্ট:</span>
                <span class="summary-value">৳${(
                  summary.totalDiscount || 0
                ).toLocaleString()}</span>
              </div>
              <div class="summary-item">
                <span class="summary-label">মোট ছাড়:</span>
                <span class="summary-value">৳${(
                  summary.totalWaiver || 0
                ).toLocaleString()}</span>
              </div>
              <div class="summary-item total-amount">
                <span>মোট পরিশোধিত:</span>
                <span>৳${(
                  summary.amountPaid ||
                  receipt.totalAmount ||
                  0
                ).toLocaleString()}</span>
              </div>
            </div>
          </div>
          
          <div class="payment-details">
            <h4 style="margin-top: 0; color: #2c3e50;">পেমেন্ট তথ্য</h4>
            <div class="info-grid">
              <div class="info-item">
                <span class="info-label">পেমেন্ট পদ্ধতি:</span>
                <span class="info-value">${
                  receipt.paymentMethod?.toUpperCase() || "N/A"
                }</span>
              </div>
              <div class="info-item">
                <span class="info-label">সর্বমোট টাকা:</span>
                <span class="info-value">৳${receipt.totalAmount?.toLocaleString() || "0"}</span>
              </div>
              <div class="info-item">
                <span class="info-label">সংগ্রহকারী:</span>
                <span class="info-value">${receipt.collectedBy || "N/A"}</span>
              </div>
              <div class="info-item">
                <span class="info-label">পেমেন্ট তারিখ:</span>
                <span class="info-value">${formattedDate}</span>
              </div>
            </div>
          </div>
          
          <div class="signature-section">
            <div class="signature">
              <div class="signature-line"></div>
              <div>শিক্ষার্থীর স্বাক্ষর</div>
            </div>
            <div class="signature">
              <div class="signature-line"></div>
              <div>ক্যাশিয়ার/সংগ্রহকারী</div>
            </div>
            <div class="signature">
              <div class="signature-line"></div>
              <div>ইনস্টিটিউট স্ট্যাম্প</div>
            </div>
          </div>
          
          <div class="footer">
            <p>এটি একটি কম্পিউটার জেনারেটেড রসিদ। স্বাক্ষরের প্রয়োজন নেই।</p>
            <p>যেকোনো জিজ্ঞাসার জন্য যোগাযোগ করুন: +880 1300-726000 | info@craftinstitute.edu.bd</p>
            <p>জেনারেট হয়েছে: ${new Date().toLocaleString("bn-BD")}</p>
            <p>রসিদ নং: ${receipt.receiptNo}</p>
          </div>
        </div>
        
        <div class="no-print" style="text-align: center; margin: 20px;">
          <button onclick="window.print()" style="
            padding: 12px 30px;
            background: #2c3e50;
            color: white;
            border: none;
            border-radius: 4px;
            font-size: 16px;
            cursor: pointer;
            margin: 10px;
            font-family: 'SolaimanLipi', Arial, sans-serif;
          ">
            🖨️ রিসিট প্রিন্ট করুন
          </button>
          <button onclick="window.close()" style="
            padding: 12px 30px;
            background: #e74c3c;
            color: white;
            border: none;
            border-radius: 4px;
            font-size: 16px;
            cursor: pointer;
            margin: 10px;
            font-family: 'SolaimanLipi', Arial, sans-serif;
          ">
            ✕ উইন্ডো বন্ধ করুন
          </button>
        </div>
        
        <script>
          window.onload = function() {
            setTimeout(function() {
              if (window.location.search.includes('autoprint=true')) {
                window.print();
              }
            }, 1000);
          };
        </script>
      </body>
      </html>
    `;
  };

  // Craft Receipt Component (Exact design like your image)
  const CraftReceiptDialog: React.FC<{
    open: boolean;
    onClose: () => void;
    receipt: any;
  }> = ({ open, onClose, receipt }) => {
    const handlePrint = () => {
      window.print();
    };

    return (
      <Dialog
        open={open}
        onClose={onClose}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 2,
            overflow: "hidden",
            maxWidth: "420px",
            mx: "auto",
          },
        }}
      >
        <DialogContent sx={{ p: 0 }}>
          {/* This is the exact design from your image */}
          <Box
            id="craft-receipt"
            sx={{
              fontFamily: "'SolaimanLipi', Arial, sans-serif",
              p: 2,
              bgcolor: "background.paper",
            }}
          >
            {/* Top Section with Craft International Institute */}
            <Box
              sx={{
                textAlign: "center",
                mb: 2,
                borderBottom: "2px solid",
                borderColor: "primary.main",
                pb: 1,
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "bold",
                  color: "primary.main",
                  fontSize: "1.1rem",
                  letterSpacing: "0.5px",
                }}
              >
                Craft International Institute
              </Typography>

              <Typography
                variant="caption"
                sx={{
                  display: "block",
                  color: "text.secondary",
                  mt: 0.5,
                  fontSize: "0.7rem",
                }}
              >
                Phone: +8801300726000, +8801830678383
              </Typography>
            </Box>

            {/* Receipt Header */}
            <Box
              sx={{
                textAlign: "center",
                mb: 2,
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  fontWeight: "bold",
                  fontSize: "0.85rem",
                  textDecoration: "underline",
                }}
              >
                Payment Receipt
              </Typography>
            </Box>

            {/* Receipt Info Grid */}
            <Grid container spacing={0.5} sx={{ mb: 1.5 }}>
              <Grid item xs={6}>
                <Typography
                  variant="caption"
                  sx={{ fontWeight: "bold", fontSize: "0.7rem" }}
                >
                  Date:
                </Typography>
                <Typography
                  variant="caption"
                  sx={{ ml: 0.5, fontSize: "0.7rem" }}
                >
                  {receipt
                    ? new Date(receipt.paymentDate).toLocaleDateString("en-GB")
                    : "08/01/2026"}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography
                  variant="caption"
                  sx={{ fontWeight: "bold", fontSize: "0.7rem" }}
                >
                  Time:
                </Typography>
                <Typography
                  variant="caption"
                  sx={{ ml: 0.5, fontSize: "0.7rem" }}
                >
                  {receipt
                    ? new Date(receipt.paymentDate).toLocaleTimeString(
                        "en-US",
                        { hour: "2-digit", minute: "2-digit" }
                      )
                    : "08:15 PM"}
                </Typography>
              </Grid>
            </Grid>

            {/* Main Receipt Box */}
            <Box
              sx={{
                border: "1px solid",
                borderColor: "divider",
                borderRadius: 1,
                p: 1.5,
                mb: 2,
                bgcolor: "grey.50",
              }}
            >
              {/* Receipt Number */}
              <Box sx={{ textAlign: "center", mb: 1.5 }}>
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: "bold",
                    fontSize: "0.8rem",
                    color: "primary.main",
                  }}
                >
                  Receipt No: {receipt?.receiptNo || "1135"}
                </Typography>
              </Box>

              {/* Student Info */}
              <Box sx={{ mb: 1.5 }}>
                <Typography
                  variant="caption"
                  sx={{ fontWeight: "bold", fontSize: "0.7rem" }}
                >
                  Student Name:
                </Typography>
                <Typography
                  variant="caption"
                  sx={{ ml: 0.5, fontSize: "0.7rem" }}
                >
                  {receipt?.studentName || studentName}
                </Typography>

                <Box sx={{ mt: 0.5 }}>
                  <Typography
                    variant="caption"
                    sx={{ fontWeight: "bold", fontSize: "0.7rem" }}
                  >
                    ID:
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{ ml: 0.5, fontSize: "0.7rem" }}
                  >
                    {receipt?.studentId || studentId}
                  </Typography>
                </Box>
              </Box>

              {/* Amount in Big Font */}
              <Box
                sx={{
                  textAlign: "center",
                  my: 2,
                  py: 1,
                  borderTop: "1px dashed",
                  borderBottom: "1px dashed",
                  borderColor: "divider",
                }}
              >
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: "bold",
                    color: "primary.main",
                    fontSize: "1.8rem",
                  }}
                >
                  ৳{receipt?.totalAmount?.toLocaleString() || "1,135"}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    display: "block",
                    fontSize: "0.65rem",
                    color: "text.secondary",
                  }}
                >
                  Amount in Taka
                </Typography>
              </Box>

              {/* Payment Method */}
              <Box sx={{ mb: 1.5 }}>
                <Typography
                  variant="caption"
                  sx={{ fontWeight: "bold", fontSize: "0.7rem" }}
                >
                  Payment Method:
                </Typography>
                <Typography
                  variant="caption"
                  sx={{ ml: 0.5, fontSize: "0.7rem" }}
                >
                  {receipt?.paymentMethod || "Cash"}
                </Typography>
              </Box>

              {/* Status */}
              <Box sx={{ mb: 1.5 }}>
                <Typography
                  variant="caption"
                  sx={{ fontWeight: "bold", fontSize: "0.7rem" }}
                >
                  Status:
                </Typography>
                <Chip
                  label="PAID"
                  size="small"
                  sx={{
                    ml: 1,
                    height: "18px",
                    fontSize: "0.6rem",
                    fontWeight: "bold",
                    bgcolor: "success.light",
                    color: "success.dark",
                  }}
                />
              </Box>

              {/* Collected By */}
              <Box>
                <Typography
                  variant="caption"
                  sx={{ fontWeight: "bold", fontSize: "0.7rem" }}
                >
                  Collected By:
                </Typography>
                <Typography
                  variant="caption"
                  sx={{ ml: 0.5, fontSize: "0.7rem" }}
                >
                  {receipt?.collectedBy || "Admin"}
                </Typography>
              </Box>
            </Box>

            {/* Fee Details Table */}
            <TableContainer
              component={Paper}
              variant="outlined"
              sx={{
                mb: 2,
                "& .MuiTableCell-root": {
                  py: 0.5,
                  fontSize: "0.7rem",
                },
              }}
            >
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: "bold", width: "40px" }}>
                      #
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>
                      Description
                    </TableCell>
                    <TableCell align="right" sx={{ fontWeight: "bold" }}>
                      Amount
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {receipt?.fees?.slice(0, 3).map((fee: any, index: number) => (
                    <TableRow key={index}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{fee.feeType}</TableCell>
                      <TableCell align="right">
                        ৳{fee.paidAmount?.toLocaleString()}
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow>
                    <TableCell
                      colSpan={2}
                      align="right"
                      sx={{ fontWeight: "bold" }}
                    >
                      Total:
                    </TableCell>
                    <TableCell align="right" sx={{ fontWeight: "bold" }}>
                      ৳{receipt?.totalAmount?.toLocaleString()}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>

            {/* Footer Section */}
            <Box
              sx={{
                textAlign: "center",
                mt: 2,
                pt: 1,
                borderTop: "1px solid",
                borderColor: "divider",
              }}
            >
              <Typography
                variant="caption"
                sx={{
                  display: "block",
                  fontSize: "0.6rem",
                  color: "text.secondary",
                  mb: 0.5,
                }}
              >
                This is a computer generated receipt
              </Typography>

              <Typography
                variant="caption"
                sx={{
                  display: "block",
                  fontSize: "0.6rem",
                  color: "text.secondary",
                }}
              >
                For any query: +8801300726000
              </Typography>

              <Typography
                variant="caption"
                sx={{
                  display: "block",
                  fontSize: "0.6rem",
                  color: "text.secondary",
                  mt: 1,
                }}
              >
                *** Thank You ***
              </Typography>
            </Box>
          </Box>
        </DialogContent>

        <DialogActions sx={{ p: 1.5, gap: 1 }}>
          <Button
            variant="outlined"
            startIcon={<Print />}
            onClick={handlePrint}
            size="small"
            sx={{ flex: 1 }}
          >
            Print
          </Button>
          <Button
            variant="contained"
            onClick={onClose}
            size="small"
            sx={{ flex: 1 }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  // লোডিং স্টেট
  if (isLoading) {
    return (
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        minHeight="400px"
      >
        <CircularProgress size={60} />
        <Typography variant="h6" sx={{ mt: 3 }}>
          রিসিট লোড হচ্ছে...
        </Typography>
      </Box>
    );
  }

  // এরর স্টেট
  if (error) {
    return (
      <Alert
        severity="error"
        sx={{ mb: 3 }}
        action={
          <Button color="inherit" size="small" onClick={() => refetch()}>
            আবার চেষ্টা করুন
          </Button>
        }
      >
        <Typography variant="subtitle1">
          ত্রুটি: রিসিট লোড করতে সমস্যা হয়েছে
        </Typography>
        <Typography variant="body2" sx={{ mt: 1 }}>
          দয়া করে আবার চেষ্টা করুন বা সাপোর্ট টিমের সাথে যোগাযোগ করুন।
        </Typography>
      </Alert>
    );
  }

  return (
    <Box sx={{ width: "100%" }}>
      {/* CraftTable কম্পোনেন্ট ব্যবহার */}
      <CraftTable
        title="📋 পেমেন্ট রিসিটের ইতিহাস"
        subtitle={`শিক্ষার্থী: ${studentName} (ID: ${studentId})`}
        columns={columns}
        data={receipts}
        loading={isLoading}
        error={error ? "Error loading receipts" : undefined}
        onRefresh={handleRefresh}
        onExport={handleExportData}
        onPrint={handleExportData} // Print uses same as export for now
        onSearchChange={(term) => setSearchTerm(term)}
        rowActions={rowActions}
        bulkActions={bulkActions}
        selectable={true}
        searchable={true}
        filterable={true}
        sortable={true}
        pagination={true}
        serverSideSorting={false}
        emptyStateMessage="এই শিক্ষার্থীর জন্য এখনো কোনো পেমেন্ট রিসিট তৈরি হয়নি"
        idField="_id"
        maxHeight="70vh"
        stickyHeader={true}
        dense={false}
        striped={true}
        hover={true}
        showToolbar={true}
        elevation={2}
        borderRadius={3}
        showRowNumbers={true}
        rowNumberHeader="#"
        actionMenuLabel="অ্যাকশন"
        loadingOverlay={true}
        cardSx={{
          border: "1px solid #e0e0e0",
        }}
      />

      {/* Craft Receipt Dialog */}
      {selectedReceipt && (
        <CraftReceiptDialog
          open={showCraftReceipt}
          onClose={() => setShowCraftReceipt(false)}
          receipt={selectedReceipt}
        />
      )}

      {/* রিসিট ডিটেইলস ডায়ালগ */}
      <Dialog
        open={showDialog}
        onClose={() => setShowDialog(false)}
        maxWidth="lg"
        fullWidth
        scroll="paper"
      >
        {selectedReceipt && (
          <>
            <DialogTitle sx={{ pb: 1 }}>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Box>
                  <Typography variant="h6" fontWeight="bold">
                    রিসিট ডিটেইলস
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {selectedReceipt.receiptNo} • {studentName}
                  </Typography>
                </Box>
                <IconButton onClick={() => setShowDialog(false)} size="small">
                  <Close />
                </IconButton>
              </Box>
            </DialogTitle>
            <Divider />
            <DialogContent dividers sx={{ py: 3 }}>
              <Box>
                {/* হেডার */}
                <Box textAlign="center" mb={4}>
                  <Typography
                    variant="h4"
                    fontWeight="bold"
                    color="primary"
                    gutterBottom
                  >
                    Craft International Institute
                  </Typography>
                  <Typography
                    variant="body1"
                    color="textSecondary"
                    gutterBottom
                  >
                    123 Education Street, Dhaka, Bangladesh
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    📞 +880 1300-726000 • 📱 +880 1830-678383 • ✉️
                    info@craftinstitute.edu.bd
                  </Typography>
                </Box>

                <Divider sx={{ mb: 3 }} />

                {/* রিসিট টাইটেল */}
                <Typography
                  variant="h5"
                  align="center"
                  gutterBottom
                  sx={{
                    textDecoration: "underline",
                    mb: 4,
                    fontWeight: 600,
                  }}
                >
                  ফি পরিশোধের রসিদ
                </Typography>

                {/* রিসিট ইনফো */}
                <Grid container spacing={3} mb={4}>
                  <Grid item xs={6}>
                    <Card variant="outlined">
                      <CardContent>
                        <Typography
                          variant="subtitle2"
                          color="textSecondary"
                          gutterBottom
                        >
                          রিসিট তথ্য
                        </Typography>
                        <Box
                          display="flex"
                          justifyContent="space-between"
                          mb={1}
                        >
                          <Typography variant="body2">রসিদ নং:</Typography>
                          <Typography fontWeight="bold">
                            {selectedReceipt.receiptNo}
                          </Typography>
                        </Box>
                        <Box
                          display="flex"
                          justifyContent="space-between"
                          mb={1}
                        >
                          <Typography variant="body2">তারিখ:</Typography>
                          <Typography>
                            {new Date(
                              selectedReceipt.paymentDate
                            ).toLocaleDateString("bn-BD")}
                          </Typography>
                        </Box>
                        <Box display="flex" justifyContent="space-between">
                          <Typography variant="body2">সময়:</Typography>
                          <Typography>
                            {new Date(
                              selectedReceipt.paymentDate
                            ).toLocaleTimeString("bn-BD", {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </Typography>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>

                  <Grid item xs={6}>
                    <Card variant="outlined">
                      <CardContent>
                        <Typography
                          variant="subtitle2"
                          color="textSecondary"
                          gutterBottom
                        >
                          পেমেন্ট তথ্য
                        </Typography>
                        <Box
                          display="flex"
                          justifyContent="space-between"
                          mb={1}
                        >
                          <Typography variant="body2">স্ট্যাটাস:</Typography>
                          <Chip
                            label={
                              selectedReceipt.status?.toUpperCase() || "ACTIVE"
                            }
                            color={getStatusColor(selectedReceipt.status)}
                            size="small"
                          />
                        </Box>
                        <Box
                          display="flex"
                          justifyContent="space-between"
                          mb={1}
                        >
                          <Typography variant="body2">পদ্ধতি:</Typography>
                          <Typography>
                            {selectedReceipt.paymentMethod?.toUpperCase()}
                          </Typography>
                        </Box>
                        <Box display="flex" justifyContent="space-between">
                          <Typography variant="body2">সংগ্রহকারী:</Typography>
                          <Typography>{selectedReceipt.collectedBy}</Typography>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>

                {/* শিক্ষার্থীর তথ্য */}
                <Card variant="outlined" sx={{ mb: 4 }}>
                  <CardContent>
                    <Typography
                      variant="subtitle1"
                      fontWeight="bold"
                      gutterBottom
                    >
                      শিক্ষার্থীর তথ্য
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={6} md={3}>
                        <Typography variant="body2" color="textSecondary">
                          নাম
                        </Typography>
                        <Typography>
                          {selectedReceipt.studentName || studentName}
                        </Typography>
                      </Grid>
                      <Grid item xs={6} md={3}>
                        <Typography variant="body2" color="textSecondary">
                          আইডি
                        </Typography>
                        <Typography>{selectedReceipt.studentId}</Typography>
                      </Grid>
                      <Grid item xs={6} md={3}>
                        <Typography variant="body2" color="textSecondary">
                          ক্লাস
                        </Typography>
                        <Typography>{selectedReceipt.className}</Typography>
                      </Grid>
                      <Grid item xs={6} md={3}>
                        <Typography variant="body2" color="textSecondary">
                          মোট টাকা
                        </Typography>
                        <Typography variant="h6" color="primary">
                          ৳{selectedReceipt.totalAmount?.toLocaleString()}
                        </Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>

                {/* ফি আইটেমগুলোর টেবিল */}
                {selectedReceipt.fees && selectedReceipt.fees.length > 0 && (
                  <>
                    <Typography
                      variant="subtitle1"
                      fontWeight="bold"
                      gutterBottom
                    >
                      ফি আইটেমসমূহ
                    </Typography>
                    <TableContainer
                      component={Paper}
                      variant="outlined"
                      sx={{ mb: 4 }}
                    >
                      <Table size="small">
                        <TableHead>
                          <TableRow sx={{ backgroundColor: "primary.light" }}>
                            <TableCell
                              sx={{
                                color: "white",
                                fontWeight: "bold",
                                py: 1.5,
                              }}
                            >
                              ক্রমিক
                            </TableCell>
                            <TableCell
                              sx={{
                                color: "white",
                                fontWeight: "bold",
                                py: 1.5,
                              }}
                            >
                              ফি ধরণ
                            </TableCell>
                            <TableCell
                              sx={{
                                color: "white",
                                fontWeight: "bold",
                                py: 1.5,
                              }}
                            >
                              মাস
                            </TableCell>
                            <TableCell
                              align="right"
                              sx={{
                                color: "white",
                                fontWeight: "bold",
                                py: 1.5,
                              }}
                            >
                              মূল পরিমাণ
                            </TableCell>
                            <TableCell
                              align="right"
                              sx={{
                                color: "white",
                                fontWeight: "bold",
                                py: 1.5,
                              }}
                            >
                              ডিসকাউন্ট
                            </TableCell>
                            <TableCell
                              align="right"
                              sx={{
                                color: "white",
                                fontWeight: "bold",
                                py: 1.5,
                              }}
                            >
                              ছাড়
                            </TableCell>
                            <TableCell
                              align="right"
                              sx={{
                                color: "white",
                                fontWeight: "bold",
                                py: 1.5,
                              }}
                            >
                              নিট পরিমাণ
                            </TableCell>
                            <TableCell
                              align="right"
                              sx={{
                                color: "white",
                                fontWeight: "bold",
                                py: 1.5,
                              }}
                            >
                              পরিশোধিত
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {selectedReceipt.fees.map(
                            (fee: any, index: number) => (
                              <TableRow key={index}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{fee.feeType}</TableCell>
                                <TableCell>{fee.month || "N/A"}</TableCell>
                                <TableCell align="right">
                                  ৳{fee.originalAmount?.toLocaleString()}
                                </TableCell>
                                <TableCell align="right">
                                  <Typography color="error">
                                    ৳{fee.discount?.toLocaleString() || "0"}
                                  </Typography>
                                </TableCell>
                                <TableCell align="right">
                                  <Typography color="error">
                                    ৳{fee.waiver?.toLocaleString() || "0"}
                                  </Typography>
                                </TableCell>
                                <TableCell align="right">
                                  <Typography fontWeight="medium">
                                    ৳{fee.netAmount?.toLocaleString()}
                                  </Typography>
                                </TableCell>
                                <TableCell align="right">
                                  <Typography fontWeight="bold" color="primary">
                                    ৳{fee.paidAmount?.toLocaleString()}
                                  </Typography>
                                </TableCell>
                              </TableRow>
                            )
                          )}
                        </TableBody>
                      </Table>
                    </TableContainer>

                    {/* সামারি */}
                    {selectedReceipt.summary && (
                      <Card variant="outlined" sx={{ mb: 4 }}>
                        <CardContent>
                          <Typography
                            variant="subtitle1"
                            fontWeight="bold"
                            gutterBottom
                          >
                            ফি সারাংশ
                          </Typography>
                          <Grid container spacing={2}>
                            <Grid item xs={6} sm={3}>
                              <Typography variant="body2" color="textSecondary">
                                মোট আইটেম
                              </Typography>
                              <Typography variant="h6">
                                {selectedReceipt.summary.totalItems}
                              </Typography>
                            </Grid>
                            <Grid item xs={6} sm={3}>
                              <Typography variant="body2" color="textSecondary">
                                মোট পরিমাণ
                              </Typography>
                              <Typography variant="h6">
                                ৳
                                {selectedReceipt.summary.subtotal?.toLocaleString()}
                              </Typography>
                            </Grid>
                            <Grid item xs={6} sm={3}>
                              <Typography variant="body2" color="textSecondary">
                                মোট ডিসকাউন্ট
                              </Typography>
                              <Typography variant="h6" color="error">
                                ৳
                                {selectedReceipt.summary.totalDiscount?.toLocaleString()}
                              </Typography>
                            </Grid>
                            <Grid item xs={6} sm={3}>
                              <Typography variant="body2" color="textSecondary">
                                মোট ছাড়
                              </Typography>
                              <Typography variant="h6" color="error">
                                ৳
                                {selectedReceipt.summary.totalWaiver?.toLocaleString()}
                              </Typography>
                            </Grid>
                            <Grid
                              item
                              xs={12}
                              sx={{ mt: 2, pt: 2, borderTop: "1px solid #ddd" }}
                            >
                              <Box
                                display="flex"
                                justifyContent="space-between"
                                alignItems="center"
                              >
                                <Typography variant="h5">
                                  মোট পরিশোধিত:
                                </Typography>
                                <Typography
                                  variant="h3"
                                  color="primary"
                                  fontWeight="bold"
                                >
                                  ৳
                                  {selectedReceipt.summary.amountPaid?.toLocaleString()}
                                </Typography>
                              </Box>
                            </Grid>
                          </Grid>
                        </CardContent>
                      </Card>
                    )}
                  </>
                )}

                {/* অতিরিক্ত তথ্য */}
                {(selectedReceipt.transactionId || selectedReceipt.note) && (
                  <Card variant="outlined" sx={{ mb: 4 }}>
                    <CardContent>
                      <Typography
                        variant="subtitle1"
                        fontWeight="bold"
                        gutterBottom
                      >
                        অতিরিক্ত তথ্য
                      </Typography>
                      <Grid container spacing={2}>
                        {selectedReceipt.transactionId && (
                          <Grid item xs={12}>
                            <Typography variant="body2" color="textSecondary">
                              লেনদেন আইডি
                            </Typography>
                            <Typography>
                              {selectedReceipt.transactionId}
                            </Typography>
                          </Grid>
                        )}
                        {selectedReceipt.note && (
                          <Grid item xs={12}>
                            <Typography variant="body2" color="textSecondary">
                              মন্তব্য
                            </Typography>
                            <Typography>{selectedReceipt.note}</Typography>
                          </Grid>
                        )}
                      </Grid>
                    </CardContent>
                  </Card>
                )}

                {/* একশন বাটন */}
                <Box display="flex" justifyContent="center" gap={3} mt={4}>
                  <Button
                    variant="contained"
                    startIcon={<Print />}
                    onClick={() => handlePrintReceipt(selectedReceipt)}
                    size="large"
                    sx={{ px: 4, py: 1.5 }}
                  >
                    রিসিট প্রিন্ট করুন
                  </Button>
                  <Button
                    variant="outlined"
                    startIcon={<Download />}
                    onClick={() => handleDownloadReceipt(selectedReceipt)}
                    size="large"
                    sx={{ px: 4, py: 1.5 }}
                  >
                    ডাউনলোড করুন
                  </Button>
                  <Button
                    variant="text"
                    onClick={() => setShowDialog(false)}
                    size="large"
                    sx={{ px: 4, py: 1.5 }}
                  >
                    বন্ধ করুন
                  </Button>
                </Box>
              </Box>
            </DialogContent>
          </>
        )}
      </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>

      {/* Print styles for Craft Receipt */}
      <style jsx global>{`
        @import url("https://fonts.maateen.me/solaiman-lipi/font.css");

        @media print {
          body * {
            visibility: hidden;
          }
          #craft-receipt,
          #craft-receipt * {
            visibility: visible;
          }
          #craft-receipt {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            padding: 20px;
            margin: 0;
            background: white;
          }
          .MuiDialog-root,
          .MuiDialog-container,
          .MuiDialog-paper {
            margin: 0 !important;
            padding: 0 !important;
            box-shadow: none !important;
            max-width: none !important;
            width: 100% !important;
          }
          .MuiDialogActions-root {
            display: none !important;
          }
        }
      `}</style>
    </Box>
  );
};

export default ReceiptHistory;
