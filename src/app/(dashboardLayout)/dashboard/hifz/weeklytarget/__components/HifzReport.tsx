"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface HifzReportProps {
  studentName: string
  reportDate: string
  month: string
}

export function HifzReport({ studentName, reportDate, month }: HifzReportProps) {
  const [weeklyTarget, setWeeklyTarget] = useState("")
  const [dailyEntries, setDailyEntries] = useState({
    saturday: {
      sabakSeven: { para: "", page: "" },
      sabakAmukta: { para: "", page: "" },
      tilawaAmount: "",
      teacherSignature: "",
      thursdayWeeklyRevision: "",
    },
    sunday: {
      sabakSeven: { para: "", page: "" },
      sabakAmukta: { para: "", page: "" },
      tilawaAmount: "",
      teacherSignature: "",
      thursdayWeeklyRevision: "",
    },
    monday: {
      sabakSeven: { para: "", page: "" },
      sabakAmukta: { para: "", page: "" },
      tilawaAmount: "",
      teacherSignature: "",
      thursdayWeeklyRevision: "",
    },
    tuesday: {
      sabakSeven: { para: "", page: "" },
      sabakAmukta: { para: "", page: "" },
      tilawaAmount: "",
      teacherSignature: "",
      thursdayWeeklyRevision: "",
    },
    wednesday: {
      sabakSeven: { para: "", page: "" },
      sabakAmukta: { para: "", page: "" },
      tilawaAmount: "",
      teacherSignature: "",
      thursdayWeeklyRevision: "",
    },
    thursday: {
      sabakSeven: { para: "", page: "" },
      sabakAmukta: { para: "", page: "" },
      tilawaAmount: "",
      teacherSignature: "",
      thursdayWeeklyRevision: "",
    },
    friday: {
      sabakSeven: { para: "", page: "" },
      sabakAmukta: { para: "", page: "" },
      tilawaAmount: "",
      teacherSignature: "",
      thursdayWeeklyRevision: "",
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
          section === "sabakSeven" || section === "sabakAmukta"
            ? { ...prev[day as keyof typeof prev][section as "sabakSeven" | "sabakAmukta"], [field]: value }
            : value,
      },
    }))
  }

  return (
    <Card className="print:shadow-none print:border-0">
      <CardHeader className="text-center border-b print:border-black">
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-gray-900">Craft International Institute</h1>
          <h2 className="text-lg font-semibold text-gray-700">Hifz Students Daily Report</h2>
          <h3 className="text-base text-gray-600">হিফজ শিক্ষার্থীদের দৈনিক রিপোর্ট</h3>
        </div>
      </CardHeader>

      <CardContent className="p-6 space-y-6">
        {/* Student Information */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg print:bg-transparent print:border print:border-black">
          <div className="space-y-1">
            <Label className="text-sm font-semibold">Student Name (শিক্ষার্থীর নাম):</Label>
            <div className="border-b border-gray-400 pb-1 min-h-[24px]">{studentName || "_________________"}</div>
          </div>
          <div className="space-y-1">
            <Label className="text-sm font-semibold">Date (তারিখ):</Label>
            <div className="border-b border-gray-400 pb-1 min-h-[24px]">{reportDate || "_________________"}</div>
          </div>
          <div className="space-y-1">
            <Label className="text-sm font-semibold">Month (মাস):</Label>
            <div className="border-b border-gray-400 pb-1 min-h-[24px]">{month || "_________________"}</div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-blue-50 rounded-lg print:bg-transparent print:border print:border-black">
          <div className="space-y-2">
            <Label className="text-sm font-semibold">Page Count & Number (পারার সংখ্যা ও নং):</Label>
            <Input
              className="print:border-0 print:border-b print:border-black print:rounded-none print:bg-transparent"
              placeholder="Enter para details"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-semibold">Total Pages (মোট পারা):</Label>
            <Input
              className="print:border-0 print:border-b print:border-black print:rounded-none print:bg-transparent"
              placeholder="Enter total pages"
            />
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
                <th colSpan={2} className="border border-gray-300 print:border-black p-2 font-semibold">
                  Sabak Seven - Sabak Amukta
                  <br />
                  (সবক সাত - সবক আমুক্তা পেছনের পড়া)
                </th>
                <th className="border border-gray-300 print:border-black p-2 font-semibold">
                  Tilawat
                  <br />
                  (তিলাওয়াত পারা নং)
                </th>
                <th className="border border-gray-300 print:border-black p-2 font-semibold">
                  Teacher Signature
                  <br />
                  (শিক্ষকের স্বাক্ষর)
                </th>
                <th className="border border-gray-300 print:border-black p-2 font-semibold">
                  Thursday Weekly Revision
                  <br />
                  (বৃহস্পতিবার সাপ্তাহিক শবনা রিভিশন)
                </th>
              </tr>
              <tr className="bg-gray-50 print:bg-transparent">
                <th className="border border-gray-300 print:border-black p-1"></th>
                <th className="border border-gray-300 print:border-black p-1 text-xs">
                  Para & Page No
                  <br />
                  (পারা ও পৃষ্ঠা নং)
                </th>
                <th className="border border-gray-300 print:border-black p-1 text-xs">
                  Para & Page No
                  <br />
                  (পারা ও পৃষ্ঠা নং)
                </th>
                <th className="border border-gray-300 print:border-black p-1 text-xs">
                  Amount
                  <br />
                  (পরিমাণ)
                </th>
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
                  <td className="border border-gray-300 print:border-black p-1">
                    <Input
                      value={`${dailyEntries[day.key as keyof typeof dailyEntries].sabakSeven.para} ${dailyEntries[day.key as keyof typeof dailyEntries].sabakSeven.page}`}
                      onChange={(e) => {
                        const [para, page] = e.target.value.split(" ")
                        updateDayEntry(day.key, "sabakSeven", "para", para || "")
                        updateDayEntry(day.key, "sabakSeven", "page", page || "")
                      }}
                      className="border-0 p-1 text-xs print:bg-transparent h-8"
                      placeholder="Para Page"
                    />
                  </td>
                  <td className="border border-gray-300 print:border-black p-1">
                    <Input
                      value={`${dailyEntries[day.key as keyof typeof dailyEntries].sabakAmukta.para} ${dailyEntries[day.key as keyof typeof dailyEntries].sabakAmukta.page}`}
                      onChange={(e) => {
                        const [para, page] = e.target.value.split(" ")
                        updateDayEntry(day.key, "sabakAmukta", "para", para || "")
                        updateDayEntry(day.key, "sabakAmukta", "page", page || "")
                      }}
                      className="border-0 p-1 text-xs print:bg-transparent h-8"
                      placeholder="Para Page"
                    />
                  </td>
                  <td className="border border-gray-300 print:border-black p-1">
                    <Input
                      value={dailyEntries[day.key as keyof typeof dailyEntries].tilawaAmount}
                      onChange={(e) => updateDayEntry(day.key, "tilawaAmount", "", e.target.value)}
                      className="border-0 p-1 text-xs print:bg-transparent h-8"
                      placeholder="Amount"
                    />
                  </td>
                  <td className="border border-gray-300 print:border-black p-1">
                    <Input
                      value={dailyEntries[day.key as keyof typeof dailyEntries].teacherSignature}
                      onChange={(e) => updateDayEntry(day.key, "teacherSignature", "", e.target.value)}
                      className="border-0 p-1 text-xs print:bg-transparent h-8"
                      placeholder="Signature"
                    />
                  </td>
                  <td className="border border-gray-300 print:border-black p-1">
                    <Input
                      value={dailyEntries[day.key as keyof typeof dailyEntries].thursdayWeeklyRevision}
                      onChange={(e) => updateDayEntry(day.key, "thursdayWeeklyRevision", "", e.target.value)}
                      className="border-0 p-1 text-xs print:bg-transparent h-8"
                      placeholder="Weekly Revision"
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
                <td colSpan={5} className="border border-gray-300 print:border-black p-2">
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <span>Total Sabak: ____</span>
                    <span>Total Tilawat: ____</span>
                    <span>Total Revision: ____</span>
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
