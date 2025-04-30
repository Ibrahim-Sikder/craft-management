import { z } from "zod";

export enum Gender {
  MALE = "Male",
  FEMALE = "Female",
  OTHER = "Other",
}

export enum StudentStatus {
  ACTIVE = "Active",
  INACTIVE = "Inactive",
  GRADUATED = "Graduated",
}

export enum StudentType {
  RESIDENTIAL = "Residential",
  DAY = "Day",
}

export const teacherSchema = z.object({
  teacherId: z.string({
    required_error: "Teacher ID is required",
  }),
  teacherSerial: z.string({
    required_error: "Teacher Serial is required",
  }),
  smartIdCard: z.string().optional(),
  name: z.string({
    required_error: "Name is required",
  }),
  englishName: z.string().optional(),
  phone: z.string({
    required_error: "Phone number is required",
  }),
  email: z.string().email("Invalid email address").optional(),
  dateOfBirth: z.string().optional(),
  bloodGroup: z.string().optional(),
  gender: z.string().optional(),
  nationality: z.string().optional(),
  religion: z.string().optional(),
  maritalStatus: z.string().optional(),
  image: z.string().optional(),

  // Address Information
  permanentAddress: z
    .object({
      address: z.string().optional(),
      village: z.string().optional(),
      postOffice: z.string().optional(),
      thana: z.string().optional(),
      district: z.string().optional(),
      state: z.string().optional(),
      country: z.string().optional(),
      zipCode: z.string().optional(),
    })
    .optional(),
  sameAsPermanent: z.boolean().default(false),
  currentAddress: z
    .object({
      address: z.string().optional(),
      village: z.string().optional(),
      postOffice: z.string().optional(),
      thana: z.string().optional(),
      district: z.string().optional(),
      state: z.string().optional(),
      country: z.string().optional(),
      zipCode: z.string().optional(),
    })
    .optional(),

  // Professional Information
  designation: z.string().optional(),
  department: z.string().optional(),
  joiningDate: z.string().optional(),
  monthlySalary: z.string().optional(),
  staffType: z.string().optional(),
  residenceType: z.string().optional(),
  subjectsTaught: z.array(z.string()).optional(),

  // Bank Details
  bankDetails: z
    .object({
      accountName: z.string().optional(),
      accountNumber: z.string().optional(),
      bankName: z.string().optional(),
      branchName: z.string().optional(),
      ifscCode: z.string().optional(),
    })
    .optional(),

  // Education, Certifications, Experience
  education: z
    .array(
      z.object({
        degree: z.string().optional(),
        institution: z.string().optional(),
        year: z.string().optional(),
        specialization: z.string().optional(),
      })
    )
    .optional(),
  certifications: z
    .array(
      z.object({
        name: z.string().optional(),
        issuedBy: z.string().optional(),
        year: z.string().optional(),
        description: z.string().optional(),
      })
    )
    .optional(),
  experience: z
    .array(
      z.object({
        organization: z.string().optional(),
        position: z.string().optional(),
        from: z.string().optional(),
        to: z.string().optional(),
        description: z.string().optional(),
      })
    )
    .optional(),

  // Emergency Contact
  emergencyContact: z
    .object({
      name: z.string().optional(),
      relation: z.string().optional(),
      phone: z.string().optional(),
    })
    .optional(),

  // Social Media
  socialMedia: z
    .object({
      facebook: z.string().optional(),
      twitter: z.string().optional(),
      youtube: z.string().optional(),
      linkedin: z.string().optional(),
      instagram: z.string().optional(),
    })
    .optional(),

  // Other Information
  status: z.string().optional(),
  language: z.string().optional(),
  activeSession: z.string().optional(),
});

export const studentSchema = z.object({
    smartIdCard: z.string().optional(),
    name: z.string({ required_error: 'Name is required' }),
    birthDate: z.string({ required_error: 'Birth date is required' }),
    birthRegistrationNo: z.string().optional(),
    gender: z.enum([Gender.MALE, Gender.FEMALE, Gender.OTHER], {
      required_error: 'Gender is required',
    }),
    mobile: z.string({ required_error: 'Mobile number is required' }),
    bloodGroup: z.string().optional(),
    studentPhoto: z.string({required_error:'Student photo is required!'}).optional(),
    // Family Information
    fatherName: z.string().optional(),
    motherName: z.string().optional(),
    guardianName: z.string().optional(),
    guardianMobile: z.string().optional(),
    relation: z.string().optional(),
    nidFatherMotherGuardian: z.string().optional(),

    // Address Information
    permanentAddress: z.string({ required_error: 'Permanent address is required' }).optional(),
    permanentDistrict: z.string({ required_error: 'Permanent district is required' }).optional(),
    permanentThana: z.string({ required_error: 'Permanent thana is required' }).optional(),
    sameAsPermanent: z.boolean().default(false),
    presentAddress: z.string().optional(),
    presentDistrict: z.string().optional(),
    presentThana: z.string().optional(),

    // Academic Information
    className: z.string({ required_error: 'Class name is required' }),
    studentClassRoll: z.string({ required_error: 'Student class roll is required' }),
    batch: z.string().optional(),
    section: z.string().optional(),
    activeSession: z.string({ required_error: 'Active session is required' }),
    status: z.enum([StudentStatus.ACTIVE, StudentStatus.INACTIVE, StudentStatus.GRADUATED]).default(StudentStatus.ACTIVE),
    studentType: z.enum([StudentType.RESIDENTIAL, StudentType.DAY]).optional(),
    additionalNote: z.string().optional(),

    // Fee Information (accepts both string and number)
    admissionFee: z.coerce.number().default(0),
    monthlyFee: z.coerce.number().default(0),
    previousDues: z.coerce.number().default(0),
    sessionFee: z.coerce.number().default(0),
    residenceFee: z.coerce.number().default(0),
    otherFee: z.coerce.number().default(0),
    transportFee: z.coerce.number().default(0),
    boardingFee: z.coerce.number().default(0),

    // Settings
    sendAdmissionSMS: z.boolean().default(false),
    studentSerial: z.string().optional(),
    sendAttendanceSMS: z.boolean().default(false),
});
