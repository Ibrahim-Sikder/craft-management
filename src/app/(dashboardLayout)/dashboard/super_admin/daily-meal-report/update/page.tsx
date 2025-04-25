'use client'

import React from 'react';
import MealReportForm from '../_components/MealReportForm';
import { useSearchParams } from 'next/navigation';

const UpdateMeal = () => {
        const searchParams = useSearchParams();
        const id = searchParams.get('id') || '';
    return <MealReportForm id={id}/>;
};

export default UpdateMeal;