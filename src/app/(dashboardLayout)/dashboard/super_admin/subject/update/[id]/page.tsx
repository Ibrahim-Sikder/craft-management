/* eslint-disable react-hooks/rules-of-hooks */

'use client'
import React from 'react';
import SubjectForm from '../../_components/SubjectForm';
interface PageProps {
    params: {
        id: string;
    };
}
const page = ({ params }: PageProps) => {
    return <SubjectForm id={params.id} />
};

export default page;