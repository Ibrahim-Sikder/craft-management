// /* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable @typescript-eslint/no-unused-vars */
// "use client"

// import {
//   Box,
//   Container,
//   Typography,
//   Button,
//   Paper,
//   Card,
//   CardContent,
//   Grid,
//   alpha,
//   Fade,
//   Zoom,
//   styled,
//   keyframes,
//   Chip,
//   ThemeProvider,
// } from "@mui/material"
// import {
//   Save as SaveIcon,
//   School as SchoolIcon,
//   Class as ClassIcon,
//   CheckCircleOutline as CheckCircleOutlineIcon,
//   AddCircle as AddCircleIcon,
// } from "@mui/icons-material"
// import CraftForm from "@/components/Forms/Form"
// import CraftInputWithIcon from "@/components/Forms/inputWithIcon"
// import CraftIntAutoCompleteWithIcon from "@/components/Forms/AutocompleteWithIcon"
// import { theme } from "@/lib/Theme/Theme"
// import toast from "react-hot-toast"
// import { useCreateClassMutation, useGetSingleClassQuery, useUpdateClassMutation } from "@/redux/api/classApi"
// import type { FieldValues } from "react-hook-form"
// import { useMemo, useState } from "react"
// import { useRouter } from "next/navigation"
// import { useGetAllSectionsQuery, useCreateSectionMutation } from "@/redux/api/sectionApi"
// import SectionModal from "./SectionModal"

// // Define animations
// const pulseAnimation = keyframes`
//   0% {
//     box-shadow: 0 0 0 0 rgba(99, 102, 241, 0.4);
//   }
//   70% {
//     box-shadow: 0 0 0 10px rgba(99, 102, 241, 0);
//   }
//   100% {
//     box-shadow: 0 0 0 0 rgba(99, 102, 241, 0);
//   }
// `

// const floatAnimation = keyframes`
//   0% {
//     transform: translateY(0px);
//   }
//   50% {
//     transform: translateY(-5px);
//   }
//   100% {
//     transform: translateY(0px);
//   }
// `

// // Styled components
// const AddSectionButton = styled(Button)(({ theme }) => ({
//   marginTop: "8px",
//   marginLeft: "8px",
//   borderRadius: "20px",
//   padding: "6px 16px",
//   backgroundColor: alpha(theme.palette.primary.main, 0.1),
//   color: theme.palette.primary.main,
//   fontWeight: 600,
//   boxShadow: "0 4px 10px rgba(63, 81, 181, 0.15)",
//   transition: "all 0.3s ease",
//   animation: `${floatAnimation} 3s ease-in-out infinite`,
//   "&:hover": {
//     backgroundColor: theme.palette.primary.main,
//     color: "white",
//     boxShadow: "0 6px 15px rgba(63, 81, 181, 0.3)",
//     transform: "translateY(-2px)",
//   },
//   "&:active": {
//     transform: "translateY(1px)",
//     boxShadow: "0 2px 5px rgba(63, 81, 181, 0.2)",
//   },
// }))

// interface ClassProps {
//   id: string
// }
// export default function ClassForm({ id }: ClassProps) {
//   const [page, setPage] = useState(0)
//   const [rowsPerPage, setRowsPerPage] = useState(10)
//   const [searchTerm, setSearchTerm] = useState("")
//   const router = useRouter()
//   const { data: singleClass, isLoading } = useGetSingleClassQuery({ id })
//   // Add Section Modal State
//   const [addModalOpen, setAddModalOpen] = useState(false)
//   const [newSectionName, setNewSectionName] = useState("")
//   const [isCreating, setIsCreating] = useState(false)
//   const [showAddSectionHint, setShowAddSectionHint] = useState(true)

//   const [createClass, { isSuccess }] = useCreateClassMutation()
//   const [updateClass] = useUpdateClassMutation()
//   const [createSection] = useCreateSectionMutation()

