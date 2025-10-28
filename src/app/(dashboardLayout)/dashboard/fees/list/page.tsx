"use client"

import { useState } from "react"
import {
    Box,
    Container,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Button,
    Card,
    CardContent,
    Grid,
    Typography,
    Chip,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    IconButton,
    InputAdornment,
    MenuItem,
    Tooltip,
} from "@mui/material"
import {
    Search as SearchIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
    Add as AddIcon,
    TrendingUp as TrendingUpIcon,
    TrendingDown as TrendingDownIcon,
    AccountBalance as AccountBalanceIcon,
} from "@mui/icons-material"
import Link from "next/link"

interface FeeRecord {
    id: string
    studentName: string
    class: string
    month: string
    feeName: string
    feeAmount: number
    note: string
    date: string
}

// Sample data
const initialFeeData: FeeRecord[] = [
    {
        id: "1",
        studentName: "Abrar Chowdhury",
        class: "One (1)B",
        month: "January",
        feeName: "Monthly Fee",
        feeAmount: 3000,
        note: "Regular monthly fee",
        date: "2024-01-15",
    },
    {
        id: "2",
        studentName: "Omayer Bin Ismail",
        class: "One (1)A",
        month: "January",
        feeName: "Admission Fee",
        feeAmount: 2000,
        note: "Admission fee paid",
        date: "2024-01-10",
    },
    {
        id: "3",
        studentName: "Kalid Walid",
        class: "One (1)B",
        month: "February",
        feeName: "Monthly Fee",
        feeAmount: 2500,
        note: "Regular monthly fee",
        date: "2024-02-05",
    },
]

