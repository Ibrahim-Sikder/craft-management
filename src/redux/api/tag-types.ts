export const tagTypesList = [
  "student",
  "teacher",
  "meal-report",
  "class",
  "subject",
  "user",
  "class-report",
  "todayLesson",
  "todayTask",
  "room",
  "time-slot",
  "section",
  "daily-class-report",
  "staff",
  'session',
  'feedback'
  
] as const;

export type TagType = (typeof tagTypesList)[number];
