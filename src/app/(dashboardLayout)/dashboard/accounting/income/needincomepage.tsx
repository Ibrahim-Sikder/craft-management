// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use client"

// import { useState } from "react"
// import {
//   Box,
//   Grid,
//   CardContent,
//   Typography,
//   Button,
//   TextField,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Chip,
//   Avatar,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   InputAdornment,
//   IconButton,
//   Container,
//   Fab,
// } from "@mui/material"
// import {
//   Search,
//   Add,
//   Download,
//   TrendingUp,
//   School,
//   CardGiftcard,
//   Event,
//   Edit,
//   MonetizationOn,
//   AccountBalance,
//   Delete,
// } from "@mui/icons-material"
// import { GlassCard, GradientCard } from "@/style/customeStyle"
// import { useDeleteIncomeMutation, useGetAllIncomesQuery } from "@/redux/api/incomeApi"
// import AddIncomeModal from "../_components/AddIncomeDialog"
// import Swal from "sweetalert2"
// import { Income } from "@/interface"

// export default function IncomeManagement() {
//   const [open, setOpen] = useState(false)
//   const [searchTerm, setSearchTerm] = useState("")
//   const [categoryFilter, setCategoryFilter] = useState("all")
//   const [statusFilter, setStatusFilter] = useState("all")
//   const [editData, setEditData] = useState<Income | null>(null)
//   const [deleteIncome] = useDeleteIncomeMutation()
//   const { data, isLoading } = useGetAllIncomesQuery({})
  
//   // Access the incomes array from the API response
//   const incomeRecords = data?.data?.incomes || []

//   // Calculate dynamic statistics
//   const calculateStats = () => {
//     if (!incomeRecords.length) {
//       return {
//         totalIncome: 0,
//         studentFees: 0,
//         otherSources: 0,
//         pendingIncome: 0,
//       }
//     }

//     const currentMonth = new Date().getMonth()
//     const currentYear = new Date().getFullYear()

//     let totalIncome = 0
//     let studentFees = 0
//     let otherSources = 0
//     let pendingIncome = 0

//     incomeRecords.forEach((income: Income) => {
//       const incomeDate = new Date(income.incomeDate)
//       const amount = income.totalAmount || 0

//       // Check if income is from current month
//       if (incomeDate.getMonth() === currentMonth && incomeDate.getFullYear() === currentYear) {
//         totalIncome += amount

//         // Categorize income
//         const category = income.category?.name || ""
//         if (
//           category.toLowerCase().includes("student") ||
//           category.toLowerCase().includes("ছাত্র") ||
//           category.toLowerCase().includes("tuition")
//         ) {
//           studentFees += amount
//         } else {
//           otherSources += amount
//         }
//       }

//       // Calculate pending
//       if (income.status === "pending" || income.status === "Pending") {
//         pendingIncome += amount
//       }
//     })

//     return { totalIncome, studentFees, otherSources, pendingIncome }
//   }

//   const stats = calculateStats()

//   // Calculate income categories for the chart
//   const calculateIncomeCategories = () => {
//     const categoryMap = new Map()
//     let totalAmount = 0

//     incomeRecords.forEach((income: Income) => {
//       const category = income.category?.name || "Other"
//       const amount = income.totalAmount || 0

//       totalAmount += amount

//       if (categoryMap.has(category)) {
//         categoryMap.set(category, categoryMap.get(category) + amount)
//       } else {
//         categoryMap.set(category, amount)
//       }
//     })

//     const categories = Array.from(categoryMap.entries()).map(([name, total], index) => ({
//       name,
//       total,
//       percentage: totalAmount > 0 ? ((total / totalAmount) * 100).toFixed(1) : "0",
//       color: [
//         "#2196F3",
//         "#4CAF50",
//         "#FF9800",
//         "#9C27B0",
//         "#F44336",
//         "#00BCD4",
//         "#795548",
//         "#607D8B",
//         "#E91E63",
//         "#3F51B5",
//       ][index % 10],
//     }))

//     return categories.slice(0, 5) // Show top 5 categories
//   }

//   const incomeCategories = calculateIncomeCategories()

