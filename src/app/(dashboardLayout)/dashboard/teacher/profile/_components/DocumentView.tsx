/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import type React from "react"
import { useState, useEffect } from "react"
import {
  Box,
  Card,
  CardContent,
  Typography,
  IconButton,
  Grid,
  Tooltip,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  Button,
  alpha,
  useTheme,
  Chip,
  Paper,
  CircularProgress,
  Alert,
  Tab,
  Tabs,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material"
import {
  Description,
  Download,
  Visibility,
  Close,
  FileCopy,
  PictureAsPdf,
  OpenInNew,
  Error as ErrorIcon,
  Google,
  MoreVert,
  ViewInAr,
  Link as LinkIcon,
} from "@mui/icons-material"

interface DocumentViewerProps {
  documents: {
    id: string
    title: string
    description: string
    url: string
    type: string
    icon: React.ReactNode
    color: string
  }[]
}

const PDFDocumentViewer: React.FC<DocumentViewerProps> = ({ documents }) => {
  const theme = useTheme()
  const [selectedDoc, setSelectedDoc] = useState<string | null>(null)
  const [selectedDocTitle, setSelectedDocTitle] = useState<string>("")
  const [openDialog, setOpenDialog] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [viewerTab, setViewerTab] = useState(0)
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null)
  const [activeDocId, setActiveDocId] = useState<string | null>(null)

  // Reset error state when changing tabs
  useEffect(() => {
    setError(false)
    setLoading(true)
  }, [viewerTab])

  const handleOpenDocument = (url: string, title: string) => {
    setSelectedDoc(url)
    setSelectedDocTitle(title)
    setOpenDialog(true)
    setLoading(true)
    setError(false)
    setViewerTab(0) // Start with native viewer
  }

  const handleCloseDialog = () => {
    setOpenDialog(false)
    setSelectedDoc(null)
    setError(false)
    setViewerTab(0)
  }

  const handleDownload = (url: string, title: string) => {
    window.open(url, "_blank")
  }

  const handleIframeLoad = () => {
    setLoading(false)
  }

  const handleIframeError = () => {
    setLoading(false)
    setError(true)
  }

  const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
    setViewerTab(newValue)
  }

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, docId: string) => {
    setMenuAnchorEl(event.currentTarget)
    setActiveDocId(docId)
  }

  const handleMenuClose = () => {
    setMenuAnchorEl(null)
    setActiveDocId(null)
  }

  // Create Google Docs Viewer URL
  const getGoogleViewerUrl = (url: string) => {
    return `https://docs.google.com/viewer?url=${encodeURIComponent(url)}&embedded=true`
  }

  // Create Microsoft Office Viewer URL
  const getMicrosoftViewerUrl = (url: string) => {
    return `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(url)}`
  }

  // Create PDF.js viewer URL (using Mozilla's PDF.js viewer)
  const getPDFJSViewerUrl = (url: string) => {
    return `https://mozilla.github.io/pdf.js/web/viewer.html?file=${encodeURIComponent(url)}`
  }

  // Find the active document
  const activeDoc = documents.find((doc) => doc.id === activeDocId)

  return (
    <>
      <Card
        elevation={0}
        sx={{
          borderRadius: 3,
          border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.05)",
          transition: "all 0.3s ease",
          overflow: "visible",
          "&:hover": {
            boxShadow: "0 8px 30px rgba(0, 0, 0, 0.08)",
            borderColor: alpha(theme.palette.primary.main, 0.2),
          },
        }}
      >
        <CardContent sx={{ p: 3 }}>
          <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ display: "flex", alignItems: "center" }}>
            <Description sx={{ mr: 1, color: theme.palette.primary.main }} />
            Teacher Documents
          </Typography>

          <Grid container spacing={3} sx={{ mt: 1 }}>
            {documents.map((doc) => (
              <Grid item xs={12} sm={6} md={4} key={doc.id}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 3,
                    borderRadius: 3,
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    bgcolor: alpha(doc.color, 0.05),
                    border: `1px solid ${alpha(doc.color, 0.2)}`,
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-5px)",
                      boxShadow: "0 10px 25px rgba(0, 0, 0, 0.08)",
                      bgcolor: alpha(doc.color, 0.1),
                    },
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      mb: 2,
                    }}
                  >
                    <Box
                      sx={{
                        width: 50,
                        height: 50,
                        borderRadius: 2,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        bgcolor: alpha(doc.color, 0.2),
                        color: doc.color,
                      }}
                    >
                      {doc.icon}
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Chip
                        label={doc.type}
                        size="small"
                        sx={{
                          mr: 1,
                          bgcolor: alpha(doc.color, 0.1),
                          color: doc.color,
                          fontWeight: "medium",
                          borderRadius: "8px",
                        }}
                      />
                      <IconButton
                        size="small"
                        onClick={(e) => handleMenuOpen(e, doc.id)}
                        sx={{
                          color: theme.palette.text.secondary,
                          "&:hover": { color: theme.palette.primary.main },
                        }}
                      >
                        <MoreVert fontSize="small" />
                      </IconButton>
                    </Box>
                  </Box>

                  <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                    {doc.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2, flexGrow: 1 }}>
                    {doc.description}
                  </Typography>

                  <Box sx={{ display: "flex", gap: 1, mt: "auto" }}>
                    <Tooltip title="View Document">
                      <IconButton
                        onClick={() => handleOpenDocument(doc.url, doc.title)}
                        sx={{
                          bgcolor: alpha(doc.color, 0.1),
                          color: doc.color,
                          transition: "all 0.2s ease",
                          "&:hover": {
                            bgcolor: alpha(doc.color, 0.2),
                            transform: "translateY(-2px)",
                          },
                        }}
                      >
                        <Visibility />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Download Document">
                      <IconButton
                        onClick={() => handleDownload(doc.url, doc.title)}
                        sx={{
                          bgcolor: alpha(theme.palette.primary.main, 0.1),
                          color: theme.palette.primary.main,
                          transition: "all 0.2s ease",
                          "&:hover": {
                            bgcolor: alpha(theme.palette.primary.main, 0.2),
                            transform: "translateY(-2px)",
                          },
                        }}
                      >
                        <Download />
                      </IconButton>
                    </Tooltip>
                    <Button
                      variant="contained"
                      fullWidth
                      startIcon={<Visibility />}
                      onClick={() => handleOpenDocument(doc.url, doc.title)}
                      sx={{
                        bgcolor: doc.color,
                        color: "#fff",
                        borderRadius: 2,
                        boxShadow: `0 4px 14px ${alpha(doc.color, 0.4)}`,
                        transition: "all 0.2s ease",
                        "&:hover": {
                          bgcolor: doc.color,
                          transform: "translateY(-2px)",
                          boxShadow: `0 6px 20px ${alpha(doc.color, 0.5)}`,
                        },
                      }}
                    >
                      View
                    </Button>
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>

      {/* Document options menu */}
      <Menu
        anchorEl={menuAnchorEl}
        open={Boolean(menuAnchorEl)}
        onClose={handleMenuClose}
        PaperProps={{
          elevation: 3,
          sx: {
            mt: 1.5,
            minWidth: 200,
            borderRadius: 2,
            overflow: "visible",
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem
          onClick={() => {
            if (activeDoc) {
              handleOpenDocument(activeDoc.url, activeDoc.title)
            }
            handleMenuClose()
          }}
        >
          <ListItemIcon>
            <Visibility fontSize="small" />
          </ListItemIcon>
          <ListItemText>View Document</ListItemText>
        </MenuItem>
        <MenuItem
          onClick={() => {
            if (activeDoc) {
              window.open(getPDFJSViewerUrl(activeDoc.url), "_blank")
            }
            handleMenuClose()
          }}
        >
          <ListItemIcon>
            <ViewInAr fontSize="small" />
          </ListItemIcon>
          <ListItemText>Open in PDF.js Viewer</ListItemText>
        </MenuItem>
        <MenuItem
          onClick={() => {
            if (activeDoc) {
              window.open(activeDoc.url, "_blank")
            }
            handleMenuClose()
          }}
        >
          <ListItemIcon>
            <OpenInNew fontSize="small" />
          </ListItemIcon>
          <ListItemText>Open in New Tab</ListItemText>
        </MenuItem>
        <MenuItem
          onClick={() => {
            if (activeDoc) {
              handleDownload(activeDoc.url, activeDoc.title)
            }
            handleMenuClose()
          }}
        >
          <ListItemIcon>
            <Download fontSize="small" />
          </ListItemIcon>
          <ListItemText>Download</ListItemText>
        </MenuItem>
        <MenuItem
          onClick={() => {
            if (activeDoc) {
              navigator.clipboard.writeText(activeDoc.url)
            }
            handleMenuClose()
          }}
        >
          <ListItemIcon>
            <LinkIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Copy Link</ListItemText>
        </MenuItem>
      </Menu>

      {/* Document viewer dialog */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="lg"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            overflow: "hidden",
          },
        }}
      >
        <DialogTitle
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            bgcolor: theme.palette.primary.main,
            color: "white",
            py: 2,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <PictureAsPdf sx={{ mr: 1 }} />
            {selectedDocTitle || "Document Viewer"}
          </Box>
          <IconButton onClick={handleCloseDialog} sx={{ color: "white" }}>
            <Close />
          </IconButton>
        </DialogTitle>

        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={viewerTab}
            onChange={handleChangeTab}
            aria-label="document viewer tabs"
            variant="scrollable"
            scrollButtons="auto"
          >
            <Tab label="PDF.js Viewer" />
            <Tab label="Google Viewer" icon={<Google fontSize="small" />} iconPosition="start" />
            <Tab label="Microsoft Viewer" />
            <Tab label="Native Viewer" />
          </Tabs>
        </Box>

        <DialogContent sx={{ p: 0, height: "80vh", position: "relative" }}>
          {loading && (
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 10,
                bgcolor: "rgba(255, 255, 255, 0.8)",
              }}
            >
              <Box sx={{ textAlign: "center" }}>
                <CircularProgress size={60} thickness={4} />
                <Typography variant="body1" sx={{ mt: 2 }}>
                  Loading document...
                </Typography>
              </Box>
            </Box>
          )}

          {/* PDF.js Viewer (Mozilla) */}
          {viewerTab === 0 && selectedDoc && (
            <iframe
              src={getPDFJSViewerUrl(selectedDoc)}
              width="100%"
              height="100%"
              style={{ border: "none" }}
              onLoad={handleIframeLoad}
              onError={handleIframeError}
              title="PDF.js Document Viewer"
            />
          )}

          {/* Google Docs Viewer */}
          {viewerTab === 1 && selectedDoc && (
            <iframe
              src={getGoogleViewerUrl(selectedDoc)}
              width="100%"
              height="100%"
              style={{ border: "none" }}
              onLoad={handleIframeLoad}
              onError={handleIframeError}
              title="Google Document Viewer"
            />
          )}

          {/* Microsoft Office Viewer */}
          {viewerTab === 2 && selectedDoc && (
            <iframe
              src={getMicrosoftViewerUrl(selectedDoc)}
              width="100%"
              height="100%"
              style={{ border: "none" }}
              onLoad={handleIframeLoad}
              onError={handleIframeError}
              title="Microsoft Document Viewer"
            />
          )}

          {/* Native Browser Viewer */}
          {viewerTab === 3 && (
            <>
              {error ? (
                <Box
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    p: 3,
                  }}
                >
                  <ErrorIcon color="error" sx={{ fontSize: 60, mb: 2 }} />
                  <Typography variant="h6" gutterBottom color="error">
                    Failed to load PDF document
                  </Typography>
                  <Alert severity="warning" sx={{ mb: 3, width: "100%", maxWidth: 500 }}>
                    The document might be protected or the server doesn't allow embedding. Try using another viewer tab
                    or opening it directly in a new tab.
                  </Alert>
                  <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", justifyContent: "center" }}>
                    <Button variant="outlined" startIcon={<Google />} onClick={() => setViewerTab(1)}>
                      Try Google Viewer
                    </Button>
                    <Button variant="outlined" startIcon={<ViewInAr />} onClick={() => setViewerTab(0)}>
                      Try PDF.js Viewer
                    </Button>
                    <Button
                      variant="contained"
                      startIcon={<OpenInNew />}
                      onClick={() => {
                        if (selectedDoc) {
                          window.open(selectedDoc, "_blank", "noopener,noreferrer")
                        }
                      }}
                    >
                      Open in New Tab
                    </Button>
                  </Box>
                </Box>
              ) : (
                selectedDoc && (
                  <object
                    data={selectedDoc}
                    type="application/pdf"
                    width="100%"
                    height="100%"
                    onLoad={handleIframeLoad}
                    onError={handleIframeError}
                  >
                    <embed src={selectedDoc} type="application/pdf" width="100%" height="100%" />
                    <p>
                      This browser does not support PDFs. Please download the PDF to view it:
                      <a href={selectedDoc} target="_blank" rel="noopener noreferrer">
                        Download PDF
                      </a>
                    </p>
                  </object>
                )
              )}
            </>
          )}
        </DialogContent>
        <DialogActions sx={{ p: 2, justifyContent: "space-between" }}>
          <Button
            startIcon={<FileCopy />}
            onClick={() => {
              if (selectedDoc) {
                navigator.clipboard.writeText(selectedDoc)
              }
            }}
          >
            Copy Link
          </Button>
          <Box>
            <Button
              sx={{ mr: 1 }}
              startIcon={<OpenInNew />}
              onClick={() => {
                if (selectedDoc) {
                  window.open(selectedDoc, "_blank", "noopener,noreferrer")
                }
              }}
            >
              Open in New Tab
            </Button>
            <Button
              variant="contained"
              startIcon={<Download />}
              onClick={() => {
                if (selectedDoc && selectedDocTitle) {
                  handleDownload(selectedDoc, selectedDocTitle)
                }
              }}
            >
              Download
            </Button>
          </Box>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default PDFDocumentViewer
