/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { AccountingTab } from "@/components/dashboard/AccountingTab";
import { ModuleCard } from "@/components/dashboard/ModuleCard";
import { OverviewTab } from "@/components/dashboard/OverviewTab";
import {
  useGetAccountingReportQuery,
  useGetAllMetaQuery,
} from "@/redux/api/metaApi";
import {
  AccountBalanceWallet,
  AdminPanelSettings,
  Apartment,
  Assignment,
  AutoStories,
  Badge,
  Campaign,
  CollectionsBookmark,
  Dashboard as DashboardIcon,
  EditNote,
  EmojiEvents,
  EventNote,
  FactCheck,
  ImportContacts,
  LocalPrintshop,
  Menu as MenuIcon,
  Payment,
  PeopleAlt,
  Restaurant,
  School,
  Settings,
  Sms,
  VolunteerActivism,
  Web,
  Work,
  WorkspacePremium,
} from "@mui/icons-material";
import {
  alpha,
  Box,
  Grid,
  IconButton,
  Paper, 
  Tab,
  Tabs,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const GradientTypography = ({ variant, children, gradient, sx = {} }: any) => {
  const theme = useTheme();
  const gradientColors =
    gradient ||
    `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`;
  return (
    <Typography
      variant={variant}
      sx={{
        background: gradientColors,
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
        textFillColor: "transparent",
        display: "inline-block",
        fontWeight: 700,
        ...sx,
      }}
    >
      {children}
    </Typography>
  );
};

export default function DashboardHome() {
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isMd = useMediaQuery(theme.breakpoints.down("md"));

  const [profileAnchorEl, setProfileAnchorEl] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(!isMd);
  const [activeTab, setActiveTab] = useState(0);

  const { data, isLoading } = useGetAllMetaQuery({});
  const { data: accountingData, isLoading: accountingLoading } =
    useGetAccountingReportQuery({});
  const metaData = data?.data;
  const accountingReport = accountingData?.data?.data;

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const handleProfileMenuOpen = (event: any) =>
    setProfileAnchorEl(event.currentTarget);
  const handleProfileMenuClose = () => setProfileAnchorEl(null);
  const handleTabChange = (_event: any, newValue: any) =>
    setActiveTab(newValue);
  const navigateToModule = (path: any) => router.push(path);

  const [stats, setStats] = useState({
    students: { total: 0, trend: "up", trendValue: 12 },
    teachers: { total: 0, trend: "up", trendValue: 8 },
    classes: { total: 0, trend: "up", trendValue: 5 },
    staffs: { total: 0, trend: "up", trendValue: 10 },
    income: { total: "৳24,500", trend: "up", trendValue: 15 },
    expenses: { total: "৳18,200", trend: "down", trendValue: 5 },
    attendance: {
      students: { present: 0, total: 0 },
      teachers: { present: 0, total: 0 },
    },
    smsBalance: 250,
    smsSent: 42,
    websiteVisits: 1243,
  });

  useEffect(() => {
    if (metaData) {
      setStats((prev) => ({
        ...prev,
        students: { ...prev.students, total: metaData.totalStudents || 0 },
        teachers: { ...prev.teachers, total: metaData.totalTeachers || 0 },
        classes: { ...prev.classes, total: metaData.totalClasses || 0 },
        staffs: { ...prev.staffs, total: metaData.totalStaffs || 0 },
        attendance: {
          students: {
            present: Math.round((metaData.totalStudents || 0) * 0.85),
            total: metaData.totalStudents || 0,
          },
          teachers: {
            present: Math.round((metaData.totalTeachers || 0) * 0.9),
            total: metaData.totalTeachers || 0,
          },
        },
      }));
    }
  }, [metaData]);

  const accountingStats = accountingReport
    ? {
        totalIncome: accountingReport.summary?.income,
        totalExpense: accountingReport.summary?.expense,
        netProfit: accountingReport.summary?.netProfit,
        assets: accountingReport.summary?.assets,
        liabilities: accountingReport.summary?.liabilities,
        equity: accountingReport.summary?.equity,
        equationValid: accountingReport.formulaCheck?.["Valid?"],
        equationAssets: accountingReport.formulaCheck?.["Assets (সম্পদ)"],
        equationLiabilities:
          accountingReport.formulaCheck?.["Liabilities (দেনা)"],
        equationEquity: accountingReport.formulaCheck?.["Equity (মূলধন)"],
        breakdown: accountingReport.breakdown || {},
        details: accountingReport.details || {},
      }
    : null;

  const modules = [
    {
      title: "Dashboard",
      description: "Overview",
      icon: <DashboardIcon />,
      color: theme.palette.primary.main,
      path: "/dashboard",
    },
    {
      title: "Website",
      description: "Notice, Events, Blog",
      icon: <Web />,
      color: "#2a52be",
      path: "/dashboard/website",
    },
    {
      title: "Admissions",
      description: "Enrollments",
      icon: <EditNote />,
      color: "#5D4037",
      path: "/dashboard/enrollments/list",
    },
    {
      title: "Academic",
      description: "Class, Batch, Attendance",
      icon: <School />,
      color: "#0F9D58",
      path: "/dashboard/academic",
    },
    {
      title: "Hifz Program",
      description: "Daily Reports",
      icon: <AutoStories />,
      color: "#9C27B0",
      path: "/dashboard/hifz/class/list",
    },
    {
      title: "Ampara",
      description: "Daily & Weekly",
      icon: <ImportContacts />,
      color: "#2E7D32",
      path: "/dashboard/ampara/daily-report/list",
    },
    {
      title: "Nazera",
      description: "Daily & Weekly",
      icon: <ImportContacts />,
      color: "#FF6B35",
      path: "/dashboard/nazera/daily-report/list",
    },
    {
      title: "Qaida/Noorani",
      description: "Daily & Weekly",
      icon: <CollectionsBookmark />,
      color: "#00ACC1",
      path: "/dashboard/qaida-noorani/daily-report/list",
    },
    {
      title: "Teachers",
      description: "Manage Teachers",
      icon: <Work />,
      color: "#FF5722",
      path: "/dashboard/teacher/list",
    },
    {
      title: "Staff",
      description: "Staff List",
      icon: <Badge />,
      color: "#7B1FA2",
      path: "/dashboard/staff/list",
    },
    {
      title: "Students",
      description: "Student List",
      icon: <PeopleAlt />,
      color: "#1976D2",
      path: "/dashboard/student/list",
    },

    {
      title: "Communications",
      description: "Notice, Feedback",
      icon: <Campaign />,
      color: "#7B1FA2",
      path: "/dashboard/notice-board",
    },
    {
      title: "Meal Mgmt",
      description: "Daily Meal Reports",
      icon: <Restaurant />,
      color: "#E91E63",
      path: "/dashboard/daily-meal-report",
    },
    { 
      title: "Fees",
      description: "Fee Collections",
      icon: <Payment />,
      color: "#009688",
      path: "/dashboard/fees/list",
    },

    {
      title: "Accounting",
      description: "Income, Expense",
      icon: <AccountBalanceWallet />,
      color: "#2E7D32",
      path: "/dashboard/accounting/income",
    },

    {
      title: "User Mgmt",
      description: "Users & Permissions",
      icon: <AdminPanelSettings />,
      color: "#546E7A",
      path: "/dashboard/user-management",
    },
  ];

  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: isMobile ? "short" : "long",
    year: "numeric",
    month: isMobile ? "short" : "long",
    day: "numeric",
  });

  return (
    <Box
  sx={(theme) => ({
    minHeight: "100vh",
    background: `linear-gradient( 
      135deg,
      ${alpha(theme.palette.primary.light, theme.palette.mode === "dark" ? 0.25 : 0.15)} 0%,
      ${alpha(theme.palette.background.default, theme.palette.mode === "dark" ? 0.95 : 0.8)} 100%
    )`,
    borderRadius: { xs: 0, md: 6 },
    p: { xs: 1, sm: 2, md: 3 },
    position: "relative",
    overflow: "hidden",

    "&::before": {
      content: '""',
      position: "absolute",
      width: { xs: "120px", md: "300px" },
      height: { xs: "120px", md: "300px" },
      top: "-60px",
      right: "-60px",
      borderRadius: "50%",
      background: `radial-gradient(${alpha(
        theme.palette.primary.light,
        theme.palette.mode === "dark" ? 0.3 : 0.2
      )} 0%, transparent 70%)`,
      zIndex: 0,
    },

    "&::after": {
      content: '""',
      position: "absolute",
      width: { xs: "100px", md: "200px" },
      height: { xs: "100px", md: "200px" },
      bottom: "-40px",
      left: "-40px",
      borderRadius: "50%",
      background: `radial-gradient(${alpha(
        theme.palette.secondary?.light || theme.palette.primary.light,
        theme.palette.mode === "dark" ? 0.3 : 0.2
      )} 0%, transparent 70%)`,
      zIndex: 0,
    },
  })}
>
      <Box sx={{ position: "relative", zIndex: 2 }}>
        {/* ── Header ── */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: { xs: 2, sm: 3, md: 4 },
            gap: 1,
            flexWrap: "nowrap",
          }}
        >
          {/* Left: hamburger + title */}
          <Box
            sx={{ display: "flex", alignItems: "center", minWidth: 0, flex: 1 }}
          >
            <IconButton
              onClick={toggleSidebar}
              size={isMobile ? "small" : "medium"}
              sx={{
                mr: 1,
                display: { md: "none" },
                color: "primary.main",
                flexShrink: 0,
              }}
            >
              <MenuIcon />
            </IconButton>
            <Box sx={{ minWidth: 0 }}>
              <GradientTypography
                variant="h3"
                sx={{
                  fontSize: {
                    xs: "0.9rem",
                    sm: "1.2rem",
                    md: "1.75rem",
                    lg: "2.2rem",
                  },
                  lineHeight: 1.2,
                  whiteSpace: { xs: "nowrap", sm: "normal" }, 
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {isMobile
                  ? "CI Dashboard" 
                  : "Craft International Institute Dashboard"}
              </GradientTypography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mt: 0.25, fontSize: { xs: "0.65rem", sm: "0.8rem" } }}
              >
                {currentDate}
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* ── Tabs ── */}
        <Paper
          sx={{ borderRadius: 3, mb: { xs: 2, sm: 3 }, overflow: "hidden" }}
        >
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons="auto"
            sx={{
              bgcolor: alpha(theme.palette.primary.main, 0.05),
              minHeight: { xs: 44, sm: 56 },
              "& .MuiTab-root": {
                fontWeight: 600,
                minHeight: { xs: 44, sm: 56 },
                fontSize: { xs: "0.72rem", sm: "0.85rem" },
                px: { xs: 1.5, sm: 2.5 },
                gap: { xs: 0.5, sm: 1 },
                "& .MuiTab-iconWrapper": {
                  fontSize: { xs: "1rem", sm: "1.25rem" },
                },
              },
              "& .Mui-selected": { color: theme.palette.primary.main },
            }}
          >
            <Tab
              icon={<DashboardIcon />}
              iconPosition="start"
              label="Overview"
            />
            <Tab
              icon={<AccountBalanceWallet />}
              iconPosition="start"
              label="Accounting"
            />
          </Tabs>
        </Paper>

        {/* ── Tab Panels ── */}
        {activeTab === 0 && <OverviewTab stats={stats} isLoading={isLoading} />}
        {activeTab === 1 && (
          <AccountingTab
            accountingStats={accountingStats}
            accountingLoading={accountingLoading}
          />
        )}

        {/* ── Quick Access Modules ── */}
        <Box sx={{ mb: 2 }}>
          <GradientTypography
            variant="h4"
            sx={{
              mb: { xs: 1.5, sm: 2.5 },
              display: "flex",
              alignItems: "center",
              fontSize: { xs: "1rem", sm: "1.25rem", md: "1.75rem" },
            }}
          >
            <DashboardIcon
              sx={{
                mr: 1,
                fontSize: { xs: "1rem", sm: "1.25rem", md: "1.75rem" },
              }}
            />
            Quick Access Modules
          </GradientTypography>

          {/* xs=6 → 2 cols mobile | sm=4 → 3 cols tablet | md=3 → 4 cols desktop */}
          <Grid container spacing={{ xs: 1, sm: 1.5, md: 2 }}>
            {modules.map((module, index) => (
              <Grid item xs={6} sm={4} md={3} lg={2} key={index}>
                <ModuleCard
                  title={module.title}
                  description={module.description}
                  icon={module.icon}
                  color={module.color}
                  onClick={() => navigateToModule(module.path)}
                  loading={isLoading}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}
