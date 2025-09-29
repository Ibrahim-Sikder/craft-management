import { useState } from "react";

export interface SunaniDayEntry {
  morning: { para: string; page: string };
  night: { para: string; page: string; amount: string; wrong: string };
  backReading: { para: string; page: string; amount: string; wrong: string };
  tilawaAmount: string;
  mashq: string;
  tajweed: string;
  teacherSignature: string;
  thursdayWeeklyRevision: string;
}

export function useSunaniEntries() {
  const [dailyEntries, setDailyEntries] = useState<Record<string, SunaniDayEntry>>({
    saturday: {
      morning: { para: "", page: "" },
      night: { para: "", page: "", amount: "", wrong: "" },
      backReading: { para: "", page: "", amount: "", wrong: "" },
      tilawaAmount: "",
      mashq: "",
      tajweed: "",
      teacherSignature: "",
      thursdayWeeklyRevision: "",
    },
    sunday: {
      morning: { para: "", page: "" },
      night: { para: "", page: "", amount: "", wrong: "" },
      backReading: { para: "", page: "", amount: "", wrong: "" },
      tilawaAmount: "",
      mashq: "",
      tajweed: "",
      teacherSignature: "",
      thursdayWeeklyRevision: "",
    },
    monday: {
      morning: { para: "", page: "" },
      night: { para: "", page: "", amount: "", wrong: "" },
      backReading: { para: "", page: "", amount: "", wrong: "" },
      tilawaAmount: "",
      mashq: "",
      tajweed: "",
      teacherSignature: "",
      thursdayWeeklyRevision: "",
    },
    tuesday: {
      morning: { para: "", page: "" },
      night: { para: "", page: "", amount: "", wrong: "" },
      backReading: { para: "", page: "", amount: "", wrong: "" },
      tilawaAmount: "",
      mashq: "",
      tajweed: "",
      teacherSignature: "",
      thursdayWeeklyRevision: "",
    },
    wednesday: {
      morning: { para: "", page: "" },
      night: { para: "", page: "", amount: "", wrong: "" },
      backReading: { para: "", page: "", amount: "", wrong: "" },
      tilawaAmount: "",
      mashq: "",
      tajweed: "",
      teacherSignature: "",
      thursdayWeeklyRevision: "",
    },
    thursday: {
      morning: { para: "", page: "" },
      night: { para: "", page: "", amount: "", wrong: "" },
      backReading: { para: "", page: "", amount: "", wrong: "" },
      tilawaAmount: "",
      mashq: "",
      tajweed: "",
      teacherSignature: "",
      thursdayWeeklyRevision: "",
    },
    friday: {
      morning: { para: "", page: "" },
      night: { para: "", page: "", amount: "", wrong: "" },
      backReading: { para: "", page: "", amount: "", wrong: "" },
      tilawaAmount: "",
      mashq: "",
      tajweed: "",
      teacherSignature: "",
      thursdayWeeklyRevision: "",
    },
  });

  const updateEntry = (day: string, section: string, field: string, value: string) => {
    setDailyEntries(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        [section]: 
          section === "morning" || section === "night" || section === "backReading"
            ? { ...prev[day][section as keyof SunaniDayEntry], [field]: value }
            : value,
      },
    }));
  };

  return { dailyEntries, updateEntry };
}