/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { useMemo, useState } from "react"
import { Card, CardContent } from "@mui/material"
import CraftForm from "@/components/Forms/Form"
import { useGetAllTeachersQuery } from "@/redux/api/teacherApi"
import { FieldValues } from "react-hook-form"
import { useCreateNazeraReportMutation, useGetSingleNazeraReportQuery, useUpdateNazeraReportMutation } from "@/redux/api/nazeraDailyReportApi"
import { toast } from "react-hot-toast"
import { calculateWeeklyTotals, formatReportData } from "@/utils/reportUtils"
import ReportHeader from "./ReportHeader"
import StudentInfoSection from "./StudentInfoSection"
import DailyReportTable from "./DailyReportTable"
import SubmitButton from "./SubmitButton"
import { DAYS_OF_WEEK } from "@/constant/daysConfig"
import { useRouter } from "next/navigation"

interface NazeraReportProps {
    studentName?: string
    reportDate?: string
    month?: string;
    id?: string | null;
}

// Helper function to transform API data to form field format
const transformApiDataToFormFields = (apiData: any) => {
    const formFields: any = {};

    if (!apiData) return formFields;

    // Transform basic fields
    formFields.reportDate = apiData.reportDate || "";
    formFields.studentName = apiData.studentName || "";
    formFields.teacherName = apiData.teacherName || "";
    formFields.month = apiData.month || "";
    formFields.totalPages = apiData.totalPages || 0;
    formFields.totalMistakes = apiData.totalMistakes || 0;
    formFields.totalDuas = apiData.totalDuas || 0;
    formFields.totalHadiths = apiData.totalHadiths || 0;

    // Transform dailyEntries to form fields
    if (apiData.dailyEntries) {
        Object.keys(apiData.dailyEntries).forEach(day => {
            const dayData = apiData.dailyEntries[day];

            // Handle time slots (morning, afternoon, night)
            ['morning', 'afternoon', 'night'].forEach(timeSlot => {
                if (dayData[timeSlot]) {
                    Object.keys(dayData[timeSlot]).forEach(field => {
                        const fieldName = `${day}${timeSlot.charAt(0).toUpperCase() + timeSlot.slice(1)}${field.charAt(0).toUpperCase() + field.slice(1)}`;
                        formFields[fieldName] = dayData[timeSlot][field];
                    });
                }
            });

            // Handle other fields
            formFields[`${day}TotalRead`] = dayData.totalRead || '';
            formFields[`${day}DuaHadithMasala`] = dayData.duaHadithMasala || '';
            formFields[`${day}Mashq`] = dayData.mashq || '';
            formFields[`${day}Tajweed`] = dayData.tajweed || '';
        });
    }

    return formFields;
};


function NazeraDailyReportForm({ studentName, reportDate, month, id }: NazeraReportProps) {
    const [page] = useState(0)
    const [searchTerm] = useState("")
    const limit = 10
    const router = useRouter()

    const [createNazeraReport, { isLoading }] = useCreateNazeraReportMutation()
    const [updateNazeraReport] = useUpdateNazeraReportMutation()
    const { data: singleData, isLoading: singleReportLoading } = useGetSingleNazeraReportQuery(id)

    const { data: teacherData } = useGetAllTeachersQuery({
        limit: limit,
        page: page + 1,
        searchTerm: searchTerm,
    })

    const teacherOptions = useMemo(() => {
        if (!teacherData?.data) return []
        return teacherData.data.map((teacher: any) => ({
            label: teacher.name,
            value: teacher._id,
        }))
    }, [teacherData])

    const handleSubmit = async (formData: FieldValues) => {
        try {
            const weeklyTotals = calculateWeeklyTotals(formData)
            const formattedData = formatReportData(formData, weeklyTotals, month, id)
            let res
            if (id) {
                res = await updateNazeraReport({ id, data: formattedData }).unwrap()

            } else {
                res = await createNazeraReport(formattedData).unwrap()
            }
            if (res?.success) {
                toast.success(`Report ${id ? "updated" : "submitted"} successfully!`)
                router.push('/dashboard/nazera/daily-report')

            } else {
                toast.error("Failed to submit report")
            }
        } catch (error) {
            console.error("Error submitting report:", error)
            toast.error("An error occurred while submitting the report")
        }
    }



    if (singleReportLoading) {
        return <h2> Loading....... </h2>
    }

    // Transform API data to form fields format
    const defaultValue = transformApiDataToFormFields(singleData?.data);

    return (
        <>
            {
                singleReportLoading ? (
                    <h2>Loading......</h2>
                ) : (
                    <CraftForm onSubmit={handleSubmit} defaultValues={defaultValue}>
                        <Card sx={{ boxShadow: "none", "@media print": { boxShadow: "none", border: 0 } }}>
                            <ReportHeader />

                            <CardContent sx={{ p: 3 }}>
                                <StudentInfoSection
                                    teacherOptions={teacherOptions}
                                    studentName={studentName || ''}
                                    reportDate={reportDate || ''}
                                />

                                <DailyReportTable days={DAYS_OF_WEEK} />

                                <SubmitButton isLoading={isLoading} />
                            </CardContent>
                        </Card>
                    </CraftForm>
                )
            }
        </>
    )
}

export default NazeraDailyReportForm