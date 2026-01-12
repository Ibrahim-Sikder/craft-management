/* eslint-disable @typescript-eslint/no-explicit-any */
import { Grid, Paper } from "@mui/material";
import React from "react";
import CraftIntAutoComplete from "@/components/Forms/CruftAutocomplete";
import { useAcademicOption } from "@/hooks/useAcademicOption";
import CraftDatePicker from "../Forms/DatePicker";
import CraftSelect from "../Forms/Select";
import { months } from "@/options";

export const BasicInfo = () => {
  const { studentOptions } = useAcademicOption();

  return (
    <Paper
      elevation={2}
      sx={{
        p: 3,
        borderRadius: 2,
        backgroundColor: "background.paper",
        boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} md={6} lg={3}>
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
            size="small"
          />
        </Grid>

        <Grid item xs={12} md={6} lg={3}>
          <CraftDatePicker label="তারিখ" name="date" fullWidth size="small" />
        </Grid>

        <Grid item xs={12} md={6} lg={3}>
          <CraftSelect
            name="month"
            label="মাস"
            items={months}
            size="small"
            fullWidth
          />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default BasicInfo;
