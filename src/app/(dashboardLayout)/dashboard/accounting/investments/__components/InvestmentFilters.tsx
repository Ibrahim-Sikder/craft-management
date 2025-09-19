// components/InvestmentFilters.tsx
import { Paper, Grid, TextField, InputAdornment, Stack, Chip } from "@mui/material"
import { Search as SearchIcon } from "@mui/icons-material"

interface InvestmentFiltersProps {
  searchTerm: string
  setSearchTerm: (term: string) => void
  statusFilter: string
  setStatusFilter: (filter: string) => void
}

const InvestmentFilters = ({ searchTerm, setSearchTerm, statusFilter, setStatusFilter }: InvestmentFiltersProps) => {
  return (
    <Paper sx={{ borderRadius: 3, boxShadow: "0 4px 20px rgba(0,0,0,0.08)", mb: 3, p: 3 }}>
      <Grid container spacing={3} alignItems="center">
        <Grid item xs={12} md={8}>
          <TextField
            fullWidth
            placeholder="Search investments..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: "#9CA3AF" }} />
                </InputAdornment>
              ),
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
                "&:hover fieldset": { borderColor: "#F59E0B" },
                "&.Mui-focused fieldset": { borderColor: "#F59E0B" },
              },
            }}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <Stack direction="row" spacing={1}>
            {["ALL", "active", "closed", "withdrawn", "matured"].map((status) => (
              <Chip
                key={status}
                label={status.toUpperCase()}
                onClick={() => setStatusFilter(status)}
                variant={statusFilter === status ? "filled" : "outlined"}
                sx={{
                  bgcolor: statusFilter === status ? "#F59E0B" : "transparent",
                  color: statusFilter === status ? "white" : "#6B7280",
                  borderColor: "#F59E0B",
                  "&:hover": {
                    bgcolor: statusFilter === status ? "#D97706" : "rgba(245, 158, 11, 0.1)",
                  },
                }}
              />
            ))}
          </Stack>
        </Grid>
      </Grid>
    </Paper>
  )
}

export default InvestmentFilters