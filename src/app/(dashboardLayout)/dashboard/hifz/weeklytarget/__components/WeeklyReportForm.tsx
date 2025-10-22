/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import WeeklyReport from '@/components/WeeklyReport/WeeklyReport'
import { useCreateWeeklyReportMutation, useGetSingleWeeklyReportQuery, useUpdateWeeklyReportMutation } from '@/redux/api/weeklyReportApi'
import { useRouter } from 'next/navigation'
import React, { useState, useEffect } from 'react'
import toast from 'react-hot-toast'

type ReportType = 'qaida' | 'hifz' | 'ampara' | 'nazera';

interface WeeklyReportFormProps {
    id?: string | null;
    reportType: ReportType;
    title?: string;
}

const WeeklyReportForm = ({ id, reportType, title }: WeeklyReportFormProps) => {
    const [createWeeklyReport] = useCreateWeeklyReportMutation()
    const [updateWeeklyReport] = useUpdateWeeklyReportMutation()
    const { data: singleData, isLoading } = useGetSingleWeeklyReportQuery(id!)
    const router = useRouter()

    const [rows, setRows] = useState([
        { label: "একনজরে এই সপ্তাহের টার্গেট", values: ["", "", "", ""] },
        { label: "একনজরে এই সপ্তাহের রিপোর্ট", values: ["", "", "", ""] },
        { label: "একনজরে ভুলের সংখ্যা", values: ["", "", "", ""] }
    ]);

    useEffect(() => {
        if (singleData?.data?.rows) {
            setRows(singleData.data.rows);
        }
    }, [singleData]);

    // Function to get navigation path based on reportType
    const getNavigationPath = (type: ReportType): string => {
        const routeMap: Record<ReportType, string> = {
            'qaida': '/dashboard/qaida-noorani/weekly-report/list',
            'hifz': '/dashboard/hifz/weeklytarget/list',
            'ampara': '/dashboard/ampara/weekly-report/list',
            'nazera': '/dashboard/nazera/weekly-report/list'
        };

        return routeMap[type] || '/dashboard';
    };

    const handleSubmit = async (data: any) => {
        console.log('raw submit ', data)
        try {
            let res;
            const reportData = {
                studentName: data.studentName?.label || data.studentName,
                date: data.date,
                month: data.month,
                reportType,
                rows: rows
            };

            if (id) {
                res = await updateWeeklyReport({ id, data: reportData });
            } else {
                res = await createWeeklyReport(reportData);
            }

            if (res.error) {
                toast.error('Failed to submit weekly report');
                return;
            }

            if (res.data && res.data.success) {
                toast.success(res.data.message || 'Weekly report submitted successfully!');
                const form = document.querySelector('form');

                // Dynamic navigation based on reportType
                const navigationPath = getNavigationPath(reportType);
                router.push(navigationPath);

                if (form) form.reset();
                if (!id) {
                    setRows([
                        { label: "একনজরে এই সপ্তাহের টার্গেট", values: ["", "", "", ""] },
                        { label: "একনজরে এই সপ্তাহের রিপোর্ট", values: ["", "", "", ""] },
                        { label: "একনজরে ভুলের সংখ্যা", values: ["", "", "", ""] }
                    ]);
                }
            } else {
                toast.error(res.data?.message || 'Failed to submit weekly report');
            }

        } catch (error: any) {
            toast.error(error.message || 'Failed to submit weekly report');
        }
    }

    const defaultValue = {
        studentName: singleData?.data?.studentName || '',
        date: singleData?.data?.date ? new Date(singleData.data.date).toISOString().split('T')[0] : '',
        month: singleData?.data?.month || '',
    }

    return (
        <div>
            <WeeklyReport
                title={title}
                handleSubmit={handleSubmit}
                rows={rows}
                setRows={setRows}
                isLoading={isLoading}
                defaultValue={defaultValue}
                isEdit={!!id}
            />
        </div>
    )
}

export default WeeklyReportForm