import React from 'react'
import WeeklyReportForm from '../../../hifz/weeklytarget/__components/WeeklyReportForm'

const page = () => {
  const reportType = "qaida"
  const title = 'কায়েদা ও নুরানী ছাত্রদের সাপ্তাহিক রিপোর্ট'


  return <WeeklyReportForm reportType={reportType} title={title} />
}
export default page