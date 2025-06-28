// components/AddIncomeDialog.tsx
"use client"

import React from "react"
import {
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Typography,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
  Box,
} from "@mui/material"
import { Close } from "@mui/icons-material"
import { StyledDialog } from "@/style/customeStyle"

interface AddIncomeDialogProps {
  open: boolean
  onClose: () => void
}

export default function AddIncomeDialog({ open, onClose }: AddIncomeDialogProps) {
  return (
    <StyledDialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ pb: 2 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography variant="h4" sx={{ fontWeight: 800, color: "#333" }}>
            Add New Income
          </Typography>
          <IconButton onClick={onClose}>
            <Close />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent sx={{ pb: 3 }}>
        <Grid container spacing={3} sx={{ mt: 1 }}>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Income Source</InputLabel>
              <Select label="Income Source" sx={{ borderRadius: "15px" }}>
                <MenuItem value="tuition">Student Fees (ছাত্র বেতন)</MenuItem>
                <MenuItem value="grant">Government Grant (সরকারি অনুদান)</MenuItem>
                <MenuItem value="donation">Donation (দান)</MenuItem>
                <MenuItem value="admission">Admission Fees (ভর্তি ফি)</MenuItem>
                <MenuItem value="event">Event Income (ইভেন্ট আয়)</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={3}
              label="Description"
              placeholder="আয়ের বিবরণ লিখুন..."
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
            <TextField
              fullWidth
              type="date"
              label="Date"
              InputLabelProps={{ shrink: true }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "15px",
                },
              }}
            />
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
            background: "linear-gradient(135deg, #4CAF50 0%, #45a049 100%)",
            boxShadow: "0 4px 15px rgba(76, 175, 80, 0.3)",
            "&:hover": {
              boxShadow: "0 6px 20px rgba(76, 175, 80, 0.4)",
            },
          }}
        >
          Add Income
        </Button>
      </DialogActions>
    </StyledDialog>
  )
}
