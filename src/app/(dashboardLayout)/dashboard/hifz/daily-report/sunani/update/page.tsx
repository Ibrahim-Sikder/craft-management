'use client'

import React from 'react';

import { useSearchParams } from 'next/navigation';
import SunaniDailyReportForm from '../../__components/SunaniDailyReportForm';

const UpdateReport = () => {
    const searchParams = useSearchParams();
    const id = searchParams.get("id")


    return <SunaniDailyReportForm id={id} />
};

export default UpdateReport;