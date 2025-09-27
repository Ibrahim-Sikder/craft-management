// /* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable @typescript-eslint/no-unused-vars */
// "use client"

// import { useState } from "react"
// import type { SelectChangeEvent } from "@mui/material/Select"
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
//   Avatar,
//   LinearProgress,
//   useTheme,
//   alpha,
//   Container,
// } from "@mui/material"
// import {
//   Add as AddIcon,
//   MoneyOff as MoneyOffIcon,
//   Search as SearchIcon,
//   Edit as EditIcon,
//   Delete as DeleteIcon,
//   Print as PrintIcon,
//   Download as DownloadIcon,
//   Receipt as ReceiptIcon,
//   CalendarMonth as CalendarMonthIcon,
//   ArrowUpward as ArrowUpwardIcon,
//   ArrowDownward as ArrowDownwardIcon,
//   Save as SaveIcon,
//   FilterAlt as FilterAltIcon,
//   MoreVert as MoreVertIcon,
//   Visibility as VisibilityIcon,
//   PieChart as PieChartIcon,
//   TrendingUp as TrendingUpIcon,
//   TrendingDown as TrendingDownIcon,
// } from "@mui/icons-material"
// import { styled } from "@mui/material/styles"

// // Sample data for demonstration
// const expenseCategories = [
//   { id: 1, name: "Salaries", icon: "👨‍🏫", color: "#FF5252" },
//   { id: 2, name: "Utilities", icon: "💡", color: "#FF9800" },
//   { id: 3, name: "Maintenance", icon: "🔧", color: "#2196F3" },
//   { id: 4, name: "Supplies", icon: "📚", color: "#4CAF50" },
//   { id: 5, name: "Transport", icon: "🚌", color: "#9C27B0" },
//   { id: 6, name: "Events", icon: "🎭", color: "#00BCD4" },
//   { id: 7, name: "Furniture", icon: "🪑", color: "#795548" },
//   { id: 8, name: "Other", icon: "📋", color: "#607D8B" },
// ]

// const expenseData = [
//   {
//     id: 1,
//     date: "2023-05-05",
//     category: "Salaries",
//     amount: 120000,
//     payee: "Staff Payroll",
//     voucherNo: "EXP-001",
//     paymentMethod: "Bank Transfer",
//     description: "Monthly salaries for teaching staff",
//   },
//   {
//     id: 2,
//     date: "2023-05-08",
//     category: "Utilities",
//     amount: 15000,
//     payee: "Electric Company",
//     voucherNo: "EXP-002",
//     paymentMethod: "Online Payment",
//     description: "Electricity bill for April 2023",
//   },
//   {
//     id: 3,
//     date: "2023-05-12",
//     category: "Maintenance",
//     amount: 8500,
//     payee: "ABC Repairs",
//     voucherNo: "EXP-003",
//     paymentMethod: "Cash",
//     description: "Plumbing repairs in school building",
//   },
//   {
//     id: 4,
//     date: "2023-05-15",
//     category: "Supplies",
//     amount: 12000,
//     payee: "XYZ Stationers",
//     voucherNo: "EXP-004",
//     paymentMethod: "Cash",
//     description: "Office and classroom supplies",
//   },
//   {
//     id: 5,
//     date: "2023-05-20",
//     category: "Transport",
//     amount: 25000,
//     payee: "Fuel Station",
//     voucherNo: "EXP-005",
//     paymentMethod: "Cash",
//     description: "Fuel for school buses",
//   },
// ]

// // Styled components
// const StyledPaper = styled(Paper)(({ theme }) => ({
//   padding: theme.spacing(3),
//   borderRadius: 16,
//   boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
//   height: "100%",
//   transition: "transform 0.3s ease, box-shadow 0.3s ease",
//   "&:hover": {
//     boxShadow: "0 12px 40px rgba(0,0,0,0.12)",
//     transform: "translateY(-5px)",
//   },
// }))

