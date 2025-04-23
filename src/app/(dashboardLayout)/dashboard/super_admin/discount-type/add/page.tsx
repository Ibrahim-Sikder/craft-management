"use client"

import React from "react"

import { useState } from "react"
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  Chip,
  Container,
  Divider,
  FormControl,
  FormControlLabel,
  Grid,
  InputAdornment,
  InputLabel,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  Paper,
  Select,
  Stack,
  Switch,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material"
import {
  Save as SaveIcon,
  Delete as DeleteIcon,
  Percent as PercentIcon,
  LocalOffer as TagIcon,
  CheckCircle as CheckCircleIcon,
  AttachMoney as MoneyIcon,
} from "@mui/icons-material"
import { ThemeProvider, createTheme } from "@mui/material/styles"

// Create a custom theme with primary color as rose/pink
const theme = createTheme({
  palette: {
    primary: {
      main: "#e91e63",
      light: "#f48fb1",
      dark: "#c2185b",
      contrastText: "#fff",
    },
    secondary: {
      main: "#9c27b0",
      light: "#ba68c8",
      dark: "#7b1fa2",
      contrastText: "#fff",
    },
    background: {
      default: "#f8f9fa",
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: "0 4px 20px 0 rgba(0,0,0,0.1)",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: "none",
          fontWeight: 600,
        },
      },
    },
  },
})

