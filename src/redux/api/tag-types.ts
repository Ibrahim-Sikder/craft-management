export const tagTypesList = [
  "student",
  'teacher',
  'meal-report',
  'class',
  'subject',
  'user',
  'class-report',
  'todayLesson',
  'todayTask'
  
  
] as const;

export type TagType = typeof tagTypesList[number];
