// components/ReportList/ReportListHeader.tsx
import {
    Box,
    
    Toolbar,
    TextField,
    InputAdornment,
    IconButton,
    Tooltip,
    Typography,
    alpha,
    useTheme,
} from "@mui/material"
import {
    Search,
    FilterAlt,
    Refresh,
} from "@mui/icons-material"
import { StyledAppBar } from "@/style/hifzReportStyle"

interface ReportListHeaderProps {
    title: string
    searchTerm: string
    setSearchTerm: (term: string) => void
    onRefresh: () => void
}

export function ReportListHeader({
    title,
    searchTerm,
    setSearchTerm,
    onRefresh
}: ReportListHeaderProps) {
    const theme = useTheme()

    return (
        <StyledAppBar position="static" elevation={0}>
            <Toolbar>
                <Box>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
                        {title}
                    </Typography>
                </Box>

                <Box>
                    <TextField
                        size="small"
                        placeholder="Search reports..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Search color="primary" />
                                </InputAdornment>
                            ),
                            sx: {
                                color: '#fff',
                                borderRadius: 24,
                                background: alpha(theme.palette.common.white, 0.2),
                                '&:hover': {
                                    background: alpha(theme.palette.common.white, 0.3),
                                },
                                '& .MuiOutlinedInput-notchedOutline': {
                                    border: 'none',
                                },
                            },
                        }}
                        sx={{ mr: 2, width: 250 }}
                    />
                </Box>

                <Box>
                    <Tooltip title="Filter">
                        <IconButton sx={{ color: 'white' }}>
                            <FilterAlt />
                        </IconButton>
                    </Tooltip>
                </Box>

                <Box>
                    <Tooltip title="Refresh">
                        <IconButton sx={{ color: 'white' }} onClick={onRefresh}>
                            <Refresh />
                        </IconButton>
                    </Tooltip>
                </Box>
            </Toolbar>
        </StyledAppBar>
    )
}