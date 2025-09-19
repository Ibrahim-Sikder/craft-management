"use client"

import type React from "react"
import { useState } from "react"
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Button,
  Chip,
  Box,
  Grid,
  FormControlLabel,
  Checkbox,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Alert,
  Paper,
} from "@mui/material"
import { Printer, Download, Visibility, VisibilityOff, Settings } from "@mui/icons-material"
import { printReport, exportToPDF } from "@/lib/print-utils"

interface PrintPreviewProps {
  reportType: string
  studentName: string
  reportDate: string
  children: React.ReactNode
}

export function PrintPreview({ reportType, studentName, reportDate, children }: PrintPreviewProps) {
  const [showPreview, setShowPreview] = useState(false)
  const [printSettings, setPrintSettings] = useState({
    includeHeader: true,
    includeFooter: true,
    colorPrint: false,
    pageSize: "A4",
  })

  const handlePrint = () => {
    printReport()
  }

  const handleExportPDF = () => {
    const filename = `${reportType}_Report_${studentName}_${reportDate}.pdf`
    exportToPDF("report-content", filename)
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      {/* Print Controls */}
      <Card className="no-print" sx={{ boxShadow: 2 }}>
        <CardHeader
          title={
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Settings />
                <Typography variant="h6">Print & Export Options</Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Chip label={`${reportType} Report`} variant="outlined" />
                <Chip label={studentName} color="secondary" />
              </Box>
            </Box>
          }
        />
        <CardContent>
          {/* Print Settings */}
          <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid item xs={12} md={6} lg={3}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={printSettings.includeHeader}
                    onChange={(e) => setPrintSettings((prev) => ({ ...prev, includeHeader: e.target.checked }))}
                  />
                }
                label="Include Header"
              />
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={printSettings.includeFooter}
                    onChange={(e) => setPrintSettings((prev) => ({ ...prev, includeFooter: e.target.checked }))}
                  />
                }
                label="Include Footer"
              />
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={printSettings.colorPrint}
                    onChange={(e) => setPrintSettings((prev) => ({ ...prev, colorPrint: e.target.checked }))}
                  />
                }
                label="Color Print"
              />
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <FormControl fullWidth size="small">
                <InputLabel>Page Size</InputLabel>
                <Select
                  value={printSettings.pageSize}
                  label="Page Size"
                  onChange={(e) => setPrintSettings((prev) => ({ ...prev, pageSize: e.target.value }))}
                >
                  <MenuItem value="A4">A4</MenuItem>
                  <MenuItem value="Letter">Letter</MenuItem>
                  <MenuItem value="Legal">Legal</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          {/* Action Buttons */}
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 3 }}>
            <Button onClick={handlePrint} variant="contained" startIcon={<Printer />} sx={{ textTransform: "none" }}>
              Print Report
            </Button>
            <Button
              onClick={handleExportPDF}
              variant="outlined"
              startIcon={<Download />}
              sx={{ textTransform: "none" }}
            >
              Export as PDF
            </Button>
            <Button
              onClick={() => setShowPreview(!showPreview)}
              variant="outlined"
              startIcon={showPreview ? <VisibilityOff /> : <Visibility />}
              sx={{ textTransform: "none" }}
            >
              {showPreview ? "Hide Preview" : "Show Preview"}
            </Button>
          </Box>

          {/* Print Tips */}
          <Alert severity="info" sx={{ bgcolor: "primary.50" }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
              Print Tips:
            </Typography>
            <Box component="ul" sx={{ m: 0, pl: 2 }}>
              <li>For best results, use Chrome or Edge browser</li>
              <li>Select "More settings" → "Options" → "Background graphics" for colored elements</li>
              <li>Choose appropriate paper size (A4 recommended)</li>
              <li>Preview before printing to ensure proper formatting</li>
            </Box>
          </Alert>
        </CardContent>
      </Card>

      {/* Print Preview */}
      {showPreview && (
        <Card className="no-print" sx={{ border: "2px dashed", borderColor: "grey.300" }}>
          <CardHeader>
            <Typography variant="h6" align="center" color="text.secondary">
              Print Preview
            </Typography>
          </CardHeader>
          <CardContent>
            <Paper
              elevation={3}
              sx={{
                p: 2,
                bgcolor: "white",
                transform: "scale(0.8)",
                transformOrigin: "top left",
              }}
            >
              <div id="report-content">{children}</div>
            </Paper>
          </CardContent>
        </Card>
      )}

      {/* Actual Report Content */}
      <Box id="report-content" sx={{ display: showPreview ? "none" : "block" }}>
        {children}
      </Box>
    </Box>
  )
}
