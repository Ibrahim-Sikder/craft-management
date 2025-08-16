'use client'

import React from 'react';
import AdmissionForm from '../../__components/AdmissionForm';
import { useParams } from 'next/navigation';

const AdmissionUpdate = () => {
    const params = useParams();
    const { id } = params


    return <AdmissionForm id={id}/>
};

export default AdmissionUpdate;