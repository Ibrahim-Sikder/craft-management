// components/LoanFilters.tsx
import { Card, CardContent, Grid, TextField, InputAdornment, Stack, Chip } from "@mui/material"
import { GridSearchIcon } from "@mui/x-data-grid"
interface LoanFiltersProps {
  searchTerm: string
  setSearchTerm: (term: string) => void
  typeFilter: string
  setTypeFilter: (filter: string) => void
}

const LoanFilters = ({ searchTerm, setSearchTerm, typeFilter, setTypeFilter }: LoanFiltersProps) => {
  return (
    <Card sx={{ borderRadius: 3, boxShadow: "0 4px 20px rgba(0,0,0,0.08)", mb: 3 }}>
      <CardContent sx={{ p: 3 }}>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              placeholder="Search by name or phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <GridSearchIcon sx={{ color: "#9CA3AF" }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                  "&:hover fieldset": { borderColor: "#EC4899" },
                  "&.Mui-focused fieldset": { borderColor: "#EC4899" },
                },
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Stack direction="row" spacing={1}>
              {["ALL", "GIVEN", "TAKEN"].map((type) => (
                <Chip
                  key={type}
                  label={type}
                  onClick={() => setTypeFilter(type)}
                  variant={typeFilter === type ? "filled" : "outlined"}
                  sx={{
                    bgcolor: typeFilter === type ? "#EC4899" : "transparent",
                    color: typeFilter === type ? "white" : "#6B7280",
                    borderColor: "#EC4899",
                    "&:hover": {
                      bgcolor: typeFilter === type ? "#BE185D" : "rgba(236, 72, 153, 0.1)",
                    },
                  }}
                />
              ))}
            </Stack>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default LoanFilters