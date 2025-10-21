import React from 'react'
import WeeklyReportForm from '../__components/WeeklyReportForm'

const page = () => {
  const reportType = "hifz"
  const title = 'কাওসার ও নুরানী ছাত্রদের সাপ্তাহিক রিপোর্ট (হিফজ)'


  return <WeeklyReportForm reportType={reportType} title={title} />
}
export default page