/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-unescaped-entities */
"use client";

import CraftIntAutoCompleteWithIcon from "@/components/Forms/AutocompleteWithIcon";
import CraftForm from "@/components/Forms/Form";
import FileUploadWithIcon from "@/components/Forms/Upload";
import CraftInputWithIcon from "@/components/Forms/inputWithIcon";
import CraftSelectWithIcon from "@/components/Forms/selectWithIcon";
import { LoadingState } from "@/components/common/LoadingState";
import { useAcademicOption } from "@/hooks/useAcademicOption";
import { bloodGroups } from "@/options";
import {
  useCreateEnrollmentMutation,
  useGetSingleEnrollmentQuery,
  useUpdateEnrollmentMutation,
} from "@/redux/api/enrollmentApi";
import { useGetAllStudentsQuery } from "@/redux/api/studentApi";
import {
  AccessTime,
  AccountCircle,
  Add,
  ArrowBack,
  ArrowForward,
  Book,
  Cake,
  CalendarMonth,
  Check,
  Class,
  Close,
  Description,
  FamilyRestroom,
  Flag,
  Group,
  Home,
  Money,
  Payment,
  Person,
  Phone,
  Save,
  School,
  School as SchoolIcon,
  Work,
} from "@mui/icons-material";
import {
  Alert,
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  CircularProgress,
  Container,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  Paper,
  Switch,
  Tooltip,
  Typography,
  alpha,
  useTheme,
} from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import toast from "react-hot-toast";

// Smooth Organic Animation for Steps
const fadeInSlideUp = {
  animation: "fadeInSlideUp 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both",
  "@keyframes fadeInSlideUp": {
    "0%": { opacity: 0, transform: "translateY(15px)" },
    "100%": { opacity: 1, transform: "translateY(0)" },
  },
};

const FeeAmountHandler = ({
  feeIndex,
  feeCategoryData,
}: {
  feeIndex: number;
  feeCategoryData: any;
}) => {
  const { watch, setValue } = useFormContext();
  const selectedFees = watch(`fees.${feeIndex}.feeType`);
  const selectedClass = watch(`fees.${feeIndex}.className`);
  const feeAmount = watch(`fees.${feeIndex}.feeAmount`);

  useEffect(() => {
    if (
      selectedFees &&
      selectedFees.length > 0 &&
      selectedClass &&
      selectedClass.length > 0
    ) {
      const selectedFeeLabel = selectedFees[0]?.label || selectedFees[0];
      const selectedFeeType = selectedFeeLabel.split(" - ")[0];
      const selectedClassName = selectedClass[0]?.label || selectedClass[0];

      const matchingFee = feeCategoryData?.data?.data?.find(
        (fee: any) =>
          fee.feeType.toLowerCase() === selectedFeeType.toLowerCase() &&
          fee.class === selectedClassName
      );

      if (matchingFee) {
        setValue(
          `fees.${feeIndex}.feeAmount`,
          matchingFee.feeAmount.toString()
        );

        const feeType = selectedFeeType.toLowerCase();
        const isYearly =
          feeType.includes("yearly") || feeType.includes("annual");
        setValue(`fees.${feeIndex}.isYearlyFee`, isYearly);
      }
    }
  }, [selectedFees, selectedClass, setValue, feeIndex, feeCategoryData]);

  useEffect(() => {
    if (feeAmount && selectedFees && selectedFees.length > 0) {
      const selectedFee = selectedFees[0];
      const feeLabel = selectedFee.label || selectedFee;
      const feeType = feeLabel.split(" - ")[0];

      if (
        feeType.toLowerCase().includes("yearly") ||
        feeType.toLowerCase().includes("annual")
      ) {
        const yearlyAmount = parseFloat(feeAmount);
        if (!isNaN(yearlyAmount)) {
          const monthlyAmount = (yearlyAmount / 12).toFixed(2);
          setValue(`fees.${feeIndex}.monthlyAmount`, monthlyAmount);
          setValue(`fees.${feeIndex}.yearlyAmount`, yearlyAmount.toString());
          setValue(`fees.${feeIndex}.isYearlyFee`, true);
        }
      } else if (feeType.toLowerCase().includes("monthly")) {
        const monthlyAmount = parseFloat(feeAmount);
        if (!isNaN(monthlyAmount)) {
          const yearlyAmount = (monthlyAmount * 12).toFixed(2);
          setValue(`fees.${feeIndex}.monthlyAmount`, monthlyAmount.toString());
          setValue(`fees.${feeIndex}.yearlyAmount`, yearlyAmount);
          setValue(`fees.${feeIndex}.isYearlyFee`, false);
        }
      } else {
        setValue(`fees.${feeIndex}.monthlyAmount`, "");
        setValue(`fees.${feeIndex}.yearlyAmount`, "");
        setValue(`fees.${feeIndex}.isYearlyFee`, false);
      }
    }
  }, [feeAmount, selectedFees, setValue, feeIndex]);

  return null;
};

