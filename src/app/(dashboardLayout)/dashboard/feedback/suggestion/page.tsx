/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { useState } from "react"
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
  LinearProgress,
  Divider,
  CircularProgress,
  Alert,
} from "@mui/material"
import {
  MoreVert,
  Search,
  FilterList,
  Recommend,
  Person,
  CalendarToday,
  Category,
  CheckCircle,
} from "@mui/icons-material"

import { useGetAllFeedbacksQuery } from "@/redux/api/feedbackApi"
import FeedbackFormModal from "../_components/FeedbackForm"

const SuggestionsList = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSuggestion, setSelectedSuggestion] = useState<any>(null)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [feedbackModalOpen, setFeedbackModalOpen] = useState(false)
  const [updateMode, setUpdateMode] = useState(false)
  const [selectedForUpdate, setSelectedForUpdate] = useState<any>(null)
  const [page, setPage] = useState(1)
  const [limit] = useState(10)

  // API Query with filters for suggestions only
  const {
    data: feedbackData,
    isLoading,
    error,
  } = useGetAllFeedbacksQuery({
    limit,
    page,
    searchTerm,
    type: "suggestion", // Filter only suggestions
  })

  const handleOpenFeedbackModal = () => {
    setUpdateMode(false)
    setSelectedForUpdate(null)
    setFeedbackModalOpen(true)
  }

  const handleCloseFeedbackModal = () => {
    setFeedbackModalOpen(false)
    setUpdateMode(false)
    setSelectedForUpdate(null)
  }

  const handleOpenUpdateModal = (suggestion: any) => {
    setSelectedForUpdate(suggestion)
    setUpdateMode(true)
    setFeedbackModalOpen(true)
    setAnchorEl(null)
  }

  const handleUpdateFeedback = (updatedData: any) => {
    // Here you would typically call your update API
    console.log("Updated feedback:", updatedData)
    // You might want to refetch the data or update the local state
  }

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case "implemented":
        return "success"
      case "in progress":
      case "in_progress":
        return "info"
      case "under review":
      case "under_review":
        return "warning"
      case "rejected":
        return "error"
      default:
        return "default"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority?.toLowerCase()) {
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

  const getCostColor = (cost: string) => {
    switch (cost?.toLowerCase()) {
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  // Get suggestions from API data
  const suggestions = feedbackData?.data || []
  const totalSuggestions = feedbackData?.meta?.total || 0

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "400px" }}>
        <CircularProgress size={60} />
      </Box>
    )
  }

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error">Failed to load suggestions. Please try again later.</Alert>
      </Box>
    )
  }

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>
        Suggestions Management
        <Typography variant="subtitle1" color="text.secondary">
          পরামর্শ ব্যবস্থাপনা ({totalSuggestions} suggestions)
        </Typography>
      </Typography>

      {/* Add Feedback Button */}
      <Box sx={{ mb: 3 }}>
        <Button
          variant="contained"
          size="large"
          startIcon={<Recommend />}
          onClick={handleOpenFeedbackModal}
          sx={{
            background: "linear-gradient(135deg, #4caf50 0%, #388e3c 100%)",
            color: "white",
            py: 2,
            px: 4,
            borderRadius: 3,
            fontSize: "1.1rem",
            fontWeight: 600,
            boxShadow: "0 8px 25px rgba(76, 175, 80, 0.3)",
            transition: "all 0.3s ease",
            "&:hover": {
              transform: "translateY(-2px)",
              boxShadow: "0 12px 35px rgba(76, 175, 80, 0.4)",
              background: "linear-gradient(135deg, #388e3c 0%, #2e7d32 100%)",
            },
          }}
        >
          Suggest Improvements
          <Typography variant="body2" sx={{ ml: 2, opacity: 0.9, fontSize: "0.85rem" }}>
            পরামর্শ দিন
          </Typography>
        </Button>
      </Box>

      {/* Search and Filter */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={8}>
              <TextField
                fullWidth
                placeholder="Search suggestions..."
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

      {/* Suggestions List */}
      {suggestions.length === 0 ? (
        <Card>
          <CardContent sx={{ textAlign: "center", py: 6 }}>
            <Recommend sx={{ fontSize: 64, color: "text.secondary", mb: 2 }} />
            <Typography variant="h6" color="text.secondary" gutterBottom>
              No suggestions found
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {searchTerm ? "Try adjusting your search terms" : "No suggestions have been submitted yet"}
            </Typography>
          </CardContent>
        </Card>
      ) : (
        <Grid container spacing={3}>
          {suggestions?.feedbacks?.map((suggestion: any) => (
            <Grid item xs={12} key={suggestion._id || suggestion.id}>
              <Card
                sx={{
                  border: "1px solid #4caf5030",
                  borderLeft: "4px solid #4caf50",
                  background: "linear-gradient(135deg, #e8f5e8 0%, #ffffff 100%)",
                }}
              >
                <CardContent>
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 2 }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                      <Avatar sx={{ backgroundColor: "#4caf50" }}>
                        <Recommend />
                      </Avatar>
                      <Box>
                        <Typography variant="h6" sx={{ fontWeight: 600 }}>
                          {suggestion.title}
                        </Typography>
                        <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
                          <Chip
                            label={suggestion.status}
                            color={getStatusColor(suggestion.status) as any}
                            size="small"
                          />
                          <Chip
                            label={suggestion.priority}
                            size="small"
                            sx={{
                              backgroundColor: getPriorityColor(suggestion.priority) + "20",
                              color: getPriorityColor(suggestion.priority),
                            }}
                          />
                          <Chip label={suggestion.category} variant="outlined" size="small" />
                        </Box>
                      </Box>
                    </Box>
                    <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
                      <MoreVert />
                    </IconButton>
                  </Box>

                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {suggestion.description}
                  </Typography>

                  {/* Implementation Progress */}
                  {suggestion.implementationProgress !== undefined && (
                    <Box sx={{ mb: 2 }}>
                      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          Implementation Progress
                        </Typography>
                        <Typography variant="body2">{suggestion.implementationProgress}%</Typography>
                      </Box>
                      <LinearProgress
                        variant="determinate"
                        value={suggestion.implementationProgress}
                        sx={{
                          height: 8,
                          borderRadius: 4,
                          backgroundColor: "#e0e0e0",
                          "& .MuiLinearProgress-bar": {
                            backgroundColor: suggestion.implementationProgress === 100 ? "#4caf50" : "#2196f3",
                          },
                        }}
                      />
                    </Box>
                  )}

                  <Box sx={{ display: "flex", alignItems: "center", gap: 3, flexWrap: "wrap", mb: 2 }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Person sx={{ fontSize: 16, color: "text.secondary" }} />
                      <Typography variant="body2">
                        {suggestion.user?.name || suggestion.submittedBy || "Anonymous"}(
                        {suggestion.user?.role || "User"})
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <CalendarToday sx={{ fontSize: 16, color: "text.secondary" }} />
                      <Typography variant="body2">{formatDate(suggestion.createdAt || suggestion.date)}</Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Category sx={{ fontSize: 16, color: "text.secondary" }} />
                      <Typography variant="body2">{suggestion.department}</Typography>
                    </Box>
                  </Box>

                  <Box sx={{ display: "flex", gap: 1, mb: 2, flexWrap: "wrap" }}>
                    {suggestion.estimatedCost && (
                      <Chip
                        label={`Cost: ${suggestion.estimatedCost}`}
                        size="small"
                        sx={{
                          backgroundColor: getCostColor(suggestion.estimatedCost) + "20",
                          color: getCostColor(suggestion.estimatedCost),
                        }}
                      />
                    )}
                    {suggestion.timeframe && (
                      <Chip label={`Timeline: ${suggestion.timeframe}`} size="small" variant="outlined" />
                    )}
                  </Box>

                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Typography variant="body2" color="text.secondary">
                      {suggestion.benefits?.length || 0} benefit(s) identified
                    </Typography>
                    <Box sx={{ display: "flex", gap: 1 }}>
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() => handleOpenUpdateModal(suggestion)}
                        sx={{ minWidth: "auto", px: 2 }}
                      >
                        Edit
                      </Button>
                      <Button variant="outlined" size="small" onClick={() => setSelectedSuggestion(suggestion)}>
                        View Details
                      </Button>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Action Menu */}
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
        <MenuItem onClick={() => handleOpenUpdateModal(selectedSuggestion)}>Edit Feedback</MenuItem>
        <MenuItem onClick={() => setAnchorEl(null)}>Update Status</MenuItem>
        <MenuItem onClick={() => setAnchorEl(null)}>Assign for Implementation</MenuItem>
        <MenuItem onClick={() => setAnchorEl(null)}>Update Progress</MenuItem>
        <MenuItem onClick={() => setAnchorEl(null)}>Mark as Complete</MenuItem>
      </Menu>

      {/* Detail Dialog */}
      <Dialog open={Boolean(selectedSuggestion)} onClose={() => setSelectedSuggestion(null)} maxWidth="md" fullWidth>
        {selectedSuggestion && (
          <>
            <DialogTitle>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Avatar sx={{ backgroundColor: "#4caf50" }}>
                  <Recommend />
                </Avatar>
                <Box>
                  <Typography variant="h6">{selectedSuggestion.title}</Typography>
                  <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
                    <Chip
                      label={selectedSuggestion.status}
                      color={getStatusColor(selectedSuggestion.status) as any}
                      size="small"
                    />
                    <Chip
                      label={selectedSuggestion.priority}
                      size="small"
                      sx={{
                        backgroundColor: getPriorityColor(selectedSuggestion.priority) + "20",
                        color: getPriorityColor(selectedSuggestion.priority),
                      }}
                    />
                  </Box>
                </Box>
              </Box>
            </DialogTitle>
            <DialogContent>
              <Typography variant="body1" sx={{ mb: 3 }}>
                {selectedSuggestion.description}
              </Typography>

              {selectedSuggestion.implementationProgress !== undefined && (
                <Box sx={{ mb: 3 }}>
                  <Typography variant="h6" sx={{ mb: 2 }}>
                    Implementation Progress
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={selectedSuggestion.implementationProgress}
                    sx={{
                      height: 12,
                      borderRadius: 6,
                      backgroundColor: "#e0e0e0",
                      "& .MuiLinearProgress-bar": {
                        backgroundColor: selectedSuggestion.implementationProgress === 100 ? "#4caf50" : "#2196f3",
                      },
                    }}
                  />
                  <Typography variant="body2" sx={{ mt: 1, textAlign: "center" }}>
                    {selectedSuggestion.implementationProgress}% Complete
                  </Typography>
                </Box>
              )}

              <Grid container spacing={2} sx={{ mb: 3 }}>
                {selectedSuggestion.estimatedCost && (
                  <Grid item xs={6}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Estimated Cost
                    </Typography>
                    <Chip
                      label={selectedSuggestion.estimatedCost}
                      sx={{
                        backgroundColor: getCostColor(selectedSuggestion.estimatedCost) + "20",
                        color: getCostColor(selectedSuggestion.estimatedCost),
                      }}
                    />
                  </Grid>
                )}
                {selectedSuggestion.timeframe && (
                  <Grid item xs={6}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Timeline
                    </Typography>
                    <Typography variant="body1">{selectedSuggestion.timeframe}</Typography>
                  </Grid>
                )}
              </Grid>

              <Divider sx={{ my: 2 }} />

              <Typography variant="h6" sx={{ mb: 2 }}>
                Expected Benefits
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                {selectedSuggestion.benefits?.length > 0 ? (
                  selectedSuggestion.benefits.map((benefit: string, index: number) => (
                    <Box key={index} sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <CheckCircle sx={{ color: "#4caf50", fontSize: 20 }} />
                      <Typography variant="body2">{benefit}</Typography>
                    </Box>
                  ))
                ) : (
                  <Typography variant="body2" color="text.secondary">
                    No benefits specified
                  </Typography>
                )}
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setSelectedSuggestion(null)}>Close</Button>
              <Button variant="contained" color="success">
                Approve Implementation
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>

      {/* Feedback Form Modal - handles both create and update */}
      <FeedbackFormModal
        open={feedbackModalOpen}
        onClose={handleCloseFeedbackModal}
        preSelectedType="suggestion"
        // updateData={selectedForUpdate}
        // isUpdateMode={updateMode}
      />
    </Box>
  )
}

export default SuggestionsList
