"use client";
import React from "react";
import { Box, Button, Grid } from "@mui/material";
import CraftModal from "@/components/Shared/Modal";
import CraftEditor from "@/components/Forms/JodiEditor";
import CraftForm from "@/components/Forms/Form";


export type TProps = {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};


const TodayLesson = ({ open, setOpen }: TProps) => {
    const handleSubmit = () => {

    }
    return (
        <CraftModal
            sx={{ width: "800px", margin: " auto" }}
            open={open}
            setOpen={setOpen}
            title="Add Today Lesson"
        >
            <Box padding="5px 10px 10px 10px">
                {/* all content */}
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Box className="bg-white">
                            <CraftForm onSubmit={handleSubmit}>
                                <div>
                                    <CraftEditor name="Today Lesson" />
                                </div>
                                <div className="flex justify-end mt-5">
                                    <Button variant="contained" sx={{ borderRadius: 6, bgcolor: "#4F0187" }} >Save</Button>
                                </div>
                            </CraftForm>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </CraftModal>
    );
};


export default TodayLesson;