/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { Button } from "@mui/material";
import CraftModal from "@/components/Shared/Modal";

const PrintModal = ({ open, setOpen, receipt }: any) => {
  const componentRef = useRef<HTMLDivElement | null>(null);

  const handlePrint = useReactToPrint({
    contentRef: componentRef,
    documentTitle: `Money Receipt - ${receipt?.receiptNo || "Unknown"}`,
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
    `,
  });

  // Format date
  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A";
    try {
      return new Date(dateString).toLocaleDateString("en-US");
    } catch {
      return dateString;
    }
  };

  // Calculate total amount
  const calculateTotal = () => {
    if (!receipt?.fees) return 0;
    return receipt.fees.reduce(
      (sum: number, fee: any) => sum + (fee.paidAmount || 0),
      0
    );
  };

  return (
    <CraftModal
      open={open}
      setOpen={setOpen}
      title="Print Money Receipt"
      size="xl"
      sx={{
        "& .MuiDialog-paper": {
          height: "100vh",
          maxHeight: "100vh",
          width: "100%",
          background: "#ddd",
        },
        "& .MuiDialogContent-root": {
          height: "calc(90vh - 140px)",
          display: "flex",
          flexDirection: "column",
          padding: 0,
        },
      }}
    >
      <div className="p-4">
        <div ref={componentRef}>
          <main className="invoicePrintWrap">
            <div className="invoicePrint px-5 pb-5">
              <div>
                <div className="text-center mb-5">
                  <h2 className="text-3xl font-bold">
                    Craft International Institute
                  </h2>
                </div>

                <h2 className="font-bold text-center mb-4">Money Receipt</h2>

                {/* Student Info */}
                <div className="mb-6 border border-gray-300">
                  <table className="w-full border-collapse">
                    <tbody>
                      <tr className="receiptRow">
                        <td>Name</td>
                        <td>{receipt?.studentName || "N/A"}</td>
                        <td>Roll</td>
                        <td>{receipt?.studentRoll || "N/A"}</td>
                      </tr>
                      <tr className="receiptRow">
                        <td>Section</td>
                        <td>{receipt?.studentSection || "N/A"}</td>
                        <td>Pay Date</td>
                        <td>{formatDate(receipt?.paymentDate)}</td>
                      </tr>
                      <tr className="receiptRow">
                        <td>STD. ID</td>
                        <td>{receipt?.studentId || "N/A"}</td>
                        <td>Inv. No.</td>
                        <td>{receipt?.receiptNo || "N/A"}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Fee Table */}
                <table className="w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-[#4F0187] text-white">
                      <th className="border p-2 w-[10%]">SL</th>
                      <th className="border p-2 w-[70%]">Description</th>
                      <th className="border p-2 w-[20%] text-right">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {receipt?.fees?.map((fee: any, index: number) => (
                      <tr key={index}>
                        <td className="border p-2 text-center">{index + 1}</td>
                        <td className="border p-2">{fee.feeType || "Fee"}</td>
                        <td className="border p-2 text-right">
                          ৳{(fee.paidAmount || 0).toLocaleString()}
                        </td>
                      </tr>
                    ))}
                    <tr className="font-bold">
                      <td colSpan={2} className="border p-2 text-right">
                        TOTAL
                      </td>
                      <td className="border p-2 text-right">
                        ৳{calculateTotal().toLocaleString()}
                      </td>
                    </tr>
                  </tbody>
                </table>

                <div className="mt-5 text-xs">
                  <b>Receipt By:</b> {receipt?.collectedBy || "Admin"}
                </div>
              </div>
            </div>
          </main>
        </div>

        <div className="printInvoiceBtnGroup flex gap-2 mt-4">
          <Button variant="contained" onClick={handlePrint}>
            Print
          </Button>
          <Button variant="outlined" onClick={() => setOpen(false)}>
            Close
          </Button>
        </div>
      </div>
    </CraftModal>
  );
};

export default PrintModal;
