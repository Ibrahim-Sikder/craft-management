/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { useState, useEffect } from "react"
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
  Chip,
  IconButton,
  Divider,
  LinearProgress,
  Paper,
  Button,
  Menu,
  MenuItem,
  Badge,
  useTheme,
  alpha,
  InputAdornment,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,

  TableRow,

  Accordion,
  AccordionSummary,
  AccordionDetails,

  CircularProgress,
  useMediaQuery,
  Tabs,
  Tab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material"
import {
  AccountBalance,
  AccountBalanceWallet,
  Apartment,
  CalendarMonth,
  Language,
  LocalPrintshop,
  MonetizationOn,
  NoteAlt,
  School,
  Sms,
  VolunteerActivism,
  Work,
  WorkspacePremium,
  Notifications,
  Search,
  MoreVert,
  TrendingUp,
  TrendingDown,
  Person,
  Group,
  KeyboardArrowRight,
  Settings,
  Help,
  Logout,
  Class,
  AccountTree,
  ShowChart,
  Balance,
  ExpandMore,
  Receipt,
  AttachMoney,
  MoneyOff,
  Savings,
  CreditCard,
  AccountCircle,
  Dashboard as DashboardIcon,
  BarChart,
  Timeline,
  AccountBox,
  Menu as MenuIcon,
  Close,
  DateRange,
  Download,
  Visibility,
} from "@mui/icons-material"
import { useRouter } from "next/navigation"
import { useGetAccountingReportQuery, useGetAllMetaQuery } from "@/redux/api/metaApi"

// Custom styled components for a more professional look
const GlassCard = ({ children, sx = {}, ...props }: any) => (
  <Card
    sx={{
      background: 'rgba(255, 255, 255, 0.85)',
      backdropFilter: 'blur(12px)',
      borderRadius: 4,
      border: '1px solid rgba(255, 255, 255, 0.3)',
      boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
      overflow: 'hidden',
      ...sx,
    }}
    {...props}
  >
    {children}
  </Card>
)

const GradientTypography = ({ variant, children, gradient, sx = {} }: any) => {
  const theme = useTheme()
  const gradientColors = gradient || `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`

  return (
    <Typography
      variant={variant}
      sx={{
        background: gradientColors,
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        textFillColor: 'transparent',
        display: 'inline-block',
        fontWeight: 700,
        ...sx,
      }}
    >
      {children}
    </Typography>
  )
}

// Enhanced StatCard component
const StatCard = ({ icon, title, value, trend, trendValue, color, loading = false }: any) => {
  const isPositive = trend === "up"
  const theme = useTheme()

  return (
    <GlassCard
      sx={{
        p: 2.5,
        height: '100%',
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: '0 12px 32px 0 rgba(31, 38, 135, 0.25)',
        },
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <Avatar
          sx={{
            bgcolor: alpha(color, 0.1),
            color: color,
            width: 56,
            height: 56,
            mb: 2,
            boxShadow: `0 6px 12px ${alpha(color, 0.2)}`,
          }}
        >
          {icon}
        </Avatar>
        <Chip
          icon={isPositive ? <TrendingUp fontSize="small" /> : <TrendingDown fontSize="small" />}
          label={`${trendValue}%`}
          size="small"
          color={isPositive ? "success" : "error"}
          sx={{ height: 28, fontWeight: 600 }}
        />
      </Box>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 2 }}>
          <CircularProgress size={30} />
        </Box>
      ) : (
        <>
          <Typography variant="h4" component="div" sx={{ fontWeight: 800, mb: 0.5 }}>
            {value}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.9rem' }}>
            {title}
          </Typography>
        </>
      )}

      <Box sx={{ mt: 2, display: 'flex', alignItems: 'center' }}>
        <Box
          sx={{
            width: '100%',
            height: 6,
            borderRadius: 3,
            bgcolor: alpha(theme.palette.primary.main, 0.1),
            overflow: 'hidden',
          }}
        >
          <Box
            sx={{
              width: `${trendValue}%`,
              height: '100%',
              bgcolor: isPositive ? theme.palette.success.main : theme.palette.error.main,
              borderRadius: 3,
            }}
          />
        </Box>
      </Box>
    </GlassCard>
  )
}

