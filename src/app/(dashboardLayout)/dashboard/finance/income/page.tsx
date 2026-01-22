// "use client"

// import type React from "react"
// import { useState } from "react"
// import {
//   Box,
//   Typography,
//   Paper,
//   Grid,
//   TextField,
//   Button,
//   MenuItem,
//   FormControl,
//   InputLabel,
//   Select,
//   Card,
//   CardContent,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   IconButton,
//   Chip,
//   Divider,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   InputAdornment,
//   Tooltip,
//   Tab,
//   Tabs,
//   Stack,
//   Container,
// } from "@mui/material"
// import {
//   Add as AddIcon,
//   AttachMoney as AttachMoneyIcon,
//   Search as SearchIcon,
//   Edit as EditIcon,
//   Delete as DeleteIcon,
//   Print as PrintIcon,
//   Download as DownloadIcon,
//   Receipt as ReceiptIcon,
//   CalendarMonth as CalendarMonthIcon,
//   Person as PersonIcon,
//   ArrowUpward as ArrowUpwardIcon,
//   ArrowDownward as ArrowDownwardIcon,
//   Save as SaveIcon,
// } from "@mui/icons-material"
// import { styled } from "@mui/material/styles"

// // Sample data for demonstration
// const incomeCategories = [
//   { id: 1, name: "Tuition Fee" },
//   { id: 2, name: "Admission Fee" },
//   { id: 3, name: "Examination Fee" },
//   { id: 4, name: "Library Fee" },
//   { id: 5, name: "Transport Fee" },
//   { id: 6, name: "Hostel Fee" },
//   { id: 7, name: "Donations" },
//   { id: 8, name: "Other" },
// ]

// const incomeData = [
//   {
//     id: 1,
//     date: "2023-05-10",
//     category: "Tuition Fee",
//     amount: 25000,
//     student: "Ahmed Ali",
//     class: "One",
//     receiptNo: "REC-001",
//     paymentMethod: "Cash",
//     description: "Monthly tuition fee for May 2023",
//   },
//   {
//     id: 2,
//     date: "2023-05-12",
//     category: "Admission Fee",
//     amount: 15000,
//     student: "Sara Khan",
//     class: "One",
//     receiptNo: "REC-002",
//     paymentMethod: "Bank Transfer",
//     description: "New admission fee",
//   },
//   {
//     id: 3,
//     date: "2023-05-15",
//     category: "Examination Fee",
//     amount: 5000,
//     student: "Zain Ahmed",
//     class: "Two",
//     receiptNo: "REC-003",
//     paymentMethod: "Cash",
//     description: "Final term examination fee",
//   },
//   {
//     id: 4,
//     date: "2023-05-18",
//     category: "Transport Fee",
//     amount: 3000,
//     student: "Fatima Zahra",
//     class: "Three",
//     receiptNo: "REC-004",
//     paymentMethod: "Cash",
//     description: "Monthly transport fee for May 2023",
//   },
//   {
//     id: 5,
//     date: "2023-05-20",
//     category: "Donations",
//     amount: 50000,
//     student: "N/A",
//     class: "N/A",
//     receiptNo: "REC-005",
//     paymentMethod: "Cheque",
//     description: "Donation from ABC Foundation",
//   },
// ]

// // Styled components
// const StyledPaper = styled(Paper)(({ theme }) => ({
//   padding: theme.spacing(3),
//   borderRadius: 12,
//   boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
//   height: "100%",
// }))

// const GradientButton = styled(Button)(({ theme }) => ({
//   background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
//   color: "white",
//   boxShadow: "0 3px 5px 2px rgba(33, 203, 243, .3)",
// }))

// const StyledTableRow = styled(TableRow)(({ theme }) => ({
//   "&:nth-of-type(odd)": {
//     backgroundColor: theme.palette.action.hover,
//   },
//   "&:hover": {
//     backgroundColor: theme.palette.action.selected,
//   },
// }))