//   const { data: sectionData, refetch } = useGetAllSectionsQuery({
//     limit: rowsPerPage,
//     page: page + 1,
//     searchTerm: searchTerm,
//   })

//   const sectionOption = useMemo(() => {
//     if (!sectionData?.data?.sections) return []
//     return sectionData?.data?.sections.map((sub: any) => ({
//       label: sub.name,
//       value: sub._id,
//     }))
//   }, [sectionData])

//   // Handle add modal
//   const handleOpenAddModal = () => {
//     setAddModalOpen(true)
//     setShowAddSectionHint(false)
//   }

//   const handleCloseAddModal = () => {
//     setAddModalOpen(false)
//     setNewSectionName("")
//   }

//   const handleSubmit = async (data: FieldValues) => {
//     console.log(data)
//     const sectionsArray = Array.isArray(data.sections)
//       ? data.sections
//         .map((item: any) => {
//           if (item && typeof item === "object" && "value" in item) {
//             return item.value
//           }
//           return null
//         })
//         .filter(Boolean)
//       : []

//     const modifyValues = {
//       ...data,
//       sections: sectionsArray,
//     }
//     console.log(modifyValues)

//     try {
//       let res
//       if (id) {
//         res = await updateClass({ id, data: modifyValues }).unwrap()
//         if (res?.success) {
//           toast.success("Class updated successfully!")
//           router.push("/dashboard/super_admin/classes/class")
//         }
//       } else {
//         res = await createClass(modifyValues).unwrap()
//         if (res.success) {
//           toast.success("Class created successfully!")
//           router.push("/dashboard/super_admin/classes/class")
//         }
//       }
//     } catch (err) {
//       toast.error(err instanceof Error ? err.message : "Failed to process class!")
//     }
//   }

//   const defaultValue = {
//     className: singleClass?.data.className || "",
//     sections: singleClass?.data.sections || [],
//   }

//   if (isLoading) {
//     return <h3>Loading........</h3>
//   }

//   return (
//     <>
//       {isLoading ? (
//         <h3>Loading........</h3>
//       ) : (
//         <ThemeProvider theme={theme}>
//           <CraftForm onSubmit={handleSubmit} defaultValues={defaultValue}>
//             <div className="min-h-screen md:min-w-screen lg:min-w-fit md:bg-gradient-to-b md:from-[#f5f7fa] md:to-[#e4e7eb] pt-1 md:pt-4 pb-1 md:pb-8 rounded-xl w-full px-0 md:px-4">     
//               <Container sx={{  p: { xs: 0, sm: 0, md: "auto" } }}>
//                 <Fade in={true} timeout={800}>
//                   <div>
//                     {/* Rest of your existing code remains exactly the same */}
//                     <Paper
//                       elevation={0}
//                       sx={{
//                         p: 0,
//                         mb: 4,
//                         overflow: "hidden",
//                         position: "relative",
//                         borderRadius: 3,
//                         boxShadow: "0 10px 30px rgba(0, 0, 0, 0.08)",
//                       }}
//                     >
//                       <div className="p-3 md:p-4 bg-gradient-to-r from-[#3f51b5] to-[#5c6bc0] text-white   rounded-t-2xl flex flex-col items-center">
//                         <div className="flex items-center content-center gap-2">
//                           <SchoolIcon
//                             sx={{
//                               fontSize: 40,
//                               color: "white",
//                               mr: 0,
//                               p: 1,
//                               borderRadius: "50%",
//                               bgcolor: alpha(theme.palette.primary.main, 0.1),
//                             }}
//                           />
//                           <h1 className="text-xl md:text-2xl font-bold">
//                             {id ? "Update Class" : "Create New Class"}
//                           </h1>

//                         </div>
//                         <p className="text-sm leading-normal opacity-80 mt-1 text-center">
//                           Fill in the details below to {id ? "update" : "create a new"} class.
//                         </p>
//                       </div>

