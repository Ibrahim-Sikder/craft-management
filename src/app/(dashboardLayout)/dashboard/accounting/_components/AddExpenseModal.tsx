"\"use client"

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  IconButton,
  Typography,
  Box,
  Card,
  CardContent,
} from "@mui/material"
import { Close, Add, Delete } from "@mui/icons-material"
import { useState } from "react"
import { cardStyle } from "@/style/customeStyle"

interface ExpenseItem {
  id: number
  name: string
  amount: string
}

interface AddExpenseDialogProps {
  open: boolean
  onClose: () => void
}

const AddExpenseModal = ({ open, onClose }: AddExpenseDialogProps) => {
  const [category, setCategory] = useState<string>("")
  const [description, setDescription] = useState<string>("")
  const [paymentMethod, setPaymentMethod] = useState<string>("")

  // ✅ Multiple expense items with dynamic add/remove
  const [expenseItems, setExpenseItems] = useState<ExpenseItem[]>([{ id: 1, name: "", amount: "" }])

  // ✅ Add new expense item
  const handleAddExpenseItem = () => {
    const newId = Math.max(...expenseItems.map((item) => item.id)) + 1
    setExpenseItems((prev) => [...prev, { id: newId, name: "", amount: "" }])
  }

  // ✅ Remove expense item
  const handleRemoveExpenseItem = (id: number) => {
    if (expenseItems.length > 1) {
      setExpenseItems((prev) => prev.filter((item) => item.id !== id))
    }
  }

  // ✅ Update expense item
  const handleExpenseItemChange = (id: number, field: "name" | "amount", value: string) => {
    setExpenseItems((prev) => prev.map((item) => (item.id === id ? { ...item, [field]: value } : item)))
  }

  // ✅ Calculate total amount
  const getTotalAmount = () => {
    return expenseItems.reduce((total, item) => {
      const amount = Number.parseFloat(item.amount) || 0
      return total + amount
    }, 0)
  }

  // ✅ Reset form
  const handleReset = () => {
    setCategory("")
    setDescription("")
    setPaymentMethod("")
    setExpenseItems([{ id: 1, name: "", amount: "" }])
  }

  const handleSubmit = () => {

    handleReset()
    onClose()
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ pb: 2 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h4" sx={{ fontWeight: 800, color: "#333" }}>
            Add New Expense
          </Typography>
          <IconButton onClick={onClose}>
            <Close />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent sx={{ pb: 3 }}>
        <Grid container spacing={3} sx={{ mt: 1 }}>
          {/* ✅ Category Selection */}
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                label="Category"
                sx={{ borderRadius: "15px" }}
              >
                <MenuItem value="utilities">Utilities (ইউটিলিটি)</MenuItem>
                <MenuItem value="salary">Salary (বেতন)</MenuItem>
                <MenuItem value="supplies">Supplies (সরবরাহ)</MenuItem>
                <MenuItem value="transport">Transport (পরিবহন)</MenuItem>
                <MenuItem value="maintenance">Maintenance (রক্ষণাবেক্ষণ)</MenuItem>
                <MenuItem value="food">Food (খাবার)</MenuItem>
                <MenuItem value="books">Books (বই)</MenuItem>
                <MenuItem value="other">Other (অন্যান্য)</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* ✅ Payment Method */}
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Payment Method</InputLabel>
              <Select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                label="Payment Method"
                sx={{ borderRadius: "15px" }}
              >
                <MenuItem value="cash">Cash (নগদ)</MenuItem>
                <MenuItem value="bank">Bank Transfer (ব্যাংক ট্রান্সফার)</MenuItem>
                <MenuItem value="check">Check (চেক)</MenuItem>
                <MenuItem value="mobile">Mobile Banking (মোবাইল ব্যাংকিং)</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* ✅ Description */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={2}
              label="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="ব্যয়ের বিবরণ লিখুন..."
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "15px",
                },
              }}
            />
          </Grid>

          {/* ✅ Expense Items Section */}
          <Grid item xs={12}>


            {/* ✅ Dynamic Expense Items */}
            <Box sx={{ maxHeight: "300px", overflowY: "auto" }}>
              {expenseItems.map((item, index) => (
                <Card
                  key={item.id}
                  sx={cardStyle}
                >
                  <CardContent sx={{ p: 2 }}>
                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600, color: "#555" }}>
                        Item #{index + 1}
                      </Typography>
                      {expenseItems.length > 1 && (
                        <IconButton
                          onClick={() => handleRemoveExpenseItem(item.id)}
                          sx={{
                            color: "#f44336",
                            "&:hover": {
                              backgroundColor: "rgba(244, 67, 54, 0.1)",
                            },
                          }}
                        >
                          <Delete />
                        </IconButton>
                      )}
                    </Box>

                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={7}>
                        <TextField
                          fullWidth
                          label="Expense Name"
                          value={item.name}
                          onChange={(e) => handleExpenseItemChange(item.id, "name", e.target.value)}
                          placeholder="ব্যয়ের নাম লিখুন..."
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              borderRadius: "12px",
                            },
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={5}>
                        <TextField
                          fullWidth
                          type="number"
                          label="Amount (৳)"
                          value={item.amount}
                          onChange={(e) => handleExpenseItemChange(item.id, "amount", e.target.value)}
                          placeholder="পরিমাণ"
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              borderRadius: "12px",
                            },
                          }}
                        />
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              ))}
            </Box>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
              <Typography variant="h6" sx={{ fontWeight: 600, color: "#333" }}>
                Expense Items (ব্যয়ের তালিকা)
              </Typography>
              <Button
                onClick={handleAddExpenseItem}
                variant="contained"
                startIcon={<Add />}
                sx={{
                  borderRadius: "20px",
                  background: "linear-gradient(135deg, #4caf50 0%, #45a049 100%)",
                  boxShadow: "0 4px 15px rgba(76, 175, 80, 0.3)",
                  "&:hover": {
                    boxShadow: "0 6px 20px rgba(76, 175, 80, 0.4)",
                  },
                }}
              >
                Add Item
              </Button>
            </Box>
            {/* ✅ Total Amount Display */}
            <Card
              sx={{
                mt: 2,
                background: "linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)",
                borderRadius: "15px",
              }}
            >
              <CardContent sx={{ p: 2 }}>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Typography variant="h6" sx={{ fontWeight: 600, color: "#1976d2" }}>
                    Total Amount (মোট পরিমাণ):
                  </Typography>
                  <Typography variant="h5" sx={{ fontWeight: 800, color: "#1976d2" }}>
                    ৳ {getTotalAmount().toLocaleString()}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions sx={{ p: 3, pt: 0 }}>
        <Button
          onClick={onClose}
          variant="outlined"
          sx={{
            borderRadius: "25px",
            px: 4,
            py: 1.5,
            borderWidth: 2,
            "&:hover": { borderWidth: 2 },
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleReset}
          variant="outlined"
          sx={{
            borderRadius: "25px",
            px: 4,
            py: 1.5,
            borderColor: "#ff9800",
            color: "#ff9800",
            "&:hover": {
              borderColor: "#f57c00",
              backgroundColor: "rgba(255, 152, 0, 0.1)",
            },
          }}
        >
          Reset
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={expenseItems.length === 0 || !category}
          sx={{
            borderRadius: "25px",
            px: 4,
            py: 1.5,
            background: "linear-gradient(135deg, #f44336 0%, #d32f2f 100%)",
            boxShadow: "0 4px 15px rgba(244, 67, 54, 0.3)",
            "&:hover": {
              boxShadow: "0 6px 20px rgba(244, 67, 54, 0.4)",
            },
            "&:disabled": {
              background: "#ccc",
              boxShadow: "none",
            },
          }}
        >
          Add Expense
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default AddExpenseModal
