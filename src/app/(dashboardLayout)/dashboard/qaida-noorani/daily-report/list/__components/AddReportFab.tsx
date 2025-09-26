import { Fab, Tooltip } from "@mui/material"
import { Add as AddIcon } from "@mui/icons-material"

interface AddReportFabProps {
    onClick: () => void
}

export default function AddReportFab({ onClick }: AddReportFabProps) {
    return (
        <Tooltip title="Add New Report">
            <Fab
                color="primary"
                aria-label="add report"
                sx={{ position: "fixed", bottom: 16, right: 16 }}
                onClick={onClick}
            >
                <AddIcon />
            </Fab>
        </Tooltip>
    )
}