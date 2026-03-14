/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { AcademicTab } from "@/components/dashboard/AcademicTab";
import { AccountingTab } from "@/components/dashboard/AccountingTab";
import { ExamsTab } from "@/components/dashboard/ExamsTab";
import { ModuleCard } from "@/components/dashboard/ModuleCard";
import { OverviewTab } from "@/components/dashboard/OverviewTab";
import { StaffTab } from "@/components/dashboard/StaffTab";
import { StudentsTab } from "@/components/dashboard/StudentsTab";
import {
  useGetAccountingReportQuery,
  useGetAllMetaQuery,
} from "@/redux/api/metaApi";
import {
  AccountBalanceWallet,
  AccountBox,
  Apartment,
  CalendarMonth,
  Dashboard as DashboardIcon,
  Group,
  Help,
  Language,
  LocalPrintshop,
  Logout,
  Menu as MenuIcon,
  MonetizationOn,
  NoteAlt,
  Notifications,
  School,
  Search,
  Settings,
  Sms,
  VolunteerActivism,
  Work,
  WorkspacePremium,
} from "@mui/icons-material";
import {
  alpha,
  Avatar,
  Badge,
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  Menu,
  MenuItem,
  Paper,
  Tab,
  Tabs,
  TextField,
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
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [profileAnchorEl, setProfileAnchorEl] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);
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
  const handleTabChange = (event: any, newValue: any) => setActiveTab(newValue);

  const navigateToModule = (path: any) => router.push(path);

  // Stats state
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

  // Accounting stats from API
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

  // Modules data
  const modules = [
    {
      title: "Manage Branch",
      description: "Branch List, Update, Delete",
      icon: <AccountBalanceWallet />,
      color: theme.palette.primary.main,
      path: "/branch",
    },
    {
      title: "Donation",
      description: "Donor List, Update, Delete",
      icon: <VolunteerActivism />,
      color: "#FF5722",
      path: "/donation",
    },
    {
      title: "Certificate",
      description: "Create Certificate, Update, Delete",
      icon: <WorkspacePremium />,
      color: "#FFC107",
      path: "/certificate",
    },
    {
      title: "Payroll",
      description: "Teacher Salary Create, Update, Delete",
      icon: <Work />,
      color: "#2196F3",
      path: "/payroll",
    },
    {
      title: "Website",
      description: "Notice, Events, Blog, Contact",
      icon: <Language />,
      color: "#E91E63",
      path: "/website",
    },
    {
      title: "Academic",
      description: "Class, Batch, Student, Attendance",
      icon: <School />,
      color: "#4CAF50",
      path: "/academic",
    },
    {
      title: "Exam",
      description: "Grading, Exam, Result, Marksheet",
      icon: <NoteAlt />,
      color: "#FF9800",
      path: "/exam",
    },
    {
      title: "Accounting",
      description: "Income, Expense, Transactions, Reports",
      icon: <AccountBalanceWallet />,
      color: "#009688",
      path: "/accounting",
    },
    {
      title: "Fees",
      description: "Fee, Discounts, Fine, Collection",
      icon: <MonetizationOn />,
      color: "#8BC34A",
      path: "/fees",
    },
    {
      title: "Print",
      description: "ID Card, Admit Card, Result",
      icon: <LocalPrintshop />,
      color: "#F44336",
      path: "/print",
    },
    {
      title: "SMS",
      description: "Send SMS and notice to teachers, students",
      icon: <Sms />,
      color: "#3F51B5",
      path: "/sms",
    },
    {
      title: "Attendance",
      description: "Manage Attendance, Send attendance SMS",
      icon: <CalendarMonth />,
      color: "#9C27B0",
      path: "/attendance",
    },
    {
      title: "Department",
      description: "Faculty And Department",
      icon: <Apartment />,
      color: "#607D8B",
      path: "/department",
    },
  ];

  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: `linear-gradient(135deg, ${alpha(theme.palette.primary.light, 0.15)} 0%, ${alpha(theme.palette.background.default, 0.8)} 100%)`,
        borderRadius: { xs: 0, md: 6 },
        p: { xs: 1, sm: 3 },
        position: "relative",
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          width: "300px",
          height: "300px",
          top: "-100px",
          right: "-100px",
          borderRadius: "50%",
          background: `radial-gradient(${alpha(theme.palette.primary.light, 0.2)} 0%, transparent 70%)`,
          zIndex: 0,
        },
        "&::after": {
          content: '""',
          position: "absolute",
          width: "200px",
          height: "200px",
          bottom: "-50px",
          left: "-50px",
          borderRadius: "50%",
          background: `radial-gradient(${alpha(theme.palette.secondary.light, 0.2)} 0%, transparent 70%)`,
          zIndex: 0,
        },
      }}
    >
      {/* Header */}
      <Box sx={{ position: "relative", zIndex: 2 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 4,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton
              onClick={toggleSidebar}
              sx={{ mr: 2, display: { md: "none" }, color: "primary.main" }}
            >
              <MenuIcon />
            </IconButton>
            <Box>
              <GradientTypography
                variant="h3"
                sx={{ fontSize: { xs: "1.8rem", md: "2.5rem" } }}
              >
                Craft International Institute Dashboard
              </GradientTypography>
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ mt: 0.5 }}
              >
                {currentDate}
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <TextField
              size="small"
              placeholder="Search..."
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search color="action" />
                  </InputAdornment>
                ),
                sx: {
                  borderRadius: 3,
                  bgcolor: "background.paper",
                  width: { xs: 150, sm: 250 },
                },
              }}
            />
            <IconButton
              sx={{
                borderRadius: 3,
                bgcolor: alpha(theme.palette.primary.main, 0.1),
                color: theme.palette.primary.main,
              }}
            >
              <Badge badgeContent={4} color="error">
                <Notifications />
              </Badge>
            </IconButton>
            <Button
              onClick={handleProfileMenuOpen}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                px: { xs: 1, sm: 2 },
                py: 1,
                borderRadius: 3,
                bgcolor: alpha(theme.palette.primary.main, 0.1),
                color: theme.palette.primary.main,
              }}
            >
              <Avatar
                sx={{
                  width: 32,
                  height: 32,
                  bgcolor: theme.palette.primary.main,
                }}
              >
                CI
              </Avatar>
              <Box sx={{ display: { xs: "none", sm: "block" } }}>
                <Typography variant="body2" fontWeight="medium">
                  Craft International
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Administrator
                </Typography>
              </Box>
            </Button>
            <Menu
              anchorEl={profileAnchorEl}
              open={Boolean(profileAnchorEl)}
              onClose={handleProfileMenuClose}
              PaperProps={{ sx: { mt: 1.5, borderRadius: 2, minWidth: 180 } }}
            >
              <MenuItem onClick={handleProfileMenuClose}>
                <AccountBox fontSize="small" sx={{ mr: 1 }} /> Profile
              </MenuItem>
              <MenuItem onClick={handleProfileMenuClose}>
                <Settings fontSize="small" sx={{ mr: 1 }} /> Settings
              </MenuItem>
              <MenuItem onClick={handleProfileMenuClose}>
                <Help fontSize="small" sx={{ mr: 1 }} /> Help Center
              </MenuItem>
              <Divider />
              <MenuItem onClick={handleProfileMenuClose}>
                <Logout fontSize="small" sx={{ mr: 1 }} /> Logout
              </MenuItem>
            </Menu>
          </Box>
        </Box>

        {/* Tabs */}
        <Paper sx={{ borderRadius: 3, mb: 4, overflow: "hidden" }}>
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons="auto"
            sx={{
              bgcolor: alpha(theme.palette.primary.main, 0.05),
              "& .MuiTab-root": { fontWeight: 600, minHeight: 60 },
              "& .Mui-selected": { color: theme.palette.primary.main },
            }}
          >
            <Tab icon={<DashboardIcon />} label="Overview" />
            <Tab icon={<AccountBalanceWallet />} label="Accounting" />
            <Tab icon={<School />} label="Academic" />
            <Tab icon={<Group />} label="Students" />
            <Tab icon={<Work />} label="Staff" />
            <Tab icon={<NoteAlt />} label="Exams" />
          </Tabs>
        </Paper>

        {/* Tab Panels */}
        {activeTab === 0 && <OverviewTab stats={stats} isLoading={isLoading} />}
        {activeTab === 1 && (
          <AccountingTab
            accountingStats={accountingStats}
            accountingLoading={accountingLoading}
          />
        )}
        {activeTab === 2 && <AcademicTab />}
        {activeTab === 3 && <StudentsTab />}
        {activeTab === 4 && <StaffTab />}
        {activeTab === 5 && <ExamsTab />}

        {/* Modules Grid */}
        <Box sx={{ mb: 2 }}>
          <GradientTypography
            variant="h4"
            sx={{ mb: 3, display: "flex", alignItems: "center" }}
          >
            <DashboardIcon sx={{ mr: 1.5 }} />
            Quick Access Modules
          </GradientTypography>
          <Grid container spacing={3}>
            {modules.map((module, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
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