// TabPanel component for the tabs
function TabPanel(props: { children: React.ReactNode; value: number; index: number }) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`discount-tabpanel-${index}`}
      aria-labelledby={`discount-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  )
}

export default function DiscountPage() {
  const [isPercent, setIsPercent] = useState(false)
  const [discountName, setDiscountName] = useState("")
  const [discountAmount, setDiscountAmount] = useState("")
  const [description, setDescription] = useState("")
  const [discountType, setDiscountType] = useState("academic")
  const [tabValue, setTabValue] = useState(0)

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
  }

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          minHeight: "100vh",
          bgcolor: "background.default",
          py: 4,
          background: "linear-gradient(to bottom, #fce4ec, #ffffff)",
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
                <Box>
                  <Typography variant="h4" color="text.primary" gutterBottom>
                    Discount Management
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Create and manage special discounts for your students
                  </Typography>
                </Box>
                <Stack direction="row" spacing={1}>
                  <Button variant="outlined" startIcon={<DeleteIcon />} color="error" size="small">
                    Clear
                  </Button>
                  <Button variant="contained" startIcon={<SaveIcon />} onClick={handleSubmit} size="small">
                    Save Discount
                  </Button>
                </Stack>
              </Box>
            </Grid>

            <Grid item xs={12} md={8}>
              <Card>
                <CardHeader
                  title={
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <TagIcon />
                      <Typography variant="h6">Create New Discount</Typography>
                    </Box>
                  }
                  subheader="Fill in the details to create a new discount for your students"
                  sx={{
                    bgcolor: "primary.main",
                    color: "primary.contrastText",
                    backgroundImage: "linear-gradient(to right, #e91e63, #9c27b0)",
                    "& .MuiCardHeader-subheader": { color: "rgba(255, 255, 255, 0.8)" },
                  }}
                />
                <CardContent>
                  <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                    <Tabs
                      value={tabValue}
                      onChange={handleTabChange}
                      variant="fullWidth"
                      textColor="primary"
                      indicatorColor="primary"
                    >
                      <Tab label="Basic Information" />
                      <Tab label="Advanced Settings" />
                    </Tabs>
                  </Box>

                  <TabPanel value={tabValue} index={0}>
                    <Grid container spacing={3}>
                      <Grid item xs={12}>
                        <TextField
                          required
                          fullWidth
                          id="discount-name"
                          label="Discount Name"
                          placeholder="e.g., Early Bird Discount, Merit Scholarship"
                          value={discountName}
                          onChange={(e) => setDiscountName(e.target.value)}
                          variant="outlined"
                        />
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <FormControl fullWidth variant="outlined">
                          <InputLabel id="discount-type-label">Discount Type</InputLabel>
                          <Select
                            labelId="discount-type-label"
                            id="discount-type"
                            value={discountType}
                            onChange={(e) => setDiscountType(e.target.value)}
                            label="Discount Type"
                          >
                            <MenuItem value="academic">Academic Merit</MenuItem>
                            <MenuItem value="financial">Financial Aid</MenuItem>
                            <MenuItem value="sibling">Sibling Discount</MenuItem>
                            <MenuItem value="early">Early Payment</MenuItem>
                            <MenuItem value="special">Special Promotion</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                          <FormControlLabel
                            control={
                              <Switch
                                checked={isPercent}
                                onChange={(e) => setIsPercent(e.target.checked)}
                                color="primary"
                              />
                            }
                            label="Percentage Discount"
                          />
                          <TextField
                            fullWidth
                            id="discount-amount"
                            label="Discount Amount"
                            placeholder={isPercent ? "Enter percentage" : "Enter amount"}
                            value={discountAmount}
                            onChange={(e) => setDiscountAmount(e.target.value)}
                            type="number"
                            InputProps={{
                              endAdornment: (
                                <InputAdornment position="end">
                                  {isPercent ? <PercentIcon /> : <MoneyIcon />}
                                </InputAdornment>
                              ),
                            }}
                            variant="outlined"
                          />
                        </Box>
                      </Grid>

                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          id="description"
                          label="Description"
                          placeholder="Provide details about this discount..."
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          multiline
                          rows={4}
                          variant="outlined"
                        />
                      </Grid>
                    </Grid>
                  </TabPanel>

                  <TabPanel value={tabValue} index={1}>
                    <Grid container spacing={3}>
                      <Grid item xs={12}>
                        <Typography variant="subtitle1" gutterBottom>
                          Eligibility Criteria
                        </Typography>
                        <Grid container spacing={2}>
                          <Grid item xs={12} sm={6}>
                            <Paper variant="outlined" sx={{ p: 2 }}>
                              <FormControlLabel
                                control={<Checkbox color="primary" />}
                                label="Minimum GPA Requirement"
                              />
                            </Paper>
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <Paper variant="outlined" sx={{ p: 2 }}>
                              <FormControlLabel control={<Checkbox color="primary" />} label="Attendance Requirement" />
                            </Paper>
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <Paper variant="outlined" sx={{ p: 2 }}>
                              <FormControlLabel
                                control={<Checkbox color="primary" />}
                                label="Family Income Verification"
                              />
                            </Paper>
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <Paper variant="outlined" sx={{ p: 2 }}>
                              <FormControlLabel
                                control={<Checkbox color="primary" />}
                                label="Extracurricular Activities"
                              />
                            </Paper>
                          </Grid>
                        </Grid>
                      </Grid>

                      <Grid item xs={12}>
                        <Typography variant="subtitle1" gutterBottom>
                          Validity Period
                        </Typography>
                        <Grid container spacing={2}>
                          <Grid item xs={12} sm={6}>
                            <TextField
                              fullWidth
                              id="start-date"
                              label="Start Date"
                              type="date"
                              InputLabelProps={{ shrink: true }}
                              variant="outlined"
                            />
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <TextField
                              fullWidth
                              id="end-date"
                              label="End Date"
                              type="date"
                              InputLabelProps={{ shrink: true }}
                              variant="outlined"
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </TabPanel>

                  <Divider sx={{ my: 2 }} />

                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Typography variant="caption" color="text.secondary">
                      * Required fields
                    </Typography>
                    <Button variant="contained" startIcon={<SaveIcon />} onClick={handleSubmit}>
                      Save Discount
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={4}>
              <Stack spacing={3}>
                <Card>
                  <CardHeader
                    title="Active Discounts"
                    subheader="Currently active discount programs"
                    sx={{ bgcolor: "grey.100" }}
                  />
                  <List sx={{ p: 0 }}>
                    {[
                      { name: "Merit Scholarship", type: "academic", amount: "25%", status: "active" },
                      { name: "Early Payment Discount", type: "early", amount: "$150", status: "active" },
                      { name: "Sibling Discount", type: "sibling", amount: "10%", status: "active" },
                      { name: "Financial Aid", type: "financial", amount: "Variable", status: "active" },
                    ].map((discount, index) => (
                      <React.Fragment key={index}>
                        <ListItem
                          secondaryAction={
                            <Chip
                              icon={<CheckCircleIcon />}
                              label="Active"
                              size="small"
                              color="success"
                              variant="outlined"
                            />
                          }
                          sx={{ py: 2 }}
                        >
                          <ListItemText
                            primary={discount.name}
                            secondary={
                              <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 0.5 }}>
                                <Chip
                                  label={discount.type}
                                  size="small"
                                  color={
                                    discount.type === "academic"
                                      ? "primary"
                                      : discount.type === "financial"
                                        ? "secondary"
                                        : discount.type === "sibling"
                                          ? "info"
                                          : "warning"
                                  }
                                />
                                <Typography variant="body2" color="text.secondary">
                                  {discount.amount}
                                </Typography>
                              </Box>
                            }
                          />
                        </ListItem>
                        {index < 3 && <Divider />}
                      </React.Fragment>
                    ))}
                  </List>
                  <Box sx={{ p: 2, bgcolor: "grey.100" }}>
                    <Button fullWidth variant="outlined">
                      View All Discounts
                    </Button>
                  </Box>
                </Card>

                <Card>
                  <CardHeader
                    title="Quick Stats"
                    subheader="Discount program statistics"
                    sx={{ bgcolor: "grey.100" }}
                  />
                  <CardContent>
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <Paper
                          elevation={0}
                          sx={{
                            p: 2,
                            bgcolor: "rgba(233, 30, 99, 0.1)",
                            borderRadius: 2,
                            height: "100%",
                          }}
                        >
                          <Typography variant="caption" color="primary" fontWeight={600}>
                            Total Discounts
                          </Typography>
                          <Typography variant="h4" fontWeight={700} mt={0.5}>
                            12
                          </Typography>
                        </Paper>
                      </Grid>
                      <Grid item xs={6}>
                        <Paper
                          elevation={0}
                          sx={{
                            p: 2,
                            bgcolor: "rgba(33, 150, 243, 0.1)",
                            borderRadius: 2,
                            height: "100%",
                          }}
                        >
                          <Typography variant="caption" color="info.main" fontWeight={600}>
                            Active
                          </Typography>
                          <Typography variant="h4" fontWeight={700} mt={0.5}>
                            8
                          </Typography>
                        </Paper>
                      </Grid>
                      <Grid item xs={6}>
                        <Paper
                          elevation={0}
                          sx={{
                            p: 2,
                            bgcolor: "rgba(255, 152, 0, 0.1)",
                            borderRadius: 2,
                            height: "100%",
                          }}
                        >
                          <Typography variant="caption" color="warning.main" fontWeight={600}>
                            Students Benefited
                          </Typography>
                          <Typography variant="h4" fontWeight={700} mt={0.5}>
                            243
                          </Typography>
                        </Paper>
                      </Grid>
                      <Grid item xs={6}>
                        <Paper
                          elevation={0}
                          sx={{
                            p: 2,
                            bgcolor: "rgba(76, 175, 80, 0.1)",
                            borderRadius: 2,
                            height: "100%",
                          }}
                        >
                          <Typography variant="caption" color="success.main" fontWeight={600}>
                            Total Savings
                          </Typography>
                          <Typography variant="h4" fontWeight={700} mt={0.5}>
                            $24.5K
                          </Typography>
                        </Paper>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </ThemeProvider>
  )
}
