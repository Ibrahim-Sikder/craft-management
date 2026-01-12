export const DAYS_OF_WEEK = [
  { key: "saturday", name: "Saturday", bangla: "শনিবার" },
  { key: "sunday", name: "Sunday", bangla: "রবিবার" },
  { key: "monday", name: "Monday", bangla: "সোমবার" },
  { key: "tuesday", name: "Tuesday", bangla: "মঙ্গলবার" },
  { key: "wednesday", name: "Wednesday", bangla: "বুধবার" },
  { key: "thursday", name: "Thursday", bangla: "বৃহস্পতিবার" },
  { key: "friday", name: "Friday", bangla: "শুক্রবার" },
] 

   export  const getDayName = (dayKey: string) => {
        const days: Record<string, string> = {
            saturday: "Saturday",
            sunday: "Sunday",
            monday: "Monday",
            tuesday: "Tuesday",
            wednesday: "Wednesday",
            thursday: "Thursday",
            friday: "Friday",
        }
        return days[dayKey] || dayKey
    }