// const GradientButton = styled(Button)(({ theme }) => ({
//   background: "linear-gradient(135deg, #FF5722 0%, #FF9800 100%)",
//   color: "white",
//   boxShadow: "0 4px 10px rgba(255, 87, 34, 0.3)",
//   borderRadius: 8,
//   padding: "10px 20px",
//   fontWeight: "bold",
//   textTransform: "none",
//   transition: "all 0.3s ease",
//   "&:hover": {
//     boxShadow: "0 6px 15px rgba(255, 87, 34, 0.4)",
//     transform: "translateY(-2px)",
//   },
// }))

// const StyledTableRow = styled(TableRow)(({ theme }) => ({
//   transition: "background-color 0.2s ease",
//   "&:nth-of-type(odd)": {
//     backgroundColor: alpha(theme.palette.primary.main, 0.03),
//   },
//   "&:hover": {
//     backgroundColor: alpha(theme.palette.primary.main, 0.07),
//   },
// }))

// const CategoryCard = styled(Card)(({ color }: { color: string }) => ({
//   borderRadius: 16,
//   boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
//   transition: "transform 0.3s ease, box-shadow 0.3s ease",
//   position: "relative",
//   overflow: "hidden",
//   "&:before": {
//     content: '""',
//     position: "absolute",
//     top: 0,
//     left: 0,
//     width: "100%",
//     height: "5px",
//     background: color,
//   },
//   "&:hover": {
//     transform: "translateY(-5px)",
//     boxShadow: "0 8px 25px rgba(0,0,0,0.1)",
//   },
// }))

// const StyledChip = styled(Chip)(({ theme }) => ({
//   fontWeight: "bold",
//   borderRadius: 8,
//   padding: "0 2px",
//   "& .MuiChip-label": {
//     padding: "0 10px",
//   },
// }))

// const AnimatedIconButton = styled(IconButton)(({ theme }) => ({
//   transition: "transform 0.2s ease, background-color 0.2s ease",
//   "&:hover": {
//     transform: "scale(1.1)",
//   },
// }))

// const ExpensePage = () => {
//   const theme = useTheme()
//   const [openDialog, setOpenDialog] = useState(false)
//   const [selectedCategory, setSelectedCategory] = useState("")
//   const [searchTerm, setSearchTerm] = useState("")
//   const [startDate, setStartDate] = useState("")
//   const [endDate, setEndDate] = useState("")
//   const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")
//   const [tabValue, setTabValue] = useState(0)

//   // Form state
//   const [formData, setFormData] = useState({
//     date: new Date().toISOString().split("T")[0],
//     category: "",
//     amount: "",
//     payee: "",
//     voucherNo: "",
//     paymentMethod: "Cash",
//     description: "",
//   })

//   const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
//     setTabValue(newValue)
//   }

//   const handleOpenDialog = () => {
//     setOpenDialog(true)
//   }

//   const handleCloseDialog = () => {
//     setOpenDialog(false)
//   }
//   const handleFormChange = (
//     e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }> | SelectChangeEvent<string>
//   ) => {
//     const { name, value } = e.target
//     setFormData({
//       ...formData,
//       [name as string]: value,
//     })
//   }

//   const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData({
//       ...formData,
//       date: e.target.value,
//     })
//   }

//   const handleSubmit = () => {
//     // Here you would save the expense data to your backend
//     console.log(formData)
//     handleCloseDialog()
//   }

//   const toggleSortOrder = () => {
//     setSortOrder(sortOrder === "asc" ? "desc" : "asc")
//   }

//   const filteredExpenses = expenseData
//     .filter((expense) => {
//       if (selectedCategory && expense.category !== selectedCategory) return false
//       if (
//         searchTerm &&
//         !expense.payee.toLowerCase().includes(searchTerm.toLowerCase()) &&
//         !expense.voucherNo.toLowerCase().includes(searchTerm.toLowerCase())
//       )
//         return false

//       if (startDate && new Date(expense.date) < new Date(startDate)) return false
//       if (endDate && new Date(expense.date) > new Date(endDate)) return false

//       if (tabValue === 1 && expense.category !== "Salaries") return false
//       if (tabValue === 2 && expense.category !== "Utilities") return false

//       return true
//     })
//     .sort((a, b) => {
//       if (sortOrder === "asc") {
//         return a.amount - b.amount
//       } else {
//         return b.amount - a.amount
//       }
//     })

