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
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
} from "@mui/material"
import { MoreVert, Search, FilterList, ReportProblem, Person, CalendarToday, Category } from "@mui/icons-material"
import FeedbackFormModal from "../_components/FeedbackForm"
import { useGetAllFeedbacksQuery } from "@/redux/api/feedbackApi"

const ComplaintsList = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedComplaint, setSelectedComplaint] = useState<any>(null)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [feedbackModalOpen, setFeedbackModalOpen] = useState(false)
  const {data:feedBackData, isLoading} = useGetAllFeedbacksQuery({})
  console.log(feedBackData)

  const handleOpenFeedbackModal = () => setFeedbackModalOpen(true)
  const handleCloseFeedbackModal = () => setFeedbackModalOpen(false)

  const complaints = [
    {
      id: 1,
      title: "WiFi Connection Issues in Library",
      description:
        "The WiFi connection in the library is very slow and frequently disconnects. Students are unable to access online resources properly.",
      user: "John Doe",
      userRole: "Student",
      department: "IT Department",
      category: "Technology",
      priority: "High",
      status: "In Progress",
      date: "2024-01-15",
      responses: [
        {
          user: "IT Admin",
          message: "We are investigating the issue and will resolve it soon.",
          date: "2024-01-16",
        },
      ],
    }
   
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Resolved":
        return "success"
      case "In Progress":
        return "warning"
      case "Under Review":
        return "info"
      case "Pending":
        return "error"
      default:
        return "default"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Urgent":
        return "#d32f2f"
      case "High":
        return "#f44336"
      case "Medium":
        return "#ff9800"
      case "Low":
        return "#4caf50"
      default:
        return "#757575"
    }
  }

  const filteredComplaints = complaints.filter(
    (complaint) =>
      complaint.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      complaint.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>
        Complaints Management
        <Typography variant="subtitle1" color="text.secondary">
          অভিযোগ ব্যবস্থাপনা
        </Typography>
      </Typography>

      {/* Add Feedback Button */}
      <Box sx={{ mb: 3 }}>
        <Button
          variant="contained"
          size="large"
          startIcon={<ReportProblem />}
          onClick={handleOpenFeedbackModal}
          sx={{
            background: "linear-gradient(135deg, #f44336 0%, #d32f2f 100%)",
            color: "white",
            py: 2,
            px: 4,
            borderRadius: 3,
            fontSize: "1.1rem",
            fontWeight: 600,
            boxShadow: "0 8px 25px rgba(244, 67, 54, 0.3)",
            transition: "all 0.3s ease",
            "&:hover": {
              transform: "translateY(-2px)",
              boxShadow: "0 12px 35px rgba(244, 67, 54, 0.4)",
              background: "linear-gradient(135deg, #d32f2f 0%, #b71c1c 100%)",
            },
          }}
        >
          Submit New Complaint
          <Typography variant="body2" sx={{ ml: 2, opacity: 0.9, fontSize: "0.85rem" }}>
            অভিযোগ জমা দিন
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
                placeholder="Search complaints..."
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

      {/* Complaints List */}
      <Grid container spacing={3}>
        {filteredComplaints.map((complaint) => (
          <Grid item xs={12} key={complaint.id}>
            <Card
              sx={{
                border: `1px solid ${getPriorityColor(complaint.priority)}30`,
                borderLeft: `4px solid ${getPriorityColor(complaint.priority)}`,
              }}
            >
              <CardContent>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 2 }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Avatar sx={{ backgroundColor: "#f44336" }}>
                      <ReportProblem />
                    </Avatar>
                    <Box>
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        {complaint.title}
                      </Typography>
                      <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
                        <Chip label={complaint.status} color={getStatusColor(complaint.status) as any} size="small" />
                        <Chip
                          label={complaint.priority}
                          size="small"
                          sx={{
                            backgroundColor: getPriorityColor(complaint.priority) + "20",
                            color: getPriorityColor(complaint.priority),
                          }}
                        />
                        <Chip label={complaint.category} variant="outlined" size="small" />
                      </Box>
                    </Box>
                  </Box>
                  <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
                    <MoreVert />
                  </IconButton>
                </Box>

                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {complaint.description}
                </Typography>

                <Box sx={{ display: "flex", alignItems: "center", gap: 3, flexWrap: "wrap" }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Person sx={{ fontSize: 16, color: "text.secondary" }} />
                    <Typography variant="body2">
                      {complaint.user} ({complaint.userRole})
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <CalendarToday sx={{ fontSize: 16, color: "text.secondary" }} />
                    <Typography variant="body2">{complaint.date}</Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Category sx={{ fontSize: 16, color: "text.secondary" }} />
                    <Typography variant="body2">{complaint.department}</Typography>
                  </Box>
                </Box>

                <Box sx={{ mt: 2, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <Typography variant="body2" color="text.secondary">
                    {complaint.responses.length} response(s)
                  </Typography>
                  <Button variant="outlined" size="small" onClick={() => setSelectedComplaint(complaint)}>
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
        <MenuItem onClick={() => setAnchorEl(null)}>Edit Status</MenuItem>
        <MenuItem onClick={() => setAnchorEl(null)}>Assign to Department</MenuItem>
        <MenuItem onClick={() => setAnchorEl(null)}>Add Response</MenuItem>
        <MenuItem onClick={() => setAnchorEl(null)}>Mark as Resolved</MenuItem>
      </Menu>

      {/* Detail Dialog */}
      <Dialog open={Boolean(selectedComplaint)} onClose={() => setSelectedComplaint(null)} maxWidth="md" fullWidth>
        {selectedComplaint && (
          <>
            <DialogTitle>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Avatar sx={{ backgroundColor: "#f44336" }}>
                  <ReportProblem />
                </Avatar>
                <Box>
                  <Typography variant="h6">{selectedComplaint.title}</Typography>
                  <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
                    <Chip
                      label={selectedComplaint.status}
                      color={getStatusColor(selectedComplaint.status) as any}
                      size="small"
                    />
                    <Chip
                      label={selectedComplaint.priority}
                      size="small"
                      sx={{
                        backgroundColor: getPriorityColor(selectedComplaint.priority) + "20",
                        color: getPriorityColor(selectedComplaint.priority),
                      }}
                    />
                  </Box>
                </Box>
              </Box>
            </DialogTitle>
            <DialogContent>
              <Typography variant="body1" sx={{ mb: 3 }}>
                {selectedComplaint.description}
              </Typography>

              <Divider sx={{ my: 2 }} />

              <Typography variant="h6" sx={{ mb: 2 }}>
                Responses
              </Typography>

              {selectedComplaint.responses.length > 0 ? (
                <List>
                  {selectedComplaint.responses.map((response: any, index: number) => (
                    <ListItem key={index} alignItems="flex-start">
                      <ListItemAvatar>
                        <Avatar>{response.user.charAt(0)}</Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={response.user}
                        secondary={
                          <>
                            <Typography variant="body2" sx={{ mt: 1 }}>
                              {response.message}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {response.date}
                            </Typography>
                          </>
                        }
                      />
                    </ListItem>
                  ))}
                </List>
              ) : (
                <Typography variant="body2" color="text.secondary">
                  No responses yet.
                </Typography>
              )}
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setSelectedComplaint(null)}>Close</Button>
              <Button variant="contained">Add Response</Button>
            </DialogActions>
          </>
        )}
      </Dialog>

      {/* Feedback Form Modal */}
      <FeedbackFormModal open={feedbackModalOpen} onClose={handleCloseFeedbackModal} preSelectedType="complaint" />
    </Box>
  )
}

export default ComplaintsList