export default function FeesListPage() {
    const [feeData, setFeeData] = useState<FeeRecord[]>(initialFeeData)
    const [searchTerm, setSearchTerm] = useState("")
    const [classFilter, setClassFilter] = useState("All")
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
    const [selectedFeeId, setSelectedFeeId] = useState<string | null>(null)

    const classes = [
        "All",
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

    const filteredData = feeData.filter((fee) => {
        const matchesSearch = fee.studentName.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesClass = classFilter === "All" || fee.class === classFilter
        return matchesSearch && matchesClass
    })

    const totalFees = filteredData.reduce((sum, fee) => sum + fee.feeAmount, 0)
    const totalRecords = filteredData.length
    const averageFee = totalRecords > 0 ? totalFees / totalRecords : 0

    const handleDeleteClick = (id: string) => {
        setSelectedFeeId(id)
        setDeleteDialogOpen(true)
    }

    const handleDeleteConfirm = () => {
        if (selectedFeeId) {
            setFeeData(feeData.filter((fee) => fee.id !== selectedFeeId))
        }
        setDeleteDialogOpen(false)
        setSelectedFeeId(null)
    }

    return (
        <Box

        >
            <Container maxWidth="xl">

                <Box sx={{ mb: 4 }}>
                    <Typography
                        variant="h3"
                        sx={{
                            fontWeight: "bold",
                        }}
                    >
                        Fee Management
                    </Typography>
                    <Typography variant="body1" sx={{ color: "rgba(255,255,255,0.9)" }}>
                        Track and manage all student fee payments
                    </Typography>
                </Box>

                {/* Stats Cards */}
                <Grid container spacing={3} sx={{ mb: 4 }}>
                    <Grid item xs={12} sm={6} md={3}>
                        <Card
                            sx={{
                                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                                color: "white",
                                boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
                            }}
                        >
                            <CardContent>
                                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                    <Box>
                                        <Typography color="rgba(255,255,255,0.8)" variant="body2" sx={{ mb: 1 }}>
                                            Total Fees
                                        </Typography>
                                        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                                            ৳{totalFees.toLocaleString()}
                                        </Typography>
                                    </Box>
                                    <AccountBalanceIcon sx={{ fontSize: 40, opacity: 0.7 }} />
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item xs={12} sm={6} md={3}>
                        <Card
                            sx={{
                                background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
                                color: "white",
                                boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
                            }}
                        >
                            <CardContent>
                                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                    <Box>
                                        <Typography color="rgba(255,255,255,0.8)" variant="body2" sx={{ mb: 1 }}>
                                            Total Records
                                        </Typography>
                                        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                                            {totalRecords}
                                        </Typography>
                                    </Box>
                                    <TrendingUpIcon sx={{ fontSize: 40, opacity: 0.7 }} />
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item xs={12} sm={6} md={3}>
                        <Card
                            sx={{
                                background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
                                color: "white",
                                boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
                            }}
                        >
                            <CardContent>
                                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                    <Box>
                                        <Typography color="rgba(255,255,255,0.8)" variant="body2" sx={{ mb: 1 }}>
                                            Average Fee
                                        </Typography>
                                        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                                            ৳{averageFee.toLocaleString("en-US", { maximumFractionDigits: 0 })}
                                        </Typography>
                                    </Box>
                                    <TrendingDownIcon sx={{ fontSize: 40, opacity: 0.7 }} />
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item xs={12} sm={6} md={3}>
                        <Card
                            sx={{
                                background: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
                                color: "white",
                                boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
                            }}
                        >
                            <CardContent>
                                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                    <Box>
                                        <Typography color="rgba(255,255,255,0.8)" variant="body2" sx={{ mb: 1 }}>
                                            Fee Types
                                        </Typography>
                                        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                                            {new Set(filteredData.map((f) => f.feeName)).size}
                                        </Typography>
                                    </Box>
                                    <AccountBalanceIcon sx={{ fontSize: 40, opacity: 0.7 }} />
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
                        background: "rgba(255,255,255,0.95)",
                        backdropFilter: "blur(10px)",
                        boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
                        borderRadius: "16px",
                    }}
                >
                    <Grid container spacing={2} sx={{ mb: 2 }}>
                        <Grid item xs={12} md={6}>
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
                                        backgroundColor: "#f5f5f5",
                                    },
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                select
                                fullWidth
                                value={classFilter}
                                onChange={(e) => setClassFilter(e.target.value)}
                                sx={{
                                    "& .MuiOutlinedInput-root": {
                                        borderRadius: "12px",
                                        backgroundColor: "#f5f5f5",
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

                    <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end" }}>
                        <Link href="/dashboard/fees/add">
                            <Button
                                variant="contained"
                                startIcon={<AddIcon />}
                                sx={{
                                    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                                    borderRadius: "12px",
                                    textTransform: "none",
                                    fontSize: "1rem",
                                    px: 3,
                                }}
                            >
                                Add New Fee
                            </Button>
                        </Link>
                    </Box>
                </Paper>

                {/* Table */}
                <TableContainer
                    component={Paper}
                    sx={{
                        background: "rgba(255,255,255,0.95)",
                        backdropFilter: "blur(10px)",
                        boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
                        borderRadius: "16px",
                        overflow: "hidden",
                    }}
                >
                    <Table>
                        <TableHead>
                            <TableRow
                                sx={{
                                    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                                    "& th": {
                                        color: "white",
                                        fontWeight: "bold",
                                        fontSize: "0.95rem",
                                    },
                                }}
                            >
                                <TableCell>Student Name</TableCell>
                                <TableCell>Class</TableCell>
                                <TableCell>Month</TableCell>
                                <TableCell>Fee Name</TableCell>
                                <TableCell align="right">Amount</TableCell>
                                <TableCell>Note</TableCell>
                                <TableCell align="center">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredData.map((fee) => (
                                <TableRow
                                    key={fee.id}
                                    sx={{
                                        "&:hover": {
                                            backgroundColor: "rgba(102, 126, 234, 0.05)",
                                        },
                                        borderBottom: "1px solid #e0e0e0",
                                    }}
                                >
                                    <TableCell sx={{ fontWeight: "500" }}>{fee.studentName}</TableCell>
                                    <TableCell>
                                        <Chip label={fee.class} size="small" variant="outlined" sx={{ borderRadius: "8px" }} />
                                    </TableCell>
                                    <TableCell>{fee.month}</TableCell>
                                    <TableCell>
                                        <Chip
                                            label={fee.feeName}
                                            size="small"
                                            sx={{
                                                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                                                color: "white",
                                                borderRadius: "8px",
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell align="right" sx={{ fontWeight: "bold", color: "#667eea" }}>
                                        ৳{fee.feeAmount.toLocaleString()}
                                    </TableCell>
                                    <TableCell sx={{ maxWidth: "200px", overflow: "hidden", textOverflow: "ellipsis" }}>
                                        {fee.note}
                                    </TableCell>
                                    <TableCell align="center">
                                        <Tooltip title="Edit">
                                            <IconButton size="small" sx={{ color: "#667eea" }}>
                                                <EditIcon fontSize="small" />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Delete">
                                            <IconButton size="small" sx={{ color: "#f44336" }} onClick={() => handleDeleteClick(fee.id)}>
                                                <DeleteIcon fontSize="small" />
                                            </IconButton>
                                        </Tooltip>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                {filteredData.length === 0 && (
                    <Paper
                        sx={{
                            p: 4,
                            textAlign: "center",
                            background: "rgba(255,255,255,0.95)",
                            backdropFilter: "blur(10px)",
                            borderRadius: "16px",
                        }}
                    >
                        <Typography color="textSecondary">No fee records found</Typography>
                    </Paper>
                )}
            </Container>

            {/* Delete Confirmation Dialog */}
            <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
                <DialogTitle>Delete Fee Record</DialogTitle>
                <DialogContent>
                    <Typography>Are you sure you want to delete this fee record? This action cannot be undone.</Typography>
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