const DynamicFeeFields = ({
  classOptions,
  feeCategoryOptions,
  feeCategoryData,
  studentData,
}: any) => {
  const theme = useTheme();
  const { control, watch, setValue, getValues } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "fees",
  });
  const mainClassName = watch("className");
  const selectedStudent = watch("studentIdSelect");
  const [studentAdvanceBalance, setStudentAdvanceBalance] = useState(0);

  // Get student advance balance
  useEffect(() => {
    if (selectedStudent && studentData?.data) {
      const student = studentData.data.find(
        (s: any) => s._id === (selectedStudent.value || selectedStudent)
      );
      if (student) {
        setStudentAdvanceBalance(student.advanceBalance || 0);
        setValue("advanceBalance", student.advanceBalance || 0);
      }
    }
  }, [selectedStudent, studentData, setValue]);

  // Sync main class to all fee fields when main class changes
  useEffect(() => {
    if (mainClassName && mainClassName.length > 0) {
      const currentFees = watch("fees") || [];

      if (currentFees.length > 0) {
        const updatedFees = currentFees.map((fee: any) => ({
          ...fee,
          className: JSON.parse(JSON.stringify(mainClassName)), // Deep copy
        }));

        // Update all fee fields with the main class
        setValue("fees", updatedFees);
      }
    }
  }, [mainClassName, setValue, watch]);

  const calculateAvailableAdvance = (currentIndex: number) => {
    const fees = watch("fees") || [];
    let allocated = 0;

    fees.forEach((fee: any, index: number) => {
      if (index !== currentIndex && fee.advanceAmount) {
        allocated += parseFloat(fee.advanceAmount) || 0;
      }
    });

    return Math.max(0, studentAdvanceBalance - allocated);
  };

  // Calculate total fee amount
  const calculateTotalFee = () => {
    const fees = watch("fees") || [];
    return fees.reduce((total: number, fee: any) => {
      const feeAmount = parseFloat(fee.feeAmount) || 0;
      return total + feeAmount;
    }, 0);
  };

  // Calculate total advance used
  const calculateTotalAdvanceUsed = () => {
    const fees = watch("fees") || [];
    return fees.reduce((total: number, fee: any) => {
      const advanceAmount = parseFloat(fee.advanceAmount) || 0;
      return total + advanceAmount;
    }, 0);
  };

  // Calculate total due amount
  const calculateTotalDue = () => {
    const totalFee = calculateTotalFee();
    const totalAdvance = calculateTotalAdvanceUsed();
    return Math.max(0, totalFee - totalAdvance);
  };

  // Filter fee options based on selected class
  const getFilteredFeeOptions = (feeClassName: any) => {
    if (feeClassName && feeClassName.length > 0) {
      const selectedClassNames = feeClassName.map(
        (cls: any) => cls.label || cls
      );

      const filtered = feeCategoryData?.data?.data?.filter((fee: any) =>
        selectedClassNames.includes(fee.class)
      );

      const uniqueFeeTypes = Array.from(
        new Set(filtered.map((fee: any) => fee.feeType))
      ).map((feeType) => {
        const feeData = filtered.find((fee: any) => fee.feeType === feeType);
        const feeAmount = feeData ? feeData.feeAmount : 0;
        const labelWithAmount = `${feeType} - ৳${feeAmount.toLocaleString()}`;

        const originalOption = feeCategoryOptions.find(
          (option: any) => option.label === feeType
        );

        return originalOption
          ? { ...originalOption, label: labelWithAmount }
          : { value: feeType, label: labelWithAmount };
      });

      return uniqueFeeTypes;
    } else {
      return feeCategoryOptions;
    }
  };

  const addFeeField = () => {
    // Always use the main class for new fee entries
    const classNameValue =
      mainClassName && mainClassName.length > 0
        ? JSON.parse(JSON.stringify(mainClassName))
        : [];

    append({
      feeType: [],
      className: classNameValue,
      feeAmount: "",
      advanceAmount: "",
      monthlyAmount: "",
      yearlyAmount: "",
      isYearlyFee: false,
    });
  };

  const removeFeeField = (index: number) => {
    if (fields.length > 1) {
      remove(index);
    } else {
      toast.error("At least one fee entry is required");
    }
  };

  return (
    <>
      <Card
        elevation={0}
        sx={{
          mb: 2,
          borderRadius: 3,
          overflow: "hidden",
          border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
          boxShadow: "0 2px 10px rgba(0,0,0,0.03)",
          background: "#fff",
        }}
      >
        <Box
          sx={{
            p: 2.5,
            borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            bgcolor: alpha(theme.palette.primary.main, 0.02),
          }}
        >
          <Box>
            <Typography
              variant="h6"
              fontWeight="600"
              sx={{ color: theme.palette.text.primary }}
            >
              Fee Details
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Add multiple fees with advance application
            </Typography>
          </Box>
          <Button
            onClick={addFeeField}
            size="medium"
            disabled={!mainClassName || mainClassName.length === 0}
            sx={{
              textTransform: "none",
              fontWeight: "bold",
              bgcolor:
                !mainClassName || mainClassName.length === 0
                  ? theme.palette.action.disabled
                  : theme.palette.primary.main,
              color: "#fff",
              "&:hover": {
                bgcolor:
                  !mainClassName || mainClassName.length === 0
                    ? theme.palette.action.disabled
                    : theme.palette.primary.dark,
              },
            }}
          >
            <Add sx={{ fontSize: 18, mr: 0.5 }} /> Add Fee
          </Button>
        </Box>

        <CardContent sx={{ p: 3 }}>
          {fields.map((field, index) => {
            const feeClassName = watch(`fees.${index}.className`);
            const filteredFeeOptions = getFilteredFeeOptions(feeClassName);
            const feeAmount = parseFloat(watch(`fees.${index}.feeAmount`) || 0);
            const advanceAmount = parseFloat(
              watch(`fees.${index}.advanceAmount`) || 0
            );
            const availableAdvance = calculateAvailableAdvance(index);
            const maxAdvance = Math.min(availableAdvance, feeAmount);
            const dueAmount = Math.max(0, feeAmount - advanceAmount);
            const isClassSelected = mainClassName && mainClassName.length > 0;

            return (
              <Box
                key={field.id}
                sx={{
                  mb: 3,
                  p: 3,
                  borderRadius: 2,
                  background: alpha(theme.palette.background.paper, 0.5),
                  border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                  position: "relative",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                    borderColor: alpha(theme.palette.primary.main, 0.2),
                  },
                }}
              >
                {index > 0 && (
                  <Tooltip title="Remove Fee Entry">
                    <IconButton
                      onClick={() => removeFeeField(index)}
                      sx={{
                        position: "absolute",
                        top: 8,
                        right: 8,
                        color: "text.disabled",
                        width: 24,
                        height: 24,
                        "&:hover": {
                          color: "error.main",
                          bgcolor: alpha(theme.palette.error.main, 0.1),
                        },
                      }}
                    >
                      <Close fontSize="small" />
                    </IconButton>
                  </Tooltip>
                )}

                <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                  <Box
                    sx={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      bgcolor: theme.palette.primary.main,
                      mr: 1.5,
                    }}
                  />
                  <Typography
                    variant="subtitle2"
                    fontWeight="bold"
                    color="text.secondary"
                    sx={{
                      textTransform: "uppercase",
                      fontSize: "0.75rem",
                      letterSpacing: 1,
                    }}
                  >
                    Fee Entry #{index + 1}
                  </Typography>
                </Box>

                <FeeAmountHandler
                  feeIndex={index}
                  feeCategoryData={feeCategoryData}
                />

                <Grid container spacing={2.5}>
                  <Grid item xs={12} md={4}>
                    <CraftIntAutoCompleteWithIcon
                      name={`fees.${index}.className`}
                      label="Class"
                      margin="none"
                      size="small"
                      placeholder="Select Class"
                      options={classOptions}
                      fullWidth
                      multiple
                      icon={<School color="primary" />}
                      disabled={true}
                      helperText={
                        isClassSelected
                          ? "Auto-filled from Academic Information"
                          : "Select class in Academic Information step first"
                      }
                    />
                  </Grid>

                  {/* Fee Type Field */}
                  <Grid item xs={12} md={4}>
                    <CraftIntAutoCompleteWithIcon
                      name={`fees.${index}.feeType`}
                      label="Fee Type"
                      margin="none"
                      size="small"
                      placeholder={
                        isClassSelected
                          ? "Select Fee Type"
                          : "Select class first"
                      }
                      options={filteredFeeOptions}
                      fullWidth
                      multiple
                      icon={<Money color="primary" />}
                      disabled={!isClassSelected}
                    />
                  </Grid>

                  {/* Fee Amount Field */}
                  <Grid item xs={12} md={4}>
                    <CraftInputWithIcon
                      name={`fees.${index}.feeAmount`}
                      label="Fee Amount"
                      fullWidth
                      margin="none"
                      size="small"
                      type="number"
                      disabled={!isClassSelected}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Typography variant="body2" color="text.secondary">
                              ৳
                            </Typography>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>

                  {/* Advance Amount Field */}
                  <Grid item xs={12} md={4}>
                    <CraftInputWithIcon
                      name={`fees.${index}.advanceAmount`}
                      label="Advance Amount to Use"
                      fullWidth
                      margin="none"
                      size="small"
                      type="number"
                      disabled={!isClassSelected}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Typography variant="body2" color="text.secondary">
                              ৳
                            </Typography>
                          </InputAdornment>
                        ),
                        endAdornment: (
                          <InputAdornment position="end">
                            <Typography
                              variant="caption"
                              color="text.secondary"
                            >
                              Max: ৳{maxAdvance.toLocaleString()}
                            </Typography>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                </Grid>
              </Box>
            );
          })}

          {fields.length === 0 && (
            <Box sx={{ textAlign: "center", py: 4, color: "text.disabled" }}>
              <Payment sx={{ fontSize: 48, mb: 1, opacity: 0.5 }} />
              <Typography variant="body2">
                {!mainClassName || mainClassName.length === 0
                  ? "Select a class in Academic Information step to add fees"
                  : "No fee entries added yet"}
              </Typography>
              <Button
                onClick={addFeeField}
                variant="outlined"
                sx={{ mt: 2 }}
                startIcon={<Add />}
                disabled={!mainClassName || mainClassName.length === 0}
              >
                Add First Fee
              </Button>
            </Box>
          )}
        </CardContent>
      </Card>
    </>
  );
};

