
'use client'
import ReportList from "@/components/common/ReportList";
import { useDeleteSunaniReportMutation, useGetAllSunaniReportsQuery } from "@/redux/api/sunaniDailyReportApi";

function SunaniReportList() {
    return (
        <ReportList
            useGetReportsQuery={useGetAllSunaniReportsQuery}
            useDeleteReportMutation={useDeleteSunaniReportMutation}
            title="Sunani Daily Reports"
            createPath="/dashboard/hifz/daily-report/sunani/add"
            updatePath="/dashboard/hifz/daily-report/sunani/update"
            reportType="nazera"
            showCharts={true}

            customColumns={{

            }}
        />
    )
}
export default SunaniReportList