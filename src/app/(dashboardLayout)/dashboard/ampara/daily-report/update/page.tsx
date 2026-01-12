'use client'

import React from 'react';

import { useSearchParams } from 'next/navigation';
import AmparaDailyReportForm from '../__components/AmparaDailyReportForm';

const UpdateReport = () => {
    const searchParams = useSearchParams();
    const id = searchParams.get("id")


    return <AmparaDailyReportForm id={id} />
};

export default UpdateReport;