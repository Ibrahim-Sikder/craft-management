'use client'

import React from 'react';
import NazeraDailyReportForm from '../../__components/NazeraDailyReportForm';
import { useSearchParams } from 'next/navigation';

const UpdateReport = () => {
    const searchParams = useSearchParams();
    const id = searchParams.get("id")


    return <NazeraDailyReportForm id={id} />
};

export default UpdateReport;