/* eslint-disable react-hooks/rules-of-hooks */

'use client'
import React from 'react';
import StaffForm from '../_components/StaffForm';
interface PageProps {
    params: {
        id: string;
    };
}

const page = ({ params }: PageProps) => {
    return <StaffForm id={params.id} />
};


export default page;


