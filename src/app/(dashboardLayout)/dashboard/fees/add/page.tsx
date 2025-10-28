"use client"

import type React from "react"
import { useState } from "react"
import {
    Box,
    Container,
    Paper,
    TextField,
    Button,
    Card,
    CardContent,
    Grid,
    Typography,
    Alert,
    MenuItem,
    InputAdornment,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from "@mui/material"
import {
    Save as SaveIcon,
    CheckCircle as CheckCircleIcon,
    Add as AddIcon,
} from "@mui/icons-material"
import Link from "next/link"

interface FormData {
    studentName: string
    class: string
    month: string
    feeName: string
    feeAmount: string
    note: string
}

const classes = [
    "One (1)A",
    "One (1)B",
    "Two (2)",
    "Three (3)",
    "Four (4)",
    "Five (5)",
    "Six (6)",
    "Hifz",
    "Nazera",
    "Nurani",
]

const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
]

const initialFeeTypes = [
    "Monthly Fee",
    "Admission Fee",
    "Form Fee",
    "Exam Fee",
    "Homework Fee",
    "Semister Fee",
    "Other",
]

export default function AddFeeRecordPage() {
    const [showSuccess, setShowSuccess] = useState(false)
    const [openCategoryModal, setOpenCategoryModal] = useState(false)
    const [newCategoryName, setNewCategoryName] = useState("")
    const [feeTypes, setFeeTypes] = useState(initialFeeTypes)
    const [formData, setFormData] = useState<FormData>({
        studentName: "",
        class: "",
        month: "",
        feeName: "",
        feeAmount: "",
        note: "",
    })

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
        const { name, value } = e.target as HTMLInputElement
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleOpenCategoryModal = () => {
        setOpenCategoryModal(true)
        setNewCategoryName("")
    }

    const handleCloseCategoryModal = () => {
        setOpenCategoryModal(false)
        setNewCategoryName("")
    }

    const handleAddCategory = () => {
        if (!newCategoryName.trim()) {
            alert("Please enter a fee category name")
            return
        }

        if (feeTypes.includes(newCategoryName)) {
            alert("This category already exists")
            return
        }

        setFeeTypes([...feeTypes, newCategoryName])
        handleCloseCategoryModal()
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        if (!formData.studentName || !formData.class || !formData.month || !formData.feeName || !formData.feeAmount) {
            alert("Please fill in all required fields")
            return
        }

        console.log("Form submitted:", formData)
        setShowSuccess(true)

        setTimeout(() => {
            setShowSuccess(false)
            setFormData({
                studentName: "",
                class: "",
                month: "",
                feeName: "",
                feeAmount: "",
                note: "",
            })
        }, 2000)
    }

    return (
        <Box

        >
            <Container maxWidth="lg">

                <Box sx={{ mb: 4, display: "flex", alignItems: "center", gap: 2 }}>

                    <Box>
                        <Typography
                            variant="h3"
                            sx={{
                                fontWeight: "bold",

                            }}
                        >
                            Add Fee Record
                        </Typography>
                        <Typography variant="body1" sx={{ color: "rgba(255,255,255,0.9)" }}>
                            Record a new student fee payment
                        </Typography>
                    </Box>
                </Box>

                {/* Success Alert */}
                {showSuccess && (
                    <Alert
                        severity="success"
                        icon={<CheckCircleIcon />}
                        sx={{
                            mb: 3,
                            borderRadius: "12px",
                            background: "linear-gradient(135deg, #4caf50 0%, #45a049 100%)",
                            color: "white",
                            "& .MuiAlert-icon": {
                                color: "white",
                            },
                        }}
                    >
                        Fee record added successfully!
                    </Alert>
                )}


                <Paper
                    sx={{
                        p: 4,
                        background: "rgba(255,255,255,0.95)",
                        backdropFilter: "blur(10px)",
                        boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
                        borderRadius: "16px",
                    }}
                >
                    <form onSubmit={handleSubmit}>

                        <Box sx={{ mb: 4 }}>
                            <Typography
                                variant="h6"
                                sx={{ mb: 3, fontWeight: "bold", color: "#667eea", display: "flex", alignItems: "center", gap: 1 }}
                            >
                                <Box
                                    sx={{
                                        width: 4,
                                        height: 4,
                                        borderRadius: "50%",
                                        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                                    }}
                                />
                                Student Information
                            </Typography>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        label="Student Name"
                                        name="studentName"
                                        value={formData.studentName}
                                        onChange={handleInputChange}
                                        placeholder="Enter student name"
                                        required
                                        sx={{
                                            "& .MuiOutlinedInput-root": {
                                                borderRadius: "12px",
                                            },
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        select
                                        fullWidth
                                        label="Class"
                                        name="class"
                                        value={formData.class}
                                        onChange={handleInputChange}
                                        required
                                        sx={{
                                            "& .MuiOutlinedInput-root": {
                                                borderRadius: "12px",
                                            },
                                        }}
                                    >
                                        {classes.map((cls) => (
                                            <MenuItem key={cls} value={cls}>
                                                {cls}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Grid>
                            </Grid>
                        </Box>

                        {/* Fee Details Section */}
                        <Box sx={{ mb: 4 }}>
                            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 3 }}>
                                <Typography
                                    variant="h6"
                                    sx={{ fontWeight: "bold", color: "#667eea", display: "flex", alignItems: "center", gap: 1 }}
                                >
                                    <Box
                                        sx={{
                                            width: 4,
                                            height: 4,
                                            borderRadius: "50%",
                                            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                                        }}
                                    />
                                    Fee Details
                                </Typography>
                                <Button

                                    onClick={handleOpenCategoryModal}
                                    sx={{
                                        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                                        color: "white",
                                        textTransform: "none",
                                        borderRadius: "8px",
                                        fontSize: "0.9rem",
                                        "&:hover": {
                                            background: "linear-gradient(135deg, #5568d3 0%, #6a3f8f 100%)",
                                        },
                                    }}
                                >
                                    Fee Category
                                </Button>
                            </Box>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        select
                                        fullWidth
                                        label="Month"
                                        name="month"
                                        value={formData.month}
                                        onChange={handleInputChange}
                                        required
                                        sx={{
                                            "& .MuiOutlinedInput-root": {
                                                borderRadius: "12px",
                                            },
                                        }}
                                    >
                                        {months.map((month) => (
                                            <MenuItem key={month} value={month}>
                                                {month}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        select
                                        fullWidth
                                        label="Fee Name"
                                        name="feeName"
                                        value={formData.feeName}
                                        onChange={handleInputChange}
                                        required
                                        sx={{
                                            "& .MuiOutlinedInput-root": {
                                                borderRadius: "12px",
                                            },
                                        }}
                                    >
                                        {feeTypes.map((type) => (
                                            <MenuItem key={type} value={type}>
                                                {type}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Fee Amount"
                                        name="feeAmount"
                                        type="number"
                                        value={formData.feeAmount}
                                        onChange={handleInputChange}
                                        placeholder="Enter fee amount"
                                        required
                                        InputProps={{
                                            startAdornment: <InputAdornment position="start">৳</InputAdornment>,
                                        }}
                                        sx={{
                                            "& .MuiOutlinedInput-root": {
                                                borderRadius: "12px",
                                            },
                                        }}
                                    />
                                </Grid>
                            </Grid>
                        </Box>

                        {/* Notes Section */}
                        <Box sx={{ mb: 4 }}>
                            <Typography
                                variant="h6"
                                sx={{ mb: 3, fontWeight: "bold", color: "#667eea", display: "flex", alignItems: "center", gap: 1 }}
                            >
                                <Box
                                    sx={{
                                        width: 4,
                                        height: 4,
                                        borderRadius: "50%",
                                        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                                    }}
                                />
                                Additional Notes
                            </Typography>
                            <TextField
                                fullWidth
                                label="Note"
                                name="note"
                                value={formData.note}
                                onChange={handleInputChange}
                                placeholder="Add any additional notes (optional)"
                                multiline
                                rows={3}
                                sx={{
                                    "& .MuiOutlinedInput-root": {
                                        borderRadius: "12px",
                                    },
                                }}
                            />
                        </Box>

                        {/* Summary Card */}
                        {formData.feeAmount && (
                            <Card
                                sx={{
                                    mb: 4,
                                    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                                    color: "white",
                                }}
                            >
                                <CardContent>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} sm={6}>
                                            <Typography variant="body2" sx={{ opacity: 0.9, mb: 1 }}>
                                                Fee Amount
                                            </Typography>
                                            <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                                                ৳{Number(formData.feeAmount).toLocaleString()}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <Typography variant="body2" sx={{ opacity: 0.9, mb: 1 }}>
                                                Student
                                            </Typography>
                                            <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                                                {formData.studentName || "Not selected"}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        )}

                        {/* Submit Button */}
                        <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end" }}>
                            <Link href="/fees">
                                <Button
                                    sx={{
                                        textTransform: "none",
                                        fontSize: "1rem",
                                        borderRadius: "12px",
                                    }}
                                >
                                    Cancel
                                </Button>
                            </Link>
                            <Button
                                type="submit"
                                variant="contained"
                                endIcon={<SaveIcon />}
                                sx={{
                                    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                                    borderRadius: "12px",
                                    textTransform: "none",
                                    fontSize: "1rem",
                                    px: 4,
                                }}
                            >
                                Save Fee Record
                            </Button>
                        </Box>
                    </form>
                </Paper>
            </Container>

            <Dialog
                open={openCategoryModal}
                onClose={handleCloseCategoryModal}

            >
                <DialogTitle

                >
                    Add New Fee Category
                </DialogTitle>
                <DialogContent sx={{ pt: 3 }}>
                    <TextField
                        autoFocus
                        fullWidth
                        label="Fee Category Name"
                        value={newCategoryName}
                        onChange={(e) => setNewCategoryName(e.target.value)}
                        placeholder="e.g., Library Fee, Sports Fee, etc."
                        onKeyPress={(e) => {
                            if (e.key === "Enter") {
                                handleAddCategory()
                            }
                        }}
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                borderRadius: "12px",
                            },
                        }}
                    />
                </DialogContent>
                <DialogActions sx={{ p: 2, gap: 1 }}>
                    <Button
                        onClick={handleCloseCategoryModal}
                        sx={{
                            textTransform: "none",
                            borderRadius: "8px",
                        }}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleAddCategory}
                        variant="contained"
                        startIcon={<AddIcon />}
                        sx={{
                            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                            textTransform: "none",
                            borderRadius: "8px",
                        }}
                    >
                        Add Category
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
}
