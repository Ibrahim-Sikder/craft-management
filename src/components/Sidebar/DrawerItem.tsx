import { NavigationItem } from "@/types/common";
import {
  AccountBalanceWallet,
  AccountTree,
  AddCircle,
  AdminPanelSettings,
  Analytics,
  Assessment,
  AttachMoney,
  AutoDelete,
  AutoStories,
  Badge, 
  Calculate,
  CalendarMonth,
  Campaign,
  Category,
  CheckCircle,
  Class,
  ClassOutlined,
  CloudSync,
  CollectionsBookmark,
  CreditCard,
  Dashboard,
  Description,
  DeveloperBoard,
  DoneAllSharp,
  EditNote,
  Feedback,
  FormatListBulleted,
  Group,
  HowToReg,
  ImportContacts,
  LibraryAdd,
  LibraryBooks,
  ListAlt,
  NotificationAdd,
  Payment,
  PendingActions,
  PeopleAlt,
  PersonAdd,
  PlaylistAddCheck,
  PostAdd,
  Receipt,
  ReceiptLong,
  Restaurant,
  Restore,
  Savings,
  School as SchoolIcon,
  SchoolOutlined,
  Settings,
  Storage,
  Subject,
  TrackChanges,
  TrendingDown,
  TrendingUp,
  ViewList,
  VpnKey,
  Web,
} from "@mui/icons-material";
import { ColorfulIcon } from "./ColorfulIcon";

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

  {
    title: "Website",
    icon: (
      <ColorfulIcon color="#2a52be">
        <Web />
      </ColorfulIcon>
    ),
    roles: ["admin", "super_admin"],
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

  {
    title: "Admissions",
    icon: (
      <ColorfulIcon color="#5D4037">
        <EditNote />
      </ColorfulIcon>
    ),
    roles: ["admin", "super_admin", "teacher"],
    children: [
      {
        title: "All Enrollments",
        icon: (
          <ColorfulIcon color="#5D4037">
            <HowToReg />
          </ColorfulIcon>
        ),
        path: "/dashboard/enrollments/list",
        roles: ["admin", "super_admin"],
      },
      {
        title: "Pending Applications",
        icon: (
          <ColorfulIcon color="#5D4037">
            <PendingActions />
          </ColorfulIcon>
        ),
        path: "/dashboard/online-application/pending",
        roles: ["admin", "super_admin"],
      },
      {
        title: "Approved Applications",
        icon: (
          <ColorfulIcon color="#5D4037">
            <CheckCircle />
          </ColorfulIcon>
        ),
        path: "/dashboard/online-application/approved",
        roles: ["admin", "super_admin"],
      },
      {
        title: "Enrolled Applications",
        icon: (
          <ColorfulIcon color="#5D4037">
            <HowToReg />
          </ColorfulIcon>
        ),
        path: "/dashboard/online-application/enrolled",
        roles: ["admin", "super_admin"],
      },
      {
        title: "Rejected Applications",
        icon: (
          <ColorfulIcon color="#5D4037">
            <Restore />
          </ColorfulIcon>
        ),
        path: "/dashboard/online-application/rejected",
        roles: ["admin", "super_admin"],
      },
    ],
  },
  // Keep individual items for backward compatibility or specific access
  {
    title: "All Enrollments",
    icon: (
      <ColorfulIcon color="#5D4037">
        <HowToReg />
      </ColorfulIcon>
    ),
    path: "/dashboard/enrollments/list",
    roles: ["admin", "super_admin", "teacher"],
  },
  {
    title: "Pending Admissions",
    icon: (
      <ColorfulIcon color="#5D4037">
        <PendingActions />
      </ColorfulIcon>
    ),
    path: "/dashboard/online-application/pending",
    roles: ["admin", "super_admin", "teacher"],
  },
  {
    title: "Approved Admissions",
    icon: (
      <ColorfulIcon color="#5D4037">
        <CheckCircle />
      </ColorfulIcon>
    ),
    path: "/dashboard/online-application/approved",
    roles: ["admin", "super_admin", "teacher"],
  },
  {
    title: "Enrolled Applications",
    icon: (
      <ColorfulIcon color="#5D4037">
        <HowToReg />
      </ColorfulIcon>
    ),
    path: "/dashboard/online-application/enrolled",
    roles: ["admin", "super_admin", "teacher"],
  },
  {
    title: "Rejected Admissions",
    icon: (
      <ColorfulIcon color="#5D4037">
        <Restore />
      </ColorfulIcon>
    ),
    path: "/dashboard/online-application/rejected",
    roles: ["admin", "super_admin", "teacher"],
  },
  {
    title: "Discount Student",
    icon: (
      <ColorfulIcon color="#5D4037">
        <Savings />
      </ColorfulIcon>
    ),
    path: "/dashboard/student/discount",
    roles: ["admin", "super_admin", "teacher"],
  },
  {
    title: "Academic",
    icon: (
      <ColorfulIcon color="#0F9D58">
        <SchoolIcon />
      </ColorfulIcon>
    ),
    roles: ["admin", "super_admin", "teacher"],
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
    roles: ["admin", "super_admin", "teacher"],
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
            <Description />
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
            <Description />
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
    roles: ["admin", "super_admin", "teacher"],
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
    roles: ["admin", "super_admin", "teacher"],
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
    roles: ["admin", "super_admin", "teacher"],
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
    roles: ["admin", "super_admin", "teacher"],
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

  {
    title: "Communications",
    icon: (
      <ColorfulIcon color="#7B1FA2">
        <Campaign />
      </ColorfulIcon>
    ),
    roles: ["admin", "super_admin"],
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
    roles: ["admin", "super_admin"],
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
    roles: ["admin", "super_admin"],
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
            <Payment />
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
        path: "/dashboard/accounting/fees",
        title: "Student Fees ",
        icon: (
          <ColorfulIcon color="#2E7D32">
            <Category />
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
    title: "User Management",
    icon: (
      <ColorfulIcon color="#546E7A">
        <AdminPanelSettings />
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
