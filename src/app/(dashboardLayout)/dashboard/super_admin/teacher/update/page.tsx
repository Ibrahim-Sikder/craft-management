/* eslint-disable react-hooks/rules-of-hooks */

'use client'
import React from 'react';
import TeacherForm from '../_components/TeacherForm';
interface PageProps {
    params: {
        id: string;
    };
}

const page = ({ params }: PageProps) => {
    return <TeacherForm id={params.id} />
};


export default page;


