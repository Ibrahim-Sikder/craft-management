// ─── Constants ────────────────────────────────────────────────────────────────

import { useEffect } from "react";
import CraftSelect from "./Select";
import { useFormContext } from "react-hook-form";

export const hifzClassValues = ["Nurani", "Nazera", "Hifz", "Sunani"];

export const academicClassValues = [
  "Pre_one",
  "One",
  "Two",
  "Three",
  "Four_boys",
  "Four_girls",
  "Five",
  "Six",
  "Seven",
  "Eight",
];

const getClassItemsByDept = (dept: string): string[] => {
  if (dept === "hifz") return hifzClassValues;
  if (dept === "academic") return academicClassValues;
  return [];
};

// ─── DepartmentAwareClassSelect ───────────────────────────────────────────────

export const DepartmentAwareClassSelect = ({
  defaultDept,
}: {
  defaultDept: string;
  defaultClass: string;
}) => {
  const { watch, setValue } = useFormContext();
  const selectedDept = watch("studentDept");
  const currentDept = selectedDept || defaultDept;

  useEffect(() => {
    if (!selectedDept) return;
    const validClasses = getClassItemsByDept(selectedDept);
    const currentClass = watch("className");
    // ✅ Only reset if the current class is NOT valid for the new dept
    if (currentClass && !validClasses.includes(currentClass)) {
      setValue("className", "");
    }
  }, [selectedDept]);

  // ✅ Pass plain string[] — CraftSelect handles it correctly
  const classItems = getClassItemsByDept(currentDept);

  return (
    <CraftSelect
      fullWidth
      label="Class"
      name="className"
      items={classItems} // ✅ plain string[]
      size="small"
      required
      // ✅ No defaultValue here — let form defaultValues handle it
    />
  );
};
