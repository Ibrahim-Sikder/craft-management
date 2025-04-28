import { createTheme } from "@mui/material"
import { Roboto } from "next/font/google"
export const roboto = Roboto({
    weight: ["300", "400", "500", "700"],
    subsets: ["latin"],
})

export const customTheme = createTheme({
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