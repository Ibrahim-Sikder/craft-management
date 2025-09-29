import { useState } from "react";

export interface SobokiDayEntry {
  sobok: { para: string; page: string };
  sabakSeven: { para: string; page: string };
  sabakAmukta: { para: string; page: string; amount: string; wrong: string };
  satSobok: { para: string; page: string; amount: string; wrong: string };
  tilawaAmount: string;
  mashq: string;
  tajweed: string;
  teacherSignature: string;
  thursdayWeeklyRevision: string;
}

export function useSobokiEntries() {
  const [dailyEntries, setDailyEntries] = useState<Record<string, SobokiDayEntry>>({
    saturday: {
      sobok: { para: "", page: "" },
      sabakSeven: { para: "", page: "" },
      sabakAmukta: { para: "", page: "", amount: "", wrong: "" },
      satSobok: { para: "", page: "", amount: "", wrong: "" },
      tilawaAmount: "",
      mashq: "",
      tajweed: "",
      teacherSignature: "",
      thursdayWeeklyRevision: "",
    },
    sunday: {
      sobok: { para: "", page: "" },
      sabakSeven: { para: "", page: "" },
      sabakAmukta: { para: "", page: "", amount: "", wrong: "" },
      satSobok: { para: "", page: "", amount: "", wrong: "" },
      tilawaAmount: "",
      mashq: "",
      tajweed: "",
      teacherSignature: "",
      thursdayWeeklyRevision: "",
    },
    monday: {
      sobok: { para: "", page: "" },
      sabakSeven: { para: "", page: "" },
      sabakAmukta: { para: "", page: "", amount: "", wrong: "" },
      satSobok: { para: "", page: "", amount: "", wrong: "" },
      tilawaAmount: "",
      mashq: "",
      tajweed: "",
      teacherSignature: "",
      thursdayWeeklyRevision: "",
    },
    tuesday: {
      sobok: { para: "", page: "" },
      sabakSeven: { para: "", page: "" },
      sabakAmukta: { para: "", page: "", amount: "", wrong: "" },
      satSobok: { para: "", page: "", amount: "", wrong: "" },
      tilawaAmount: "",
      mashq: "",
      tajweed: "",
      teacherSignature: "",
      thursdayWeeklyRevision: "",
    },
    wednesday: {
      sobok: { para: "", page: "" },
      sabakSeven: { para: "", page: "" },
      sabakAmukta: { para: "", page: "", amount: "", wrong: "" },
      satSobok: { para: "", page: "", amount: "", wrong: "" },
      tilawaAmount: "",
      mashq: "",
      tajweed: "",
      teacherSignature: "",
      thursdayWeeklyRevision: "",
    },
    thursday: {
      sobok: { para: "", page: "" },
      sabakSeven: { para: "", page: "" },
      sabakAmukta: { para: "", page: "", amount: "", wrong: "" },
      satSobok: { para: "", page: "", amount: "", wrong: "" },
      tilawaAmount: "",
      mashq: "",
      tajweed: "",
      teacherSignature: "",
      thursdayWeeklyRevision: "",
    },
    friday: {
      sobok: { para: "", page: "" },
      sabakSeven: { para: "", page: "" },
      sabakAmukta: { para: "", page: "", amount: "", wrong: "" },
      satSobok: { para: "", page: "", amount: "", wrong: "" },
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
          section === "sobok" || section === "sabakSeven" || section === "sabakAmukta" || section === "satSobok"
            ? { ...prev[day][section as keyof SobokiDayEntry], [field]: value }
            : value,
      },
    }));
  };

  return { dailyEntries, updateEntry };
}