//   const handleDeleteIncome = async (id: string) => {
//     try {
//       const result = await Swal.fire({
//         title: "Are you sure?",
//         text: `You want to delete this income?`,
//         icon: "warning",
//         showCancelButton: true,
//         confirmButtonColor: "#3085d6",
//         cancelButtonColor: "#d33",
//         confirmButtonText: "Yes, delete it!"
//       })

//       if (result.isConfirmed) {
//         await deleteIncome(id).unwrap()

//         Swal.fire({
//           title: "Deleted!",
//           text: `Income has been deleted successfully.`,
//           icon: "success"
//         })
//       }
//     } catch (err: any) {
//       Swal.fire({
//         title: "Error!",
//         text: err.data?.message || "Failed to delete income",
//         icon: "error"
//       })
//     }
//   }

//   const getStatusChip = (status: string) => {
//     const statusLower = status?.toLowerCase() || "completed"
//     switch (statusLower) {
//       case "received":
//       case "completed":
//         return (
//           <Chip
//             label="প্রাপ্ত"
//             sx={{
//               bgcolor: "#e8f5e8",
//               color: "#2e7d32",
//               fontWeight: 600,
//               borderRadius: "20px",
//             }}
//           />
//         )
//       case "pending":
//         return (
//           <Chip
//             label="অপেক্ষমাণ"
//             sx={{
//               bgcolor: "#fff3e0",
//               color: "#f57c00",
//               fontWeight: 600,
//               borderRadius: "20px",
//             }}
//           />
//         )
//       case "overdue":
//         return (
//           <Chip
//             label="বিলম্বিত"
//             sx={{
//               bgcolor: "#ffebee",
//               color: "#d32f2f",
//               fontWeight: 600,
//               borderRadius: "20px",
//             }}
//           />
//         )
//       default:
//         return (
//           <Chip
//             label="সম্পন্ন"
//             sx={{
//               bgcolor: "#e8f5e8",
//               color: "#2e7d32",
//               fontWeight: 600,
//               borderRadius: "20px",
//             }}
//           />
//         )
//     }
//   }

//   const getIncomeIcon = (category: string) => {
//     const cat = (category || "").toLowerCase()
//     if (cat.includes("student") || cat.includes("ছাত্র") || cat.includes("tuition")) {
//       return <School />
//     } else if (cat.includes("donation") || cat.includes("দান")) {
//       return <CardGiftcard />
//     } else if (cat.includes("grant") || cat.includes("অনুদান")) {
//       return <AccountBalance />
//     } else {
//       return <MonetizationOn />
//     }
//   }

//   const handleEdit = (income: Income) => {
//     setEditData(income)
//     setOpen(true)
//   }

//   const handleAddNew = () => {
//     setEditData(null)
//     setOpen(true)
//   }

//   const handleClose = () => {
//     setOpen(false)
//     setEditData(null)
//   }

//   // Filter income records
//   const filteredRecords = incomeRecords.filter((income: Income) => {
//     const matchesSearch =
//       searchTerm === "" ||
//       (income.note || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
//       (income.category?.name || "").toLowerCase().includes(searchTerm.toLowerCase())

//     const matchesCategory =
//       categoryFilter === "all" ||
//       (income.category?.name || "").toLowerCase().includes(categoryFilter.toLowerCase())

//     const matchesStatus =
//       statusFilter === "all" || (income.status || "completed").toLowerCase() === statusFilter.toLowerCase()

//     return matchesSearch && matchesCategory && matchesStatus
//   })

//   if (isLoading) {
//     return (
//       <Container maxWidth="xl">
//         <Box sx={{ py: 4, textAlign: "center" }}>
//           <Typography variant="h6">Loading income data...</Typography>
//         </Box>
//       </Container>
//     )
//   }

