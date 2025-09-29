/* eslint-disable @typescript-eslint/no-explicit-any */

// types/report.ts
export interface DailyEntry {
  sobok: { para: string; page: string }
  sabakSeven: { para: string; page: string }
  sabakAmukta: { para: string; page: string }
  satSobok: { para: string; page: string; amount: string; wrong: string }
  tilawaAmount: string
  mashq: string
  tajweed: string
  teacherSignature: string
  thursdayWeeklyRevision: string
}

export interface WeeklySummary {
  totalSobok: number
  totalSatSobok: number
  totalSabakAmukta: number
  totalTilawat: number
  totalRevision: number
}

export interface BaseReport {
  _id: string
  teacherName: string
  studentName: string
  reportDate: string
  month: string
  weeklyTarget: string
  weeklySummary: WeeklySummary
  createdAt: string
  updatedAt: string
}

export interface SobokiReport extends BaseReport {
  dailyEntries: Record<string, DailyEntry>
  reportType: 'soboki'
}

export interface NazeraReport extends BaseReport {
  dailyEntries: Record<string, DailyEntry>
  reportType: 'nazera'
  // Add any Nazera-specific fields here
}

export type Report = SobokiReport | NazeraReport

export interface ReportListProps {
    useGetReportsQuery: any
    useDeleteReportMutation: any

    title: string
    createPath: string
    updatePath: string
    reportType: 'soboki' | 'nazera'

    showCharts?: boolean
    customColumns?: {
        [key: string]: {
            label: string
            render: (data: any) => React.ReactNode
        }
    }
    customSummaryColumns?: {
        [key: string]: {
            label: string
            render: (data: any) => React.ReactNode
        }
    }
}