
'use client'
import ReportList from "@/components/common/ReportList";
import { useDeleteSobokiReportMutation, useGetAllSobokiReportsQuery } from "@/redux/api/sobokiDailyReport";


function SobokiReportList() {

  return (
    <ReportList
      useGetReportsQuery={useGetAllSobokiReportsQuery}
      useDeleteReportMutation={useDeleteSobokiReportMutation}
      title="Soboki Daily Reports"
      createPath="/dashboard/hifz/daily-report/soboki/add"
      updatePath="/dashboard/hifz/daily-report/soboki/update"
      reportType="soboki"
      showCharts={true}
    />
  )
}
export default SobokiReportList