// // Custom styled date input to match MUI design
// const StyledDateInput = styled(TextField)(({ theme }) => ({
//   "& input[type=date]::-webkit-calendar-picker-indicator": {
//     cursor: "pointer",
//   }
// }))

// const formatDateForInput = (date) => {
//   if (!date) return "";
//   const d = new Date(date);
//   return d.toISOString().split('T')[0];
// }

// const IncomePage = () => {
//   const [openDialog, setOpenDialog] = useState(false)
//   const [selectedCategory, setSelectedCategory] = useState("")
//   const [searchTerm, setSearchTerm] = useState("")
//   const [startDate, setStartDate] = useState("")
//   const [endDate, setEndDate] = useState("")
//   const [sortOrder, setSortOrder] = useState("desc")
//   const [tabValue, setTabValue] = useState(0)

//   // Form state
//   const [formData, setFormData] = useState({
//     date: formatDateForInput(new Date()),
//     category: "",
//     amount: "",
//     student: "",
//     class: "",
//     receiptNo: "",
//     paymentMethod: "Cash",
//     description: "",
//   })

//   interface IncomeCategory {
//     id: number
//     name: string
//   }

//   interface Income {
//     id: number
//     date: string
//     category: string
//     amount: number
//     student: string
//     class: string
//     receiptNo: string
//     paymentMethod: string
//     description: string
//   }

//   interface IncomeFormData {
//     date: string
//     category: string
//     amount: string
//     student: string
//     class: string
//     receiptNo: string
//     paymentMethod: string
//     description: string
//   }

//   const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
//     setTabValue(newValue)
//   }

//   const handleOpenDialog = () => {
//     setOpenDialog(true)
//   }

//   const handleCloseDialog = () => {
//     setOpenDialog(false)
//   }

//   const handleFormChange = (e) => {
//     const { name, value } = e.target
//     setFormData({
//       ...formData,
//       [name]: value,
//     })
//   }

//   const handleSubmit = () => {
//     // Here you would save the income data to your backend
//     console.log(formData)
//     handleCloseDialog()
//   }

//   const toggleSortOrder = () => {
//     setSortOrder(sortOrder === "asc" ? "desc" : "asc")
//   }

//   const filteredIncome = incomeData
//     .filter((income) => {
//       if (selectedCategory && income.category !== selectedCategory) return false
//       if (
//         searchTerm &&
//         !income.student.toLowerCase().includes(searchTerm.toLowerCase()) &&
//         !income.receiptNo.toLowerCase().includes(searchTerm.toLowerCase())
//       )
//         return false

//       if (startDate && income.date < startDate) return false
//       if (endDate && income.date > endDate) return false

//       if (tabValue === 1 && income.category !== "Tuition Fee") return false
//       if (tabValue === 2 && income.category !== "Admission Fee") return false

//       return true
//     })
//     .sort((a, b) => {
//       if (sortOrder === "asc") {
//         return a.amount - b.amount
//       } else {
//         return b.amount - a.amount
//       }
//     })

//   // Calculate total income
//   const totalIncome = filteredIncome.reduce((sum, income) => sum + income.amount, 0)

//   return (
//     <Container maxWidth='xl'>
//       <Box sx={{ py: 4, px: { xs: 2, md: 4 } }}>
//         <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
//           <AttachMoneyIcon sx={{ fontSize: 32, color: "success.main", mr: 2 }} />
//           <Typography variant="h4" component="h1" fontWeight="bold">
//             Income Management
//           </Typography>
//         </Box>

