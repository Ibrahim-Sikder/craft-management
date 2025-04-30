/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-unescaped-entities */
"use client"

import React, { useState } from "react"
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Grid,
    IconButton,
    Typography,
    Box,
    InputAdornment,
    Divider,
    Slide,
} from "@mui/material"
import {
    Close as CloseIcon,
    MeetingRoom as MeetingRoomIcon,
    LocationOn as LocationOnIcon,
    Description as DescriptionIcon,
    Groups as GroupsIcon,
    Save as SaveIcon,
} from "@mui/icons-material"
import type { TransitionProps } from "@mui/material/transitions"
import CraftForm from "@/components/Forms/Form"
import CraftInputWithIcon from "@/components/Forms/inputWithIcon"
import CraftTextArea from "@/components/Forms/TextArea"
import CraftSwitch from "@/components/Forms/switch"
import { FieldValues } from "react-hook-form"
import { useCreateRoomMutation } from "@/redux/api/roomApi"
import toast from "react-hot-toast"

// Interface for Room
interface IRoom {
    name: string
    capacity?: number
    location?: string
    description?: string
    isActive?: boolean
}

interface RoomModalProps {
    open: boolean
    onClose: () => void
    onSave: (room: IRoom) => void
    initialData?: IRoom
}

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />
})

const RoomModal: React.FC<RoomModalProps> = ({ open, onClose, onSave, initialData }) => {
    const [room, setRoom] = useState<IRoom>(
        initialData || {
            name: "",
            capacity: 30,
            location: "",
            description: "",
            isActive: true,
        }
    )

    const handleSwitchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target
        setRoom({
            ...room,
            [name]: checked,
        })
    }

    const [createRoom] = useCreateRoomMutation()

    const handleSubmit = async (data: FieldValues) => {
        try {

            const updatedRoom = {
                ...data,
                isActive: room.isActive,
                capacity: Number(room.capacity)
            }
   
            const res = await createRoom(updatedRoom)

            if (res.data?.success) {
                toast.success('Room created successfully!')
                onSave(updatedRoom as IRoom)
                onClose()
            } else {

                toast.error('Failed to create room!')
            }
        } catch (error: any) {
            console.error('Room creation error:', error)
            toast.error(error?.message || 'Failed to create room!')
        }
    }

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="md" TransitionComponent={Transition}>
            <DialogTitle
                sx={{
                    bgcolor: "secondary.main",
                    color: "white",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    py: 2,
                }}
            >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                    <MeetingRoomIcon sx={{ mr: 1 }} />
                    <Typography variant="h6" component="div">
                        Add New Room
                    </Typography>
                </Box>
                <IconButton edge="end" color="inherit" onClick={onClose} aria-label="close">
                    <CloseIcon />
                </IconButton>
            </DialogTitle>

            <CraftForm onSubmit={handleSubmit}>
                <DialogContent sx={{ py: 3 }}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 500, color: "text.secondary" }}>
                                Create a new room for classes and sections
                            </Typography>
                            <Divider sx={{ mb: 3 }} />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <CraftInputWithIcon
                                fullWidth
                                required
                                label="Room Name"
                                name="name"
                                placeholder="e.g., Room 101, Science Lab"
                                defaultValue={room.name}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <MeetingRoomIcon fontSize="small" color="action" />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <CraftInputWithIcon
                                fullWidth
                                label="Capacity"
                                name="capacity"
                                type="number"
                             
                                placeholder="Number of students"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <GroupsIcon fontSize="small" color="action" />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <CraftInputWithIcon
                                fullWidth
                                label="Location"
                                name="location"
                                defaultValue={room.location}
                                placeholder="e.g., Main Building, 2nd Floor"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <LocationOnIcon fontSize="small" color="action" />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <CraftTextArea
                                fullWidth
                                label="Description"
                                name="description"
                              
                                placeholder="Additional details about this room..."
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start" sx={{ alignSelf: "flex-start", mt: 1.5 }}>
                                            <DescriptionIcon fontSize="small" color="action" />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <CraftSwitch
                                name="isActive"
                                label="Active Room"
                                checked={room.isActive || false}
                                onChange={handleSwitchChange}
                                color="secondary"
                            />
                            <Typography variant="caption" color="text.secondary" sx={{ display: "block", ml: 3 }}>
                                Inactive rooms won't appear in room selection lists
                            </Typography>
                        </Grid>
                    </Grid>
                </DialogContent>

                <DialogActions sx={{ px: 3, py: 2, bgcolor: "grey.50" }}>
                    <Button onClick={onClose} variant="outlined" color="inherit">
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        variant="contained"
                        color="secondary"
                        startIcon={<SaveIcon />}
                        sx={{
                            px: 3,
                            py: 1,
                            boxShadow: "0px 4px 12px rgba(236, 72, 153, 0.2)",
                            "&:hover": {
                                boxShadow: "0px 6px 16px rgba(236, 72, 153, 0.3)",
                            },
                        }}
                    >
                        Save Room
                    </Button>
                </DialogActions>
            </CraftForm>
        </Dialog>
    )
}

export default RoomModal