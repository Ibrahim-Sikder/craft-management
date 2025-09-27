import { useState, useEffect, useCallback } from 'react';
import { useDeleteNazeraReportMutation, useGetAllNazeraReportsQuery } from '@/redux/api/nazeraDailyReportApi';
import { INazeraReport } from '@/interface';
import { getReportStatus } from '@/utils/nazeraDailyReport';

export const useNazeraReports = () => {
  const [reports, setReports] = useState<INazeraReport[]>([]);
  const [filteredReports, setFilteredReports] = useState<INazeraReport[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [tabValue, setTabValue] = useState("all");
  const { data: apiResponse, isLoading, error } = useGetAllNazeraReportsQuery({});
  const [deleteNazeraReport] = useDeleteNazeraReportMutation();

  // Initialize reports from API
  useEffect(() => {
    if (apiResponse?.data) {
      setReports(apiResponse.data.data);
      setFilteredReports(apiResponse.data.data);
    }
  }, [apiResponse]);

  // Filter reports based on search term and tab value
  useEffect(() => {
    let filtered = reports;

    if (searchTerm) {
      filtered = filtered.filter(
        (report) =>
          report.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          report.teacherName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          report.month.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (tabValue !== "all") {
      filtered = filtered.filter(report => getReportStatus(report) === tabValue);
    }

    setFilteredReports(filtered);
  }, [searchTerm, tabValue, reports]);

  // Handle report deletion
  const handleDeleteReport = useCallback(async (id: string) => {
    try {
      await deleteNazeraReport(id).unwrap();
      // Update the reports state by removing the deleted report
      setReports(prevReports => prevReports.filter(report => report._id !== id));
    } catch (error) {
      console.error('Failed to delete report:', error);
    }
  }, [deleteNazeraReport]);

  return {
    reports,
    filteredReports,
    isLoading,
    error,
    searchTerm,
    setSearchTerm,
    tabValue,
    setTabValue,
    handleDeleteReport
  };
};