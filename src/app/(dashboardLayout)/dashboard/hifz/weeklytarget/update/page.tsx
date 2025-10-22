'use client'

import React from 'react'
import WeeklyReportForm from '../__components/WeeklyReportForm'
import { useSearchParams } from 'next/navigation';

const Update = () => {
    const searchParams = useSearchParams();
    const id = searchParams.get("id")
    const reportType = "hifz"
    const title = 'কাওসার ও নুরানী ছাত্রদের সাপ্তাহিক রিপোর্ট (হিফজ)'


    return <WeeklyReportForm id={id} reportType={reportType} title={title} />
}
export default Update




