/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import React, { useState } from "react"
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
  IconButton,
  Typography,
  Box,
  InputAdornment,
  FormControlLabel,
  Switch,
  Divider,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Slide,
  Chip,
} from "@mui/material"
import {
  Close as CloseIcon,
  AccessTime as AccessTimeIcon,
  Event as EventIcon,
  Title as TitleIcon,
  Save as SaveIcon,
} from "@mui/icons-material"
import type { TransitionProps } from "@mui/material/transitions"
import type { SelectChangeEvent } from "@mui/material/Select"
import CraftForm from "@/components/Forms/Form"
import CraftInputWithIcon from "@/components/Forms/inputWithIcon"
import CraftSelectWithIcon from "@/components/Forms/selectWithIcon"
import { days, ITimeSlot, TimeSlotModalProps } from "@/interface"
import CraftTimePicker from "@/components/Forms/Timepicker"
import CraftSwitch from "@/components/Forms/switch"
import { useCreateTimeSlotMutation } from "@/redux/api/timeSlotApi"
import toast from "react-hot-toast"
import { FieldValues } from "react-hook-form"

// Interface for TimeSlot


const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />
})

const TimeSlotModal: React.FC<TimeSlotModalProps> = ({ open, onClose, onSave, initialData }) => {
  const [timeSlot, setTimeSlot] = useState<ITimeSlot>(
    initialData || {
      title: "",
      day: "Monday",
      startTime: "08:00",
      endTime: "09:00",
      isActive: true,
    },
  )
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)
  const [createTimeSlot] = useCreateTimeSlotMutation()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setTimeSlot({
      ...timeSlot,
      [name]: value,
    })

    // Clear error when field is edited
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      })
    }
  }

  const handleSelectChange = (e: SelectChangeEvent<string>) => {
    const { name, value } = e.target
    setTimeSlot({
      ...timeSlot,
      [name]: value,
    })

    // Clear error when field is edited
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      })
    }
  }

  const handleSwitchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target
    setTimeSlot({
      ...timeSlot,
      [name]: checked,
    })
  }

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!timeSlot.startTime) {
      newErrors.startTime = "Start time is required"
    }

    if (!timeSlot.endTime) {
      newErrors.endTime = "End time is required"
    }

    if (timeSlot.startTime && timeSlot.endTime) {
      if (timeSlot.startTime >= timeSlot.endTime) {
        newErrors.endTime = "End time must be after start time"
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (data: FieldValues) => {

    setLoading(true)
    try {
      const res = await createTimeSlot(data).unwrap()
      console.log(res)
      if (res.success) {
        toast.success('Time slot created successfully!')
       
        onClose()
      }
    } catch (error: any) {
      toast.error(error?.data?.message || 'Failed to create time slot!')
    } finally {
      setLoading(false)
    }
  }
  const formatTimeForSubmission = (time: string): string => {
    try {
      // If time is already in HH:MM format, return it
      if (/^\d{1,2}:\d{2}$/.test(time)) {
        // Ensure two digits for hours
        const [hours, minutes] = time.split(":")
        return `${hours.padStart(2, '0')}:${minutes}`
      }

      // If time is in AM/PM format, convert to 24-hour
      const date = new Date(`2000-01-01 ${time}`)
      const hours = date.getHours().toString().padStart(2, '0')
      const minutes = date.getMinutes().toString().padStart(2, '0')
      return `${hours}:${minutes}`
    } catch (e: any) {
      // If parsing fails, return the original value
      return time
    }
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md" TransitionComponent={Transition}>
      <DialogTitle
        sx={{
          bgcolor: "info.main",
          color: "white",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          py: 2,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <AccessTimeIcon sx={{ mr: 1 }} />
          <Typography variant="h6" component="div">
            Add New Time Slot
          </Typography>
        </Box>
        <IconButton edge="end" color="inherit" onClick={onClose} aria-label="close">
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <CraftForm onSubmit={handleSubmit}>
        <DialogContent sx={{ py: 3 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 500, color: "text.secondary" }}>
                Create a new time slot for class schedules
              </Typography>
              <Divider sx={{ mb: 3 }} />
            </Grid>

            <Grid item xs={12} md={6}>
              <CraftInputWithIcon
                fullWidth
                label="Title (Optional)"
                name="title"

                placeholder="e.g., Morning Period, First Period"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <TitleIcon fontSize="small" color="action" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <CraftSelectWithIcon
                name="day"
                items={days}
                label="Day"
                size="medium"
                adornment={
                  <EventIcon fontSize="small" color="action" />
                }
              />


            </Grid>

            <Grid item xs={12} md={6}>
              <CraftTimePicker label="Start Time"
                name="startTime" />
            </Grid>

            <Grid item xs={12} md={6}>
              <CraftTimePicker label="End Time"
                name="endTime" fullWidth />

            </Grid>

            <Grid item xs={12}>
              <CraftSwitch
                name="isActive"
                checked={timeSlot.isActive || false}
                onChange={handleSwitchChange}
                // color="info"
                label="Active Time Slot"
              />
              <Typography variant="caption" color="text.secondary" sx={{ display: "block", ml: 3 }}>
                Inactive time slots won't appear in schedule selection lists
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Box
                sx={{
                  p: 2,
                  bgcolor: "rgba(59, 130, 246, 0.05)",
                  borderRadius: 2,
                  border: "1px dashed rgba(59, 130, 246, 0.3)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Box>
                  <Typography variant="subtitle2" color="info.main">
                    Time Slot Preview
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {timeSlot.day}, {formatTimeForSubmission(timeSlot.startTime)} - {formatTimeForSubmission(timeSlot.endTime)}
                    {timeSlot.title && ` (${timeSlot.title})`}
                  </Typography>
                </Box>
                <Chip
                  icon={<AccessTimeIcon />}
                  label={`${formatTimeForSubmission(timeSlot.startTime)} - ${formatTimeForSubmission(timeSlot.endTime)}`}
                  color="info"
                  variant="outlined"
                />
              </Box>
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions sx={{ px: 3, py: 2, bgcolor: "grey.50" }}>
          <Button onClick={onClose} variant="outlined" color="inherit">
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="info"
            disabled={loading}
            startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <SaveIcon />}
            sx={{
              px: 3,
              py: 1,
              boxShadow: "0px 4px 12px rgba(59, 130, 246, 0.2)",
              "&:hover": {
                boxShadow: "0px 6px 16px rgba(59, 130, 246, 0.3)",
              },
            }}
          >
            {loading ? "Saving..." : "Save Time Slot"}
          </Button>
        </DialogActions>
      </CraftForm>
    </Dialog>
  )
}

export default TimeSlotModal
