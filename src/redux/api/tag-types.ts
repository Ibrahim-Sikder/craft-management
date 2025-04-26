export const tagTypesList = [
  "student",
  'teacher',
  'meal-report',
  'class',
  'subject',
  'user'
  
  
] as const;

export type TagType = typeof tagTypesList[number];