// Enhanced ModuleCard component
const ModuleCard = ({ title, description, icon, color, onClick, loading = false }: any) => {
  const theme = useTheme()

  return (
    <GlassCard
      onClick={onClick}
      sx={{
        cursor: "pointer",
        height: "100%",
        transition: "all 0.3s ease",
        "&:hover": {
          transform: "translateY(-8px)",
          boxShadow: `0 12px 32px 0 ${alpha(color, 0.25)}`,
          "& .arrow-icon": {
            transform: "translateX(6px)",
            opacity: 1,
          },
        },
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 2 }}>
          {loading ? (
            <CircularProgress size={40} />
          ) : (
            <Avatar
              sx={{
                bgcolor: alpha(color, 0.1),
                color: color,
                width: 52,
                height: 52,
                boxShadow: `0 6px 12px ${alpha(color, 0.2)}`,
              }}
            >
              {icon}
            </Avatar>
          )}
          <KeyboardArrowRight
            className="arrow-icon"
            sx={{
              color: color,
              opacity: 0.7,
              transition: "all 0.3s ease",
            }}
          />
        </Box>
        {loading ? (
          <>
            <Box sx={{ width: '60%', height: 24, bgcolor: alpha(theme.palette.text.primary, 0.1), borderRadius: 1, mb: 1 }} />
            <Box sx={{ width: '80%', height: 16, bgcolor: alpha(theme.palette.text.primary, 0.1), borderRadius: 1 }} />
          </>
        ) : (
          <>
            <Typography variant="h6" component="div" sx={{ fontWeight: 700, mb: 1 }}>
              {title}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.9rem' }}>
              {description}
            </Typography>
          </>
        )}
      </CardContent>
    </GlassCard>
  )
}

// New Accounting Card Component
const AccountingCard = ({ title, value, icon, color, subValue, subTitle, loading = false, onClick }: any) => {
  const theme = useTheme()

  return (
    <GlassCard
      onClick={onClick}
      sx={{
        height: "100%",
        transition: "all 0.3s ease",
        background: `linear-gradient(135deg, ${alpha(color, 0.15)} 0%, ${alpha(color, 0.05)} 100%)`,
        border: `1px solid ${alpha(color, 0.2)}`,
        cursor: onClick ? 'pointer' : 'default',
        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: `0 12px 20px -5px ${alpha(color, 0.25)}`,
        },
      }}
    >
      <CardContent sx={{ p: 3, position: 'relative' }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 2 }}>
          {loading ? (
            <CircularProgress size={40} />
          ) : (
            <Avatar
              sx={{
                bgcolor: alpha(color, 0.1),
                color: color,
                width: 54,
                height: 54,
                boxShadow: `0 6px 12px ${alpha(color, 0.2)}`,
              }}
            >
              {icon}
            </Avatar>
          )}
          <IconButton size="small" sx={{ color: "text.secondary" }}>
            <MoreVert />
          </IconButton>
        </Box>

        {loading ? (
          <Box sx={{ mb: 2 }}>
            <Box sx={{ width: '70%', height: 32, bgcolor: alpha(theme.palette.text.primary, 0.1), borderRadius: 1, mb: 1 }} />
            <Box sx={{ width: '50%', height: 20, bgcolor: alpha(theme.palette.text.primary, 0.1), borderRadius: 1 }} />
          </Box>
        ) : (
          <>
            <Typography variant="h4" component="div" sx={{ fontWeight: 800, mb: 1 }}>
              {value}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2, fontSize: '0.9rem' }}>
              {title}
            </Typography>
          </>
        )}

        {subValue && !loading && (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography variant="body2" sx={{ color: color, fontWeight: 600, mr: 1 }}>
              {subValue}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {subTitle}
            </Typography>
          </Box>
        )}

        {loading && (
          <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
            <Box sx={{ width: '100%' }}>
              <LinearProgress color="primary" />
            </Box>
          </Box>
        )}
      </CardContent>
    </GlassCard>
  )
}

