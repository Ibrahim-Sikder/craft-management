import { MapRounded, Phone } from "@mui/icons-material";
import React from "react";

const PaymentSlip = () => {
    // Data for the fee rows
    const feeItems = [
        "ভর্তি ফরম/ ভর্তি ফি",
        "সেশন ফি",
        "পরীক্ষার ফি",
        "কোর্স ফি",
        "মাসিক বেতন",
        "আবাসন ফি",
        "টিউশন ফি",
        "খাবার চার্জ",
        "রেজিস্ট্রেশন ফি",
        "সংস্থাপন ফি",
        "বই/খাতা/ডায়েরি/কার্যক্রম",
        "বিবিধ",
    ];

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

    return (
        <div className="min-h-screen bg-gray-100 p-4 flex justify-center items-start font-bengali">
            {/* Main Paper Container */}
            <div className="w-full max-w-[850px] bg-white shadow-2xl overflow-hidden relative print:shadow-none text-black">
                {/* --- Top Decorative Wave (Solid Purple from Image) --- */}
                {/* Top decorative waves */}
                <div className="absolute top-0 right-0 w-full h-[80px] z-0 overflow-hidden">
                    <div className="absolute right-0 top-0 w-[63%] h-full bg-[#e5daf8] rounded-bl-[120px] opacity-90" />
                    <div className="absolute right-0 top-0 w-[55%] h-full bg-[#8b6bbd] rounded-bl-[160px] opacity-90" />
                    <div className="absolute right-0 top-0 w-[45%] h-full bg-[#6a4aa3] rounded-bl-[160px] opacity-80" />
                    <div className="absolute right-0 top-0 w-[35%] h-full bg-[#4c2a70] rounded-bl-[160px]" />
                </div>

                <div className="p-8 pb-4 relative z-10">
                    {/* --- Header (Logo & Name) --- */}
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

                    {/* --- Student Info Grid (Light Grey Style from Image) --- */}
                    <div className="grid grid-cols-12 gap-0 border-t border-b border-gray-300 bg-gray-100 mb-6 text-sm">
                        {/* Row 1 */}
                        <div className="col-span-8 p-2 border-r border-b border-gray-300 flex items-center">
                            <span className="font-semibold w-12">নাম:</span>
                            <input
                                type="text"
                                className="bg-transparent border-b border-dotted border-gray-400 flex-1 outline-none px-2"
                            />
                        </div>
                        <div className="col-span-4 p-2 border-b border-gray-300 flex items-center bg-gray-200/50">
                            <span className="font-semibold w-12">তারিখ</span>
                            <input
                                type="text"
                                className="bg-transparent border-b border-dotted border-gray-400 flex-1 outline-none px-2"
                            />
                        </div>

                        {/* Row 2 */}
                        <div className="col-span-3 p-2 border-r border-gray-300 flex items-center bg-gray-200/50">
                            <span className="font-semibold w-10">শ্রেণি:</span>
                            <input
                                type="text"
                                className="bg-transparent flex-1 outline-none"
                            />
                        </div>
                        <div className="col-span-3 p-2 border-r border-gray-300 flex items-center">
                            <span className="font-semibold w-10">শাখা:</span>
                            <input
                                type="text"
                                className="bg-transparent flex-1 outline-none"
                            />
                        </div>
                        <div className="col-span-3 p-2 border-r border-gray-300 flex items-center bg-gray-200/50">
                            <span className="font-semibold w-10">রোল:</span>
                            <input
                                type="text"
                                className="bg-transparent flex-1 outline-none"
                            />
                        </div>
                        <div className="col-span-3 p-2 flex items-center">
                            <span className="font-semibold w-10">আইডি:</span>
                            <input
                                type="text"
                                className="bg-transparent flex-1 outline-none"
                            />
                        </div>
                    </div>

                    {/* --- Fee Table (Clean Style) --- */}
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
                                {feeItems.map((item, index) => (
                                    <tr
                                        key={index}
                                        className="even:bg-gray-100 odd:bg-gray-50 border-b border-gray-200"
                                    >
                                        <td className="p-2 border-r border-gray-200 font-medium">
                                            {item}
                                        </td>
                                        <td className="p-2 border-r border-gray-200">
                                            <input className="w-full bg-transparent outline-none text-center" />
                                        </td>
                                        <td className="p-2">
                                            <input className="w-full bg-transparent outline-none text-right" />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* --- Footer Grid (Clean Style) --- */}
                    <div className="grid grid-cols-12 gap-0 border border-gray-300 mt-4">
                        {/* Left: Months */}
                        <div className="col-span-8 flex flex-col">
                            <div className="p-3 bg-gray-50 border-b border-gray-200">
                                <div className="grid grid-cols-6 gap-2 text-xs font-semibold">
                                    {months.map((m, i) => (
                                        <label
                                            key={i}
                                            className="flex items-center gap-1 cursor-pointer"
                                        >
                                            <input type="checkbox" className="accent-[#4c2a70]" />
                                            <span>{m}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                            <div className="p-3 bg-gray-100 flex-1 flex items-start gap-2">
                                <span className="font-bold text-sm whitespace-nowrap">
                                    কথায়:
                                </span>
                                <div className="border-b border-dotted border-gray-400 w-full h-5"></div>
                            </div>
                        </div>
                        {/* Right: Totals */}
                        <div className="col-span-4 text-sm font-semibold">
                            <div className="grid grid-cols-2 h-full">
                                <div className="flex flex-col">
                                    <div className="flex-1 flex items-center justify-center bg-gray-200 border-b border-r border-white">
                                        সর্বমোট
                                    </div>
                                    <div className="flex-1 flex items-center justify-center bg-gray-200 border-b border-r border-white">
                                        অগ্রিম
                                    </div>
                                    <div className="flex-1 flex items-center justify-center bg-gray-200 border-r border-white text-[#9c27b0]">
                                        বকেয়া
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <div className="flex-1 bg-gray-50 border-b border-gray-200 p-1">
                                        <input className="w-full h-full bg-transparent text-right outline-none" />
                                    </div>
                                    <div className="flex-1 bg-gray-50 border-b border-gray-200 p-1">
                                        <input className="w-full h-full bg-transparent text-right outline-none" />
                                    </div>
                                    <div className="flex-1 bg-pink-50/50 p-1">
                                        <input className="w-full h-full bg-transparent text-right outline-none text-red-600" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* --- Bottom Contact Info --- */}
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
                            <p className="text-sm font-semibold">আদায়কারীর স্বাক্ষর</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Font Injection */}
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@300;400;500;600;700&display=swap');
        .font-bengali { font-family: 'Hind Siliguri', sans-serif; }
      `}</style>
        </div>
    );
};

export default PaymentSlip;