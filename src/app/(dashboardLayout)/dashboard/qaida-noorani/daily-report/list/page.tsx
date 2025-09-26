/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { useState } from "react"
import { Box } from "@mui/material"
import { useDeleteQaidaReportMutation, useGetAllQaidaReportsQuery } from "@/redux/api/qaidaDailyReportApi"
import { useRouter } from "next/navigation"
import { QaidaReport } from "@/interface/qaidaReport"
import Swal from 'sweetalert2'
import FiltersSection from "./__components/FiltersSection"
import StatsCards from "./__components/StatsCards"
import ReportsTable from "./__components/ReportsTable"
import AddReportFab from "./__components/AddReportFab"
import ViewReportDialog from "./__components/ViewReportDialog"
function QaidaReportDashboard() {
    const router = useRouter()
    const [selectedTab, setSelectedTab] = useState(0)
    const [searchQuery, setSearchQuery] = useState("")
    const [selectedReport, setSelectedReport] = useState<QaidaReport | null>(null)
    const [viewDialogOpen, setViewDialogOpen] = useState(false)
    const [filterStatus, setFilterStatus] = useState("all")
    const [filterTeacher, setFilterTeacher] = useState("all")
    const [deleteQaidaReport] = useDeleteQaidaReportMutation()
    const { data: qaidaData, isLoading, isError } = useGetAllQaidaReportsQuery({})

    // Extract reports from API response
    const reports = qaidaData?.data?.data || []

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setSelectedTab(newValue)
    }

    const handleViewReport = (report: QaidaReport) => {
        setSelectedReport(report)
        setViewDialogOpen(true)
    }

    const handleEditReport = (id: string) => {
        router.push(`/dashboard/qaida-noorani/daily-report/update?id=${id}`)
    }

    const handleDeleteReport = async (id: string) => {
        try {
            const result = await Swal.fire({
                title: "Are you sure?",
                text: "This action cannot be undone!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#d33",
                cancelButtonColor: "#3085d6",
                confirmButtonText: "Yes, delete it!",
            });

            if (result.isConfirmed) {
                await deleteQaidaReport(id).unwrap();
                Swal.fire("Deleted!", "Report has been deleted.", "success");
                setViewDialogOpen(false);
            }
        } catch (error) {
            Swal.fire("Error!", "Failed to delete report.", "error");
            console.error("Delete error:", error);
        }
    }

    const handleCreateReport = () => {
        router.push('/dashboard/qaida-noorani/daily-report/add')
    }

    return (
        <Box sx={{ display: 'flex', bgcolor: "grey.50", minHeight: "100vh" }}>
            {/* Main Content */}
            <Box component="main" sx={{ flexGrow: 1, p: 1, md: 3 }}>
                <StatsCards reports={reports} />

                <FiltersSection
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    filterTeacher={filterTeacher}
                    setFilterTeacher={setFilterTeacher}
                    reports={reports}
                    onCreateReport={handleCreateReport}
                />

                <ReportsTable
                    reports={reports}
                    selectedTab={selectedTab}
                    handleTabChange={handleTabChange}
                    searchQuery={searchQuery}
                    filterTeacher={filterTeacher}
                    isLoading={isLoading}
                    isError={isError}
                    onViewReport={handleViewReport}
                    onEditReport={handleEditReport}
                    onDeleteReport={handleDeleteReport}
                />
            </Box>

            <AddReportFab onClick={handleCreateReport} />

            <ViewReportDialog
                open={viewDialogOpen}
                onClose={() => setViewDialogOpen(false)}
                report={selectedReport}
                onEditReport={handleEditReport}
            />
        </Box>
    )
}

export default QaidaReportDashboard