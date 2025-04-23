export const tagTypesList = [
  "student",
  'teacher',
  'meal-report',
  
] as const;

export type TagType = typeof tagTypesList[number];
