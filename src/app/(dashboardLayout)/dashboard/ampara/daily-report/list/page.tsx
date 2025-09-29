
'use client'
import ReportList from "@/components/common/ReportList";
import { useDeleteAmparaReportMutation, useGetAllAmparaReportsQuery } from "@/redux/api/amparaDailyReportApi";
function AmparaReportList() {

    return (
        <ReportList
            useGetReportsQuery={useGetAllAmparaReportsQuery}
            useDeleteReportMutation={useDeleteAmparaReportMutation}
            title="Ampara Daily Reports"
            createPath="/dashboard/daily-report/ampara/add"
            updatePath="/dashboard/daily-report/ampara/update"
            reportType="soboki"
            showCharts={true}
        />
    )
}
export default AmparaReportList