// components/DiscountFilter.tsx
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Clear, Discount } from "@mui/icons-material";
import {
  Box,
  Button,
  Chip,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Slider,
  TextField,
  Typography,
  alpha,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";

interface DiscountFilterProps {
  students: any[];
  onFilterChange: (filteredStudents: any[]) => void;
}

const DiscountFilter: React.FC<DiscountFilterProps> = ({
  students,
  onFilterChange,
}) => {
  const theme = useTheme();

  const [filters, setFilters] = useState({
    hasDiscount: "all", // 'all', 'yes', 'no'
    discountType: "all", // 'all', 'discount', 'waiver', 'lateFee'
    minDiscountAmount: 0,
    maxDiscountAmount: 10000,
    month: "all",
    feeType: "all",
  });

  const [discountRange, setDiscountRange] = useState<number[]>([0, 10000]);

  // Get unique months and fee types from all fees
  const allMonths = new Set<string>();
  const allFeeTypes = new Set<string>();

  students.forEach((student) => {
    student.fees?.forEach((fee: any) => {
      if (fee.month) allMonths.add(fee.month);
      if (fee.feeType) allFeeTypes.add(fee.feeType);
    });
  });

  const months = Array.from(allMonths).sort();
  const feeTypes = Array.from(allFeeTypes).sort();

  useEffect(() => {
    applyFilters();
  }, [filters, students]);

  const applyFilters = () => {
    let filtered = [...students];

    filtered = filtered.filter((student) => {
      const fees = student.fees || [];

      // Check if student has any discounted fees
      const hasDiscountedFees = fees.some(
        (fee: any) =>
          fee.discount > 0 ||
          fee.waiver > 0 ||
          (fee.lateFeeCustomizations?.length > 0 &&
            fee.lateFeeCustomizations.some(
              (c: any) => c.newAmount < c.previousAmount,
            )),
      );

      if (filters.hasDiscount === "yes" && !hasDiscountedFees) return false;
      if (filters.hasDiscount === "no" && hasDiscountedFees) return false;

      // Filter by discount type
      if (filters.discountType !== "all") {
        const hasType = fees.some((fee: any) => {
          if (filters.discountType === "discount") return fee.discount > 0;
          if (filters.discountType === "waiver") return fee.waiver > 0;
          if (filters.discountType === "lateFee") {
            return fee.lateFeeCustomizations?.some(
              (c: any) => c.newAmount < c.previousAmount,
            );
          }
          return false;
        });
        if (!hasType) return false;
      }

      // Filter by discount amount range
      if (filters.minDiscountAmount > 0 || filters.maxDiscountAmount < 10000) {
        const totalDiscount = fees.reduce((sum: number, fee: any) => {
          const discount = (fee.discount || 0) + (fee.waiver || 0);
          const lateFeeDiscounts =
            fee.lateFeeCustomizations?.reduce(
              (acc: number, c: any) =>
                acc +
                (c.newAmount < c.previousAmount
                  ? c.previousAmount - c.newAmount
                  : 0),
              0,
            ) || 0;
          return sum + discount + lateFeeDiscounts;
        }, 0);

        if (
          totalDiscount < filters.minDiscountAmount ||
          totalDiscount > filters.maxDiscountAmount
        ) {
          return false;
        }
      }

      // Filter by month
      if (filters.month !== "all") {
        const hasMonth = fees.some((fee: any) => fee.month === filters.month);
        if (!hasMonth) return false;
      }

      // Filter by fee type
      if (filters.feeType !== "all") {
        const hasFeeType = fees.some(
          (fee: any) => fee.feeType === filters.feeType,
        );
        if (!hasFeeType) return false;
      }

      return true;
    });

    onFilterChange(filtered);
  };

  const handleReset = () => {
    setFilters({
      hasDiscount: "all",
      discountType: "all",
      minDiscountAmount: 0,
      maxDiscountAmount: 10000,
      month: "all",
      feeType: "all",
    });
    setDiscountRange([0, 10000]);
  };

  const getActiveFilterCount = () => {
    let count = 0;
    if (filters.hasDiscount !== "all") count++;
    if (filters.discountType !== "all") count++;
    if (filters.minDiscountAmount > 0 || filters.maxDiscountAmount < 10000)
      count++;
    if (filters.month !== "all") count++;
    if (filters.feeType !== "all") count++;
    return count;
  };

  return (
    <Paper
      sx={{
        p: 2,
        mb: 3,
        borderRadius: 2,
        background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.05)} 0%, ${alpha(theme.palette.info.main, 0.05)} 100%)`,
        border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 2,
        }}
      >
        <Typography
          variant="h6"
          sx={{ display: "flex", alignItems: "center", gap: 1 }}
        >
          <Discount color="primary" />
          Discount Filter
          {getActiveFilterCount() > 0 && (
            <Chip
              label={`${getActiveFilterCount()} active`}
              size="small"
              color="primary"
              sx={{ ml: 1 }}
            />
          )}
        </Typography>
        <Button
          size="small"
          startIcon={<Clear />}
          onClick={handleReset}
          disabled={getActiveFilterCount() === 0}
        >
          Reset Filters
        </Button>
      </Box>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={2}>
          <FormControl fullWidth size="small">
            <InputLabel>Has Discount</InputLabel>
            <Select
              value={filters.hasDiscount}
              label="Has Discount"
              onChange={(e) =>
                setFilters({ ...filters, hasDiscount: e.target.value })
              }
            >
              <MenuItem value="all">All Students</MenuItem>
              <MenuItem value="yes">With Discount</MenuItem>
              <MenuItem value="no">Without Discount</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6} md={2}>
          <FormControl fullWidth size="small">
            <InputLabel>Discount Type</InputLabel>
            <Select
              value={filters.discountType}
              label="Discount Type"
              onChange={(e) =>
                setFilters({ ...filters, discountType: e.target.value })
              }
            >
              <MenuItem value="all">All Types</MenuItem>
              <MenuItem value="discount">Regular Discount</MenuItem>
              <MenuItem value="waiver">Waiver</MenuItem>
              <MenuItem value="lateFee">Late Fee Discount</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <FormControl fullWidth size="small">
            <InputLabel>Month</InputLabel>
            <Select
              value={filters.month}
              label="Month"
              onChange={(e) =>
                setFilters({ ...filters, month: e.target.value })
              }
            >
              <MenuItem value="all">All Months</MenuItem>
              {months.map((month) => (
                <MenuItem key={month} value={month}>
                  {month}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <FormControl fullWidth size="small">
            <InputLabel>Fee Type</InputLabel>
            <Select
              value={filters.feeType}
              label="Fee Type"
              onChange={(e) =>
                setFilters({ ...filters, feeType: e.target.value })
              }
            >
              <MenuItem value="all">All Fee Types</MenuItem>
              {feeTypes.map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={2}>
          <TextField
            fullWidth
            size="small"
            label="Min Discount"
            type="number"
            value={filters.minDiscountAmount}
            onChange={(e) =>
              setFilters({
                ...filters,
                minDiscountAmount: Number(e.target.value),
              })
            }
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">৳</InputAdornment>
              ),
            }}
          />
        </Grid>

        <Grid item xs={12}>
          <Box sx={{ px: 2 }}>
            <Typography gutterBottom>Discount Amount Range</Typography>
            <Slider
              value={discountRange}
              onChange={(_, newValue) => {
                setDiscountRange(newValue as number[]);
                setFilters({
                  ...filters,
                  minDiscountAmount: (newValue as number[])[0],
                  maxDiscountAmount: (newValue as number[])[1],
                });
              }}
              valueLabelDisplay="auto"
              min={0}
              max={10000}
              step={100}
              valueLabelFormat={(value) => `৳${value}`}
            />
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default DiscountFilter;