//   // Calculate total expense
//   const totalExpense = filteredExpenses.reduce((sum, expense) => sum + expense.amount, 0)

//   // Calculate category totals for the chart
//   const categoryTotals = expenseCategories.map((category) => {
//     const total = expenseData
//       .filter((expense) => expense.category === category.name)
//       .reduce((sum, expense) => sum + expense.amount, 0)
//     return {
//       ...category,
//       total,
//       percentage: Math.round((total / expenseData.reduce((sum, exp) => sum + exp.amount, 0)) * 100),
//     }
//   })

//   return (
//    <Container maxWidth='xl'>
//  <Box sx={{ py: 4, px: { xs: 2, md: 4 } }}>
//       {/* Header with animated gradient background */}
//       <Box
//         sx={{
//           display: "flex",
//           alignItems: "center",
//           mb: 4,
//           p: 3,
//           borderRadius: 4,
//           background: "linear-gradient(135deg, rgba(255,87,34,0.1) 0%, rgba(255,152,0,0.1) 100%)",
//           position: "relative",
//           overflow: "hidden",
//           "&::before": {
//             content: '""',
//             position: "absolute",
//             top: 0,
//             left: 0,
//             width: "100%",
//             height: "100%",
//             backgroundImage:
//               "radial-gradient(circle at 20% 30%, rgba(255,87,34,0.15) 0%, transparent 40%), radial-gradient(circle at 80% 70%, rgba(255,152,0,0.15) 0%, transparent 40%)",
//             zIndex: 0,
//           },
//         }}
//       >
//         <Avatar
//           sx={{
//             bgcolor: "error.main",
//             width: 56,
//             height: 56,
//             boxShadow: "0 4px 14px rgba(255,87,34,0.4)",
//             mr: 3,
//           }}
//         >
//           <MoneyOffIcon sx={{ fontSize: 32 }} />
//         </Avatar>
//         <Box sx={{ zIndex: 1 }}>
//           <Typography
//             variant="h4"
//             component="h1"
//             fontWeight="bold"
//             sx={{
//               background: "linear-gradient(135deg, #FF5722 0%, #FF9800 100%)",
//               WebkitBackgroundClip: "text",
//               WebkitTextFillColor: "transparent",
//             }}
//           >
//             Expense Management
//           </Typography>
//           <Typography variant="subtitle1" color="text.secondary">
//             Track, analyze and manage all your institution expenses
//           </Typography>
//         </Box>
//       </Box>

