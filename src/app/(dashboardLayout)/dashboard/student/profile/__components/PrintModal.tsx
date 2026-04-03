/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import CraftModal from "@/components/Shared/Modal";
import { Description, MapRounded, Phone } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import { useRef, useMemo } from "react";
import { useReactToPrint } from "react-to-print";
import { useRouter } from "next/navigation";

<<<<<<< HEAD
const PrintModal = ({ open, setOpen, receipt, afterClose }: any) => {
  const router = useRouter();
  const componentRef = useRef<HTMLDivElement | null>(null);
  const afterCloseCalledRef = useRef(false);
=======
const PrintModal = ({
  open,
  setOpen,
  receipt,
  student,
  onClose, // optional: called only when navigating away (e.g., from EnrollmentForm)
}: any) => {
  const componentRef = useRef<HTMLDivElement | null>(null);
  const printTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (open) {
      if (printTimeoutRef.current) clearTimeout(printTimeoutRef.current);
    }
  }, [open]);

  const handleClose = () => {
    console.log("PrintModal handleClose"); // debugging
    setOpen(false);
    // Only trigger navigation callback if the caller explicitly provided one
    if (hasNavigationCallback) {
      onClose();
    }
  };
>>>>>>> 151d80f38fefc4d84dcc6315d4122e4e48bdc7cf

  const handlePrint = useReactToPrint({
    contentRef: componentRef,
    documentTitle: `Money Receipt - ${receipt?.receiptNo || "Unknown"}`,
    onAfterPrint: () => {
      if (printTimeoutRef.current) clearTimeout(printTimeoutRef.current);
      handleClose(); // close after print
    },
    pageStyle: `
      @page {
        size: A4;
        margin: 0;
      }
      body {
        margin: 0;
        padding: 0;
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
      }
      @media print {
        .no-print { display: none !important; }
        .print-only { display: block !important; }
      }
    `,
  });

  // No setTimeout fallback — it caused auto-close when printing from FeeCollection
  const handlePrintClick = () => {
    handlePrint();
    // Fallback in case onAfterPrint doesn't fire (e.g., user cancels print)
    printTimeoutRef.current = setTimeout(() => {
      handleClose();
    }, 5000);
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A";
    try {
      return new Date(dateString).toLocaleDateString("en-US");
    } catch {
      return dateString;
    }
  };

  const calculateTotal = () => {
    if (
      receipt?.fees &&
      Array.isArray(receipt.fees) &&
      receipt.fees.length > 0
    ) {
      return receipt.fees.reduce(
        (sum: number, fee: any) => sum + (fee.paidAmount || fee.amount || 0),
        0,
      );
    }
    return receipt?.totalAmount || receipt?.paidAmount || 0;
  };

  const getDisplayFees = () => {
    if (
      receipt?.fees &&
      Array.isArray(receipt.fees) &&
      receipt.fees.length > 0
    ) {
      return receipt.fees;
    }
    return [
      {
        feeType: "Total Payment",
        paidAmount: receipt?.totalAmount || 0,
        quantity: 1,
      },
    ];
  };

  const months = [
    "জানু.",
    "ফেব্রু.",
    "মার্চ",
    "এপ্রিল",
    "মে",
    "জুন",
    "জুলাই",
    "আগস্ট",
    "সেপ্ট.",
    "অক্টো.",
    "নভে.",
    "ডিসে.",
  ];

  const englishMonths = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const extractMonthFromFeeType = (feeType: string) => {
    const monthlyFeeMatch = feeType.match(/Monthly Fee - (\w+)/i);
    if (monthlyFeeMatch) {
      const monthName = monthlyFeeMatch[1];
      const monthIndex = englishMonths.findIndex(
        (m) => m.toLowerCase() === monthName.toLowerCase(),
      );
      if (monthIndex !== -1) return monthIndex;
    }
    for (let i = 0; i < englishMonths.length; i++) {
      if (feeType.toLowerCase().includes(englishMonths[i].toLowerCase())) {
        return i;
      }
    }
    return -1;
  };

  const getSelectedMonths = useMemo(() => {
    const fees = getDisplayFees();
    const selectedMonths = new Set<number>();
    fees.forEach((fee: any) => {
      const feeType = fee.feeType || fee.name || "";
      const monthIndex = extractMonthFromFeeType(feeType);
      if (monthIndex !== -1) selectedMonths.add(monthIndex);
    });
    return selectedMonths;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [receipt?.fees]);

  const isMonthSelected = (monthIndex: number) =>
    getSelectedMonths.has(monthIndex);

  const getClassName = () => {
    // Try receipt first, then fall back to student prop
    const className =
      receipt?.className || receipt?.studentClass || student?.className;
    if (!className) return "N/A";
    if (typeof className === "string") return className;
    if (Array.isArray(className)) {
      const first = className[0];
      if (typeof first === "string") return first;
      if (first && typeof first === "object") {
        return first.label || first.name || first.className || "N/A";
      }
      return "N/A";
    }
    if (typeof className === "object") {
      return className.label || className.name || className.className || "N/A";
    }
    return "N/A";
  };

  const getStudentName = () =>
    receipt?.studentName ||
    receipt?.name ||
    student?.studentName ||
    student?.name ||
    "N/A";

  const getRoll = () =>
    receipt?.rollNumber || receipt?.studentRoll || student?.rollNumber || "N/A";

  if (!receipt) {
    return (
      <CraftModal
        open={open}
        setOpen={setOpen}
        title="Print Money Receipt"
        size="xl"
        onClose={handleClose}
      >
        <Box p={3}>
          <Typography>No receipt data available.</Typography>
        </Box>
      </CraftModal>
    );
  }

  return (
    <CraftModal
      open={open}
      setOpen={setOpen}
      title="Print Money Receipt"
      size="xl"
      onClose={handleClose}
      sx={{
        "& .MuiDialog-paper": {
          height: "95vh",
          maxHeight: "95vh",
          width: "95%",
          background: "#f5f5f5",
        },
        "& .MuiDialogContent-root": {
          height: "calc(95vh - 140px)",
          display: "flex",
          flexDirection: "column",
          padding: 0,
        },
      }}
    >
      <Box className="p-4 flex gap-4 h-full overflow-hidden">
        <Box className="flex-1 bg-gray-100 rounded-lg p-4 overflow-y-auto flex justify-center">
          <div
            ref={componentRef}
            className="w-full max-w-[850px]"
            style={{ minHeight: "700px" }}
          >
            {/* PRINTABLE AREA START */}
            <div className="bg-white shadow-xl overflow-hidden text-black font-bengali relative h-full">
              <div className="p-8 pb-4 relative z-10">
                {/* Header */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-full border-4 border-[#4c2a70] flex items-center justify-center">
                    <div className="text-[#4c2a70]">
                      <svg
                        width="30"
                        height="30"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M12 2L2 7l10 5 10-5-10-5zm0 9l2.5-1.25L12 8.5l-2.5 1.25L12 11zm0 2.5l-5-2.5-5 2.5L12 22l10-8.5-5-2.5-5 2.5z" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold text-[#2d1b4e]">Craft</h1>
                    <h2 className="text-xl font-semibold text-[#4c2a70]">
                      International Institute
                    </h2>
                  </div>
                </div>

                {/* Student Info Grid */}
                <div className="grid grid-cols-12 gap-0 border-t border-b border-gray-300 bg-gray-100 mb-6 text-sm">
                  {/* Row 1 */}
                  <div className="col-span-8 p-2 border-r border-b border-gray-300 flex items-center">
                    <span className="font-semibold w-12">নাম:</span>
                    <div className="bg-transparent border-b border-dotted border-gray-400 flex-1 outline-none px-2">
                      {getStudentName()}
                    </div>
                  </div>
                  <div className="col-span-4 p-2 border-b border-gray-300 flex items-center bg-gray-200/50">
                    <span className="font-semibold w-12">তারিখ</span>
                    <div className="bg-transparent border-b border-dotted border-gray-400 flex-1 outline-none px-2">
                      {formatDate(receipt?.paymentDate || receipt?.createdAt)}
                    </div>
                  </div>

                  {/* Row 2 */}
                  <div className="col-span-3 p-2 border-r border-gray-300 flex items-center bg-gray-200/50">
                    <span className="font-semibold w-10">শ্রেণি:</span>
                    <div className="bg-transparent flex-1 outline-none">
                      {getClassName()}
                    </div>
                  </div>
                  <div className="col-span-3 p-2 border-r border-gray-300 flex items-center">
                    <span className="font-semibold w-10">শাখা:</span>
                    <div className="bg-transparent flex-1 outline-none">
                      {receipt?.section || receipt?.studentSection || "N/A"}
                    </div>
                  </div>
                  <div className="col-span-3 p-2 border-r border-gray-300 flex items-center bg-gray-200/50">
                    <span className="font-semibold w-10">রোল:</span>
                    <div className="bg-transparent flex-1 outline-none">
                      {getRoll()}
                    </div>
                  </div>
                  <div className="col-span-3 p-2 flex items-center">
                    <span className="font-semibold w-10">আইডি:</span>
                    <div className="bg-transparent flex-1 outline-none">
                      {receipt?.studentId || receipt?.receiptNo || "N/A"}
                    </div>
                  </div>
                </div>

                {/* Fee Table */}
                <div className="w-full mb-2">
                  <table className="w-full text-sm border-collapse">
                    <thead>
                      <tr className="bg-[#4c2a70] text-white">
                        <th className="p-2 text-left w-1/2 border-r border-white/30">
                          বিবরণ
                        </th>
                        <th className="p-2 text-center w-1/4 border-r border-white/30">
                          পরিমাণ
                        </th>
                        <th className="p-2 text-center w-1/4">মোট টাকা</th>
                      </tr>
                    </thead>
                    <tbody>
                      {getDisplayFees().map((fee: any, index: number) => (
                        <tr
                          key={index}
                          className="even:bg-gray-100 odd:bg-gray-50 border-b border-gray-200"
                        >
                          <td className="p-2 border-r border-gray-200 font-medium">
                            {fee.feeType || `ফি ${index + 1}`}
                          </td>
                          <td className="p-2 border-r border-gray-200 text-center">
                            {fee.quantity || "1"}
                          </td>
                          <td className="p-2 text-right">
                            ৳
                            {(
                              fee.paidAmount ||
                              fee.amount ||
                              0
                            ).toLocaleString()}
                          </td>
                        </tr>
                      ))}
                      {getDisplayFees().length > 0 && (
                        <tr className="font-bold bg-gray-200">
                          <td
                            colSpan={2}
                            className="p-2 border-r border-gray-300 text-right"
                          >
                            সর্বমোট
                          </td>
                          <td className="p-2 text-right">
                            ৳{calculateTotal().toLocaleString()}
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                {/* Footer Grid */}
                <div className="grid grid-cols-12 gap-0 border border-gray-300 mt-4">
                  <div className="col-span-8 flex flex-col">
                    <div className="p-3 bg-gray-50 border-b border-gray-200">
                      <div className="grid grid-cols-6 gap-2 text-xs font-semibold">
                        {months.map((m, i) => {
                          const isSelected = isMonthSelected(i);
                          return (
                            <label
                              key={i}
                              className="flex items-center gap-1 cursor-pointer"
                            >
                              <input
                                type="checkbox"
                                className="accent-[#4c2a70]"
                                checked={isSelected}
                                readOnly
                              />
                              <span
                                className={
                                  isSelected ? "text-[#4c2a70] font-bold" : ""
                                }
                              >
                                {m}
                              </span>
                            </label>
                          );
                        })}
                      </div>
                    </div>
                    <div className="p-3 bg-gray-100 flex-1 flex items-start gap-2">
                      <span className="font-bold text-sm whitespace-nowrap">
                        কথায়:
                      </span>
                      <div className="border-b border-dotted border-gray-400 w-full h-5"></div>
                    </div>
                  </div>
                  <div className="col-span-4 text-sm font-semibold">
                    <div className="grid grid-cols-2 h-full">
                      <div className="flex flex-col">
                        <div className="flex-1 flex items-center justify-center bg-gray-200 border-b border-r border-white">
                          সর্বমোট
                        </div>
                        <div className="flex-1 flex items-center justify-center bg-gray-200 border-b border-r border-white">
                          পরিশোধিত
                        </div>
                        <div className="flex-1 flex items-center justify-center bg-gray-200 border-r border-white text-[#9c27b0]">
                          বকেয়া
                        </div>
                      </div>
                      <div className="flex flex-col">
                        <div className="flex-1 bg-gray-50 border-b border-gray-200 p-1 text-right outline-none">
                          ৳{calculateTotal().toLocaleString()}
                        </div>
                        <div className="flex-1 bg-gray-50 border-b border-gray-200 p-1 text-right outline-none">
                          ৳{calculateTotal().toLocaleString()}
                        </div>
                        <div className="flex-1 bg-pink-50/50 p-1 text-right outline-none text-red-600">
                          ৳0
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Contact Info */}
                <div className="mt-8 flex items-end justify-between">
                  <div className="text-xs text-gray-600 space-y-1">
                    <div className="flex items-center gap-2">
                      <div className="bg-[#4c2a70] p-1 rounded text-white">
                        <Phone />
                      </div>
                      <div>
                        <p>+8801830678383</p>
                        <p>+8801310726000</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="bg-[#4c2a70] p-1 rounded text-white">
                        <MapRounded />
                      </div>
                      <p className="max-w-[250px]">
                        কুয়েত টাওয়ার, স্বপ্ন সুপার শপ বিল্ডিং, নিমাইকাশারি,
                        সিদ্ধিরগঞ্জ, নারায়ণগঞ্জ
                      </p>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="w-32 border-t border-black mb-1"></div>
                    <p className="text-sm font-semibold">আদায়কারীর স্বাক্ষর</p>
                    <p className="text-sm mt-1">
                      {receipt?.collectedBy || "Admin"}
                    </p>
                  </div>
                </div>

                {/* Receipt No */}
                <div className="mt-4 text-right text-sm">
                  <p className="font-semibold">
                    Inv. No: {receipt?.receiptNo || "N/A"}
                  </p>
                </div>
              </div>
            </div>
            {/* PRINTABLE AREA END */}

            <style>{`@import url('https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@300;400;500;600;700&display=swap'); .font-bengali { font-family: 'Hind Siliguri', sans-serif; }`}</style>
          </div>
        </Box>

        <div className="printInvoiceBtnGroup flex gap-2 mt-4 justify-center no-print">
          <Button
            variant="contained"
            onClick={handlePrintClick}
            startIcon={<Description />}
          >
            Print
          </Button>
          <Button variant="outlined" onClick={handleClose}>
            Close
          </Button>
        </div>
      </Box>
    </CraftModal>
  );
};

export default PrintModal;
