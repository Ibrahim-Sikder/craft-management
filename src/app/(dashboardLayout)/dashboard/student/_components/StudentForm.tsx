/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import type React from "react";

import { LoadingState } from "@/components/common/LoadingState";
import CraftIntAutoCompleteWithIcon from "@/components/Forms/AutocompleteWithIcon";
import CraftForm from "@/components/Forms/Form";
import CraftInputWithIcon from "@/components/Forms/inputWithIcon";
import CraftSelectWithIcon from "@/components/Forms/selectWithIcon";
import FileUploadWithIcon from "@/components/Forms/Upload";
import { batches, bloodGroup } from "@/options";
import { useGetAllClassesQuery } from "@/redux/api/classApi";
import { useGetAllSectionsQuery } from "@/redux/api/sectionApi";
import { useGetAllSessionsQuery } from "@/redux/api/sessionApi";
import {
  useCreateStudentsMutation,
  useGetSingleStudentQuery,
  useUpdateStudentMutation,
} from "@/redux/api/studentApi";
import {
  Badge,
  Bloodtype,
  Cake,
  CalendarMonth,
  CheckCircle,
  Class,
  ContactPhone,
  Contacts,
  CreditCard,
  Description,
  DriveFileRenameOutline,
  Home,
  LocationOn,
  People,
  Person,
  Phone,
  Save,
  School,
} from "@mui/icons-material";
import {
  Alert,
  Box,
  Button,
  Card,
  Container,
  Divider,
  FormControlLabel,
  Grid,
  Paper,
  Snackbar,
  Switch,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { FieldValues } from "react-hook-form";
import toast from "react-hot-toast";

interface StudentFormProps {
  id?: string;
}

const StudentForm = ({ id }: StudentFormProps) => {
  const [createStudents] = useCreateStudentsMutation();
  const [updateStudent] = useUpdateStudentMutation();
  const { data, isLoading } = useGetSingleStudentQuery(
    { id },
    {
      skip: !id,
      refetchOnMountOrArgChange: true,
    }
  );

  const router = useRouter();

  const [formData, setFormData] = useState({
    sameAsPermanent: false,
    sendAdmissionSMS: false,
    sendAttendanceSMS: false,
  });

  const [defaultValues, setDefaultValues] = useState<any>({});

  useEffect(() => {
    if (data?.data) {
      const studentData = data.data;
      setFormData({
        sameAsPermanent: studentData.sameAsPermanent || false,
        sendAdmissionSMS: studentData.sendAdmissionSMS || false,
        sendAttendanceSMS: studentData.sendAttendanceSMS || false,
      });

      const formDefaultValues = {
        // Basic Information
        name: studentData.name || "",
        nameBangla: studentData.nameBangla || "",
        smartIdCard: studentData.smartIdCard || "",
        email: studentData.email || "",
        studentDepartment: studentData.studentDepartment || "",
        mobile: studentData.mobile || "",
        birthDate: studentData.birthDate || "",
        birthRegistrationNo: studentData.birthRegistrationNo || "",
        bloodGroup: studentData.bloodGroup || "",
        gender: studentData.gender || "",
        studentPhoto: studentData.studentPhoto || "",

        // Father Information
        fatherName: studentData.fatherName || "",
        fatherMobile: studentData.fatherMobile || "",
        fatherProfession: studentData.fatherProfession || "",

        // Mother Information
        motherName: studentData.motherName || "",
        motherMobile: studentData.motherMobile || "",
        motherProfession: studentData.motherProfession || "",

        // Guardian Information
        "guardianInfo.guardianName":
          studentData.guardianInfo?.guardianName || "",
        "guardianInfo.guardianMobile":
          studentData.guardianInfo?.guardianMobile || "",
        "guardianInfo.relation": studentData.guardianInfo?.relation || "",
        "guardianInfo.address": studentData.guardianInfo?.address || "",

        // Address Information
        "permanentAddress.village": studentData.permanentAddress?.village || "",
        "permanentAddress.postOffice":
          studentData.permanentAddress?.postOffice || "",
        "permanentAddress.postCode":
          studentData.permanentAddress?.postCode || "",
        "permanentAddress.policeStation":
          studentData.permanentAddress?.policeStation || "",
        "permanentAddress.district":
          studentData.permanentAddress?.district || "",

        "presentAddress.village": studentData.presentAddress?.village || "",
        "presentAddress.postOffice":
          studentData.presentAddress?.postOffice || "",
        "presentAddress.postCode": studentData.presentAddress?.postCode || "",
        "presentAddress.policeStation":
          studentData.presentAddress?.policeStation || "",
        "presentAddress.district": studentData.presentAddress?.district || "",

        // Academic Information
        className: studentData.className || [],
        studentClassRoll: studentData.studentClassRoll || "",
        batch: studentData.batch || "",
        section: studentData.section || [],
        activeSession: studentData.activeSession || [],
        status: studentData.status || "",
        studentType: studentData.studentType || "",
        additionalNote: studentData.additionalNote || "",
        previousDues: studentData.previousDues || 0,
      };

      setDefaultValues(formDefaultValues);
    }
  }, [data]);

  const [page] = useState(0);
  const [rowsPerPage] = useState(10);
  const [searchTerm] = useState("");

  const { data: classData } = useGetAllClassesQuery({
    limit: rowsPerPage,
    page: page + 1,
    searchTerm: searchTerm,
  });
  const { data: sectionData } = useGetAllSectionsQuery({
    limit: rowsPerPage,
    page: page + 1,
    searchTerm: searchTerm,
  });
  const { data: sessionData } = useGetAllSessionsQuery({
    limit: rowsPerPage,
    page: page + 1,
    searchTerm: searchTerm,
  });

  const classOption = useMemo(() => {
    if (!classData?.data?.classes) return [];
    return classData?.data?.classes.map((clg: any) => ({
      label: clg?.className,
      value: clg?._id,
    }));
  }, [classData]);

  const sectionOption = useMemo(() => {
    if (!sectionData?.data?.sections) return [];
    return sectionData?.data?.sections.map((sec: any) => ({
      label: sec.name,
      value: sec._id,
    }));
  }, [sectionData]);

  const sessionOption = useMemo(() => {
    if (!sessionData?.data?.sessions) return [];
    return sessionData?.data?.sessions.map((sec: any) => ({
      label: sec.sessionName,
      value: sec._id,
    }));
  }, [sessionData]);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error",
  });

  const handleSwitchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  const handleSubmit = async (data: FieldValues) => {
    // Validation
    if (!data.name) {
      toast.error("Student name is required!");
      return;
    }
    if (!data.studentDepartment) {
      toast.error("Student department is required!");
      return;
    }

    // Process arrays
    const classArray = Array.isArray(data.className)
      ? data.className.map((item: any) => item.value || item)
      : data.className
        ? [data.className]
        : [];

    const sectionArray = Array.isArray(data.section)
      ? data.section.map((item: any) => item.value || item)
      : data.section
        ? [data.section]
        : [];

    const sessionArray = Array.isArray(data.activeSession)
      ? data.activeSession.map((item: any) => item.value || item)
      : data.activeSession
        ? [data.activeSession]
        : [];

    // Build nested objects
    const guardianInfo = {
      guardianName: data["guardianInfo.guardianName"] || "",
      guardianMobile: data["guardianInfo.guardianMobile"] || "",
      relation: data["guardianInfo.relation"] || "",
      address: data["guardianInfo.address"] || "",
    };

    const permanentAddress = {
      village: data["permanentAddress.village"] || "",
      postOffice: data["permanentAddress.postOffice"] || "",
      postCode: data["permanentAddress.postCode"] || "",
      policeStation: data["permanentAddress.policeStation"] || "",
      district: data["permanentAddress.district"] || "",
    };

    let presentAddress = {
      village: data["presentAddress.village"] || "",
      postOffice: data["presentAddress.postOffice"] || "",
      postCode: data["presentAddress.postCode"] || "",
      policeStation: data["presentAddress.policeStation"] || "",
      district: data["presentAddress.district"] || "",
    };

    // Handle sameAsPermanent
    if (formData.sameAsPermanent) {
      presentAddress = { ...permanentAddress };
    }

    // Build submission data
    const submissionData = {
      name: data.name,
      nameBangla: data.nameBangla || "",
      smartIdCard: data.smartIdCard || "",
      email: data.email || "",
      studentDepartment: data.studentDepartment,
      mobile: data.mobile || "",
      birthDate: data.birthDate || "",
      birthRegistrationNo: data.birthRegistrationNo || "",
      bloodGroup: data.bloodGroup || "",
      gender: data.gender || "",
      studentPhoto: data.studentPhoto || "",

      // Father Information
      fatherName: data.fatherName || "",
      fatherMobile: data.fatherMobile || "",
      fatherProfession: data.fatherProfession || "",

      // Mother Information
      motherName: data.motherName || "",
      motherMobile: data.motherMobile || "",
      motherProfession: data.motherProfession || "",

      // Guardian Information
      guardianInfo,

      // Address Information
      permanentAddress,
      presentAddress,
      sameAsPermanent: formData.sameAsPermanent,

      // Academic Information
      className: classArray,
      studentClassRoll: data.studentClassRoll || "",
      batch: data.batch || "",
      section: sectionArray,
      activeSession: sessionArray,
      status: data.status || "",
      studentType: data.studentType || "",
      additionalNote: data.additionalNote || "",
    };

    console.log("Submission data:", submissionData);

    try {
      if (id) {
        const res = await updateStudent({
          id,
          data: submissionData,
        }).unwrap();
        if (res.success) {
          toast.success("Student updated successfully!");
          setTimeout(() => {
            router.push("/dashboard/student/list");
          }, 1500);
        }
      } else {
        const res = await createStudents(submissionData).unwrap();
        if (res.success) {
          toast.success("Student registered successfully!");
          setTimeout(() => {
            router.push("/dashboard/student/list");
          }, 1500);
        }
      }
    } catch (error: any) {
      console.error("Submission error:", error);
      toast.error(
        error.data?.message || "An error occurred while submitting the form"
      );
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({
      ...snackbar,
      open: false,
    });
  };

  if (isLoading) {
    return <LoadingState />;
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom, #f9f9f9, #f0f0f0)",
        pt: 2,
        pb: 8,
      }}
    >
      {/* Header */}
      <Box>
        <Container maxWidth="xl" sx={{ p: { xs: "4px" } }}>
          <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
            <Person sx={{ fontSize: 40, mr: 2 }} />
            <Typography variant="h4" component="h1" sx={{ fontWeight: 700 }}>
              {id ? "Edit Student" : "New Student Registration"}
            </Typography>
          </Box>
        </Container>
      </Box>

      <Container maxWidth="xl" sx={{ p: { xs: "4px" } }}>
        <CraftForm
          onSubmit={handleSubmit}
          defaultValues={defaultValues}
          key={
            Object.keys(defaultValues).length > 0
              ? "form-with-data"
              : "empty-form"
          }
        >
          <Paper
            elevation={3}
            sx={{
              borderRadius: 4,
              overflow: "hidden",
              boxShadow: "0 6px 18px rgba(0,0,0,0.06)",
              mb: 4,
            }}
          >
            <Box sx={{ p: { xs: 2, md: 4 } }}>
              {/* Personal Information Section */}
              <Box sx={{ mb: 4 }}>
                <Typography
                  variant="h5"
                  sx={{
                    mb: 3,
                    fontWeight: 600,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Person sx={{ mr: 2, color: "primary.main" }} />
                  Personal Information
                </Typography>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <CraftInputWithIcon
                      fullWidth
                      name="name"
                      label={
                        <span>
                          Student Name <span style={{ color: "red" }}>*</span>
                        </span>
                      }
                      placeholder="e.g., John Smith"
                      size="medium"
                      InputProps={{
                        startAdornment: (
                          <DriveFileRenameOutline
                            sx={{ color: "text.secondary", mr: 1 }}
                          />
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <CraftInputWithIcon
                      fullWidth
                      name="nameBangla"
                      label="Student Name (Bangla)"
                      placeholder="ছাত্রের নাম (বাংলা)"
                      size="medium"
                      InputProps={{
                        startAdornment: (
                          <DriveFileRenameOutline
                            sx={{ color: "text.secondary", mr: 1 }}
                          />
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <CraftSelectWithIcon
                      name="studentDepartment"
                      size="medium"
                      label={
                        <span>
                          Student Department{" "}
                          <span style={{ color: "red" }}>*</span>
                        </span>
                      }
                      placeholder="Student Department"
                      items={["hifz", "academic"]}
                      adornment={<Person color="action" />}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <CraftInputWithIcon
                      fullWidth
                      name="smartIdCard"
                      label="Smart ID Card"
                      placeholder="e.g., SMART-001"
                      size="medium"
                      InputProps={{
                        startAdornment: (
                          <Badge sx={{ color: "text.secondary", mr: 1 }} />
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <CraftSelectWithIcon
                      name="gender"
                      size="medium"
                      label="Gender"
                      placeholder="Select Gender"
                      items={["male", "female", "other"]}
                      adornment={<Person color="action" />}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <CraftInputWithIcon
                      fullWidth
                      name="mobile"
                      label="Mobile Number"
                      placeholder="e.g., +1 234 567 8900"
                      size="medium"
                      InputProps={{
                        startAdornment: (
                          <Phone sx={{ color: "text.secondary", mr: 1 }} />
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <CraftSelectWithIcon
                      name="bloodGroup"
                      size="medium"
                      label="Blood Group"
                      placeholder="Select blood group"
                      items={bloodGroup}
                      adornment={<Bloodtype color="action" />}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <CraftInputWithIcon
                      fullWidth
                      name="birthDate"
                      label="Birth Date"
                      type="date"
                      size="medium"
                      InputProps={{
                        startAdornment: (
                          <Cake sx={{ color: "text.secondary", mr: 1 }} />
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <CraftInputWithIcon
                      fullWidth
                      name="birthRegistrationNo"
                      label="Birth Registration No."
                      placeholder="Birth Registration Number"
                      size="medium"
                      InputProps={{
                        startAdornment: (
                          <CreditCard sx={{ color: "text.secondary", mr: 1 }} />
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <CraftInputWithIcon
                      fullWidth
                      name="email"
                      label="Email"
                      placeholder="e.g., example@gmail.com"
                      size="medium"
                      InputProps={{
                        startAdornment: (
                          <DriveFileRenameOutline
                            sx={{ color: "text.secondary", mr: 1 }}
                          />
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FileUploadWithIcon
                      name="studentPhoto"
                      label="Student Photo"
                    />
                  </Grid>
                </Grid>
              </Box>

              <Divider sx={{ my: 4 }} />

              {/* Family Information Section */}
              <Box sx={{ mb: 4 }}>
                <Typography
                  variant="h5"
                  sx={{
                    mb: 3,
                    fontWeight: 600,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <People sx={{ mr: 2, color: "primary.main" }} />
                  Family Information
                </Typography>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Typography
                      variant="subtitle1"
                      gutterBottom
                      sx={{ fontWeight: 500 }}
                    >
                      Father's Information
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <CraftInputWithIcon
                      fullWidth
                      name="fatherName"
                      label="Father's Name"
                      placeholder="Father's Name"
                      size="medium"
                      InputProps={{
                        startAdornment: (
                          <Person sx={{ color: "text.secondary", mr: 1 }} />
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <CraftInputWithIcon
                      fullWidth
                      name="fatherMobile"
                      label="Father's Mobile"
                      placeholder="Father's Mobile"
                      size="medium"
                      InputProps={{
                        startAdornment: (
                          <Phone sx={{ color: "text.secondary", mr: 1 }} />
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <CraftInputWithIcon
                      fullWidth
                      name="fatherProfession"
                      label="Father's Profession"
                      placeholder="Father's Profession"
                      size="medium"
                      InputProps={{
                        startAdornment: (
                          <Person sx={{ color: "text.secondary", mr: 1 }} />
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography
                      variant="subtitle1"
                      gutterBottom
                      sx={{ fontWeight: 500 }}
                    >
                      Mother's Information
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <CraftInputWithIcon
                      fullWidth
                      name="motherName"
                      label="Mother's Name"
                      placeholder="Mother's Name"
                      size="medium"
                      InputProps={{
                        startAdornment: (
                          <Person sx={{ color: "text.secondary", mr: 1 }} />
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <CraftInputWithIcon
                      fullWidth
                      name="motherMobile"
                      label="Mother's Mobile"
                      placeholder="Mother's Mobile"
                      size="medium"
                      InputProps={{
                        startAdornment: (
                          <Phone sx={{ color: "text.secondary", mr: 1 }} />
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <CraftInputWithIcon
                      fullWidth
                      name="motherProfession"
                      label="Mother's Profession"
                      placeholder="Mother's Profession"
                      size="medium"
                      InputProps={{
                        startAdornment: (
                          <Person sx={{ color: "text.secondary", mr: 1 }} />
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography
                      variant="subtitle1"
                      gutterBottom
                      sx={{ fontWeight: 500 }}
                    >
                      Guardian's Information
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <CraftInputWithIcon
                      fullWidth
                      name="guardianInfo.guardianName"
                      label="Guardian's Name"
                      placeholder="Guardian's Name"
                      size="medium"
                      InputProps={{
                        startAdornment: (
                          <Contacts sx={{ color: "text.secondary", mr: 1 }} />
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <CraftInputWithIcon
                      fullWidth
                      name="guardianInfo.guardianMobile"
                      label="Guardian's Mobile"
                      placeholder="Guardian's Mobile"
                      size="medium"
                      InputProps={{
                        startAdornment: (
                          <ContactPhone
                            sx={{ color: "text.secondary", mr: 1 }}
                          />
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <CraftInputWithIcon
                      fullWidth
                      name="guardianInfo.relation"
                      label="Relation with Guardian"
                      placeholder="e.g., Father, Mother, Uncle"
                      size="medium"
                      InputProps={{
                        startAdornment: (
                          <People sx={{ color: "text.secondary", mr: 1 }} />
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <CraftInputWithIcon
                      fullWidth
                      name="guardianInfo.address"
                      label="Guardian's Address"
                      placeholder="Guardian's Address"
                      size="medium"
                      InputProps={{
                        startAdornment: (
                          <LocationOn sx={{ color: "text.secondary", mr: 1 }} />
                        ),
                      }}
                    />
                  </Grid>
                </Grid>
              </Box>

              <Divider sx={{ my: 4 }} />

              {/* Address Information Section */}
              <Box sx={{ mb: 4 }}>
                <Typography
                  variant="h5"
                  sx={{
                    mb: 3,
                    fontWeight: 600,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Home sx={{ mr: 2, color: "primary.main" }} />
                  Address Information
                </Typography>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <Typography
                      variant="subtitle1"
                      gutterBottom
                      sx={{ fontWeight: 500 }}
                    >
                      Permanent Address
                    </Typography>
                    <Card variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <CraftInputWithIcon
                            fullWidth
                            label="Village"
                            name="permanentAddress.village"
                            placeholder="Village"
                            size="medium"
                            InputProps={{
                              startAdornment: (
                                <LocationOn
                                  sx={{ color: "text.secondary", mr: 1 }}
                                />
                              ),
                            }}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <CraftInputWithIcon
                            fullWidth
                            name="permanentAddress.postOffice"
                            label="Post Office"
                            placeholder="Post Office"
                            size="medium"
                            InputProps={{
                              startAdornment: (
                                <LocationOn
                                  sx={{ color: "text.secondary", mr: 1 }}
                                />
                              ),
                            }}
                          />
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <CraftInputWithIcon
                            fullWidth
                            name="permanentAddress.postCode"
                            label="Post Code"
                            placeholder="Post Code"
                            size="medium"
                            InputProps={{
                              startAdornment: (
                                <LocationOn
                                  sx={{ color: "text.secondary", mr: 1 }}
                                />
                              ),
                            }}
                          />
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <CraftInputWithIcon
                            fullWidth
                            name="permanentAddress.policeStation"
                            label="Police Station"
                            placeholder="Police Station"
                            size="medium"
                            InputProps={{
                              startAdornment: (
                                <LocationOn
                                  sx={{ color: "text.secondary", mr: 1 }}
                                />
                              ),
                            }}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <CraftInputWithIcon
                            fullWidth
                            name="permanentAddress.district"
                            label="District"
                            placeholder="District"
                            size="medium"
                            InputProps={{
                              startAdornment: (
                                <LocationOn
                                  sx={{ color: "text.secondary", mr: 1 }}
                                />
                              ),
                            }}
                          />
                        </Grid>
                      </Grid>
                    </Card>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mb: 1,
                      }}
                    >
                      <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                        Present Address
                      </Typography>
                      <FormControlLabel
                        control={
                          <Switch
                            name="sameAsPermanent"
                            checked={formData.sameAsPermanent || false}
                            onChange={handleSwitchChange}
                            color="primary"
                          />
                        }
                        label="Same as Permanent"
                      />
                    </Box>
                    <Card
                      variant="outlined"
                      sx={{
                        p: 2,
                        borderRadius: 2,
                        opacity: formData.sameAsPermanent ? 0.7 : 1,
                      }}
                    >
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <CraftInputWithIcon
                            fullWidth
                            name="presentAddress.village"
                            label="Village"
                            placeholder="Village"
                            size="medium"
                            disabled={formData.sameAsPermanent}
                            InputProps={{
                              startAdornment: (
                                <LocationOn
                                  sx={{ color: "text.secondary", mr: 1 }}
                                />
                              ),
                            }}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <CraftInputWithIcon
                            fullWidth
                            name="presentAddress.postOffice"
                            label="Post Office"
                            placeholder="Post Office"
                            size="medium"
                            disabled={formData.sameAsPermanent}
                            InputProps={{
                              startAdornment: (
                                <LocationOn
                                  sx={{ color: "text.secondary", mr: 1 }}
                                />
                              ),
                            }}
                          />
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <CraftInputWithIcon
                            fullWidth
                            name="presentAddress.postCode"
                            label="Post Code"
                            placeholder="Post Code"
                            size="medium"
                            disabled={formData.sameAsPermanent}
                            InputProps={{
                              startAdornment: (
                                <LocationOn
                                  sx={{ color: "text.secondary", mr: 1 }}
                                />
                              ),
                            }}
                          />
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <CraftInputWithIcon
                            fullWidth
                            name="presentAddress.policeStation"
                            label="Police Station"
                            placeholder="Police Station"
                            size="medium"
                            disabled={formData.sameAsPermanent}
                            InputProps={{
                              startAdornment: (
                                <LocationOn
                                  sx={{ color: "text.secondary", mr: 1 }}
                                />
                              ),
                            }}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <CraftInputWithIcon
                            fullWidth
                            name="presentAddress.district"
                            label="District"
                            placeholder="District"
                            size="medium"
                            disabled={formData.sameAsPermanent}
                            InputProps={{
                              startAdornment: (
                                <LocationOn
                                  sx={{ color: "text.secondary", mr: 1 }}
                                />
                              ),
                            }}
                          />
                        </Grid>
                      </Grid>
                    </Card>
                  </Grid>
                </Grid>
              </Box>

              <Divider sx={{ my: 4 }} />

              {/* Academic Information Section */}
              <Box sx={{ mb: 4 }}>
                <Typography
                  variant="h5"
                  sx={{
                    mb: 3,
                    fontWeight: 600,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <School sx={{ mr: 2, color: "primary.main" }} />
                  Academic Information
                </Typography>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <CraftIntAutoCompleteWithIcon
                      name="className"
                      label="Class"
                      placeholder="Select Class"
                      options={classOption}
                      fullWidth
                      multiple
                      icon={<Class color="primary" />}
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <CraftInputWithIcon
                      fullWidth
                      name="studentClassRoll"
                      label="Class Roll"
                      placeholder="Class Roll"
                      size="medium"
                      InputProps={{
                        startAdornment: (
                          <Badge sx={{ color: "text.secondary", mr: 1 }} />
                        ),
                      }}
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <CraftSelectWithIcon
                      name="batch"
                      size="medium"
                      label="Batch"
                      placeholder="Select Batch"
                      items={batches}
                      adornment={<People color="action" />}
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <CraftIntAutoCompleteWithIcon
                      name="section"
                      size="medium"
                      placeholder="Select Section"
                      label="Section"
                      options={sectionOption}
                      fullWidth
                      multiple
                      icon={<Class color="primary" />}
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <CraftIntAutoCompleteWithIcon
                      name="activeSession"
                      size="medium"
                      placeholder="Select Active Session"
                      options={sessionOption}
                      label="Active Session"
                      fullWidth
                      multiple
                      icon={<CalendarMonth color="primary" />}
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <CraftSelectWithIcon
                      name="status"
                      size="medium"
                      label="Status"
                      placeholder="Select Status"
                      items={["Active", "Inactive", "Graduated"]}
                      adornment={<CheckCircle color="action" />}
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <CraftSelectWithIcon
                      name="studentType"
                      size="medium"
                      label="Student Type"
                      placeholder="Select Student Type"
                      items={["Residential", "Non-residential", "Day-care"]}
                      adornment={<Person color="action" />}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <CraftInputWithIcon
                      fullWidth
                      name="additionalNote"
                      label="Additional Notes"
                      placeholder="Additional Notes"
                      size="medium"
                      multiline
                      rows={3}
                      InputProps={{
                        startAdornment: (
                          <Description
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
                </Grid>
              </Box>

              <Divider sx={{ my: 4 }} />

              {/* Form Actions */}
              <Box
                sx={{
                  mt: 4,
                  display: "flex",
                  gap: 2,
                  justifyContent: "flex-end",
                }}
              >
                <Button
                  variant="contained"
                  type="submit"
                  startIcon={<Save />}
                  sx={{
                    borderRadius: 100,
                    background:
                      "linear-gradient(135deg, #1976d2 0%, #2196f3 100%)",
                    boxShadow: "0 4px 10px rgba(33, 150, 243, 0.3)",
                    px: 3,
                  }}
                >
                  {id ? "Update Student" : "Register Student"}
                </Button>
              </Box>
            </Box>
          </Paper>
        </CraftForm>
      </Container>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default StudentForm;
