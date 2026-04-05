/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import type React from "react";

import CraftDatePicker from "@/components/Forms/DatePicker";
import CraftForm from "@/components/Forms/Form";
import CraftInputWithIcon from "@/components/Forms/inputWithIcon";
import MultiFileUploadController from "@/components/Forms/multiFileUploadController";
import CraftSelectWithIcon from "@/components/Forms/selectWithIcon";
import {
  bloodGroup,
  departments,
  designations,
  genders,
  languages,
  maritalStatuses,
  staffTypes,
  statusOptions,
} from "@/options";
import {
  useCreateTeacherMutation,
  useGetSingleTeacherQuery,
  useUpdateTeacherMutation,
} from "@/redux/api/teacherApi";
import {
  Add,
  Apartment,
  ArrowBack,
  AttachMoney,
  Badge,
  Bloodtype,
  BusinessCenter,
  CalendarMonth,
  CardMembership,
  CheckCircle,
  Clear,
  ContactPhone,
  DriveFileRenameOutline,
  Email,
  Group,
  Home,
  Language,
  LocationOn,
  Person,
  Phone,
  Save,
  School,
  VerifiedUser,
  Wc,
  Work,
} from "@mui/icons-material";
import {
  Alert,
  alpha,
  Backdrop,
  Box,
  Button,
  Card,
  CircularProgress,
  Container,
  Divider,
  FormControlLabel,
  Grid,
  IconButton,
  Paper,
  Snackbar,
  Switch,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface TeacherFormProps {
  id?: string;
}

interface FileWithPreview extends File {
  preview?: string;
}

export default function TeacherForm({ id }: TeacherFormProps = {}) {
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  // Responsive column settings
  const getGridSize = () => {
    if (isMobile) return 12;
    if (isTablet) return 6;
    return 3; // 4 columns on desktop (12/3 = 4)
  };

  const gridSize = getGridSize();

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error",
  });

  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [defaultValues, setDefaultValues] = useState<any>({});

  const [profileImages] = useState<FileWithPreview[]>([]);
  const [cvFiles] = useState<File[]>([]);
  const [certificateFiles] = useState<File[]>([]);
  const [nidFiles] = useState<File[]>([]);

  const [createTeacher] = useCreateTeacherMutation();
  const [updateTeacher] = useUpdateTeacherMutation({});
  const { data: singlesTeacher, isLoading } = useGetSingleTeacherQuery(
    { id },
    {
      skip: !id,
      refetchOnMountOrArgChange: true,
    },
  );

  useEffect(() => {
    if (singlesTeacher && singlesTeacher.data) {
      const teacher = singlesTeacher.data;
      if (teacher.professionalInfo?.subjectsTaught) {
        setSelectedSubjects(teacher.professionalInfo.subjectsTaught);
      }

      const formDefaultValues = {
        teacherId: teacher.teacherId || "",
        teacherSerial: teacher.teacherSerial || "",
        smartIdCard: teacher.smartIdCard || "",
        name: teacher.name || "",
        englishName: teacher.englishName || "",
        phone: teacher.phone || "",
        email: teacher.email || "",
        dateOfBirth: teacher.dateOfBirth || "",
        bloodGroup: teacher.bloodGroup || "",
        gender: teacher.gender || "",
        nationality: teacher.nationality || "",
        religion: teacher.religion || "",
        maritalStatus: teacher.maritalStatus || "",
        address: teacher.permanentAddress?.address || "",
        village: teacher.permanentAddress?.village || "",
        postOffice: teacher.permanentAddress?.postOffice || "",
        thana: teacher.permanentAddress?.thana || "",
        district: teacher.permanentAddress?.district || "",
        state: teacher.permanentAddress?.state || "",
        country: teacher.permanentAddress?.country || "",
        zipCode: teacher.permanentAddress?.zipCode || "",
        sameAsPermanent: teacher.currentAddress?.sameAsPermanent || false,
        currentAddress: {
          address: teacher.currentAddress?.address || "",
          village: teacher.currentAddress?.village || "",
          postOffice: teacher.currentAddress?.postOffice || "",
          thana: teacher.currentAddress?.thana || "",
          district: teacher.currentAddress?.district || "",
          state: teacher.currentAddress?.state || "",
          country: teacher.currentAddress?.country || "",
          zipCode: teacher.currentAddress?.zipCode || "",
        },
        designation: teacher.designation || "",
        department: teacher.department || "",
        joiningDate: teacher.joiningDate || "",
        monthlySalary: teacher.monthlySalary || "",
        staffType: teacher.staffType || "",
        residenceType: teacher.residenceType || "",
        accountName: teacher.bankDetails?.accountName || "",
        accountNumber: teacher.bankDetails?.accountNumber || "",
        bankName: teacher.bankDetails?.bankName || "",
        branchName: teacher.bankDetails?.branchName || "",
        ifscCode: teacher.bankDetails?.ifscCode || "",
        status: teacher.status || "Active",
        language: teacher.language || "",
        activeSession: teacher.activeSession || "",
        teacherDepartment: teacher.teacherDepartment || "",
        teacherPhoto: teacher.teacherPhoto,
        resumeDoc: teacher.resumeDoc,
        certificateDoc: teacher.certificateDoc,
        nationalIdDoc: teacher.nationalIdDoc,
        degree: teacher.educationalQualifications?.[0]?.degree || "",
        institution: teacher.educationalQualifications?.[0]?.institution || "",
        specialization:
          teacher.educationalQualifications?.[0]?.specialization || "",
        year: teacher.educationalQualifications?.[0]?.year || "",
        certificateName: teacher.certifications?.[0]?.name || "",
        issuedBy: teacher.certifications?.[0]?.issuedBy || "",
        certificateYear: teacher.certifications?.[0]?.year || "",
        certificateDescription: teacher.certifications?.[0]?.description || "",
        organization: teacher.workExperience?.[0]?.organization || "",
        position: teacher.workExperience?.[0]?.position || "",
        from: teacher.workExperience?.[0]?.from || "",
        to: teacher.workExperience?.[0]?.to || "",
        description: teacher.workExperience?.[0]?.description || "",
        "emergencyContact.name": teacher.emergencyContact?.name || "",
        "emergencyContact.relation": teacher.emergencyContact?.relation || "",
        "emergencyContact.phone": teacher.emergencyContact?.phone || "",
        "socialMedia.facebook": teacher.socialMedia?.facebook || "",
        "socialMedia.twitter": teacher.socialMedia?.twitter || "",
        "socialMedia.youtube": teacher.socialMedia?.youtube || "",
        "socialMedia.linkedin": teacher.socialMedia?.linkedin || "",
        "socialMedia.instagram": teacher.socialMedia?.instagram || "",
      };
      setDefaultValues(formDefaultValues);
    }
  }, [singlesTeacher]);

  const handleSwitchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      const addressInput = document.querySelector(
        '[name="address"]',
      ) as HTMLInputElement;
      const villageInput = document.querySelector(
        '[name="village"]',
      ) as HTMLInputElement;
      const postOfficeInput = document.querySelector(
        '[name="postOffice"]',
      ) as HTMLInputElement;
      const thanaInput = document.querySelector(
        '[name="thana"]',
      ) as HTMLInputElement;
      const districtInput = document.querySelector(
        '[name="district"]',
      ) as HTMLInputElement;
      const stateInput = document.querySelector(
        '[name="state"]',
      ) as HTMLInputElement;
      const countryInput = document.querySelector(
        '[name="country"]',
      ) as HTMLInputElement;
      const zipCodeInput = document.querySelector(
        '[name="zipCode"]',
      ) as HTMLInputElement;

      const currentAddressFields = {
        address: addressInput?.value || "",
        village: villageInput?.value || "",
        postOffice: postOfficeInput?.value || "",
        thana: thanaInput?.value || "",
        district: districtInput?.value || "",
        state: stateInput?.value || "",
        country: countryInput?.value || "",
        zipCode: zipCodeInput?.value || "",
      };

      // Update current address fields if they exist
      const currentAddressInputs = document.querySelectorAll(
        '[name^="currentAddress."]',
      );
      if (currentAddressInputs.length > 0) {
        currentAddressInputs.forEach((input: any) => {
          const fieldName = input.name.replace("currentAddress.", "");
          if (
            currentAddressFields[fieldName as keyof typeof currentAddressFields]
          ) {
            input.value =
              currentAddressFields[
                fieldName as keyof typeof currentAddressFields
              ];
            // Trigger React state update if needed
            const event = new Event("input", { bubbles: true });
            input.dispatchEvent(event);
          }
        });
      }
    }
  };

  const handleSubmit = async (data: any) => {
    setIsSubmitting(true);

    if (!data.name) {
      toast.error("Teacher name is required!");
      setIsSubmitting(false);
      return;
    }
    if (!data.phone) {
      toast.error("Phone number is required!");
      setIsSubmitting(false);
      return;
    }
    if (!data.email) {
      toast.error("Email is required!");
      setIsSubmitting(false);
      return;
    }

    try {
      const monthlySalaryNum = data.monthlySalary
        ? Number(data.monthlySalary)
        : undefined;
      const teacherSerialNum = data.teacherSerial
        ? Number(data.teacherSerial)
        : undefined;

      const submissionData = {
        teacherId: data.teacherId,
        teacherSerial: teacherSerialNum,
        smartIdCard: data.smartIdCard,
        name: data.name,
        englishName: data.englishName,
        phone: data.phone,
        email: data.email,
        dateOfBirth: data.dateOfBirth,
        bloodGroup: data.bloodGroup,
        gender: data.gender,
        nationality: data.nationality,
        religion: data.religion,
        maritalStatus: data.maritalStatus,
        teacherPhoto: data.teacherPhoto,
        resumeDoc: data.resumeDoc,
        certificateDoc: data.certificateDoc,
        nationalIdDoc: data.nationalIdDoc,
        teacherDepartment: data.teacherDepartment,

        permanentAddress: {
          address: data.address,
          village: data.village,
          postOffice: data.postOffice,
          thana: data.thana,
          district: data.district,
          state: data.state,
          country: data.country,
          zipCode: data.zipCode,
        },

        currentAddress: data.sameAsPermanent
          ? {
              address: data.address,
              village: data.village,
              postOffice: data.postOffice,
              thana: data.thana,
              district: data.district,
              state: data.state,
              country: data.country,
              zipCode: data.zipCode,
            }
          : {
              address: data.currentAddress?.address || "",
              village: data.currentAddress?.village || "",
              postOffice: data.currentAddress?.postOffice || "",
              thana: data.currentAddress?.thana || "",
              district: data.currentAddress?.district || "",
              state: data.currentAddress?.state || "",
              country: data.currentAddress?.country || "",
              zipCode: data.currentAddress?.zipCode || "",
            },

        sameAsPermanent: data.sameAsPermanent || false,
        designation: data.designation,
        department: data.department,
        joiningDate: data.joiningDate,
        monthlySalary: monthlySalaryNum,
        staffType: data.staffType,

        educationalQualifications: data.degree
          ? [
              {
                degree: data.degree,
                institution: data.institution,
                year: data.year,
                specialization: data.specialization,
              },
            ]
          : [],

        certifications: data.certificateName
          ? [
              {
                name: data.certificateName,
                issuedBy: data.issuedBy,
                year: data.certificateYear,
                description: data.certificateDescription,
              },
            ]
          : [],

        workExperience: data.organization
          ? [
              {
                organization: data.organization,
                position: data.position,
                from: data.from,
                to: data.to,
                description: data.description,
              },
            ]
          : [],

        status: data.status || "Active",
        language: data.language,
        activeSession: data.activeSession,
      };

      if (id) {
        const res = await updateTeacher({ id, data: submissionData }).unwrap();
        if (res.success) {
          setSuccess(true);
          setSnackbar({
            open: true,
            message: "Teacher updated successfully!",
            severity: "success",
          });
          setTimeout(() => {
            router.push("/dashboard/teacher/list");
          }, 2000);
        }
      } else {
        const res = await createTeacher(submissionData).unwrap();
        if (res.success) {
          setSuccess(true);
          setSnackbar({
            open: true,
            message: "Teacher registered successfully!",
            severity: "success",
          });
          setTimeout(() => {
            router.push("/dashboard/teacher/list");
          }, 2000);
        }
      }
    } catch (error: any) {
      console.error("Submission error:", error);
      toast.error(
        error.data?.message || "Failed to process teacher information",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
        <Typography variant="h6" sx={{ ml: 2 }}>
          Loading...
        </Typography>
      </Box>
    );
  }

  // Responsive typography sizes
  const sectionTitleSx = {
    fontWeight: 600,
    mb: 3,
    color: "#4F0187",
    fontSize: { xs: "1.25rem", sm: "1.5rem", md: "1.75rem" },
  };

  const subtitleSx = {
    fontWeight: 500,
    fontSize: { xs: "0.9rem", sm: "1rem", md: "1.1rem" },
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom, #f9f9f9, #f0f0f0)",
        pt: { xs: 1, sm: 2 },
        pb: { xs: 4, sm: 8 },
      }}
    >
      {/* Header */}
      <Box
        sx={{
          background: "linear-gradient(135deg, #4F0187 0%, #4F0187 100%)",
          color: "white",
          py: { xs: 2, sm: 3 },
          mb: { xs: 2, sm: 4 },
          borderRadius: { xs: 0, md: "0 0 20px 20px" },
          boxShadow: "0 4px 20px rgba(79, 1, 135, 0.4)",
        }}
      >
        <Container maxWidth="xl" sx={{ p: { xs: "8px", sm: "16px" } }}>
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <Person sx={{ fontSize: { xs: 30, sm: 40 }, mr: 2 }} />
            <Typography
              variant="h4"
              component="h1"
              sx={{
                fontWeight: 700,
                fontSize: { xs: "1.5rem", sm: "1.75rem", md: "2rem" },
              }}
            >
              {id ? "Edit Teacher" : "New Teacher Registration"}
            </Typography>
          </Box>
        </Container>
      </Box>

      <Container maxWidth="xl" sx={{ p: { xs: "8px", sm: "16px" } }}>
        <Box sx={{ mb: 3 }}>
          <Link href="/dashboard/teacher/list" passHref>
            <Button
              startIcon={<ArrowBack />}
              variant="outlined"
              sx={{
                borderRadius: 100,
                borderColor: "rgba(0,0,0,0.12)",
                color: "text.secondary",
                px: { xs: 2, sm: 3 },
                py: { xs: 0.5, sm: 0.75 },
                fontSize: { xs: "0.75rem", sm: "0.875rem" },
              }}
            >
              Back to Teacher List
            </Button>
          </Link>
        </Box>

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
              borderRadius: { xs: 2, sm: 3, md: 4 },
              overflow: "hidden",
              boxShadow: "0 6px 18px rgba(0,0,0,0.06)",
              mb: 4,
            }}
          >
            <Box sx={{ p: { xs: 1.5, sm: 2, md: 4 } }}>
              {/* Section 1: Basic Information */}
              <Typography variant="h5" sx={sectionTitleSx}>
                Basic Information
              </Typography>
              <Divider sx={{ mb: 3 }} />
              <Grid container spacing={{ xs: 1.5, sm: 2, md: 3 }}>
                <Grid item xs={12} sm={6} md={gridSize}>
                  <CraftInputWithIcon
                    fullWidth
                    label={
                      <span>
                        Full Name <span style={{ color: "red" }}>*</span>
                      </span>
                    }
                    name="name"
                    size="small"
                    InputProps={{
                      startAdornment: (
                        <DriveFileRenameOutline
                          sx={{
                            color: "text.secondary",
                            mr: 1,
                            fontSize: { xs: 18, sm: 20 },
                          }}
                        />
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={gridSize}>
                  <CraftInputWithIcon
                    fullWidth
                    label="English Name"
                    name="englishName"
                    size="small"
                    InputProps={{
                      startAdornment: (
                        <DriveFileRenameOutline
                          sx={{
                            color: "text.secondary",
                            mr: 1,
                            fontSize: { xs: 18, sm: 20 },
                          }}
                        />
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={gridSize}>
                  <CraftSelectWithIcon
                    name="teacherDepartment"
                    size="small"
                    label="Teacher Department"
                    placeholder="Select Department"
                    items={["Hifz Teacher", "School Teacher"]}
                    adornment={<Apartment color="action" />}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={gridSize}>
                  <CraftInputWithIcon
                    fullWidth
                    label="Teacher Serial"
                    name="teacherSerial"
                    type="number"
                    size="small"
                    InputProps={{
                      startAdornment: (
                        <Badge sx={{ color: "text.secondary", mr: 1 }} />
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={gridSize}>
                  <CraftInputWithIcon
                    fullWidth
                    label="Smart ID Card"
                    name="smartIdCard"
                    size="small"
                    InputProps={{
                      startAdornment: (
                        <CardMembership
                          sx={{ color: "text.secondary", mr: 1 }}
                        />
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={gridSize}>
                  <CraftInputWithIcon
                    fullWidth
                    label={
                      <span>
                        Phone Number <span style={{ color: "red" }}>*</span>
                      </span>
                    }
                    name="phone"
                    size="small"
                    InputProps={{
                      startAdornment: (
                        <Phone sx={{ color: "text.secondary", mr: 1 }} />
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={gridSize}>
                  <CraftInputWithIcon
                    fullWidth
                    label={
                      <span>
                        Email Address <span style={{ color: "red" }}>*</span>
                      </span>
                    }
                    name="email"
                    type="email"
                    size="small"
                    InputProps={{
                      startAdornment: (
                        <Email sx={{ color: "text.secondary", mr: 1 }} />
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={gridSize}>
                  <CraftDatePicker
                    fullWidth
                    label="Date of Birth"
                    name="dateOfBirth"
                    size="small"
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={gridSize}>
                  <CraftSelectWithIcon
                    name="bloodGroup"
                    size="small"
                    label="Blood Group"
                    placeholder="Select blood group"
                    items={bloodGroup}
                    adornment={<Bloodtype color="action" />}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={gridSize}>
                  <CraftSelectWithIcon
                    name="gender"
                    size="small"
                    label="Gender"
                    placeholder="Select Gender"
                    items={genders}
                    adornment={<Wc color="action" />}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={gridSize}>
                  <CraftInputWithIcon
                    fullWidth
                    label="Nationality"
                    name="nationality"
                    size="small"
                    InputProps={{
                      startAdornment: (
                        <Language sx={{ color: "text.secondary", mr: 1 }} />
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={gridSize}>
                  <CraftInputWithIcon
                    fullWidth
                    label="Religion"
                    name="religion"
                    size="small"
                    InputProps={{
                      startAdornment: (
                        <VerifiedUser sx={{ color: "text.secondary", mr: 1 }} />
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={gridSize}>
                  <CraftSelectWithIcon
                    name="maritalStatus"
                    size="small"
                    label="Marital Status"
                    placeholder="Select Marital Status"
                    items={maritalStatuses}
                    adornment={<Group color="action" />}
                  />
                </Grid>
              </Grid>

              {/* Section 2: Documents */}
              <Typography
                variant="h5"
                sx={{ ...sectionTitleSx, mt: { xs: 3, sm: 4, md: 5 } }}
              >
                Documents & Files
              </Typography>
              <Divider sx={{ mb: 3 }} />
              <Grid container spacing={{ xs: 1.5, sm: 2, md: 3 }}>
                <Grid item xs={12} sm={6} md={6}>
                  <MultiFileUploadController
                    name="teacherPhoto"
                    label="Profile Images"
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <MultiFileUploadController
                    name="resumeDoc"
                    label="CV / Resume"
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <MultiFileUploadController
                    name="certificateDoc"
                    label="Certificates"
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <MultiFileUploadController
                    name="nationalIdDoc"
                    label="National ID"
                  />
                </Grid>
              </Grid>

              {/* Section 3: Address Information */}
              <Typography
                variant="h5"
                sx={{ ...sectionTitleSx, mt: { xs: 3, sm: 4, md: 5 } }}
              >
                Address Information
              </Typography>
              <Divider sx={{ mb: 3 }} />
              <Grid container spacing={{ xs: 1.5, sm: 2, md: 3 }}>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle1" gutterBottom sx={subtitleSx}>
                    Permanent Address
                  </Typography>
                  <Card
                    variant="outlined"
                    sx={{ p: { xs: 1.5, sm: 2 }, borderRadius: 2 }}
                  >
                    <Grid container spacing={{ xs: 1, sm: 1.5, md: 2 }}>
                      <Grid item xs={12}>
                        <CraftInputWithIcon
                          fullWidth
                          label="Address Line"
                          name="address"
                          size="small"
                          multiline
                          rows={2}
                          InputProps={{
                            startAdornment: (
                              <LocationOn
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
                      <Grid item xs={12} sm={6}>
                        <CraftInputWithIcon
                          fullWidth
                          label="Village/Area"
                          name="village"
                          size="small"
                          InputProps={{
                            startAdornment: (
                              <LocationOn
                                sx={{ color: "text.secondary", mr: 1 }}
                              />
                            ),
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <CraftInputWithIcon
                          fullWidth
                          label="Post Office"
                          name="postOffice"
                          size="small"
                          InputProps={{
                            startAdornment: (
                              <LocationOn
                                sx={{ color: "text.secondary", mr: 1 }}
                              />
                            ),
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <CraftInputWithIcon
                          fullWidth
                          label="Thana/Police Station"
                          name="thana"
                          size="small"
                          InputProps={{
                            startAdornment: (
                              <LocationOn
                                sx={{ color: "text.secondary", mr: 1 }}
                              />
                            ),
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <CraftInputWithIcon
                          fullWidth
                          label="District"
                          name="district"
                          size="small"
                          InputProps={{
                            startAdornment: (
                              <LocationOn
                                sx={{ color: "text.secondary", mr: 1 }}
                              />
                            ),
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <CraftInputWithIcon
                          fullWidth
                          label="State/Province"
                          name="state"
                          size="small"
                          InputProps={{
                            startAdornment: (
                              <LocationOn
                                sx={{ color: "text.secondary", mr: 1 }}
                              />
                            ),
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <CraftInputWithIcon
                          fullWidth
                          label="Country"
                          name="country"
                          size="small"
                          InputProps={{
                            startAdornment: (
                              <Language
                                sx={{ color: "text.secondary", mr: 1 }}
                              />
                            ),
                          }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <CraftInputWithIcon
                          fullWidth
                          label="Zip/Postal Code"
                          name="zipCode"
                          size="small"
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
                      flexWrap: "wrap",
                      gap: 1,
                    }}
                  >
                    <Typography variant="subtitle1" sx={subtitleSx}>
                      Present Address
                    </Typography>
                    <FormControlLabel
                      control={
                        <Switch
                          name="sameAsPermanent"
                          onChange={handleSwitchChange}
                          color="primary"
                          size={isMobile ? "small" : "medium"}
                        />
                      }
                      label="Same as Permanent"
                      sx={{
                        "& .MuiFormControlLabel-label": {
                          fontSize: { xs: "0.75rem", sm: "0.875rem" },
                        },
                      }}
                    />
                  </Box>
                  <Card
                    variant="outlined"
                    sx={{ p: { xs: 1.5, sm: 2 }, borderRadius: 2 }}
                  >
                    <Grid container spacing={{ xs: 1, sm: 1.5, md: 2 }}>
                      <Grid item xs={12}>
                        <CraftInputWithIcon
                          fullWidth
                          label="Address Line"
                          name="currentAddress.address"
                          size="small"
                          multiline
                          rows={2}
                          InputProps={{
                            startAdornment: (
                              <LocationOn
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
                      <Grid item xs={12} sm={6}>
                        <CraftInputWithIcon
                          fullWidth
                          label="Village/Area"
                          name="currentAddress.village"
                          size="small"
                          InputProps={{
                            startAdornment: (
                              <LocationOn
                                sx={{ color: "text.secondary", mr: 1 }}
                              />
                            ),
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <CraftInputWithIcon
                          fullWidth
                          label="Post Office"
                          name="currentAddress.postOffice"
                          size="small"
                          InputProps={{
                            startAdornment: (
                              <LocationOn
                                sx={{ color: "text.secondary", mr: 1 }}
                              />
                            ),
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <CraftInputWithIcon
                          fullWidth
                          label="Thana/Police Station"
                          name="currentAddress.thana"
                          size="small"
                          InputProps={{
                            startAdornment: (
                              <LocationOn
                                sx={{ color: "text.secondary", mr: 1 }}
                              />
                            ),
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <CraftInputWithIcon
                          fullWidth
                          label="District"
                          name="currentAddress.district"
                          size="small"
                          InputProps={{
                            startAdornment: (
                              <LocationOn
                                sx={{ color: "text.secondary", mr: 1 }}
                              />
                            ),
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <CraftInputWithIcon
                          fullWidth
                          label="State/Province"
                          name="currentAddress.state"
                          size="small"
                          InputProps={{
                            startAdornment: (
                              <LocationOn
                                sx={{ color: "text.secondary", mr: 1 }}
                              />
                            ),
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <CraftInputWithIcon
                          fullWidth
                          label="Country"
                          name="currentAddress.country"
                          size="small"
                          InputProps={{
                            startAdornment: (
                              <Language
                                sx={{ color: "text.secondary", mr: 1 }}
                              />
                            ),
                          }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <CraftInputWithIcon
                          fullWidth
                          label="Zip/Postal Code"
                          name="currentAddress.zipCode"
                          size="small"
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

              {/* Section 4: Professional Information */}
              <Typography
                variant="h5"
                sx={{ ...sectionTitleSx, mt: { xs: 3, sm: 4, md: 5 } }}
              >
                Professional Information
              </Typography>
              <Divider sx={{ mb: 3 }} />
              <Grid container spacing={{ xs: 1.5, sm: 2, md: 3 }}>
                <Grid item xs={12} sm={6} md={gridSize}>
                  <CraftSelectWithIcon
                    name="designation"
                    size="small"
                    label="Designation"
                    placeholder="Select Designation"
                    items={designations}
                    adornment={<BusinessCenter color="action" />}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={gridSize}>
                  <CraftSelectWithIcon
                    name="department"
                    size="small"
                    label="Department"
                    placeholder="Select Department"
                    items={departments}
                    adornment={<Apartment color="action" />}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={gridSize}>
                  <CraftDatePicker
                    fullWidth
                    label="Joining Date"
                    name="joiningDate"
                    size="small"
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={gridSize}>
                  <CraftInputWithIcon
                    fullWidth
                    label="Monthly Salary"
                    name="monthlySalary"
                    type="number"
                    size="small"
                    InputProps={{
                      startAdornment: (
                        <AttachMoney sx={{ color: "text.secondary", mr: 1 }} />
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={gridSize}>
                  <CraftSelectWithIcon
                    name="staffType"
                    size="small"
                    label="Staff Type"
                    placeholder="Select Staff Type"
                    items={staffTypes}
                    adornment={<Work color="action" />}
                  />
                </Grid>
              </Grid>

              {/* Section 5: Educational Information */}
              <Typography
                variant="h5"
                sx={{ ...sectionTitleSx, mt: { xs: 3, sm: 4, md: 5 } }}
              >
                Educational Information
              </Typography>
              <Divider sx={{ mb: 3 }} />
              <Grid container spacing={{ xs: 1.5, sm: 2, md: 3 }}>
                <Grid item xs={12} sm={6} md={gridSize}>
                  <CraftInputWithIcon
                    fullWidth
                    label="Degree/Certificate"
                    name="degree"
                    size="small"
                    InputProps={{
                      startAdornment: (
                        <School sx={{ color: "text.secondary", mr: 1 }} />
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={gridSize}>
                  <CraftInputWithIcon
                    fullWidth
                    label="Institution"
                    name="institution"
                    size="small"
                    InputProps={{
                      startAdornment: (
                        <BusinessCenter
                          sx={{ color: "text.secondary", mr: 1 }}
                        />
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={gridSize}>
                  <CraftInputWithIcon
                    fullWidth
                    label="Year of Completion"
                    name="year"
                    size="small"
                    InputProps={{
                      startAdornment: (
                        <CalendarMonth
                          sx={{ color: "text.secondary", mr: 1 }}
                        />
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={gridSize}>
                  <CraftInputWithIcon
                    fullWidth
                    label="Specialization"
                    name="specialization"
                    size="small"
                    InputProps={{
                      startAdornment: (
                        <School sx={{ color: "text.secondary", mr: 1 }} />
                      ),
                    }}
                  />
                </Grid>
              </Grid>

              {/* Section 6: Certifications */}
              <Typography
                variant="h5"
                sx={{ ...sectionTitleSx, mt: { xs: 3, sm: 4, md: 5 } }}
              >
                Certifications
              </Typography>
              <Divider sx={{ mb: 3 }} />
              <Grid container spacing={{ xs: 1.5, sm: 2, md: 3 }}>
                <Grid item xs={12} sm={6} md={gridSize}>
                  <CraftInputWithIcon
                    fullWidth
                    label="Certificate Name"
                    name="certificateName"
                    size="small"
                    InputProps={{
                      startAdornment: (
                        <CardMembership
                          sx={{ color: "text.secondary", mr: 1 }}
                        />
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={gridSize}>
                  <CraftInputWithIcon
                    fullWidth
                    label="Issued By"
                    name="issuedBy"
                    size="small"
                    InputProps={{
                      startAdornment: (
                        <BusinessCenter
                          sx={{ color: "text.secondary", mr: 1 }}
                        />
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={gridSize}>
                  <CraftInputWithIcon
                    fullWidth
                    label="Year"
                    name="certificateYear"
                    size="small"
                    InputProps={{
                      startAdornment: (
                        <CalendarMonth
                          sx={{ color: "text.secondary", mr: 1 }}
                        />
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={gridSize}>
                  <CraftInputWithIcon
                    fullWidth
                    label="Description"
                    name="certificateDescription"
                    size="small"
                    InputProps={{
                      startAdornment: (
                        <CardMembership
                          sx={{ color: "text.secondary", mr: 1 }}
                        />
                      ),
                    }}
                  />
                </Grid>
              </Grid>

              {/* Section 7: Work Experience */}
              <Typography
                variant="h5"
                sx={{ ...sectionTitleSx, mt: { xs: 3, sm: 4, md: 5 } }}
              >
                Work Experience
              </Typography>
              <Divider sx={{ mb: 3 }} />
              <Grid container spacing={{ xs: 1.5, sm: 2, md: 3 }}>
                <Grid item xs={12} sm={6} md={gridSize}>
                  <CraftInputWithIcon
                    fullWidth
                    label="Organization"
                    name="organization"
                    size="small"
                    InputProps={{
                      startAdornment: (
                        <BusinessCenter
                          sx={{ color: "text.secondary", mr: 1 }}
                        />
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={gridSize}>
                  <CraftInputWithIcon
                    fullWidth
                    label="Position"
                    name="position"
                    size="small"
                    InputProps={{
                      startAdornment: (
                        <Work sx={{ color: "text.secondary", mr: 1 }} />
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={gridSize}>
                  <CraftInputWithIcon
                    fullWidth
                    label="From (Year)"
                    name="from"
                    size="small"
                    InputProps={{
                      startAdornment: (
                        <CalendarMonth
                          sx={{ color: "text.secondary", mr: 1 }}
                        />
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={gridSize}>
                  <CraftInputWithIcon
                    fullWidth
                    label="To (Year or Present)"
                    name="to"
                    size="small"
                    InputProps={{
                      startAdornment: (
                        <CalendarMonth
                          sx={{ color: "text.secondary", mr: 1 }}
                        />
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <CraftInputWithIcon
                    fullWidth
                    label="Description"
                    name="description"
                    multiline
                    rows={2}
                    size="small"
                    InputProps={{
                      startAdornment: (
                        <BusinessCenter
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

              {/* Section 8: Additional Information */}
              <Typography
                variant="h5"
                sx={{ ...sectionTitleSx, mt: { xs: 3, sm: 4, md: 5 } }}
              >
                Additional Information
              </Typography>
              <Divider sx={{ mb: 3 }} />
              <Grid container spacing={{ xs: 1.5, sm: 2, md: 3 }}>
                <Grid item xs={12} sm={6} md={gridSize}>
                  <CraftSelectWithIcon
                    name="status"
                    size="small"
                    label="Status"
                    placeholder="Select Status"
                    items={statusOptions}
                    adornment={<VerifiedUser color="action" />}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={gridSize}>
                  <CraftSelectWithIcon
                    name="language"
                    size="small"
                    label="Preferred Language"
                    placeholder="Select Language"
                    items={languages}
                    adornment={<Language color="action" />}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={gridSize}>
                  <CraftInputWithIcon
                    fullWidth
                    label="Active Session"
                    name="activeSession"
                    size="small"
                    InputProps={{
                      startAdornment: (
                        <CalendarMonth
                          sx={{ color: "text.secondary", mr: 1 }}
                        />
                      ),
                    }}
                  />
                </Grid>
              </Grid>

              {/* Emergency Contact & Social Media */}
              <Grid
                container
                spacing={{ xs: 1.5, sm: 2, md: 3 }}
                sx={{ mt: 1 }}
              >
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle1" gutterBottom sx={subtitleSx}>
                    Emergency Contact
                  </Typography>
                  <Card
                    variant="outlined"
                    sx={{ p: { xs: 1.5, sm: 2 }, borderRadius: 2 }}
                  >
                    <Grid container spacing={{ xs: 1, sm: 1.5, md: 2 }}>
                      <Grid item xs={12}>
                        <CraftInputWithIcon
                          fullWidth
                          label="Contact Name"
                          name="emergencyContact.name"
                          size="small"
                          InputProps={{
                            startAdornment: (
                              <Person sx={{ color: "text.secondary", mr: 1 }} />
                            ),
                          }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <CraftInputWithIcon
                          fullWidth
                          label="Relation"
                          name="emergencyContact.relation"
                          size="small"
                          InputProps={{
                            startAdornment: (
                              <Group sx={{ color: "text.secondary", mr: 1 }} />
                            ),
                          }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <CraftInputWithIcon
                          fullWidth
                          label="Phone Number"
                          name="emergencyContact.phone"
                          size="small"
                          InputProps={{
                            startAdornment: (
                              <Phone sx={{ color: "text.secondary", mr: 1 }} />
                            ),
                          }}
                        />
                      </Grid>
                    </Grid>
                  </Card>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle1" gutterBottom sx={subtitleSx}>
                    Social Media
                  </Typography>
                  <Card
                    variant="outlined"
                    sx={{ p: { xs: 1.5, sm: 2 }, borderRadius: 2 }}
                  >
                    <Grid container spacing={{ xs: 1, sm: 1.5, md: 2 }}>
                      <Grid item xs={12}>
                        <CraftInputWithIcon
                          fullWidth
                          label="Facebook"
                          name="socialMedia.facebook"
                          size="small"
                          InputProps={{
                            startAdornment: (
                              <Language
                                sx={{ color: "text.secondary", mr: 1 }}
                              />
                            ),
                          }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <CraftInputWithIcon
                          fullWidth
                          label="Twitter"
                          name="socialMedia.twitter"
                          size="small"
                          InputProps={{
                            startAdornment: (
                              <Language
                                sx={{ color: "text.secondary", mr: 1 }}
                              />
                            ),
                          }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <CraftInputWithIcon
                          fullWidth
                          label="LinkedIn"
                          name="socialMedia.linkedin"
                          size="small"
                          InputProps={{
                            startAdornment: (
                              <Language
                                sx={{ color: "text.secondary", mr: 1 }}
                              />
                            ),
                          }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <CraftInputWithIcon
                          fullWidth
                          label="Instagram"
                          name="socialMedia.instagram"
                          size="small"
                          InputProps={{
                            startAdornment: (
                              <Language
                                sx={{ color: "text.secondary", mr: 1 }}
                              />
                            ),
                          }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <CraftInputWithIcon
                          fullWidth
                          label="YouTube"
                          name="socialMedia.youtube"
                          size="small"
                          InputProps={{
                            startAdornment: (
                              <Language
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

              {/* Submit Buttons */}
              <Box
                sx={{
                  mt: { xs: 3, sm: 4, md: 5 },
                  display: "flex",
                  gap: { xs: 1, sm: 2 },
                  justifyContent: "flex-end",
                  flexDirection: { xs: "column-reverse", sm: "row" },
                }}
              >
                <Button
                  variant="outlined"
                  onClick={() => router.push("/dashboard/teacher/list")}
                  startIcon={<Clear />}
                  sx={{
                    borderRadius: 100,
                    px: { xs: 2, sm: 4 },
                    py: { xs: 0.75, sm: 1 },
                    fontSize: { xs: "0.75rem", sm: "0.875rem" },
                  }}
                  fullWidth={isMobile}
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  type="submit"
                  startIcon={
                    isSubmitting ? (
                      <CircularProgress size={20} color="inherit" />
                    ) : (
                      <Save />
                    )
                  }
                  disabled={isSubmitting}
                  sx={{
                    borderRadius: 100,
                    background:
                      "linear-gradient(135deg, #4F0187 0%, #4F0187 100%)",
                    boxShadow: "0 4px 10px rgba(79, 1, 135, 0.3)",
                    px: { xs: 2, sm: 4 },
                    py: { xs: 0.75, sm: 1 },
                    fontSize: { xs: "0.75rem", sm: "0.875rem" },
                  }}
                  fullWidth={isMobile}
                >
                  {isSubmitting
                    ? "Saving..."
                    : id
                      ? "Update Teacher"
                      : "Register Teacher"}
                </Button>
              </Box>
            </Box>
          </Paper>
        </CraftForm>
      </Container>

      {/* Success Backdrop */}
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={success}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            bgcolor: "white",
            p: { xs: 2, sm: 4 },
            borderRadius: 4,
            maxWidth: { xs: "90%", sm: 400 },
            textAlign: "center",
          }}
        >
          <Box
            sx={{
              width: { xs: 60, sm: 80 },
              height: { xs: 60, sm: 80 },
              borderRadius: "50%",
              bgcolor: "#e8f5e9",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mb: 2,
            }}
          >
            <CheckCircle
              sx={{ fontSize: { xs: 40, sm: 50 }, color: "#2e7d32" }}
            />
          </Box>
          <Typography
            variant="h5"
            sx={{
              color: "#2e7d32",
              fontWeight: 600,
              mb: 1,
              fontSize: { xs: "1.25rem", sm: "1.5rem" },
            }}
          >
            Success!
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "text.secondary",
              mb: 3,
              fontSize: { xs: "0.875rem", sm: "1rem" },
            }}
          >
            {id
              ? "Teacher has been updated successfully. Redirecting..."
              : "Teacher has been registered successfully. Redirecting..."}
          </Typography>
          <CircularProgress size={24} sx={{ color: "primary.main" }} />
        </Box>
      </Backdrop>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
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
}
