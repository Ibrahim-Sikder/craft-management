export type Filters = {
  classes: string;
  subjects: string;
  teachers: string;
  date: string;
  hour: string;
  lessonEvaluation: string;
  handwriting: string;
  startDate: string;
  endDate: string;
  hasComments: boolean;
};

export interface IDateRange {
  startDate: Date | null;
  endDate: Date | null;
}
