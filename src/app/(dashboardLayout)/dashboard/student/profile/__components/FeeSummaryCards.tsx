/* eslint-disable @typescript-eslint/no-explicit-any */
import { Paper, Typography, Box } from "@mui/material";

interface FeeSummaryCardsProps {
    type: 'due' | 'paid';
    summary: {
        totalFees?: number;
        totalPaid?: number;
        totalDue?: number;
        totalDiscount?: number;
        totalWaiver?: number;
        totalAdjustments?: number;
    };
    lateFeeSummary: {
        totalLateFees: number;
        totalCustomized: number;
        totalOverdue?: number;
    };
}

const FeeSummaryCards = ({ type, summary, lateFeeSummary }: FeeSummaryCardsProps) => {
    const isDue = type === 'due';

    return (
        <Box sx={{ display: "flex", gap: 2, mb: 3, flexWrap: "wrap" }}>
            {/* Total Fees Card */}
            <Paper
                sx={{ p: 2, minWidth: 150, bgcolor: "primary.light", color: "white" }}
            >
                <Typography variant="subtitle2">
                    {isDue ? "Total Unpaid Fees" : "Total Paid Fees"}
                </Typography>
                <Typography variant="h6">
                    ৳{summary.totalFees?.toLocaleString() || 0}
                </Typography>
            </Paper>

            {/* Amount Card - Different for due vs paid */}
            <Paper
                sx={{
                    p: 2,
                    minWidth: 150,
                    bgcolor: isDue ? "error.light" : "success.light",
                    color: "white"
                }}
            >
                <Typography variant="subtitle2">
                    {isDue ? "Total Due Amount" : "Total Amount Paid"}
                </Typography>
                <Typography variant="h6">
                    ৳{isDue
                        ? (summary.totalDue?.toLocaleString() || 0)
                        : (summary.totalPaid?.toLocaleString() || 0)
                    }
                </Typography>
            </Paper>

            {/* Adjustments Card */}
            <Paper
                sx={{ p: 2, minWidth: 150, bgcolor: "warning.light", color: "white" }}
            >
                <Typography variant="subtitle2">Total Adjustments</Typography>
                <Typography variant="h6">
                    ৳{summary.totalAdjustments?.toLocaleString() || 0}
                </Typography>
                <Typography variant="caption" sx={{ display: 'block', fontSize: '0.7rem' }}>
                    Discount: ৳{summary.totalDiscount?.toLocaleString() || 0} |
                    Waiver: ৳{summary.totalWaiver?.toLocaleString() || 0}
                </Typography>
            </Paper>

            {/* Late Fee Card */}
            <Paper
                sx={{
                    p: 2,
                    minWidth: 150,
                    bgcolor: "secondary.light",
                    color: "white",
                }}
            >
                <Typography variant="subtitle2">
                    {isDue ? "Late Fee Summary" : "Late Fee Paid"}
                </Typography>
                <Typography variant="h6">
                    ৳{lateFeeSummary.totalLateFees?.toLocaleString() || 0}
                </Typography>
                <Typography variant="caption" sx={{ fontSize: '0.7rem' }}>
                    Customized: {lateFeeSummary.totalCustomized}
                    {isDue && lateFeeSummary.totalOverdue !== undefined && (
                        <> | Overdue: {lateFeeSummary.totalOverdue}</>
                    )}
                </Typography>
            </Paper>
        </Box>
    );
};

export default FeeSummaryCards;