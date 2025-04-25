"use client"

import {
  Box,
  Container,
  Button,
  Paper, 
  Fade,
  createTheme,
  ThemeProvider,
} from "@mui/material"

import { Roboto } from "next/font/google"
import CraftForm from "@/components/Forms/Form"
import CraftSelect from "@/components/Forms/Select"
import {userRole } from "@/options"

import CraftInput from "@/components/Forms/Input"
import { Add } from "@mui/icons-material"

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
})

// Create a custom theme with vibrant colors
const customTheme = createTheme({
  palette: {
    primary: {
      main: "#6366f1",
      light: "#818cf8",
      dark: "#4f46e5",
    },
    secondary: {
      main: "#ec4899",
      light: "#f472b6",
      dark: "#db2777",
    },
    background: {
      default: "#f9fafb",
      paper: "#ffffff",
    },
    success: {
      main: "#10b981",
      light: "#34d399",
      dark: "#059669",
    },
    warning: {
      main: "#f59e0b",
      light: "#fbbf24",
      dark: "#d97706",
    },
    error: {
      main: "#ef4444",
      light: "#f87171",
      dark: "#dc2626",
    },
    info: {
      main: "#3b82f6",
      light: "#60a5fa",
      dark: "#2563eb",
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
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: "1px solid rgba(0, 0, 0, 0.06)",
          padding: "16px",
        },
        head: {
          fontWeight: 600,
          backgroundColor: "rgba(99, 102, 241, 0.04)",
          color: "#6366f1",
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          "&:hover": {
            backgroundColor: "rgba(99, 102, 241, 0.04)",
          },
          "&:last-child td": {
            borderBottom: 0,
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 500,
        },
      },
    },
  },
})


export default function NewUser() {




  const theme = customTheme



  const handleSubmit = () => {
  }






  return (
    <>
      <ThemeProvider theme={theme}>
        <Box sx={{ flexGrow: 1, bgcolor: "background.default", minHeight: "100vh", borderRadius: 2 }}>
          <Container maxWidth="xl" sx={{ mt: 0, mb: 8, borderRadius: 2 }}>
            <Fade in={true} timeout={800}>
              <Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 3,
                    flexWrap: "wrap",
                    gap: 2,
                    paddingTop: 2,
                  }}
                >
                  <h1 className="font-[900] text-black text-2xl md:text-5xl text-left">+ Add New User</h1>               
                  <Box sx={{ display: "flex", gap: 2 }}>
                    <Button
                      variant="contained"
                      color="primary"
                      startIcon={<Add />}                      
                      sx={{
                        bgcolor: "#4F0187",
                        borderRadius: 2,
                        boxShadow: "0px 4px 10px rgba(99, 102, 241, 0.2)",
                      }}
                    >
                      Add
                    </Button>
                  </Box>
                </Box>

                <Paper elevation={0} sx={{ mb: 4, overflow: "hidden" }}>
                  <Box sx={{ p: 3, borderBottom: "1px solid rgba(0, 0, 0, 0.06)" }}>
                    <CraftForm onSubmit={handleSubmit}>

                      <div className="md:flex gap-5 space-y-4">
                        <CraftInput
                          name="name"
                          label="User Name"
                          placeholder="Write New User Name"
                          sx={{ minWidth: 350 }}
                        />

                        <CraftInput
                          name="name"
                          label="Email"
                          placeholder="Write New User Name"
                          sx={{ minWidth: 350 }}
                        />
                        <CraftSelect
                          size="medium"
                          name="hour"
                          label="Role"
                          items={userRole}
                          sx={{ minWidth: 50 }}
                        />
                        <CraftInput
                          name="name"
                          label="Password"
                          placeholder="Write New User Name"
                          sx={{ minWidth: 350 }}
                        />
                      </div>

                    </CraftForm>
                  </Box>
                </Paper>
              </Box>
            </Fade>
          </Container>
        </Box>
      </ThemeProvider>
    </>
  )
}