// Accounting Equation Check Component
const EquationCheck = ({ assets, liabilities, equity, isValid, loading = false }: any) => {
  const theme = useTheme()

  return (
    <GlassCard
      sx={{
        mb: 3,
        background: isValid
          ? `linear-gradient(135deg, ${alpha(theme.palette.success.main, 0.1)} 0%, ${alpha(theme.palette.success.main, 0.03)} 100%)`
          : `linear-gradient(135deg, ${alpha(theme.palette.error.main, 0.1)} 0%, ${alpha(theme.palette.error.main, 0.03)} 100%)`,
        border: `1px solid ${isValid ? alpha(theme.palette.success.main, 0.2) : alpha(theme.palette.error.main, 0.2)}`,
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <Balance sx={{ mr: 1.5, color: isValid ? "success.main" : "error.main" }} />
          <Typography variant="h6" component="div">
            Accounting Equation Check
          </Typography>
          {!loading && (
            <Chip
              label={isValid ? "Balanced" : "Not Balanced"}
              color={isValid ? "success" : "error"}
              size="small"
              sx={{ ml: 2, fontWeight: 600 }}
            />
          )}
        </Box>

        {loading ? (
          <Box>
            <Box sx={{ width: '80%', height: 20, bgcolor: alpha(theme.palette.text.primary, 0.1), borderRadius: 1, mb: 2 }} />
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 2 }}>
              <CircularProgress size={30} />
            </Box>
          </Box>
        ) : (
          <>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              The fundamental accounting equation: <strong>Assets = Liabilities + Equity</strong>
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center", gap: 1 }}>
              <Typography variant="h6" sx={{ fontWeight: 800, color: 'primary.main' }}>
                ৳{assets?.toLocaleString()}
              </Typography>
              <Typography variant="h6" sx={{ mx: 1, fontWeight: 700 }}>
                =
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 800, color: 'warning.main' }}>
                ৳{liabilities?.toLocaleString()}
              </Typography>
              <Typography variant="h6" sx={{ mx: 1, fontWeight: 700 }}>
                +
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 800, color: 'secondary.main' }}>
                ৳{equity?.toLocaleString()}
              </Typography>
            </Box>
            {!isValid && (
              <Typography variant="caption" color="error" sx={{ mt: 2, display: "block", textAlign: "center", fontWeight: 600 }}>
                There's a discrepancy in the accounting equation that needs attention.
              </Typography>
            )}
          </>
        )}
      </CardContent>
    </GlassCard>
  )
}

// Financial Health Meter Component
const FinancialHealthMeter = ({ income, expenses, profit, loading = false }: any) => {
  const theme = useTheme()
  const profitMargin = income > 0 ? (profit / income) * 100 : 0
  let healthStatus = "Excellent"
  let healthColor = theme.palette.success.main

  if (profitMargin < 10) {
    healthStatus = "Poor"
    healthColor = theme.palette.error.main
  } else if (profitMargin < 20) {
    healthStatus = "Fair"
    healthColor = theme.palette.warning.main
  } else if (profitMargin < 30) {
    healthStatus = "Good"
    healthColor = theme.palette.info.main
  }

  return (
    <GlassCard sx={{ height: '100%' }}>
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <BarChart sx={{ mr: 1.5, color: 'primary.main' }} />
          <Typography variant="h6" component="div">
            Financial Health
          </Typography>
        </Box>

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 3 }}>
            <CircularProgress size={40} />
          </Box>
        ) : (
          <>
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
              <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                <CircularProgress
                  variant="determinate"
                  value={profitMargin > 100 ? 100 : profitMargin}
                  size={120}
                  thickness={4}
                  sx={{ color: healthColor }}
                />
                <Box
                  sx={{
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    position: 'absolute',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column'
                  }}
                >
                  <Typography variant="h6" component="div" sx={{ fontWeight: 800 }}>
                    {profitMargin.toFixed(1)}%
                  </Typography>
                  <Typography variant="caption" component="div" color="text.secondary">
                    Margin
                  </Typography>
                </Box>
              </Box>
            </Box>

            <Box sx={{ textAlign: 'center', mb: 2 }}>
              <Chip
                label={healthStatus}
                color={
                  healthStatus === "Excellent" ? "success" :
                    healthStatus === "Good" ? "info" :
                      healthStatus === "Fair" ? "warning" : "error"
                }
                sx={{ fontWeight: 700 }}
              />
            </Box>

            <Box sx={{ mt: 3 }}>
              <Typography variant="body2" gutterBottom sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Income:</span> <strong>৳{income?.toLocaleString()}</strong>
              </Typography>
              <Typography variant="body2" gutterBottom sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Expenses:</span> <strong>৳{expenses?.toLocaleString()}</strong>
              </Typography>
              <Divider sx={{ my: 1.5 }} />
              <Typography variant="body2" gutterBottom sx={{ display: 'flex', justifyContent: 'space-between', fontWeight: 800 }}>
                <span>Profit:</span> <strong>৳{profit?.toLocaleString()}</strong>
              </Typography>
            </Box>
          </>
        )}
      </CardContent>
    </GlassCard>
  )
}

