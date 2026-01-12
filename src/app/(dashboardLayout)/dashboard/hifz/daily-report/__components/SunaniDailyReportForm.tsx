// components/HifzDailyReportForm.tsx
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import {
  Card,
  CardContent,
  Box,
  Table,
  TableContainer,
  TableHead,
  Paper,
} from "@mui/material";
import BasicInfo from "@/components/common/BasicInfo";
import { useAcademicOption } from "@/hooks/useAcademicOption";
import CraftForm from "@/components/Forms/Form";
import { ReportHeader } from "@/components/common/ReportHeader";
import ReportTableRow from "@/components/tables/Daily/ReportTableRow";
import { tableStyle } from "@/style/customeStyle";

import { SubmitButton } from "@/components/common/SubmitButton";

import ReportTableBody from "@/components/tables/Daily/ReportTableBody";
import {
  useCreateSunaniReportMutation,
  useGetSingleSunaniReportQuery,
  useUpdateSunaniReportMutation,
} from "@/redux/api/sunaniDailyReportApi";

import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import {
  calculateWeeklyTotals,
  formatReportData,
  transformApiDataToFormFields,
} from "@/utils/sunaniReport";
import { LoadingState } from "@/components/common/LoadingState";

function SunaniDailyReportForm({ studentName, reportDate, month, id }: any) {
  const router = useRouter();
  const { teacherOptions, studentOptions } = useAcademicOption();
  const [createSunaniReport, { isLoading }] = useCreateSunaniReportMutation();
  const [updateSunaniReport] = useUpdateSunaniReportMutation();
  const { data: singleData, isLoading: singleReportLoading } =
    useGetSingleSunaniReportQuery(id);

  const handleSubmit = async (formData: any) => {
    try {
      const weeklyTotals = calculateWeeklyTotals(formData);
      const formattedData = formatReportData(formData, weeklyTotals, month, id);
      let res;
      if (id) {
        res = await updateSunaniReport({ id, data: formattedData }).unwrap();
      } else {
        res = await createSunaniReport(formattedData).unwrap();
      }
      if (res?.success) {
        toast.success(`Report ${id ? "updated" : "submitted"} successfully!`);
        router.push("/dashboard/hifz/daily-report/sunani/list");
      } else {
        toast.error("Failed to submit report");
      }
    } catch (error) {
      console.error("Error submitting report:", error);
      toast.error("An error occurred while submitting the report");
    }
  };

  if (singleReportLoading) {
    return <LoadingState />;
  }

  const defaultValue = transformApiDataToFormFields(singleData?.data);

  return (
    <CraftForm onSubmit={handleSubmit} defaultValues={defaultValue}>
      <Card
        sx={{
          boxShadow: "none",
          "@media print": { boxShadow: "none", border: 0 },
        }}
      >
        <ReportHeader
          title=" Shunani Hifz Students Daily Report"
          subtitleBangla="শুনানী হিফজ শিক্ষার্থীদের দৈনিক রিপোর্ট"
        />

        <CardContent sx={{ p: 3 }}>
          {/* Student Information */}
          <BasicInfo
            teacherOptions={teacherOptions}
            studentOptions={studentOptions}
            studentName={studentName}
            reportDate={reportDate}
          />
          {/* Daily Entries Table */}
          <Box sx={{ width: "100%", overflow: "auto" }}>
            <TableContainer
              component={Paper}
              sx={{ minWidth: 1200, "@media print": { minWidth: "100%" } }}
            >
              <Table size="small" sx={tableStyle}>
                <TableHead>
                  <ReportTableRow
                    col1Label="  সকালের পড়া"
                    col2Label="  রাতের পড়া"
                    col3Label="    পেছনের পড়া"
                  />
                </TableHead>
                <ReportTableBody />
              </Table>
            </TableContainer>
          </Box>
          <Box
            sx={{
              mt: 3,
              display: "flex",
              justifyContent: "center",
              "@media print": { display: "none" },
            }}
          >
            <SubmitButton />
          </Box>
        </CardContent>
      </Card>
    </CraftForm>
  );
}

export default SunaniDailyReportForm;
