/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

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
  ThemeProvider,
} from "@mui/material";
import {
  Save as SaveIcon,
  School as SchoolIcon,
  Class as ClassIcon,
  CheckCircleOutline as CheckCircleOutlineIcon,
  AddCircle as AddCircleIcon,
} from "@mui/icons-material";
import CraftForm from "@/components/Forms/Form";
import CraftInputWithIcon from "@/components/Forms/inputWithIcon";
import CraftIntAutoCompleteWithIcon from "@/components/Forms/AutocompleteWithIcon";
import { theme } from "@/lib/Theme/Theme";
import toast from "react-hot-toast";
import {
  useCreateClassMutation,
  useGetSingleClassQuery,
  useUpdateClassMutation,
} from "@/redux/api/classApi";
import type { FieldValues } from "react-hook-form";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useGetAllSectionsQuery } from "@/redux/api/sectionApi";
import SectionModal from "./SectionModal";
import { LoadingState } from "@/components/common/LoadingState";

interface ClassProps {
  id: string;
}
export default function ClassForm({ id }: ClassProps) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();
  const { data: singleClass, isLoading } = useGetSingleClassQuery({ id });
  const [addModalOpen, setAddModalOpen] = useState(false);

  const [createClass, { isSuccess }] = useCreateClassMutation();
  const [updateClass] = useUpdateClassMutation();

  const { data: sectionData } = useGetAllSectionsQuery({
    limit: rowsPerPage,
    page: page + 1,
    searchTerm: searchTerm,
  });

  const sectionOption = useMemo(() => {
    if (!sectionData?.data?.sections) return [];
    return sectionData?.data?.sections.map((sub: any) => ({
      label: sub.name,
      value: sub._id,
    }));
  }, [sectionData]);

  const handleOpenAddModal = () => {
    setAddModalOpen(true);
  };

  const handleCloseAddModal = () => {
    setAddModalOpen(false);
  };

  const handleSubmit = async (data: FieldValues) => {
    const sectionsArray = Array.isArray(data.sections)
      ? data.sections
          .map((item: any) => {
            if (item && typeof item === "object" && "value" in item) {
              return item.value;
            }
            return null;
          })
          .filter(Boolean)
      : [];

    const modifyValues = {
      ...data,
      sections: sectionsArray,
    };

    try {
      let res;
      if (id) {
        res = await updateClass({ id, data: modifyValues }).unwrap();
        if (res?.success) {
          toast.success("Class updated successfully!");
          router.push("/dashboard/classes/class");
        }
      } else {
        res = await createClass(modifyValues).unwrap();
        if (res.success) {
          toast.success("Class created successfully!");
          router.push("/dashboard/classes/class");
        }
      }
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Failed to process class!"
      );
    }
  };

  const defaultValue = {
    className: singleClass?.data.className || "",
    sections: singleClass?.data.sections || [],
  };

  if (isLoading) {
    return <LoadingState />;
  }

  return (
    <ThemeProvider theme={theme}>
      <CraftForm onSubmit={handleSubmit} defaultValues={defaultValue}>
        <Box
          sx={{
            width: "100vw",
            minHeight: "100vh",
            display: "flex",

            backgroundColor: { md: "#f5f7fa" },
            py: 4,
          }}
        >
          <Box
            sx={{
              width: "100%",
              maxWidth: "1500px",
              px: { xs: 2, sm: 3, md: 4 },
            }}
          >
            <Fade in={true} timeout={800}>
              <Box>
                <Paper
                  elevation={0}
                  sx={{
                    width: "100%",
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
                      Fill in the details below to{" "}
                      {id ? "update" : "create a new"} class.
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
                                      sx={{
                                        color: "text.secondary",
                                        mr: 1,
                                        alignSelf: "flex-start",
                                        mt: 1.5,
                                      }}
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
                                  <Box
                                    sx={{
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "center",
                                      height: "100%",
                                      pt: { xs: 0, md: 1 },
                                    }}
                                  >
                                    <Button
                                      variant="contained"
                                      startIcon={<AddCircleIcon />}
                                      onClick={handleOpenAddModal}
                                      disableElevation
                                    >
                                      New Section
                                    </Button>
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
                        startIcon={
                          isSuccess ? <CheckCircleOutlineIcon /> : <SaveIcon />
                        }
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
  );
}