//                       <div className="py-5 px-1 md:px-3">
//                         <Zoom in={true}>
//                           <Card
//                             sx={{
//                               mb: 4,
//                               position: "relative",
//                               border: "1px solid rgba(0,0,0,0.08)",
//                               overflow: "visible",
//                               borderRadius: 3,
//                               boxShadow: "0 5px 20px rgba(0, 0, 0, 0.05)",
//                             }}
//                           >
//                             <Box
//                               sx={{
//                                 position: "absolute",
//                                 top: -15,
//                                 left: 20,
//                                 bgcolor: "primary.main",
//                                 color: "white",
//                                 py: 0.5,
//                                 px: 2,
//                                 borderRadius: 4,
//                                 zIndex: 1,
//                                 boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
//                               }}
//                             >
//                               <Typography variant="subtitle2" fontWeight="bold">
//                                 Class Details
//                               </Typography>
//                             </Box>

//                             <CardContent sx={{ p: { xs: 1, sm: 1, md: 3 }, pt: 6 }}>
//                               <Grid container spacing={2}>
//                                 <Grid item xs={12} md={6} sx={{ mt: { xs: 1, sm: 1, md: 0 } }}>
//                                   <CraftInputWithIcon
//                                     name="className"
//                                     fullWidth
//                                     label="Class Name"
//                                     variant="outlined"
//                                     placeholder="Enter class name"
//                                     required
//                                     InputProps={{
//                                       startAdornment: (
//                                         <ClassIcon
//                                           sx={{ color: "text.secondary", mr: 1, alignSelf: "flex-start", mt: 1.5 }}
//                                         />
//                                       ),
//                                     }}
//                                   />
//                                 </Grid>

//                                 <Grid item xs={12} md={6}>
//                                   <Grid container >
//                                     <Grid item xs={12} md={8} >
//                                       <CraftIntAutoCompleteWithIcon
//                                         name="sections"
//                                         label="Select Section"
//                                         options={sectionOption}
//                                         fullWidth
//                                         icon={<ClassIcon color="secondary" />}
//                                       />

//                                     </Grid>
//                                     <Grid item md={4} >
//                                       <Box sx={{ display: "flex", alignItems: "center", justifyContent: 'center', mt: 1 }}>
//                                         <AddSectionButton
//                                           variant="contained"
//                                           startIcon={<AddCircleIcon />}
//                                           onClick={handleOpenAddModal}
//                                           disableElevation
//                                         >
//                                           New Section
//                                         </AddSectionButton>

//                                         {showAddSectionHint && sectionOption.length < 3 && (
//                                           <Chip
//                                             label="Create sections for your class!"
//                                             color="info"
//                                             size="small"
//                                             sx={{
//                                               ml: 2,
//                                               animation: `${pulseAnimation} 2s infinite`,
//                                               fontWeight: 500,
//                                             }}
//                                           />
//                                         )}
//                                       </Box>
//                                     </Grid>
//                                   </Grid>

//                                 </Grid>
//                               </Grid>
//                             </CardContent>
//                           </Card>
//                         </Zoom>
//                         <Box sx={{ display: "flex", justifyContent: "end" }}>
//                           <Button
//                             variant="contained"
//                             color="primary"
//                             size="large"
//                             startIcon={isSuccess ? <CheckCircleOutlineIcon /> : <SaveIcon />}
//                             type="submit"
//                             sx={{
//                               px: 6,
//                               py: 1.5,
//                               fontSize: "1rem",
//                               minWidth: 200,
//                               position: "relative",
//                               overflow: "hidden",
//                               borderRadius: 3,
//                               boxShadow: "0 8px 20px rgba(63, 81, 181, 0.3)",
//                               "&:hover": {                                
//                                 transform: "translateY(-2px)",
//                               },
//                               transition: "all 0.3s ease",
//                             }}
//                           >
//                             {id ? "Update Class" : "Save Class"}
//                           </Button>
//                         </Box>
//                       </div>

//                     </Paper>


