import { useState } from "react";

export interface NazeraDayEntry {
  morning: { para: string; page: string; amount: string; mistakes: string };
  afternoon: { para: string; page: string; amount: string; mistakes: string };
  night: { para: string; page: string; amount: string; mistakes: string };
  totalRead: string;
  duaHadithMasala: string;
  mashq: string;
  tajweed: string;
  teacherSignature: string;
}

export function useNazeraEntries() {
  const [dailyEntries, setDailyEntries] = useState<Record<string, NazeraDayEntry>>({
    saturday: {
      morning: { para: "", page: "", amount: "", mistakes: "" },
      afternoon: { para: "", page: "", amount: "", mistakes: "" },
      night: { para: "", page: "", amount: "", mistakes: "" },
      totalRead: "",
      duaHadithMasala: "",
      mashq: "",
      tajweed: "",
      teacherSignature: "",
    },
    sunday: {
      morning: { para: "", page: "", amount: "", mistakes: "" },
      afternoon: { para: "", page: "", amount: "", mistakes: "" },
      night: { para: "", page: "", amount: "", mistakes: "" },
      totalRead: "",
      duaHadithMasala: "",
      mashq: "",
      tajweed: "",
      teacherSignature: "",
    },
    monday: {
      morning: { para: "", page: "", amount: "", mistakes: "" },
      afternoon: { para: "", page: "", amount: "", mistakes: "" },
      night: { para: "", page: "", amount: "", mistakes: "" },
      totalRead: "",
      duaHadithMasala: "",
      mashq: "",
      tajweed: "",
      teacherSignature: "",
    },
    tuesday: {
      morning: { para: "", page: "", amount: "", mistakes: "" },
      afternoon: { para: "", page: "", amount: "", mistakes: "" },
      night: { para: "", page: "", amount: "", mistakes: "" },
      totalRead: "",
      duaHadithMasala: "",
      mashq: "",
      tajweed: "",
      teacherSignature: "",
    },
    wednesday: {
      morning: { para: "", page: "", amount: "", mistakes: "" },
      afternoon: { para: "", page: "", amount: "", mistakes: "" },
      night: { para: "", page: "", amount: "", mistakes: "" },
      totalRead: "",
      duaHadithMasala: "",
      mashq: "",
      tajweed: "",
      teacherSignature: "",
    },
    thursday: {
      morning: { para: "", page: "", amount: "", mistakes: "" },
      afternoon: { para: "", page: "", amount: "", mistakes: "" },
      night: { para: "", page: "", amount: "", mistakes: "" },
      totalRead: "",
      duaHadithMasala: "",
      mashq: "",
      tajweed: "",
      teacherSignature: "",
    },
    friday: {
      morning: { para: "", page: "", amount: "", mistakes: "" },
      afternoon: { para: "", page: "", amount: "", mistakes: "" },
      night: { para: "", page: "", amount: "", mistakes: "" },
      totalRead: "",
      duaHadithMasala: "",
      mashq: "",
      tajweed: "",
      teacherSignature: "",
    },
  });

  const updateEntry = (day: string, section: string, field: string, value: string) => {
    setDailyEntries(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        [section]: 
          section === "morning" || section === "afternoon" || section === "night"
            ? { ...prev[day][section as keyof NazeraDayEntry], [field]: value }
            : value,
      },
    }));
  };

  return { dailyEntries, updateEntry };
}