//       <Grid container spacing={3} sx={{ mb: 4 }}>
//         <Grid item xs={12} md={4}>
//           <StyledPaper>
//             <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
//               <Avatar
//                 sx={{
//                   bgcolor: alpha(theme.palette.error.main, 0.1),
//                   color: "error.main",
//                   mr: 2,
//                 }}
//               >
//                 <TrendingDownIcon />
//               </Avatar>
//               <Typography variant="h6" fontWeight="bold">
//                 Total Expenses
//               </Typography>
//             </Box>
//             <Typography
//               variant="h3"
//               sx={{
//                 color: "error.main",
//                 fontWeight: "bold",
//                 mb: 2,
//                 background: "linear-gradient(135deg, #FF5722 0%, #FF9800 100%)",
//                 WebkitBackgroundClip: "text",
//                 WebkitTextFillColor: "transparent",
//               }}
//             >
//               ৳{totalExpense.toLocaleString()}
//             </Typography>
//             <Divider sx={{ my: 2 }} />
//             <Grid container spacing={2}>
//               <Grid item xs={6}>
//                 <Box>
//                   <Typography variant="body2" color="text.secondary" gutterBottom>
//                     This Month
//                   </Typography>
//                   <Box sx={{ display: "flex", alignItems: "center" }}>
//                     <Typography variant="h6" fontWeight="medium">
//                       ৳180,500
//                     </Typography>
//                     <Chip
//                       size="small"
//                       label="+12%"
//                       sx={{
//                         ml: 1,
//                         bgcolor: alpha(theme.palette.error.main, 0.1),
//                         color: "error.main",
//                         fontWeight: "bold",
//                       }}
//                     />
//                   </Box>
//                 </Box>
//               </Grid>
//               <Grid item xs={6}>
//                 <Box>
//                   <Typography variant="body2" color="text.secondary" gutterBottom>
//                     Last Month
//                   </Typography>
//                   <Box sx={{ display: "flex", alignItems: "center" }}>
//                     <Typography variant="h6" fontWeight="medium">
//                       ৳165,200
//                     </Typography>
//                     <Chip
//                       size="small"
//                       label="+5%"
//                       sx={{
//                         ml: 1,
//                         bgcolor: alpha(theme.palette.error.main, 0.1),
//                         color: "error.main",
//                         fontWeight: "bold",
//                       }}
//                     />
//                   </Box>
//                 </Box>
//               </Grid>
//             </Grid>
//           </StyledPaper>
//         </Grid>
//         <Grid item xs={12} md={8}>
//           <StyledPaper>
//             <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
//               <Box sx={{ display: "flex", alignItems: "center" }}>
//                 <Avatar
//                   sx={{
//                     bgcolor: alpha(theme.palette.primary.main, 0.1),
//                     color: "primary.main",
//                     mr: 2,
//                   }}
//                 >
//                   <PieChartIcon />
//                 </Avatar>
//                 <Typography variant="h6" fontWeight="bold">
//                   Expenses by Category
//                 </Typography>
//               </Box>
//               <Button
//                 startIcon={<FilterAltIcon />}
//                 variant="outlined"
//                 size="small"
//                 sx={{ borderRadius: 2, textTransform: "none" }}
//               >
//                 Filter
//               </Button>
//             </Box>
//             <Grid container spacing={2}>
//               {categoryTotals
//                 .sort((a, b) => b.total - a.total)
//                 .slice(0, 4)
//                 .map((category) => (
//                   <Grid item xs={6} md={3} key={category.id}>
//                     <CategoryCard color={category.color}>
//                       <CardContent sx={{ p: 2, "&:last-child": { pb: 2 } }}>
//                         <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
//                           <Typography variant="body2" fontWeight="medium" noWrap>
//                             {category.icon} {category.name}
//                           </Typography>
//                         </Box>
//                         <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
//                           ৳{category.total.toLocaleString()}
//                         </Typography>
//                         <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
//                           <Typography variant="caption" color="text.secondary">
//                             {category.percentage}% of total
//                           </Typography>
//                           <Box sx={{ width: "50%", mr: 1 }}>
//                             <LinearProgress
//                               variant="determinate"
//                               value={category.percentage}
//                               sx={{
//                                 height: 6,
//                                 borderRadius: 3,
//                                 bgcolor: alpha(category.color, 0.2),
//                                 "& .MuiLinearProgress-bar": {
//                                   bgcolor: category.color,
//                                 },
//                               }}
//                             />
//                           </Box>
//                         </Box>
//                       </CardContent>
//                     </CategoryCard>
//                   </Grid>
//                 ))}
//             </Grid>
//           </StyledPaper>
//         </Grid>
//       </Grid>

//       <StyledPaper>
//         <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
//           <Box sx={{ display: "flex", alignItems: "center" }}>
//             <Avatar
//               sx={{
//                 bgcolor: alpha(theme.palette.error.main, 0.1),
//                 color: "error.main",
//                 mr: 2,
//               }}
//             >
//               <ReceiptIcon />
//             </Avatar>
//             <Typography variant="h5" component="h2" fontWeight="bold">
//               Expense Transactions
//             </Typography>
//           </Box>
//           <GradientButton startIcon={<AddIcon />} onClick={handleOpenDialog}>
//             Add New Expense
//           </GradientButton>
//         </Box>

