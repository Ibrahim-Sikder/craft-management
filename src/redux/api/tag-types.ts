export const tagTypesList = [
  "student",
  'teacher',
  'meal-report',
  'class',
  'subject',
  'user',
  'class-report'
  
  
] as const;

export type TagType = typeof tagTypesList[number];
