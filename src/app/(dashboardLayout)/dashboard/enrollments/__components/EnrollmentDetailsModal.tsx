/* eslint-disable @typescript-eslint/no-explicit-any */
import CraftModal from "@/components/Shared/Modal";
import { AttachMoney } from "@mui/icons-material";
import {
  Box,
  Button,
  Chip,
  DialogContent,
  Grid,
  LinearProgress,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";

const EnrollmentDetailsModal = ({
  open,
  setOpen,
  enrollment,
  activeTab,
  onTabChange,
  onCollectFee,
}: any) => {
  return (
    <CraftModal open={open} setOpen={setOpen} title="Fee details" size="md">
      <DialogContent>
        <Tabs
          value={activeTab}
          onChange={(e, newValue) => onTabChange(newValue)}
          sx={{ mb: 3 }}
        >
          <Tab label="Personal Info" />
          <Tab label="Academic Info" />
          <Tab label="Payment Details" />
        </Tabs>

        {activeTab === 0 && (
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" color="text.secondary">
                Father Name
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                {enrollment?.fatherName}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" color="text.secondary">
                Mother Name
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                {enrollment?.motherName}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" color="text.secondary">
                Mobile Number
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                {enrollment?.mobileNo}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" color="text.secondary">
                Guardian Info
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                {enrollment?.guardianInfo.name} (
                {enrollment?.guardianInfo.relation})
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" color="text.secondary">
                Birth Date
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                {enrollment?.birthDate}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" color="text.secondary">
                Nationality
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                {enrollment?.nationality}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" color="text.secondary">
                Present Address
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                {enrollment?.presentAddress?.policeStation},{" "}
                {enrollment?.presentAddress?.district}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" color="text.secondary">
                Permanent Address
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                {enrollment?.permanentAddress?.policeStation},{" "}
                {enrollment?.permanentAddress?.district}
              </Typography>
            </Grid>
          </Grid>
        )}

        {activeTab === 1 && (
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" color="text.secondary">
                Class ID
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                {enrollment.className}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" color="text.secondary">
                Student Department
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                {enrollment.studentDepartment}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" color="text.secondary">
                Student Type
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                {enrollment.studentType}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" color="text.secondary">
                Admission Type
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                {enrollment.admissionType}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" color="text.secondary">
                Status
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                {enrollment.status}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" color="text.secondary">
                Terms Accepted
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                {enrollment.termsAccepted ? "Yes" : "No"}
              </Typography>
            </Grid>
          </Grid>
        )}

        {activeTab === 2 && (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mb: 2,
                }}
              >
                <Typography variant="subtitle1" fontWeight="bold">
                  Fee Summary
                </Typography>
                <Chip
                  label={enrollment.paymentStatus}
                  color={
                    enrollment.paymentStatus === "paid"
                      ? "success"
                      : enrollment.paymentStatus === "partial"
                        ? "warning"
                        : "error"
                  }
                  size="small"
                  variant="filled"
                />
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" color="text.secondary">
                Total Fees
              </Typography>
              <Typography variant="h6" color="primary" sx={{ mb: 2 }}>
                ${enrollment.totalFees}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" color="text.secondary">
                Paid Amount
              </Typography>
              <Typography variant="h6" color="success.main" sx={{ mb: 2 }}>
                ${enrollment.paidAmount}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" color="text.secondary">
                Due Amount
              </Typography>
              <Typography variant="h6" color="error.main" sx={{ mb: 2 }}>
                ${enrollment.dueAmount}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <LinearProgress
                variant="determinate"
                value={
                  enrollment.totalFees > 0
                    ? (enrollment.paidAmount / enrollment.totalFees) * 100
                    : 0
                }
                sx={{
                  height: 8,
                  borderRadius: 4,
                  backgroundColor: "grey.200",
                  "& .MuiLinearProgress-bar": {
                    backgroundColor:
                      enrollment.totalFees > 0 &&
                      enrollment.paidAmount >= enrollment.totalFees
                        ? "success.main"
                        : enrollment.paidAmount > 0
                          ? "warning.main"
                          : "error.main",
                  },
                }}
              />
            </Grid>
            {enrollment.dueAmount > 0 && (
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  startIcon={<AttachMoney />}
                  onClick={() => onCollectFee(enrollment)}
                  sx={{
                    background: `linear-gradient(135deg, #1976d2 0%, #115293 100%)`,
                  }}
                >
                  Collect Due Fee
                </Button>
              </Grid>
            )}
          </Grid>
        )}
      </DialogContent>
    </CraftModal>
  );
};

export default EnrollmentDetailsModal;
