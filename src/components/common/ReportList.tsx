// components/ReportList/ReportList.tsx
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { useState, useEffect } from "react"
import {
    Box,
    Grid,
    Dialog,
} from "@mui/material"
import { useRouter } from "next/navigation"
import {  Report, ReportListProps } from "@/interface/hifzReport"
import { ReportListHeader } from "./DailyReportListHeader"
import { ReportCard } from "./ReportCard"
import { ReportDialog } from "./ReportDialog"
import { LoadingState } from "./LoadingState"

function ReportList({
    useGetReportsQuery,
    useDeleteReportMutation,
    title,
    createPath,
    updatePath,
    reportType,
    showCharts = true,
    customColumns = {},
    customSummaryColumns = {}
}: ReportListProps) {
    const router = useRouter()
    const { data: reportsData, isLoading, refetch } = useGetReportsQuery({})
    const [deleteReport] = useDeleteReportMutation()
    const [reports, setReports] = useState<Report[]>([])
    const [filteredReports, setFilteredReports] = useState<Report[]>([])
    const [selectedReport, setSelectedReport] = useState<Report | null>(null)
    const [viewDialogOpen, setViewDialogOpen] = useState(false)
    const [searchTerm, setSearchTerm] = useState("")
    const [filterStatus, setFilterStatus] = useState<string>("all")

    useEffect(() => {
        if (reportsData?.data) {
            setReports(reportsData.data.data)
            setFilteredReports(reportsData.data.data)
        }
    }, [reportsData])

    useEffect(() => {
        if (reports.length > 0) {
            const filtered = reports?.filter(
                (report) =>
                    report.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    report.teacherName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    report.month.toLowerCase().includes(searchTerm.toLowerCase())
            )

            if (filterStatus !== "all") {
                // Add status filtering logic if needed
            }

            setFilteredReports(filtered)
        }
    }, [searchTerm, reports, filterStatus])

    const handleViewReport = (report: Report) => {
        setSelectedReport(report)
        setViewDialogOpen(true)
    }

    const handleCloseDialog = () => {
        setViewDialogOpen(false)
        setSelectedReport(null)
    }

    const handleEditReport = (id: string) => {
        router.push(`${updatePath}?id=${id}`)
    }

    const handleDeleteReport = async (id: string) => {
        try {
            await deleteReport(id).unwrap()
            refetch()
        } catch (error) {
        }
    }

    if (isLoading) {
        return <LoadingState />
    }

    return (
        <Box sx={{ flexGrow: 1, minHeight: '100vh' }}>
            <ReportListHeader
                title={title}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                onRefresh={refetch}
            />


            <Grid container spacing={3} sx={{ mt: 3, px: 3 }}>
                {
                    filteredReports.map((report, index) => (
                        <Grid item xs={12} key={report._id}>
                            <ReportCard
                                report={report}
                                onView={handleViewReport}
                                onEdit={handleEditReport}
                                onDelete={handleDeleteReport}
                                customColumns={customColumns}
                                customSummaryColumns={customSummaryColumns}
                            />
                        </Grid>
                    ))
                }
            </Grid>

            <ReportDialog
                open={viewDialogOpen}
                onClose={handleCloseDialog}
                report={selectedReport}
                showCharts={showCharts}
                customColumns={customColumns}
                customSummaryColumns={customSummaryColumns}
            />
        </Box>
    )
}

export default ReportList