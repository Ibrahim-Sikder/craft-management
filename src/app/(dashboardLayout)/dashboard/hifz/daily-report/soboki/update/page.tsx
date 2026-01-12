'use client'

import React from 'react';

import { useSearchParams } from 'next/navigation';
import SobokiDailyReportForm from '../../__components/SobokiDailyReportForm';

const UpdateReport = () => {
    const searchParams = useSearchParams();
    const id = searchParams.get("id")


    return <SobokiDailyReportForm id={id} />
};

export default UpdateReport;