//                   </div>
//                 </Fade>
//               </Container>
//               <SectionModal open={addModalOpen} onClose={handleCloseAddModal} />
//             </div>
//           </CraftForm>
//         </ThemeProvider>
//       )}
//     </>
//   )
// }
// -------------------------other code


/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import {
  Box,
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
  ThemeProvider,
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
    <ThemeProvider theme={theme}>
      <CraftForm onSubmit={handleSubmit} defaultValues={defaultValue}>
        <Box sx={{
          width: '100vw',
          minHeight: '100vh',
          display: 'flex',
      
          backgroundColor: { md: '#f5f7fa' },
          py: 4,
        }}>
          <Box sx={{
            width: '100%',
            maxWidth: '1500px', // You can adjust this as needed
            px: { xs: 2, sm: 3, md: 4 },
          }}>
            <Fade in={true} timeout={800}>
              <Box>
                <Paper
                  elevation={0}
                  sx={{
                    width: '100%',
                    mb: 4,
                    overflow: "hidden",
                    position: "relative",
                    borderRadius: 3,
                    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.08)",
                  }}
                >
                  <div className="p-3 md:p-4 bg-gradient-to-r from-[#3f51b5] to-[#5c6bc0] text-white   rounded-t-2xl flex flex-col items-center">
                       <div className="flex items-center content-center gap-2">
                           <SchoolIcon
                            sx={{
                              fontSize: 40,
                              color: "white",
                              mr: 0,
                              p: 1,
                              borderRadius: "50%",
                              bgcolor: alpha(theme.palette.primary.main, 0.1),
                            }}
                          />
                          <h1 className="text-xl md:text-2xl font-bold">
                            {id ? "Update Class" : "Create New Class"}
                          </h1>

                        </div>
                        <p className="text-sm leading-normal opacity-80 mt-1 text-center">
                          Fill in the details below to {id ? "update" : "create a new"} class.
                        </p>
                      </div>

                  <Box sx={{ py: 5, px: { xs: 2, md: 4 } }}>
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

                        <CardContent sx={{ p: { xs: 2, md: 3 }, pt: 6 }}>
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
                              <Grid container spacing={2}>
                                <Grid item xs={12} md={8}>
                                  <CraftIntAutoCompleteWithIcon
                                    name="sections"
                                    label="Select Section"
                                    options={sectionOption}
                                    fullWidth
                                    icon={<ClassIcon color="secondary" />}
                                  />
                                </Grid>
                                <Grid item xs={12} md={4}>
                                  <Box sx={{ 
                                    display: "flex", 
                                    alignItems: "center", 
                                    justifyContent: 'center', 
                                    height: '100%',
                                    pt: { xs: 0, md: 1 } 
                                  }}>
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
                    <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
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
                            transform: "translateY(-2px)",
                          },
                          transition: "all 0.3s ease",
                        }}
                      >
                        {id ? "Update Class" : "Save Class"}
                      </Button>
                    </Box>
                  </Box>
                </Paper>
              </Box>
            </Fade>
            <SectionModal open={addModalOpen} onClose={handleCloseAddModal} />
          </Box>
        </Box>
      </CraftForm>
    </ThemeProvider>
  )
}



// /* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable @typescript-eslint/no-unused-vars */
// "use client"

// import {
//   Box,
//   Container,
//   Typography,
//   Button,
//   Paper,
//   Card,
//   CardContent,
//   Grid,
//   alpha,
//   Fade,
//   Zoom,
//   styled,
//   keyframes,
//   Chip,
//   ThemeProvider,
// } from "@mui/material"
// import {
//   Save as SaveIcon,
//   School as SchoolIcon,
//   Class as ClassIcon,
//   CheckCircleOutline as CheckCircleOutlineIcon,
//   AddCircle as AddCircleIcon,
// } from "@mui/icons-material"
// import CraftForm from "@/components/Forms/Form"
// import CraftInputWithIcon from "@/components/Forms/inputWithIcon"
// import CraftIntAutoCompleteWithIcon from "@/components/Forms/AutocompleteWithIcon"
// import { theme } from "@/lib/Theme/Theme"
// import toast from "react-hot-toast"
// import { useCreateClassMutation, useGetSingleClassQuery, useUpdateClassMutation } from "@/redux/api/classApi"
// import type { FieldValues } from "react-hook-form"
// import { useMemo, useState } from "react"
// import { useRouter } from "next/navigation"
// import { useGetAllSectionsQuery, useCreateSectionMutation } from "@/redux/api/sectionApi"
// import SectionModal from "./SectionModal"

