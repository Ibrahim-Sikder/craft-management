/* eslint-disable react-hooks/rules-of-hooks */

'use client'
import React from 'react';
import SectionForm from '../../_components/SectionForm';
interface PageProps {
    params: {
        id: string;
    };
}
const page = ({ params }: PageProps) => {
    return <SectionForm id={params.id} />
};

export default page;