import { Card, CardContent, TextField, FormControl, InputLabel, Select, MenuItem, Grid, Button } from "@mui/material"
import { Search as SearchIcon } from "@mui/icons-material"
import { Add as AddIcon } from "@mui/icons-material"
import { QaidaReport } from "@/interface/qaidaReport"

interface FiltersSectionProps {
    searchQuery: string
    setSearchQuery: (value: string) => void
    filterTeacher: string
    setFilterTeacher: (value: string) => void
    reports: QaidaReport[]
    onCreateReport: () => void
}

export default function FiltersSection({
    searchQuery,
    setSearchQuery,
    filterTeacher,
    setFilterTeacher,
    reports,
    onCreateReport
}: FiltersSectionProps) {
    // Get unique teachers from reports
    const teachers = Array.from(new Set(reports.map(report => report.teacherName)))

    return (
        <Card sx={{ mb: 3, borderRadius: 3 }}>
            <CardContent>
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} md={4}>
                        <TextField
                            fullWidth
                            placeholder="Search reports by student name or month..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            InputProps={{
                                startAdornment: <SearchIcon sx={{ mr: 1, color: "text.secondary" }} />,
                            }}
                            sx={{ borderRadius: 2 }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <FormControl fullWidth>
                            <InputLabel>Teacher</InputLabel>
                            <Select
                                value={filterTeacher}
                                label="Teacher"
                                onChange={(e) => setFilterTeacher(e.target.value)}
                            >
                                <MenuItem value="all">All Teachers</MenuItem>
                                {teachers.map(teacher => (
                                    <MenuItem key={teacher} value={teacher}>{teacher}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={2} sx={{ display: "flex", justifyContent: "flex-end" }}>
                        <Button
                            variant="contained"
                            startIcon={<AddIcon />}
                            onClick={onCreateReport}
                        >
                            New Report
                        </Button>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}