// // Define animations
// const pulseAnimation = keyframes`
//   0% {
//     box-shadow: 0 0 0 0 rgba(99, 102, 241, 0.4);
//   }
//   70% {
//     box-shadow: 0 0 0 10px rgba(99, 102, 241, 0);
//   }
//   100% {
//     box-shadow: 0 0 0 0 rgba(99, 102, 241, 0);
//   }
// `

// const floatAnimation = keyframes`
//   0% {
//     transform: translateY(0px);
//   }
//   50% {
//     transform: translateY(-5px);
//   }
//   100% {
//     transform: translateY(0px);
//   }
// `

// // Styled components
// const AddSectionButton = styled(Button)(({ theme }) => ({
//   marginTop: "8px",
//   marginLeft: "8px",
//   borderRadius: "20px",
//   padding: "6px 16px",
//   backgroundColor: alpha(theme.palette.primary.main, 0.1),
//   color: theme.palette.primary.main,
//   fontWeight: 600,
//   boxShadow: "0 4px 10px rgba(63, 81, 181, 0.15)",
//   transition: "all 0.3s ease",
//   animation: `${floatAnimation} 3s ease-in-out infinite`,
//   "&:hover": {
//     backgroundColor: theme.palette.primary.main,
//     color: "white",
//     boxShadow: "0 6px 15px rgba(63, 81, 181, 0.3)",
//     transform: "translateY(-2px)",
//   },
//   "&:active": {
//     transform: "translateY(1px)",
//     boxShadow: "0 2px 5px rgba(63, 81, 181, 0.2)",
//   },
// }))

// interface ClassProps {
//   id: string
// }
// export default function ClassForm({ id }: ClassProps) {
//   const [page, setPage] = useState(0)
//   const [rowsPerPage, setRowsPerPage] = useState(10)
//   const [searchTerm, setSearchTerm] = useState("")
//   const router = useRouter()
//   const { data: singleClass, isLoading } = useGetSingleClassQuery({ id })
//   // Add Section Modal State
//   const [addModalOpen, setAddModalOpen] = useState(false)
//   const [newSectionName, setNewSectionName] = useState("")
//   const [isCreating, setIsCreating] = useState(false)
//   const [showAddSectionHint, setShowAddSectionHint] = useState(true)

//   const [createClass, { isSuccess }] = useCreateClassMutation()
//   const [updateClass] = useUpdateClassMutation()
//   const [createSection] = useCreateSectionMutation()

//   const { data: sectionData, refetch } = useGetAllSectionsQuery({
//     limit: rowsPerPage,
//     page: page + 1,
//     searchTerm: searchTerm,
//   })

//   const sectionOption = useMemo(() => {
//     if (!sectionData?.data?.sections) return []
//     return sectionData?.data?.sections.map((sub: any) => ({
//       label: sub.name,
//       value: sub._id,
//     }))
//   }, [sectionData])

//   // Handle add modal
//   const handleOpenAddModal = () => {
//     setAddModalOpen(true)
//     setShowAddSectionHint(false)
//   }

//   const handleCloseAddModal = () => {
//     setAddModalOpen(false)
//     setNewSectionName("")
//   }

//   const handleSubmit = async (data: FieldValues) => {
//     console.log(data)
//     const sectionsArray = Array.isArray(data.sections)
//       ? data.sections
//         .map((item: any) => {
//           if (item && typeof item === "object" && "value" in item) {
//             return item.value
//           }
//           return null
//         })
//         .filter(Boolean)
//       : []

