/* eslint-disable @typescript-eslint/no-explicit-any */
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
  Rating,
  Divider,
} from "@mui/material"
import {
  MoreVert,
  Search,
  FilterList,
  Lightbulb,
  Person,
  CalendarToday,
  Category,
  ThumbUp,
  ThumbDown,
} from "@mui/icons-material"
import FeedbackFormModal from "../_components/FeedbackForm"

const IdeasList = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedIdea, setSelectedIdea] = useState<any>(null)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [feedbackModalOpen, setFeedbackModalOpen] = useState(false)

  const handleOpenFeedbackModal = () => setFeedbackModalOpen(true)
  const handleCloseFeedbackModal = () => setFeedbackModalOpen(false)

  const ideas = [
    {
      id: 1,
      title: "Digital Library Enhancement",
      description:
        "Implement an AI-powered book recommendation system that suggests books based on student's academic interests and reading history.",
      user: "Alice Johnson",
      userRole: "Student",
      department: "Library",
      category: "Technology",
      status: "Under Review",
      date: "2024-01-15",
      rating: 4.5,
      votes: { up: 25, down: 3 },
      feasibility: "High",
      impact: "High",
    },
    {
      id: 2,
      title: "Green Campus Initiative",
      description:
        "Install solar panels on all building rooftops and create a campus-wide recycling program to make our school more environmentally friendly.",
      user: "David Wilson",
      userRole: "Teacher",
      department: "Administration",
      category: "Infrastructure",
      status: "Approved",
      date: "2024-01-12",
      rating: 4.8,
      votes: { up: 42, down: 1 },
      feasibility: "Medium",
      impact: "Very High",
    },
    {
      id: 3,
      title: "Virtual Reality Learning Labs",
      description:
        "Create VR labs for immersive learning experiences in subjects like history, science, and geography.",
      user: "Emma Davis",
      userRole: "Student",
      department: "Academic Affairs",
      category: "Technology",
      status: "In Development",
      date: "2024-01-10",
      rating: 4.2,
      votes: { up: 18, down: 5 },
      feasibility: "Low",
      impact: "High",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Approved":
        return "success"
      case "In Development":
        return "info"
      case "Under Review":
        return "warning"
      case "Rejected":
        return "error"
      default:
        return "default"
    }
  }

  const getFeasibilityColor = (feasibility: string) => {
    switch (feasibility) {
      case "High":
        return "#4caf50"
      case "Medium":
        return "#ff9800"
      case "Low":
        return "#f44336"
      default:
        return "#757575"
    }
  }

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "Very High":
        return "#2e7d32"
      case "High":
        return "#4caf50"
      case "Medium":
        return "#ff9800"
      case "Low":
        return "#f44336"
      default:
        return "#757575"
    }
  }

  const filteredIdeas = ideas.filter(
    (idea) =>
      idea.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      idea.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>
        Ideas Management
        <Typography variant="subtitle1" color="text.secondary">
          আইডিয়া ব্যবস্থাপনা
        </Typography>
      </Typography>

      {/* Add Feedback Button */}
      <Box sx={{ mb: 3 }}>
        <Button
          variant="contained"
          size="large"
          startIcon={<Lightbulb />}
          onClick={handleOpenFeedbackModal}
          sx={{
            background: "linear-gradient(135deg, #ff9800 0%, #f57c00 100%)",
            color: "white",
            py: 2,
            px: 4,
            borderRadius: 3,
            fontSize: "1.1rem",
            fontWeight: 600,
            boxShadow: "0 8px 25px rgba(255, 152, 0, 0.3)",
            transition: "all 0.3s ease",
            "&:hover": {
              transform: "translateY(-2px)",
              boxShadow: "0 12px 35px rgba(255, 152, 0, 0.4)",
              background: "linear-gradient(135deg, #f57c00 0%, #ef6c00 100%)",
            },
          }}
        >
          Share Your Ideas
          <Typography variant="body2" sx={{ ml: 2, opacity: 0.9, fontSize: "0.85rem" }}>
            আইডিয়া শেয়ার করুন
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
                placeholder="Search ideas..."
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

      {/* Ideas List */}
      <Grid container spacing={3}>
        {filteredIdeas.map((idea) => (
          <Grid item xs={12} key={idea.id}>
            <Card
              sx={{
                border: "1px solid #ff980030",
                borderLeft: "4px solid #ff9800",
                background: "linear-gradient(135deg, #fff3e0 0%, #ffffff 100%)",
              }}
            >
              <CardContent>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 2 }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Avatar sx={{ backgroundColor: "#ff9800" }}>
                      <Lightbulb />
                    </Avatar>
                    <Box>
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        {idea.title}
                      </Typography>
                      <Box sx={{ display: "flex", gap: 1, mt: 1, alignItems: "center" }}>
                        <Chip label={idea.status} color={getStatusColor(idea.status) as any} size="small" />
                        <Rating value={idea.rating} readOnly size="small" />
                        <Typography variant="body2" color="text.secondary">
                          ({idea.rating})
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                  <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
                    <MoreVert />
                  </IconButton>
                </Box>

                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {idea.description}
                </Typography>

                <Box sx={{ display: "flex", gap: 1, mb: 2, flexWrap: "wrap" }}>
                  <Chip
                    label={`Feasibility: ${idea.feasibility}`}
                    size="small"
                    sx={{
                      backgroundColor: getFeasibilityColor(idea.feasibility) + "20",
                      color: getFeasibilityColor(idea.feasibility),
                    }}
                  />
                  <Chip
                    label={`Impact: ${idea.impact}`}
                    size="small"
                    sx={{
                      backgroundColor: getImpactColor(idea.impact) + "20",
                      color: getImpactColor(idea.impact),
                    }}
                  />
                  <Chip label={idea.category} variant="outlined" size="small" />
                </Box>

                <Box sx={{ display: "flex", alignItems: "center", gap: 3, flexWrap: "wrap", mb: 2 }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Person sx={{ fontSize: 16, color: "text.secondary" }} />
                    <Typography variant="body2">
                      {idea.user} ({idea.userRole})
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <CalendarToday sx={{ fontSize: 16, color: "text.secondary" }} />
                    <Typography variant="body2">{idea.date}</Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Category sx={{ fontSize: 16, color: "text.secondary" }} />
                    <Typography variant="body2">{idea.department}</Typography>
                  </Box>
                </Box>

                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <Box sx={{ display: "flex", gap: 2 }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                      <IconButton size="small" color="success">
                        <ThumbUp fontSize="small" />
                      </IconButton>
                      <Typography variant="body2">{idea.votes.up}</Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                      <IconButton size="small" color="error">
                        <ThumbDown fontSize="small" />
                      </IconButton>
                      <Typography variant="body2">{idea.votes.down}</Typography>
                    </Box>
                  </Box>
                  <Button variant="outlined" size="small" onClick={() => setSelectedIdea(idea)}>
                    View Details
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Action Menu */}
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
        <MenuItem onClick={() => setAnchorEl(null)}>Change Status</MenuItem>
        <MenuItem onClick={() => setAnchorEl(null)}>Assign for Review</MenuItem>
        <MenuItem onClick={() => setAnchorEl(null)}>Add to Development</MenuItem>
        <MenuItem onClick={() => setAnchorEl(null)}>Archive</MenuItem>
      </Menu>

      {/* Detail Dialog */}
      <Dialog open={Boolean(selectedIdea)} onClose={() => setSelectedIdea(null)} maxWidth="md" fullWidth>
        {selectedIdea && (
          <>
            <DialogTitle>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Avatar sx={{ backgroundColor: "#ff9800" }}>
                  <Lightbulb />
                </Avatar>
                <Box>
                  <Typography variant="h6">{selectedIdea.title}</Typography>
                  <Box sx={{ display: "flex", gap: 1, mt: 1, alignItems: "center" }}>
                    <Chip label={selectedIdea.status} color={getStatusColor(selectedIdea.status) as any} size="small" />
                    <Rating value={selectedIdea.rating} readOnly size="small" />
                  </Box>
                </Box>
              </Box>
            </DialogTitle>
            <DialogContent>
              <Typography variant="body1" sx={{ mb: 3 }}>
                {selectedIdea.description}
              </Typography>

              <Grid container spacing={2} sx={{ mb: 3 }}>
                <Grid item xs={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Feasibility
                  </Typography>
                  <Chip
                    label={selectedIdea.feasibility}
                    sx={{
                      backgroundColor: getFeasibilityColor(selectedIdea.feasibility) + "20",
                      color: getFeasibilityColor(selectedIdea.feasibility),
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Impact
                  </Typography>
                  <Chip
                    label={selectedIdea.impact}
                    sx={{
                      backgroundColor: getImpactColor(selectedIdea.impact) + "20",
                      color: getImpactColor(selectedIdea.impact),
                    }}
                  />
                </Grid>
              </Grid>

              <Divider sx={{ my: 2 }} />

              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Typography variant="h6">Community Feedback</Typography>
                <Box sx={{ display: "flex", gap: 2 }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                    <ThumbUp color="success" fontSize="small" />
                    <Typography>{selectedIdea.votes.up}</Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                    <ThumbDown color="error" fontSize="small" />
                    <Typography>{selectedIdea.votes.down}</Typography>
                  </Box>
                </Box>
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setSelectedIdea(null)}>Close</Button>
              <Button variant="contained" color="success">
                Approve Idea
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>

      {/* Feedback Form Modal */}
      <FeedbackFormModal open={feedbackModalOpen} onClose={handleCloseFeedbackModal} preSelectedType="idea" />
    </Box>
  )
}

export default IdeasList
