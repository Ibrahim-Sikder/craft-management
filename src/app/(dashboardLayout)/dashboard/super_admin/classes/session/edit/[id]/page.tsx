/* eslint-disable react-hooks/rules-of-hooks */

'use client'
import React from 'react';
import SessionForm from '../../_components/SessionForm';
interface PageProps {
    params: {
        id: string;
    };
}
const page = ({ params }: PageProps) => {
    return <SessionForm id={params.id} />
};

export default page;