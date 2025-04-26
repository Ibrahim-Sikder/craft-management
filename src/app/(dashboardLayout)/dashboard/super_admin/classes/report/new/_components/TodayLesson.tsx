/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState } from "react"
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Box, IconButton } from "@mui/material"
import { Close as CloseIcon } from "@mui/icons-material"
import CraftTextArea from "@/components/Forms/TextArea"
import CraftForm from "@/components/Forms/Form"
import toast from "react-hot-toast"

interface TodayLessonProps {
  open: boolean
  onClose: () => void
  onSave: (lessonId: string) => void
}

export default function TodayLesson({ open, onClose, onSave }: TodayLessonProps) {
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    try {
      setLoading(true)     

      // Simulate API call with timeout
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock response with a fake ID
      const mockResponse = { success: true, data: { _id: "lesson_" + Date.now() } }

      if (mockResponse.success) {
        toast.success("আজকের পাঠ সফলভাবে সংরক্ষণ করা হয়েছে!")
        onSave(mockResponse.data._id)
        onClose()
      }
    } catch (error: any) {
      console.error("Error saving today's lesson:", error)
      toast.error(error?.data?.message || "আজকের পাঠ সংরক্ষণ করতে ব্যর্থ হয়েছে")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="md"
      PaperProps={{
        sx: {
          borderRadius: 2,
          boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.15)",
        },
      }}
    >
      <DialogTitle sx={{ m: 0, p: 2, bgcolor: "#4F0187", color: "white" }}>
        <Typography variant="h6" component="div" sx={{ fontWeight: 600 }}>
          আজকের পাঠ
        </Typography>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: "white",
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <CraftForm onSubmit={handleSubmit}>
        <DialogContent dividers>
          <Box sx={{ p: 1 }}>
            <CraftTextArea
              name="lessonContent"
              label="আজকের পাঠের বিষয়বস্তু"
              placeholder="আজকের পাঠের বিষয়বস্তু লিখুন..."
              minRows={8}
              required
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 2, justifyContent: "space-between" }}>
          <Button onClick={onClose} variant="outlined" color="inherit" sx={{ borderColor: "rgba(0, 0, 0, 0.12)" }}>
            বাতিল
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={loading}
            sx={{
              bgcolor: "#4F0187",
              borderRadius: 2,
              boxShadow: "0px 4px 10px rgba(79, 1, 135, 0.2)",
            }}
          >
            {loading ? "সংরক্ষণ হচ্ছে..." : "সংরক্ষণ করুন"}
          </Button>
        </DialogActions>
      </CraftForm>
    </Dialog>
  )
}
