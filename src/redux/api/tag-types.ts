export const tagTypesList = [
  "student",
  'teacher',
  'meal-report',
  'class',
  'subject',
  
  
] as const;

export type TagType = typeof tagTypesList[number];