const StudentSelector = ({ studentData, classOptions }: any) => {
  const theme = useTheme();
  const { setValue, watch } = useFormContext();
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  console.log("selecte student this ", selectedStudent);
  const studentIdOptions =
    studentData?.data?.map((student: any) => ({
      value: student._id,
      label: student.studentId,
      data: student,
    })) || [];

  const studentNameOptions =
    studentData?.data?.map((student: any) => ({
      value: student._id,
      label: student.name,
      data: student,
    })) || [];

  const transformStudentClassToForm = (studentClassName: any[]) => {
    if (
      !studentClassName ||
      !Array.isArray(studentClassName) ||
      studentClassName.length === 0
    ) {
      return [];
    }

    return studentClassName.map((cls: any) => {
      const className = cls.className || cls;

      let matchedClass = classOptions?.find(
        (option: any) => option.value === cls._id || option.label === className
      );

      if (!matchedClass) {
        matchedClass = {
          value: cls._id || className,
          label: className,
        };
      }

      return matchedClass;
    });
  };
  const populateFormWithStudentData = (student: any) => {
    if (!student) return;

    const formattedClassName = transformStudentClassToForm(student.className);

    const formValues: any = {
      studentId: student.studentId || "",
      studentNameBangla: student.nameBangla || "",
      studentPhoto: student.studentPhoto || "",
      fatherNameBangla: student.fatherName || "",
      motherNameBangla: student.motherName || "",
      studentName: student.name || "",
      mobileNo: student.mobile || "",
      className: formattedClassName,
      session:
        student.activeSession?.[0] || new Date().getFullYear().toString(),
      category: student.studentType?.toLowerCase() || "residential",
      dateOfBirth: student.birthDate ? new Date(student.birthDate) : null,
      nidBirth: student.birthRegistrationNo || "",
      bloodGroup: student.bloodGroup || "",
      nationality: "Bangladeshi",
      fatherName: student.fatherName || "",
      fatherMobile: student.fatherMobile || "",
      fatherNid: student.nidFatherMotherGuardian || "",
      fatherProfession: student.fatherProfession || "",
      fatherIncome: student.fatherIncome || 0,
      motherName: student.motherName || "",
      motherMobile: student.motherMobile || "",
      motherNid: student.nidFatherMotherGuardian || "",
      motherProfession: student.motherProfession || "",
      motherIncome: student.motherIncome || 0,
      village: student.presentAddress?.village || "",
      postOffice: student.presentAddress?.postOffice || "",
      postCode: student.presentAddress?.postCode || "",
      policeStation: student.presentAddress?.policeStation || "",
      district: student.presentAddress?.district || "",
      permVillage: student.permanentAddress?.village || "",
      permPostOffice: student.permanentAddress?.postOffice || "",
      permPostCode: student.permanentAddress?.postCode || "",
      permPoliceStation: student.permanentAddress?.policeStation || "",
      permDistrict: student.permanentAddress?.district || "",
      guardianName: student.guardianInfo?.name || "",
      guardianRelation: student.guardianInfo?.relation || "",
      guardianMobile: student.guardianInfo?.mobile || "",
      guardianVillage: student.guardianInfo?.address || "",
      formerInstitution: "",
      formerVillage: "",
      birthCertificate: student.documents?.birthCertificate || false,
      transferCertificate: student.documents?.transferCertificate || false,
      characterCertificate: student.documents?.characterCertificate || false,
      markSheet: student.documents?.markSheet || false,
      photographs: student.documents?.photographs || false,
      termsAccepted: false,
      studentDepartment: student.studentDepartment || "hifz",
      rollNumber: student.studentClassRoll || "",
      section: student.section?.[0] || "",
      group: student.batch || "",
      optionalSubject: "",
      shift: "",
      fees: [
        {
          feeType: [],
          className: formattedClassName,
          feeAmount: "",
          monthlyAmount: "",
          yearlyAmount: "",
          isYearlyFee: false,
        },
      ],
      admissionFee: student.admissionFee || 0,
      monthlyFee: student.monthlyFee || 0,
    };
    Object.keys(formValues).forEach((key) => {
      setValue(key, formValues[key]);
    });

    toast.success(`Form populated with student data for ${student.name}.`);
  };

  const handleStudentIdSelection = (value: any) => {
    if (value && value.data) {
      setSelectedStudent(value.data);
      populateFormWithStudentData(value.data);
      setValue("studentNameSelect", {
        value: value.value,
        label: value.data.name,
        data: value.data,
      });
    } else {
      setSelectedStudent(null);
      setValue("studentNameSelect", null);
    }
  };

  const handleStudentNameSelection = (value: any) => {
    if (value && value.data) {
      setSelectedStudent(value.data);
      populateFormWithStudentData(value.data);
      setValue("studentIdSelect", {
        value: value.value,
        label: value.data.studentId,
        data: value.data,
      });
    } else {
      setSelectedStudent(null);
      setValue("studentIdSelect", null);
    }
  };

  useEffect(() => {
    const watchedStudentId = watch("studentIdSelect");
    const watchedStudentName = watch("studentNameSelect");

    if (
      watchedStudentId &&
      watchedStudentId.data &&
      (!selectedStudent || selectedStudent._id !== watchedStudentId.data._id)
    ) {
      handleStudentIdSelection(watchedStudentId);
    }

    if (
      watchedStudentName &&
      watchedStudentName.data &&
      (!selectedStudent || selectedStudent._id !== watchedStudentName.data._id)
    ) {
      handleStudentNameSelection(watchedStudentName);
    }
  }, [watch("studentIdSelect"), watch("studentNameSelect")]);

  return (
    <Card
      elevation={0}
      sx={{
        mb: 4,
        borderRadius: 3,
        overflow: "hidden",
        border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
        boxShadow: "0 2px 10px rgba(0,0,0,0.03)",
        background: alpha(theme.palette.info.main, 0.03),
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <CraftIntAutoCompleteWithIcon
              name="studentIdSelect"
              label="Select by Student ID"
              placeholder="Choose Student ID"
              options={studentIdOptions}
              fullWidth
              icon={<Person color="primary" />}
              onChange={(event: any, value: any) => {
                handleStudentIdSelection(value);
              }}
              multiple={false}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <CraftIntAutoCompleteWithIcon
              name="studentNameSelect"
              label="Select by Student Name"
              placeholder="Choose Student Name"
              options={studentNameOptions}
              fullWidth
              icon={<Person color="primary" />}
              onChange={(event: any, value: any) => {
                handleStudentNameSelection(value);
              }}
              multiple={false}
            />
          </Grid>
        </Grid>
        {selectedStudent && (
          <Box
            sx={{
              mt: 2,
              p: 2,
              bgcolor: "#fff",
              borderRadius: 2,
              border: `1px solid ${alpha(theme.palette.info.main, 0.2)}`,
              display: "flex",
              alignItems: "center",
            }}
          >
            <Avatar
              src={selectedStudent.studentPhoto}
              sx={{ width: 40, height: 40, mr: 2 }}
            >
              <AccountCircle />
            </Avatar>
            <Box>
              <Typography variant="body1" fontWeight="bold">
                {selectedStudent.name}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                ID: {selectedStudent.studentId} • Class:{" "}
                {selectedStudent.className?.[0]?.className || "N/A"}
              </Typography>
            </Box>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

const transformEnrollmentDataToForm = (
  enrollmentData: any,
  classOptions: any[],
  feeCategoryOptions: any[]
) => {
  if (!enrollmentData?.data) {
    return null;
  }

  const data = enrollmentData.data;
  const formatClassForForm = (classData: any) => {
    if (!classData || classData.length === 0) return [];

    if (Array.isArray(classData)) {
      return classData.map((cls: any) => {
        const classId = cls._id || cls;
        const classNameValue = cls.className || cls;

        let matchedClass = classOptions?.find(
          (option: any) => option.value === classId
        );
        if (!matchedClass) {
          matchedClass = classOptions?.find(
            (option: any) => option.label === classNameValue
          );
        }
        if (!matchedClass) {
          matchedClass = {
            value: classId,
            label: classNameValue,
          };
        }

        return matchedClass;
      });
    } else {
      const classId = classData._id || classData;
      const classNameValue = classData.className || classData;

      let matchedClass = classOptions?.find(
        (option: any) => option.value === classId
      );

      if (!matchedClass) {
        matchedClass = classOptions?.find(
          (option: any) => option.label === classNameValue
        );
      }

      if (!matchedClass) {
        matchedClass = {
          value: classId,
          label: classNameValue,
        };
      }

      return [matchedClass];
    }
  };

  const formatFeeForForm = (fees: any[], classData: any) => {
    if (!fees || !Array.isArray(fees) || fees.length === 0) {
      return [
        {
          feeType: [],
          className: formatClassForForm(classData),
          feeAmount: "",
          monthlyAmount: "",
          yearlyAmount: "",
          isYearlyFee: false,
        },
      ];
    }

    return fees.map((fee: any) => {
      const matchedFeeType = feeCategoryOptions?.find(
        (option: any) =>
          option.value === fee.feeType || option.label === fee.feeType
      );

      const feeAmount = fee.amount || fee.feeAmount || 0;

      return {
        feeType: matchedFeeType
          ? [matchedFeeType]
          : [
              {
                value: fee.feeType,
                label: fee.feeType,
              },
            ],
        className: formatClassForForm(classData),
        feeAmount: feeAmount.toString(),
        monthlyAmount: ((feeAmount || 0) / 12).toFixed(2),
        yearlyAmount: feeAmount.toString(),
        isYearlyFee: fee.isYearlyFee || false,
      };
    });
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return null;
    try {
      return new Date(dateString).toISOString().split("T")[0];
    } catch {
      return null;
    }
  };

  const transformedData = {
    studentId: data.studentId || data.student?.studentId || "",
    studentNameBangla: data.nameBangla || data.student?.nameBangla || "",
    studentPhoto: data.studentPhoto || data.student?.studentPhoto || "",
    fatherNameBangla: data.fatherNameBangla || data.student?.fatherName || "",
    motherNameBangla: data.motherNameBangla || data.student?.motherName || "",
    studentName: data.name || data.student?.name || "",
    mobileNo: data.mobileNo || data.student?.mobile || "",
    session: data.session || new Date().getFullYear().toString(),
    category:
      data.studentType ||
      data.student?.studentType?.toLowerCase() ||
      "residential",
    dateOfBirth: formatDate(data.birthDate || data.student?.birthDate),
    nidBirth: data.nidBirth || data.student?.birthRegistrationNo || "",
    bloodGroup: data.bloodGroup || data.student?.bloodGroup || "",
    nationality: data.nationality || "Bangladeshi",
    className: formatClassForForm(data.className),
    studentDepartment: data.studentDepartment || "hifz",
    rollNumber: data.roll || data.student?.studentClassRoll || "",
    section: data.section || data.student?.section?.[0] || "",
    group: data.group || data.student?.batch || "",
    optionalSubject: data.optionalSubject || "",
    shift: data.shift || "",
    admissionType: data.admissionType || "",
    fatherName: data.fatherName || data.student?.fatherName || "",
    fatherMobile: data.fatherMobile || "",
    fatherNid: data.fatherNid || "",
    fatherProfession: data.fatherProfession || "",
    fatherIncome: data.fatherIncome || data.student?.fatherIncome || 0,
    motherName: data.motherName || data.student?.motherName || "",
    motherMobile: data.motherMobile || "",
    motherNid: data.motherNid || "",
    motherProfession: data.motherProfession || "",
    motherIncome: data.motherIncome || data.student?.motherIncome || 0,
    village: data.presentAddress?.village || "",
    postOffice: data.presentAddress?.postOffice || "",
    postCode: data.presentAddress?.postCode || "",
    policeStation: data.presentAddress?.policeStation || "",
    district: data.presentAddress?.district || "",
    permVillage: data.permanentAddress?.village || "",
    permPostOffice: data.permanentAddress?.postOffice || "",
    permPostCode: data.permanentAddress?.postCode || "",
    permPoliceStation: data.permanentAddress?.policeStation || "",
    permDistrict: data.permanentAddress?.district || "",
    guardianName:
      data.guardianInfo?.name || data.student?.guardianInfo?.name || "",
    guardianRelation:
      data.guardianInfo?.relation || data.student?.guardianInfo?.relation || "",
    guardianMobile:
      data.guardianInfo?.mobile || data.student?.guardianInfo?.mobile || "",
    guardianVillage:
      data.guardianInfo?.address || data.student?.guardianInfo?.address || "",
    formerInstitution: data.previousSchool?.institution || "",
    formerVillage: data.previousSchool?.address || "",
    birthCertificate: data.documents?.birthCertificate || false,
    transferCertificate: data.documents?.transferCertificate || false,
    characterCertificate: data.documents?.characterCertificate || false,
    markSheet: data.documents?.markSheet || false,
    photographs: data.documents?.photographs || false,
    termsAccepted: data.termsAccepted || false,
    fees: formatFeeForForm(data.fees, data.className),
    admissionFee: data.admissionFee || data.student?.admissionFee || 0,
    monthlyFee: data.monthlyFee || data.student?.monthlyFee || 0,
    studentIdSelect: null,
    studentNameSelect: null,
  };

  return transformedData;
};

const StudentInformationStep = () => {
  return (
    <Box sx={{ ...fadeInSlideUp }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography
            variant="h6"
            fontWeight="bold"
            sx={{ mb: 2, color: "text.primary" }}
          >
            Personal Details
          </Typography>
        </Grid>
        <Grid item xs={12} md={4}>
          <FileUploadWithIcon name="studentPhoto" label="Student Photo" />
        </Grid>
        <Grid item xs={12} md={6} sx={{ opacity: 0 }}>
          <CraftInputWithIcon
            fullWidth
            label="Student ID"
            name="studentId"
            placeholder="Enter Student ID"
            InputProps={{
              startAdornment: (
                <Description sx={{ color: "text.secondary", mr: 1 }} />
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <CraftInputWithIcon
            fullWidth
            margin="none"
            size="medium"
            label={
              <span>
                Student Name <span style={{ color: "red" }}>*</span>
              </span>
            }
            name="studentNameBangla"
            placeholder="Student Name (বাংলায়)"
            InputProps={{
              startAdornment: (
                <Person sx={{ color: "text.secondary", mr: 1 }} />
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <CraftInputWithIcon
            margin="none"
            size="medium"
            fullWidth
            label={
              <span>
                Student Name<span style={{ color: "red" }}>*</span>
              </span>
            }
            name="studentName"
            placeholder="Full Name in English"
            InputProps={{
              startAdornment: (
                <Person sx={{ color: "text.secondary", mr: 1 }} />
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <CraftInputWithIcon
            margin="none"
            size="medium"
            fullWidth
            label="Mobile No."
            name="mobileNo"
            placeholder="01XXXXXXXXX"
            InputProps={{
              startAdornment: <Phone sx={{ color: "text.secondary", mr: 1 }} />,
            }}
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <CraftInputWithIcon
            margin="none"
            size="medium"
            fullWidth
            label="Session"
            name="session"
            placeholder="2024-2025"
            InputProps={{
              startAdornment: (
                <CalendarMonth sx={{ color: "text.secondary", mr: 1 }} />
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <CraftSelectWithIcon
            margin="none"
            size="medium"
            fullWidth
            label={
              <span>
                Category <span style={{ color: "red" }}>*</span>
              </span>
            }
            name="category"
            items={[
              "Day Care",
              "Residential",
              "Non Residential",
              "Residential No Meal",
              "Non Residential One Meal",
            ]}
            adornment={<CalendarMonth />}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <CraftSelectWithIcon
            margin="none"
            size="medium"
            name="studentDepartment"
            label={
              <span>
                Student Department
                <span style={{ color: "red" }}>*</span>
              </span>
            }
            placeholder="Student Department"
            items={["hifz", "academic"]}
            adornment={<Person color="action" />}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <CraftInputWithIcon
            margin="none"
            size="medium"
            fullWidth
            label="Date of Birth"
            name="dateOfBirth"
            type="date"
            InputProps={{
              startAdornment: <Cake sx={{ color: "text.secondary", mr: 1 }} />,
            }}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <CraftInputWithIcon
            margin="none"
            size="medium"
            fullWidth
            label="NID/Birth Reg. No"
            name="nidBirth"
            placeholder="1234567890"
            InputProps={{
              startAdornment: (
                <Description sx={{ color: "text.secondary", mr: 1 }} />
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <CraftSelectWithIcon
            margin="none"
            size="medium"
            name="bloodGroup"
            label="Blood Group"
            placeholder="Select Blood Group"
            items={bloodGroups}
            adornment={<Person color="action" />}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <CraftInputWithIcon
            margin="none"
            size="medium"
            fullWidth
            label="Nationality"
            name="nationality"
            placeholder="Bangladeshi"
            InputProps={{
              startAdornment: <Flag sx={{ color: "text.secondary", mr: 1 }} />,
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
};
const AcademicStep = ({ classOptions }: any) => {
  const { watch } = useFormContext();
  const selectedClass = watch("className");

  return (
    <Box sx={{ ...fadeInSlideUp }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography
            variant="h6"
            fontWeight="bold"
            sx={{ mb: 2, color: "text.primary" }}
          >
            Academic Details
          </Typography>
          {selectedClass && selectedClass.length > 0 && (
            <Alert
              severity="info"
              icon={<Check />}
              sx={{ mb: 2, borderRadius: 2 }}
            >
              <Typography variant="body2">
                Selected class "
                {selectedClass.map((cls: any) => cls.label || cls).join(", ")}"
                will be automatically used in the Fee section.
              </Typography>
            </Alert>
          )}
        </Grid>
        <Grid item xs={12} md={4}>
          <CraftIntAutoCompleteWithIcon
            margin="none"
            size="medium"
            name="className"
            label={
              <span>
                Class <span style={{ color: "red" }}>*</span>
              </span>
            }
            placeholder="Select Class"
            options={classOptions}
            fullWidth
            multiple
            icon={<Class color="primary" />}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <CraftInputWithIcon
            margin="none"
            size="medium"
            fullWidth
            label="Roll Number"
            name="rollNumber"
            placeholder="Enter Roll No"
            InputProps={{
              startAdornment: <Class sx={{ color: "text.secondary", mr: 1 }} />,
            }}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <CraftSelectWithIcon
            margin="none"
            size="medium"
            name="section"
            label="Section"
            items={["A", "B", "C"]}
            adornment={<Group />}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <CraftSelectWithIcon
            margin="none"
            size="medium"
            name="group"
            label="Group"
            items={["Science", "Commerce", "Arts"]}
            adornment={<School />}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CraftInputWithIcon
            margin="none"
            size="medium"
            fullWidth
            label="Optional Subject"
            name="optionalSubject"
            placeholder="e.g. Higher Math / ICT"
            InputProps={{
              startAdornment: <Book sx={{ color: "text.secondary", mr: 1 }} />,
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CraftSelectWithIcon
            margin="none"
            size="medium"
            name="shift"
            label="Shift"
            items={["Morning", "Day", "Evening"]}
            adornment={<AccessTime />}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

const ParentGuardianStep = () => {
  return (
    <Box sx={{ ...fadeInSlideUp }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography
            variant="h6"
            fontWeight="bold"
            sx={{ mb: 2, color: "text.primary" }}
          >
            Parent & Guardian
          </Typography>
        </Grid>

        {/* Father */}
        <Grid item xs={12} md={4}>
          <CraftInputWithIcon
            size="medium"
            margin="none"
            fullWidth
            label="Father's Name"
            name="fatherName"
            placeholder="Full Name"
            InputProps={{
              startAdornment: (
                <Person sx={{ color: "text.secondary", mr: 1 }} />
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <CraftInputWithIcon
            size="medium"
            margin="none"
            fullWidth
            label={
              <span>
                Father's Name Bangla <span style={{ color: "red" }}>*</span>
              </span>
            }
            name="fatherNameBangla"
            placeholder="Father's Name (বাংলায়)"
            InputProps={{
              startAdornment: (
                <Person sx={{ color: "text.secondary", mr: 1 }} />
              ),
            }}
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <CraftInputWithIcon
            size="medium"
            margin="none"
            fullWidth
            label="Mobile"
            name="fatherMobile"
            placeholder="01XXXXXXXXX"
            InputProps={{
              startAdornment: <Phone sx={{ color: "text.secondary", mr: 1 }} />,
            }}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <CraftInputWithIcon
            size="medium"
            margin="none"
            fullWidth
            label="NID/Passport No"
            name="fatherNid"
            placeholder="1234567890"
            InputProps={{
              startAdornment: (
                <Description sx={{ color: "text.secondary", mr: 1 }} />
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <CraftInputWithIcon
            size="medium"
            margin="none"
            fullWidth
            label="Profession"
            name="fatherProfession"
            placeholder="Occupation"
            InputProps={{
              startAdornment: <Work sx={{ color: "text.secondary", mr: 1 }} />,
            }}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <CraftInputWithIcon
            size="medium"
            margin="none"
            fullWidth
            label="Monthly Income"
            name="fatherIncome"
            placeholder="BDT"
            type="number"
            InputProps={{
              startAdornment: <Work sx={{ color: "text.secondary", mr: 1 }} />,
            }}
          />
        </Grid>

        {/* Mother */}
        <Grid item xs={12} md={4}>
          <CraftInputWithIcon
            size="medium"
            margin="none"
            fullWidth
            label="Mother's Name"
            name="motherName"
            placeholder="Full Name"
            InputProps={{
              startAdornment: (
                <Person sx={{ color: "text.secondary", mr: 1 }} />
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <CraftInputWithIcon
            size="medium"
            margin="none"
            fullWidth
            label={
              <span>
                Mother's Name Bangla<span style={{ color: "red" }}>*</span>
              </span>
            }
            name="motherNameBangla"
            placeholder="Mother's Name (বাংলায়)"
            InputProps={{
              startAdornment: (
                <Person sx={{ color: "text.secondary", mr: 1 }} />
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <CraftInputWithIcon
            size="medium"
            margin="none"
            fullWidth
            label="Mobile"
            name="motherMobile"
            placeholder="01XXXXXXXXX"
            InputProps={{
              startAdornment: <Phone sx={{ color: "text.secondary", mr: 1 }} />,
            }}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <CraftInputWithIcon
            size="medium"
            margin="none"
            fullWidth
            label="NID/Passport No"
            name="motherNid"
            placeholder="1234567890"
            InputProps={{
              startAdornment: (
                <Description sx={{ color: "text.secondary", mr: 1 }} />
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <CraftInputWithIcon
            size="medium"
            margin="none"
            fullWidth
            label="Profession"
            name="motherProfession"
            placeholder="Occupation"
            InputProps={{
              startAdornment: <Work sx={{ color: "text.secondary", mr: 1 }} />,
            }}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <CraftInputWithIcon
            size="medium"
            margin="none"
            fullWidth
            label="Monthly Income"
            name="motherIncome"
            placeholder="BDT"
            type="number"
            InputProps={{
              startAdornment: <Work sx={{ color: "text.secondary", mr: 1 }} />,
            }}
          />
        </Grid>

        {/* Guardian */}
        <Grid item xs={12} md={4}>
          <CraftInputWithIcon
            size="medium"
            margin="none"
            fullWidth
            label="Guardian Name"
            name="guardianName"
            placeholder="Guardian Name"
            InputProps={{
              startAdornment: (
                <Person sx={{ color: "text.secondary", mr: 1 }} />
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <CraftInputWithIcon
            size="medium"
            margin="none"
            fullWidth
            label="Relation"
            name="guardianRelation"
            placeholder="Relation"
            InputProps={{
              startAdornment: (
                <Person sx={{ color: "text.secondary", mr: 1 }} />
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <CraftInputWithIcon
            size="medium"
            margin="none"
            fullWidth
            label="Mobile"
            name="guardianMobile"
            placeholder="01XXXXXXXXX"
            InputProps={{
              startAdornment: <Phone sx={{ color: "text.secondary", mr: 1 }} />,
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <CraftInputWithIcon
            size="medium"
            margin="none"
            fullWidth
            label="Address"
            name="guardianVillage"
            placeholder="Address"
            InputProps={{
              startAdornment: (
                <Description sx={{ color: "text.secondary", mr: 1 }} />
              ),
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

const DocumentCheckbox = ({ name, label }: { name: string; label: string }) => {
  const { watch, setValue } = useFormContext();
  const isChecked = watch(name) || false;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(name, event.target.checked);
  };

  return (
    <FormControlLabel
      control={
        <Checkbox
          checked={isChecked}
          onChange={handleChange}
          name={name}
          color="primary"
        />
      }
      label={label}
      sx={{ mb: 1 }}
    />
  );
};

const AddressDocumentsStep = () => {
  const theme = useTheme();
  const { watch, setValue } = useFormContext();
  const termsAccepted = watch("termsAccepted") || false;

  const handleTermsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue("termsAccepted", event.target.checked);
  };

  return (
    <Box sx={{ ...fadeInSlideUp }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography
            variant="h6"
            fontWeight="bold"
            sx={{ mb: 2, color: "text.primary" }}
          >
            Address & Documents
          </Typography>
        </Grid>

        {/* Present Address */}
        <Grid item xs={12} md={4}>
          <CraftInputWithIcon
            size="medium"
            margin="none"
            fullWidth
            label="Village/Area"
            name="village"
            placeholder="Village/Area"
            InputProps={{
              startAdornment: (
                <Description sx={{ color: "text.secondary", mr: 1 }} />
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <CraftInputWithIcon
            size="medium"
            margin="none"
            fullWidth
            label="Post Office"
            name="postOffice"
            placeholder="Post Office"
            InputProps={{
              startAdornment: (
                <Description sx={{ color: "text.secondary", mr: 1 }} />
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <CraftInputWithIcon
            size="medium"
            margin="none"
            fullWidth
            label="Post Code"
            name="postCode"
            placeholder="Post Code"
            InputProps={{
              startAdornment: (
                <Description sx={{ color: "text.secondary", mr: 1 }} />
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CraftInputWithIcon
            size="medium"
            margin="none"
            fullWidth
            label="Police Station"
            name="policeStation"
            placeholder="Police Station"
            InputProps={{
              startAdornment: (
                <Description sx={{ color: "text.secondary", mr: 1 }} />
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CraftInputWithIcon
            size="medium"
            margin="none"
            fullWidth
            label="District"
            name="district"
            placeholder="District"
            InputProps={{
              startAdornment: (
                <Description sx={{ color: "text.secondary", mr: 1 }} />
              ),
            }}
          />
        </Grid>

        {/* Permanent Address */}
        <Grid item xs={12} md={4}>
          <CraftInputWithIcon
            size="medium"
            margin="none"
            fullWidth
            label="Village/Area"
            name="permVillage"
            placeholder="Village/Area"
            InputProps={{
              startAdornment: (
                <Description sx={{ color: "text.secondary", mr: 1 }} />
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <CraftInputWithIcon
            size="medium"
            margin="none"
            fullWidth
            label="Post Office"
            name="permPostOffice"
            placeholder="Post Office"
            InputProps={{
              startAdornment: (
                <Description sx={{ color: "text.secondary", mr: 1 }} />
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <CraftInputWithIcon
            size="medium"
            margin="none"
            fullWidth
            label="Post Code"
            name="permPostCode"
            placeholder="Post Code"
            InputProps={{
              startAdornment: (
                <Description sx={{ color: "text.secondary", mr: 1 }} />
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CraftInputWithIcon
            size="medium"
            margin="none"
            fullWidth
            label="Police Station"
            name="permPoliceStation"
            placeholder="Police Station"
            InputProps={{
              startAdornment: (
                <Description sx={{ color: "text.secondary", mr: 1 }} />
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CraftInputWithIcon
            size="medium"
            margin="none"
            fullWidth
            label="District"
            name="permDistrict"
            placeholder="District"
            InputProps={{
              startAdornment: (
                <Description sx={{ color: "text.secondary", mr: 1 }} />
              ),
            }}
          />
        </Grid>

        {/* Previous Education */}
        <Grid item xs={12} md={6}>
          <CraftInputWithIcon
            size="medium"
            margin="none"
            fullWidth
            label="Previous Institution"
            name="formerInstitution"
            placeholder="Previous Institution"
            InputProps={{
              startAdornment: (
                <School sx={{ color: "text.secondary", mr: 1 }} />
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CraftInputWithIcon
            size="medium"
            margin="none"
            fullWidth
            label="Previous Address"
            name="formerVillage"
            placeholder="Previous Address"
            InputProps={{
              startAdornment: (
                <Description sx={{ color: "text.secondary", mr: 1 }} />
              ),
            }}
          />
        </Grid>

        {/* Documents */}
        <Grid item xs={12}>
          <Box
            sx={{
              p: 2,
              border: `1px solid ${alpha(theme.palette.divider, 0.2)}`,
              borderRadius: 2,
            }}
          >
            <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: "bold" }}>
              Documents Provided
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={12}>
                <DocumentCheckbox
                  name="birthCertificate"
                  label="Birth Certificate"
                />
                <DocumentCheckbox
                  name="transferCertificate"
                  label="Transfer Certificate"
                />
                <DocumentCheckbox
                  name="characterCertificate"
                  label="Character Certificate"
                />
                <DocumentCheckbox name="markSheet" label="Mark Sheet" />
                <DocumentCheckbox name="photographs" label="Photographs" />
              </Grid>
            </Grid>
          </Box>
        </Grid>

        {/* Terms */}
        <Grid item xs={12}>
          <Box
            sx={{
              p: 2,
              border: `1px solid ${alpha(theme.palette.divider, 0.2)}`,
              borderRadius: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Box>
              <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
                Terms & Conditions
              </Typography>
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ ml: 1 }}
              >
                I agree to the enrollment terms
              </Typography>
            </Box>
            <Switch
              checked={termsAccepted}
              onChange={handleTermsChange}
              name="termsAccepted"
              color="primary"
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};
const FeeStep = ({
  classOptions,
  feeCategoryOptions,
  feeCategoryData,
  studentData, // Add this prop
}: any) => {
  return (
    <Box sx={{ ...fadeInSlideUp }}>
      <DynamicFeeFields
        classOptions={classOptions}
        feeCategoryOptions={feeCategoryOptions}
        feeCategoryData={feeCategoryData}
        studentData={studentData} // Pass studentData
      />
    </Box>
  );
};

const EnrollmentForm = () => {
  const theme = useTheme();
  const limit = 200;
  const [page] = useState(0);
  const [searchTerm] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [open, setOpen] = useState(false);

  const { classOptions, feeCategoryOptions, feeCategoryData } =
    useAcademicOption();

  const [createEnrollment] = useCreateEnrollmentMutation();
  const [updateEnrollment] = useUpdateEnrollmentMutation();
  const { data: singleEnrollment, isLoading: enrollmentLoading } =
    useGetSingleEnrollmentQuery(id ? { id } : undefined, {
      skip: !id,
    });

  const { data: studentData } = useGetAllStudentsQuery({
    limit,
    page: page + 1,
    searchTerm,
  });
  console.log("student ", studentData);

  const [submitting, setSubmitting] = useState(false);
  const [defaultValues, setDefaultValues] = useState<any>(null);
  const [formKey, setFormKey] = useState(0);
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    { label: "Student Info", icon: <AccountCircle /> },
    { label: "Academic Info", icon: <SchoolIcon /> },
    { label: "Parent/Guardian", icon: <FamilyRestroom /> },
    { label: "Address & Docs", icon: <Home /> },
    { label: "Fee Info", icon: <Payment /> },
  ];

  useEffect(() => {
    if (
      id &&
      singleEnrollment &&
      classOptions.length > 0 &&
      feeCategoryOptions.length > 0
    ) {
      const transformedData = transformEnrollmentDataToForm(
        singleEnrollment,
        classOptions,
        feeCategoryOptions
      );

      if (transformedData) {
        setDefaultValues(transformedData);
        setFormKey((prev) => prev + 1);
      }
    } else if (!id) {
      setDefaultValues({
        studentId: "",
        studentNameBangla: "",
        studentPhoto: "",
        fatherNameBangla: "",
        motherNameBangla: "",
        studentName: "",
        mobileNo: "",
        session: new Date().getFullYear().toString(),
        category: "residential",
        dateOfBirth: null,
        nidBirth: "",
        bloodGroup: "",
        nationality: "Bangladeshi",
        fatherName: "",
        fatherMobile: "",
        fatherNid: "",
        fatherProfession: "",
        fatherIncome: 0,
        motherName: "",
        motherMobile: "",
        motherNid: "",
        motherProfession: "",
        motherIncome: 0,
        className: [],
        studentDepartment: "hifz",
        rollNumber: "",
        section: "",
        group: "",
        optionalSubject: "",
        shift: "",
        admissionType: "",
        village: "",
        postOffice: "",
        postCode: "",
        policeStation: "",
        district: "",
        permVillage: "",
        permPostOffice: "",
        permPostCode: "",
        permPoliceStation: "",
        permDistrict: "",
        guardianName: "",
        guardianRelation: "",
        guardianMobile: "",
        guardianVillage: "",
        formerInstitution: "",
        formerVillage: "",
        birthCertificate: false,
        transferCertificate: false,
        characterCertificate: false,
        markSheet: false,
        photographs: false,
        termsAccepted: false,
        fees: [
          {
            feeType: [],
            className: [],
            feeAmount: "",
            monthlyAmount: "",
            yearlyAmount: "",
            isYearlyFee: false,
          },
        ],
        admissionFee: 0,
        monthlyFee: 0,
        studentIdSelect: null,
        studentNameSelect: null,
      });
      setFormKey((prev) => prev + 1);
    }
  }, [id, singleEnrollment, classOptions, feeCategoryOptions]);

  const handleSubmit = async (data: any) => {
    try {
      setSubmitting(true);

      const { studentIdSelect, studentNameSelect, ...submitData } = data;

      // Validate required fields
      if (!submitData.studentName) {
        toast.error("Student name is required");
        setSubmitting(false);
        return;
      }

      if (!submitData.mobileNo) {
        toast.error("Mobile number is required");
        setSubmitting(false);
        return;
      }

      if (!submitData.className || submitData.className.length === 0) {
        toast.error("Class selection is required");
        setSubmitting(false);
        return;
      }

      // Process class names
      const classNameArray =
        submitData.className && submitData.className.length > 0
          ? submitData.className
              .map((cls: any) => cls.value || cls)
              .filter(Boolean)
          : [];

      if (!classNameArray.length) {
        toast.error("Class selection is required");
        setSubmitting(false);
        return;
      }

      // Process fees with advance amounts
      const transformedFees = Array.isArray(submitData.fees)
        ? submitData.fees
            .filter(
              (fee: any) =>
                fee.feeType &&
                fee.feeType.length > 0 &&
                fee.className &&
                fee.className.length > 0 &&
                fee.feeAmount &&
                Number(fee.feeAmount) > 0
            )
            .map((fee: any) => {
              const feeTypeLabel =
                fee.feeType[0]?.label || fee.feeType[0] || "";
              const feeType = feeTypeLabel.split(" - ")[0];
              const className =
                fee.className[0]?.label || fee.className[0] || "";
              const feeAmount = Number(fee.feeAmount) || 0;
              const advanceAmount = Number(fee.advanceAmount) || 0;

              return {
                feeType: feeType,
                className: className,
                feeAmount: feeAmount,
                advanceAmount: advanceAmount, // Make sure this is included
              };
            })
        : [];

      if (transformedFees.length === 0) {
        toast.error("At least one valid fee entry is required");
        setSubmitting(false);
        return;
      }

      // Get student advance balance
      const studentAdvanceBalance = submitData.advanceBalance || 0;

      // Prepare final data for submission
      const finalSubmitData: any = {
        studentName: submitData.studentName || "",
        nameBangla: submitData.studentNameBangla || "",
        studentPhoto: submitData.studentPhoto || "",
        mobileNo: submitData.mobileNo || "",
        rollNumber: submitData.rollNumber || "",
        birthDate: submitData.dateOfBirth
          ? new Date(submitData.dateOfBirth).toISOString()
          : "",
        birthRegistrationNo: submitData.nidBirth || "",
        bloodGroup: submitData.bloodGroup || "",
        nationality: submitData.nationality || "Bangladeshi",
        className: classNameArray,
        section: submitData.section || "",
        roll: submitData.rollNumber || "",
        session: submitData.session || new Date().getFullYear().toString(),
        batch: submitData.group || "",
        studentType: submitData.category || "Residential",
        studentDepartment: submitData.studentDepartment || "hifz",
        fatherName: submitData.fatherName || "",
        fatherNameBangla: submitData.fatherNameBangla || "",
        fatherMobile: submitData.fatherMobile || "",
        fatherNid: submitData.fatherNid || "",
        fatherProfession: submitData.fatherProfession || "",
        fatherIncome: Number(submitData.fatherIncome) || 0,
        motherName: submitData.motherName || "",
        motherNameBangla: submitData.motherNameBangla || "",
        motherMobile: submitData.motherMobile || "",
        motherNid: submitData.motherNid || "",
        motherProfession: submitData.motherProfession || "",
        motherIncome: Number(submitData.motherIncome) || 0,
        presentAddress: {
          village: submitData.village || "",
          postOffice: submitData.postOffice || "",
          postCode: submitData.postCode || "",
          policeStation: submitData.policeStation || "",
          district: submitData.district || "",
        },
        permanentAddress: {
          village: submitData.permVillage || "",
          postOffice: submitData.permPostOffice || "",
          postCode: submitData.permPostCode || "",
          policeStation: submitData.permPoliceStation || "",
          district: submitData.permDistrict || "",
        },
        guardianInfo: {
          name: submitData.guardianName || "",
          relation: submitData.guardianRelation || "",
          mobile: submitData.guardianMobile || "",
          address: submitData.guardianVillage || "",
        },
        previousSchool: {
          institution: submitData.formerInstitution || "",
          address: submitData.formerVillage || "",
        },
        documents: {
          birthCertificate: Boolean(submitData.birthCertificate),
          transferCertificate: Boolean(submitData.transferCertificate),
          characterCertificate: Boolean(submitData.characterCertificate),
          markSheet: Boolean(submitData.markSheet),
          photographs: Boolean(submitData.photographs),
        },
        fees: transformedFees,
        termsAccepted: Boolean(submitData.termsAccepted),
        admissionFee: Number(submitData.admissionFee) || 0,
        monthlyFee: Number(submitData.monthlyFee) || 0,
        advanceBalance: Number(submitData.advanceBalance) || 0,
      };

      console.log("Submitting enrollment data with advance:", finalSubmitData);

      let res;
      if (id) {
        res = await updateEnrollment({ id, data: finalSubmitData }).unwrap();
      } else {
        res = await createEnrollment(finalSubmitData).unwrap();
      }

      if (res?.success) {
        toast.success(res?.message || "Student enrolled successfully");

        setTimeout(() => {
          router.push(`/dashboard/enrollments/list`);
        }, 2000);
      } else {
        throw new Error(res?.message || "Failed to enroll student");
      }
    } catch (err: any) {
      console.error("Submission error:", err);

      let errorMessage = "Failed to enroll student!";

      if (err?.data?.message) {
        errorMessage = err.data.message;
      } else if (err?.message) {
        errorMessage = err.message;
      }

      if (errorMessage.includes("advance")) {
        toast.error(
          "Advance balance insufficient. Please adjust advance amount."
        );
      } else {
        toast.error(errorMessage);
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault();
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    // Smooth scroll to top of the content wrapper, not window top, to keep context
    const contentWrapper = document.getElementById("form-content-wrapper");
    if (contentWrapper) {
      contentWrapper.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleBack = (e: React.MouseEvent) => {
    e.preventDefault();
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    const contentWrapper = document.getElementById("form-content-wrapper");
    if (contentWrapper) {
      contentWrapper.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  if ((id && enrollmentLoading) || !defaultValues) {
    return <LoadingState />;
  }

  return (
    <Box
      sx={{
        bgcolor: alpha(theme.palette.background.default, 0.5),
        minHeight: "100vh",
      }}
    >
      <CraftForm
        key={formKey}
        onSubmit={handleSubmit}
        defaultValues={defaultValues}
      >
        <Container maxWidth="lg" sx={{ py: 4 }}>
          {/* Elegant Header */}
          <Paper
            elevation={0}
            sx={{
              p: 4,
              mb: 3,
              borderRadius: 3,
              background: "#fff",
              boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Box display="flex" alignItems="center">
              <Avatar
                sx={{
                  bgcolor: theme.palette.primary.main,
                  width: 56,
                  height: 56,
                  boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                }}
              >
                <School sx={{ color: "#fff", fontSize: 32 }} />
              </Avatar>
              <Box ml={2}>
                <Typography
                  variant="h5"
                  sx={{ fontWeight: "bold", color: "text.primary" }}
                >
                  Craft International Institute
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  226, Narayanhat Sadar, Narayanganj
                </Typography>
              </Box>
            </Box>
          </Paper>

          {/* Clean, Centered Card for Form */}
          <Paper
            elevation={0}
            sx={{
              p: 0,
              borderRadius: 3,
              background: "#fff",
              boxShadow: "0 4px 30px rgba(0,0,0,0.03)",
              overflow: "visible",
              minHeight: 600, // Maintain height to prevent jumping
            }}
          >
            {/* Subtle Page Indicator */}
            <Box
              sx={{
                px: 4,
                py: 2,
                borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
              }}
            >
              <Typography
                variant="caption"
                color="text.disabled"
                sx={{ fontWeight: 600, letterSpacing: 0.5 }}
              >
                {activeStep + 1} OF {steps.length}
              </Typography>
            </Box>

            <CardContent sx={{ p: 4 }} id="form-content-wrapper">
              <StudentSelector
                studentData={studentData}
                classOptions={classOptions}
              />

              {/* Form Sections with Smooth Animation */}
              <Box minHeight={400}>
                {activeStep === 0 && <StudentInformationStep />}
                {activeStep === 1 && (
                  <AcademicStep classOptions={classOptions} />
                )}
                {activeStep === 2 && <ParentGuardianStep />}
                {activeStep === 3 && <AddressDocumentsStep />}
                {activeStep === 4 && (
                  <FeeStep
                    classOptions={classOptions}
                    feeCategoryOptions={feeCategoryOptions}
                    feeCategoryData={feeCategoryData}
                  />
                )}
              </Box>
            </CardContent>
          </Paper>

          {/* Minimalist Navigation Bar */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mt: 3,
              px: 1,
            }}
          >
            <Button
              disabled={activeStep === 0}
              onClick={handleBack}
              startIcon={<ArrowBack sx={{ fontSize: 18 }} />}
              variant="text"
              type="button"
              sx={{
                fontWeight: "bold",
                color: "text.secondary",
                "&:hover": {
                  color: "text.primary",
                  bgcolor: alpha(theme.palette.action.hover, 0.04),
                },
                px: 2,
                py: 1.5,
              }}
            >
              Back
            </Button>

            {activeStep === steps.length - 1 ? (
              <Button
                type="submit"
                variant="contained"
                size="large"
                disabled={submitting}
                endIcon={
                  submitting ? (
                    <CircularProgress size={20} color="inherit" />
                  ) : (
                    <Save />
                  )
                }
                sx={{
                  borderRadius: 2, // Squircle for modern feel
                  px: 5,
                  py: 1.5,
                  fontWeight: "bold",
                  boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
                  textTransform: "none",
                  background: theme.palette.primary.main,
                  "&:hover": {
                    boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
                    bgcolor: theme.palette.primary.dark,
                  },
                }}
              >
                {submitting
                  ? "Submitting..."
                  : id
                    ? "Update Enrollment"
                    : "Submit Application"}
              </Button>
            ) : (
              <Button
                variant="contained"
                onClick={handleNext}
                endIcon={<ArrowForward sx={{ fontSize: 18 }} />}
                type="button"
                sx={{
                  borderRadius: 2,
                  px: 5,
                  py: 1.5,
                  fontWeight: "bold",
                  boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
                  background: theme.palette.primary.main,
                  "&:hover": {
                    boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
                    bgcolor: theme.palette.primary.dark,
                  },
                  textTransform: "none",
                }}
              >
                Continue
              </Button>
            )}
          </Box>
        </Container>
      </CraftForm>
    </Box>
  );
};

export default EnrollmentForm;
