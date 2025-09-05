/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState, useEffect } from "react"
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Chip,
  IconButton,
  Button,
  TextField,
  InputAdornment,
  Grid,
  Card,
  CardContent,
  Box,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Autocomplete,
  Alert,
} from "@mui/material"
import {
  Add,
  Edit,
  Delete,
  Search,
  Payment,
  School,
  Warning,
  CheckCircle,
  Schedule,
  MoreVert,
  GetApp,
  FilterList,
  Send,
  Save,
  Cancel,
} from "@mui/icons-material"

// Types
interface AccountsReceivable {
  id: string
  studentName: string
  amount: number
  dueDate: Date
  description: string
  status: "PENDING" | "RECEIVED" | "OVERDUE"
  invoiceNumber?: string
  createdAt: Date
}

// Static data for students and fee types
const students = [
  "John Smith - Grade 10",
  "Emma Johnson - Grade 9",
  "Michael Brown - Grade 11",
  "Sarah Davis - Grade 12",
  "David Wilson - Grade 8",
  "Lisa Anderson - Grade 10",
  "James Taylor - Grade 9",
  "Jennifer Martinez - Grade 11",
  "Robert Garcia - Grade 12",
  "Maria Rodriguez - Grade 8",
]

const feeTypes = [
  "Tuition Fee",
  "Transport Fee",
  "Library Fee",
  "Laboratory Fee",
  "Sports Fee",
  "Activity Fee",
  "Examination Fee",
  "Late Fee",
  "Other",
]

