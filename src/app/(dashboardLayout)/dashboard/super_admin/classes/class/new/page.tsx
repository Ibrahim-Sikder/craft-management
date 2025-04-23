/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState, useRef } from "react"
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  
  IconButton,

  Card,
  CardContent,
  Grid,
  Chip,
  Tooltip,
} from "@mui/material"
import {
  Add as AddIcon,
  Save as SaveIcon,
  Delete as DeleteIcon,
 
} from "@mui/icons-material"
import {  createTheme } from "@mui/material/styles"
import { Roboto } from "next/font/google"
import { Editor } from "@tinymce/tinymce-react"

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
})


const theme = createTheme({
  palette: {
    primary: {
      main: "#6366f1", // Indigo color for primary
      light: "#818cf8",
      dark: "#4f46e5",
    },
    secondary: {
      main: "#ec4899", // Pink color for secondary
      light: "#f472b6",
      dark: "#db2777",
    },
    background: {
      default: "#f9fafb",
      paper: "#ffffff",
    },
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
    h4: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: 8,
          padding: "10px 20px",
          boxShadow: "none",
          "&:hover": {
            boxShadow: "0px 4px 8px rgba(99, 102, 241, 0.2)",
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.05)",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.05)",
          overflow: "visible",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: 8,
          },
        },
      },
    },
  },
})

export default function ClassAddPage() {
  const [classes, setClasses] = useState([{ id: 1, name: "", description: "" }])
  const editorRefs = useRef<any>({})

  const handleAddClass = () => {
    setClasses([...classes, { id: classes.length + 1, name: "", description: "" }])
  }

  const handleRemoveClass = (id: number) => {
    if (classes.length > 1) {
      setClasses(classes.filter((cls) => cls.id !== id))
    }
  }

  const handleNameChange = (id: number, value: string) => {
    setClasses(classes.map((cls) => (cls.id === id ? { ...cls, name: value } : cls)))
  }

  const handleDescriptionChange = (id: number, value: string) => {
    setClasses(classes.map((cls) => (cls.id === id ? { ...cls, description: value } : cls)))
  }

  const handleSave = () => {
    const updatedClasses = classes.map((cls) => {
      const content = editorRefs.current[cls.id]?.getContent() || cls.description
      return {
        ...cls,
        description: content,
      }
    })

  }

  return (

      <Box sx={{ flexGrow: 1, bgcolor: "background.default", minHeight: "100vh" }}>
        <Container maxWidth="lg" sx={{ mt: 4, mb: 8 }}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              mb: 4,
              borderTop: `4px solid ${theme.palette.primary.main}`,
              position: "relative",
              overflow: "visible",
            }}
          >
            <Box
              sx={{
                position: "absolute",
                top: -20,
                left: 24,
                bgcolor: theme.palette.primary.main,
                color: "white",
                py: 1,
                px: 2,
                borderRadius: 2,
                boxShadow: "0px 4px 12px rgba(99, 102, 241, 0.2)",
              }}
            >
              <Typography variant="subtitle1" fontWeight="bold">
                Class Details
              </Typography>
            </Box>

            {classes.map((cls, index) => (
              <Card
                key={cls.id}
                sx={{
                  mb: 3,
                  position: "relative",
                  border: "1px solid rgba(0,0,0,0.08)",
                  "&:hover": {
                    boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.08)",
                  },
                  transition: "all 0.3s ease",
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                        <Chip label={`Class ${index + 1}`} color="primary" size="small" sx={{ mr: 2 }} />
                        {classes.length > 1 && (
                          <Tooltip title="Remove this class">
                            <IconButton
                              color="error"
                              size="small"
                              onClick={() => handleRemoveClass(cls.id)}
                              sx={{
                                ml: "auto",
                                bgcolor: "rgba(239, 68, 68, 0.1)",
                                "&:hover": {
                                  bgcolor: "rgba(239, 68, 68, 0.2)",
                                },
                              }}
                            >
                              <DeleteIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        )}
                      </Box>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Class Name"
                        variant="outlined"
                        value={cls.name}
                        onChange={(e) => handleNameChange(cls.id, e.target.value)}
                        placeholder="Enter class name"
                        InputProps={{
                          sx: { bgcolor: "white" },
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                        Description
                      </Typography>
                      <Paper
                        variant="outlined"
                        sx={{
                          overflow: "hidden",
                          border: "1px solid rgba(0,0,0,0.15)",
                          borderRadius: 2,
                        }}
                      >
                        <Editor
                          apiKey="your-api-key" // Sign up for a free TinyMCE API key at https://www.tiny.cloud/
                          onInit={(evt, editor) => (editorRefs.current[cls.id] = editor)}
                          initialValue={cls.description}
                          init={{
                            height: 300,
                            menubar: false,
                            plugins: [
                              "advlist",
                              "autolink",
                              "lists",
                              "link",
                              "image",
                              "charmap",
                              "preview",
                              "anchor",
                              "searchreplace",
                              "visualblocks",
                              "code",
                              "fullscreen",
                              "insertdatetime",
                              "media",
                              "table",
                              "code",
                              "help",
                              "wordcount",
                            ],
                            toolbar:
                              "undo redo | blocks | " +
                              "bold italic forecolor | alignleft aligncenter " +
                              "alignright alignjustify | bullist numlist outdent indent | " +
                              "removeformat | help",
                            content_style: "body { font-family:Roboto,Arial,sans-serif; font-size:14px }",
                            skin: "oxide",
                            statusbar: false,
                            branding: false,
                          }}
                          onEditorChange={(content) => handleDescriptionChange(cls.id, content)}
                        />
                      </Paper>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            ))}

            <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
              <Button
                variant="outlined"
                color="primary"
                startIcon={<AddIcon />}
                onClick={handleAddClass}
                sx={{
                  px: 4,
                  borderStyle: "dashed",
                  "&:hover": {
                    borderStyle: "dashed",
                  },
                }}
              >
                Add More
              </Button>
            </Box>
          </Paper>

          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              startIcon={<SaveIcon />}
              onClick={handleSave}
              sx={{
                px: 6,
                py: 1.5,
                fontSize: "1rem",
                boxShadow: "0px 8px 16px rgba(99, 102, 241, 0.2)",
                "&:hover": {
                  boxShadow: "0px 8px 20px rgba(99, 102, 241, 0.4)",
                },
              }}
            >
              Save
            </Button>
          </Box>
        </Container>
      </Box>

  )
}

