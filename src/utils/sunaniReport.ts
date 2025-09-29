/* eslint-disable @typescript-eslint/no-explicit-any */

export const transformApiDataToFormFields = (apiData: any) => {
    const formFields: any = {};

    if (!apiData) return formFields;

    formFields.reportDate = apiData.reportDate || "";
    formFields.studentName = apiData.studentName || "";
    formFields.teacherName = apiData.teacherName || "";
    formFields.month = apiData.month || "";
    formFields.weeklyTarget = apiData.weeklyTarget || "";

    if (apiData.dailyEntries) {
        Object.keys(apiData.dailyEntries).forEach(day => {
            const dayData = apiData.dailyEntries[day];
            
            // Handle sobok
            if (dayData.sobok) {
                formFields[`${day}SobokPara`] = dayData.sobok.para || '';
                formFields[`${day}SobokPage`] = dayData.sobok.page || '';
            }
            
            // Handle sabakSeven
            if (dayData.sabakSeven) {
                formFields[`${day}SabakSevenPara`] = dayData.sabakSeven.para || '';
                formFields[`${day}SabakSevenPage`] = dayData.sabakSeven.page || '';
            }
            
            // Handle sabakAmukta
            if (dayData.sabakAmukta) {
                formFields[`${day}SabakAmuktaPara`] = dayData.sabakAmukta.para || '';
                formFields[`${day}SabakAmuktaPage`] = dayData.sabakAmukta.page || '';
            }
            
            // Handle satSobok
            if (dayData.satSobok) {
                formFields[`${day}SatSobokPara`] = dayData.satSobok.para || '';
                formFields[`${day}SatSobokPage`] = dayData.satSobok.page || '';
                formFields[`${day}SatSobokAmount`] = dayData.satSobok.amount || '';
                formFields[`${day}SatSobokWrong`] = dayData.satSobok.wrong || '';
            }
            
            // Handle other fields
            formFields[`${day}TilawaAmount`] = dayData.tilawaAmount || '';
            formFields[`${day}Mashq`] = dayData.mashq || '';
            formFields[`${day}Tajweed`] = dayData.tajweed || '';
            formFields[`${day}TeacherSignature`] = dayData.teacherSignature || '';
            formFields[`${day}ThursdayWeeklyRevision`] = dayData.thursdayWeeklyRevision || '';
        });
    }

    return formFields;
};

// Helper function to format form data for API submission
export const formatReportData = (formData: any, weeklyTotals: any, month: string, id?: string) => {
    const days = ['saturday', 'sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday'];
    const dailyEntries: any = {};

    days.forEach(day => {
        dailyEntries[day] = {
            sobok: {
                para: formData[`${day}SobokPara`] || '',
                page: formData[`${day}SobokPage`] || ''
            },
            sabakSeven: {
                para: formData[`${day}SabakSevenPara`] || '',
                page: formData[`${day}SabakSevenPage`] || ''
            },
            sabakAmukta: {
                para: formData[`${day}SabakAmuktaPara`] || '',
                page: formData[`${day}SabakAmuktaPage`] || ''
            },
            satSobok: {
                para: formData[`${day}SatSobokPara`] || '',
                page: formData[`${day}SatSobokPage`] || '',
                amount: formData[`${day}SatSobokAmount`] || '',
                wrong: formData[`${day}SatSobokWrong`] || ''
            },
            tilawaAmount: formData[`${day}TilawaAmount`] || '',
            mashq: formData[`${day}Mashq`] || '',
            tajweed: formData[`${day}Tajweed`] || '',
            teacherSignature: formData[`${day}TeacherSignature`] || '',
            thursdayWeeklyRevision: formData[`${day}ThursdayWeeklyRevision`] || ''
        };
    });

    const result: any = {
        teacherName: formData.teacherName.label,
        studentName: formData.studentName.label,
        reportDate: formData.reportDate,
        weeklyTarget: formData.weeklyTarget || '',
        dailyEntries,
        weeklySummary: weeklyTotals,
        month: formData.month || new Date().getMonth().toString(),
    };

    if (id) {
        result._id = id;
    }

    return result;
};

// Helper function to calculate weekly totals
export const calculateWeeklyTotals = (formData: any) => {
    const days = ['saturday', 'sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday'];
    let totalSobok = 0;
    let totalSatSobok = 0;
    let totalSabakAmukta = 0;
    let totalTilawat = 0;
    let totalRevision = 0;

    days.forEach(day => {
        // Helper function to parse page numbers that might be ranges (e.g., "5-6")
        const parsePageNumber = (pageStr: string): number => {
            if (!pageStr) return 0;
            if (pageStr.includes('-')) {
                const parts = pageStr.split('-');
                const start = parseInt(parts[0]) || 0;
                const end = parseInt(parts[1]) || 0;
                return end - start + 1;
            }
            return parseInt(pageStr) || 0;
        };

        // Calculate Sobok total (pages)
        const sobokPageStr = formData[`${day}SobokPage`] || '';
        totalSobok += parsePageNumber(sobokPageStr);

        // Calculate Sat Sobok total (amount)
        const satSobokAmount = parseInt(formData[`${day}SatSobokAmount`] || '0') || 0;
        totalSatSobok += satSobokAmount;

        // Calculate Sabak Amukta total (pages)
        const sabakAmuktaPageStr = formData[`${day}SabakAmuktaPage`] || '';
        totalSabakAmukta += parsePageNumber(sabakAmuktaPageStr);

        // Calculate Tilawat total
        const tilawaAmount = parseInt(formData[`${day}TilawaAmount`] || '0') || 0;
        totalTilawat += tilawaAmount;

        // Calculate Revision total
        const revision = parseInt(formData[`${day}ThursdayWeeklyRevision`] || '0') || 0;
        totalRevision += revision;
    });

    return {
        totalSobok,
        totalSatSobok,
        totalSabakAmukta,
        totalTilawat,
        totalRevision
    };
};