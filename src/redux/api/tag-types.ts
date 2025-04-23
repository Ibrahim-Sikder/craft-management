export const tagTypesList = [
  "student",
  'teacher'
] as const;

export type TagType = typeof tagTypesList[number];
