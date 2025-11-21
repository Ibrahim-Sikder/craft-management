import React from 'react'
import WeeklyReportForm from '../__components/WeeklyReportForm'

const page = () => {
  const reportType = "hifz"
  const title = 'হিফয ও শোনানী  ছাত্রদের সাপ্তাহিক রিপোর্ট'


  return <WeeklyReportForm reportType={reportType} title={title} />
}
export default page