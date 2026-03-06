/* eslint-disable @typescript-eslint/no-explicit-any */
// components/LateFeeCustomizationModal.tsx
import {
    CheckCircle,
    Close,
    History,
    Save,
    Warning
} from '@mui/icons-material';
import {
    Alert,
    Box,
    Button,
    Chip,
    CircularProgress,
    FormControl,
    Grid,
    IconButton,
    InputLabel,
    MenuItem,
    Modal,
    Paper,
    Select,
    TextField,
    Typography
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const StyledPaper = styled(Paper)(({ theme }) => ({
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '90%',
    maxWidth: 700,
    maxHeight: '90vh',
    overflow: 'auto',
    borderRadius: theme.spacing(2),
    boxShadow: theme.shadows[10],
    padding: theme.spacing(3),
}));

interface LateFeeCustomizationModalProps {
    open: boolean;
    onClose: () => void;
    fee: any;
    onSuccess?: () => void;
}

const LateFeeCustomizationModal = ({
    open,
    onClose,
    fee,
    onSuccess,
}: LateFeeCustomizationModalProps) => {
    const [customizationType, setCustomizationType] = useState<'fixed' | 'perDay'>('fixed');
    const [newLateFeeAmount, setNewLateFeeAmount] = useState(fee?.lateFeeAmount || 0);
    const [newPerDayRate, setNewPerDayRate] = useState(fee?.lateFeePerDay || 100);
    const [reason, setReason] = useState('');
    const [customizedBy, setCustomizedBy] = useState('Admin');
    const [notes, setNotes] = useState('');
    const [loading, setLoading] = useState(false);
    const [showHistory, setShowHistory] = useState(false);
    const [customizationHistory, setCustomizationHistory] = useState<any[]>([]);
    const [daysLate, setDaysLate] = useState(0);

    useEffect(() => {
        if (open && fee) {
            setNewLateFeeAmount(fee.lateFeeAmount || 0);
            setNewPerDayRate(fee.lateFeePerDay || 100);

            // Calculate days late
            if (fee.dueDate) {
                const due = new Date(fee.dueDate);
                const today = new Date();
                const diffTime = Math.abs(today.getTime() - due.getTime());
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                setDaysLate(Math.max(0, diffDays));
            }
        }
    }, [open, fee]);

    const loadHistory = async () => {
        try {
            const response = await fetch(`/api/v1/late-fee/history/${fee._id}`);
            const data = await response.json();
            if (data.success) {
                setCustomizationHistory(data.data.customizations || []);
                setShowHistory(true);
            }
        } catch (error) {
            console.error('Failed to load history:', error);
            toast.error('Failed to load customization history');
        }
    };

    const handleSubmit = async () => {
        if (!reason.trim()) {
            toast.error('Please provide a reason for customization');
            return;
        }

        if (customizationType === 'fixed' && newLateFeeAmount < 0) {
            toast.error('Late fee amount cannot be negative');
            return;
        }

        if (customizationType === 'perDay' && newPerDayRate < 0) {
            toast.error('Per day rate cannot be negative');
            return;
        }

        setLoading(true);
        try {
            const calculatedAmount = customizationType === 'fixed'
                ? newLateFeeAmount
                : newPerDayRate * daysLate;

            const response = await fetch(`/api/v1/late-fee/customize/${fee._id}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    newLateFeeAmount: calculatedAmount,
                    reason,
                    customizedBy,
                    perDayRate: customizationType === 'perDay' ? newPerDayRate : undefined,
                    notes,
                }),
            });

            const data = await response.json();
            if (data.success) {
                toast.success(
                    <Box>
                        <Typography variant="body1" fontWeight="bold">
                            Late Fee Customized!
                        </Typography>
                        <Typography variant="caption">
                            Changed from ৳{fee.lateFeeAmount?.toLocaleString()} to ৳{calculatedAmount.toLocaleString()}
                        </Typography>
                    </Box>
                );
                if (onSuccess) onSuccess();
                onClose();
            } else {
                throw new Error(data.error);
            }
        } catch (error: any) {
            toast.error(error.message || 'Failed to customize late fee');
        } finally {
            setLoading(false);
        }
    };

    if (!fee) return null;

    const calculatedAmount = customizationType === 'fixed'
        ? newLateFeeAmount
        : newPerDayRate * daysLate;

    const isIncrease = calculatedAmount > (fee.lateFeeAmount || 0);

    return (
        <Modal open={open} onClose={onClose}>
            <StyledPaper>
                {/* Header */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                    <Typography variant="h5" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Warning color="warning" />
                        Customize Late Fee
                    </Typography>
                    <IconButton onClick={onClose} size="small" disabled={loading}>
                        <Close />
                    </IconButton>
                </Box>

                {/* Fee Info Card */}
                <Paper sx={{ p: 2, mb: 3, bgcolor: 'grey.50', borderRadius: 2 }}>
                    <Typography variant="subtitle2" gutterBottom color="primary">
                        Fee Information
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <Typography variant="body2" color="text.secondary">Fee Type</Typography>
                            <Typography variant="body1" fontWeight="500">{fee.feeType}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="body2" color="text.secondary">Month</Typography>
                            <Typography variant="body1">{fee.month}</Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography variant="body2" color="text.secondary">Original Amount</Typography>
                            <Typography variant="body1">৳{fee.amount?.toLocaleString()}</Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography variant="body2" color="text.secondary">Due Date</Typography>
                            <Typography variant="body1">
                                {fee.dueDate ? new Date(fee.dueDate).toLocaleDateString() : 'N/A'}
                            </Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography variant="body2" color="text.secondary">Days Late</Typography>
                            <Chip
                                label={daysLate}
                                size="small"
                                color={daysLate > 0 ? 'error' : 'success'}
                                sx={{ fontWeight: 'bold' }}
                            />
                        </Grid>
                    </Grid>
                </Paper>

                {/* Current Late Fee Summary */}
                <Paper sx={{ p: 2, mb: 3, bgcolor: 'warning.50', border: '1px solid', borderColor: 'warning.200' }}>
                    <Typography variant="subtitle2" gutterBottom color="warning.dark">
                        Current Late Fee Status
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={4}>
                            <Typography variant="body2" color="text.secondary">Per Day Rate</Typography>
                            <Typography variant="h6" color="warning.dark">৳{fee.lateFeePerDay || 100}</Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography variant="body2" color="text.secondary">Calculated Late Fee</Typography>
                            <Typography variant="h6" color="warning.dark">৳{fee.lateFeeCalculated?.toLocaleString() || 0}</Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography variant="body2" color="text.secondary">Customized Amount</Typography>
                            <Typography variant="h6" color={fee.lateFeeCustomized ? 'success.main' : 'text.primary'}>
                                ৳{fee.lateFeeAmount?.toLocaleString() || 0}
                                {fee.lateFeeCustomized && <CheckCircle fontSize="small" sx={{ ml: 1, color: 'success.main' }} />}
                            </Typography>
                        </Grid>
                    </Grid>
                </Paper>

                {/* Customization Type */}
                <FormControl fullWidth sx={{ mb: 2 }}>
                    <InputLabel>Customization Type</InputLabel>
                    <Select
                        value={customizationType}
                        onChange={(e) => setCustomizationType(e.target.value as 'fixed' | 'perDay')}
                        label="Customization Type"
                    >
                        <MenuItem value="fixed">Set Fixed Late Fee Amount</MenuItem>
                        <MenuItem value="perDay">Set Per Day Rate</MenuItem>
                    </Select>
                </FormControl>

                {/* Customization Form */}
                <Grid container spacing={3}>
                    {customizationType === 'fixed' ? (
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="New Late Fee Amount (৳)"
                                type="number"
                                value={newLateFeeAmount}
                                onChange={(e) => setNewLateFeeAmount(Number(e.target.value))}
                                inputProps={{ min: 0, step: 1 }}
                                helperText={`Previous: ৳${fee.lateFeeAmount?.toLocaleString()} → New: ৳${newLateFeeAmount.toLocaleString()}`}
                            />
                        </Grid>
                    ) : (
                        <>
                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    label="Per Day Rate (৳)"
                                    type="number"
                                    value={newPerDayRate}
                                    onChange={(e) => setNewPerDayRate(Number(e.target.value))}
                                    inputProps={{ min: 0, step: 1 }}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    label="Days Late"
                                    value={daysLate}
                                    disabled
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Alert severity="info">
                                    Total Late Fee: ৳{(newPerDayRate * daysLate).toLocaleString()}
                                    {' '}({newPerDayRate} ৳ × {daysLate} days)
                                </Alert>
                            </Grid>
                        </>
                    )}

                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Reason for Customization *"
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                            multiline
                            rows={2}
                            placeholder="e.g., Student was absent due to illness, Financial hardship, Special consideration, etc."
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            label="Customized By"
                            value={customizedBy}
                            onChange={(e) => setCustomizedBy(e.target.value)}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            label="Additional Notes"
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            placeholder="Optional notes"
                        />
                    </Grid>
                </Grid>

                {/* Preview */}
                <Alert
                    severity={isIncrease ? 'warning' : 'info'}
                    sx={{ mt: 3 }}
                    action={
                        <Chip
                            label={`Change: ${isIncrease ? '+' : ''}${(calculatedAmount - (fee.lateFeeAmount || 0)).toLocaleString()} ৳`}
                            size="small"
                            color={isIncrease ? 'warning' : 'success'}
                        />
                    }
                >
                    <Typography variant="body2">
                        <strong>New Late Fee:</strong> ৳{calculatedAmount.toLocaleString()}
                    </Typography>
                </Alert>

                {/* History Button */}
                <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Button
                        size="small"
                        startIcon={<History />}
                        onClick={loadHistory}
                    >
                        View Customization History
                    </Button>
                    {fee.lateFeeCustomized && (
                        <Chip
                            icon={<CheckCircle />}
                            label="Already Customized"
                            color="success"
                            size="small"
                            variant="outlined"
                        />
                    )}
                </Box>

                {/* History Section */}
                {showHistory && customizationHistory.length > 0 && (
                    <Paper sx={{ mt: 2, p: 2, maxHeight: 200, overflow: 'auto' }}>
                        <Typography variant="subtitle2" gutterBottom>
                            Customization History
                        </Typography>
                        {customizationHistory.map((item, index) => (
                            <Box key={index} sx={{ mb: 2, pb: 2, borderBottom: '1px solid #eee' }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Typography variant="caption" color="text.secondary">
                                        {new Date(item.customizedAt).toLocaleString()}
                                    </Typography>
                                    <Chip
                                        label={`${item.previousAmount} → ${item.newAmount} ৳`}
                                        size="small"
                                        color={item.newAmount > item.previousAmount ? 'warning' : 'success'}
                                    />
                                </Box>
                                <Typography variant="body2" sx={{ mt: 1 }}>
                                    <strong>Reason:</strong> {item.reason}
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                    By: {item.customizedBy}
                                </Typography>
                                {item.notes && (
                                    <Typography variant="caption" display="block" color="text.secondary">
                                        Note: {item.notes}
                                    </Typography>
                                )}
                            </Box>
                        ))}
                    </Paper>
                )}

                {/* Action Buttons */}
                <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', mt: 3 }}>
                    <Button variant="outlined" onClick={onClose} disabled={loading}>
                        Cancel
                    </Button>
                    <Button
                        variant="contained"
                        onClick={handleSubmit}
                        disabled={
                            loading ||
                            !reason.trim() ||
                            (customizationType === 'fixed' && newLateFeeAmount < 0) ||
                            (customizationType === 'perDay' && newPerDayRate < 0)
                        }
                        startIcon={loading ? <CircularProgress size={20} /> : <Save />}
                        color={isIncrease ? 'warning' : 'primary'}
                    >
                        {loading ? 'Saving...' : 'Apply Customization'}
                    </Button>
                </Box>
            </StyledPaper>
        </Modal>
    );
};

export default LateFeeCustomizationModal;