//         <Grid container spacing={3} sx={{ mb: 3 }}>
//           <Grid item xs={12} md={3}>
//             <FormControl fullWidth variant="outlined">
//               <InputLabel>Category</InputLabel>
//               <Select
//                 value={selectedCategory}
//                 onChange={(e) => setSelectedCategory(e.target.value as string)}
//                 label="Category"
//               >
//                 <MenuItem value="">All Categories</MenuItem>
//                 {expenseCategories.map((category) => (
//                   <MenuItem key={category.id} value={category.name}>
//                     <Box sx={{ display: "flex", alignItems: "center" }}>
//                       <Typography sx={{ mr: 1 }}>{category.icon}</Typography>
//                       {category.name}
//                     </Box>
//                   </MenuItem>
//                 ))}
//               </Select>
//             </FormControl>
//           </Grid>
//           <Grid item xs={12} md={3}>
//             <TextField
//               fullWidth
//               label="Start Date"
//               type="date"
//               value={startDate}
//               onChange={(e) => setStartDate(e.target.value)}
//               InputLabelProps={{ shrink: true }}
//             />
//           </Grid>
//           <Grid item xs={12} md={3}>
//             <TextField
//               fullWidth
//               label="End Date"
//               type="date"
//               value={endDate}
//               onChange={(e) => setEndDate(e.target.value)}
//               InputLabelProps={{ shrink: true }}
//             />
//           </Grid>
//           <Grid item xs={12} md={3}>
//             <TextField
//               fullWidth
//               variant="outlined"
//               placeholder="Search by payee or voucher"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               InputProps={{
//                 startAdornment: (
//                   <InputAdornment position="start">
//                     <SearchIcon />
//                   </InputAdornment>
//                 ),
//               }}
//             />
//           </Grid>
//         </Grid>

//         <Box
//           sx={{
//             borderBottom: 1,
//             borderColor: "divider",
//             mb: 3,
//             "& .MuiTabs-indicator": {
//               height: 3,
//               borderRadius: 1.5,
//               background: "linear-gradient(135deg, #FF5722 0%, #FF9800 100%)",
//             },
//           }}
//         >
//           <Tabs
//             value={tabValue}
//             onChange={handleTabChange}
//             aria-label="expense tabs"
//             sx={{
//               "& .MuiTab-root": {
//                 textTransform: "none",
//                 fontWeight: "medium",
//                 minWidth: 100,
//               },
//               "& .Mui-selected": {
//                 fontWeight: "bold",
//                 color: "error.main",
//               },
//             }}
//           >
//             <Tab label="All Expenses" />
//             <Tab label="Salaries" />
//             <Tab label="Utilities" />
//           </Tabs>
//         </Box>

//         <Box sx={{ mb: 2, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//           <Stack direction="row" spacing={1} alignItems="center">
//             <Typography variant="body1" fontWeight="medium">
//               {filteredExpenses.length} Transactions Found
//             </Typography>
//             {selectedCategory && (
//               <StyledChip
//                 label={selectedCategory}
//                 sx={{
//                   backgroundColor: alpha(
//                     expenseCategories.find((cat) => cat.name === selectedCategory)?.color || theme.palette.error.main,
//                     0.1
//                   ),
//                   color: expenseCategories.find((cat) => cat.name === selectedCategory)?.color || theme.palette.error.main,
//                   border: `1px solid ${alpha(
//                     expenseCategories.find((cat) => cat.name === selectedCategory)?.color || theme.palette.error.main,
//                     0.3
//                   )}`,
//                   fontWeight: "bold",
//                   borderRadius: 2,
//                 }}
//                 onDelete={() => setSelectedCategory("")}
//                 size="small"
//               />
//             )}
//             <Tooltip title="Print">
//               <AnimatedIconButton color="primary" size="small">
//                 <PrintIcon />
//               </AnimatedIconButton>
//             </Tooltip>
//             <Tooltip title="Export">
//               <AnimatedIconButton color="primary" size="small">
//                 <DownloadIcon />
//               </AnimatedIconButton>
//             </Tooltip>
//             <Button
//               variant="outlined"
//               size="small"
//               startIcon={sortOrder === "asc" ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />}
//               onClick={toggleSortOrder}
//               sx={{ borderRadius: 2, textTransform: "none" }}
//             >
//               Sort by Amount
//             </Button>
//           </Stack>
//         </Box>

