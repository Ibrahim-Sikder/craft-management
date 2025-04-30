/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import type React from "react"

import {
  Box,
  Container,
  Button,
  Fade,
  ThemeProvider,
  Grid,
  Typography,
  Divider,
  Chip,
  alpha,
  Card,
  CardContent,
  Switch,
  FormControlLabel,
  Tooltip,
  IconButton,
} from "@mui/material"
import { Class as ClassIcon, Person as PersonIcon, Add as AddIcon, Remove as RemoveIcon } from "@mui/icons-material"

import CraftForm from "@/components/Forms/Form"
import CraftSelect from "@/components/Forms/Select"
import { paper } from "@/options"

import CraftInput from "@/components/Forms/Input"
import {
  MenuBook,
  School,
  Assignment,
  Code,
  FormatListNumbered,
  Info as InfoIcon,
  Save as SaveIcon,
  CloudUpload as CloudUploadIcon,
} from "@mui/icons-material"
import { useEffect, useMemo, useState } from "react"
import CraftInputWithIcon from "@/components/Forms/inputWithIcon"
import FileUploadWithIcon from "@/components/Forms/Upload"
import type { FieldValues } from "react-hook-form"
import { useCreateSubjectMutation, useGetSingleSubjectQuery, useUpdateSubjectMutation } from "@/redux/api/subjectApi"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"
import { useGetAllClassesQuery } from "@/redux/api/classApi"
import CraftIntAutoCompleteWithIcon from "@/components/Forms/AutocompleteWithIcon"
import { useGetAllTeachersQuery } from "@/redux/api/teacherApi"
import { customTheme } from "@/ThemeStyle"
import { boxStyle, evaluationStle, evaluationStle2, typographyStyle } from "@/style/customeStyle"

