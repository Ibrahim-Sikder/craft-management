/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo, useState } from "react";
import { useGetAllTeachersQuery } from "@/redux/api/teacherApi";
import { useGetAllStudentsQuery } from "@/redux/api/studentApi";
import { transformToSelectOptions } from "@/utils/selectOptions";
import { useGetAllClassesQuery } from "@/redux/api/classApi";
import { useGetAllSubjectsQuery } from "@/redux/api/subjectApi";

export function useTeacherStudentOptions(limit = 10, initialSearch = "") {
  const [page] = useState(0);
  const [searchTerm] = useState(initialSearch);

  const { data: classData } = useGetAllClassesQuery({
    limit: limit,
    page: page + 1,
    searchTerm: searchTerm,
  });

  const { data: subjectData } = useGetAllSubjectsQuery({
    limit: limit,
    page: page + 1,
    searchTerm: searchTerm,
  });

  // Fetch teachers
  const { data: teacherData, isLoading: teacherLoading } =
    useGetAllTeachersQuery({
      limit,
      page: page + 1,
      searchTerm,
    });

  // Fetch students
  const { data: studentData, isLoading: studentLoading } =
    useGetAllStudentsQuery({
      limit,
      page: page + 1,
      searchTerm,
    });

  // Transform to select options
  const teacherOptions = useMemo(
    () => transformToSelectOptions(teacherData?.data, "name"),
    [teacherData]
  );

  const studentOptions = useMemo(
    () => transformToSelectOptions(studentData?.data, "name"),
    [studentData]
  );

  const classOptions = useMemo(() => {
    if (!classData?.data?.classes) return [];
    return classData.data.classes.map((clg: any) => ({
      label: clg.className,
      value: clg._id,
    }));
  }, [classData]);

  const subjectOptions = useMemo(() => {
    if (!subjectData?.data?.subjects) return [];
    return subjectData.data.subjects.map((sub: any) => ({
      label: sub.name,
      value: sub._id,
    }));
  }, [subjectData]);

  return {
    teacherOptions,
    studentOptions,
    teacherLoading,
    studentLoading,
    studentData,
    teacherData,
    classData,
    subjectData,
    classOptions,
    subjectOptions,
  };
}
