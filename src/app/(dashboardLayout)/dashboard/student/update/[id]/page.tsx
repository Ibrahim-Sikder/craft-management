/* eslint-disable react-hooks/rules-of-hooks */

'use client'
import React from 'react';
import StudentForm from '../../_components/StudentForm';
interface PageProps {
    params: {
        id: string;
    };
}

const page = ({ params }: PageProps) => {
    return <StudentForm id={params.id} />
};


export default page;