export default function SubjectForm({ id }: any) {
  const router = useRouter()
  const [createSubject] = useCreateSubjectMutation()
  const [updateSubject] = useUpdateSubjectMutation()
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [searchTerm, setSearchTerm] = useState("")

  const { data: singleSubject, isLoading } = useGetSingleSubjectQuery({ id })
  const { data: classData } = useGetAllClassesQuery({
    limit: rowsPerPage,
    page: page + 1,
    searchTerm: searchTerm,
  })
  const { data: teacherData } = useGetAllTeachersQuery({
    limit: rowsPerPage,
    page: page + 1,
    searchTerm: searchTerm,
  })
  const [isOptional, setIsOptional] = useState(false)
  const [lessons, setLessons] = useState([{ lessonNo: 1, lessonName: "" }])
  const theme = customTheme

  const classOption = useMemo(() => {
    if (!classData?.data?.classes) return []
    return classData?.data?.classes.map((clg: any) => ({
      label: clg.className,
      value: clg._id,
    }))
  }, [classData])

  const teacherOption = useMemo(() => {
    if (!teacherData?.data) return []
    return teacherData?.data.map((clg: any) => ({
      label: clg.name,
      value: clg._id,
    }))
  }, [teacherData])

  const handleSubmit = async (data: FieldValues) => {
    const classArray = Array.isArray(data.classes)
      ? data.classes
          .map((item: any) => {
            if (item && typeof item === "object" && "value" in item) {
              return item.value
            }
            return null
          })
          .filter(Boolean)
      : []

    const teacherArray = Array.isArray(data.teachers)
      ? data.teachers
          .map((item: any) => {
            if (item && typeof item === "object" && "value" in item) {
              return item.value
            }
            return null
          })
          .filter(Boolean)
      : []

    const modifyValues = {
      ...data,
      classes: classArray,
      teachers: teacherArray,
      isOptional: isOptional,
      lessons: lessons,
    }

    try {
      let res

      if (!id) {
        res = await createSubject(modifyValues).unwrap()
        if (res.success) {
          toast.success("Subject created successfully!")
          router.push("/dashboard/super_admin/subject")
        }
      } else {
        res = await updateSubject({ id, body: modifyValues }).unwrap()
        console.log("update response", res)
        if (res.success) {
          toast.success("Subject updated successfully!")
          router.push("/dashboard/super_admin/subject")
        }
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to process subject!")
    }
  }

  const handleOptionalChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsOptional(event.target.checked)
  }

  const handleLessonChange = (index: number, value: string) => {
    const updatedLessons = [...lessons]
    updatedLessons[index] = {
      ...updatedLessons[index],
      lessonName: value,
    }
    setLessons(updatedLessons)
  }
  const addLessonField = () => {
    setLessons([...lessons, { lessonNo: lessons.length + 1, lessonName: "" }])
  }

  const removeLessonField = (index: number) => {
    if (lessons.length === 1) return
    const updatedLessons = [...lessons]
    updatedLessons.splice(index, 1)

    // Renumber lessons
    const renumberedLessons = updatedLessons.map((lesson, idx) => ({
      ...lesson,
      lessonNo: idx + 1,
    }))

    setLessons(renumberedLessons)
  }
  // Add this in your component after fetching the single subject
  useEffect(() => {
    if (singleSubject?.data?.lessons && singleSubject.data.lessons.length > 0) {
      setLessons(singleSubject.data.lessons)
      setIsOptional(singleSubject.data.isOptional || false)
    }
  }, [singleSubject])

  const defaultValues = {
    name: singleSubject?.data?.name || "",
    code: singleSubject?.data?.code || "",
    image: singleSubject?.data?.image || "",
    paper: singleSubject?.data?.paper || "",
    lessons:
      singleSubject?.data?.lessons?.map((lesson: { lessonNo: any; lessonName: any }) => ({
        lessonNo: lesson?.lessonNo || 0,
        lessonName: lesson?.lessonName || "",
      })) || [],
    classes:  singleSubject?.data?.classes?.map((classItem: any) => ({
        label: classItem.className,
        value: classItem._id,
      })) || [],
    teachers: singleSubject?.data?.teachers || [],
    isOptional: singleSubject?.data?.isOptional || false,
    createdAt: singleSubject?.data?.createdAt || "",
    updatedAt: singleSubject?.data?.updatedAt || "",
    __v: singleSubject?.data?.__v ?? 0,
  }


  return (
    <>
      {isLoading ? (
        <div>Loading......</div>
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
                              name="code"
                              label="Subject Code"
                              placeholder="Write Subject Code"
                              required
                              fullWidth
                              InputProps={{
                                startAdornment: <Code sx={{ color: "primary.main", mr: 1 }} />,
                              }}
                            />
                          </Grid>
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

                          <Grid item xs={12}>
                            <Divider sx={{ my: 1 }}>
                              <Chip
                                label="Classification"
                                icon={<School />}
                                sx={{
                                  bgcolor: alpha(theme.palette.primary.main, 0.1),
                                  color: "primary.main",
                                  fontWeight: 500,
                                  borderRadius: "8px",
                                  py: 0.5,
                                }}
                              />
                            </Divider>
                          </Grid>

                          <Grid item xs={12} md={6}>
                            <CraftSelect size="medium" name="paper" label="Paper" items={paper} fullWidth required />
                          </Grid>

                          <Grid item xs={12} md={6}>
                            <CraftIntAutoCompleteWithIcon
                              name="classes"
                              label="Select Classes"
                              options={classOption}
                              fullWidth
                              multiple
                              icon={<ClassIcon color="primary" />}
                            />
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <CraftIntAutoCompleteWithIcon
                              name="teachers"
                              label="Select Teachers"
                              options={teacherOption}
                              fullWidth
                              multiple
                              icon={<PersonIcon color="secondary" />}
                            />
                          </Grid>

                          <Grid item xs={12} md={6}>
                            <FormControlLabel
                              control={
                                <Switch
                                  checked={isOptional}
                                  onChange={handleOptionalChange}
                                  name="isOptional"
                                  color="primary"
                                />
                              }
                              label={
                                <Box sx={{ display: "flex", alignItems: "center" }}>
                                  <Typography variant="body1" sx={{ mr: 1 }}>
                                    Optional Subject
                                  </Typography>
                                  <Tooltip title="Mark this subject as optional for students">
                                    <InfoIcon fontSize="small" color="action" />
                                  </Tooltip>
                                </Box>
                              }
                            />
                          </Grid>

                          <Grid item xs={12}>
                            <Divider sx={{ my: 1 }}>
                              <Chip
                                label="Lesson Information"
                                icon={<FormatListNumbered />}
                                sx={{
                                  bgcolor: alpha(theme.palette.primary.main, 0.1),
                                  color: "primary.main",
                                  fontWeight: 500,
                                  borderRadius: "8px",
                                  py: 0.5,
                                }}
                              />
                            </Divider>
                          </Grid>

                          {lessons.map((lesson, index) => (
                            <Grid item xs={12} key={index}>
                              <Box
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: 2,
                                  p: 2,
                                  borderRadius: 2,
                                  border: "1px solid rgba(0, 0, 0, 0.08)",
                                  bgcolor: "rgba(99, 102, 241, 0.02)",
                                }}
                              >
                                <Chip label={`Lesson ${lesson.lessonNo}`} color="primary" sx={{ minWidth: 100 }} />
                                <CraftInput
                                  name={`lessonName_${index}`}
                                  label="Lesson Name"
                                  placeholder="Enter lesson name"
                                  value={lesson.lessonName}
                                  onChange={(e: any) => handleLessonChange(index, e.target.value)}
                                  sx={{ flexGrow: 1 }}
                                />
                                <IconButton
                                  color="error"
                                  onClick={() => removeLessonField(index)}
                                  disabled={lessons.length === 1}
                                  sx={{
                                    border: "1px solid rgba(239, 68, 68, 0.5)",
                                    borderRadius: "50%",
                                  }}
                                >
                                  <RemoveIcon />
                                </IconButton>
                                <IconButton
                                  color="primary"
                                  onClick={addLessonField}
                                  sx={{
                                    border: "1px solid rgba(99, 102, 241, 0.5)",
                                    borderRadius: "50%",
                                  }}
                                >
                                  <AddIcon />
                                </IconButton>
                              </Box>
                            </Grid>
                          ))}

                          <Grid item xs={12}>
                            <Divider sx={{ my: 1 }}>
                              <Chip
                                label="Resources"
                                icon={<CloudUploadIcon />}
                                sx={{
                                  bgcolor: alpha(theme.palette.primary.main, 0.1),
                                  color: "primary.main",
                                  fontWeight: 500,
                                  borderRadius: "8px",
                                  py: 0.5,
                                }}
                              />
                            </Divider>
                          </Grid>

                          <Grid item xs={12} md={6}>
                            <FileUploadWithIcon name="image" label="Subject Image" />
                          </Grid>

                          <Grid item xs={12} md={6}>
                            <CraftInput
                              name="paper"
                              label="Paper Document URL"
                              placeholder="Enter paper document URL or upload"
                              fullWidth
                            />
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
