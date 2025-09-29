/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import type React from "react"
import {
  Box,
  Container,
  Fade,
  ThemeProvider,
  Grid,
  Typography,
  Card,
  CardContent,
  Button
} from "@mui/material"
import CraftForm from "@/components/Forms/Form"
import CraftSelect from "@/components/Forms/Select"
import { paper } from "@/options"
import {
  MenuBook,
  Assignment,
  Save as SaveIcon,
} from "@mui/icons-material"
import CraftInputWithIcon from "@/components/Forms/inputWithIcon"
import type { FieldValues } from "react-hook-form"
import { useCreateSubjectMutation, useGetSingleSubjectQuery, useUpdateSubjectMutation } from "@/redux/api/subjectApi"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"
import { customTheme } from "@/ThemeStyle"
import { boxStyle, evaluationStle, evaluationStle2, typographyStyle } from "@/style/customeStyle"
import { LoadingState } from "@/components/common/LoadingState"

export default function SubjectForm({ id }: any) {
  const router = useRouter()
  const [createSubject] = useCreateSubjectMutation()
  const [updateSubject] = useUpdateSubjectMutation()

  const { data: singleSubject, isLoading } = useGetSingleSubjectQuery({ id })
  const theme = customTheme
  console.log(singleSubject)
  const handleSubmit = async (data: FieldValues) => {
    try {
      let res

      if (!id) {
        res = await createSubject(data).unwrap()
        if (res.success) {
          toast.success("Subject created successfully!")
          router.push("/dashboard/subject")
        }
      } else {
        res = await updateSubject({ id, body: { ...data } }).unwrap()
        console.log("update response", res)
        if (res.success) {
          toast.success("Subject updated successfully!")
          router.push("/dashboard/subject")
        }
      }
    } catch (err: any) {
      const errorMessage =
        err?.data?.message ||
        err?.errorSources?.[0]?.message ||
        "Subject already exits!";
      toast.error(errorMessage)
    }
  }

  const defaultValues = {
    name: singleSubject?.data?.name || "",
    paper: singleSubject?.data?.paper || "",
  }

  return (
    <>
      {isLoading ? (
          <LoadingState/>
      ) : (
        <ThemeProvider theme={theme}>
          <CraftForm onSubmit={handleSubmit} defaultValues={defaultValues}>
            <Box
              sx={{
                flexGrow: 1,
                bgcolor: "background.default",
                minHeight: "100vh",
                borderRadius: 2,
                background: "linear-gradient(135deg, #f5f7fa 0%, #e4e7eb 100%)",
              }}
            >
              <Container maxWidth="xl" sx={{ mt: 0, mb: 8, borderRadius: 2, pt: 2 }}>
                <Fade in={true} timeout={800}>
                  <Box>
                    <Box sx={boxStyle}>
                      <Box>
                        <Typography variant="h4" component="h1" sx={typographyStyle}>
                          <MenuBook fontSize="large" /> {id ? "Update Subject" : "Add New Subject"}
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                          {id
                            ? "Update existing subject details"
                            : "Create a new subject with lessons, class assignment, and more"}
                        </Typography>
                      </Box>
                      <Box sx={{ display: "flex", gap: 2 }}></Box>
                    </Box>

                    <Card elevation={0} sx={evaluationStle}>
                      <Box sx={evaluationStle2}>
                        <Assignment />
                        <Typography variant="subtitle1" fontWeight="bold">
                          Subject Information
                        </Typography>
                      </Box>
                      <CardContent sx={{ pt: 4, mt: 2 }}>
                        <Grid container spacing={3}>

                          <Grid item xs={12} md={6}>
                            <CraftInputWithIcon
                              name="name"
                              label="Subject Name"
                              placeholder="Write Subject Name"
                              required
                              fullWidth
                              InputProps={{
                                startAdornment: <MenuBook sx={{ color: "primary.main", mr: 1 }} />,
                              }}
                            />
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <CraftSelect size="medium" name="paper" label="Paper" items={paper} fullWidth />
                          </Grid>

                          <Grid item xs={12} sx={{ mt: 3, display: "flex", justifyContent: "flex-end" }}>
                            <Button
                              variant="contained"
                              color="primary"
                              startIcon={<SaveIcon />}
                              type="submit"
                              sx={{
                                bgcolor: "#6366f1",
                                borderRadius: "12px",
                                boxShadow: "0px 8px 20px rgba(99, 102, 241, 0.25)",
                                px: 4,
                                py: 1.5,
                                transition: "all 0.3s ease",
                                "&:hover": {
                                  bgcolor: "#4f46e5",
                                  transform: "translateY(-2px)",
                                  boxShadow: "0px 10px 25px rgba(99, 102, 241, 0.35)",
                                },
                              }}
                            >
                              {id ? "Update Subject" : "Save Subject"}
                            </Button>
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Card>
                  </Box>
                </Fade>
              </Container>
            </Box>
          </CraftForm>
        </ThemeProvider>
      )}
    </>
  )
}
