/* eslint-disable react-hooks/rules-of-hooks */

'use client'
import React from 'react';;
import { useSearchParams } from 'next/navigation';
import UserForm from '../_components/UserForm';

const page = () => {
    const searchParams = useSearchParams();
    const id = searchParams.get('id') || '';
    return <UserForm id={id} />
};

export default page;