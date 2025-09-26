/* eslint-disable @typescript-eslint/no-unused-vars */
import { Paper, Box, Grid } from "@mui/material"
import { boxStyleReport } from "@/style/customeStyle"
import CraftIntAutoComplete from "@/components/Forms/CruftAutocomplete"
import CraftDatePicker from "@/components/Forms/DatePicker"

interface StudentInfoSectionProps {
  teacherOptions: Array<{ label: string; value: string }>
  studentName: string
  reportDate: string
}

const StudentInfoSection = ({ teacherOptions, studentName, reportDate }: StudentInfoSectionProps) => {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        mb: 3,
        bgcolor: "grey.50",
        "@media print": { bgcolor: "transparent", border: 1, borderColor: "black" },
      }}
    >
      <Box sx={boxStyleReport}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={3} lg={3}>
            <CraftIntAutoComplete
              name="teacherName"
              placeholder="শিক্ষকের নাম লিখুন"
              label="শিক্ষকের নাম"
              fullWidth
              freeSolo
              multiple={false}
              options={teacherOptions}
              forcePopupIcon={false}
              clearOnBlur={false}
              selectOnFocus={true}
              handleHomeEndKeys={true}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <CraftIntAutoComplete
              name="studentName"
              placeholder="শিক্ষার্থীর নাম"
              label="শিক্ষার্থীর নাম"
              fullWidth
              freeSolo
              multiple={false}
              options={teacherOptions}
              forcePopupIcon={false}
              clearOnBlur={false}
              selectOnFocus={true}
              handleHomeEndKeys={true}
            />
          </Grid>

          <Grid item xs={6} sm={6} md={2} lg={2.5}>
            <CraftDatePicker name="reportDate" label="তারিখ" />
          </Grid>
        </Grid>
      </Box>
    </Paper>
  )
}

export default StudentInfoSection