//     const modifyValues = {
//       ...data,
//       sections: sectionsArray,
//     }
//     console.log(modifyValues)

//     try {
//       let res
//       if (id) {
//         res = await updateClass({ id, data: modifyValues }).unwrap()
//         if (res?.success) {
//           toast.success("Class updated successfully!")
//           router.push("/dashboard/super_admin/classes/class")
//         }
//       } else {
//         res = await createClass(modifyValues).unwrap()
//         if (res.success) {
//           toast.success("Class created successfully!")
//           router.push("/dashboard/super_admin/classes/class")
//         }
//       }
//     } catch (err) {
//       toast.error(err instanceof Error ? err.message : "Failed to process class!")
//     }
//   }

//   const defaultValue = {
//     className: singleClass?.data.className || "",
//     sections: singleClass?.data.sections || [],
//   }

//   if (isLoading) {
//     return <h3>Loading........</h3>
//   }

//   return (
//     <>
//       {isLoading ? (
//         <h3>Loading........</h3>
//       ) : (
//         <ThemeProvider theme={theme}>
//           <CraftForm onSubmit={handleSubmit} defaultValues={defaultValue}>
//             <Box sx={{
//               width: '100vw',
//               maxWidth: '100%',
//               minHeight: '100vh',
//               background: 'linear-gradient(to bottom, #f5f7fa, #e4e7eb)',
//               pt: { xs: 1, md: 4 },
//               pb: { xs: 1, md: 8 },
//               m: 0,
//               overflow: 'hidden'
//             }}>
//               <Container 
//                 maxWidth={false} 
//                 disableGutters 
//                 sx={{ 
//                   width: '100%', 
//                   maxWidth: '100%',
//                   px: { xs: 2, sm: 3, md: 4, lg: 5 } 
//                 }}
//               >
//                 <Fade in={true} timeout={800}>
//                   <Box sx={{ width: '100%' }}>
//                     <Paper
//                       elevation={0}
//                       sx={{
//                         width: '100%',
//                         mb: 4,
//                         overflow: "hidden",
//                         position: "relative",
//                         borderRadius: 3,
//                         boxShadow: "0 10px 30px rgba(0, 0, 0, 0.08)",
//                       }}
//                     >
//                       <Box sx={{
//                         p: { xs: 2, md: 3 },
//                         background: 'linear-gradient(to right, #3f51b5, #5c6bc0)',
//                         color: 'white',
//                         borderTopLeftRadius: '1rem',
//                         borderTopRightRadius: '1rem',
//                         display: 'flex',
//                         flexDirection: 'column',
//                         alignItems: 'center'
//                       }}>
//                         <Box sx={{
//                           display: 'flex',
//                           alignItems: 'center',
//                           gap: 1
//                         }}>
//                           <SchoolIcon
//                             sx={{
//                               fontSize: 40,
//                               color: "white",
//                               mr: 0,
//                               p: 1,
//                               borderRadius: "50%",
//                               bgcolor: alpha(theme.palette.primary.main, 0.1),
//                             }}
//                           />
//                           <Typography variant="h5" fontWeight="bold">
//                             {id ? "Update Class" : "Create New Class"}
//                           </Typography>
//                         </Box>
//                         <Typography variant="body2" sx={{ opacity: 0.8, mt: 0.5, textAlign: 'center' }}>
//                           Fill in the details below to {id ? "update" : "create a new"} class.
//                         </Typography>
//                       </Box>

