'use client'
import React, { useState } from 'react';
import {
    Box,
    Card,
    CardContent,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    Tabs,
    Tab,
    Grid,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledCard = styled(Card)(({ theme }) => ({
    marginBottom: theme.spacing(3),
    borderRadius: theme.spacing(2),
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
}));

const ResidentialManagement = () => {
    const [tabValue, setTabValue] = useState(0);
    const [selectedMonth, setSelectedMonth] = useState('June');

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };

    const mealData = [
        {
            id: 1,
            name: 'Junayedul Islam',
            category: 'Residential',
            title: 'Coordinator',
            totalMeals: 83,
            cost: '4,160'
        },
        {
            id: 2,
            name: 'A.N.M.Talha',
            category: 'Residential',
            title: 'Re. Super',
            totalMeals: 81,
            cost: '4,050'
        },
        // More meal data...
    ];

    const monthlySummary = {
        totalMeals: 1587,
        residentialIncome: '53,800',
        totalCost: '57,275',
        perMealCost: '36.09'
    };

    const months = ['June', 'July', 'August', 'September', 'October'];

    return (
        <Box sx={{ flexGrow: 1, p: 3 }}>
            <Typography variant="h4" gutterBottom>
                Residential/Hostel Management
            </Typography>

            <StyledCard>
                <CardContent>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item xs={12} md={3}>
                            <FormControl fullWidth variant="outlined">
                                <InputLabel>Select Month</InputLabel>
                                <Select
                                    value={selectedMonth}
                                    onChange={(e) => setSelectedMonth(e.target.value)}
                                    label="Select Month"
                                >
                                    {months.map((month) => (
                                        <MenuItem key={month} value={month}>{month}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <Button variant="contained" color="primary" fullWidth>
                                Add Meal Record
                            </Button>
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <Button variant="outlined" color="secondary" fullWidth>
                                Generate Report
                            </Button>
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <Button variant="outlined" fullWidth>
                                Update Meal Rates
                            </Button>
                        </Grid>
                    </Grid>
                </CardContent>
            </StyledCard>

            <Paper sx={{ borderRadius: 2, mb: 3 }}>
                <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
                    <Typography variant="h6">Monthly Summary - {selectedMonth}</Typography>
                </Box>
                <Box sx={{ p: 2 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6} md={3}>
                            <Box sx={{ textAlign: 'center' }}>
                                <Typography variant="h4" color="primary">{monthlySummary.totalMeals}</Typography>
                                <Typography variant="body2" color="textSecondary">Total Meals</Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <Box sx={{ textAlign: 'center' }}>
                                <Typography variant="h4" color="success.main">৳{monthlySummary.residentialIncome}</Typography>
                                <Typography variant="body2" color="textSecondary">Residential Income</Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <Box sx={{ textAlign: 'center' }}>
                                <Typography variant="h4" color="error.main">৳{monthlySummary.totalCost}</Typography>
                                <Typography variant="body2" color="textSecondary">Total Cost</Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <Box sx={{ textAlign: 'center' }}>
                                <Typography variant="h4" color="info.main">৳{monthlySummary.perMealCost}</Typography>
                                <Typography variant="body2" color="textSecondary">Per Meal Cost</Typography>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </Paper>

            <Paper sx={{ borderRadius: 2 }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={tabValue} onChange={handleTabChange} aria-label="residential tabs">
                        <Tab label="Meal Records" />
                        <Tab label="Cost Analysis" />
                        <Tab label="Income Tracking" />
                    </Tabs>
                </Box>

                {tabValue === 0 && (
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Category</TableCell>
                                    <TableCell>Title</TableCell>
                                    <TableCell align="center">Total Meals</TableCell>
                                    <TableCell align="center">Cost (৳)</TableCell>
                                    <TableCell>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {mealData.map((person) => (
                                    <TableRow key={person.id}>
                                        <TableCell>{person.name}</TableCell>
                                        <TableCell>{person.category}</TableCell>
                                        <TableCell>{person.title}</TableCell>
                                        <TableCell align="center">{person.totalMeals}</TableCell>
                                        <TableCell align="center">{person.cost}</TableCell>
                                        <TableCell>
                                            <Button size="small" variant="outlined">Edit</Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}

                {tabValue === 1 && (
                    <Box sx={{ p: 3 }}>
                        <Typography variant="h6" gutterBottom>
                            Cost Analysis
                        </Typography>
                        <Typography variant="body1">
                            This section would show detailed cost analysis for residential operations.
                        </Typography>
                    </Box>
                )}

                {tabValue === 2 && (
                    <Box sx={{ p: 3 }}>
                        <Typography variant="h6" gutterBottom>
                            Income Tracking
                        </Typography>
                        <Typography variant="body1">
                            This section would track income from residential fees and other sources.
                        </Typography>
                    </Box>
                )}
            </Paper>
        </Box>
    );
};

export default ResidentialManagement;