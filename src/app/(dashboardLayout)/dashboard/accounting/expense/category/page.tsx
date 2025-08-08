/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState, useEffect } from "react"
import {
    Container,
    TextField,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TablePagination,
    InputAdornment,
    ThemeProvider,
    IconButton,
    Box,
    Chip,
    CircularProgress,
    Typography,
} from "@mui/material"
import {
    Search as SearchIcon,
    Delete,
    Edit,
} from "@mui/icons-material"
import Swal from "sweetalert2"
import { customTheme } from "@/ThemeStyle"
import ExpenseCategoryModal from "./__components/ExpenseCategoryModal"
import { useDeleteExpenseCategoryMutation, useGetAllExpenseCategoriesQuery } from "@/redux/api/expenseCategoryApi"

export default function IncomeCategoryPage() {
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(10)
    const [searchTerm, setSearchTerm] = useState("")
    const [open, setOpen] = useState(false)
    const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null)
    const [categories, setCategories] = useState<any[]>([])

    const {
        data: expenseCategories,
        isLoading,
        refetch,
    } = useGetAllExpenseCategoriesQuery({
        limit: rowsPerPage,
        page: page + 1,
        searchTerm,
    })
    console.log('expens', expenseCategories)

    const [deleteExpenseCategory] = useDeleteExpenseCategoryMutation()
    const theme = customTheme

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value)
        setPage(0)
    }

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10))
        setPage(0)
    }

    const handleDelete = async (id: string) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be delete this income!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#6366f1",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await deleteExpenseCategory(id).unwrap()
                    if (res.success) {
                        Swal.fire("Deleted!", "Your category has been deleted.", "success")
                        refetch()
                    }
                } catch (error: any) {
                    Swal.fire(
                        "Failed!",
                        error?.data?.message || "Could not delete category",
                        "error"
                    )
                }
            }
        })
    }

    const handleEdit = (id: string) => {
        setSelectedCategoryId(id)
        setOpen(true)
    }

    useEffect(() => {
        if (expenseCategories?.data?.data) {
            setCategories(expenseCategories.data.data)
        }
    }, [expenseCategories])

    return (
        <ThemeProvider theme={theme}>
            <div
                className="flex-grow rounded-4xl"
                style={{
                    background: `linear-gradient(135deg, rgba(63, 81, 181, 0.2) 0%, rgba(245, 245, 245, 0.7) 100%)`,
                }}
            >
                <Container maxWidth="xl" className="mt-0 mb-8 rounded-lg">

                    <div>
                        {/* Header */}
                        <div className="md:flex justify-between items-center mb-3 flex-wrap gap-2 pt-5">
                            <div className="text-2xl md:text-3xl font-bold text-gray-900 flex items-center">

                                <h1>Expense Category</h1>
                            </div>
                            <div className="flex gap-2">
                                <Button
                                    variant="contained"
                                    onClick={() => {
                                        setSelectedCategoryId(null)
                                        setOpen(true)
                                    }}
                                    sx={{
                                        background: "linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)",
                                        borderRadius: "20px",
                                        boxShadow: "0 4px 10px rgba(99, 102, 241, 0.3)",
                                        "&:hover": {
                                            boxShadow: "0 6px 15px rgba(99, 102, 241, 0.4)",
                                        },
                                    }}
                                >
                                    Create Income Category
                                </Button>
                            </div>
                        </div>

                        {/* Search and Total */}
                        <div className="mb-4 overflow-hidden bg-white shadow-sm rounded-3xl">
                            <div className="p-4 border-b border-gray-100">
                                <div className="grid grid-cols-12 gap-4 items-center">
                                    <div className="col-span-12 md:col-span-5">
                                        <TextField
                                            fullWidth
                                            placeholder="Search categories..."
                                            variant="outlined"
                                            value={searchTerm}
                                            onChange={handleSearch}
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <SearchIcon color="action" />
                                                    </InputAdornment>
                                                ),
                                                sx: {
                                                    borderRadius: "12px",
                                                    bgcolor: "background.paper",
                                                    "& .MuiOutlinedInput-notchedOutline": {
                                                        borderColor: "rgba(0, 0, 0, 0.1)",
                                                    },
                                                },
                                            }}
                                        />
                                    </div>
                                    <div className="col-span-12 md:col-span-7 flex justify-end">
                                        <Box display="flex" alignItems="center" gap={1}>
                                            <Typography variant="body2" color="textSecondary">
                                                Total Categories:
                                            </Typography>
                                            <Chip
                                                label={expenseCategories?.data?.meta?.total || 0}
                                                color="primary"
                                                size="small"
                                            />
                                        </Box>
                                    </div>
                                </div>
                            </div>

                            {/* Table */}
                            {isLoading ? (
                                <Box display="flex" justifyContent="center" py={8}>
                                    <CircularProgress size={60} sx={{ color: "#6366f1" }} />
                                </Box>
                            ) : (
                                <>
                                    <TableContainer>
                                        <Table>
                                            <TableHead sx={{ bgcolor: "#f9fafb" }}>
                                                <TableRow>
                                                    <TableCell sx={{ fontWeight: 700, color: "#374151" }}>
                                                        SL. No.
                                                    </TableCell>
                                                    <TableCell sx={{ fontWeight: 700, color: "#374151" }}>
                                                        Category Name
                                                    </TableCell>
                                                    <TableCell
                                                        align="right"
                                                        sx={{ fontWeight: 700, color: "#374151" }}
                                                    >
                                                        Actions
                                                    </TableCell>
                                                </TableRow>
                                            </TableHead>

                                            <TableBody>
                                                {categories.length > 0 ? (
                                                    categories.map((category: any, index: number) => (
                                                        <TableRow key={category._id} hover>
                                                            <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                                                            <TableCell>
                                                                <Chip
                                                                    label={category.name}
                                                                    sx={{
                                                                        bgcolor: "#e0e7ff",
                                                                        color: "#4f46e5",
                                                                        fontWeight: 600,
                                                                        borderRadius: "6px",
                                                                        px: 1.5,
                                                                        py: 0.5,
                                                                        fontSize: "0.875rem",
                                                                    }}
                                                                />
                                                            </TableCell>
                                                            <TableCell align="right">
                                                                <IconButton
                                                                    onClick={() => handleEdit(category._id)}
                                                                    sx={{
                                                                        color: "#6366f1",
                                                                        "&:hover": {
                                                                            bgcolor: "rgba(99, 102, 241, 0.1)",
                                                                        },
                                                                    }}
                                                                >
                                                                    <Edit />
                                                                </IconButton>
                                                                <IconButton
                                                                    onClick={() => handleDelete(category._id)}
                                                                    sx={{
                                                                        color: "#ef4444",
                                                                        "&:hover": {
                                                                            bgcolor: "rgba(239, 68, 68, 0.1)",
                                                                        },
                                                                    }}
                                                                >
                                                                    <Delete />
                                                                </IconButton>
                                                            </TableCell>
                                                        </TableRow>
                                                    ))
                                                ) : (
                                                    <TableRow>
                                                        <TableCell colSpan={3}>
                                                            <Box py={4} textAlign="center">
                                                                <Typography variant="body1" color="textSecondary">
                                                                    No income categories found
                                                                </Typography>
                                                            </Box>
                                                        </TableCell>
                                                    </TableRow>
                                                )}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>

                                    {/* Pagination */}
                                    {expenseCategories?.data?.meta?.total > rowsPerPage && (
                                        <TablePagination
                                            rowsPerPageOptions={[15, 25, 50]}
                                            component="div"
                                            count={expenseCategories?.data?.meta?.total || 0}
                                            rowsPerPage={rowsPerPage}
                                            page={page}
                                            onPageChange={handleChangePage}
                                            onRowsPerPageChange={handleChangeRowsPerPage}
                                            sx={{
                                                borderTop: "1px solid rgba(0, 0, 0, 0.06)",
                                                "& .MuiTablePagination-toolbar": {
                                                    padding: "12px 16px",
                                                },
                                            }}
                                        />
                                    )}
                                </>
                            )}
                        </div>
                    </div>

                </Container>
            </div>

            {/* Income Category Modal */}
            <ExpenseCategoryModal
                open={open}
                setOpen={setOpen}
                categoryId={selectedCategoryId}
            />
        </ThemeProvider>
    )
}
