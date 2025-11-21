/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { Card, CardContent, Typography, Box, Button } from "@mui/material";
import CraftForm from "@/components/Forms/Form";
import { FieldValues } from "react-hook-form";
import { useAcademicOption } from "@/hooks/useAcademicOption";
import {
  useCreateQaidaReportMutation,
  useGetSingleQaidaReportQuery,
  useUpdateQaidaReportMutation,
} from "@/redux/api/qaidaDailyReportApi";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import {
  transformFormFieldsToQaidaApiData,
  transformQaidaApiDataToFormFields,
} from "./dataTransformations";

import DailyProgressTable from "./DailyProgressTable";
import BasicInfo from "@/components/common/BasicInfo";
import { SubmitButton } from "@/components/common/SubmitButton";
import { ReportHeader } from "@/components/common/ReportHeader";
import { LoadingState } from "@/components/common/LoadingState";

function QaidaDailyReportForm({ id }: { id?: string }) {
  const router = useRouter();
  const [createQaidaReport] = useCreateQaidaReportMutation();
  const [updateQaidaReport] = useUpdateQaidaReportMutation();
  const { data: singleQaidaReport, isLoading } =
    useGetSingleQaidaReportQuery(id);
  const { teacherOptions, studentOptions } = useAcademicOption();

  const handleSubmit = async (data: FieldValues) => {
    const submitData = {
      ...data,
      studentName: data?.studentName?.label,
      teacherName: data?.teacherName?.label,
      month: data?.month || new Date().getMonth().toString(),
    };

    try {
      const transformedData = transformFormFieldsToQaidaApiData(submitData);
      let res;
      if (id) {
        res = await updateQaidaReport({ id, data: transformedData }).unwrap();
      } else {
        res = await createQaidaReport(transformedData).unwrap();
      }

      if (res?.success) {
        toast.success(`Report ${id ? "updated" : "submitted"} successfully!`);
        router.push("/dashboard/qaida-noorani/daily-report/list");
      } else {
        toast.error("Failed to submit report");
      }
    } catch (error) {
      console.error("Error submitting report:", error);
      toast.error("An error occurred while submitting the report");
    }
  };

  const defaultValues = transformQaidaApiDataToFormFields(
    singleQaidaReport?.data
  );

  if (isLoading) {
    return <LoadingState />;
  }

  return (
    <CraftForm onSubmit={handleSubmit} defaultValues={defaultValues}>
      <Card>
        <ReportHeader
          subtitleBangla=" কায়েদা ও নূরানী ছাত্রদের দৈনিক রিপোর্ট"
          title="Craft International Institute"
        />
        <CardContent sx={{ p: 4 }}>
          <BasicInfo
            teacherOptions={teacherOptions}
            studentOptions={studentOptions}
          />
          <DailyProgressTable />
          <SubmitButton id={id} />
        </CardContent>
      </Card>
    </CraftForm>
  );
}

export default QaidaDailyReportForm;
