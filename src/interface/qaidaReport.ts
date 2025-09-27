export interface DailyEntry {
    hadithNumber: string
    duaNumber: string
    tajweedSubject: string
    qaidaPage: string
    pageAmount: string
    hadithDuaRevision: string
    duaRevision: string
    tajweedRevision: string
    qaidaRevision: string
    teacherSignature: string
    comment: string
}

export interface QaidaReport {
    _id: string
    studentName: string
    month: string
    reportDate: string
    weeklyTarget: string
    teacherName: string
    dailyEntries: Record<string, DailyEntry>
    createdAt: string
    updatedAt: string
}