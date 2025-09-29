// components/HifzDailyReportForm.tsx
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import {
    Card,
    CardContent,
    Box,
    Table,
    TableContainer,
    TableHead,
    Paper,
} from "@mui/material"
import BasicInfo from "@/components/common/BasicInfo"
import { useAcademicOptions } from "@/hooks/useTeacherStudentOptions"
import CraftForm from "@/components/Forms/Form"
import { ReportHeader } from "@/components/common/ReportHeader"
import ReportTableRow from "@/components/tables/Daily/ReportTableRow"
import { tableStyle } from "@/style/customeStyle"

import { SubmitButton } from "@/components/common/SubmitButton"

import ReportTableBody from "@/components/tables/Daily/ReportTableBody"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"
import { calculateWeeklyTotals, formatReportData, transformApiDataToFormFields } from "@/utils/sunaniReport"
import { useCreateSobokiReportMutation, useGetSingleSobokiReportQuery, useUpdateSobokiReportMutation } from "@/redux/api/sobokiDailyReport"
import { useCreateAmparaReportMutation, useUpdateAmparaReportMutation } from "@/redux/api/amparaDailyReportApi"
import { LoadingState } from "@/components/common/LoadingState"

function AmparaDailyReport({ studentName, reportDate, month, id }: any) {
    const router = useRouter()
    const { teacherOptions, studentOptions } = useAcademicOptions()
    const [createAmparaReport, { isLoading }] = useCreateAmparaReportMutation()
    const [updateAmparaReport] = useUpdateAmparaReportMutation()
    const { data: singleData, isLoading: singleReportLoading } = useGetSingleSobokiReportQuery(id)

    console.log(singleData)



    const handleSubmit = async (formData: any) => {
        try {
            const weeklyTotals = calculateWeeklyTotals(formData)
            const formattedData = formatReportData(formData, weeklyTotals, month, id)
            let res
            if (id) {

                res = await updateAmparaReport({ id, data: formattedData }).unwrap()
            } else {
                res = await createAmparaReport(formattedData).unwrap()
            }
            if (res?.success) {
                toast.success(`Report ${id ? "updated" : "submitted"} successfully!`)
                router.push('/dashboard/ampara/daily-report/list')
            } else {
                toast.error("Failed to submit report")
            }
        } catch (error) {
            console.error("Error submitting report:", error)
            toast.error("An error occurred while submitting the report")
        }
    }

    if (singleReportLoading) {
        return <LoadingState/>
    }

    const defaultValue = transformApiDataToFormFields(singleData?.data);

    return (
        <CraftForm onSubmit={handleSubmit} defaultValues={defaultValue}>
            <Card sx={{ boxShadow: "none", "@media print": { boxShadow: "none", border: 0 } }}>



                <ReportHeader title="Ampara Students Daily Report" subtitleBangla="আমপারা ছাত্রদের দৈনিক রিপোর্ট" />

                <CardContent sx={{ p: 3 }}>
                    {/* Student Information */}
                    <BasicInfo
                        teacherOptions={teacherOptions}
                        studentOptions={studentOptions}
                        studentName={studentName}
                        reportDate={reportDate}
                    />
                    {/* Daily Entries Table */}
                    <Box sx={{ width: '100%', overflow: 'auto' }}>
                        <TableContainer component={Paper} sx={{ minWidth: 1200, '@media print': { minWidth: '100%' } }}>
                            <Table
                                size="small"
                                sx={tableStyle}
                            >
                                <TableHead>

                                    <ReportTableRow col1Label=' Morning (সকাল)' col2Label='	Afternoon (দুপুর)' col3Label=' 	Night (রাত)' />
                                </TableHead>
                                <ReportTableBody />
                            </Table>
                        </TableContainer>
                    </Box>
                    <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center', '@media print': { display: 'none' } }}>
                        <SubmitButton />
                    </Box>
                </CardContent>
            </Card>
        </CraftForm>
    )
}

export default AmparaDailyReport