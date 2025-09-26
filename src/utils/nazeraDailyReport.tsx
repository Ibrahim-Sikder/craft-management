'use client'

import { MONTH_NAMES } from '@/constant/common';
import { INazeraReport, SessionKey } from '@/interface';
import { Cancel, CheckCircle, Schedule } from '@mui/icons-material';

export const formatDate = (dateString: string): string => {
  const options = { year: 'numeric' as const, month: 'long' as const, day: 'numeric' as const };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

export const getMonthName = (monthNumber: string): string => {
  const monthIndex = parseInt(monthNumber) - 1;
  return monthIndex >= 0 && monthIndex < 12 ? MONTH_NAMES[monthIndex] : `Month ${monthNumber}`;
};

export const getReportStatus = (report: INazeraReport): string => {
  const daysWithData = Object.values(report.dailyEntries).filter(day =>
    day && (day.morning?.para || day.afternoon?.para || day.night?.para)
  ).length;

  if (daysWithData === 0) return "not-started";
  if (daysWithData === 7) return "completed";
  return "in-progress";
};

export const getProgressPercentage = (report: INazeraReport): number => {
  const daysWithData = Object.values(report.dailyEntries).filter(day =>
    day && (day.morning?.para || day.afternoon?.para || day.night?.para)
  ).length;
  return Math.round((daysWithData / 7) * 100);
};

export const calculateWeeklyTotals = (dailyEntries: INazeraReport['dailyEntries']) => {
  let totalPages = 0;
  let totalMistakes = 0;
  let totalDuaHadith = 0;

  const sessionKeys: SessionKey[] = ['morning', 'afternoon', 'night'];

  Object.values(dailyEntries).forEach(day => {
    if (!day) return;

    sessionKeys.forEach(session => {
      if (day[session]?.page) {
        totalPages += parseInt(day[session].page) || 0;
      }
      if (day[session]?.mistakes) {
        totalMistakes += parseInt(day[session].mistakes) || 0;
      }
    });

    if (day.duaHadithMasala) {
      totalDuaHadith += parseInt(day.duaHadithMasala) || 0;
    }
  });

  return { totalPages, totalMistakes, totalDuaHadith };
};

export const getStatusColor = (status: string) => {
  switch (status) {
    case "completed": return "success";
    case "in-progress": return "warning";
    case "not-started": return "error";
    default: return "primary";
  }
};

export const getStatusIcon = (status: string) => {
  switch (status) {
    case "completed": return <CheckCircle fontSize="small" />;
    case "in-progress": return <Schedule fontSize="small" />;
    case "not-started": return <Cancel fontSize="small" />;
    default: return undefined;
  }
};