//         <Grid container spacing={3} sx={{ mb: 4 }}>
//           <Grid item xs={12} md={4}>
//             <StyledPaper>
//               <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
//                 <ArrowUpwardIcon sx={{ color: "success.main", mr: 1 }} />
//                 <Typography variant="h6">Total Income</Typography>
//               </Box>
//               <Typography variant="h3" sx={{ color: "success.main", fontWeight: "bold", mb: 2 }}>
//                 ৳{totalIncome.toLocaleString()}
//               </Typography>
//               <Divider sx={{ my: 2 }} />
//               <Grid container spacing={2}>
//                 <Grid item xs={6}>
//                   <Typography variant="body2" color="textSecondary">
//                     This Month
//                   </Typography>
//                   <Typography variant="h6">৳78,500</Typography>
//                 </Grid>
//                 <Grid item xs={6}>
//                   <Typography variant="body2" color="textSecondary">
//                     Last Month
//                   </Typography>
//                   <Typography variant="h6">৳65,200</Typography>
//                 </Grid>
//               </Grid>
//             </StyledPaper>
//           </Grid>
//           <Grid item xs={12} md={8}>
//             <StyledPaper>
//               <Typography variant="h6" sx={{ mb: 2 }}>
//                 Income by Category
//               </Typography>
//               <Grid container spacing={2}>
//                 {incomeCategories.slice(0, 4).map((category) => (
//                   <Grid item xs={6} md={3} key={category.id}>
//                     <Card sx={{ borderRadius: 2, boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
//                       <CardContent sx={{ p: 2, "&:last-child": { pb: 2 } }}>
//                         <Typography variant="body2" color="textSecondary" noWrap>
//                           {category.name}
//                         </Typography>
//                         <Typography variant="h6" sx={{ fontWeight: "medium" }}>
//                           ৳{Math.floor(Math.random() * 50000).toLocaleString()}
//                         </Typography>
//                       </CardContent>
//                     </Card>
//                   </Grid>
//                 ))}
//               </Grid>
//             </StyledPaper>
//           </Grid>
//         </Grid>

//         <StyledPaper>
//           <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
//             <Typography variant="h5" component="h2">
//               Income Transactions
//             </Typography>
//             <GradientButton startIcon={<AddIcon />} onClick={handleOpenDialog}>
//               Add New Income
//             </GradientButton>
//           </Box>

//           <Grid container spacing={3} sx={{ mb: 3 }}>
//             <Grid item xs={12} md={3}>
//               <FormControl fullWidth variant="outlined">
//                 <InputLabel>Category</InputLabel>
//                 <Select
//                   value={selectedCategory}
//                   onChange={(e) => setSelectedCategory(e.target.value)}
//                   label="Category"
//                 >
//                   <MenuItem value="">All Categories</MenuItem>
//                   {incomeCategories.map((category) => (
//                     <MenuItem key={category.id} value={category.name}>
//                       {category.name}
//                     </MenuItem>
//                   ))}
//                 </Select>
//               </FormControl>
//             </Grid>
//             <Grid item xs={12} md={3}>
//               <StyledDateInput
//                 fullWidth
//                 label="Start Date"
//                 type="date"
//                 value={startDate}
//                 onChange={(e) => setStartDate(e.target.value)}
//                 InputLabelProps={{ shrink: true }}
//                 variant="outlined"
//               />
//             </Grid>
//             <Grid item xs={12} md={3}>
//               <StyledDateInput
//                 fullWidth
//                 label="End Date"
//                 type="date"
//                 value={endDate}
//                 onChange={(e) => setEndDate(e.target.value)}
//                 InputLabelProps={{ shrink: true }}
//                 variant="outlined"
//               />
//             </Grid>
//             <Grid item xs={12} md={3}>
//               <TextField
//                 fullWidth
//                 variant="outlined"
//                 placeholder="Search by student or receipt"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 InputProps={{
//                   startAdornment: (
//                     <InputAdornment position="start">
//                       <SearchIcon />
//                     </InputAdornment>
//                   ),
//                 }}
//               />
//             </Grid>
//           </Grid>

//           <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}>
//             <Tabs value={tabValue} onChange={handleTabChange} aria-label="income tabs">
//               <Tab label="All Income" />
//               <Tab label="Tuition Fee" />
//               <Tab label="Admission Fee" />
//             </Tabs>
//           </Box>

