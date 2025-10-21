'use client'

import React from 'react'
import WeeklyReportForm from '../__components/WeeklyReportForm'
import { useSearchParams } from 'next/navigation';

export const Update = () => {
    const searchParams = useSearchParams();
    const id = searchParams.get("id")

    return <WeeklyReportForm id={id} />
}
export default Update




