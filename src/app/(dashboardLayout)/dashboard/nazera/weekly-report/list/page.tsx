import WeeklyReportList from '@/components/WeeklyReportList'
import React from 'react'

const page = () => {
  const reportType = 'nazera'
  const title = 'নাযেরা ছাত্রদের সাপ্তাহিক রিপোর্ট তালিকা'
  const addPath = '/dashboard/nazera/weekly-report/add'
  return <WeeklyReportList reportType={reportType} title={title} addPath={addPath} />
}

export default page