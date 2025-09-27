/* eslint-disable @typescript-eslint/no-explicit-any */
// src/utils/selectOptions.ts
export const transformToSelectOptions = (
  data: Array<Record<string, any>> | undefined,
  labelKey: string = "name",
  valueKey: string = "_id"
) => {
  if (!data) return []
  return data.map((item) => ({
    label: item[labelKey],
    value: item[valueKey],
  }))
}