//         <TableContainer
//           component={Paper}
//           sx={{
//             boxShadow: "none",
//             mb: 3,
//             borderRadius: 2,
//             overflow: "hidden",
//             border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
//           }}
//         >
//           <Table>
//             <TableHead
//               sx={{
//                 background: "linear-gradient(135deg, rgba(255,87,34,0.05) 0%, rgba(255,152,0,0.05) 100%)",
//               }}
//             >
//               <TableRow>
//                 <TableCell sx={{ fontWeight: "bold" }}>Date</TableCell>
//                 <TableCell sx={{ fontWeight: "bold" }}>Voucher No.</TableCell>
//                 <TableCell sx={{ fontWeight: "bold" }}>Category</TableCell>
//                 <TableCell sx={{ fontWeight: "bold" }}>Payee</TableCell>
//                 <TableCell sx={{ fontWeight: "bold" }}>Payment Method</TableCell>
//                 <TableCell align="right" sx={{ fontWeight: "bold" }}>
//                   Amount
//                 </TableCell>
//                 <TableCell align="center" sx={{ fontWeight: "bold" }}>
//                   Actions
//                 </TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {filteredExpenses.map((expense) => (
//                 <StyledTableRow key={expense.id}>
//                   <TableCell>
//                     <Box sx={{ display: "flex", alignItems: "center" }}>
//                       <CalendarMonthIcon sx={{ fontSize: 16, mr: 1, color: "primary.main" }} />
//                       {new Date(expense.date).toLocaleDateString()}
//                     </Box>
//                   </TableCell>
//                   <TableCell>{expense.voucherNo}</TableCell>
//                   <TableCell>
//                     <StyledChip
//                       label={expense.category}
//                       size="small"
//                       color={
//                         expenseCategories.find((cat) => cat.name === expense.category)?.color ||
//                         theme.palette.error.main
//                       }
//                     />
//                   </TableCell>
//                   <TableCell>{expense.payee}</TableCell>
//                   <TableCell>{expense.paymentMethod}</TableCell>
//                   <TableCell align="right">
//                     <Typography variant="body1" fontWeight="bold" color="error.main">
//                       ৳{expense.amount.toLocaleString()}
//                     </Typography>
//                   </TableCell>
//                   <TableCell align="center">
//                     <Box sx={{ display: "flex", justifyContent: "center" }}>
//                       <Tooltip title="View Details">
//                         <AnimatedIconButton size="small" color="info">
//                           <VisibilityIcon fontSize="small" />
//                         </AnimatedIconButton>
//                       </Tooltip>
//                       <Tooltip title="Print Voucher">
//                         <AnimatedIconButton size="small" color="primary">
//                           <ReceiptIcon fontSize="small" />
//                         </AnimatedIconButton>
//                       </Tooltip>
//                       <Tooltip title="Edit">
//                         <AnimatedIconButton size="small" color="secondary">
//                           <EditIcon fontSize="small" />
//                         </AnimatedIconButton>
//                       </Tooltip>
//                       <Tooltip title="Delete">
//                         <AnimatedIconButton size="small" color="error">
//                           <DeleteIcon fontSize="small" />
//                         </AnimatedIconButton>
//                       </Tooltip>
//                     </Box>
//                   </TableCell>
//                 </StyledTableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </TableContainer>

//         {filteredExpenses.length === 0 && (
//           <Box
//             sx={{
//               textAlign: "center",
//               py: 6,
//               px: 2,
//               borderRadius: 4,
//               bgcolor: alpha(theme.palette.error.main, 0.03),
//               border: `1px dashed ${alpha(theme.palette.error.main, 0.2)}`,
//             }}
//           >
//             <Typography variant="h6" color="text.secondary" gutterBottom>
//               No expense transactions found
//             </Typography>
//             <Typography variant="body2" color="text.secondary">
//               Try changing your search criteria or add a new expense transaction
//             </Typography>
//             <Button
//               variant="outlined"
//               color="error"
//               startIcon={<AddIcon />}
//               onClick={handleOpenDialog}
//               sx={{ mt: 2, borderRadius: 2, textTransform: "none" }}
//             >
//               Add New Expense
//             </Button>
//           </Box>
//         )}
//       </StyledPaper>

