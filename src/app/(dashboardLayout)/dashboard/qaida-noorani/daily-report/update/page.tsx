'use client'

import React from 'react';
import QaidaDailyReportForm from '../../__components/QaidaDailyReportForm';
import { useSearchParams } from 'next/navigation';

const UpdateQaidaReport = () => {
    const searchParams = useSearchParams();
    const id = searchParams.get("id")
    return <QaidaDailyReportForm id={id || ''} />
};

export default UpdateQaidaReport;