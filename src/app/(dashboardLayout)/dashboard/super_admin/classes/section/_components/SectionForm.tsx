/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { useState } from "react"
import { Box, Container, Typography, Button, Paper, CircularProgress, Fade } from "@mui/material"
import { CheckCircle as CheckCircleIcon, Bookmark as BookmarkIcon, Save } from "@mui/icons-material"
import { customTheme } from "@/ThemeStyle"
import { useCreateSectionMutation, useGetSingleSectionQuery, useUpdateSectionMutation } from "@/redux/api/sectionApi"
import CraftForm from "@/components/Forms/Form"
import CraftInputWithIcon from "@/components/Forms/inputWithIcon"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"
import type { FieldValues } from "react-hook-form"

export default function SectionForm({ id }: { id?: string }) {
  const theme = customTheme
  const router = useRouter()

  // State
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  // API hooks
  const [createSection] = useCreateSectionMutation()
  const [updateSection] = useUpdateSectionMutation()
  const { data: singleSectionData, isLoading } = useGetSingleSectionQuery({ id }, { skip: !id })

  // Handle form submission
  const handleSubmit = async (data: FieldValues) => {
    console.log(data)
    setLoading(true)
    try {


      if (!id) {
        const res = await createSection(data).unwrap()

        if (res.success) {
          toast.success("Section created successfully!")
          setSuccess(true)
          setTimeout(() => setSuccess(false), 2000)
          router.push("/dashboard/super_admin/classes/section/list")
        }
        
      } else {
        const res = await updateSection({ id, data: data }).unwrap()

        if (res.success) {
          toast.success("Section updated successfully!")
          setSuccess(true)
          setTimeout(() => setSuccess(false), 2000)
          router.push("/dashboard/super_admin/classes/section/list")
        }
      }
    } catch (err: any) {

      toast.error(err?.data?.message || "Failed to save section")
    } finally {
      setLoading(false)
    }
  }

  // Default values for the form
  const defaultValues = {
    name: singleSectionData?.data?.name || "",
  }

  return (

    <Box sx={{ flexGrow: 1, bgcolor: "background.default", minHeight: "100vh", borderRadius: 2 }}>
      <Container maxWidth="xl" sx={{ mt: 0, mb: 8, borderRadius: 2 }}>
        {isLoading ? (
          <Box display="flex" justifyContent="center" alignItems="center" minHeight="40vh">
            <CircularProgress />
            <Typography variant="h6" sx={{ ml: 2 }}>
              Loading section data...
            </Typography>
          </Box>
        ) : (
          <Fade in={true} timeout={800}>
            <Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 3,
                  flexWrap: "wrap",
                  gap: 2,
                  paddingTop: 2,
                }}
              >
                <Typography variant="h4" component="h1" sx={{ fontWeight: 700, color: "text.primary" }}>
                  {id ? "Edit Section" : "+ New Section"}
                </Typography>
              </Box>

              <Paper
                elevation={0}
                sx={{
                  mb: 4,
                  overflow: "hidden",
                  borderTop: `4px solid ${theme.palette.primary.main}`,
                }}
              >
                <Box sx={{ p: 3 }}>
                  <CraftForm onSubmit={handleSubmit} defaultValues={defaultValues}>
                    <Box sx={{ mb: 4 }}>
                      <CraftInputWithIcon
                        label="Section Name"
                        name="name"
                        InputProps={{
                          startAdornment: <BookmarkIcon sx={{ color: "primary.main", mr: 1 }} />,
                        }}
                        fullWidth
                        placeholder="e.g., Section A, Morning Batch"
                        required
                      />
                    </Box>

                    <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 4 }}>
                      <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        disabled={loading}
                        startIcon={
                          loading ? (
                            <CircularProgress size={20} color="inherit" />
                          ) : success ? (
                            <CheckCircleIcon />
                          ) : (
                            <Save />
                          )
                        }
                        sx={{
                          px: 4,
                          py: 1.5,
                          fontSize: "1rem",
                          boxShadow: "0px 8px 16px rgba(99, 102, 241, 0.2)",
                          "&:hover": {
                            boxShadow: "0px 8px 20px rgba(99, 102, 241, 0.4)",
                          },
                        }}
                      >
                        {loading ? "Saving..." : success ? "Saved!" : "Save Section"}
                      </Button>
                    </Box>
                  </CraftForm>
                </Box>
              </Paper>
            </Box>
          </Fade>
        )}
      </Container>
    </Box>

  )
}