//       {/* Add Expense Dialog */}
//       <Dialog
//         open={openDialog}
//         onClose={handleCloseDialog}
//         maxWidth="md"
//         fullWidth
//         PaperProps={{
//           sx: {
//             borderRadius: 3,
//             boxShadow: "0 10px 40px rgba(0,0,0,0.1)",
//           },
//         }}
//       >
//         <DialogTitle>
//           <Box sx={{ display: "flex", alignItems: "center" }}>
//             <Avatar sx={{ bgcolor: "error.main", mr: 2 }}>
//               <MoneyOffIcon />
//             </Avatar>
//             <Typography variant="h6" fontWeight="bold">
//               Add New Expense
//             </Typography>
//           </Box>
//         </DialogTitle>
//         <DialogContent dividers>
//           <Grid container spacing={3}>
//             <Grid item xs={12} md={6}>
//               <TextField
//                 fullWidth
//                 label="Date"
//                 type="date"
//                 name="date"
//                 value={formData.date}
//                 onChange={handleDateChange}
//                 margin="normal"
//                 InputLabelProps={{ shrink: true }}
//               />
//             </Grid>
//             <Grid item xs={12} md={6}>
//               <FormControl fullWidth margin="normal">
//                 <InputLabel>Category</InputLabel>
//                 <Select name="category" value={formData.category} onChange={handleFormChange} label="Category">
//                   {expenseCategories.map((category) => (
//                     <MenuItem key={category.id} value={category.name}>
//                       <Box sx={{ display: "flex", alignItems: "center" }}>
//                         <Typography sx={{ mr: 1 }}>{category.icon}</Typography>
//                         {category.name}
//                       </Box>
//                     </MenuItem>
//                   ))}
//                 </Select>
//               </FormControl>
//             </Grid>
//             <Grid item xs={12} md={6}>
//               <TextField
//                 fullWidth
//                 label="Amount"
//                 name="amount"
//                 type="number"
//                 value={formData.amount}
//                 onChange={handleFormChange}
//                 margin="normal"
//                 InputProps={{
//                   startAdornment: <InputAdornment position="start">৳</InputAdornment>,
//                 }}
//               />
//             </Grid>
//             <Grid item xs={12} md={6}>
//               <TextField
//                 fullWidth
//                 label="Voucher No."
//                 name="voucherNo"
//                 value={formData.voucherNo}
//                 onChange={handleFormChange}
//                 margin="normal"
//               />
//             </Grid>
//             <Grid item xs={12} md={6}>
//               <TextField
//                 fullWidth
//                 label="Payee"
//                 name="payee"
//                 value={formData.payee}
//                 onChange={handleFormChange}
//                 margin="normal"
//               />
//             </Grid>
//             <Grid item xs={12} md={6}>
//               <FormControl fullWidth margin="normal">
//                 <InputLabel>Payment Method</InputLabel>
//                 <Select
//                   name="paymentMethod"
//                   value={formData.paymentMethod}
//                   onChange={handleFormChange}
//                   label="Payment Method"
//                 >
//                   <MenuItem value="Cash">Cash</MenuItem>
//                   <MenuItem value="Bank Transfer">Bank Transfer</MenuItem>
//                   <MenuItem value="Cheque">Cheque</MenuItem>
//                   <MenuItem value="Online Payment">Online Payment</MenuItem>
//                 </Select>
//               </FormControl>
//             </Grid>
//             <Grid item xs={12}>
//               <TextField
//                 fullWidth
//                 label="Description"
//                 name="description"
//                 value={formData.description}
//                 onChange={handleFormChange}
//                 margin="normal"
//                 multiline
//                 rows={3}
//               />
//             </Grid>
//           </Grid>
//         </DialogContent>
//         <DialogActions sx={{ px: 3, py: 2 }}>
//           <Button
//             onClick={handleCloseDialog}
//             variant="outlined"
//             sx={{ borderRadius: 2, textTransform: "none" }}
//           >
//             Cancel
//           </Button>
//           <GradientButton onClick={handleSubmit} startIcon={<SaveIcon />}>
//             Save Expense
//           </GradientButton>
//         </DialogActions>
//       </Dialog>
//     </Box>
//    </Container>
//   )
// }

// export default ExpensePage


import React from 'react';

const page = () => {
  return (
    <div>
      <h4>expense page</h4>
    </div>
  );
};

export default page;