/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-explicit-any */
import CraftModal from "@/components/Shared/Modal";
import { Avatar, Box, Chip, Divider, Grid, Typography } from "@mui/material";

export default function FeeDetailsModal({ open, setOpen, selectedFee }: any) {
  if (!selectedFee) return null;

  return (
    <CraftModal open={open} setOpen={setOpen} title="Fee Details" size="lg">
      <Box sx={{ p: 3 }}>
        <Grid container spacing={3}>
          {" "}
          <Grid item xs={12}>
            <Typography
              variant="h6"
              gutterBottom
              sx={{
                color: "primary.main",
                borderBottom: "2px solid",
                borderColor: "primary.main",
                pb: 1,
              }}
            >
              Student Information
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <Avatar
                src={selectedFee.enrollment?.studentPhoto}
                sx={{ width: 60, height: 60, mr: 2 }}
              >
                {selectedFee.student?.name?.charAt(0) || "S"}
              </Avatar>
              <Box>
                <Typography variant="h6" fontWeight="bold">
                  {selectedFee.student?.name || "N/A"}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {selectedFee.enrollment?.nameBangla || "N/A"}
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{ textAlign: { md: "right" } }}>
              <Chip
                label={selectedFee.status?.toUpperCase()}
                color={
                  selectedFee.status === "paid"
                    ? "success"
                    : selectedFee.status === "partial"
                      ? "warning"
                      : "error"
                }
                sx={{ fontWeight: "bold", mb: 1 }}
              />
              <Typography variant="body2" color="text.secondary">
                Payment ID: {selectedFee._id}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="body2" color="text.secondary">
              Class
            </Typography>
            <Typography variant="body1" fontWeight="500">
              {selectedFee.enrollment?.className || "N/A"}
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="body2" color="text.secondary">
              Section
            </Typography>
            <Typography variant="body1" fontWeight="500">
              {selectedFee.enrollment?.section || "N/A"}
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="body2" color="text.secondary">
              Roll Number
            </Typography>
            <Typography variant="body1" fontWeight="500">
              {selectedFee.enrollment?.rollNumber || "N/A"}
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="body2" color="text.secondary">
              Student Type
            </Typography>
            <Typography variant="body1" fontWeight="500">
              {selectedFee.enrollment?.studentType
                ?.replace("_", " ")
                .toUpperCase() || "N/A"}
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="body2" color="text.secondary">
              Department
            </Typography>
            <Typography variant="body1" fontWeight="500">
              {selectedFee.enrollment?.studentDepartment?.toUpperCase() ||
                "N/A"}
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="body2" color="text.secondary">
              Session
            </Typography>
            <Typography variant="body1" fontWeight="500">
              {selectedFee.enrollment?.session || "N/A"}
            </Typography>
          </Grid>
          {/* Fee Payment Information */}
          <Grid item xs={12}>
            <Divider sx={{ my: 2 }} />
            <Typography
              variant="h6"
              gutterBottom
              sx={{
                color: "primary.main",
                borderBottom: "2px solid",
                borderColor: "primary.main",
                pb: 1,
              }}
            >
              Fee Payment Information
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="body2" color="text.secondary">
              Fee Type
            </Typography>
            <Chip
              label={selectedFee.feeType?.toUpperCase()}
              color="primary"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="body2" color="text.secondary">
              Month
            </Typography>
            <Typography variant="body1" fontWeight="500">
              {selectedFee.month || "Not Applicable"}
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="body2" color="text.secondary">
              Payment Method
            </Typography>
            <Typography variant="body1" fontWeight="500">
              {selectedFee.paymentMethod?.toUpperCase() || "N/A"}
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="body2" color="text.secondary">
              Total Amount
            </Typography>
            <Typography variant="h6" color="primary.main" fontWeight="bold">
              ৳{selectedFee.amount?.toLocaleString() || "0"}
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="body2" color="text.secondary">
              Paid Amount
            </Typography>
            <Typography variant="h6" color="success.main" fontWeight="bold">
              ৳{selectedFee.paidAmount?.toLocaleString() || "0"}
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="body2" color="text.secondary">
              Due Amount
            </Typography>
            <Typography variant="h6" color="error.main" fontWeight="bold">
              ৳{selectedFee.dueAmount?.toLocaleString() || "0"}
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="body2" color="text.secondary">
              Payment Date
            </Typography>
            <Typography variant="body1" fontWeight="500">
              {selectedFee.paymentDate
                ? new Date(selectedFee.paymentDate).toLocaleDateString()
                : "N/A"}
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="body2" color="text.secondary">
              Created At
            </Typography>
            <Typography variant="body1" fontWeight="500">
              {selectedFee.createdAt
                ? new Date(selectedFee.createdAt).toLocaleDateString()
                : "N/A"}
            </Typography>
          </Grid>
          {/* Parent/Guardian Information */}
          <Grid item xs={12}>
            <Divider sx={{ my: 2 }} />
            <Typography
              variant="h6"
              gutterBottom
              sx={{
                color: "primary.main",
                borderBottom: "2px solid",
                borderColor: "primary.main",
                pb: 1,
              }}
            >
              Parent Information
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="body2" color="text.secondary">
              Father's Name
            </Typography>
            <Typography variant="body1" fontWeight="500">
              {selectedFee.enrollment?.fatherName || "N/A"}
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="body2" color="text.secondary">
              Mother's Name
            </Typography>
            <Typography variant="body1" fontWeight="500">
              {selectedFee.enrollment?.motherName || "N/A"}
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="body2" color="text.secondary">
              Father's Mobile
            </Typography>
            <Typography variant="body1" fontWeight="500">
              {selectedFee.enrollment?.fatherMobile || "N/A"}
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="body2" color="text.secondary">
              Student Mobile
            </Typography>
            <Typography variant="body1" fontWeight="500">
              {selectedFee.enrollment?.mobileNo ||
                selectedFee.student?.mobile ||
                "N/A"}
            </Typography>
          </Grid>
          {/* Additional Information */}
          {selectedFee.enrollment?.guardianInfo?.name && (
            <>
              <Grid item xs={12}>
                <Divider sx={{ my: 2 }} />
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{
                    color: "primary.main",
                    borderBottom: "2px solid",
                    borderColor: "primary.main",
                    pb: 1,
                  }}
                >
                  Guardian Information
                </Typography>
              </Grid>

              <Grid item xs={12} md={4}>
                <Typography variant="body2" color="text.secondary">
                  Guardian Name
                </Typography>
                <Typography variant="body1" fontWeight="500">
                  {selectedFee.enrollment.guardianInfo.name}
                </Typography>
              </Grid>

              <Grid item xs={12} md={4}>
                <Typography variant="body2" color="text.secondary">
                  Relation
                </Typography>
                <Typography variant="body1" fontWeight="500">
                  {selectedFee.enrollment.guardianInfo.relation}
                </Typography>
              </Grid>

              <Grid item xs={12} md={4}>
                <Typography variant="body2" color="text.secondary">
                  Mobile
                </Typography>
                <Typography variant="body1" fontWeight="500">
                  {selectedFee.enrollment.guardianInfo.mobile}
                </Typography>
              </Grid>
            </>
          )}
          {/* Note Section */}
          {selectedFee.note && (
            <Grid item xs={12}>
              <Divider sx={{ my: 2 }} />
              <Typography
                variant="h6"
                gutterBottom
                sx={{
                  color: "primary.main",
                  borderBottom: "2px solid",
                  borderColor: "primary.main",
                  pb: 1,
                }}
              >
                Additional Notes
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  p: 2,
                  backgroundColor: "grey.50",
                  borderRadius: 1,
                }}
              >
                {selectedFee.note}
              </Typography>
            </Grid>
          )}
        </Grid>
      </Box>
    </CraftModal>
  );
}
