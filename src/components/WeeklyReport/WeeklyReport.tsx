/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    Box,
    Table,
    TableContainer,
    Paper,
    Button,
    Grid,
} from "@mui/material";
import { HeaderSection } from "./HeaderSection";
import WeeklyReportHeader from "./WeeklyReportHeader";
import WeeklyReportBody from "./WeeklyReportBody";
import CraftForm from "../Forms/Form";
import BasicInfo from "./BasicInfo";
import LoadingSpinner from "../LoadingSpinner";

function WeeklyReport({ title, handleSubmit, rows, setRows, defaultValue, isLoading }: any) {

    return (
        <>
            {
                isLoading ? (
                    <LoadingSpinner />
                ) : (
                    <CraftForm onSubmit={handleSubmit} defaultValues={defaultValue}>
                        <Box
                            p={3}
                            sx={{
                                maxWidth: "xl",
                                margin: "0 auto",
                                background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
                                minHeight: "100vh",
                            }}
                        >
                            <HeaderSection title={title} />
                            <BasicInfo />
                            <Paper
                                elevation={4}
                                sx={{ p: 3, mb: 3, background: "#fff" }}
                            >
                                <Paper
                                    elevation={4}
                                    sx={{ border: "2px solid #1976d2", overflow: "hidden" }}
                                >
                                    <TableContainer>
                                        <Table>
                                            <WeeklyReportHeader />
                                            <WeeklyReportBody
                                                rows={rows}
                                                onDataChange={setRows}
                                            />
                                        </Table>
                                    </TableContainer>
                                </Paper>
                            </Paper>
                            <Grid container justifyContent="center" sx={{ mt: 3 }}>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    size="large"
                                    sx={{ px: 4, py: 1.5 }}
                                >
                                    Submit Report
                                </Button>
                            </Grid>
                        </Box>
                    </CraftForm>
                )
            }
        </>
    );
}

export default WeeklyReport;