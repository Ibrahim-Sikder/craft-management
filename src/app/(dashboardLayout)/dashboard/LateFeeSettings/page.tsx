'use client'

/* eslint-disable @typescript-eslint/no-explicit-any */
import { Save, Settings, Update } from '@mui/icons-material';
import {
    Box,
    Button,
    Card,
    CardContent,
    Divider,
    FormControlLabel,
    Grid,
    InputAdornment,
    MenuItem,
    Paper,
    Select,
    Switch,
    TextField,
    Typography
} from '@mui/material';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

interface LateFeeConfig {
    enabled: boolean;
    type: 'fixed' | 'percentage';
    value: number;
    gracePeriodDays: number;
    maxLateFeeAmount?: number;
    recurring: boolean;
    applyAfterDays: number;
    frequency: 'daily' | 'monthly';
}

const LateFeeSettings = () => {
    const [config, setConfig] = useState<LateFeeConfig>({
        enabled: true,
        type: 'percentage',
        value: 2,
        gracePeriodDays: 10,
        maxLateFeeAmount: 500,
        recurring: true,
        applyAfterDays: 30,
        frequency: 'monthly',
    });

    const [loading, setLoading] = useState(false);
    const [previewAmount, setPreviewAmount] = useState(0);

    // Load current config on mount
    useEffect(() => {
        fetchConfig();
    }, []);

    const fetchConfig = async () => {
        try {
            const response = await fetch('/api/v1/late-fee/config');
            const data = await response.json();
            if (data.success) {
                setConfig(data.data);
            }
        } catch (error) {
            console.error('Failed to load config:', error);
        }
    };

    const handleSave = async () => {
        setLoading(true);
        try {
            const response = await fetch('/api/v1/late-fee/config', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(config),
            });

            const data = await response.json();
            if (data.success) {
                toast.success('Late fee settings saved successfully');
            } else {
                throw new Error(data.error);
            }
        } catch (error: any) {
            toast.error(error.message || 'Failed to save settings');
        } finally {
            setLoading(false);
        }
    };

    const handleManualCalculate = async () => {
        setLoading(true);
        try {
            const response = await fetch('/api/v1/late-fee/calculate', {
                method: 'POST',
            });

            const data = await response.json();
            if (data.success) {
                toast.success(
                    <Box>
                        <Typography variant="body1" fontWeight="bold">
                            Late fees calculated!
                        </Typography>
                        <Typography variant="caption">
                            Processed: {data.data.totalProcessed} • Total: ৳{data.data.totalLateFeeApplied.toLocaleString()}
                        </Typography>
                    </Box>
                );
            } else {
                throw new Error(data.error);
            }
        } catch (error: any) {
            toast.error(error.message || 'Failed to calculate late fees');
        } finally {
            setLoading(false);
        }
    };

    // Calculate preview amount
    useEffect(() => {
        if (config.type === 'percentage') {
            setPreviewAmount((10000 * config.value) / 100);
        } else {
            setPreviewAmount(config.value);
        }
    }, [config.type, config.value]);

    return (
        <Card sx={{ maxWidth: 800, mx: 'auto', mt: 4 }}>
            <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                    <Settings color="primary" />
                    <Typography variant="h5">Late Fee Settings</Typography>
                </Box>

                <Grid container spacing={3}>
                    {/* Enable/Disable */}
                    <Grid item xs={12}>
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={config.enabled}
                                    onChange={(e) => setConfig({ ...config, enabled: e.target.checked })}
                                />
                            }
                            label="Enable Late Fee Calculation"
                        />
                    </Grid>

                    {/* Calculation Type */}
                    <Grid item xs={12} md={6}>
                        <Typography variant="subtitle2" gutterBottom>
                            Calculation Type
                        </Typography>
                        <Select
                            fullWidth
                            size="small"
                            value={config.type}
                            onChange={(e) => setConfig({
                                ...config,
                                type: e.target.value as 'fixed' | 'percentage'
                            })}
                        >
                            <MenuItem value="percentage">Percentage (%)</MenuItem>
                            <MenuItem value="fixed">Fixed Amount (৳)</MenuItem>
                        </Select>
                    </Grid>

                    {/* Value */}
                    <Grid item xs={12} md={6}>
                        <Typography variant="subtitle2" gutterBottom>
                            {config.type === 'percentage' ? 'Percentage per month' : 'Fixed Amount per month'}
                        </Typography>
                        <TextField
                            fullWidth
                            size="small"
                            type="number"
                            value={config.value}
                            onChange={(e) => setConfig({ ...config, value: Number(e.target.value) })}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        {config.type === 'percentage' ? '%' : '৳'}
                                    </InputAdornment>
                                ),
                            }}
                            inputProps={{ min: 0, step: config.type === 'percentage' ? 0.1 : 1 }}
                        />
                    </Grid>

                    {/* Frequency */}
                    <Grid item xs={12} md={6}>
                        <Typography variant="subtitle2" gutterBottom>
                            Apply Frequency
                        </Typography>
                        <Select
                            fullWidth
                            size="small"
                            value={config.frequency}
                            onChange={(e) => setConfig({
                                ...config,
                                frequency: e.target.value as 'daily' | 'monthly'
                            })}
                        >
                            <MenuItem value="monthly">Monthly</MenuItem>
                            <MenuItem value="daily">Daily</MenuItem>
                        </Select>
                    </Grid>

                    {/* Grace Period */}
                    <Grid item xs={12} md={6}>
                        <Typography variant="subtitle2" gutterBottom>
                            Grace Period (days)
                        </Typography>
                        <TextField
                            fullWidth
                            size="small"
                            type="number"
                            value={config.gracePeriodDays}
                            onChange={(e) => setConfig({ ...config, gracePeriodDays: Number(e.target.value) })}
                            inputProps={{ min: 0 }}
                        />
                    </Grid>

                    {/* Apply After Days */}
                    <Grid item xs={12} md={6}>
                        <Typography variant="subtitle2" gutterBottom>
                            Apply After (days)
                        </Typography>
                        <TextField
                            fullWidth
                            size="small"
                            type="number"
                            value={config.applyAfterDays}
                            onChange={(e) => setConfig({ ...config, applyAfterDays: Number(e.target.value) })}
                            inputProps={{ min: 0 }}
                        />
                    </Grid>

                    {/* Max Late Fee */}
                    <Grid item xs={12} md={6}>
                        <Typography variant="subtitle2" gutterBottom>
                            Maximum Late Fee (per month)
                        </Typography>
                        <TextField
                            fullWidth
                            size="small"
                            type="number"
                            value={config.maxLateFeeAmount || ''}
                            onChange={(e) => setConfig({
                                ...config,
                                maxLateFeeAmount: e.target.value ? Number(e.target.value) : undefined
                            })}
                            InputProps={{
                                startAdornment: <InputAdornment position="start">৳</InputAdornment>,
                            }}
                            placeholder="No limit"
                        />
                    </Grid>

                    {/* Recurring */}
                    <Grid item xs={12}>
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={config.recurring}
                                    onChange={(e) => setConfig({ ...config, recurring: e.target.checked })}
                                />
                            }
                            label="Recurring (apply every month)"
                        />
                    </Grid>

                    {/* Preview */}
                    <Grid item xs={12}>
                        <Paper sx={{ p: 2, bgcolor: 'grey.50' }}>
                            <Typography variant="subtitle2" gutterBottom>
                                Preview Calculation
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                For a fee of ৳10,000 with {config.type === 'percentage' ? `${config.value}%` : `৳${config.value}`} {config.frequency} late fee:
                            </Typography>
                            <Box sx={{ mt: 1 }}>
                                <Typography variant="h6" color="warning.main">
                                    {config.type === 'percentage'
                                        ? `+ ৳${previewAmount.toLocaleString()} per month`
                                        : `+ ৳${previewAmount.toLocaleString()} per month`
                                    }
                                </Typography>
                                {config.maxLateFeeAmount && (
                                    <Typography variant="caption" color="text.secondary">
                                        Maximum capped at ৳{config.maxLateFeeAmount.toLocaleString()} per month
                                    </Typography>
                                )}
                            </Box>
                        </Paper>
                    </Grid>
                </Grid>

                <Divider sx={{ my: 3 }} />

                <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                    <Button
                        variant="outlined"
                        startIcon={<Update />}
                        onClick={handleManualCalculate}
                        disabled={loading}
                    >
                        Calculate Now
                    </Button>
                    <Button
                        variant="contained"
                        startIcon={<Save />}
                        onClick={handleSave}
                        disabled={loading}
                    >
                        Save Settings
                    </Button>
                </Box>
            </CardContent>
        </Card>
    );
};

export default LateFeeSettings;