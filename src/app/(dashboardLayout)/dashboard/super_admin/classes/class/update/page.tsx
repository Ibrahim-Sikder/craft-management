/* eslint-disable react-hooks/rules-of-hooks */

'use client'
import React from 'react';;
import { useSearchParams } from 'next/navigation';
import ClassForm from '../_components/ClassForm';

const page = () => {
    const searchParams = useSearchParams();
    const id = searchParams.get('id') || '';
    return <ClassForm id={id} />
};

export default page;