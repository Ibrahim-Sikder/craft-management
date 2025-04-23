import { z } from "zod";

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
            }),
        )
        .optional(),
    certifications: z
        .array(
            z.object({
                name: z.string().optional(),
                issuedBy: z.string().optional(),
                year: z.string().optional(),
                description: z.string().optional(),
            }),
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
            }),
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
})