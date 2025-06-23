"use client"

import { useState } from "react"
import {
    Box,
    Grid,
    Card,
    CardContent,
    Typography,
    Button,
    TextField,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Chip,
    Avatar,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    InputAdornment,
    IconButton,
    Container,
} from "@mui/material"
import { Search, Add, Download, FilterList, Payment, Visibility } from "@mui/icons-material"

export default function FeeCollection() {
    const [searchTerm, setSearchTerm] = useState("")
    const [classFilter, setClassFilter] = useState("all")
    const [statusFilter, setStatusFilter] = useState("all")

    const students = [
        {
            id: 1,
            name: "আহমেদ হাসান",
            class: "6A",
            roll: "01",
            feeAmount: 2500,
            paidAmount: 2500,
            dueAmount: 0,
            status: "Paid",
            lastPayment: "2024-01-15",
        },
        {
            id: 2,
            name: "ফাতিমা খাতুন",
            class: "6B",
            roll: "05",
            feeAmount: 2500,
            paidAmount: 1500,
            dueAmount: 1000,
            status: "Partial",
            lastPayment: "2024-01-10",
        },
        {
            id: 3,
            name: "রহিম উদ্দিন",
            class: "6C",
            roll: "12",
            feeAmount: 2500,
            paidAmount: 0,
            dueAmount: 2500,
            status: "Due",
            lastPayment: "-",
        },
        {
            id: 4,
            name: "সালমা বেগম",
            class: "6A",
            roll: "08",
            feeAmount: 2500,
            paidAmount: 2500,
            dueAmount: 0,
            status: "Paid",
            lastPayment: "2024-01-14",
        },
        {
            id: 5,
            name: "করিম মিয়া",
            class: "6B",
            roll: "15",
            feeAmount: 2500,
            paidAmount: 2000,
            dueAmount: 500,
            status: "Partial",
            lastPayment: "2024-01-12",
        },
    ]

    const getStatusChip = (status: string) => {
        const statusConfig = {
            Paid: { label: "পরিশোধিত", color: "success" as const },
            Partial: { label: "আংশিক", color: "warning" as const },
            Due: { label: "বকেয়া", color: "error" as const },
        }

        const config = statusConfig[status as keyof typeof statusConfig] || { label: status, color: "default" as const }

        return <Chip label={config.label} color={config.color} size="small" sx={{ fontWeight: 600 }} />
    }

    return (
        <Container maxWidth='xl'>
            {/* Header */}
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
                <Box>
                    <Typography variant="h4" fontWeight={700} gutterBottom>
                        Fee Collection
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        বেতন আদায় ব্যবস্থাপনা - ছাত্রদের বেতন সংগ্রহ ও ট্র্যাকিং
                    </Typography>
                </Box>
                <Button variant="contained" startIcon={<Add />} size="large" sx={{ borderRadius: 2 }}>
                    Collect Fee
                </Button>
            </Box>

            {/* Summary Cards */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid item xs={12} sm={6} md={3}>
                    <Card>
                        <CardContent sx={{ textAlign: "center" }}>
                            <Avatar sx={{ bgcolor: "primary.light", mx: "auto", mb: 2 }}>
                                <Payment />
                            </Avatar>
                            <Typography variant="h4" fontWeight={700} color="primary">
                                90
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                মোট ছাত্র সংখ্যা
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Card>
                        <CardContent sx={{ textAlign: "center" }}>
                            <Avatar sx={{ bgcolor: "success.light", mx: "auto", mb: 2 }}>
                                <Payment />
                            </Avatar>
                            <Typography variant="h4" fontWeight={700} color="success.main">
                                ৳ 1,90,000
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                আদায়কৃত বেতন
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Card>
                        <CardContent sx={{ textAlign: "center" }}>
                            <Avatar sx={{ bgcolor: "error.light", mx: "auto", mb: 2 }}>
                                <Payment />
                            </Avatar>
                            <Typography variant="h4" fontWeight={700} color="error.main">
                                ৳ 35,000
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                বকেয়া পরিমাণ
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Card>
                        <CardContent sx={{ textAlign: "center" }}>
                            <Avatar sx={{ bgcolor: "info.light", mx: "auto", mb: 2 }}>
                                <Payment />
                            </Avatar>
                            <Typography variant="h4" fontWeight={700} color="info.main">
                                84%
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                আদায়ের হার
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {/* Fee Collection Management */}
            <Card>
                <CardContent>
                    <Typography variant="h6" fontWeight={600} gutterBottom>
                        Fee Collection Management
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                        ছাত্রদের বেতন আদায়ের তালিকা ও ব্যবস্থাপনা
                    </Typography>

                    {/* Filters */}
                    <Grid container spacing={2} sx={{ mb: 3 }}>
                        <Grid item xs={12} md={4}>
                            <TextField
                                fullWidth
                                placeholder="ছাত্রের নাম বা রোল নম্বর লিখুন..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Search />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} md={2}>
                            <FormControl fullWidth>
                                <InputLabel>Class</InputLabel>
                                <Select value={classFilter} label="Class" onChange={(e) => setClassFilter(e.target.value)}>
                                    <MenuItem value="all">All Classes</MenuItem>
                                    <MenuItem value="6a">Class 6A</MenuItem>
                                    <MenuItem value="6b">Class 6B</MenuItem>
                                    <MenuItem value="6c">Class 6C</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={2}>
                            <FormControl fullWidth>
                                <InputLabel>Status</InputLabel>
                                <Select value={statusFilter} label="Status" onChange={(e) => setStatusFilter(e.target.value)}>
                                    <MenuItem value="all">All Status</MenuItem>
                                    <MenuItem value="paid">Paid</MenuItem>
                                    <MenuItem value="partial">Partial</MenuItem>
                                    <MenuItem value="due">Due</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={2}>
                            <Button variant="outlined" fullWidth startIcon={<FilterList />} sx={{ height: "56px" }}>
                                Filter
                            </Button>
                        </Grid>
                        <Grid item xs={12} md={2}>
                            <Button variant="outlined" fullWidth startIcon={<Download />} sx={{ height: "56px" }}>
                                Export
                            </Button>
                        </Grid>
                    </Grid>

                    {/* Students Table */}
                    <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
                        <Table>
                            <TableHead>
                                <TableRow sx={{ bgcolor: "grey.50" }}>
                                    <TableCell sx={{ fontWeight: 600 }}>Student Name (ছাত্রের নাম)</TableCell>
                                    <TableCell sx={{ fontWeight: 600 }}>Class & Roll</TableCell>
                                    <TableCell sx={{ fontWeight: 600 }}>Fee Amount (বেতন)</TableCell>
                                    <TableCell sx={{ fontWeight: 600 }}>Paid Amount (পরিশোধিত)</TableCell>
                                    <TableCell sx={{ fontWeight: 600 }}>Due Amount (বকেয়া)</TableCell>
                                    <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                                    <TableCell sx={{ fontWeight: 600 }}>Last Payment</TableCell>
                                    <TableCell sx={{ fontWeight: 600 }}>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {students.map((student) => (
                                    <TableRow key={student.id} hover>
                                        <TableCell>
                                            <Typography variant="body2" fontWeight={600}>
                                                {student.name}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant="body2">
                                                {student.class} - {student.roll}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant="body2" fontWeight={600}>
                                                ৳ {student.feeAmount.toLocaleString()}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant="body2" fontWeight={600} color="success.main">
                                                ৳ {student.paidAmount.toLocaleString()}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant="body2" fontWeight={600} color="error.main">
                                                ৳ {student.dueAmount.toLocaleString()}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>{getStatusChip(student.status)}</TableCell>
                                        <TableCell>
                                            <Typography variant="body2">{student.lastPayment}</Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Box sx={{ display: "flex", gap: 1 }}>
                                                <Button size="small" variant="contained" startIcon={<Payment />}>
                                                    Collect
                                                </Button>
                                                <IconButton size="small">
                                                    <Visibility />
                                                </IconButton>
                                            </Box>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </CardContent>
            </Card>
        </Container>
    )
}
