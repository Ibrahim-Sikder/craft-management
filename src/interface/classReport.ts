/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ClassReportDetailsModalProps {
    open: boolean;
    onClose: () => void;
    data: {
        reportData: any;
        studentEvaluation: any;
    };
}

export type StudentEvaluation = {
    studentId: string;
    lessonEvaluation: string;
    handwriting: string;
    attendance: string;
    parentSignature: boolean;
    comments: string;
};