//           <Box sx={{ mb: 2, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//             <Stack direction="row" spacing={1} alignItems="center">
//               <Typography variant="body1">{filteredIncome.length} Transactions Found</Typography>
//               {selectedCategory && (
//                 <Chip
//                   label={selectedCategory}
//                   color="primary"
//                   variant="outlined"
//                   onDelete={() => setSelectedCategory("")}
//                   size="small"
//                 />
//               )}
//             </Stack>
//             <Stack direction="row" spacing={1}>
//               <Tooltip title="Print">
//                 <IconButton color="primary" size="small">
//                   <PrintIcon />
//                 </IconButton>
//               </Tooltip>
//               <Tooltip title="Export">
//                 <IconButton color="primary" size="small">
//                   <DownloadIcon />
//                 </IconButton>
//               </Tooltip>
//               <Button
//                 variant="outlined"
//                 size="small"
//                 startIcon={sortOrder === "asc" ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />}
//                 onClick={toggleSortOrder}
//               >
//                 Sort by Amount
//               </Button>
//             </Stack>
//           </Box>

//           <TableContainer component={Paper} sx={{ boxShadow: "none", mb: 3 }}>
//             <Table>
//               <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
//                 <TableRow>
//                   <TableCell>Date</TableCell>
//                   <TableCell>Receipt No.</TableCell>
//                   <TableCell>Category</TableCell>
//                   <TableCell>Student</TableCell>
//                   <TableCell>Class</TableCell>
//                   <TableCell>Payment Method</TableCell>
//                   <TableCell align="right">Amount</TableCell>
//                   <TableCell align="center">Actions</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {filteredIncome.map((income) => (
//                   <StyledTableRow key={income.id}>
//                     <TableCell>
//                       <Box sx={{ display: "flex", alignItems: "center" }}>
//                         <CalendarMonthIcon sx={{ fontSize: 16, mr: 1, color: "primary.main" }} />
//                         {new Date(income.date).toLocaleDateString()}
//                       </Box>
//                     </TableCell>
//                     <TableCell>{income.receiptNo}</TableCell>
//                     <TableCell>
//                       <Chip
//                         label={income.category}
//                         size="small"
//                         color={
//                           income.category === "Tuition Fee"
//                             ? "primary"
//                             : income.category === "Admission Fee"
//                               ? "secondary"
//                               : income.category === "Donations"
//                                 ? "success"
//                                 : "default"
//                         }
//                       />
//                     </TableCell>
//                     <TableCell>
//                       {income.student !== "N/A" ? (
//                         <Box sx={{ display: "flex", alignItems: "center" }}>
//                           <PersonIcon sx={{ fontSize: 16, mr: 1, color: "text.secondary" }} />
//                           {income.student}
//                         </Box>
//                       ) : (
//                         income.student
//                       )}
//                     </TableCell>
//                     <TableCell>{income.class}</TableCell>
//                     <TableCell>{income.paymentMethod}</TableCell>
//                     <TableCell align="right">
//                       <Typography variant="body1" fontWeight="medium" color="success.main">
//                         ৳{income.amount.toLocaleString()}
//                       </Typography>
//                     </TableCell>
//                     <TableCell align="center">
//                       <Box sx={{ display: "flex", justifyContent: "center" }}>
//                         <Tooltip title="Print Receipt">
//                           <IconButton size="small" color="primary">
//                             <ReceiptIcon fontSize="small" />
//                           </IconButton>
//                         </Tooltip>
//                         <Tooltip title="Edit">
//                           <IconButton size="small" color="secondary">
//                             <EditIcon fontSize="small" />
//                           </IconButton>
//                         </Tooltip>
//                         <Tooltip title="Delete">
//                           <IconButton size="small" color="error">
//                             <DeleteIcon fontSize="small" />
//                           </IconButton>
//                         </Tooltip>
//                       </Box>
//                     </TableCell>
//                   </StyledTableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </TableContainer>

//           {filteredIncome.length === 0 && (
//             <Box sx={{ textAlign: "center", py: 4 }}>
//               <Typography variant="h6" color="textSecondary">
//                 No income transactions found
//               </Typography>
//               <Typography variant="body2" color="textSecondary">
//                 Try changing your search criteria or add a new income transaction
//               </Typography>
//             </Box>
//           )}
//         </StyledPaper>