// Main Component
export default function AccountsReceivableManagement() {
  const [receivables, setReceivables] = useState<AccountsReceivable[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<"ALL" | "PENDING" | "RECEIVED" | "OVERDUE">("ALL")
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [selectedReceivable, setSelectedReceivable] = useState<string | null>(null)
  const [formOpen, setFormOpen] = useState(false)
  const [editingReceivable, setEditingReceivable] = useState<AccountsReceivable | null>(null)
  const [formData, setFormData] = useState({
    studentName: "",
    amount: "",
    dueDate: "",
    description: "",
    invoiceNumber: "",
    feeType: "",
    semester: "SPRING_2024",
  })
  const [errors, setErrors] = useState<string[]>([])

  // Load initial data
  useEffect(() => {
    // Sample data
    const sampleData: AccountsReceivable[] = [
      {
        id: "1",
        studentName: "John Smith - Grade 10",
        amount: 1250,
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
        description: "Tuition Fee for Spring 2024",
        status: "PENDING",
        invoiceNumber: "INV-2024-001",
        createdAt: new Date(),
      },
      {
        id: "2",
        studentName: "Emma Johnson - Grade 9",
        amount: 850,
        dueDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
        description: "Transport Fee for March",
        status: "PENDING",
        invoiceNumber: "INV-2024-002",
        createdAt: new Date(),
      },
      {
        id: "3",
        studentName: "Michael Brown - Grade 11",
        amount: 500,
        dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days from now
        description: "Laboratory Fee",
        status: "PENDING",
        invoiceNumber: "INV-2024-003",
        createdAt: new Date(),
      },
      {
        id: "4",
        studentName: "Sarah Davis - Grade 12",
        amount: 1500,
        dueDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
        description: "Tuition Fee for Spring 2024",
        status: "RECEIVED",
        invoiceNumber: "INV-2024-004",
        createdAt: new Date(),
      },
    ]
    setReceivables(sampleData)
  }, [])

  // Filter receivables based on search and status
  const filteredReceivables = receivables.filter((receivable) => {
    const matchesSearch =
      receivable.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      receivable.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      receivable.invoiceNumber?.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "ALL" || receivable.status === statusFilter

    return matchesSearch && matchesStatus
  })

  // Status color helper
  const getStatusColor = (status: string, dueDate: Date) => {
    const today = new Date()
    const isOverdue = new Date(dueDate) < today && status === "PENDING"

    if (isOverdue) return "error"
    switch (status) {
      case "RECEIVED":
        return "success"
      case "PENDING":
        return "warning"
      case "OVERDUE":
        return "error"
      default:
        return "default"
    }
  }

  // Status icon helper
  const getStatusIcon = (status: string, dueDate: Date) => {
    const today = new Date()
    const isOverdue = new Date(dueDate) < today && status === "PENDING"

    if (isOverdue) return <Warning className="h-4 w-4" />
    switch (status) {
      case "RECEIVED":
        return <CheckCircle className="h-4 w-4" />
      case "PENDING":
        return <Schedule className="h-4 w-4" />
      case "OVERDUE":
        return <Warning className="h-4 w-4" />
      default:
        return <Schedule className="h-4 w-4" />
    }
  }



  // Calculate days until due
  const getDaysUntilDue = (dueDate: Date) => {
    const today = new Date()
    const diffTime = new Date(dueDate).getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  // Handle menu actions
  const handleMenuClick = (event: React.MouseEvent<HTMLElement>, receivableId: string) => {
    setAnchorEl(event.currentTarget)
    setSelectedReceivable(receivableId)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
    setSelectedReceivable(null)
  }

  // Mark as received
  const handleMarkAsReceived = () => {
    if (selectedReceivable) {
      setReceivables(
        receivables.map((r) =>
          r.id === selectedReceivable ? { ...r, status: "RECEIVED" as const } : r
        )
      )
    }
    handleMenuClose()
  }

  // Delete receivable
  const handleDeleteReceivable = () => {
    if (selectedReceivable) {
      setReceivables(receivables.filter((r) => r.id !== selectedReceivable))
    }
    handleMenuClose()
  }

  // Open form for new receivable
  const handleAddReceivable = () => {
    setEditingReceivable(null)
    setFormData({
      studentName: "",
      amount: "",
      dueDate: "",
      description: "",
      invoiceNumber: "",
      feeType: "",
      semester: "SPRING_2024",
    })
    setErrors([])
    setFormOpen(true)
  }

  // Open form for editing
  const handleEditReceivable = (receivable: AccountsReceivable) => {
    setEditingReceivable(receivable)
    setFormData({
      studentName: receivable.studentName,
      amount: receivable.amount.toString(),
      dueDate: new Date(receivable.dueDate).toISOString().split("T")[0],
      description: receivable.description,
      invoiceNumber: receivable.invoiceNumber || "",
      feeType: "",
      semester: "SPRING_2024",
    })
    setErrors([])
    setFormOpen(true)
  }

  // Close form
  const handleFormClose = () => {
    setFormOpen(false)
    setEditingReceivable(null)
  }

  // Validate form
  const validateForm = (): string[] => {
    const validationErrors: string[] = []

    if (!formData.studentName.trim()) {
      validationErrors.push("Student name is ")
    }

    if (!formData.amount || Number.parseFloat(formData.amount) <= 0) {
      validationErrors.push("Amount must be greater than 0")
    }

    if (!formData.dueDate) {
      validationErrors.push("Due date is ")
    }

    if (!formData.description.trim()) {
      validationErrors.push("Description is ")
    }

    return validationErrors
  }

  // Save receivable
  const handleSaveReceivable = () => {
    const validationErrors = validateForm()
    setErrors(validationErrors)

    if (validationErrors.length === 0) {
      const receivableData: AccountsReceivable = {
        id: editingReceivable?.id || Math.random().toString(36).substr(2, 9),
        studentName: formData.studentName,
        amount: Number.parseFloat(formData.amount),
        dueDate: new Date(formData.dueDate),
        description: formData.description,
        status: editingReceivable?.status || "PENDING",
        invoiceNumber: formData.invoiceNumber || undefined,
        createdAt: editingReceivable?.createdAt || new Date(),
      }

      if (editingReceivable) {
        setReceivables(
          receivables.map((r) => (r.id === editingReceivable.id ? receivableData : r))
        )
      } else {
        setReceivables([...receivables, receivableData])
      }

      handleFormClose()
    }
  }

  // Calculate summary statistics
  const totalReceivables = receivables.reduce(
    (sum, r) => sum + (r.status === "PENDING" ? r.amount : 0),
    0
  )
  const overdueReceivables = receivables.filter(
    (r) => r.status === "PENDING" && new Date(r.dueDate) < new Date()
  ).length
  const dueSoon = receivables.filter((r) => {
    const days = getDaysUntilDue(r.dueDate)
    return r.status === "PENDING" && days >= 0 && days <= 7
  }).length

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <Typography
              variant="h3"
              className="font-bold font-serif text-gray-800"
              gutterBottom
            >
              Accounts Receivable
            </Typography>
            <Typography variant="body1" className="text-gray-600">
              Track student fees and outstanding payments
            </Typography>
          </div>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={handleAddReceivable}
            className="bg-blue-600 hover:bg-blue-700 shadow-lg px-6 py-3 rounded-xl"
            size="large"
          >
            New Receivable
          </Button>
        </div>

        {/* Summary Cards */}
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Card className="bg-white rounded-2xl shadow-lg border-0 overflow-hidden">
              <CardContent className="p-5">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-blue-100">
                    <School className="h-7 w-7 text-blue-600" />
                  </div>
                  <div>
                    <Typography variant="h4" className="font-bold text-gray-800">
                      {totalReceivables}
                    </Typography>
                    <Typography variant="body2" className="text-gray-600">
                      Total Outstanding
                    </Typography>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card className="bg-white rounded-2xl shadow-lg border-0 overflow-hidden">
              <CardContent className="p-5">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-red-100">
                    <Warning className="h-7 w-7 text-red-600" />
                  </div>
                  <div>
                    <Typography variant="h4" className="font-bold text-gray-800">
                      {overdueReceivables}
                    </Typography>
                    <Typography variant="body2" className="text-gray-600">
                      Overdue Payments
                    </Typography>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card className="bg-white rounded-2xl shadow-lg border-0 overflow-hidden">
              <CardContent className="p-5">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-amber-100">
                    <Schedule className="h-7 w-7 text-amber-600" />
                  </div>
                  <div>
                    <Typography variant="h4" className="font-bold text-gray-800">
                      {dueSoon}
                    </Typography>
                    <Typography variant="body2" className="text-gray-600">
                      Due This Week
                    </Typography>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Filters */}
        <Paper className="p-5 bg-white rounded-2xl shadow-lg border-0">
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                placeholder="Search by student name, description, or invoice number..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search className="text-gray-500" />
                    </InputAdornment>
                  ),
                  sx: { borderRadius: 2 },
                }}
                className="bg-gray-50"
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                fullWidth
                select
                label="Status Filter"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as any)}
                sx={{ borderRadius: 2 }}
              >
                <MenuItem value="ALL">All Status</MenuItem>
                <MenuItem value="PENDING">Pending</MenuItem>
                <MenuItem value="RECEIVED">Received</MenuItem>
                <MenuItem value="OVERDUE">Overdue</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} md={3}>
              <div className="flex gap-2">
                <Button
                  startIcon={<FilterList />}
                  variant="outlined"
                  size="large"
                  className="rounded-xl"
                >
                  More Filters
                </Button>
                <Button
                  startIcon={<GetApp />}
                  variant="outlined"
                  size="large"
                  className="rounded-xl"
                >
                  Export
                </Button>
              </div>
            </Grid>
          </Grid>
        </Paper>

        {/* Receivables Table */}
        <Paper className="bg-white rounded-2xl shadow-lg border-0 overflow-hidden">
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow className="bg-gray-100">
                  <TableCell className="font-semibold text-gray-700">Student</TableCell>
                  <TableCell className="font-semibold text-gray-700">Description</TableCell>
                  <TableCell className="font-semibold text-gray-700 text-right">Amount</TableCell>
                  <TableCell className="font-semibold text-gray-700">Due Date</TableCell>
                  <TableCell className="font-semibold text-gray-700">Status</TableCell>
                  <TableCell className="font-semibold text-gray-700 text-center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredReceivables.map((receivable) => {
                  const daysUntilDue = getDaysUntilDue(receivable.dueDate)
                  const isOverdue = daysUntilDue < 0 && receivable.status === "PENDING"
                  const actualStatus = isOverdue ? "OVERDUE" : receivable.status

                  return (
                    <TableRow key={receivable.id} hover className="border-b border-gray-100">
                      <TableCell>
                        <div>
                          <Typography variant="body2" className="font-medium text-gray-800">
                            {receivable.studentName}
                          </Typography>
                          {receivable.invoiceNumber && (
                            <Typography variant="caption" className="text-gray-600">
                              Invoice: {receivable.invoiceNumber}
                            </Typography>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" className="text-gray-800">
                          {receivable.description}
                        </Typography>
                      </TableCell>
                      <TableCell className="text-right">
                        <Typography variant="body2" className="font-semibold text-gray-800">
                          {receivable.amount}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <div>
                          <Typography variant="body2" className="text-gray-800">
                        76545
                          </Typography>
                          <Typography
                            variant="caption"
                            className={
                              isOverdue
                                ? "text-red-600 font-medium"
                                : daysUntilDue <= 7
                                ? "text-amber-600 font-medium"
                                : "text-gray-600"
                            }
                          >
                            {isOverdue
                              ? `${Math.abs(daysUntilDue)} days overdue`
                              : daysUntilDue === 0
                              ? "Due today"
                              : `${daysUntilDue} days left`}
                          </Typography>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getStatusIcon(actualStatus, receivable.dueDate)}
                          <Chip
                            label={actualStatus}
                            size="small"
                            color={getStatusColor(actualStatus, receivable.dueDate) as any}
                            variant="filled"
                            className="font-medium"
                          />
                        </div>
                      </TableCell>
                      <TableCell>
                        <Box className="flex gap-1 justify-center">
                          <IconButton
                            size="small"
                            onClick={() => handleEditReceivable(receivable)}
                            className="text-blue-600 hover:bg-blue-50"
                          >
                            <Edit className="h-4 w-4" />
                          </IconButton>
                          <IconButton
                            size="small"
                            onClick={(e) => handleMenuClick(e, receivable.id)}
                            className="text-gray-600 hover:bg-gray-100"
                          >
                            <MoreVert className="h-4 w-4" />
                          </IconButton>
                        </Box>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </TableContainer>

          {filteredReceivables.length === 0 && (
            <div className="p-12 text-center">
              <School className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <Typography variant="h6" className="text-gray-600 mb-2">
                No receivables found
              </Typography>
              <Typography variant="body2" className="text-gray-500 mb-6">
                {searchTerm || statusFilter !== "ALL"
                  ? "Try adjusting your search criteria"
                  : "Start by adding your first student receivable"}
              </Typography>
              {!searchTerm && statusFilter === "ALL" && (
                <Button
                  variant="contained"
                  startIcon={<Add />}
                  onClick={handleAddReceivable}
                  className="bg-blue-600 hover:bg-blue-700 rounded-xl px-6 py-2"
                >
                  Add Receivable
                </Button>
              )}
            </div>
          )}
        </Paper>

        {/* Context Menu */}
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
          <MenuItem onClick={handleMarkAsReceived}>
            <Payment className="mr-2 h-4 w-4" />
            Mark as Received
          </MenuItem>
          <MenuItem onClick={handleMenuClose}>
            <Send className="mr-2 h-4 w-4" />
            Send Reminder
          </MenuItem>
          <MenuItem
            onClick={() => {
              const receivable = receivables.find((r) => r.id === selectedReceivable)
              if (receivable) handleEditReceivable(receivable)
              handleMenuClose()
            }}
          >
            <Edit className="mr-2 h-4 w-4" />
            Edit
          </MenuItem>
          <MenuItem
            onClick={handleDeleteReceivable}
            className="text-red-600"
          >
            <Delete className="mr-2 h-4 w-4" />
            Delete
          </MenuItem>
        </Menu>

        {/* Receivable Form Modal */}
        <Dialog open={formOpen} onClose={handleFormClose} maxWidth="md" fullWidth>
          <DialogTitle className="bg-blue-600 text-white p-5">
            <div className="flex items-center gap-2">
              <School className="h-6 w-6" />
              <Typography variant="h6" className="font-semibold">
                {editingReceivable ? "Edit" : "New"} Accounts Receivable
              </Typography>
            </div>
          </DialogTitle>

          <DialogContent className="p-6">
            <div className="space-y-6 mt-4">
              {/* Student Information */}
              <Paper className="p-4 bg-gray-50 rounded-xl">
                <Typography variant="subtitle1" className="font-semibold mb-4 text-gray-800">
                  Student Information
                </Typography>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <Autocomplete
                      freeSolo
                      options={students}
                      value={formData.studentName}
                      onChange={(_, newValue) =>
                        setFormData({ ...formData, studentName: newValue || "" })
                      }
                      onInputChange={(_, newInputValue) =>
                        setFormData({ ...formData, studentName: newInputValue })
                      }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Student Name"
                          
                          error={errors.some((e) => e.includes("Student name"))}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Invoice Number"
                      value={formData.invoiceNumber}
                      onChange={(e) =>
                        setFormData({ ...formData, invoiceNumber: e.target.value })
                      }
                      placeholder="Auto-generated if empty"
                    />
                  </Grid>
                </Grid>
              </Paper>

              {/* Fee Details */}
              <Paper className="p-4 bg-gray-50 rounded-xl">
                <Typography variant="subtitle1" className="font-semibold mb-4 text-gray-800">
                  Fee Details
                </Typography>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={4}>
                    <TextField
                      fullWidth
                      label="Amount"
                      type="number"
                      value={formData.amount}
                      onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                      inputProps={{ min: 0, step: 0.01 }}
                      
                      error={errors.some((e) => e.includes("Amount"))}
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <TextField
                      fullWidth
                      label="Due Date"
                      type="date"
                      value={formData.dueDate}
                      onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                      InputLabelProps={{ shrink: true }}
                      
                      error={errors.some((e) => e.includes("Due date"))}
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <TextField
                      fullWidth
                      label="Semester"
                      select
                      value={formData.semester}
                      onChange={(e) => setFormData({ ...formData, semester: e.target.value })}
                    >
                      <MenuItem value="SPRING_2024">Spring 2024</MenuItem>
                      <MenuItem value="SUMMER_2024">Summer 2024</MenuItem>
                      <MenuItem value="FALL_2024">Fall 2024</MenuItem>
                      <MenuItem value="WINTER_2024">Winter 2024</MenuItem>
                    </TextField>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Autocomplete
                      freeSolo
                      options={feeTypes}
                      value={formData.feeType}
                      onChange={(_, newValue) =>
                        setFormData({ ...formData, feeType: newValue || "" })
                      }
                      onInputChange={(_, newInputValue) =>
                        setFormData({ ...formData, feeType: newInputValue })
                      }
                      renderInput={(params) => <TextField {...params} label="Fee Type" />}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    {formData.dueDate && (
                      <div className="flex items-center h-14">
                        <div
                          className={`px-4 py-2 rounded-full text-sm font-medium ${
                            getDaysUntilDue(new Date(formData.dueDate)) < 0
                              ? "bg-red-100 text-red-800"
                              : getDaysUntilDue(new Date(formData.dueDate)) <= 7
                              ? "bg-amber-100 text-amber-800"
                              : "bg-green-100 text-green-800"
                          }`}
                        >
                          {getDaysUntilDue(new Date(formData.dueDate)) < 0
                            ? `${Math.abs(getDaysUntilDue(new Date(formData.dueDate)))} days overdue`
                            : getDaysUntilDue(new Date(formData.dueDate)) === 0
                            ? "Due today"
                            : `${getDaysUntilDue(new Date(formData.dueDate))} days remaining`}
                        </div>
                      </div>
                    )}
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Description"
                      multiline
                      rows={3}
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Describe the fee or service..."
                      
                      error={errors.some((e) => e.includes("Description"))}
                    />
                  </Grid>
                </Grid>
              </Paper>

              {/* Validation Errors */}
              {errors.length > 0 && (
                <Alert severity="error" className="rounded-xl">
                  <Typography variant="subtitle2" className="font-semibold mb-2">
                    Please fix the following errors:
                  </Typography>
                  <ul className="list-disc list-inside space-y-1">
                    {errors.map((error, index) => (
                      <li key={index} className="text-sm">
                        {error}
                      </li>
                    ))}
                  </ul>
                </Alert>
              )}
            </div>
          </DialogContent>

          <DialogActions className="p-4 bg-gray-100">
            <Button
              onClick={handleFormClose}
              startIcon={<Cancel />}
              variant="outlined"
              className="rounded-xl"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSaveReceivable}
              startIcon={<Save />}
              variant="contained"
              className="bg-blue-600 hover:bg-blue-700 rounded-xl"
            >
              {editingReceivable ? "Update" : "Create"} Receivable
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  )
}