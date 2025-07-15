"use client"

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
} from "@mui/material"
import { Close, Add } from "@mui/icons-material"
import { useState } from "react"

interface AddExpenseDialogProps {
  open: boolean
  onClose: () => void
}

const AddExpenseModal = ({ open, onClose }: AddExpenseDialogProps) => {
  const [categories, setCategories] = useState<string[]>([""]) // initial one category

  const handleAddCategory = () => {
    setCategories((prev) => [...prev, ""])
  }

  const handleCategoryChange = (index: number, value: string) => {
    const updated = [...categories]
    updated[index] = value
    setCategories(updated)
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ pb: 2 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography variant="h4" sx={{ fontWeight: 800, color: "#333" }}>
            Add New Expense
          </Typography>
          <IconButton onClick={onClose}>
            <Close />
          </IconButton>
        </div>
      </DialogTitle>
      <DialogContent sx={{ pb: 3 }}>
        <Grid container spacing={3} sx={{ mt: 1 }}>
          {/* ✅ Dynamic Categories */}
          {categories.map((category, index) => (
            <Grid item xs={12} key={index} sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Select
                  value={category}
                  onChange={(e) => handleCategoryChange(index, e.target.value)}
                  label="Category"
                  sx={{ borderRadius: "15px" }}
                >
                  <MenuItem value="utilities">Utilities (ইউটিলিটি)</MenuItem>
                  <MenuItem value="salary">Salary (বেতন)</MenuItem>
                  <MenuItem value="supplies">Supplies (সরবরাহ)</MenuItem>
                  <MenuItem value="transport">Transport (পরিবহন)</MenuItem>
                  <MenuItem value="maintenance">Maintenance (রক্ষণাবেক্ষণ)</MenuItem>
                </Select>
              </FormControl>

              {/* ✅ Plus Icon only for the first category */}
              {index === 0 && (
                <IconButton
                  onClick={handleAddCategory}
                  sx={{
                    background: "linear-gradient(135deg, #f44336 0%, #d32f2f 100%)",
               
                    borderRadius: "10px",
                    color: '#fff'
                  }}
                >
                  <Add />
                </IconButton>
              )}
            </Grid>
          ))}

          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={3}
              label="Description"
              placeholder="ব্যয়ের বিবরণ লিখুন..."
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "15px",
                },
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              type="number"
              label="Amount (৳)"
              placeholder="পরিমাণ"
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "15px",
                },
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Payment Method</InputLabel>
              <Select label="Payment Method" sx={{ borderRadius: "15px" }}>
                <MenuItem value="cash">Cash (নগদ)</MenuItem>
                <MenuItem value="bank">Bank Transfer (ব্যাংক ট্রান্সফার)</MenuItem>
                <MenuItem value="check">Check (চেক)</MenuItem>
                <MenuItem value="mobile">Mobile Banking (মোবাইল ব্যাংকিং)</MenuItem>
              </Select>
            </FormControl>
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
          onClick={onClose}
          variant="contained"
          sx={{
            borderRadius: "25px",
            px: 4,
            py: 1.5,
            background: "linear-gradient(135deg, #f44336 0%, #d32f2f 100%)",
            boxShadow: "0 4px 15px rgba(244, 67, 54, 0.3)",
            "&:hover": {
              boxShadow: "0 6px 20px rgba(244, 67, 54, 0.4)",
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
