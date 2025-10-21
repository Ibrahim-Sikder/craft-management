import WeeklyReportList from '@/components/WeeklyReportList'
import React from 'react'

export const page = () => {
  const reportType = 'hifz'
  const title = 'কাওসার ও নুরানী ছাত্রদের সাপ্তাহিক রিপোর্ট (হিফজ)'
  const addPath = '/dashboard/hifz/weeklytarget/add'
  return <WeeklyReportList reportType={reportType} title={title} addPath={addPath} />
}
export default page