//   return (
//     <Container maxWidth="xl">
//       <Box sx={{ py: 4 }}>
//         {/* Header */}
//         <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 6 }}>
//           <Box>
//             <Typography
//               variant="h3"
//               sx={{
//                 fontWeight: 800,
//                 background: "linear-gradient(135deg, #4CAF50 0%, #2196F3 100%)",
//                 backgroundClip: "text",
//                 WebkitBackgroundClip: "text",
//                 WebkitTextFillColor: "transparent",
//                 mb: 1,
//               }}
//             >
//               Income Management
//             </Typography>
//             <Typography variant="h6" sx={{ color: "#666", fontWeight: 500 }}>
//               আয় ব্যবস্থাপনা - স্কুলের সকল আয়ের উৎস ও ট্র্যাকিং
//             </Typography>
//           </Box>
//           <Fab
//             variant="extended"
//             onClick={handleAddNew}
//             sx={{
//               background: "linear-gradient(135deg, #4CAF50 0%, #45a049 100%)",
//               color: "white",
//               px: 4,
//               py: 2,
//               borderRadius: "50px",
//               boxShadow: "0 8px 25px rgba(76, 175, 80, 0.3)",
//               "&:hover": {
//                 transform: "translateY(-2px)",
//                 boxShadow: "0 12px 35px rgba(76, 175, 80, 0.4)",
//               },
//             }}
//           >
//             <Add sx={{ mr: 1 }} />
//             Add Income
//           </Fab>
//         </Box>

//         {/* Summary Cards */}
//         <Grid container spacing={4} sx={{ mb: 6 }}>
//           <Grid item xs={12} sm={6} md={3}>
//             <GradientCard bgcolor="linear-gradient(135deg, #4CAF50 0%, #45a049 100%)">
//               <CardContent sx={{ p: 4 }}>
//                 <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
//                   <Box>
//                     <Typography variant="body2" sx={{ opacity: 0.9, mb: 1 }}>
//                       এই মাসের মোট আয়
//                     </Typography>
//                     <Typography variant="h3" sx={{ fontWeight: 800 }}>
//                       ৳ {stats.totalIncome.toLocaleString()}
//                     </Typography>
//                   </Box>
//                   <Avatar sx={{ bgcolor: "rgba(255,255,255,0.2)", width: 60, height: 60 }}>
//                     <TrendingUp sx={{ fontSize: 30 }} />
//                   </Avatar>
//                 </Box>
//               </CardContent>
//             </GradientCard>
//           </Grid>
//           <Grid item xs={12} sm={6} md={3}>
//             <GradientCard bgcolor="linear-gradient(135deg, #2196F3 0%, #1976d2 100%)">
//               <CardContent sx={{ p: 4 }}>
//                 <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
//                   <Box>
//                     <Typography variant="body2" sx={{ opacity: 0.9, mb: 1 }}>
//                       ছাত্র বেতন আয়
//                     </Typography>
//                     <Typography variant="h3" sx={{ fontWeight: 800 }}>
//                       ৳ {stats.studentFees.toLocaleString()}
//                     </Typography>
//                   </Box>
//                   <Avatar sx={{ bgcolor: "rgba(255,255,255,0.2)", width: 60, height: 60 }}>
//                     <School sx={{ fontSize: 30 }} />
//                   </Avatar>
//                 </Box>
//               </CardContent>
//             </GradientCard>
//           </Grid>
//           <Grid item xs={12} sm={6} md={3}>
//             <GradientCard bgcolor="linear-gradient(135deg, #9c27b0 0%, #7b1fa2 100%)">
//               <CardContent sx={{ p: 4 }}>
//                 <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
//                   <Box>
//                     <Typography variant="body2" sx={{ opacity: 0.9, mb: 1 }}>
//                       অন্যান্য উৎস
//                     </Typography>
//                     <Typography variant="h3" sx={{ fontWeight: 800 }}>
//                       ৳ {stats.otherSources.toLocaleString()}
//                     </Typography>
//                   </Box>
//                   <Avatar sx={{ bgcolor: "rgba(255,255,255,0.2)", width: 60, height: 60 }}>
//                     <CardGiftcard sx={{ fontSize: 30 }} />
//                   </Avatar>
//                 </Box>
//               </CardContent>
//             </GradientCard>
//           </Grid>
//           <Grid item xs={12} sm={6} md={3}>
//             <GradientCard bgcolor="linear-gradient(135deg, #ff9800 0%, #f57c00 100%)">
//               <CardContent sx={{ p: 4 }}>
//                 <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
//                   <Box>
//                     <Typography variant="body2" sx={{ opacity: 0.9, mb: 1 }}>
//                       অপেক্ষমাণ আয়
//                     </Typography>
//                     <Typography variant="h3" sx={{ fontWeight: 800 }}>
//                       ৳ {stats.pendingIncome.toLocaleString()}
//                     </Typography>
//                   </Box>
//                   <Avatar sx={{ bgcolor: "rgba(255,255,255,0.2)", width: 60, height: 60 }}>
//                     <Event sx={{ fontSize: 30 }} />
//                   </Avatar>
//                 </Box>
//               </CardContent>
//             </GradientCard>
//           </Grid>
//         </Grid>

        
//         {/* Income Records */}
//         <GlassCard>
//           <CardContent sx={{ p: 4 }}>
//             <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
//               Income Records
//             </Typography>
//             <Typography variant="body2" sx={{ color: "#666", mb: 4 }}>
//               আয়ের বিস্তারিত রেকর্ড ({incomeRecords.length} টি এন্ট্রি)
//             </Typography>

