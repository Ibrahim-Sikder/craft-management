/* eslint-disable react-hooks/rules-of-hooks */

'use client'
import React from 'react'; import UserForm from '../../_components/UserForm';
;

interface PageProps {
    params: {
        id: string;
    };
}
const page = ({ params }: PageProps) => {
    return <UserForm id={params.id} />
};

export default page;


