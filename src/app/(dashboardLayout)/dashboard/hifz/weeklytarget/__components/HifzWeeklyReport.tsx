"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface HifzWeeklyReportProps {
  studentName: string
  reportDate: string
  month: string
}

export function HifzWeeklyReport({ studentName, reportDate, month }: HifzWeeklyReportProps) {
  const [weeklyEntries, setWeeklyEntries] = useState([
    {
      weeklyTarget: "",
      sabakSeven: "",
      sabakAmukta: "",
      tilawaRevision: "",
      weeklyRevision: "",
      totalParaPages: "",
      weeklyReport: "",
      mistakeCount: "",
    },
    {
      weeklyTarget: "",
      sabakSeven: "",
      sabakAmukta: "",
      tilawaRevision: "",
      weeklyRevision: "",
      totalParaPages: "",
      weeklyReport: "",
      mistakeCount: "",
    },
    {
      weeklyTarget: "",
      sabakSeven: "",
      sabakAmukta: "",
      tilawaRevision: "",
      weeklyRevision: "",
      totalParaPages: "",
      weeklyReport: "",
      mistakeCount: "",
    },
    {
      weeklyTarget: "",
      sabakSeven: "",
      sabakAmukta: "",
      tilawaRevision: "",
      weeklyRevision: "",
      totalParaPages: "",
      weeklyReport: "",
      mistakeCount: "",
    },
  ])

  const updateWeeklyEntry = (index: number, field: string, value: string) => {
    setWeeklyEntries((prev) => prev.map((entry, i) => (i === index ? { ...entry, [field]: value } : entry)))
  }

  return (
    <Card className="print:shadow-none print:border-0">
      <CardHeader className="text-center border-b print:border-black">
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-gray-900">Craft International Institute</h1>
          <h2 className="text-lg font-semibold text-gray-700">Hifz Students Weekly Report</h2>
          <h3 className="text-base text-gray-600">হিফজ শিক্ষার্থীদের সাপ্তাহিক রিপোর্ট</h3>
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

        {/* Weekly Entries */}
        <div className="space-y-6">
          {weeklyEntries.map((entry, index) => (
            <Card key={index} className="border-2 border-gray-200 print:border-black">
              <CardHeader className="pb-3">
                <h3 className="text-lg font-semibold text-center">
                  Week {index + 1} Report (একনজরে {index + 1} সপ্তাহের রিপোর্ট)
                </h3>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Weekly Target */}
                <div className="space-y-2">
                  <Label className="text-sm font-semibold">Weekly Target (একনজরে এই সপ্তাহের টার্গেট):</Label>
                  <Textarea
                    value={entry.weeklyTarget}
                    onChange={(e) => updateWeeklyEntry(index, "weeklyTarget", e.target.value)}
                    className="min-h-[60px] print:border print:border-black print:bg-transparent"
                    placeholder="Enter weekly target details"
                  />
                </div>

                {/* Hifz Specific Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold">Sabak Seven (সবক সাত):</Label>
                    <Input
                      value={entry.sabakSeven}
                      onChange={(e) => updateWeeklyEntry(index, "sabakSeven", e.target.value)}
                      className="print:border print:border-black print:bg-transparent"
                      placeholder="Sabak seven details"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold">Sabak Amukta (সবক আমুক্তা):</Label>
                    <Input
                      value={entry.sabakAmukta}
                      onChange={(e) => updateWeeklyEntry(index, "sabakAmukta", e.target.value)}
                      className="print:border print:border-black print:bg-transparent"
                      placeholder="Sabak amukta details"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold">Tilawa Revision (তিলাওয়াত রিভিশন):</Label>
                    <Input
                      value={entry.tilawaRevision}
                      onChange={(e) => updateWeeklyEntry(index, "tilawaRevision", e.target.value)}
                      className="print:border print:border-black print:bg-transparent"
                      placeholder="Tilawa revision"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold">Weekly Revision (সাপ্তাহিক শবনা):</Label>
                    <Input
                      value={entry.weeklyRevision}
                      onChange={(e) => updateWeeklyEntry(index, "weeklyRevision", e.target.value)}
                      className="print:border print:border-black print:bg-transparent"
                      placeholder="Weekly revision"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold">Total Para/Pages (পারার সংখ্যা ও নং):</Label>
                    <Input
                      value={entry.totalParaPages}
                      onChange={(e) => updateWeeklyEntry(index, "totalParaPages", e.target.value)}
                      className="print:border print:border-black print:bg-transparent"
                      placeholder="Para and page count"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold">Mistake Count (ভুলের সংখ্যা):</Label>
                    <Input
                      value={entry.mistakeCount}
                      onChange={(e) => updateWeeklyEntry(index, "mistakeCount", e.target.value)}
                      className="print:border print:border-black print:bg-transparent"
                      placeholder="Number of mistakes"
                    />
                  </div>
                </div>

                {/* Weekly Report */}
                <div className="space-y-2">
                  <Label className="text-sm font-semibold">Weekly Report (একনজরে এই সপ্তাহের রিপোর্ট):</Label>
                  <Textarea
                    value={entry.weeklyReport}
                    onChange={(e) => updateWeeklyEntry(index, "weeklyReport", e.target.value)}
                    className="min-h-[80px] print:border print:border-black print:bg-transparent"
                    placeholder="Enter detailed weekly report"
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Summary Section */}
        <Card className="border-2 border-purple-200 bg-purple-50 print:bg-transparent print:border-black">
          <CardHeader>
            <h3 className="text-lg font-semibold text-center">Monthly Summary (মাসিক সারসংক্ষেপ)</h3>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-semibold">Total Para Memorized:</Label>
                <Input
                  className="print:border print:border-black print:bg-transparent"
                  placeholder="Total para memorized"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-semibold">Memorization Quality:</Label>
                <Input className="print:border print:border-black print:bg-transparent" placeholder="Quality rating" />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-semibold">Revision Consistency:</Label>
                <Input
                  className="print:border print:border-black print:bg-transparent"
                  placeholder="Revision consistency"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-semibold">Overall Performance:</Label>
                <Input
                  className="print:border print:border-black print:bg-transparent"
                  placeholder="Performance rating"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-semibold">Teacher's Comments:</Label>
              <Textarea
                className="min-h-[60px] print:border print:border-black print:bg-transparent"
                placeholder="Teacher's overall comments and recommendations"
              />
            </div>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  )
}
