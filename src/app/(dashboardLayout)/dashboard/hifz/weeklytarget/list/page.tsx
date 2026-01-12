import WeeklyReportList from '@/components/WeeklyReportList'
import React from 'react'

const ListPage = () => {
  const reportType = 'hifz'
  const title = 'হিফয ও শোনানী  ছাত্রদের সাপ্তাহিক রিপোর্ট'
  const addPath = '/dashboard/hifz/weeklytarget/add'
  return <WeeklyReportList reportType={reportType} title={title} addPath={addPath} />
}
export default ListPage