"use client"

import { useState } from "react"
import {
    Container,
    Paper,
    TextField,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Box,
    Typography,
    Card,
    CardContent,
    Grid,
    Chip,
    InputAdornment,
    ButtonGroup,
    AppBar,
    Toolbar,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from "@mui/material"
import {
    Search as SearchIcon,
    Add as AddIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
    TrendingUp as TrendingUpIcon,
    TrendingDown as TrendingDownIcon,
    AccountBalance as AccountBalanceIcon,
} from "@mui/icons-material"
import Link from "next/link"

interface Student {
    id: string
    name: string
    class: string
    totalGiven: number
    totalCost: number
    totalPayable: number
    totalAdvance: number
    balance: number
}

const STUDENTS_DATA: Student[] = [
    {
        id: "1",
        name: "আহমেদ হোসেন",
        class: "Six",
        totalGiven: 15000,
        totalCost: 12500,
        totalPayable: 8000,
        totalAdvance: 2000,
        balance: 2500,
    },
    {
        id: "2",
        name: "ফাতিমা বেগম",
        class: "Five",
        totalGiven: 12000,
        totalCost: 11000,
        totalPayable: 7500,
        totalAdvance: 1500,
        balance: 1000,
    },
    {
        id: "3",
        name: "মোহাম্মদ করিম",
        class: "Four",
        totalGiven: 18000,
        totalCost: 16000,
        totalPayable: 10000,
        totalAdvance: 3000,
        balance: 2000,
    },
    {
        id: "4",
        name: "সালমা খাতুন",
        class: "Three",
        totalGiven: 10000,
        totalCost: 11500,
        totalPayable: 6000,
        totalAdvance: 500,
        balance: -1500,
    },
    {
        id: "5",
        name: "রহিম আহমেদ",
        class: "Two",
        totalGiven: 14000,
        totalCost: 13000,
        totalPayable: 8500,
        totalAdvance: 2500,
        balance: 1000,
    },
    {
        id: "6",
        name: "নাজমা আক্তার",
        class: "Hifz",
        totalGiven: 16000,
        totalCost: 14500,
        totalPayable: 9000,
        totalAdvance: 2000,
        balance: 1500,
    },
]

const CLASSES = ["All", "Six", "Five", "Four", "Three", "Two", "Hifz", "Nazera", "Nurani"]

export default function MealListPage() {
    const [students, setStudents] = useState<Student[]>(STUDENTS_DATA)
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedClass, setSelectedClass] = useState("All")
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
    const [selectedStudent, setSelectedStudent] = useState<Student | null>(null)

    const filteredStudents = students.filter((student) => {
        const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesClass = selectedClass === "All" || student.class === selectedClass
        return matchesSearch && matchesClass
    })

    const totalBalance = students.reduce((sum, s) => sum + s.balance, 0)
    const positiveBalance = students.filter((s) => s.balance > 0).length
    const negativeBalance = students.filter((s) => s.balance < 0).length

    const handleDeleteClick = (student: Student) => {
        setSelectedStudent(student)
        setDeleteDialogOpen(true)
    }

    const handleDeleteConfirm = () => {
        if (selectedStudent) {
            setStudents(students.filter((s) => s.id !== selectedStudent.id))
            setDeleteDialogOpen(false)
            setSelectedStudent(null)
        }
    }

    return (
        <Box >
            <AppBar
                position="static"
                sx={{
                    background: "rgba(255, 255, 255, 0.95)",
                    backdropFilter: "blur(10px)",
                    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
                }}
            >
                <Toolbar>
                    <AccountBalanceIcon sx={{ mr: 2, color: "#667eea", fontSize: 28 }} />
                    <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 700, color: "#333" }}>
                        Student Meal Accounting
                    </Typography>
                    <Link href="/dashboard/accounting/residantial/add" style={{ textDecoration: "none" }}>
                        <Button
                            variant="contained"
                            startIcon={<AddIcon />}
                            sx={{
                                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                                textTransform: "none",
                                fontWeight: 600,
                                px: 3,
                            }}
                        >
                            Add New
                        </Button>
                    </Link>
                </Toolbar>
            </AppBar>

            <Container maxWidth="xl" sx={{ mt: 4 }}>
                {/* Stats Cards */}
                <Grid container spacing={3} sx={{ mb: 4 }}>
                    <Grid item xs={12} sm={6} md={3}>
                        <Card
                            sx={{
                                background: "rgba(255, 255, 255, 0.95)",
                                backdropFilter: "blur(10px)",
                                boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
                                border: "1px solid rgba(255, 255, 255, 0.2)",
                            }}
                        >
                            <CardContent>
                                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                    <Box>
                                        <Typography color="textSecondary" gutterBottom sx={{ fontSize: "0.875rem" }}>
                                            Total Balance
                                        </Typography>
                                        <Typography variant="h5" sx={{ fontWeight: 700, color: totalBalance >= 0 ? "#10b981" : "#ef4444" }}>
                                            ৳{Math.abs(totalBalance).toLocaleString()}
                                        </Typography>
                                    </Box>
                                    {totalBalance >= 0 ? (
                                        <TrendingUpIcon sx={{ fontSize: 40, color: "#10b981", opacity: 0.3 }} />
                                    ) : (
                                        <TrendingDownIcon sx={{ fontSize: 40, color: "#ef4444", opacity: 0.3 }} />
                                    )}
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item xs={12} sm={6} md={3}>
                        <Card
                            sx={{
                                background: "rgba(255, 255, 255, 0.95)",
                                backdropFilter: "blur(10px)",
                                boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
                                border: "1px solid rgba(255, 255, 255, 0.2)",
                            }}
                        >
                            <CardContent>
                                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                    <Box>
                                        <Typography color="textSecondary" gutterBottom sx={{ fontSize: "0.875rem" }}>
                                            Total Students
                                        </Typography>
                                        <Typography variant="h5" sx={{ fontWeight: 700, color: "#667eea" }}>
                                            {students.length}
                                        </Typography>
                                    </Box>
                                    <AccountBalanceIcon sx={{ fontSize: 40, color: "#667eea", opacity: 0.3 }} />
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item xs={12} sm={6} md={3}>
                        <Card
                            sx={{
                                background: "rgba(255, 255, 255, 0.95)",
                                backdropFilter: "blur(10px)",
                                boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
                                border: "1px solid rgba(255, 255, 255, 0.2)",
                            }}
                        >
                            <CardContent>
                                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                    <Box>
                                        <Typography color="textSecondary" gutterBottom sx={{ fontSize: "0.875rem" }}>
                                            Positive Balance
                                        </Typography>
                                        <Typography variant="h5" sx={{ fontWeight: 700, color: "#10b981" }}>
                                            {positiveBalance}
                                        </Typography>
                                    </Box>
                                    <TrendingUpIcon sx={{ fontSize: 40, color: "#10b981", opacity: 0.3 }} />
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item xs={12} sm={6} md={3}>
                        <Card
                            sx={{
                                background: "rgba(255, 255, 255, 0.95)",
                                backdropFilter: "blur(10px)",
                                boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
                                border: "1px solid rgba(255, 255, 255, 0.2)",
                            }}
                        >
                            <CardContent>
                                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                    <Box>
                                        <Typography color="textSecondary" gutterBottom sx={{ fontSize: "0.875rem" }}>
                                            Negative Balance
                                        </Typography>
                                        <Typography variant="h5" sx={{ fontWeight: 700, color: "#ef4444" }}>
                                            {negativeBalance}
                                        </Typography>
                                    </Box>
                                    <TrendingDownIcon sx={{ fontSize: 40, color: "#ef4444", opacity: 0.3 }} />
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>

                {/* Search and Filter */}
                <Paper
                    sx={{
                        p: 3,
                        mb: 3,
                        background: "rgba(255, 255, 255, 0.95)",
                        backdropFilter: "blur(10px)",
                        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
                    }}
                >
                    <Box sx={{ mb: 2 }}>
                        <TextField
                            fullWidth
                            placeholder="Search by student name..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon sx={{ color: "#667eea" }} />
                                    </InputAdornment>
                                ),
                            }}
                            sx={{
                                "& .MuiOutlinedInput-root": {
                                    borderRadius: "12px",
                                    "&:hover fieldset": {
                                        borderColor: "#667eea",
                                    },
                                    "&.Mui-focused fieldset": {
                                        borderColor: "#667eea",
                                    },
                                },
                            }}
                        />
                    </Box>

                    <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                        <ButtonGroup size="small" variant="outlined">
                            {CLASSES.map((cls) => (
                                <Button
                                    key={cls}
                                    onClick={() => setSelectedClass(cls)}
                                    variant={selectedClass === cls ? "contained" : "outlined"}
                                    sx={{
                                        background:
                                            selectedClass === cls ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" : "transparent",
                                        color: selectedClass === cls ? "white" : "#667eea",
                                        borderColor: "#667eea",
                                        textTransform: "none",
                                        fontWeight: 600,
                                    }}
                                >
                                    {cls}
                                </Button>
                            ))}
                        </ButtonGroup>
                    </Box>
                </Paper>

                {/* Students Table */}
                <TableContainer
                    component={Paper}
                    sx={{
                        background: "rgba(255, 255, 255, 0.95)",
                        backdropFilter: "blur(10px)",
                        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
                        borderRadius: "12px",
                        overflow: "hidden",
                    }}
                >
                    <Table>
                        <TableHead>
                            <TableRow sx={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" }}>
                                <TableCell sx={{ color: "white", fontWeight: 700 }}>Student Name</TableCell>
                                <TableCell sx={{ color: "white", fontWeight: 700 }}>Class</TableCell>
                                <TableCell align="right" sx={{ color: "white", fontWeight: 700 }}>
                                    Total Given
                                </TableCell>
                                <TableCell align="right" sx={{ color: "white", fontWeight: 700 }}>
                                    Total Cost
                                </TableCell>
                                <TableCell align="right" sx={{ color: "white", fontWeight: 700 }}>
                                    Balance
                                </TableCell>
                                <TableCell align="center" sx={{ color: "white", fontWeight: 700 }}>
                                    Actions
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredStudents.map((student) => (
                                <TableRow
                                    key={student.id}
                                    sx={{
                                        "&:hover": {
                                            background: "rgba(102, 126, 234, 0.05)",
                                        },
                                        borderBottom: "1px solid rgba(0, 0, 0, 0.05)",
                                    }}
                                >
                                    <TableCell sx={{ fontWeight: 600, color: "#333" }}>{student.name}</TableCell>
                                    <TableCell>
                                        <Chip
                                            label={student.class}
                                            sx={{
                                                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                                                color: "white",
                                                fontWeight: 600,
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell align="right" sx={{ fontWeight: 600, color: "#10b981" }}>
                                        ৳{student.totalGiven.toLocaleString()}
                                    </TableCell>
                                    <TableCell align="right" sx={{ fontWeight: 600, color: "#ef4444" }}>
                                        ৳{student.totalCost.toLocaleString()}
                                    </TableCell>
                                    <TableCell align="right">
                                        <Typography
                                            sx={{
                                                fontWeight: 700,
                                                color: student.balance >= 0 ? "#10b981" : "#ef4444",
                                                fontSize: "1rem",
                                            }}
                                        >
                                            ৳{Math.abs(student.balance).toLocaleString()}
                                        </Typography>
                                    </TableCell>
                                    <TableCell align="center">
                                        <Box sx={{ display: "flex", gap: 1, justifyContent: "center" }}>
                                            <IconButton size="small" sx={{ color: "#667eea" }}>
                                                <EditIcon fontSize="small" />
                                            </IconButton>
                                            <IconButton size="small" sx={{ color: "#ef4444" }} onClick={() => handleDeleteClick(student)}>
                                                <DeleteIcon fontSize="small" />
                                            </IconButton>
                                        </Box>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                {filteredStudents.length === 0 && (
                    <Paper
                        sx={{
                            p: 4,
                            textAlign: "center",
                            background: "rgba(255, 255, 255, 0.95)",
                            backdropFilter: "blur(10px)",
                            mt: 2,
                        }}
                    >
                        <Typography color="textSecondary">No students found matching your criteria.</Typography>
                    </Paper>
                )}
            </Container>

            {/* Delete Confirmation Dialog */}
            <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
                <DialogTitle sx={{ fontWeight: 700 }}>Delete Student</DialogTitle>
                <DialogContent>
                    <Typography>
                        Are you sure you want to delete {selectedStudent?.name}? This action cannot be undone.
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
                    <Button onClick={handleDeleteConfirm} variant="contained" color="error">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
}
