import {
  Dashboard,
  School,
  Payments,
  AccountBalance,
  Assignment,
  EventNote,
  AssignmentTurnedIn,
  Grading,
  SupervisorAccount,

  Settings,
  Class,
  Subject,
  BarChart,
  CloudUpload,
  Category,

  ReceiptLong,
  Score,
  TableChart,

  Download,

  Event,
  TableRows,
  Message,
  Addchart,
  RestaurantMenu,
  ListAlt,
  AddCircle,
  ClassOutlined,
  Storage,
  Book,
  NotificationAdd,
  DeveloperBoard,

  TrendingUp,
  TrendingDown,
  AccountTree,
  AccountBalanceWallet,
  Savings,
  CreditCard,
  Calculate,
  Receipt as ReceiptIcon,
  PointOfSale,
  Money,
  AttachMoney,
  MenuBook,
  Groups,
  Schedule,
  Campaign,
  Feedback,
  CoPresent,
  Quiz,
  EmojiEvents,
  School as SchoolIcon,
  AppRegistration,
  Security,
  ManageAccounts,
  PersonAdd,
  FormatListBulleted,
} from "@mui/icons-material";
import { ColorfulIcon } from "./ColorfulIcon";
import { NavigationItem } from "@/types/common";

export const navigationItems: NavigationItem[] = [
  {
    title: "Dashboard",
    icon: (
      <ColorfulIcon color="#4285F4">
        <Dashboard />
      </ColorfulIcon>
    ),
    path: "/dashboard",
    roles: ["admin", "teacher", "student", "super_admin", "class_teacher", 'accountant'],
  },
  {
    title: "Academic",
    icon: (
      <ColorfulIcon color="#0F9D58">
        <SchoolIcon />
      </ColorfulIcon>
    ),
    roles: ["admin", "teacher", "student", "super_admin", "class_teacher"],
    children: [
      {
        title: "Sections",
        icon: (
          <ColorfulIcon color="#0F9D58">
            <ClassOutlined />
          </ColorfulIcon>
        ),
        path: "/dashboard/classes/section/list",
        roles: ["admin", "teacher", "student", "super_admin", "class_teacher"],
      },
      {
        title: "Classes",
        icon: (
          <ColorfulIcon color="#0F9D58">
            <Class />
          </ColorfulIcon>
        ),
        path: "/dashboard/classes/class",
        roles: ["admin", "teacher", "student", "super_admin", "class_teacher"],
      },
      {
        title: "Subjects",
        icon: (
          <ColorfulIcon color="#0F9D58">
            <Subject />
          </ColorfulIcon>
        ),
        path: "/dashboard/subject",
        roles: ["admin", "teacher", "student", "super_admin", "class_teacher"],
      },
      {
        title: "Class Reports",
        icon: (
          <ColorfulIcon color="#0F9D58">
            <BarChart />
          </ColorfulIcon>
        ),
        path: "/dashboard/classes/report/list",
        roles: ["admin", "teacher", "student", "super_admin", "class_teacher"],
      },
      {
        title: "New Report",
        icon: (
          <ColorfulIcon color="#0F9D58">
            <Addchart />
          </ColorfulIcon>
        ),
        path: "/dashboard/classes/report/new",
        roles: ["admin", "teacher", "student", "super_admin", "class_teacher"],
      },
      {
        title: "Class Routine",
        icon: (
          <ColorfulIcon color="#0F9D58">
            <Schedule />
          </ColorfulIcon>
        ),
        path: "/dashboard/class-routine",
        roles: ["admin", "teacher", "student", "super_admin", "class_teacher"],
      },
    ],
  },
  {
    title: "Hifz Program",
    icon: (
      <ColorfulIcon color="#9C27B0">
        <MenuBook />
      </ColorfulIcon>
    ),
    roles: ["admin", "teacher", "student", "super_admin", "class_teacher"],
    children: [
      {
        title: "Hifz Classes",
        icon: (
          <ColorfulIcon color="#9C27B0">
            <ClassOutlined />
          </ColorfulIcon>
        ),
        path: "/dashboard/hifz/class/list",
        roles: ["admin", "teacher", "student", "super_admin", "class_teacher"],
      },
      {
        title: "Class Reports",
        icon: (
          <ColorfulIcon color="#9C27B0">
            <BarChart />
          </ColorfulIcon>
        ),
        path: "/dashboard/hifz/class-report/list",
        roles: ["admin", "teacher", "student", "super_admin", "class_teacher"],
      },
      {
        title: "Hifz Subjects",
        icon: (
          <ColorfulIcon color="#9C27B0">
            <Book />
          </ColorfulIcon>
        ),
        path: "/dashboard/hifz/subject/list",
        roles: ["admin", "teacher", "student", "super_admin", "class_teacher"],
      },
      {
        title: "Hifz Students",
        icon: (
          <ColorfulIcon color="#9C27B0">
            <Groups />
          </ColorfulIcon>
        ),
        path: "/dashboard/student/list",
        roles: ["admin", "teacher", "student", "super_admin", "class_teacher"],
      },
      {
        title: "Hifz Teachers",
        icon: (
          <ColorfulIcon color="#9C27B0">
            <SupervisorAccount />
          </ColorfulIcon>
        ),
        path: "/dashboard/teacher/list",
        roles: ["admin", "teacher", "student", "super_admin", "class_teacher"],
      },
    ],
  },
  {
    title: "People",
    icon: (
      <ColorfulIcon color="#DB4437">
        <Groups />
      </ColorfulIcon>
    ),
    roles: ["admin", "teacher", "student", "super_admin", "class_teacher"],
    children: [
      {
        title: "Teachers",
        icon: (
          <ColorfulIcon color="#FF5722">
            <SupervisorAccount />
          </ColorfulIcon>
        ),
        children: [
          {
            path: "/dashboard/teacher/new",
            title: "Add Teacher",
            icon: (
              <ColorfulIcon color="#FF5722">
                <PersonAdd />
              </ColorfulIcon>
            ),
            roles: ["admin", "teacher", "student", "super_admin", "class_teacher"],
          },
          {
            path: "/dashboard/teacher/list",
            title: "Teachers List",
            icon: (
              <ColorfulIcon color="#FF5722">
                <FormatListBulleted />
              </ColorfulIcon>
            ),
            roles: ["admin", "teacher", "student", "super_admin", "class_teacher"],
          },
          {
            path: "/dashboard/teacher/daily-report/list",
            title: "Daily Reports",
            icon: (
              <ColorfulIcon color="#FF5722">
                <ReceiptLong />
              </ColorfulIcon>
            ),
            roles: ["admin", "teacher", "student", "super_admin", "class_teacher"],
          },
        ],
      },
      {
        title: "Staff",
        icon: (
          <ColorfulIcon color="#7B1FA2">
            <CoPresent />
          </ColorfulIcon>
        ),
        children: [
          {
            path: "/dashboard/staff/add",
            title: "Add Staff",
            icon: (
              <ColorfulIcon color="#7B1FA2">
                <PersonAdd />
              </ColorfulIcon>
            ),
            roles: ["admin", "teacher", "student", "super_admin", "class_teacher"],
          },
          {
            path: "/dashboard/staff/list",
            title: "Staff List",
            icon: (
              <ColorfulIcon color="#7B1FA2">
                <FormatListBulleted />
              </ColorfulIcon>
            ),
            roles: ["admin", "teacher", "student", "super_admin", "class_teacher"],
          },
        ],
      },
      {
        title: "Students",
        icon: (
          <ColorfulIcon color="#1976D2">
            <School />
          </ColorfulIcon>
        ),
        children: [
          {
            path: "/dashboard/student/list",
            title: "Students List",
            icon: (
              <ColorfulIcon color="#1976D2">
                <FormatListBulleted />
              </ColorfulIcon>
            ),
            roles: ["admin", "teacher", "student", "super_admin", "class_teacher"],
          },
        ],
      },
    ],
  },
  {
    title: "Attendance",
    icon: (
      <ColorfulIcon color="#FFA000">
        <EventNote />
      </ColorfulIcon>
    ),
    path: "/dashboard/attendance",
    roles: ["admin", "teacher", "student", "super_admin", "class_teacher"],
  },
  {
    title: "Communications",
    icon: (
      <ColorfulIcon color="#7B1FA2">
        <Campaign />
      </ColorfulIcon>
    ),
    roles: ["admin", "teacher", "student", "super_admin", "class_teacher"],
    children: [
      {
        title: "Notice Board",
        icon: (
          <ColorfulIcon color="#7B1FA2">
            <DeveloperBoard />
          </ColorfulIcon>
        ),
        path: "/dashboard/notice-board",
        roles: ["admin", "teacher", "student", "super_admin", "class_teacher"],
      },
      {
        title: "Notifications",
        icon: (
          <ColorfulIcon color="#7B1FA2">
            <NotificationAdd />
          </ColorfulIcon>
        ),
        path: "/dashboard/notification",
        roles: ["admin", "teacher", "student", "super_admin", "class_teacher"],
      },
      {
        title: "Feedback",
        icon: (
          <ColorfulIcon color="#7B1FA2">
            <Feedback />
          </ColorfulIcon>
        ),
        path: "/dashboard/feedback",
        roles: ["admin", "teacher", "student", "super_admin", "class_teacher"],
      },
    ],
  },
  {
    title: "Meal Management",
    icon: (
      <ColorfulIcon color="#E91E63">
        <RestaurantMenu />
      </ColorfulIcon>
    ),
    roles: ["admin", "teacher", "student", "super_admin", "class_teacher"],
    children: [
      {
        path: "/dashboard/daily-meal-report",
        title: "Meal Reports",
        icon: (
          <ColorfulIcon color="#E91E63">
            <ListAlt />
          </ColorfulIcon>
        ),
        roles: ["admin", "teacher", "student", "super_admin", "class_teacher"],
      },
      {
        path: "/dashboard/daily-meal-report/add",
        title: "Add Meal Report",
        icon: (
          <ColorfulIcon color="#E91E63">
            <AddCircle />
          </ColorfulIcon>
        ),
        roles: ["admin", "teacher", "student", "super_admin", "class_teacher"],
      },
    ],
  },
  {
    title: "Fees Management",
    icon: (
      <ColorfulIcon color="#009688">
        <Payments />
      </ColorfulIcon>
    ),
    roles: ["admin", "teacher", "student", "super_admin", "class_teacher"],
    children: [
      {
        path: "/dashboard/fee-type/list",
        title: "Fee Types",
        icon: (
          <ColorfulIcon color="#009688">
            <Category />
          </ColorfulIcon>
        ),
        roles: ["admin", "teacher", "student", "super_admin", "class_teacher"],
      },
      {
        path: "/dashboard/collect-fee/list",
        title: "Collect Fees",
        icon: (
          <ColorfulIcon color="#009688">
            <PointOfSale />
          </ColorfulIcon>
        ),
        roles: ["admin", "teacher", "student", "super_admin", "class_teacher"],
      },
    ],
  },
  {
    title: "Accounting",
    icon: (
      <ColorfulIcon color="#2E7D32">
        <AccountBalance />
      </ColorfulIcon>
    ),
    roles: ["admin", "super_admin", 'accountant'],
    children: [
      {
        title: "Income",
        icon: (
          <ColorfulIcon color="#2E7D32">
            <TrendingUp />
          </ColorfulIcon>
        ),
        children: [
          {
            path: "/dashboard/accounting/income",
            title: "Income Records",
            icon: (
              <ColorfulIcon color="#2E7D32">
                <AccountBalanceWallet />
              </ColorfulIcon>
            ),
            roles: ["admin", "super_admin"],
          },
          {
            path: "/dashboard/accounting/income/category",
            title: "Income Categories",
            icon: (
              <ColorfulIcon color="#2E7D32">
                <Category />
              </ColorfulIcon>
            ),
            roles: ["admin", "super_admin"],
          },
        ],
      },
      {
        title: "Expenses",
        icon: (
          <ColorfulIcon color="#D32F2F">
            <TrendingDown />
          </ColorfulIcon>
        ),
        children: [
          {
            path: "/dashboard/accounting/expense",
            title: "Expense Records",
            icon: (
              <ColorfulIcon color="#D32F2F">
                <ReceiptIcon />
              </ColorfulIcon>
            ),
            roles: ["admin", "super_admin"],
          },
          {
            path: "/dashboard/accounting/expense/category",
            title: "Expense Categories",
            icon: (
              <ColorfulIcon color="#D32F2F">
                <Category />
              </ColorfulIcon>
            ),
            roles: ["admin", "super_admin"],
          },
        ],
      },
      {
        path: "/dashboard/accounting/total-expense-category",
        title: "Income & Expense Summary",
        icon: (
          <ColorfulIcon color="#ED6C02">
            <AccountTree />
          </ColorfulIcon>
        ),
        roles: ["admin", "super_admin"],
      },
      {
        path: "/dashboard/accounting/investments",
        title: "Investments",
        icon: (
          <ColorfulIcon color="#0288D1">
            <Savings />
          </ColorfulIcon>
        ),
        roles: ["admin", "super_admin"],
      },
      {
        path: "/dashboard/accounting/loan",
        title: "Loans",
        icon: (
          <ColorfulIcon color="#9C27B0">
            <CreditCard />
          </ColorfulIcon>
        ),
        roles: ["admin", "super_admin"],
      },
      {
        path: "/dashboard/accounting/salary",
        title: "Salary Management",
        icon: (
          <ColorfulIcon color="#1565C0">
            <AttachMoney />
          </ColorfulIcon>
        ),
        roles: ["admin", "super_admin"],
      },
      {
        path: "/dashboard/accounting/student-dues",
        title: "Student Dues",
        icon: (
          <ColorfulIcon color="#C2185B">
            <Money />
          </ColorfulIcon>
        ),
        roles: ["admin", "super_admin"],
      },
      {
        path: "/dashboard/accounting/fee-collection",
        title: "Fee Collections",
        icon: (
          <ColorfulIcon color="#00796B">
            <Calculate />
          </ColorfulIcon>
        ),
        roles: ["admin", "super_admin"],
      },
    ],
  },
  {
    title: "Homework",
    icon: (
      <ColorfulIcon color="#FF9800">
        <Assignment />
      </ColorfulIcon>
    ),
    path: "/dashboard/home-work",
    roles: ["admin", "teacher", "student", "super_admin", "class_teacher"],
  },
  {
    title: "Examinations",
    icon: (
      <ColorfulIcon color="#673AB7">
        <AssignmentTurnedIn />
      </ColorfulIcon>
    ),
    roles: ["admin", "teacher", "student", "super_admin", "class_teacher"],
    children: [
      {
        path: "/dashboard/grading/list",
        title: "Grading Systems",
        icon: (
          <ColorfulIcon color="#673AB7">
            <Grading />
          </ColorfulIcon>
        ),
        roles: ["admin", "teacher", "student", "super_admin", "class_teacher"],
      },
      {
        path: "/dashboard/exam/exam-categories",
        title: "Exam Categories",
        icon: (
          <ColorfulIcon color="#673AB7">
            <Category />
          </ColorfulIcon>
        ),
        roles: ["admin", "teacher", "student", "super_admin", "class_teacher"],
      },
      {
        path: "/dashboard/exams",
        title: "Exams",
        icon: (
          <ColorfulIcon color="#673AB7">
            <Quiz />
          </ColorfulIcon>
        ),
        roles: ["admin", "teacher", "student", "super_admin", "class_teacher"],
      },
      {
        path: "/dashboard/exam-routines",
        title: "Exam Routines",
        icon: (
          <ColorfulIcon color="#673AB7">
            <Event />
          </ColorfulIcon>
        ),
        roles: ["admin", "teacher", "student", "super_admin", "class_teacher"],
      },
    ],
  },
  {
    title: "Results",
    icon: (
      <ColorfulIcon color="#0097A7">
        <EmojiEvents />
      </ColorfulIcon>
    ),
    roles: ["admin", "teacher", "student", "super_admin", "class_teacher"],
    children: [
      {
        path: "/dashboard/results",
        title: "View Results",
        icon: (
          <ColorfulIcon color="#0097A7">
            <Score />
          </ColorfulIcon>
        ),
        roles: ["admin", "teacher", "student", "super_admin", "class_teacher"],
      },
      {
        path: "/dashboard/combined-results",
        title: "Combined Results",
        icon: (
          <ColorfulIcon color="#0097A7">
            <TableRows />
          </ColorfulIcon>
        ),
        roles: ["admin", "teacher", "student", "super_admin", "class_teacher"],
      },
      {
        path: "/dashboard/upload-results",
        title: "Upload Results",
        icon: (
          <ColorfulIcon color="#0097A7">
            <CloudUpload />
          </ColorfulIcon>
        ),
        roles: ["admin", "teacher", "student", "super_admin", "class_teacher"],
      },
      {
        path: "/dashboard/subject-marks",
        title: "Subject Marks",
        icon: (
          <ColorfulIcon color="#0097A7">
            <Subject />
          </ColorfulIcon>
        ),
        roles: ["admin", "teacher", "student", "super_admin", "class_teacher"],
      },
      {
        path: "/dashboard/excel-marks",
        title: "Excel Marks",
        icon: (
          <ColorfulIcon color="#0097A7">
            <TableChart />
          </ColorfulIcon>
        ),
        roles: ["admin", "teacher", "student", "super_admin", "class_teacher"],
      },
      {
        path: "/dashboard/download-marksheet",
        title: "Download Marksheet",
        icon: (
          <ColorfulIcon color="#0097A7">
            <Download />
          </ColorfulIcon>
        ),
        roles: ["admin", "teacher", "student", "super_admin", "class_teacher"],
      },
      {
        path: "/dashboard/send-sms",
        title: "Send Result SMS",
        icon: (
          <ColorfulIcon color="#0097A7">
            <Message />
          </ColorfulIcon>
        ),
        roles: ["admin", "teacher", "student", "super_admin", "class_teacher"],
      },
    ],
  },
  {
    title: "Admissions",
    icon: (
      <ColorfulIcon color="#5D4037">
        <AppRegistration />
      </ColorfulIcon>
    ),
    path: "/dashboard/admission",
    roles: ["admin", "teacher", "student", "super_admin", "class_teacher"],
  },
  {
    title: "User Management",
    icon: (
      <ColorfulIcon color="#546E7A">
        <ManageAccounts />
      </ColorfulIcon>
    ),
    path: "/dashboard/user-management",
    roles: ["admin", "super_admin"],
  },
  {
    title: "System",
    icon: (
      <ColorfulIcon color="#37474F">
        <Settings />
      </ColorfulIcon>
    ),
    roles: ["admin", "super_admin"],
    children: [
      {
        title: "Database",
        icon: (
          <ColorfulIcon color="#37474F">
            <Storage />
          </ColorfulIcon>
        ),
        path: "/dashboard/database-backup",
        roles: ["admin", "super_admin"],
      },
      {
        title: "Security",
        icon: (
          <ColorfulIcon color="#37474F">
            <Security />
          </ColorfulIcon>
        ),
        path: "/dashboard/security",
        roles: ["admin", "super_admin"],
      },
    ],
  },
];