/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { Card, CardContent } from "@mui/material"
import CraftForm from "@/components/Forms/Form"
import { FieldValues } from "react-hook-form"
import { useCreateNazeraReportMutation, useGetSingleNazeraReportQuery, useUpdateNazeraReportMutation } from "@/redux/api/nazeraDailyReportApi"
import { toast } from "react-hot-toast"
import { calculateWeeklyTotals, formatReportData } from "@/utils/reportUtils"
import ReportHeader from "./ReportHeader"
import DailyReportTable from "./DailyReportTable"
import SubmitButton from "./SubmitButton"
import { DAYS_OF_WEEK } from "@/constant/daysConfig"
import { useRouter } from "next/navigation"
import { useAcademicOptions } from "@/hooks/useTeacherStudentOptions"
import BasicInfo from "@/components/common/BasicInfo"
import { LoadingState } from "@/components/common/LoadingState"

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
    const router = useRouter()
    const {teacherOptions, studentOptions} = useAcademicOptions()
    const [createNazeraReport, { isLoading }] = useCreateNazeraReportMutation()
    const [updateNazeraReport] = useUpdateNazeraReportMutation()
    const { data: singleData, isLoading: singleReportLoading } = useGetSingleNazeraReportQuery(id)


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
        return    <LoadingState/>
    }

    const defaultValue = transformApiDataToFormFields(singleData?.data);

    return (
        <>
            {
                singleReportLoading ? (
                       <LoadingState/>
                ) : (
                    <CraftForm onSubmit={handleSubmit} defaultValues={defaultValue}>
                        <Card sx={{ boxShadow: "none", "@media print": { boxShadow: "none", border: 0 } }}>
                            <ReportHeader />

                            <CardContent sx={{ p: 3 }}>
                                <BasicInfo
                                    teacherOptions={teacherOptions}
                                    studentOptions={studentOptions}
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