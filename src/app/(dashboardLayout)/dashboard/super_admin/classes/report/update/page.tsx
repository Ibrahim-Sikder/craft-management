/* eslint-disable react-hooks/rules-of-hooks */

'use client'
import React from 'react';;
import { useSearchParams } from 'next/navigation';
import ClassReportForm from '../new/_components/ClassReportForm';

const page = () => {
    const searchParams = useSearchParams();
    const id = searchParams.get('id') || '';
    return <ClassReportForm id={id} />
};

export default page;