// Cash Flow Summary Component
const CashFlowSummary = ({ income, expenses, breakdown, loading = false }: any) => {
  const theme = useTheme()

  return (
    <GlassCard sx={{ height: '100%' }}>
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <Timeline sx={{ mr: 1.5, color: 'primary.main' }} />
          <Typography variant="h6" component="div">
            Cash Flow Summary
          </Typography>
        </Box>

        {loading ? (
          <Box>
            <Box sx={{ width: '100%', height: 20, bgcolor: alpha(theme.palette.text.primary, 0.1), borderRadius: 1, mb: 2 }} />
            <Box sx={{ width: '80%', height: 16, bgcolor: alpha(theme.palette.text.primary, 0.1), borderRadius: 1, mb: 3 }} />
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 2 }}>
              <CircularProgress size={30} />
            </Box>
          </Box>
        ) : (
          <>
            <Box sx={{ mb: 3 }}>
              <Typography variant="body2" gutterBottom sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Operating Income</span>
                <strong style={{ color: theme.palette.success.main }}>৳{income?.toLocaleString()}</strong>
              </Typography>
              <Typography variant="body2" gutterBottom sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Admission Fees</span>
                <strong>৳{breakdown?.totalAdmissionFee?.toLocaleString()}</strong>
              </Typography>
            </Box>

            <Box sx={{ mb: 3 }}>
              <Typography variant="body2" gutterBottom sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Operating Expenses</span>
                <strong style={{ color: theme.palette.error.main }}>৳{expenses?.toLocaleString()}</strong>
              </Typography>
              <Typography variant="body2" gutterBottom sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Salaries</span>
                <strong>৳{breakdown?.totalSalary?.toLocaleString()}</strong>
              </Typography>
            </Box>

            <Divider sx={{ my: 2 }} />

            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" gutterBottom sx={{ display: 'flex', justifyContent: 'space-between', fontWeight: 800 }}>
                <span>Net Cash Flow</span>
                <strong style={{ color: income - expenses >= 0 ? theme.palette.success.main : theme.palette.error.main }}>
                  ৳{(income - expenses)?.toLocaleString()}
                </strong>
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
              <Button variant="outlined" size="small" startIcon={<Visibility />}>
                Details
              </Button>
              <Button variant="contained" size="small" startIcon={<Download />}>
                Export
              </Button>
            </Box>
          </>
        )}
      </CardContent>
    </GlassCard>
  )
}

