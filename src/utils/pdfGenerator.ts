/* eslint-disable @typescript-eslint/no-explicit-any */
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { getBengaliValue } from "./pdfHelper";

export const generatePDFFromData = async (
  formData: Record<string, any>,
  studentId: string,
) => {
  const currentDate = new Date().toLocaleDateString("bn-BD", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const logoUrl = window.location.origin + "/img/logo.png";

  const formatAddress = (addr: any) => {
    const parts = [];
    if (addr.village) parts.push(addr.village);
    if (addr.postOffice) parts.push(addr.postOffice);
    if (addr.policeStation) parts.push(addr.policeStation);
    if (addr.district) parts.push(addr.district);
    return parts.join(", ") || "-";
  };

  const presentAddressStr = formatAddress({
    village: formData.village,
    postOffice: formData.postOffice,
    policeStation: formData.policeStation,
    district: formData.district,
  });

  const permanentAddressStr = formatAddress({
    village: formData.permVillage,
    postOffice: formData.permPostOffice,
    policeStation: formData.permPoliceStation,
    district: formData.permDistrict,
  });

  const container = document.createElement("div");
  container.style.width = "210mm";
  container.style.minHeight = "297mm";
  container.style.position = "absolute";
  container.style.left = "-9999px";
  container.style.top = "0";
  container.style.background = "white";

  container.innerHTML = `
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@300;400;500;600;700&display=swap');
      
      .pdf-body { font-family: 'Hind Siliguri', sans-serif; display: flex; color: #1e1b4b; margin: 0; padding: 0; width: 210mm; min-height: 297mm; }
      
      /* --- SIDEBAR --- */
      .sidebar { width: 70mm; background: #4c1d95; color: white; padding: 25px 15px; display: flex; flex-direction: column; min-height: 297mm; box-sizing: border-box; }
      .sidebar-photo { width: 120px; height: 145px; border: 3px solid rgba(255, 255, 255, 0.2); border-radius: 10px; overflow: hidden; background: rgba(255, 255, 255, 0.1); margin: 0 auto 20px; }
      .sidebar-photo img { width: 100%; height: 100%; object-fit: cover; }
      
      /* FIXED SIDEBAR ID ALIGNMENT */
      .sidebar-id { 
        height: 32px;     
        padding: 0 6px; 
        background: white; 
        color: #4c1d95; 
        display: flex; 
        align-items: center; /* Vertical center */
        justify-content: center; /* Horizontal center */
        border-radius: 20px; 
        font-weight: 700; 
        font-size: 13px; 
        margin: 0 auto 25px; 
        width: 120px; 
        line-height: 1; /* Reset line height */
      }
      
      .sidebar-info-group { width: 100%; margin-bottom: 20px; }
      .sidebar-item { margin-bottom: 12px; border-bottom: 1px solid rgba(255, 255, 255, 0.1); padding-bottom: 5px; }
      .sidebar-label { opacity: 0.7; display: block; font-size: 10px; text-transform: uppercase; color: #ddd; letter-spacing: 0.5px; line-height: 1.2; }
      .sidebar-val { font-size: 13px; font-weight: 500; display: block; margin-top: 2px; line-height: 1.3; }

      .sidebar-address-box { margin-top: 15px; background: rgba(255, 255, 255, 0.05); padding: 10px; border-radius: 8px; border: 1px solid rgba(255, 255, 255, 0.1); }
      .addr-title { font-size: 11px; font-weight: 700; color: #e9d5ff; margin-bottom: 5px; display: block; border-bottom: 1px solid rgba(255, 255, 255, 0.1); padding-bottom: 3px; }
      .addr-text { font-size: 11px; line-height: 1.4; color: #f3f4f6; }

      /* --- MAIN CONTENT --- */
      .main-content { flex: 1; padding: 30px 35px; background: white; box-sizing: border-box; }
      .main-header { display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #4c1d95; padding-bottom: 15px; margin-bottom: 20px; }
      .logo-img { height: 55px; width: auto; }
      
      .section { margin-bottom: 18px; }
      .section-title { color: #4c1d95; font-size: 15px; font-weight: 700; margin-bottom: 10px; border-bottom: 2px solid #f5f3ff; padding-bottom: 4px; display: flex; align-items: center; gap: 8px; }
      
      .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
      .grid-3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 10px; }
      
      .field { padding: 3px 0; }
      .label { color: #64748b; font-size: 10px; font-weight: 600; display: block; line-height: 1.2; margin-bottom: 2px; }
      
      /* FIXED MAIN CONTENT VALUE ALIGNMENT */
      .value { 
        font-size: 13px; 
        font-weight: 500; 
        border-bottom: 1px solid #e9d5ff; 
        color: #000; 
        min-height: 26px; 
        display: flex; 
        align-items: center; 
        line-height: 1;
          padding: 2px 0 2px 0;
      }
      
      .info-card { background: #f5f3ff; padding: 10px; border-radius: 8px; border-left: 4px solid #7c3aed; }
      
      .doc-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 6px; margin-top: 8px; }
      .doc-item { display: flex; align-items: center; gap: 8px; font-size: 10.5px; }
      .check-box { width: 16px;
  height: 16px;
  font-size: 11px;
  line-height: 1;
  display: flex;
  align-items: center;
  justify-content: center;
   border: 1.5px solid #7c3aed; 
   border-radius: 3px;   
   color: #7c3aed; 
   font-weight: bold;  
   background: white; 
   flex-shrink: 0; }
      
      .pledge-box { margin-top: 12px; background: #f5f3ff; padding: 10px; border-radius: 6px; font-size: 11px; line-height: 1.5; border: 1px dashed #7c3aed; color: #1e1b4b; }
      .footer-signs { margin-top: 35px; display: flex; justify-content: space-between; }
      .sign-line { width: 150px; border-top: 1.5px solid #4c1d95; text-align: center; padding-top: 6px; font-size: 11px; font-weight: 600; color: #4c1d95; }
    </style>

    <div class="pdf-body">
      <div class="sidebar">
        <div class="sidebar-photo">
          ${formData.studentPhoto ? `<img src="${formData.studentPhoto}" />` : '<div style="display:flex; align-items:center; justify-content:center; height:100%; color:rgba(255,255,255,0.4); font-size:10px;">ছবি</div>'}
        </div>
        <div class="sidebar-id">${studentId}</div>
        
        <div class="sidebar-info-group">
          <div class="sidebar-item"><span class="sidebar-label">শ্রেণি</span><span class="sidebar-val">${formData.Class || "-"}</span></div>
          <div class="sidebar-item"><span class="sidebar-label">বিভাগ</span><span class="sidebar-val">${formData.studentDepartment || "-"}</span></div>
          <div class="sidebar-item"><span class="sidebar-label">সেশন</span><span class="sidebar-val">${formData.session || "-"}</span></div>
          <div class="sidebar-item"><span class="sidebar-label">রক্তের গ্রুপ</span><span class="sidebar-val">${formData.bloodGroup || "-"}</span></div>
        </div>

        <div class="sidebar-address-box">
          <span class="addr-title">বর্তমান ঠিকানা</span>
          <div class="addr-text">${presentAddressStr}</div>
        </div>

        <div class="sidebar-address-box">
          <span class="addr-title">স্থায়ী ঠিকানা</span>
          <div class="addr-text">${permanentAddressStr}</div>
        </div>
      </div>

      <div class="main-content">
        <div class="main-header">
          <img src=${logoUrl} class="logo-img" onerror="this.style.opacity='0'" />
          <div style="text-align: right;">
            <h2 style="color: #4c1d95; font-size: 20px; margin: 0; font-weight: 800;">ভর্তি আবেদন ফরম</h2>
            <p style="font-size: 10px; color: #64748b; margin-top: 2px;">প্রিন্ট তারিখ: ${currentDate}</p>
          </div>
        </div>

        <div class="section">
          <div class="section-title">শিক্ষার্থীর প্রাথমিক তথ্য</div>
          <div class="grid-2">
            <div class="field"><span class="label">নাম (বাংলা)</span><div class="value">${formData.StudentName || "-"}</div></div>
            <div class="field"><span class="label">নাম (ইংরেজি)</span><div class="value">${formData.studentName || "-"}</div></div>
          </div>
          <div class="grid-3">
            <div class="field"><span class="label">জন্ম তারিখ</span><div class="value">${formData.dateOfBirth ? new Date(formData.dateOfBirth).toLocaleDateString("bn-BD") : "-"}</div></div>
            <div class="field"><span class="label">বয়স</span><div class="value">${formData.Age || "-"}</div></div>
            <div class="field"><span class="label">লিঙ্গ</span><div class="value">${getBengaliValue("gender", formData.gender)}</div></div>
          </div>
          <div class="field"><span class="label">এনআইডি/জন্ম নিবন্ধন</span><div class="value">${formData.nidBirth || "-"}</div></div>
        </div>

        <div class="section">
          <div class="section-title">অভিভাবকের তথ্য</div>
          <div class="grid-2">
            <div class="info-card">
              <strong style="font-size:11px; color:#4c1d95; line-height:1.5;">পিতা: ${formData.FatherNameBangla || "-"}</strong>
              <div class="field"><span class="label">পেশা ও মোবাইল</span><div class="value" style="font-size:12px; border:none; min-height:auto;">${formData.FatherJob || "-"} | ${formData.FatherMobile || "-"}</div></div>
            </div>
            <div class="info-card">
              <strong style="font-size:11px; color:#4c1d95; line-height:1.5;">মাতা: ${formData.MotherNameBangla || "-"}</strong>
              <div class="field"><span class="label">পেশা ও মোবাইল</span><div class="value" style="font-size:12px; border:none; min-height:auto;">${formData.MotherJob || "-"} | ${formData.MotherMobile || "-"}</div></div>
            </div>
          </div>
        </div>

        <div class="section">
          <div class="section-title">পারিবারিক পরিবেশ ও আচরণ</div>
          <div class="grid-3">
            <div class="field"><span class="label">হালাল উপার্জন</span><div class="value">${getBengaliValue("HalalIncome", formData.HalalIncome)}</div></div>
            <div class="field"><span class="label">পর্দা পালন</span><div class="value">${getBengaliValue("Purdah", formData.Purdah)}</div></div>
            <div class="field"><span class="label">নামাজ (পিতা-মাতা)</span><div class="value">${getBengaliValue("ParentsPrayer", formData.ParentsPrayer)}</div></div>
            <div class="field"><span class="label">পড়ালেখায় আগ্রহ</span><div class="value">${getBengaliValue("StudyInterest", formData.StudyInterest)}</div></div>
            <div class="field"><span class="label">রাগ নিয়ন্ত্রণ</span><div class="value">${getBengaliValue("AngerControl", formData.AngerControl)}</div></div>
            <div class="field"><span class="label">মোবাইল ব্যবহার</span><div class="value">${formData.MobileUsage || "-"}</div></div>
          </div>
        </div>

        <div class="section">
          <div class="section-title">জমাকৃত ডকুমেন্টস ও অঙ্গীকারনামা</div>
          <div class="doc-grid">
            <div class="doc-item"><div class="check-box">${formData.photographs ? "✓" : ""}</div>শিক্ষার্থীর পাসপোর্ট সাইজের ৪ কপি রঙিন ছবি (বাধ্যতামূলক) </div>
            <div class="doc-item"><div class="check-box">${formData.birthCertificate ? "✓" : ""}</div> শিক্ষার্থীর জন্ম নিবন্ধন সনদ (বাধ্যতামূলক)</div>
            <div class="doc-item"><div class="check-box">${formData.birthCertificate ? "✓" : ""}</div>পিতা-মাতার জাতীয় পরিচয়পত্রের ফটোকপি/পাসপোর্টের ফটোকপি (বাধ্যতামূলক)</div>
            <div class="doc-item"><div class="check-box">${formData.markSheet ? "✓" : ""}</div> মার্কশিট</div>
            <div class="doc-item"><div class="check-box">${formData.markSheet ? "✓" : ""}</div> ট্রান্সফার সার্টিফিকেট</div>
          </div>
          
          ${
            formData.termsAccepted
              ? `
          <div class="pledge-box">
             আমি <strong>${formData.StudentName || "__________"}</strong> সজ্ঞানে অঙ্গীকার করছি যে, প্রতিষ্ঠানের সকল নিয়মকানুন মেনে চলব। প্রতিষ্ঠানের আইন পরিপন্থি কোনো কিছু আমার মাঝে পরিলক্ষিত হলে কর্তৃপক্ষের সিদ্ধান্ত মেনে নিতে বাধ্য থাকব।
          </div>`
              : ""
          }
        </div>

        <div class="footer-signs">
          <div class="sign-line">অভিভাবকের স্বাক্ষর</div>
          <div class="sign-line">অধ্যক্ষের স্বাক্ষর</div>
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(container);

  try {
    const canvas = await html2canvas(container, {
      scale: 3, // Higher scale for better text clarity
      useCORS: true,
      logging: false,
      windowWidth: 794,
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });
    pdf.addImage(imgData, "PNG", 0, 0, 210, 297);
    pdf.save(`admission-form-${studentId}.pdf`);
  } catch (error) {
    console.error("PDF generation failed:", error);
  } finally {
    document.body.removeChild(container);
  }
};
