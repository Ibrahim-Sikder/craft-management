/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState, useEffect } from "react"
import {
  Box,
  Card,
  CardContent,
  Typography,
  Chip,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  TextField,
  InputAdornment,
  Grid,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider,
  Tabs,
  Tab,
  Select,
  FormControl,
  InputLabel,
  CircularProgress,
  Alert,
} from "@mui/material"
import {
  MoreVert,
  Search,
  FilterList,
  ReportProblem,
  CalendarToday,
  Category,
  Lightbulb,
  Feedback,
  Edit,
  Delete,
} from "@mui/icons-material"

import { useDeleteFeedbackMutation, useGetAllFeedbacksQuery } from "@/redux/api/feedbackApi"
import Swal from "sweetalert2"
import FeedbackFormModal from "./_components/FeedbackForm"

const FeedbackList = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedFeedback, setSelectedFeedback] = useState<any>(null)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [feedbackModalOpen, setFeedbackModalOpen] = useState(false)
  const [currentTab, setCurrentTab] = useState(0)
  const [editingFeedback, setEditingFeedback] = useState<any>(null)
  const [newType, setNewType] = useState("")
  const [typeChangeDialogOpen, setTypeChangeDialogOpen] = useState(false)
  const [currentActionFeedback, setCurrentActionFeedback] = useState<any>(null)

  // Map tabs to feedback types
  const tabToTypeMap = [
    undefined,
    "suggestion",
    "idea",
    "complaint"
  ]

  // Fetch feedback data using Redux query
  const { data: feedbackData, isLoading, isError, refetch } = useGetAllFeedbacksQuery({
    type: tabToTypeMap[currentTab],
    searchTerm: searchTerm || undefined,
  })

  const [deleteFeedback] = useDeleteFeedbackMutation()

  const feedbacks = feedbackData?.data?.feedbacks || []

  useEffect(() => {
    // Refetch data when filters change
    refetch()
  }, [currentTab, searchTerm, refetch])

  const handleOpenFeedbackModal = () => {

    setEditingFeedback(null)
    setFeedbackModalOpen(true)
  }

  const handleEditFeedback = (feedback: any) => {

    setEditingFeedback(feedback)
    setFeedbackModalOpen(true)
    setAnchorEl(null)
  }

  const handleCloseFeedbackModal = () => {
    setFeedbackModalOpen(false)
    setEditingFeedback(null)

  }

  const getFeedbackIcon = (type: string) => {
    switch (type) {
      case "complaint":
        return <ReportProblem />
      case "suggestion":
        return <Feedback />
      case "idea":
        return <Lightbulb />
      default:
        return <Feedback />
    }
  }

  const getFeedbackColor = (type: string) => {
    switch (type) {
      case "complaint":
        return "#f44336"
      case "suggestion":
        return "#2196f3"
      case "idea":
        return "#ff9800"
      default:
        return "#757575"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent":
        return "#d32f2f"
      case "high":
        return "#f44336"
      case "medium":
        return "#ff9800"
      case "low":
        return "#4caf50"
      default:
        return "#757575"
    }
  }

  const handleTypeChange = (feedback: any) => {
    setEditingFeedback(feedback)
    setNewType(feedback.type)
    setTypeChangeDialogOpen(true)
    setAnchorEl(null)
  }

  const handleTypeUpdate = () => {
    console.log(`Updating feedback ${editingFeedback._id} from ${editingFeedback.type} to ${newType}`)
    setTypeChangeDialogOpen(false)
    setEditingFeedback(null)
  }

  const getTabTitle = (index: number) => {
    const titles = [
      "All Feedback",
      "Suggestions",
      "Ideas",
      "Complaints"
    ]
    return titles[index]
  }

  const handleDelete = async (id: string) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You want to delete this feedback?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      })

      if (result.isConfirmed) {
        await deleteFeedback(id).unwrap()
        refetch()

        Swal.fire({
          title: "Deleted!",
          text: "Feedback has been deleted successfully.",
          icon: "success"
        })
      }
    } catch (err: any) {
      Swal.fire({
        title: "Error!",
        text: err.data?.message || "Failed to delete feedback",
        icon: "error"
      })
    }
  }

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    )
  }

  if (isError) {
    return (
      <Alert severity="error" sx={{ mt: 2 }}>
        Error loading feedback data. Please try again later.
      </Alert>
    )
  }

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>
        Feedback Management System
        <Typography variant="subtitle1" color="text.secondary">
          ফিডব্যাক ব্যবস্থাপনা সিস্টেম
        </Typography>
      </Typography>

      <Box sx={{ mb: 3 }}>
        <Button
          variant="contained"
          size="large"
          startIcon={<Feedback />}
          onClick={handleOpenFeedbackModal}
          sx={{
            background: "linear-gradient(135deg, #2196f3 0%, #1976d2 100%)",
            color: "white",
            py: 2,
            px: 4,
            borderRadius: 3,
            fontSize: "1.1rem",
            fontWeight: 600,
            boxShadow: "0 8px 25px rgba(33, 150, 243, 0.3)",
            transition: "all 0.3s ease",
            "&:hover": {
              transform: "translateY(-2px)",
              boxShadow: "0 12px 35px rgba(33, 150, 243, 0.4)",
              background: "linear-gradient(135deg, #1976d2 0%, #1565c0 100%)",
            },
          }}
        >
          Submit New Feedback
          <Typography variant="body2" sx={{ ml: 2, opacity: 0.9, fontSize: "0.85rem" }}>
            নতুন ফিডব্যাক জমা দিন
          </Typography>
        </Button>
      </Box>

      <Card sx={{ mb: 3 }}>
        <Tabs
          value={currentTab}
          onChange={(e, newValue) => setCurrentTab(newValue)}
          sx={{ borderBottom: 1, borderColor: "divider" }}
        >
          {[0, 1, 2, 3].map((index) => (
            <Tab
              key={index}
              label={getTabTitle(index)}
            />
          ))}
        </Tabs>
      </Card>

      {/* Search and Filter */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={8}>
              <TextField
                fullWidth
                placeholder="Search feedback..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <Button variant="outlined" startIcon={<FilterList />} fullWidth>
                Filter & Sort
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Grid container spacing={3}>
        {feedbacks.length === 0 ? (
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="body1" textAlign="center" py={4}>
                  No feedback found
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ) : (
          feedbacks.map((feedback: any) => (
            <Grid item xs={12} key={feedback._id}>
              <Card
                sx={{
                  border: `1px solid ${getFeedbackColor(feedback.type)}30`,
                  borderLeft: `4px solid ${getFeedbackColor(feedback.type)}`,
                }}
              >
                <CardContent>
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 2 }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                      <Avatar sx={{ backgroundColor: getFeedbackColor(feedback.type) }}>
                        {getFeedbackIcon(feedback.type)}
                      </Avatar>
                      <Box>
                        <Typography variant="h6" sx={{ fontWeight: 600 }}>
                          {feedback.title}
                        </Typography>
                        <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
                          <Chip
                            label={feedback.type.charAt(0).toUpperCase() + feedback.type.slice(1)}
                            sx={{
                              backgroundColor: getFeedbackColor(feedback.type) + "20",
                              color: getFeedbackColor(feedback.type),
                              fontWeight: 600,
                            }}
                            size="small"
                          />
                          <Chip
                            label={feedback.priority.charAt(0).toUpperCase() + feedback.priority.slice(1)}
                            size="small"
                            sx={{
                              backgroundColor: getPriorityColor(feedback.priority) + "20",
                              color: getPriorityColor(feedback.priority),
                            }}
                          />
                          <Chip label={feedback.category} variant="outlined" size="small" />
                        </Box>
                      </Box>
                    </Box>
                    <IconButton
                      onClick={(e) => {
                        setCurrentActionFeedback(feedback)
                        setAnchorEl(e.currentTarget)
                      }}
                    >
                      <MoreVert />
                    </IconButton>
                  </Box>

                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {feedback.description}
                  </Typography>

                  <Box sx={{ display: "flex", alignItems: "center", gap: 3, flexWrap: "wrap" }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <CalendarToday sx={{ fontSize: 16, color: "text.secondary" }} />
                      <Typography variant="body2">{new Date(feedback.submittedAt).toLocaleDateString()}</Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Category sx={{ fontSize: 16, color: "text.secondary" }} />
                      <Typography variant="body2">{feedback.department}</Typography>
                    </Box>
                    {feedback.attachments && feedback.attachments.length > 0 && (
                      <Typography variant="body2" color="primary">
                        {feedback.attachments.length} attachment(s)
                      </Typography>
                    )}
                  </Box>

                  <Box sx={{ mt: 2, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Typography variant="body2" color="text.secondary">
                      ID: {feedback._id.slice(-8)}
                    </Typography>
                    <Button variant="outlined" size="small" onClick={() => setSelectedFeedback(feedback)}>
                      View Details
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))
        )}
      </Grid>

      {/* Action Menu */}
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
        <MenuItem onClick={() => handleTypeChange(currentActionFeedback)}>
          <Edit sx={{ mr: 1 }} />
          Change Type
        </MenuItem>
        <MenuItem onClick={() => handleEditFeedback(currentActionFeedback)}>
          <Edit sx={{ mr: 1 }} />
          Edit Feedback
        </MenuItem>
        <MenuItem onClick={() => handleDelete(currentActionFeedback._id)}>
          <Delete sx={{ mr: 1 }} />
          Delete
        </MenuItem>
        <MenuItem onClick={() => setAnchorEl(null)}>Mark as Resolved</MenuItem>
      </Menu>

      {/* Type Change Dialog */}
      <Dialog open={typeChangeDialogOpen} onClose={() => setTypeChangeDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Change Feedback Type</DialogTitle>
        <DialogContent>
          {editingFeedback && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="body1" sx={{ mb: 2 }}>
                Change {editingFeedback.title} from <strong>{editingFeedback.type}</strong> to:
              </Typography>
              <FormControl fullWidth>
                <InputLabel>New Type</InputLabel>
                <Select value={newType} label="New Type" onChange={(e) => setNewType(e.target.value)}>
                  <MenuItem value="suggestion">Suggestion</MenuItem>
                  <MenuItem value="idea">Idea</MenuItem>
                  <MenuItem value="complaint">Complaint</MenuItem>
                </Select>
              </FormControl>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setTypeChangeDialogOpen(false)}>Cancel</Button>
          <Button
            variant="contained"
            onClick={handleTypeUpdate}
            disabled={!newType || newType === editingFeedback?.type}
          >
            Update Type
          </Button>
        </DialogActions>
      </Dialog>

      {/* Detail Dialog */}
      <Dialog open={Boolean(selectedFeedback)} onClose={() => setSelectedFeedback(null)} maxWidth="md" fullWidth>
        {selectedFeedback && (
          <>
            <DialogTitle>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Avatar sx={{ backgroundColor: getFeedbackColor(selectedFeedback.type) }}>
                  {getFeedbackIcon(selectedFeedback.type)}
                </Avatar>
                <Box>
                  <Typography variant="h6">{selectedFeedback.title}</Typography>
                  <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
                    <Chip
                      label={selectedFeedback.type.charAt(0).toUpperCase() + selectedFeedback.type.slice(1)}
                      sx={{
                        backgroundColor: getFeedbackColor(selectedFeedback.type) + "20",
                        color: getFeedbackColor(selectedFeedback.type),
                      }}
                      size="small"
                    />
                    <Chip
                      label={selectedFeedback.priority.charAt(0).toUpperCase() + selectedFeedback.priority.slice(1)}
                      size="small"
                      sx={{
                        backgroundColor: getPriorityColor(selectedFeedback.priority) + "20",
                        color: getPriorityColor(selectedFeedback.priority),
                      }}
                    />
                  </Box>
                </Box>
              </Box>
            </DialogTitle>
            <DialogContent>
              <Typography variant="body1" sx={{ mb: 3 }}>
                {selectedFeedback.description}
              </Typography>

              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  Category:
                </Typography>
                <Typography variant="body2">{selectedFeedback.category}</Typography>
              </Box>

              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  Department:
                </Typography>
                <Typography variant="body2">{selectedFeedback.department}</Typography>
              </Box>

              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  Submitted:
                </Typography>
                <Typography variant="body2">{new Date(selectedFeedback.submittedAt).toLocaleString()}</Typography>
              </Box>

              {selectedFeedback.attachments && selectedFeedback.attachments.length > 0 && (
                <Box sx={{ mb: 3 }}>
                  <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
                    Attachments:
                  </Typography>
                  {selectedFeedback.attachments.map((attachment: string, index: number) => (
                    <Typography key={index} variant="body2" color="primary" sx={{ cursor: "pointer" }}>
                      📎 Attachment {index + 1}
                    </Typography>
                  ))}
                </Box>
              )}

              <Divider sx={{ my: 2 }} />

              <Typography variant="h6" sx={{ mb: 2 }}>
                Responses
              </Typography>

              <Typography variant="body2" color="text.secondary">
                No responses yet.
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setSelectedFeedback(null)}>Close</Button>
              <Button variant="contained">Add Response</Button>
            </DialogActions>
          </>
        )}
      </Dialog>

      {/* Feedback Form Modal */}
      <FeedbackFormModal
        open={feedbackModalOpen} 
        onClose={handleCloseFeedbackModal} 
        feedbackId={editingFeedback?._id} 
     
      />
    </Box>
  )
}

export default FeedbackList