// Dashboard component
const DashboardHome = () => {
  const router = useRouter()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const [profileAnchorEl, setProfileAnchorEl] = useState(null)
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile)
  const [activeTab, setActiveTab] = useState(0)
  const [accountingDialogOpen, setAccountingDialogOpen] = useState(false)
  const [selectedAccountingCard, setSelectedAccountingCard] = useState(null)

  const { data, isLoading } = useGetAllMetaQuery({})
  const { data: accountingData, isLoading: accountingLoading } = useGetAccountingReportQuery({})
  const metaData = data?.data
  const accountingReport = accountingData?.data?.data
  console.log(accountingReport)
  // Toggle sidebar
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  // Handle profile menu open/close
  const handleProfileMenuOpen = (event: any) => {
    setProfileAnchorEl(event.currentTarget)
  }

  const handleProfileMenuClose = () => {
    setProfileAnchorEl(null)
  }

  // Handle tab change
  const handleTabChange = (event: any, newValue: any) => {
    setActiveTab(newValue)
  }

  // Handle accounting card click
  const handleAccountingCardClick = (card: any) => {
    setSelectedAccountingCard(card)
    setAccountingDialogOpen(true)
  }

  // Close accounting dialog
  const handleAccountingDialogClose = () => {
    setAccountingDialogOpen(false)
    setSelectedAccountingCard(null)
  }

  // Navigate to module
  const navigateToModule = (path: any) => {
    router.push(path)
  }

  // Initial stats with default values
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
  })

  useEffect(() => {
    if (metaData) {
      setStats(prevStats => ({
        ...prevStats,
        students: {
          ...prevStats.students,
          total: metaData.totalStudents || 0
        },
        teachers: {
          ...prevStats.teachers,
          total: metaData.totalTeachers || 0
        },
        classes: {
          ...prevStats.classes,
          total: metaData.totalClasses || 0
        },
        staffs: {
          ...prevStats.staffs,
          total: metaData.totalStaffs || 0
        },
        attendance: {
          students: {
            present: Math.round((metaData.totalStudents || 0) * 0.85),
            total: metaData.totalStudents || 0
          },
          teachers: {
            present: Math.round((metaData.totalTeachers || 0) * 0.9),
            total: metaData.totalTeachers || 0
          },
        },
      }))
    }
  }, [metaData])

  // Accounting stats from API
  const accountingStats = accountingReport ? {
    totalIncome: accountingReport.summary?.income,
    totalExpense: accountingReport.summary?.expense,
    netProfit: accountingReport.summary?.netProfit,
    assets: accountingReport.summary?.assets,
    liabilities: accountingReport.summary?.liabilities,
    equity: accountingReport.summary?.equity,
    equationValid: accountingReport.formulaCheck?.["Valid?"],
    equationAssets: accountingReport.formulaCheck?.["Assets (সম্পদ)"],
    equationLiabilities: accountingReport.formulaCheck?.["Liabilities (দেনা)"],
    equationEquity: accountingReport.formulaCheck?.["Equity (মূলধন)"],
    breakdown: accountingReport.breakdown || {},
    details: accountingReport.details || {}
  } : null

  // Modules data
  const modules = [
    {
      title: "Manage Branch",
      description: "Branch List, Update, Delete",
      icon: <AccountBalance />,
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
  ]

  // Current date
  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: `linear-gradient(135deg, ${alpha(theme.palette.primary.light, 0.15)} 0%, ${alpha(theme.palette.background.default, 0.8)} 100%)`,
        borderRadius: { xs: 0, md: 6 },
        p: { xs: 1, sm: 3 },
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          width: '300px',
          height: '300px',
          top: '-100px',
          right: '-100px',
          borderRadius: '50%',
          background: `radial-gradient(${alpha(theme.palette.primary.light, 0.2)} 0%, transparent 70%)`,
          zIndex: 0,
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          width: '200px',
          height: '200px',
          bottom: '-50px',
          left: '-50px',
          borderRadius: '50%',
          background: `radial-gradient(${alpha(theme.palette.secondary.light, 0.2)} 0%, transparent 70%)`,
          zIndex: 0,
        },
      }}
    >
      {/* Header */}
      <Box sx={{ position: 'relative', zIndex: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton
              onClick={toggleSidebar}
              sx={{
                mr: 2,
                display: { md: 'none' },
                color: 'primary.main'
              }}
            >
              <MenuIcon />
            </IconButton>
            <Box>
              <GradientTypography variant="h3" sx={{ fontSize: { xs: '1.8rem', md: '2.5rem' } }}>
                Craft International Institute Dashboard
              </GradientTypography>
              <Typography variant="body1" color="text.secondary" sx={{ mt: 0.5 }}>
                {currentDate}
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
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
                  bgcolor: 'background.paper',
                  width: { xs: 150, sm: 250 },
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'rgba(0, 0, 0, 0.1)',
                  },
                },
              }}
            />

            <IconButton
              sx={{
                borderRadius: 3,
                bgcolor: alpha(theme.palette.primary.main, 0.1),
                color: theme.palette.primary.main,
                "&:hover": {
                  bgcolor: alpha(theme.palette.primary.main, 0.3),
                },
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
                "&:hover": {
                  bgcolor: alpha(theme.palette.primary.main, 0.3),
                },
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
                <Typography variant="body2" fontWeight="medium" sx={{ textAlign: "left" }}>
                  Craft International
                </Typography>
                <Typography variant="caption" color="text.secondary" sx={{ textAlign: "left" }}>
                  Administrator
                </Typography>
              </Box>
            </Button>

            <Menu
              anchorEl={profileAnchorEl}
              open={Boolean(profileAnchorEl)}
              onClose={handleProfileMenuClose}
              PaperProps={{
                sx: {
                  mt: 1.5,
                  borderRadius: 2,
                  minWidth: 180,
                  boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
                },
              }}
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

        {/* Tabs for Dashboard Sections */}
        <Paper sx={{ borderRadius: 3, mb: 4, overflow: 'hidden' }}>
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons="auto"
            sx={{
              bgcolor: alpha(theme.palette.primary.main, 0.05),
              '& .MuiTab-root': {
                fontWeight: 600,
                minHeight: 60,
              },
              '& .Mui-selected': {
                color: theme.palette.primary.main,
              },
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

        {/* Stats Overview */}
        {activeTab === 0 && (
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12} sm={6} md={3}>
              <StatCard
                icon={<Group />}
                title="Total Students"
                value={isLoading ? "..." : stats.students.total}
                trend={stats.students.trend}
                trendValue={stats.students.trendValue}
                color={theme.palette.primary.main}
                loading={isLoading}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <StatCard
                icon={<Work />}
                title="Total Teachers"
                value={isLoading ? "..." : stats.teachers.total}
                trend={stats.teachers.trend}
                trendValue={stats.teachers.trendValue}
                color="#FF5722"
                loading={isLoading}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <StatCard
                icon={<Person />}
                title="Total Staff"
                value={isLoading ? "..." : stats.staffs.total}
                trend={stats.staffs.trend}
                trendValue={stats.staffs.trendValue}
                color="#3F51B5"
                loading={isLoading}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <StatCard
                icon={<Class />}
                title="Total Classes"
                value={isLoading ? "..." : stats.classes.total}
                trend={stats.classes.trend}
                trendValue={stats.classes.trendValue}
                color="#4CAF50"
                loading={isLoading}
              />
            </Grid>
          </Grid>
        )}

        {/* Accounting Section */}
        {activeTab === 1 && accountingStats && (
          <Box sx={{ mb: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
              <GradientTypography variant="h4" sx={{ display: 'flex', alignItems: 'center' }}>
                <AccountBalanceWallet sx={{ mr: 1.5 }} />
                Accounting Overview
              </GradientTypography>

              <Box>
                <Button startIcon={<DateRange />} sx={{ mr: 1 }}>
                  Date Filter
                </Button>
                <Button startIcon={<Download />}>
                  Export Report
                </Button>
              </Box>
            </Box>

            {/* Equation Check */}
            <EquationCheck
              assets={accountingStats.equationAssets}
              liabilities={accountingStats.equationLiabilities}
              equity={accountingStats.equationEquity}
              isValid={accountingStats.equationValid}
              loading={accountingLoading}
            />

            {/* Financial Summary Cards */}
            <Grid container spacing={3} sx={{ mb: 3 }}>
              <Grid item xs={12} md={4}>
                <AccountingCard
                  title="Total Income"
                  value={`৳${accountingStats.totalIncome?.toLocaleString()}`}
                  icon={<TrendingUp />}
                  color={theme.palette.success.main}
                  subValue={`৳${accountingStats.breakdown.totalAdmissionFee?.toLocaleString()}`}
                  subTitle="From Admissions"
                  loading={accountingLoading}
                  onClick={() => handleAccountingCardClick('income')}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <AccountingCard
                  title="Total Expenses"
                  value={`৳${accountingStats.totalExpense?.toLocaleString()}`}
                  icon={<TrendingDown />}
                  color={theme.palette.error.main}
                  subValue={`৳${accountingStats.breakdown.totalSalary?.toLocaleString()}`}
                  subTitle="In Salaries"
                  loading={accountingLoading}
                  onClick={() => handleAccountingCardClick('expenses')}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <AccountingCard
                  title="Net Profit"
                  value={`৳${accountingStats.netProfit?.toLocaleString()}`}
                  icon={<ShowChart />}
                  color={theme.palette.info.main}
                  subValue={`${Math.round((accountingStats.netProfit / accountingStats.totalIncome) * 100)}%`}
                  subTitle="Profit Margin"
                  loading={accountingLoading}
                  onClick={() => handleAccountingCardClick('profit')}
                />
              </Grid>
            </Grid>

            {/* Financial Health and Cash Flow */}
            <Grid container spacing={3} sx={{ mb: 3 }}>
              <Grid item xs={12} md={6}>
                <FinancialHealthMeter
                  income={accountingStats.totalIncome}
                  expenses={accountingStats.totalExpense}
                  profit={accountingStats.netProfit}
                  loading={accountingLoading}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <CashFlowSummary
                  income={accountingStats.totalIncome}
                  expenses={accountingStats.totalExpense}
                  breakdown={accountingStats.breakdown}
                  loading={accountingLoading}
                />
              </Grid>
            </Grid>

            {/* Assets, Liabilities, Equity */}
            <Grid container spacing={3} sx={{ mb: 3 }}>
              <Grid item xs={12} md={4}>
                <AccountingCard
                  title="Total Assets"
                  value={`৳${accountingStats.assets?.toLocaleString()}`}
                  icon={<Savings />}
                  color={theme.palette.primary.main}
                  subValue={`৳${accountingStats.details.assets?.investments?.toLocaleString()}`}
                  subTitle="In Investments"
                  loading={accountingLoading}
                  onClick={() => handleAccountingCardClick('assets')}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <AccountingCard
                  title="Total Liabilities"
                  value={`৳${accountingStats.liabilities?.toLocaleString()}`}
                  icon={<CreditCard />}
                  color={theme.palette.warning.main}
                  subValue={`৳${accountingStats.breakdown.outstandingTakenLoans?.toLocaleString()}`}
                  subTitle="Outstanding Loans"
                  loading={accountingLoading}
                  onClick={() => handleAccountingCardClick('liabilities')}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <AccountingCard
                  title="Total Equity"
                  value={`৳${accountingStats.equity?.toLocaleString()}`}
                  icon={<AccountCircle />}
                  color={theme.palette.secondary.main}
                  subValue={`৳${accountingStats.details.equity?.capital?.toLocaleString()}`}
                  subTitle="Capital"
                  loading={accountingLoading}
                  onClick={() => handleAccountingCardClick('equity')}
                />
              </Grid>
            </Grid>

            {/* Detailed Breakdown */}
            <Accordion
              sx={{
                mb: 3,
                borderRadius: 3,
                overflow: 'hidden',
                bgcolor: 'rgba(255, 255, 255, 0.8)',
                backdropFilter: 'blur(10px)',
              }}
            >
              <AccordionSummary expandIcon={<ExpandMore />}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Receipt sx={{ mr: 1.5, color: "primary.main" }} />
                  <Typography variant="h6">Detailed Financial Breakdown</Typography>
                </Box>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <Typography variant="subtitle1" sx={{ mb: 2, display: "flex", alignItems: "center" }}>
                      <AttachMoney sx={{ mr: 1, color: "success.main" }} /> Income Details
                    </Typography>
                    <TableContainer>
                      <Table size="small">
                        <TableBody>
                          <TableRow>
                            <TableCell>Total Admission Fees</TableCell>
                            <TableCell align="right">৳{accountingStats.breakdown.totalAdmissionFee?.toLocaleString()}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>Other Income</TableCell>
                            <TableCell align="right">৳{(accountingStats.totalIncome - accountingStats.breakdown.totalAdmissionFee)?.toLocaleString()}</TableCell>
                          </TableRow>
                          <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell><strong>Total Income</strong></TableCell>
                            <TableCell align="right"><strong>৳{accountingStats.totalIncome?.toLocaleString()}</strong></TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Typography variant="subtitle1" sx={{ mb: 2, display: "flex", alignItems: "center" }}>
                      <MoneyOff sx={{ mr: 1, color: "error.main" }} /> Expense Details
                    </Typography>
                    <TableContainer>
                      <Table size="small">
                        <TableBody>
                          <TableRow>
                            <TableCell>Salaries</TableCell>
                            <TableCell align="right">৳{accountingStats.breakdown.totalSalary?.toLocaleString()}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>Other Expenses</TableCell>
                            <TableCell align="right">৳{(accountingStats.totalExpense - accountingStats.breakdown.totalSalary)?.toLocaleString()}</TableCell>
                          </TableRow>
                          <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell><strong>Total Expenses</strong></TableCell>
                            <TableCell align="right"><strong>৳{accountingStats.totalExpense?.toLocaleString()}</strong></TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Typography variant="subtitle1" sx={{ mb: 2, display: "flex", alignItems: "center" }}>
                      <AccountTree sx={{ mr: 1, color: "primary.main" }} /> Assets Breakdown
                    </Typography>
                    <TableContainer>
                      <Table size="small">
                        <TableBody>
                          <TableRow>
                            <TableCell>Cash</TableCell>
                            <TableCell align="right">৳{accountingStats.details.assets?.cash?.toLocaleString()}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>Accounts Receivable</TableCell>
                            <TableCell align="right">৳{accountingStats.details.assets?.accountsReceivable?.toLocaleString()}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>Investments</TableCell>
                            <TableCell align="right">৳{accountingStats.details.assets?.investments?.toLocaleString()}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>Fixed Assets</TableCell>
                            <TableCell align="right">৳{accountingStats.details.assets?.fixedAssets?.toLocaleString()}</TableCell>
                          </TableRow>
                          <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell><strong>Total Assets</strong></TableCell>
                            <TableCell align="right"><strong>৳{accountingStats.assets?.toLocaleString()}</strong></TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Typography variant="subtitle1" sx={{ mb: 2, display: "flex", alignItems: "center" }}>
                      <Balance sx={{ mr: 1, color: "warning.main" }} /> Liabilities & Equity
                    </Typography>
                    <TableContainer>
                      <Table size="small">
                        <TableBody>
                          <TableRow>
                            <TableCell>Accounts Payable</TableCell>
                            <TableCell align="right">৳{accountingStats.details.liabilities?.accountsPayable?.toLocaleString()}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>Loans</TableCell>
                            <TableCell align="right">৳{accountingStats.details.liabilities?.loans?.toLocaleString()}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>Other Liabilities</TableCell>
                            <TableCell align="right">৳{accountingStats.details.liabilities?.otherLiabilities?.toLocaleString()}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell colSpan={2} sx={{ py: 1 }}></TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>Capital</TableCell>
                            <TableCell align="right">৳{accountingStats.details.equity?.capital?.toLocaleString()}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>Retained Earnings</TableCell>
                            <TableCell align="right">৳{accountingStats.details.equity?.retainedEarnings?.toLocaleString()}</TableCell>
                          </TableRow>
                          <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell><strong>Total Liabilities & Equity</strong></TableCell>
                            <TableCell align="right"><strong>৳{(accountingStats.liabilities + accountingStats.equity)?.toLocaleString()}</strong></TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Grid>
                </Grid>
              </AccordionDetails>
            </Accordion>
          </Box>
        )}

        {/* Other tabs content would go here */}

        {/* Modules Grid */}
        <Box sx={{ mb: 2 }}>
          <GradientTypography variant="h4" sx={{ mb: 3, display: 'flex', alignItems: 'center' }}>
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
                  path={module.path}
                  onClick={() => navigateToModule(module.path)}
                  loading={isLoading}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>

      {/* Accounting Detail Dialog */}
      <Dialog
        open={accountingDialogOpen}
        onClose={handleAccountingDialogClose}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 4,
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(12px)',
          }
        }}
      >
        <DialogTitle sx={{
          borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <Typography variant="h5" component="div" sx={{ fontWeight: 700 }}>
            {selectedAccountingCard === 'income' && 'Income Details'}
            {selectedAccountingCard === 'expenses' && 'Expenses Details'}
            {selectedAccountingCard === 'profit' && 'Profit Analysis'}
            {selectedAccountingCard === 'assets' && 'Assets Breakdown'}
            {selectedAccountingCard === 'liabilities' && 'Liabilities Breakdown'}
            {selectedAccountingCard === 'equity' && 'Equity Breakdown'}
          </Typography>
          <IconButton onClick={handleAccountingDialogClose}>
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ py: 3 }}>
          {selectedAccountingCard && (
            <Typography>
              Detailed view for {selectedAccountingCard} would appear here with charts, tables, and detailed analysis.
            </Typography>
          )}
        </DialogContent>
        <DialogActions sx={{ borderTop: `1px solid ${alpha(theme.palette.divider, 0.1)}`, py: 2, px: 3 }}>
          <Button onClick={handleAccountingDialogClose}>Close</Button>
          <Button variant="contained" startIcon={<Download />}>
            Export Report
          </Button>
        </DialogActions>
      </Dialog>


    </Box>
  )
}

export default DashboardHome