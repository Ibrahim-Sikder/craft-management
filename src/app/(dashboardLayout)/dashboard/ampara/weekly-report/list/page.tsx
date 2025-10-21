import WeeklyReportList from '@/components/WeeklyReportList'
import React from 'react'

const page = () => {
  const reportType = 'ampara'
  const title = 'আমাপারা ছাত্রদের সাপ্তাহিক রিপোর্ট'
  const addPath = '/dashboard/ampara/weekly-report/add'
  return <WeeklyReportList reportType={reportType} title={title} addPath={addPath} />
}

export default page