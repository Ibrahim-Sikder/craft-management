/* eslint-disable @typescript-eslint/no-explicit-any */
import { DAYS_OF_WEEK } from "@/constant/daysConfig"

// TypeScript interfaces
export interface DailyEntry {
    hadithNumber: string
    duaNumber: string
    tajweedSubject: string
    qaidaPage: string
    pageAmount: string
    hadithDuaRevision: string
    duaRevision: string
    tajweedRevision: string
    qaidaRevision: string
    teacherSignature: string
    comment: string
}

export interface QaidaReportData {
    reportDate: string
    studentName: string
    teacherName: string
    month: string
    weeklyTarget: string
    dailyEntries: Record<string, DailyEntry>
}

/**
 * Transform API data to form field format
 * @param apiData - Data from API
 * @returns Form field compatible data
 */
export function transformQaidaApiDataToFormFields(apiData: any): Record<string, any> {
    const formFields: Record<string, any> = {}

    if (!apiData) return formFields

    // Basic fields
    formFields.reportDate = apiData.reportDate || ""
    formFields.studentName = apiData.studentName || ""
    formFields.teacherName = apiData.teacherName || ""
    formFields.month = apiData.month || ""
    formFields.weeklyTarget = apiData.weeklyTarget || ""

    // Daily entries
    if (apiData.dailyEntries) {
        Object.keys(apiData.dailyEntries).forEach((day) => {
            const dayData = apiData.dailyEntries[day]
            if (dayData) {
                Object.keys(dayData).forEach((field) => {
                    // Format: {day}{Field} e.g., saturdayHadithNumber
                    const fieldName = `${day}${field.charAt(0).toUpperCase() + field.slice(1)}`
                    formFields[fieldName] = dayData[field] || ""
                })
            }
        })
    }

    return formFields
}

/**
 * Transform form fields to API data format
 * @param formData - Form field values
 * @returns API compatible data
 */
export function transformFormFieldsToQaidaApiData(formData: any): QaidaReportData {
    const apiData: QaidaReportData = {
        reportDate: formData.reportDate,
        studentName: formData.studentName,
        teacherName: formData.teacherName,
        month: formData.month,
        weeklyTarget: formData.weeklyTarget,
        dailyEntries: {}
    }

    // Process daily entries for each day
    DAYS_OF_WEEK.forEach(day => {
        const dayKey = day.key
        apiData.dailyEntries[dayKey] = {
            hadithNumber: formData[`${dayKey}HadithNumber`] || "",
            duaNumber: formData[`${dayKey}DuaNumber`] || "",
            tajweedSubject: formData[`${dayKey}TajweedSubject`] || "",
            qaidaPage: formData[`${dayKey}QaidaPage`] || "",
            pageAmount: formData[`${dayKey}PageAmount`] || "",
            hadithDuaRevision: formData[`${dayKey}HadithDuaRevision`] || "",
            duaRevision: formData[`${dayKey}DuaRevision`] || "",
            tajweedRevision: formData[`${dayKey}TajweedRevision`] || "",
            qaidaRevision: formData[`${dayKey}QaidaRevision`] || "",
            teacherSignature: formData[`${dayKey}TeacherSignature`] || "",
            comment: formData[`${dayKey}Comment`] || "",
        }
    })

    return apiData
}