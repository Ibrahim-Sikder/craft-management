/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import type React from "react"
import { useState } from "react"
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Card,
    CardContent,
    Typography,
    Button,
    Box,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Grid,
    Alert,
    IconButton,
    Avatar,
    Divider,
    useTheme,
    useMediaQuery,
} from "@mui/material"
import { Close, Send, ReportProblem, Lightbulb, Recommend } from "@mui/icons-material"
import CraftForm from "@/components/Forms/Form"
import CraftSelect from "@/components/Forms/Select"
import { feedbackCategories, feedbackDepartments } from "@/items"
import CraftInput from "@/components/Forms/Input"
import CraftTextArea from "@/components/Forms/TextArea"
import FileUploadWithIcon from "@/components/Forms/Upload"
import { useCreateFeedbackMutation } from "@/redux/api/feedbackApi"
import toast from "react-hot-toast"

interface FeedbackFormModalProps {
    open: boolean
    onClose: () => void
    preSelectedType?: string,

}

const FeedbackFormModal: React.FC<FeedbackFormModalProps> = ({ open, onClose, preSelectedType }) => {
    const theme = useTheme()
    const fullScreen = useMediaQuery(theme.breakpoints.down("md"))
    const [createFeedback] = useCreateFeedbackMutation()

    const [formData, setFormData] = useState({
        type: preSelectedType || "",
        category: "",
        priority: "",
        title: "",
        description: "",
        department: "",
    })
    const [showSuccess, setShowSuccess] = useState(false)

    const feedbackTypes = [
        { value: "complaint", label: "Complaint", label_bn: "অভিযোগ", icon: <ReportProblem />, color: "#f44336" },
        { value: "idea", label: "Idea", label_bn: "আইডিয়া", icon: <Lightbulb />, color: "#ff9800" },
        { value: "suggestion", label: "Suggestion", label_bn: "পরামর্শ", icon: <Recommend />, color: "#4caf50" },
    ]
    const priorities = [
        { value: "low", label: "Low", color: "#4caf50" },
        { value: "medium", label: "Medium", color: "#ff9800" },
        { value: "high", label: "High", color: "#f44336" },
        { value: "urgent", label: "Urgent", color: "#d32f2f" },
    ]

    const handleSubmit = async (values: any) => {
        try {
            const payload = {
                ...values,
                type: formData.type,
                priority: formData.priority,
            }
            const res = await createFeedback(payload).unwrap()
            if (res.success) {
                toast.success(res.message || 'Feedback add succssfully!')
            } else {
                toast.error(res.message || 'Failed to create feedback!')
            }
            onClose()




        } catch (error) {
            console.error("Failed to submit feedback:", error)
        }
    }

    const handleChange = (field: string, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }))
    }

    const handleClose = () => {
        setFormData({
            type: preSelectedType || "",
            category: "",
            priority: "",
            title: "",
            description: "",
            department: "",
        })
        setShowSuccess(false)
        onClose()
    }

    const selectedType = feedbackTypes.find((type) => type.value === formData.type)

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            maxWidth="md"
            fullWidth
            fullScreen={fullScreen}
            PaperProps={{
                sx: {
                    borderRadius: fullScreen ? 0 : 3,
                    maxHeight: "90vh",
                },
            }}
        >
            <DialogTitle
                sx={{
                    background: selectedType
                        ? `linear-gradient(135deg, ${selectedType.color}15 0%, ${selectedType.color}25 100%)`
                        : "linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%)",
                    borderBottom: `3px solid ${selectedType?.color || "#e0e0e0"}`,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    pb: 2,
                }}
            >
                <Box>
                    <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
                        Submit New Feedback
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        নতুন মতামত জমা দিন
                    </Typography>
                </Box>
                <IconButton onClick={handleClose} sx={{ color: "text.secondary" }}>
                    <Close />
                </IconButton>
            </DialogTitle>

            <DialogContent sx={{ p: 0 }}>
                {showSuccess && (
                    <Alert severity="success" sx={{ m: 3, mb: 0 }}>
                        Your feedback has been submitted successfully! আপনার মতামত সফলভাবে জমা দেওয়া হয়েছে!
                    </Alert>
                )}
                <Box sx={{ p: 3 }}>
                    <CraftForm onSubmit={handleSubmit}>
                        <Grid container spacing={3}>
                            {/* Feedback Type Selection */}
                            <Grid item xs={12}>
                                <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                                    Select Feedback Type
                                    <Typography variant="body2" color="text.secondary">
                                        মতামতের ধরন নির্বাচন করুন
                                    </Typography>
                                </Typography>
                                <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                                    {feedbackTypes.map((type) => (
                                        <Card
                                            key={type.value}
                                            sx={{
                                                cursor: "pointer",
                                                border: formData.type === type.value ? `2px solid ${type.color}` : "1px solid #e0e0e0",
                                                backgroundColor: formData.type === type.value ? `${type.color}10` : "white",
                                                transition: "all 0.3s ease",
                                                "&:hover": {
                                                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                                                    transform: "translateY(-2px)",
                                                },
                                                minWidth: 160,
                                                flex: 1,
                                            }}
                                            onClick={() => handleChange("type", type.value)}
                                        >
                                            <CardContent sx={{ textAlign: "center", py: 2 }}>
                                                <Avatar
                                                    sx={{
                                                        backgroundColor: type.color,
                                                        width: 40,
                                                        height: 40,
                                                        mx: "auto",
                                                        mb: 1,
                                                    }}
                                                >
                                                    {type.icon}
                                                </Avatar>
                                                <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                                                    {type.label}
                                                </Typography>
                                                <Typography variant="caption" color="text.secondary">
                                                    {type.label_bn}
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </Box>
                            </Grid>

                            <Grid item xs={12}>
                                <Divider />
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <CraftSelect name="category" label="Category" items={feedbackCategories} margin="none" />
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <FormControl fullWidth required>
                                    <InputLabel>Priority</InputLabel>
                                    <Select
                                        value={formData.priority}
                                        label="Priority"
                                        onChange={(e) => handleChange("priority", e.target.value)}
                                    >
                                        {priorities.map((priority) => (
                                            <MenuItem key={priority.value} value={priority.value}>
                                                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                                    <Box
                                                        sx={{
                                                            width: 12,
                                                            height: 12,
                                                            borderRadius: "50%",
                                                            backgroundColor: priority.color,
                                                        }}
                                                    />
                                                    {priority.label}
                                                </Box>
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>

                            <Grid item xs={12}>
                                <CraftSelect name="department" label="Department" items={feedbackDepartments} />
                            </Grid>

                            <Grid item xs={12}>
                                <CraftInput fullWidth name="title" label="Title" placeholder="Enter a brief title for your feedback" />
                            </Grid>

                            <Grid item xs={12}>
                                <CraftTextArea
                                    minRows={10}
                                    name="description"
                                    label="Description"
                                    placeholder="Enter the details of your feedback"
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <FileUploadWithIcon
                                    name="attachments"
                                    label="You can attach images, documents, or other relevant files"
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <DialogActions sx={{ px: 0 }}>
                                    <Button variant="outlined" onClick={handleClose} size="large">
                                        Cancel
                                    </Button>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        startIcon={<Send />}
                                        size="large"
                                        sx={{
                                            background: selectedType
                                                ? `linear-gradient(45deg, ${selectedType.color} 30%, ${selectedType.color}90 90%)`
                                                : undefined,
                                            minWidth: 140,
                                        }}
                                        disabled={!formData.type}
                                    >
                                        Submit
                                    </Button>
                                </DialogActions>
                            </Grid>
                        </Grid>
                    </CraftForm>
                </Box>
            </DialogContent>
        </Dialog>
    )
}

export default FeedbackFormModal
