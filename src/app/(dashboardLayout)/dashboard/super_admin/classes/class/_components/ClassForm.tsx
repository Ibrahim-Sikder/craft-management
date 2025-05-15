/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import {
  Box,
  Container,
  Typography,
  Button,
  Paper,
  Card,
  CardContent,
  Grid,
  alpha,
  Fade,
  Zoom,
  styled,
  keyframes,
  Chip,
} from "@mui/material"
import {
  Save as SaveIcon,
  School as SchoolIcon,
  Class as ClassIcon,
  CheckCircleOutline as CheckCircleOutlineIcon,
  AddCircle as AddCircleIcon,
} from "@mui/icons-material"
import CraftForm from "@/components/Forms/Form"
import CraftInputWithIcon from "@/components/Forms/inputWithIcon"
import CraftIntAutoCompleteWithIcon from "@/components/Forms/AutocompleteWithIcon"
import { theme } from "@/lib/Theme/Theme"
import toast from "react-hot-toast"
import { useCreateClassMutation, useGetSingleClassQuery, useUpdateClassMutation } from "@/redux/api/classApi"
import type { FieldValues } from "react-hook-form"
import { useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { useGetAllSectionsQuery, useCreateSectionMutation } from "@/redux/api/sectionApi"
import SectionModal from "./SectionModal"

// Define animations
const pulseAnimation = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(99, 102, 241, 0.4);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(99, 102, 241, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(99, 102, 241, 0);
  }
`

const floatAnimation = keyframes`
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-5px);
  }
  100% {
    transform: translateY(0px);
  }
