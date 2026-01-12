
'use client'
import ReportList from "@/components/common/ReportList";
import { useDeleteNazeraReportMutation, useGetAllNazeraReportsQuery } from "@/redux/api/nazeraDailyReportApi";
function NazeraReportList() {

    return (
        <ReportList
            useGetReportsQuery={useGetAllNazeraReportsQuery}
            useDeleteReportMutation={useDeleteNazeraReportMutation}
            title="Nazera Daily Reports"
            createPath="/dashboard/nazera/daily-report/add"
            updatePath="/dashboard/nazera/daily-report/update"
            reportType="soboki"
            showCharts={true}
        />
    )
}
export default NazeraReportList