//             {/* Filters */}
//             <Grid container spacing={3} sx={{ mb: 4 }}>
//               <Grid item xs={12} md={6}>
//                 <TextField
//                   fullWidth
//                   placeholder="আয়ের বিবরণ খুঁজুন..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   InputProps={{
//                     startAdornment: (
//                       <InputAdornment position="start">
//                         <Search />
//                       </InputAdornment>
//                     ),
//                   }}
//                   sx={{
//                     "& .MuiOutlinedInput-root": {
//                       borderRadius: "15px",
//                     },
//                   }}
//                 />
//               </Grid>
//               <Grid item xs={12} md={2}>
//                 <FormControl fullWidth>
//                   <InputLabel>Category</InputLabel>
//                   <Select
//                     value={categoryFilter}
//                     label="Category"
//                     onChange={(e) => setCategoryFilter(e.target.value)}
//                     sx={{ borderRadius: "15px" }}
//                   >
//                     <MenuItem value="all">All Categories</MenuItem>
//                     <MenuItem value="student">Student Fees</MenuItem>
//                     <MenuItem value="tuition">Tuition</MenuItem>
//                     <MenuItem value="donation">Donations</MenuItem>
//                     <MenuItem value="admission">Admission</MenuItem>
//                     <MenuItem value="grant">Grant</MenuItem>
//                   </Select>
//                 </FormControl>
//               </Grid>
//               <Grid item xs={12} md={2}>
//                 <FormControl fullWidth>
//                   <InputLabel>Status</InputLabel>
//                   <Select
//                     value={statusFilter}
//                     label="Status"
//                     onChange={(e) => setStatusFilter(e.target.value)}
//                     sx={{ borderRadius: "15px" }}
//                   >
//                     <MenuItem value="all">All Status</MenuItem>
//                     <MenuItem value="received">Received</MenuItem>
//                     <MenuItem value="pending">Pending</MenuItem>
//                     <MenuItem value="overdue">Overdue</MenuItem>
//                   </Select>
//                 </FormControl>
//               </Grid>
//               <Grid item xs={12} md={2}>
//                 <Button
//                   variant="outlined"
//                   fullWidth
//                   startIcon={<Download />}
//                   sx={{
//                     height: "56px",
//                     borderRadius: "15px",
//                     borderWidth: 2,
//                     "&:hover": {
//                       borderWidth: 2,
//                     },
//                   }}
//                 >
//                   Export
//                 </Button>
//               </Grid>
//             </Grid>

