'use client'

import React, { useState, useCallback } from 'react';
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  TextField,
  InputAdornment,
  Paper,
  Tabs,
  Tab,
  Grid,
  Fab,
  Tooltip,
  IconButton,
  useMediaQuery,
} from '@mui/material';
import {
  Search,
  FilterList,
  Print,
  Download,
  Add,
} from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { INazeraReport } from '@/interface';
import { useNazeraReports } from '@/hooks/useNazeraReports';
import { LoadingState } from '../../../../../components/common/LoadingState';
import { REPORT_STATUS } from '@/constant/common';
import { ReportCard } from '../__components/ReportCard';
import { ReportDialog } from '../__components/ReportDialog';

const NazeraReportList: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [selectedReport, setSelectedReport] = useState<INazeraReport | null>(null);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);

  const {
    filteredReports,
    isLoading,
  
    searchTerm,
    setSearchTerm,
    tabValue,
    setTabValue,
    handleDeleteReport
  } = useNazeraReports();

  const handleViewReport = useCallback((report: INazeraReport) => {
    setSelectedReport(report);
    setViewDialogOpen(true);
  }, []);

  const handleCloseDialog = useCallback(() => {
    setViewDialogOpen(false);
    setSelectedReport(null);
  }, []);

  const handleTabChange = useCallback((event: React.SyntheticEvent, newValue: string) => {
    setTabValue(newValue);
  }, [setTabValue]);

  if (isLoading) return <LoadingState />;

  return (
    <Box sx={{ flexGrow: 1, p: isMobile ? 1 : 3, bgcolor: "#f5f7f9", minHeight: "100vh" }}>
      {/* Header */}
      <AppBar position="static" color="transparent" elevation={1} sx={{ mb: 3, borderRadius: 2 }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 600 }}>
            Nazera Reports
          </Typography>
          <TextField
            size="small"
            placeholder="Search reports..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
            sx={{ mr: 2, bgcolor: "white" }}
          />
          <Tooltip title="Filter">
            <IconButton>
              <FilterList />
            </IconButton>
          </Tooltip>
          <Tooltip title="Print">
            <IconButton>
              <Print />
            </IconButton>
          </Tooltip>
          <Tooltip title="Download">
            <IconButton>
              <Download />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>

      {/* Tabs */}
      <Paper sx={{ mb: 3, borderRadius: 2 }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
        >
          <Tab label="All Reports" value="all" />
          <Tab label="Completed" value={REPORT_STATUS.COMPLETED} />
          <Tab label="In Progress" value={REPORT_STATUS.IN_PROGRESS} />
          <Tab label="Not Started" value={REPORT_STATUS.NOT_STARTED} />
        </Tabs>
      </Paper>

      {/* Reports List */}
      {<Grid container spacing={3}>
        {filteredReports.map((report) => (
          <Grid item xs={12} key={report._id}>
            <ReportCard
              report={report}
              onView={handleViewReport}
              onDelete={handleDeleteReport}
            />
          </Grid>
        ))}
      </Grid>}

      {/* Report Detail Dialog */}
      <ReportDialog
        open={viewDialogOpen}
        onClose={handleCloseDialog}
        report={selectedReport}
      />

      {/* Add Button */}
      <Fab
        color="primary"
        aria-label="add"
        sx={{
          position: "fixed",
          bottom: 16,
          right: 16,
        }}
      >
        <Add />
      </Fab>
    </Box>
  );
};

export default NazeraReportList;