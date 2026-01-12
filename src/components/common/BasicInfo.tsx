/* eslint-disable @typescript-eslint/no-explicit-any */
// components/common/BasicInfo.tsx
import { Paper, Box, Grid} from "@mui/material"
import { boxStyleReport } from "@/style/customeStyle"
import CraftIntAutoComplete from "@/components/Forms/CruftAutocomplete"
import CraftDatePicker from "@/components/Forms/DatePicker"
import Typography from "@mui/material/Typography";

interface StudentInfoSectionProps {
  teacherOptions: Array<{ label: string; value: string }>
  studentOptions: Array<{ label: string; value: string }>
  studentName?: any
  reportDate?: any
  weeklyTarget?: any
}

const BasicInfo = ({ teacherOptions, studentOptions }: StudentInfoSectionProps) => {

  return (
    <Paper
      elevation={3}
      sx={{
        borderRadius: 2,
        overflow: 'hidden',
        border: '1px solid rgba(0,0,0,0.05)',
        "@media print": { 
          bgcolor: "transparent", 
          border: 1, 
          borderColor: "black",
          boxShadow: 'none',
          borderRadius: 0
        },
      }}
    >
      <Box 
        sx={{ 
          ...boxStyleReport,
          background: 'linear-gradient(135deg, #f5f7fa 0%, #e4e8f0 100%)',
          p: { xs: 2, sm: 3 },
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '5px',
            height: '100%',
            background: 'linear-gradient(to bottom, #1a237e, #3949ab)',
            borderRadius: '5px 0 0 5px'
          }
        }}
      >
        <Typography 
          variant="h6" 
          sx={{ 
            mb: 2, 
            color: '#1a237e',
            fontWeight: 'bold',
            fontSize: { xs: '1rem', sm: '1.1rem' }
          }}
        >
          Student Information
        </Typography>
        <Grid container spacing={{ xs: 2, sm: 3 }}>
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
              options={studentOptions}
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

export default BasicInfo