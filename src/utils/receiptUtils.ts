/* eslint-disable @typescript-eslint/no-explicit-any */

export const generateReceiptHTML = (receipt: any, studentName: string) => {
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
