/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Save as SaveIcon } from "@mui/icons-material";
import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import { FieldValues } from "react-hook-form";

import CraftIntAutoCompleteWithIcon from "@/components/Forms/AutocompleteWithIcon";
import CraftForm from "@/components/Forms/Form";
import CraftInput from "@/components/Forms/Input";
import { useAcademicOption } from "@/hooks/useAcademicOption";
import { useCreateFeeCategoryMutation } from "@/redux/api/feeCategoryApi";
import { buttonStyle, inputStyle } from "@/style/customeStyle";
import toast from "react-hot-toast";

export default function AddFeeRecordPage() {
  const [createFeeCategory] = useCreateFeeCategoryMutation();
  const { classOptions } = useAcademicOption();
  const handleSubmit = async (data: FieldValues) => {
    console.log(data);
    const submitData = {
      ...data,
      class: data.class[0].label,
      feeAmount: Number(data.feeAmount),
    };
    try {
      const res = await createFeeCategory(submitData).unwrap();
      if (res?.success) {
        toast.success(res.message || "Fees create successfully!");
      }
    } catch (err: any) {
      toast.error(err?.message || "Failed to add fees!");
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", py: 4, backgroundColor: "#f8fafc" }}>
      <Container maxWidth="lg">
        <Paper
          elevation={0}
          sx={{
            py: 6,
            px: 8,
            borderRadius: 3,
            background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
            border: "1px solid #e2e8f0",
            boxShadow:
              "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
          }}
        >
          <Typography
            fontWeight={700}
            variant="h5"
            color="primary"
            mb={1.5}
            sx={{ letterSpacing: 0.3 }}
          >
            Add Fee Record
          </Typography>

          <Divider sx={{ mb: 4 }} />

          <CraftForm onSubmit={handleSubmit}>
            <Box sx={{ mb: 6 }}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6} md={4}>
                  <CraftIntAutoCompleteWithIcon
                    margin="none"
                    fullWidth
                    label="Class"
                    name="class"
                    options={classOptions}
                    sx={inputStyle}
                  />
                </Grid>

                <Grid item xs={12} md={4}>
                  <CraftInput
                    fullWidth
                    label="Fee Type"
                    name="feeType"
                    margin="none"
                    sx={inputStyle}
                  />
                </Grid>

                <Grid item xs={12} md={4}>
                  <CraftInput
                    fullWidth
                    label="Fee Amount"
                    name="feeAmount"
                    type="number"
                    margin="none"
                    sx={inputStyle}
                  />
                </Grid>
              </Grid>
            </Box>

            <Box
              sx={{
                display: "flex",
                gap: 2,
                justifyContent: "flex-end",
                pt: 3,
              }}
            >
              <Button
                type="submit"
                variant="contained"
                endIcon={<SaveIcon />}
                sx={buttonStyle}
              >
                Save Fee Record
              </Button>
            </Box>
          </CraftForm>
        </Paper>
      </Container>
    </Box>
  );
}
