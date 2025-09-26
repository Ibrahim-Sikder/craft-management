/* eslint-disable @typescript-eslint/no-explicit-any */
import { DAYS_OF_WEEK } from "@/constant/daysConfig"
import { FieldValues } from "react-hook-form"

export const calculateWeeklyTotals = (data: FieldValues) => {
  let totalPages = 0
  let totalMistakes = 0
  let totalDuas = 0
  let totalHadiths = 0

  DAYS_OF_WEEK.forEach(day => {
    totalPages += parseInt(data[`${day.key}TotalRead`] || "0", 10)
    
    totalMistakes += parseInt(data[`${day.key}MorningMistakes`] || "0", 10)
    totalMistakes += parseInt(data[`${day.key}AfternoonMistakes`] || "0", 10)
    totalMistakes += parseInt(data[`${day.key}NightMistakes`] || "0", 10)
    
    const duaHadithMasala = data[`${day.key}DuaHadithMasala`] || ""
    const parts = duaHadithMasala.split('/').map((part:any) => part.trim())
    
    if (parts.length >= 1) totalDuas += parseInt(parts[0], 10) || 0
    if (parts.length >= 2) totalHadiths += parseInt(parts[1], 10) || 0
  })

  return { totalPages, totalMistakes, totalDuas, totalHadiths }
}

export const formatReportData = (data: FieldValues, weeklyTotals: any, month?: string, id?: string | null) => {
  const dailyEntries: any = {}

  DAYS_OF_WEEK.forEach(day => {
    dailyEntries[day.key] = {
      morning: {
        para: data[`${day.key}MorningPara`] || "",
        page: data[`${day.key}MorningPage`] || "",
        amount: data[`${day.key}MorningAmount`] || "",
        mistakes: data[`${day.key}MorningMistakes`] || "",
      },
      afternoon: {
        para: data[`${day.key}AfternoonPara`] || "",
        page: data[`${day.key}AfternoonPage`] || "",
        amount: data[`${day.key}AfternoonAmount`] || "",
        mistakes: data[`${day.key}AfternoonMistakes`] || "",
      },
      night: {
        para: data[`${day.key}NightPara`] || "",
        page: data[`${day.key}NightPage`] || "",
        amount: data[`${day.key}NightAmount`] || "",
        mistakes: data[`${day.key}NightMistakes`] || "",
      },
      totalRead: data[`${day.key}TotalRead`] || "",
      duaHadithMasala: data[`${day.key}DuaHadithMasala`] || "",
      mashq: data[`${day.key}Mashq`] || "না",
      tajweed: data[`${day.key}Tajweed`] || "",
    }
  })

  const formattedData = {
    teacherName: data.teacherName, // Changed from .label to direct value
    studentName: data.studentName, // Changed from .label to direct value
    reportDate: data.reportDate,
    month: month || new Date().getMonth().toString(),
    dailyEntries,
    ...weeklyTotals
  }

  // Add ID if it exists (for updates)
  if (id) {
    formattedData._id = id;
  }

  return formattedData
}