//         {/* Add Income Dialog */}
//         <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
//           <DialogTitle>
//             <Box sx={{ display: "flex", alignItems: "center" }}>
//               <AttachMoneyIcon sx={{ color: "success.main", mr: 1 }} />
//               Add New Income
//             </Box>
//           </DialogTitle>
//           <DialogContent dividers>
//             <Grid container spacing={3}>
//               <Grid item xs={12} md={6}>
//                 <StyledDateInput
//                   fullWidth
//                   label="Date"
//                   type="date"
//                   name="date"
//                   value={formData.date}
//                   onChange={handleFormChange}
//                   InputLabelProps={{ shrink: true }}
//                   margin="normal"
//                 />
//               </Grid>
//               <Grid item xs={12} md={6}>
//                 <FormControl fullWidth margin="normal">
//                   <InputLabel>Category</InputLabel>
//                   <Select name="category" value={formData.category} onChange={handleFormChange} label="Category">
//                     {incomeCategories.map((category) => (
//                       <MenuItem key={category.id} value={category.name}>
//                         {category.name}
//                       </MenuItem>
//                     ))}
//                   </Select>
//                 </FormControl>
//               </Grid>
//               <Grid item xs={12} md={6}>
//                 <TextField
//                   fullWidth
//                   label="Amount"
//                   name="amount"
//                   type="number"
//                   value={formData.amount}
//                   onChange={handleFormChange}
//                   margin="normal"
//                   InputProps={{
//                     startAdornment: <InputAdornment position="start">৳</InputAdornment>,
//                   }}
//                 />
//               </Grid>
//               <Grid item xs={12} md={6}>
//                 <TextField
//                   fullWidth
//                   label="Receipt No."
//                   name="receiptNo"
//                   value={formData.receiptNo}
//                   onChange={handleFormChange}
//                   margin="normal"
//                 />
//               </Grid>
//               <Grid item xs={12} md={6}>
//                 <TextField
//                   fullWidth
//                   label="Student Name"
//                   name="student"
//                   value={formData.student}
//                   onChange={handleFormChange}
//                   margin="normal"
//                 />
//               </Grid>
//               <Grid item xs={12} md={6}>
//                 <TextField
//                   fullWidth
//                   label="Class"
//                   name="class"
//                   value={formData.class}
//                   onChange={handleFormChange}
//                   margin="normal"
//                 />
//               </Grid>
//               <Grid item xs={12} md={6}>
//                 <FormControl fullWidth margin="normal">
//                   <InputLabel>Payment Method</InputLabel>
//                   <Select
//                     name="paymentMethod"
//                     value={formData.paymentMethod}
//                     onChange={handleFormChange}
//                     label="Payment Method"
//                   >
//                     <MenuItem value="Cash">Cash</MenuItem>
//                     <MenuItem value="Bank Transfer">Bank Transfer</MenuItem>
//                     <MenuItem value="Cheque">Cheque</MenuItem>
//                     <MenuItem value="Online Payment">Online Payment</MenuItem>
//                   </Select>
//                 </FormControl>
//               </Grid>
//               <Grid item xs={12}>
//                 <TextField
//                   fullWidth
//                   label="Description"
//                   name="description"
//                   value={formData.description}
//                   onChange={handleFormChange}
//                   margin="normal"
//                   multiline
//                   rows={3}
//                 />
//               </Grid>
//             </Grid>
//           </DialogContent>
//           <DialogActions>
//             <Button onClick={handleCloseDialog}>Cancel</Button>
//             <GradientButton onClick={handleSubmit} startIcon={<SaveIcon />}>
//               Save Income
//             </GradientButton>
//           </DialogActions>
//         </Dialog>
//       </Box>
//     </Container>
//   )
// }

// export default IncomePage

import React from "react";

const page = () => {
  return (
    <div>
      <h4>income page</h4>
    </div>
  );
};

export default page;