//                       <Box sx={{ py: 3, px: { xs: 2, sm: 3, md: 4 } }}>
//                         <Zoom in={true}>
//                           <Card
//                             sx={{
//                               mb: 4,
//                               width: '100%',
//                               position: "relative",
//                               border: "1px solid rgba(0,0,0,0.08)",
//                               overflow: "visible",
//                               borderRadius: 3,
//                               boxShadow: "0 5px 20px rgba(0, 0, 0, 0.05)",
//                             }}
//                           >
//                             <Box
//                               sx={{
//                                 position: "absolute",
//                                 top: -15,
//                                 left: 20,
//                                 bgcolor: "primary.main",
//                                 color: "white",
//                                 py: 0.5,
//                                 px: 2,
//                                 borderRadius: 4,
//                                 zIndex: 1,
//                                 boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
//                               }}
//                             >
//                               <Typography variant="subtitle2" fontWeight="bold">
//                                 Class Details
//                               </Typography>
//                             </Box>

//                             <CardContent sx={{ p: { xs: 2, sm: 3 }, pt: 6 }}>
//                               <Grid container spacing={2}>
//                                 <Grid item xs={12} md={6} sx={{ mt: { xs: 1, sm: 1, md: 0 } }}>
//                                   <CraftInputWithIcon
//                                     name="className"
//                                     fullWidth
//                                     label="Class Name"
//                                     variant="outlined"
//                                     placeholder="Enter class name"
//                                     required
//                                     InputProps={{
//                                       startAdornment: (
//                                         <ClassIcon
//                                           sx={{ color: "text.secondary", mr: 1, alignSelf: "flex-start", mt: 1.5 }}
//                                         />
//                                       ),
//                                     }}
//                                   />
//                                 </Grid>

//                                 <Grid item xs={12} md={6}>
//                                   <Grid container spacing={2}>
//                                     <Grid item xs={12} md={8}>
//                                       <CraftIntAutoCompleteWithIcon
//                                         name="sections"
//                                         label="Select Section"
//                                         options={sectionOption}
//                                         fullWidth
//                                         icon={<ClassIcon color="secondary" />}
//                                       />
//                                     </Grid>
//                                     <Grid item xs={12} md={4}>
//                                       <Box sx={{ 
//                                         display: "flex", 
//                                         alignItems: { xs: "flex-start", md: "center" }, 
//                                         mt: { xs: 0, md: 1 }
//                                       }}>
//                                         <AddSectionButton
//                                           variant="contained"
//                                           startIcon={<AddCircleIcon />}
//                                           onClick={handleOpenAddModal}
//                                           disableElevation
//                                         >
//                                           New Section
//                                         </AddSectionButton>

//                                         {showAddSectionHint && sectionOption.length < 3 && (
//                                           <Chip
//                                             label="Create sections for your class!"
//                                             color="info"
//                                             size="small"
//                                             sx={{
//                                               ml: 2,
//                                               animation: `${pulseAnimation} 2s infinite`,
//                                               fontWeight: 500,
//                                             }}
//                                           />
//                                         )}
//                                       </Box>
//                                     </Grid>
//                                   </Grid>
//                                 </Grid>
//                               </Grid>
//                             </CardContent>
//                           </Card>
//                         </Zoom>
//                         <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
//                           <Button
//                             variant="contained"
//                             color="primary"
//                             size="large"
//                             startIcon={isSuccess ? <CheckCircleOutlineIcon /> : <SaveIcon />}
//                             type="submit"
//                             sx={{
//                               px: 6,
//                               py: 1.5,
//                               fontSize: "1rem",
//                               minWidth: 200,
//                               position: "relative",
//                               overflow: "hidden",
//                               borderRadius: 3,
//                               boxShadow: "0 8px 20px rgba(63, 81, 181, 0.3)",
//                               "&:hover": {                                
//                                 transform: "translateY(-2px)",
//                               },
//                               transition: "all 0.3s ease",
//                             }}
//                           >
//                             {id ? "Update Class" : "Save Class"}
//                           </Button>
//                         </Box>
//                       </Box>
//                     </Paper>
//                   </Box>
//                 </Fade>
//               </Container>
//               <SectionModal open={addModalOpen} onClose={handleCloseAddModal} />
//             </Box>
//           </CraftForm>
//         </ThemeProvider>
//       )}
//     </>
//   )
// }