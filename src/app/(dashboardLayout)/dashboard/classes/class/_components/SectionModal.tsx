/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import type React from "react"
import {
    Box,
    Typography,
    Button,
    Card,
    CardContent,
    Zoom,
    IconButton,
    Modal,
    CardHeader,
    CircularProgress,
    Fade,

} from "@mui/material"
import { GridCloseIcon } from "@mui/x-data-grid";
import { useCreateSectionMutation } from "@/redux/api/sectionApi";
import CraftForm from "@/components/Forms/Form";
import CraftInputWithIcon from "@/components/Forms/inputWithIcon";
import { Bookmark as BookmarkIcon } from "@mui/icons-material"
import { useState } from "react";
import { FieldValues } from "react-hook-form";
import toast from "react-hot-toast";
const SectionModal = ({ onClose, open }: any) => {
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)

    const [createSection, { isLoading: isCreating }] = useCreateSectionMutation()
    const handleSubmit = async (data: FieldValues) => {

        try {

            const res = await createSection(data).unwrap()
            if (res?.success) {
                toast.success("Section created successfully!")
                onClose()

            }
        } catch (err: any) {

            toast.error(err?.data?.message || "Failed to save section")
        } finally {
            setLoading(false)
        }
    }
    return (
        <Modal open={open} onClose={onClose} aria-labelledby="add-section-modal" closeAfterTransition>
            <Fade in={open}>
                <Box
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: { xs: "90%", sm: 500 },
                        maxWidth: 500,
                        bgcolor: "background.paper",
                        boxShadow: "0px 8px 30px rgba(0, 0, 0, 0.12)",
                        borderRadius: 3,
                        p: 0,
                        outline: "none",
                    }}
                >
                    <Zoom in={open} timeout={300}>
                        <Card elevation={0} sx={{ width: "100%", overflow: "visible", borderRadius: 3 }}>
                            <CardHeader
                                title={
                                    <Typography variant="h5" sx={{ fontWeight: 600, fontSize: "1.25rem" }}>
                                        Add New Section
                                    </Typography>
                                }
                                subheader={
                                    <Typography variant="body2" sx={{ opacity: 0.8, mt: 0.5 }}>
                                        Enter the name for your new section
                                    </Typography>
                                }
                                action={
                                    <IconButton
                                        onClick={onClose}
                                        aria-label="close"
                                        sx={{
                                            color: "white",
                                            "&:hover": {
                                                backgroundColor: "rgba(255, 255, 255, 0.1)",
                                            },
                                        }}
                                    >
                                        <GridCloseIcon />
                                    </IconButton>
                                }
                                sx={{
                                    background: "linear-gradient(45deg, #3f51b5, #5c6bc0)",
                                    color: "white",
                                    "& .MuiCardHeader-subheader": {
                                        color: "rgba(255, 255, 255, 0.7)",
                                    },
                                    borderTopLeftRadius: 12,
                                    borderTopRightRadius: 12,
                                    mb: 2,
                                    p: 3,
                                }}
                            />
                            <CardContent sx={{ px: 3, pt: 2, pb: 3 }}>
                                <CraftForm onSubmit={handleSubmit}

                                >
                                    <CraftInputWithIcon
                                        label="Section Name"
                                        name="name"
                                        InputProps={{
                                            startAdornment: <BookmarkIcon sx={{ color: "primary.main", mr: 1 }} />,
                                        }}
                                        fullWidth
                                        placeholder="e.g., Section A, Morning Batch"
                                        
                                    />
                                    <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
                                        <Button
                                            variant="outlined"
                                            onClick={onClose}
                                            sx={{
                                                borderRadius: 8,
                                                px: 3,
                                                py: 1.2,
                                                borderColor: "rgba(0, 0, 0, 0.12)",
                                                "&:hover": {
                                                    borderColor: "rgba(0, 0, 0, 0.3)",
                                                    backgroundColor: "rgba(0, 0, 0, 0.02)",
                                                },
                                                transition: "all 0.3s ease",
                                            }}
                                        >
                                            Cancel
                                        </Button>
                                        <Button
                                            type="submit"
                                            variant="contained"
                                            color="primary"
                                            disabled={isCreating}
                                            sx={{
                                                borderRadius: 8,
                                                px: 4,
                                                py: 1.2,
                                                boxShadow: "0px 4px 10px rgba(99, 102, 241, 0.2)",
                                                "&:hover": {
                                                    boxShadow: "0px 6px 15px rgba(99, 102, 241, 0.3)",
                                                    transform: "translateY(-2px)",
                                                },
                                                transition: "all 0.3s ease",
                                            }}
                                        >
                                            {isCreating ? <CircularProgress size={24} color="inherit" /> : "Create Section"}
                                        </Button>
                                    </Box>
                                </CraftForm>
                            </CardContent>
                        </Card>
                    </Zoom>
                </Box>
            </Fade>
        </Modal>
    );
};

export default SectionModal;