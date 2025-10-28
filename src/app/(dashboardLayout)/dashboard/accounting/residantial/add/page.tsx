/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import React, { useState } from "react"
import {
    Box,
    Button,
    Container,
    Paper,
    TextField,
    MenuItem,
    Grid,
    Typography,
    Divider,
    InputAdornment,

} from "@mui/material"
import {
    Save as SaveIcon,
    School as SchoolIcon,
    AttachMoney as MoneyIcon,
    Payments as PaymentsIcon,
} from "@mui/icons-material"
import Link from "next/link"

const CLASSES = ["Six", "Five", "Four", "Three", "Two", "Hifz", "Nazera", "Nurani"]
const MONTHS = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
]

interface FormData {
    studentName: string
    class: string
    month: string
    amountGiven: string
    totalCost: string
    advance: string
}

export default function AddPage() {
    const [formData, setFormData] = useState<FormData>({
        studentName: "",
        class: "",
        month: "",
        amountGiven: "",
        totalCost: "",
        advance: "",
    })

    const [, setSubmitted] = useState(false)
    const [errors, setErrors] = useState<Partial<FormData>>({})

    const validateForm = () => {
        const newErrors: Partial<FormData> = {}
        if (!formData.studentName.trim()) newErrors.studentName = "Student name is required"
        if (!formData.class) newErrors.class = "Class is required"
        if (!formData.month) newErrors.month = "Month is required"
        if (!formData.amountGiven || Number.parseFloat(formData.amountGiven) < 0)
            newErrors.amountGiven = "Valid amount is required"
        if (!formData.totalCost || Number.parseFloat(formData.totalCost) < 0)
            newErrors.totalCost = "Valid cost is required"
        if (!formData.advance || Number.parseFloat(formData.advance) < 0)
            newErrors.advance = "Valid advance is required"

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
        if (errors[name as keyof FormData]) {
            setErrors((prev) => ({ ...prev, [name]: undefined }))
        }
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (validateForm()) {
            console.log("Form submitted:", formData)
            setSubmitted(true)
            setTimeout(() => {
                setFormData({
                    studentName: "",
                    class: "",
                    month: "",
                    amountGiven: "",
                    totalCost: "",
                    advance: "",
                })
                setSubmitted(false)
            }, 2500)
        }
    }

    return (
        <Box >
            <Container maxWidth="xl">

                <Paper
                    elevation={4}
                    sx={{
                        px: 10,
                        py: 5,
                        borderRadius: "20px",
                        background: "rgba(255, 255, 255, 0.8)",
                        backdropFilter: "blur(14px)",
                        boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
                        border: "1px solid rgba(255,255,255,0.4)",
                        transition: "0.3s ease-in-out",
                        "&:hover": {
                            boxShadow: "0 12px 48px rgba(0,0,0,0.15)",
                        },
                    }}
                >
                    <Typography variant="h5" fontWeight={700} sx={{ mb: 4, color: "#1e1e2f" }}>
                        Residential Meal & Cost Management
                    </Typography>

                    <form onSubmit={handleSubmit}>

                        <SectionHeader title="Student Information" icon={<SchoolIcon />} />
                        <Grid container spacing={2} mb={3}>
                            <Grid item xs={12} sm={6} md={3}>
                                <StyledTextField
                                    label="Student Name"
                                    name="studentName"
                                    value={formData.studentName}
                                    onChange={handleChange}
                                    error={!!errors.studentName}
                                    helperText={errors.studentName}
                                    placeholder="e.g. Rahim Uddin"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={3}>
                                <StyledTextField
                                    select
                                    label="Class"
                                    name="class"
                                    value={formData.class}
                                    onChange={handleChange}
                                    error={!!errors.class}
                                    helperText={errors.class}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <SchoolIcon sx={{ color: "#667eea" }} />
                                            </InputAdornment>
                                        ),
                                    }}
                                >
                                    {CLASSES.map((cls) => (
                                        <MenuItem key={cls} value={cls}>
                                            {cls}
                                        </MenuItem>
                                    ))}
                                </StyledTextField>
                            </Grid>
                            <Grid item xs={12} sm={6} md={3}>
                                <StyledTextField
                                    select
                                    fullWidth
                                    label="Month"
                                    name="month"
                                    value={formData.month}
                                    onChange={handleChange}
                                    error={!!errors.month}
                                    helperText={errors.month}
                                >
                                    {MONTHS.map((m) => (
                                        <MenuItem key={m} value={m}>
                                            {m}
                                        </MenuItem>
                                    ))}
                                </StyledTextField>
                            </Grid>
                        </Grid>
                        <SectionHeader title="Transaction Details" icon={<PaymentsIcon />} />
                        <Grid container spacing={2} mb={3}>
                            <Grid item xs={12} sm={4}>
                                <StyledMoneyField
                                    label="Amount Given"
                                    name="amountGiven"
                                    value={formData.amountGiven}
                                    onChange={handleChange}
                                    error={!!errors.amountGiven}
                                    helperText={errors.amountGiven}
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <StyledMoneyField
                                    label="Total Cost"
                                    name="totalCost"
                                    value={formData.totalCost}
                                    onChange={handleChange}
                                    error={!!errors.totalCost}
                                    helperText={errors.totalCost}
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <StyledMoneyField
                                    label="Advance Payment"
                                    name="advance"
                                    value={formData.advance}
                                    onChange={handleChange}
                                    error={!!errors.advance}
                                    helperText={errors.advance}
                                />
                            </Grid>
                        </Grid>

                        <Divider sx={{ my: 4 }} />

                        <Box display="flex" justifyContent="flex-end" gap={2}>
                            <Link href="/" style={{ textDecoration: "none" }}>
                                <Button
                                    variant="outlined"
                                    sx={{
                                        px: 4,
                                        py: 1.2,
                                        borderRadius: "12px",
                                        textTransform: "none",
                                        fontWeight: 600,
                                        color: "#6b7280",
                                        borderColor: "#d1d5db",
                                        "&:hover": {
                                            borderColor: "#667eea",
                                            color: "#667eea",
                                            background: "rgba(102,126,234,0.05)",
                                        },
                                    }}
                                >
                                    Cancel
                                </Button>
                            </Link>

                            <Button
                                type="submit"
                                variant="contained"
                                startIcon={<SaveIcon />}
                                sx={{
                                    px: 4,
                                    py: 1.2,
                                    borderRadius: "12px",
                                    textTransform: "none",
                                    fontWeight: 600,
                                    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                                    boxShadow: "0 4px 14px rgba(102,126,234,0.4)",
                                    "&:hover": {
                                        boxShadow: "0 6px 20px rgba(102,126,234,0.5)",
                                    },
                                }}
                            >
                                Save Record
                            </Button>
                        </Box>
                    </form>
                </Paper>
            </Container>
        </Box>
    )
}

// --- Reusable Styled Components ---
const SectionHeader = ({ title, icon }: { title: string; icon: React.ReactNode }) => (
    <Typography
        variant="h6"
        sx={{
            mb: 2,
            fontWeight: 700,
            color: "#374151",
            display: "flex",
            alignItems: "center",
            gap: 1,
        }}
    >
        {icon} {title}
    </Typography>
)

const StyledTextField = (props: any) => (
    <TextField
        {...props}
        fullWidth
        sx={{
            "& .MuiOutlinedInput-root": {
                borderRadius: "12px",
                background: "#fafafa",
                "&:hover fieldset": { borderColor: "#667eea" },
                "&.Mui-focused fieldset": { borderColor: "#667eea" },
            },
            "& .MuiInputLabel-root.Mui-focused": { color: "#667eea" },
        }}
    />
)

const StyledMoneyField = (props: any) => (
    <StyledTextField
        {...props}
        type="number"
        InputProps={{
            startAdornment: (
                <InputAdornment position="start">
                    <MoneyIcon sx={{ color: "#667eea" }} />
                </InputAdornment>
            ),
        }}
    />
)
