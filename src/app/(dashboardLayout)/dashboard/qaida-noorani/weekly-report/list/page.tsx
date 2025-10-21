import WeeklyReportList from '@/components/WeeklyReportList'
import React from 'react'

const page = () => {
  const reportType = 'qaida'
  const title = 'কায়েদা ও নুরানী ছাত্রদের সাপ্তাহিক রিপোর্ট তালিকা'
  const addPath = '/dashboard/qaida-noorani/weekly-report/add'
  return <WeeklyReportList reportType={reportType} title={title} addPath={addPath} />
}

export default page