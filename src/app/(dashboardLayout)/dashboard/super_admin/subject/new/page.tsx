/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { classes, paper } from "@/options"

import CraftInput from "@/components/Forms/Input"
import { Add, Remove } from "@mui/icons-material"
import { useState } from "react"

const roboto = Roboto({
    weight: ["300", "400", "500", "700"],
    subsets: ["latin"],
})


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
    const [lessonNames, setLessonNames] = useState<string[]>([""])

    const theme = customTheme

    const handleSubmit = () => {
    }

    const handleLessonChange = (index: number, value: string) => {
        const updated = [...lessonNames]
        updated[index] = value
        setLessonNames(updated)
    }

    const addLessonField = () => {
        setLessonNames([...lessonNames, ""])
    }

    const removeLessonField = (index: number) => {
        if (lessonNames.length === 1) return 
        const updated = [...lessonNames]
        updated.splice(index, 1)
        setLessonNames(updated)
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
                                    <h1 className="font-[900] text-black text-2xl md:text-5xl text-left">+ Add New Subject</h1>
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
                                                    name="code"
                                                    label="Subject Code"
                                                    placeholder="Write Subject Code"
                                                    sx={{ minWidth: 150 }}
                                                />
                                                <CraftInput
                                                    name="name"
                                                    label="Subject Name"
                                                    placeholder="Write Subject Name"
                                                    sx={{ minWidth: 350 }}
                                                />
                                                <CraftSelect
                                                    size="medium"
                                                    name="Paper"
                                                    label="Paper"
                                                    items={paper}
                                                    sx={{ minWidth: 50 }}
                                                />

                                                <CraftSelect
                                                    size="medium"
                                                    name="Class"
                                                    label="Role"
                                                    items={classes}
                                                    sx={{ minWidth: 50 }}
                                                />

                                                <CraftInput
                                                    name="lesson"
                                                    label="Total Lesson"
                                                    placeholder="Write Total Lesson"
                                                    sx={{ minWidth: 150 }}
                                                />

                                                <div className="flex flex-col gap-3 w-full">
                                                    {lessonNames.map((lesson: any, index: any) => (
                                                        <div key={index} className="flex gap-3 items-center">
                                                            <CraftInput
                                                                name={`lessonName_${index}`}
                                                                label={`Lesson Name ${index + 1}`}
                                                                placeholder="Write Lesson Name"
                                                                value={lesson}
                                                                onChange={(e: any) => handleLessonChange(index, e.target.value)}
                                                                sx={{ minWidth: 350, flexGrow: 1 }}
                                                            />
                                                            <button                                                            
                                                                className="border border-red-400 rounded-full p-1 cursor-pointer"
                                                                onClick={() => removeLessonField(index)}
                                                            >
                                                                <Remove sx={{ color: "red" }} />
                                                            </button>
                                                            <button className="border border-blue-400 rounded-full p-1 cursor-pointer" onClick={addLessonField}>
                                                                <Add />
                                                            </button>
                                                        </div>
                                                    ))}

                                                </div>

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
