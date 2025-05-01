import React from 'react';
import DailyClassReportForm from '../../__components/DailyClassReportForm';
interface PageProps {
    params: {
        id: string;
    };
}
const page = ({ params }: PageProps) => {
    return <DailyClassReportForm id={params.id} />
};

export default page;