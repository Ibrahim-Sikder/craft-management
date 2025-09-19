"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface NazeraReportProps {
  studentName: string
  reportDate: string
  month: string
}

export function NazeraReport({ studentName, reportDate, month }: NazeraReportProps) {
  const [weeklyTarget, setWeeklyTarget] = useState("")
  const [dailyEntries, setDailyEntries] = useState({
    saturday: {
      morning: { para: "", page: "", amount: "", mistakes: "" },
      afternoon: { para: "", page: "", amount: "", mistakes: "" },
      night: { para: "", page: "", amount: "", mistakes: "" },
      totalRead: "",
      duaHadithMasala: "",
      teacherSignature: "",
    },
    sunday: {
      morning: { para: "", page: "", amount: "", mistakes: "" },
      afternoon: { para: "", page: "", amount: "", mistakes: "" },
      night: { para: "", page: "", amount: "", mistakes: "" },
      totalRead: "",
      duaHadithMasala: "",
      teacherSignature: "",
    },
    monday: {
      morning: { para: "", page: "", amount: "", mistakes: "" },
      afternoon: { para: "", page: "", amount: "", mistakes: "" },
      night: { para: "", page: "", amount: "", mistakes: "" },
      totalRead: "",
      duaHadithMasala: "",
      teacherSignature: "",
    },
    tuesday: {
      morning: { para: "", page: "", amount: "", mistakes: "" },
      afternoon: { para: "", page: "", amount: "", mistakes: "" },
      night: { para: "", page: "", amount: "", mistakes: "" },
      totalRead: "",
      duaHadithMasala: "",
      teacherSignature: "",
    },
    wednesday: {
      morning: { para: "", page: "", amount: "", mistakes: "" },
      afternoon: { para: "", page: "", amount: "", mistakes: "" },
      night: { para: "", page: "", amount: "", mistakes: "" },
      totalRead: "",
      duaHadithMasala: "",
      teacherSignature: "",
    },
    thursday: {
      morning: { para: "", page: "", amount: "", mistakes: "" },
      afternoon: { para: "", page: "", amount: "", mistakes: "" },
      night: { para: "", page: "", amount: "", mistakes: "" },
      totalRead: "",
      duaHadithMasala: "",
      teacherSignature: "",
    },
    friday: {
      morning: { para: "", page: "", amount: "", mistakes: "" },
      afternoon: { para: "", page: "", amount: "", mistakes: "" },
      night: { para: "", page: "", amount: "", mistakes: "" },
      totalRead: "",
      duaHadithMasala: "",
      teacherSignature: "",
    },
  })

  const days = [
    { key: "saturday", name: "Saturday", bangla: "শনিবার" },
    { key: "sunday", name: "Sunday", bangla: "রবিবার" },
    { key: "monday", name: "Monday", bangla: "সোমবার" },
    { key: "tuesday", name: "Tuesday", bangla: "মঙ্গলবার" },
    { key: "wednesday", name: "Wednesday", bangla: "বুধবার" },
    { key: "thursday", name: "Thursday", bangla: "বৃহস্পতিবার" },
    { key: "friday", name: "Friday", bangla: "শুক্রবার" },
  ]

  const updateDayEntry = (day: string, section: string, field: string, value: string) => {
    setDailyEntries((prev) => ({
      ...prev,
      [day]: {
        ...prev[day as keyof typeof prev],
        [section]:
          section === "morning" || section === "afternoon" || section === "night"
            ? { ...prev[day as keyof typeof prev][section as "morning" | "afternoon" | "night"], [field]: value }
            : value,
      },
    }))
  }

  return (
    <Card className="print:shadow-none print:border-0">
      <CardHeader className="text-center border-b print:border-black">
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-gray-900">Craft International Institute</h1>
          <h2 className="text-lg font-semibold text-gray-700">Nazera Students Daily Report</h2>
          <h3 className="text-base text-gray-600">নাজেরা ছাত্রদের দৈনিক রিপোর্ট</h3>
        </div>
      </CardHeader>

      <CardContent className="p-6 space-y-6">
        {/* Student Information */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg print:bg-transparent print:border print:border-black">
          <div className="space-y-1">
            <Label className="text-sm font-semibold">Student Name (ছাত্রের নাম):</Label>
            <div className="border-b border-gray-400 pb-1 min-h-[24px]">{studentName || "_________________"}</div>
          </div>
          <div className="space-y-1">
            <Label className="text-sm font-semibold">Weekly Target (সাপ্তাহিক টার্গেট):</Label>
            <Input
              value={weeklyTarget}
              onChange={(e) => setWeeklyTarget(e.target.value)}
              className="print:border-0 print:border-b print:border-black print:rounded-none print:bg-transparent"
              placeholder="Enter weekly target"
            />
          </div>
          <div className="space-y-1">
            <Label className="text-sm font-semibold">Month (মাস):</Label>
            <div className="border-b border-gray-400 pb-1 min-h-[24px]">{month || "_________________"}</div>
          </div>
        </div>

        {/* Daily Entries Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300 print:border-black text-xs">
            <thead>
              <tr className="bg-gray-100 print:bg-transparent">
                <th className="border border-gray-300 print:border-black p-2 font-semibold">
                  Date/Day
                  <br />
                  (তারিখ/বার)
                </th>
                <th colSpan={4} className="border border-gray-300 print:border-black p-2 font-semibold">
                  Morning (সকাল)
                </th>
                <th colSpan={4} className="border border-gray-300 print:border-black p-2 font-semibold">
                  Afternoon (দুপুর)
                </th>
                <th colSpan={4} className="border border-gray-300 print:border-black p-2 font-semibold">
                  Night (রাত)
                </th>
                <th className="border border-gray-300 print:border-black p-2 font-semibold">
                  Total Read
                  <br />
                  (সর্বমোট পঠিত পৃষ্ঠা)
                </th>
                <th className="border border-gray-300 print:border-black p-2 font-semibold">
                  Dua/Hadith/Masala
                  <br />
                  (দোয়া/হাদিস/মাসয়ালা সংখ্যা/নং)
                </th>
                <th className="border border-gray-300 print:border-black p-2 font-semibold">
                  Teacher Signature
                  <br />
                  (শিক্ষকের স্বাক্ষর)
                </th>
              </tr>
              <tr className="bg-gray-50 print:bg-transparent">
                <th className="border border-gray-300 print:border-black p-1"></th>
                <th className="border border-gray-300 print:border-black p-1 text-xs">
                  Para
                  <br />
                  (পারা)
                </th>
                <th className="border border-gray-300 print:border-black p-1 text-xs">
                  Page
                  <br />
                  (পৃষ্ঠা নং)
                </th>
                <th className="border border-gray-300 print:border-black p-1 text-xs">
                  Amount
                  <br />
                  (পরিমাণ)
                </th>
                <th className="border border-gray-300 print:border-black p-1 text-xs">
                  Mistakes
                  <br />
                  (ভুল)
                </th>
                <th className="border border-gray-300 print:border-black p-1 text-xs">
                  Para
                  <br />
                  (পারা)
                </th>
                <th className="border border-gray-300 print:border-black p-1 text-xs">
                  Page
                  <br />
                  (পৃষ্ঠা নং)
                </th>
                <th className="border border-gray-300 print:border-black p-1 text-xs">
                  Amount
                  <br />
                  (পরিমাণ)
                </th>
                <th className="border border-gray-300 print:border-black p-1 text-xs">
                  Mistakes
                  <br />
                  (ভুল)
                </th>
                <th className="border border-gray-300 print:border-black p-1 text-xs">
                  Para
                  <br />
                  (পারা)
                </th>
                <th className="border border-gray-300 print:border-black p-1 text-xs">
                  Page
                  <br />
                  (পৃষ্ঠা নং)
                </th>
                <th className="border border-gray-300 print:border-black p-1 text-xs">
                  Amount
                  <br />
                  (পরিমাণ)
                </th>
                <th className="border border-gray-300 print:border-black p-1 text-xs">
                  Mistakes
                  <br />
                  (ভুল)
                </th>
                <th className="border border-gray-300 print:border-black p-1"></th>
                <th className="border border-gray-300 print:border-black p-1"></th>
                <th className="border border-gray-300 print:border-black p-1"></th>
              </tr>
            </thead>
            <tbody>
              {days.map((day) => (
                <tr key={day.key} className="hover:bg-gray-50 print:hover:bg-transparent">
                  <td className="border border-gray-300 print:border-black p-2 font-medium text-center">
                    {day.name}
                    <br />
                    <span className="text-xs text-gray-600">({day.bangla})</span>
                  </td>
                  {/* Morning */}
                  <td className="border border-gray-300 print:border-black p-1">
                    <Input
                      value={dailyEntries[day.key as keyof typeof dailyEntries].morning.para}
                      onChange={(e) => updateDayEntry(day.key, "morning", "para", e.target.value)}
                      className="border-0 p-1 text-xs print:bg-transparent h-6"
                    />
                  </td>
                  <td className="border border-gray-300 print:border-black p-1">
                    <Input
                      value={dailyEntries[day.key as keyof typeof dailyEntries].morning.page}
                      onChange={(e) => updateDayEntry(day.key, "morning", "page", e.target.value)}
                      className="border-0 p-1 text-xs print:bg-transparent h-6"
                    />
                  </td>
                  <td className="border border-gray-300 print:border-black p-1">
                    <Input
                      value={dailyEntries[day.key as keyof typeof dailyEntries].morning.amount}
                      onChange={(e) => updateDayEntry(day.key, "morning", "amount", e.target.value)}
                      className="border-0 p-1 text-xs print:bg-transparent h-6"
                    />
                  </td>
                  <td className="border border-gray-300 print:border-black p-1">
                    <Input
                      value={dailyEntries[day.key as keyof typeof dailyEntries].morning.mistakes}
                      onChange={(e) => updateDayEntry(day.key, "morning", "mistakes", e.target.value)}
                      className="border-0 p-1 text-xs print:bg-transparent h-6"
                    />
                  </td>
                  {/* Afternoon */}
                  <td className="border border-gray-300 print:border-black p-1">
                    <Input
                      value={dailyEntries[day.key as keyof typeof dailyEntries].afternoon.para}
                      onChange={(e) => updateDayEntry(day.key, "afternoon", "para", e.target.value)}
                      className="border-0 p-1 text-xs print:bg-transparent h-6"
                    />
                  </td>
                  <td className="border border-gray-300 print:border-black p-1">
                    <Input
                      value={dailyEntries[day.key as keyof typeof dailyEntries].afternoon.page}
                      onChange={(e) => updateDayEntry(day.key, "afternoon", "page", e.target.value)}
                      className="border-0 p-1 text-xs print:bg-transparent h-6"
                    />
                  </td>
                  <td className="border border-gray-300 print:border-black p-1">
                    <Input
                      value={dailyEntries[day.key as keyof typeof dailyEntries].afternoon.amount}
                      onChange={(e) => updateDayEntry(day.key, "afternoon", "amount", e.target.value)}
                      className="border-0 p-1 text-xs print:bg-transparent h-6"
                    />
                  </td>
                  <td className="border border-gray-300 print:border-black p-1">
                    <Input
                      value={dailyEntries[day.key as keyof typeof dailyEntries].afternoon.mistakes}
                      onChange={(e) => updateDayEntry(day.key, "afternoon", "mistakes", e.target.value)}
                      className="border-0 p-1 text-xs print:bg-transparent h-6"
                    />
                  </td>
                  {/* Night */}
                  <td className="border border-gray-300 print:border-black p-1">
                    <Input
                      value={dailyEntries[day.key as keyof typeof dailyEntries].night.para}
                      onChange={(e) => updateDayEntry(day.key, "night", "para", e.target.value)}
                      className="border-0 p-1 text-xs print:bg-transparent h-6"
                    />
                  </td>
                  <td className="border border-gray-300 print:border-black p-1">
                    <Input
                      value={dailyEntries[day.key as keyof typeof dailyEntries].night.page}
                      onChange={(e) => updateDayEntry(day.key, "night", "page", e.target.value)}
                      className="border-0 p-1 text-xs print:bg-transparent h-6"
                    />
                  </td>
                  <td className="border border-gray-300 print:border-black p-1">
                    <Input
                      value={dailyEntries[day.key as keyof typeof dailyEntries].night.amount}
                      onChange={(e) => updateDayEntry(day.key, "night", "amount", e.target.value)}
                      className="border-0 p-1 text-xs print:bg-transparent h-6"
                    />
                  </td>
                  <td className="border border-gray-300 print:border-black p-1">
                    <Input
                      value={dailyEntries[day.key as keyof typeof dailyEntries].night.mistakes}
                      onChange={(e) => updateDayEntry(day.key, "night", "mistakes", e.target.value)}
                      className="border-0 p-1 text-xs print:bg-transparent h-6"
                    />
                  </td>
                  {/* Total and other fields */}
                  <td className="border border-gray-300 print:border-black p-1">
                    <Input
                      value={dailyEntries[day.key as keyof typeof dailyEntries].totalRead}
                      onChange={(e) => updateDayEntry(day.key, "totalRead", "", e.target.value)}
                      className="border-0 p-1 text-xs print:bg-transparent h-6"
                    />
                  </td>
                  <td className="border border-gray-300 print:border-black p-1">
                    <Input
                      value={dailyEntries[day.key as keyof typeof dailyEntries].duaHadithMasala}
                      onChange={(e) => updateDayEntry(day.key, "duaHadithMasala", "", e.target.value)}
                      className="border-0 p-1 text-xs print:bg-transparent h-6"
                    />
                  </td>
                  <td className="border border-gray-300 print:border-black p-1">
                    <Input
                      value={dailyEntries[day.key as keyof typeof dailyEntries].teacherSignature}
                      onChange={(e) => updateDayEntry(day.key, "teacherSignature", "", e.target.value)}
                      className="border-0 p-1 text-xs print:bg-transparent h-6"
                    />
                  </td>
                </tr>
              ))}
              <tr className="bg-gray-100 print:bg-transparent font-semibold">
                <td className="border border-gray-300 print:border-black p-2 text-center">
                  Weekly Total
                  <br />
                  (সপ্তাহের মোট হিসাব)
                </td>
                <td colSpan={15} className="border border-gray-300 print:border-black p-2">
                  <div className="grid grid-cols-4 gap-2 text-xs">
                    <span>Total Pages: ____</span>
                    <span>Total Mistakes: ____</span>
                    <span>Total Duas: ____</span>
                    <span>Total Hadith: ____</span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}