`

// Styled components
const AddSectionButton = styled(Button)(({ theme }) => ({
  marginTop: "8px",
  marginLeft: "8px",
  borderRadius: "20px",
  padding: "6px 16px",
  backgroundColor: alpha(theme.palette.primary.main, 0.1),
  color: theme.palette.primary.main,
  fontWeight: 600,
  boxShadow: "0 4px 10px rgba(63, 81, 181, 0.15)",
  transition: "all 0.3s ease",
  animation: `${floatAnimation} 3s ease-in-out infinite`,
  "&:hover": {
    backgroundColor: theme.palette.primary.main,
    color: "white",
    boxShadow: "0 6px 15px rgba(63, 81, 181, 0.3)",
    transform: "translateY(-2px)",
  },
  "&:active": {
    transform: "translateY(1px)",
    boxShadow: "0 2px 5px rgba(63, 81, 181, 0.2)",
  },
}))

interface ClassProps {
  id: string
}
export default function ClassForm({ id }: ClassProps) {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [searchTerm, setSearchTerm] = useState("")
  const router = useRouter()
  const { data: singleClass, isLoading } = useGetSingleClassQuery({ id })
  // Add Section Modal State
  const [addModalOpen, setAddModalOpen] = useState(false)
  const [newSectionName, setNewSectionName] = useState("")
  const [isCreating, setIsCreating] = useState(false)
  const [showAddSectionHint, setShowAddSectionHint] = useState(true)

  const [createClass, { isSuccess }] = useCreateClassMutation()
  const [updateClass] = useUpdateClassMutation()
  const [createSection] = useCreateSectionMutation()

  const { data: sectionData, refetch } = useGetAllSectionsQuery({
    limit: rowsPerPage,
    page: page + 1,
    searchTerm: searchTerm,
  })

  const sectionOption = useMemo(() => {
    if (!sectionData?.data?.sections) return []
    return sectionData?.data?.sections.map((sub: any) => ({
      label: sub.name,
      value: sub._id,
    }))
  }, [sectionData])

  // Handle add modal
  const handleOpenAddModal = () => {
    setAddModalOpen(true)
    setShowAddSectionHint(false)
  }

  const handleCloseAddModal = () => {
    setAddModalOpen(false)
    setNewSectionName("")
  }

  const handleSubmit = async (data: FieldValues) => {
    console.log(data)
    const sectionsArray = Array.isArray(data.sections)
      ? data.sections
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
      sections: sectionsArray,
    }
    console.log(modifyValues)

    try {
      let res
      if (id) {
        res = await updateClass({ id, data: modifyValues }).unwrap()
        if (res?.success) {
          toast.success("Class updated successfully!")
          router.push("/dashboard/super_admin/classes/class")
        }
      } else {
        res = await createClass(modifyValues).unwrap()
        if (res.success) {
          toast.success("Class created successfully!")
          router.push("/dashboard/super_admin/classes/class")
        }
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to process class!")
    }
  }

  const defaultValue = {
    className: singleClass?.data.className || "",
    sections: singleClass?.data.sections || [],
  }

  if (isLoading) {
    return <h3>Loading........</h3>
  }

  return (
    <>
      {isLoading ? (
        <h3>Loading........</h3>
      ) : (
        <CraftForm onSubmit={handleSubmit} defaultValues={defaultValue}>
          <Box
            sx={{
              flexGrow: 1,
              minHeight: "100vh",
              background: "linear-gradient(to bottom, #f5f7fa, #e4e7eb)",
              pt: 4,
              pb: 8,
            }}
          >
            <Container maxWidth="lg">
              <Fade in={true} timeout={800}>
                <Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      mb: 4,
                    }}
                  >
                    <SchoolIcon
                      sx={{
                        fontSize: 40,
                        color: "primary.main",
                        mr: 2,
                        p: 1,
                        borderRadius: "50%",
                        bgcolor: alpha(theme.palette.primary.main, 0.1),
                      }}
                    />
                    <Typography
                      variant="h4"
                      component="h1"
                      sx={{
                        background: "linear-gradient(45deg, #3f51b5, #5c6bc0)",
                        backgroundClip: "text",
                        textFillColor: "transparent",
                        mb: 0,
                      }}
                    >
                      Class Management
                    </Typography>
                  </Box>

                  <Paper
                    elevation={0}
                    sx={{
                      p: 0,
                      mb: 4,
                      overflow: "hidden",
                      position: "relative",
                      borderRadius: 3,
                      boxShadow: "0 10px 30px rgba(0, 0, 0, 0.08)",
                    }}
                  >
                    <Box
                      sx={{
                        p: 3,
                        background: "linear-gradient(45deg, #3f51b5, #5c6bc0)",
                        color: "white",
                        borderTopLeftRadius: 16,
                        borderTopRightRadius: 16,
                      }}
                    >
                      <Typography variant="h5" fontWeight="bold">
                        {id ? "Update Class" : "Create New Class"}
                      </Typography>
                      <Typography variant="body2" sx={{ opacity: 0.8, mt: 0.5 }}>
                        Fill in the details below to {id ? "update" : "create a new"} class in your school management
                        system
                      </Typography>
                    </Box>

                    <Box sx={{ p: 3 }}>
                      <Zoom in={true}>
                        <Card
                          sx={{
                            mb: 4,
                            position: "relative",
                            border: "1px solid rgba(0,0,0,0.08)",
                            overflow: "visible",
                            borderRadius: 3,
                            boxShadow: "0 5px 20px rgba(0, 0, 0, 0.05)",
                          }}
                        >
                          <Box
                            sx={{
                              position: "absolute",
                              top: -15,
                              left: 20,
                              bgcolor: "primary.main",
                              color: "white",
                              py: 0.5,
                              px: 2,
                              borderRadius: 4,
                              zIndex: 1,
                              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                            }}
                          >
                            <Typography variant="subtitle2" fontWeight="bold">
                              Class Details
                            </Typography>
                          </Box>

                          <CardContent sx={{ p: 3, pt: 4 }}>
                            <Grid container spacing={3}>
                              <Grid item xs={12} md={6}>
                                <CraftInputWithIcon
                                  name="className"
                                  fullWidth
                                  label="Class Name"
                                  variant="outlined"
                                  placeholder="Enter class name"
                                  required
                                  InputProps={{
                                    startAdornment: (
                                      <ClassIcon
                                        sx={{ color: "text.secondary", mr: 1, alignSelf: "flex-start", mt: 1.5 }}
                                      />
                                    ),
                                  }}
                                />
                              </Grid>

                              <Grid item xs={12} md={6}>
                                <Grid container >
                                  <Grid item md={8} >
                                    <CraftIntAutoCompleteWithIcon
                                      name="sections"
                                      label="Select Section"
                                      options={sectionOption}
                                      fullWidth
                                      icon={<ClassIcon color="secondary" />}
                                    />

                                  </Grid>
                                  <Grid item md={4} >
                                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: 'center', mt: 1 }}>
                                      <AddSectionButton
                                        variant="contained"
                                        startIcon={<AddCircleIcon />}
                                        onClick={handleOpenAddModal}
                                        disableElevation
                                      >
                                        New Section
                                      </AddSectionButton>

                                      {showAddSectionHint && sectionOption.length < 3 && (
                                        <Chip
                                          label="Create sections for your class!"
                                          color="info"
                                          size="small"
                                          sx={{
                                            ml: 2,
                                            animation: `${pulseAnimation} 2s infinite`,
                                            fontWeight: 500,
                                          }}
                                        />
                                      )}
                                    </Box>
                                  </Grid>
                                </Grid>

                              </Grid>
                            </Grid>
                          </CardContent>
                        </Card>
                      </Zoom>
                    </Box>
                  </Paper>

                  <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <Button
                      variant="contained"
                      color="primary"
                      size="large"
                      startIcon={isSuccess ? <CheckCircleOutlineIcon /> : <SaveIcon />}
                      type="submit"
                      sx={{
                        px: 6,
                        py: 1.5,
                        fontSize: "1rem",
                        minWidth: 200,
                        position: "relative",
                        overflow: "hidden",
                        borderRadius: 3,
                        boxShadow: "0 8px 20px rgba(63, 81, 181, 0.3)",
                        "&:hover": {
                          boxShadow: "0 10px 25px rgba(63, 81, 181, 0.4)",
                          transform: "translateY(-2px)",
                        },
                        transition: "all 0.3s ease",
                        "&::after": isSuccess
                          ? {
                            content: '""',
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%",
                            background: `linear-gradient(45deg, ${alpha(
                              theme.palette.success.main,
                              0.2,
                            )} 30%, ${alpha(theme.palette.success.light, 0.2)} 90%)`,
                            zIndex: -1,
                          }
                          : {},
                      }}
                    >
                      {id ? "Update Class" : "Save Class"}
                    </Button>
                  </Box>
                </Box>
              </Fade>
            </Container>
          </Box>
          <SectionModal open={addModalOpen} onClose={handleCloseAddModal} />
        </CraftForm>
      )}
    </>
  )
}
