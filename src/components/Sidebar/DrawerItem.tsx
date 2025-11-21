import {
  Dashboard,
  Assignment,
  EventNote,
  Grading,
  Settings,
  Class,
  Subject,
  CloudUpload,
  Category,
  ReceiptLong,
  Score,
  TableChart,
  TableRows,
  ListAlt,
  AddCircle,
  ClassOutlined,
  Storage,
  NotificationAdd,
  DeveloperBoard,
  TrendingUp,
  TrendingDown,
  AccountTree,
  AccountBalanceWallet,
  Savings,
  CreditCard,
  Calculate,
  AttachMoney,
  Campaign,
  Feedback,
  Quiz,
  EmojiEvents,
  School as SchoolIcon,
  PersonAdd,
  FormatListBulleted,
  Web,
  PlaylistAddCheck,
  TrackChanges,
  ImportContacts,
  LibraryBooks,
  CalendarMonth,
  DateRange,
  ViewList,
  PostAdd,
  LibraryAdd,
  Group,
  Restaurant,
  Payment,
  RequestQuote,
  Receipt,
  AdminPanelSettings,
  AutoDelete,
  CloudSync,
  Description,
  Analytics,
  Assessment,
  FactCheck,
  SchoolOutlined,
  PeopleAlt,
  Badge,
  AutoStories,
  CollectionsBookmark,
  PictureAsPdf,
  Sms,
  VpnKey,
  DoneAllSharp,
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
    roles: [
      "admin",
      "teacher",
      "student",
      "super_admin",
      "class_teacher",
      "accountant",
    ],
  },
  // Website
  {
    title: "Website",
    icon: (
      <ColorfulIcon color="#2a52be">
        <Web />
      </ColorfulIcon>
    ),
    roles: ["admin", "teacher", "student", "super_admin", "class_teacher"],
    children: [
      {
        title: "Sections",
        icon: (
          <ColorfulIcon color="#2a52be">
            <ViewList />
          </ColorfulIcon>
        ),
        path: "/dashboard/classes/section/list",
        roles: ["admin", "teacher", "student", "super_admin", "class_teacher"],
      },
      {
        title: "Classes",
        icon: (
          <ColorfulIcon color="#2a52be">
            <Class />
          </ColorfulIcon>
        ),
        path: "/dashboard/classes/class",
        roles: ["admin", "teacher", "student", "super_admin", "class_teacher"],
      },
      {
        title: "Subjects",
        icon: (
          <ColorfulIcon color="#2a52be">
            <Subject />
          </ColorfulIcon>
        ),
        path: "/dashboard/subject",
        roles: ["admin", "teacher", "student", "super_admin", "class_teacher"],
      },
      {
        title: "Class Reports",
        icon: (
          <ColorfulIcon color="#2a52be">
            <Analytics />
          </ColorfulIcon>
        ),
        path: "/dashboard/classes/report/list",
        roles: ["admin", "teacher", "student", "super_admin", "class_teacher"],
      },
      {
        title: "New Report",
        icon: (
          <ColorfulIcon color="#2a52be">
            <PostAdd />
          </ColorfulIcon>
        ),
        path: "/dashboard/classes/report/new",
        roles: ["admin", "teacher", "student", "super_admin", "class_teacher"],
      },
      {
        title: "Class Routine",
        icon: (
          <ColorfulIcon color="#2a52be">
            <CalendarMonth />
          </ColorfulIcon>
        ),
        path: "/dashboard/class-routine",
        roles: ["admin", "teacher", "student", "super_admin", "class_teacher"],
      },
    ],
  },
  // Academic
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
            <ViewList />
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
            <Analytics />
          </ColorfulIcon>
        ),
        path: "/dashboard/classes/report/list",
        roles: ["admin", "teacher", "student", "super_admin", "class_teacher"],
      },
      {
        title: "New Report",
        icon: (
          <ColorfulIcon color="#0F9D58">
            <PostAdd />
          </ColorfulIcon>
        ),
        path: "/dashboard/classes/report/new",
        roles: ["admin", "teacher", "student", "super_admin", "class_teacher"],
      },
      {
        title: "Class Routine",
        icon: (
          <ColorfulIcon color="#0F9D58">
            <CalendarMonth />
          </ColorfulIcon>
        ),
        path: "/dashboard/class-routine",
        roles: ["admin", "teacher", "student", "super_admin", "class_teacher"],
      },
    ],
  },
  // Hifz Program
  {
    title: "Hifz Program",
    icon: (
      <ColorfulIcon color="#9C27B0">
        <AutoStories />
      </ColorfulIcon>
    ),
    roles: ["admin", "teacher", "student", "super_admin", "class_teacher"],
    children: [
      {
        title: "Classes",
        icon: (
          <ColorfulIcon color="#9C27B0">
            <ClassOutlined />
          </ColorfulIcon>
        ),
        path: "/dashboard/hifz/class/list",
        roles: ["admin", "teacher", "student", "super_admin", "class_teacher"],
      },
      {
        title: "Hifz Subjects",
        icon: (
          <ColorfulIcon color="#9C27B0">
            <LibraryBooks />
          </ColorfulIcon>
        ),
        path: "/dashboard/hifz/subject/list",
        roles: ["admin", "teacher", "student", "super_admin", "class_teacher"],
      },

      {
        title: "Soboki Daily Report Add",
        icon: (
          <ColorfulIcon color="#9C27B0">
            <PostAdd />
          </ColorfulIcon>
        ),
        path: "/dashboard/hifz/daily-report/soboki/add",
        roles: ["admin", "teacher", "student", "super_admin", "class_teacher"],
      },
      {
        title: "Soboki Daily Report List",
        icon: (
          <ColorfulIcon color="#9C27B0">
            <PostAdd />
          </ColorfulIcon>
        ),
        path: "/dashboard/hifz/daily-report/soboki/list",
        roles: ["admin", "teacher", "student", "super_admin", "class_teacher"],
      },
      {
        title: "Sunani Daily Report Add",
        icon: (
          <ColorfulIcon color="#9C27B0">
            <PostAdd />
          </ColorfulIcon>
        ),
        path: "/dashboard/hifz/daily-report/sunani/add",
        roles: ["admin", "teacher", "student", "super_admin", "class_teacher"],
      },
      {
        title: "Sunani Daily Report List",
        icon: (
          <ColorfulIcon color="#9C27B0">
            <PostAdd />
          </ColorfulIcon>
        ),
        path: "/dashboard/hifz/daily-report/sunani/list",
        roles: ["admin", "teacher", "student", "super_admin", "class_teacher"],
      },

      {
        title: "Weekly Target List",
        icon: (
          <ColorfulIcon color="#9C27B0">
            <TrackChanges />
          </ColorfulIcon>
        ),
        path: "/dashboard/hifz/weeklytarget/list",
        roles: ["admin", "teacher", "student", "super_admin", "class_teacher"],
      },
      {
        title: "Weekly Target Add",
        icon: (
          <ColorfulIcon color="#9C27B0">
            <PlaylistAddCheck />
          </ColorfulIcon>
        ),
        path: "/dashboard/hifz/weeklytarget/add",
        roles: ["admin", "teacher", "student", "super_admin", "class_teacher"],
      },
    ],
  },
  {
    title: "Ampara",
    icon: (
      <ColorfulIcon color="#2E7D32">
        <ImportContacts />
      </ColorfulIcon>
    ),
    roles: ["admin", "teacher", "student", "super_admin", "class_teacher"],
    children: [
      {
        title: "Daily Report List",
        icon: (
          <ColorfulIcon color="#2E7D32">
            <Description />
          </ColorfulIcon>
        ),
        path: "/dashboard/ampara/daily-report/list",
        roles: ["admin", "teacher", "student", "super_admin", "class_teacher"],
      },
      {
        title: "Daily Report Add",
        icon: (
          <ColorfulIcon color="#2E7D32">
            <PostAdd />
          </ColorfulIcon>
        ),
        path: "/dashboard/ampara/daily-report/add",
        roles: ["admin", "teacher", "student", "super_admin", "class_teacher"],
      },
      {
        title: "Weekly Report List",
        icon: (
          <ColorfulIcon color="#2E7D32">
            <Assessment />
          </ColorfulIcon>
        ),
        path: "/dashboard/ampara/weekly-report/list",
        roles: ["admin", "teacher", "student", "super_admin", "class_teacher"],
      },
      {
        title: "Weekly Report Add",
        icon: (
          <ColorfulIcon color="#2E7D32">
            <LibraryAdd />
          </ColorfulIcon>
        ),
        path: "/dashboard/ampara/weekly-report/add",
        roles: ["admin", "teacher", "student", "super_admin", "class_teacher"],
      },
    ],
  },
  {
    title: "Nazera",
    icon: (
      <ColorfulIcon color="#FF6B35">
        <ImportContacts />
      </ColorfulIcon>
    ),
    roles: ["admin", "teacher", "student", "super_admin", "class_teacher"],
    children: [
      {
        title: "Daily Report List",
        icon: (
          <ColorfulIcon color="#FF6B35">
            <Description />
          </ColorfulIcon>
        ),
        path: "/dashboard/nazera/daily-report/list",
        roles: ["admin", "teacher", "student", "super_admin", "class_teacher"],
      },
      {
        title: "Daily Report Add",
        icon: (
          <ColorfulIcon color="#FF6B35">
            <PostAdd />
          </ColorfulIcon>
        ),
        path: "/dashboard/nazera/daily-report/add",
        roles: ["admin", "teacher", "student", "super_admin", "class_teacher"],
      },
      {
        title: "Weekly Report List",
        icon: (
          <ColorfulIcon color="#FF6B35">
            <Assessment />
          </ColorfulIcon>
        ),
        path: "/dashboard/nazera/weekly-report/list",
        roles: ["admin", "teacher", "student", "super_admin", "class_teacher"],
      },
      {
        title: "Weekly Report Add",
        icon: (
          <ColorfulIcon color="#FF6B35">
            <LibraryAdd />
          </ColorfulIcon>
        ),
        path: "/dashboard/nazera/weekly-report/add",
        roles: ["admin", "teacher", "student", "super_admin", "class_teacher"],
      },
    ],
  },
  {
    title: "Qaida",
    icon: (
      <ColorfulIcon color="#00ACC1">
        <CollectionsBookmark />
      </ColorfulIcon>
    ),
    roles: ["admin", "teacher", "student", "super_admin", "class_teacher"],
    children: [
      {
        title: "Daily Report List",
        icon: (
          <ColorfulIcon color="#00ACC1">
            <Description />
          </ColorfulIcon>
        ),
        path: "/dashboard/qaida-noorani/daily-report/list",
        roles: ["admin", "teacher", "student", "super_admin", "class_teacher"],
      },
      {
        title: "Daily Report Add",
        icon: (
          <ColorfulIcon color="#00ACC1">
            <PostAdd />
          </ColorfulIcon>
        ),
        path: "/dashboard/qaida-noorani/daily-report/add",
        roles: ["admin", "teacher", "student", "super_admin", "class_teacher"],
      },
      {
        title: "Weekly Report Add",
        icon: (
          <ColorfulIcon color="#00ACC1">
            <PlaylistAddCheck />
          </ColorfulIcon>
        ),
        path: "/dashboard/qaida-noorani/weekly-report/add",
        roles: ["admin", "teacher", "student", "super_admin", "class_teacher"],
      },
      {
        title: "Weekly Report List",
        icon: (
          <ColorfulIcon color="#00ACC1">
            <TrackChanges />
          </ColorfulIcon>
        ),
        path: "/dashboard/qaida-noorani/weekly-report/list",
        roles: ["admin", "teacher", "student", "super_admin", "class_teacher"],
      },
    ],
  },
  // People
  {
    title: "People",
    icon: (
      <ColorfulIcon color="#DB4437">
        <Group />
      </ColorfulIcon>
    ),
    roles: ["admin", "teacher", "student", "super_admin", "class_teacher"],
    children: [
      {
        title: "Teachers",
        icon: (
          <ColorfulIcon color="#FF5722">
            <SchoolOutlined />
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
            roles: [
              "admin",
              "teacher",
              "student",
              "super_admin",
              "class_teacher",
            ],
          },
          {
            path: "/dashboard/teacher/list",
            title: "Teachers List",
            icon: (
              <ColorfulIcon color="#FF5722">
                <FormatListBulleted />
              </ColorfulIcon>
            ),
            roles: [
              "admin",
              "teacher",
              "student",
              "super_admin",
              "class_teacher",
            ],
          },
          {
            path: "/dashboard/teacher/daily-report/list",
            title: "Daily Reports",
            icon: (
              <ColorfulIcon color="#FF5722">
                <ReceiptLong />
              </ColorfulIcon>
            ),
            roles: [
              "admin",
              "teacher",
              "student",
              "super_admin",
              "class_teacher",
            ],
          },
        ],
      },
      {
        title: "Staff",
        icon: (
          <ColorfulIcon color="#7B1FA2">
            <Badge />
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
            roles: [
              "admin",
              "teacher",
              "student",
              "super_admin",
              "class_teacher",
            ],
          },
          {
            path: "/dashboard/staff/list",
            title: "Staff List",
            icon: (
              <ColorfulIcon color="#7B1FA2">
                <FormatListBulleted />
              </ColorfulIcon>
            ),
            roles: [
              "admin",
              "teacher",
              "student",
              "super_admin",
              "class_teacher",
            ],
          },
        ],
      },
      {
        title: "Students",
        icon: (
          <ColorfulIcon color="#1976D2">
            <PeopleAlt />
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
            roles: [
              "admin",
              "teacher",
              "student",
              "super_admin",
              "class_teacher",
            ],
          },
        ],
      },
    ],
  },
  // Attendance
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
  // Communications
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
  // Meal Management
  {
    title: "Meal Management",
    icon: (
      <ColorfulIcon color="#E91E63">
        <Restaurant />
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
  // Fees Management
  {
    title: "Fees Management",
    icon: (
      <ColorfulIcon color="#009688">
        <Payment />
      </ColorfulIcon>
    ),
    roles: ["admin", "teacher", "student", "super_admin", "class_teacher"],
    children: [
      {
        path: "/dashboard/fees/list",
        title: "All Fee",
        icon: (
          <ColorfulIcon color="#009688">
            <Category />
          </ColorfulIcon>
        ),
        roles: ["admin", "teacher", "student", "super_admin", "class_teacher"],
      },
      {
        path: "/dashboard/fees/category",
        title: "Fee Category",
        icon: (
          <ColorfulIcon color="#009688">
            <Category />
          </ColorfulIcon>
        ),
        roles: ["admin", "teacher", "student", "super_admin", "class_teacher"],
      },
      {
        path: "/dashboard/fees/fee-collection",
        title: "Fee Collection",
        icon: (
          <ColorfulIcon color="#009688">
            <Category />
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
        <DoneAllSharp />
      </ColorfulIcon>
    ),
    roles: ["admin", "super_admin", "accountant"],
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
            path: "/dashboard/accounting/residantial/list",
            title: "Residential ",
            icon: (
              <ColorfulIcon color="#2E7D32">
                <Category />
              </ColorfulIcon>
            ),
            roles: ["admin", "super_admin"],
          },
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
                <Receipt />
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
            <RequestQuote />
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
  // Homework
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
  // Examinations
  {
    title: "Examinations",
    icon: (
      <ColorfulIcon color="#673AB7">
        <FactCheck />
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
            <DateRange />
          </ColorfulIcon>
        ),
        roles: ["admin", "teacher", "student", "super_admin", "class_teacher"],
      },
    ],
  },
  // result
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
            <PictureAsPdf />
          </ColorfulIcon>
        ),
        roles: ["admin", "teacher", "student", "super_admin", "class_teacher"],
      },
      {
        path: "/dashboard/send-sms",
        title: "Send Result SMS",
        icon: (
          <ColorfulIcon color="#0097A7">
            <Sms />
          </ColorfulIcon>
        ),
        roles: ["admin", "teacher", "student", "super_admin", "class_teacher"],
      },
    ],
  },
  // admission
  {
    title: "Admissions",
    icon: (
      <ColorfulIcon color="#5D4037">
        <TableChart />
      </ColorfulIcon>
    ),
    path: "/dashboard/enrollments/list",
    roles: ["admin", "teacher", "student", "super_admin", "class_teacher"],
  },
  // user management
  {
    title: "User Management",
    icon: (
      <ColorfulIcon color="#546E7A">
        <AdminPanelSettings />
      </ColorfulIcon>
    ),
    path: "/dashboard/user-management",
    roles: ["admin", "super_admin"],
  },
  // system
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
            <VpnKey />
          </ColorfulIcon>
        ),
        path: "/dashboard/security",
        roles: ["admin", "super_admin"],
      },
      {
        title: "Trash",
        icon: (
          <ColorfulIcon color="#37474F">
            <AutoDelete />
          </ColorfulIcon>
        ),
        path: "/dashboard/trash",
        roles: ["admin", "super_admin"],
      },
      {
        title: "Backup",
        icon: (
          <ColorfulIcon color="#37474F">
            <CloudSync />
          </ColorfulIcon>
        ),
        path: "/dashboard/backup",
        roles: ["admin", "super_admin"],
      },
    ],
  },
];
