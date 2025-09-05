"use client"

import type React from "react"
import { useState } from "react"
import { Box, TextField, Button, Typography, Card, CardContent, Grid } from "@mui/material"
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline"
import Link from "next/link"
import ClassIcon from "@mui/icons-material/Class"

export default function AddClassPage() {
  const [formData, setFormData] = useState({
    className: "",
    classCode: "",
    teacherId: "", // Assuming a teacher ID will be linked
    capacity: "",
    description: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("New Class Data:", formData)
    // Here you would typically send this data to your backend API
    alert("Class Added (check console for data)")
    setFormData({
      className: "",
      classCode: "",
      teacherId: "",
      capacity: "",
      description: "",
    })
  }

  return (
    <Box
      sx={{
        p: { xs: 2, md: 6 },
        minHeight: "calc(100vh - 64px)",
        bgcolor: "background.default",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card sx={{ maxWidth: '100%', width: "xl", p: { xs: 2, md: 4 } }}>
        <CardContent>
          <Box sx={{ display: "flex", alignItems: "center", mb: { xs: 3, md: 4 }, justifyContent: "center" }}>
            <ClassIcon sx={{ fontSize: 48, color: "primary.main", mr: 2 }} />
            <Typography variant="h4" component="h1" sx={{ fontWeight: 600, color: "primary.dark" }}>
              Add New Class
            </Typography>
          </Box>
          <Typography variant="body1" color="text.secondary" align="center" sx={{ mb: { xs: 3, md: 5 } }}>
            Enter the details for the new class.
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={{ xs: 2, md: 4 }}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Class Name"
                  name="className"
                  value={formData.className}
                  onChange={handleChange}
                  
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Class Code"
                  name="classCode"
                  value={formData.classCode}
                  onChange={handleChange}
                  
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Assigned Teacher ID"
                  name="teacherId"
                  value={formData.teacherId}
                  onChange={handleChange}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Capacity"
                  name="capacity"
                  type="number"
                  value={formData.capacity}
                  onChange={handleChange}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  multiline
                  rows={3}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mt: { xs: 2, md: 4 } }}>
                <Button variant="outlined" component={Link} href="/classes/list">
                  Cancel
                </Button>
                <Button type="submit" variant="contained" color="primary" startIcon={<AddCircleOutlineIcon />}>
                  Add Class
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </Box>
  )
}
