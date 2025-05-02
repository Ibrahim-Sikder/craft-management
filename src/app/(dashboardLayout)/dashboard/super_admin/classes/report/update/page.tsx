/* eslint-disable react-hooks/rules-of-hooks */

'use client'
import React from 'react';
import ClassReportForm from '../new/_components/ClassReportForm';
interface PageProps {
    params: {
        id: string;
    };
}
const page = ({ params }: PageProps) => {
    return <ClassReportForm id={params.id} />
};

export default page;