/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'


import WeeklyReport from '@/components/WeeklyReport/WeeklyReport'
import { useCreateWeeklyReportMutation } from '@/redux/api/weeklyReportApi'
import React, { useState } from 'react'
import toast from 'react-hot-toast'

const WeeklyReportForm = () => {
    const [createWeeklyReport] = useCreateWeeklyReportMutation()
    const [rows, setRows] = useState([
        { label: "একনজরে এই সপ্তাহের টার্গেট", values: ["", "", "", ""] },
        { label: "একনজরে এই সপ্তাহের রিপোর্ট", values: ["", "", "", ""] },
        { label: "একনজরে ভুলের সংখ্যা", values: ["", "", "", ""] }
    ]);

    const handleSubmit = async (data: any) => {
        try {
            const reportData = {
                studentName: data.studentName.label,
                date: data.date,
                month: data.month,
                reportType: "hifz",
                rows: rows
            };

            console.log(reportData)

            // Remove the extra data wrapper
            const result = await createWeeklyReport(reportData);

            if (result.error) {
                toast.error('Failed to submit weekly report');
                return;
            }

            if (result.data && result.data.success) {
                toast.success(result.data.message || 'Weekly report submitted successfully!');
                const form = document.querySelector('form');
                if (form) form.reset();
                // Reset rows to default values
                setRows([
                    { label: "একনজরে এই সপ্তাহের টার্গেট", values: ["", "", "", ""] },
                    { label: "একনজরে এই সপ্তাহের রিপোর্ট", values: ["", "", "", ""] },
                    { label: "একনজরে ভুলের সংখ্যা", values: ["", "", "", ""] }
                ]);
            } else {
                toast.error(result.data?.message || 'Failed to submit weekly report');
            }

        } catch (error: any) {
            toast.error(error.message || 'Failed to submit weekly report');
        }
    }

    const title = ' কাওসার ও নুরানী ছাত্রদের সাপ্তাহিক রিপোর্ট (হিফজ)'
    return (
        <div>
            <WeeklyReport
                title={title}
                handleSubmit={handleSubmit}
                rows={rows}
                setRows={setRows}
            />
        </div>
    )
}

export default WeeklyReportForm