//             {/* Income Table */}
//             <TableContainer
//               component={Paper}
//               sx={{
//                 borderRadius: "15px",
//                 boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
//               }}
//             >
//               <Table>
//                 <TableHead>
//                   <TableRow sx={{ bgcolor: "#f8f9fa" }}>
//                     <TableCell sx={{ fontWeight: 700, fontSize: "1rem" }}>Source & Description</TableCell>
//                     <TableCell sx={{ fontWeight: 700, fontSize: "1rem" }}>Amount (পরিমাণ)</TableCell>
//                     <TableCell sx={{ fontWeight: 700, fontSize: "1rem" }}>Category</TableCell>
//                     <TableCell sx={{ fontWeight: 700, fontSize: "1rem" }}>Date (তারিখ)</TableCell>
//                     <TableCell sx={{ fontWeight: 700, fontSize: "1rem" }}>Status</TableCell>
//                     <TableCell sx={{ fontWeight: 700, fontSize: "1rem" }}>Actions</TableCell>
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {filteredRecords.length === 0 ? (
//                     <TableRow>
//                       <TableCell colSpan={6} sx={{ textAlign: "center", py: 4 }}>
//                         <Typography variant="h6" sx={{ color: "#666" }}>
//                           কোন আয়ের রেকর্ড পাওয়া যায়নি
//                         </Typography>
//                       </TableCell>
//                     </TableRow>
//                   ) : (
//                     filteredRecords.map((income: Income) => (
//                       <TableRow
//                         key={income._id}
//                         hover
//                         sx={{
//                           "&:hover": {
//                             bgcolor: "#f8f9fa",
//                           },
//                         }}
//                       >
//                         <TableCell>
//                           <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
//                             <Avatar
//                               sx={{
//                                 bgcolor: "#e3f2fd",
//                                 color: "#1976d2",
//                               }}
//                             >
//                               {getIncomeIcon(income.category?.name || "")}
//                             </Avatar>
//                             <Box>
//                               <Typography variant="body1" sx={{ fontWeight: 600 }}>
//                                 {income.note || "No description"}
//                               </Typography>
//                               <Typography variant="caption" sx={{ color: "#666" }}>
//                                 {income.category?.name || "Other"}
//                               </Typography>
//                               {income.incomeItems && income.incomeItems.length > 0 && (
//                                 <Typography variant="caption" sx={{ color: "#4CAF50", display: "block" }}>
//                                   {income.incomeItems.length} items
//                                 </Typography>
//                               )}
//                             </Box>
//                           </Box>
//                         </TableCell>
//                         <TableCell>
//                           <Typography variant="h6" sx={{ fontWeight: 800, color: "#4CAF50" }}>
//                             ৳ {(income.totalAmount || 0).toLocaleString()}
//                           </Typography>
//                         </TableCell>
//                         <TableCell>
//                           <Chip
//                             label={income.category?.name || "Other"}
//                             variant="outlined"
//                             sx={{
//                               borderRadius: "20px",
//                               fontWeight: 600,
//                             }}
//                           />
//                         </TableCell>
//                         <TableCell>
//                           {new Date(income.incomeDate).toLocaleDateString("en-GB")}
//                         </TableCell>
//                         <TableCell>
//                           {getStatusChip(income.status || "completed")}
//                         </TableCell>
//                         <TableCell>
//                           <Box sx={{ display: "flex", gap: 1 }}>
//                             <IconButton
//                               onClick={() => handleEdit(income)}
//                               size="small"
//                               sx={{
//                                 bgcolor: "#e3f2fd",
//                                 color: "#1976d2",
//                                 "&:hover": { bgcolor: "#bbdefb" },
//                               }}
//                             >
//                               <Edit />
//                             </IconButton>
//                             <IconButton
//                               onClick={() => handleDeleteIncome(income._id)}
//                               size="small"
//                               sx={{
//                                 bgcolor: "#fdecea",
//                                 color: "#d32f2f",
//                                 "&:hover": {
//                                   bgcolor: "#f8d7da",
//                                 },
//                               }}
//                             >
//                               <Delete />
//                             </IconButton>
//                           </Box>
//                         </TableCell>
//                       </TableRow>
//                     ))
//                   )}
//                 </TableBody>
//               </Table>
//             </TableContainer>
//           </CardContent>
//         </GlassCard>

//         <AddIncomeModal open={open} onClose={handleClose} id={editData?._id} />
//       </Box>
//     </Container>
//   )
// }