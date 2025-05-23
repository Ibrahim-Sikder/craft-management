
import {
  Dashboard,
  School,
  Person,
  Payments,
  AccountBalance,
  Assignment,
  EventNote,
  AssignmentTurnedIn,
  Grading,
  SupervisorAccount,
  HowToReg,
  PhotoLibrary,
  Settings,
  Class,
  Group,
  Subject,
  BarChart,
  CloudUpload,
  Category,
  Receipt,
  ReceiptLong,
  Score,
  TableChart,
  MonetizationOn,
  HomeWork,
  Download,
  Grade,
  Category as ExamCategory,
  Event,
  TableRows,
  Message,
  People,
  Info,
  AdminPanelSettings,
  Tune,
  Addchart,
  RestaurantMenu,
  ListAlt,
  AddCircle,
  ClassOutlined,
  Storage,
  Folder,
  Image as Photos,
  Logout,
  Book,
} from "@mui/icons-material"
import { ColorfulIcon } from "./ColorfulIcon"
import { NavigationItem } from "@/types/common"
export const navigationItems: NavigationItem[] = [
  {
    title: "Dashboard",
    icon: (
      <ColorfulIcon color="#4285F4">
        <Dashboard />
      </ColorfulIcon>
    ),
    path: "/dashboard",
    roles: ["admin", "teacher", "student", "super_admin", 'class_teacher'],
  },
  {
    title: "Classes",
    icon: (
      <ColorfulIcon color="#0F9D58">
        <School />
      </ColorfulIcon>
    ),
    roles: ["admin", "teacher", "student", "super_admin", 'class_teacher'],
    children: [


      {
        title: "Sections",
        icon: (
          <ColorfulIcon color="#0F9D58">
            <ClassOutlined />
          </ColorfulIcon>
        ),
        path: "/dashboard/super_admin/classes/section/list",
        roles: ["admin", "teacher", "student", "super_admin", 'class_teacher'],
      },
      {
        title: "Class",
        icon: (
          <ColorfulIcon color="#0F9D58">
            <Class />
          </ColorfulIcon>
        ),
        path: "/dashboard/super_admin/classes/class",
        roles: ["admin", "teacher", "student", "super_admin", 'class_teacher'],
      },

      {
        title: "Subject",
        icon: (
          <ColorfulIcon color="#0F9D58">
            <Book />
          </ColorfulIcon>
        ),
        path: "/dashboard/super_admin/subject",
        roles: ["admin", "teacher", "student", "super_admin", 'class_teacher'],
      },

      {
        title: "Class Report List ",
        icon: (
          <ColorfulIcon color="#0F9D58">
            <BarChart />
          </ColorfulIcon>
        ),
        path: "/dashboard/super_admin/classes/report/list",
        roles: ["admin", "teacher", "student", "super_admin", 'class_teacher'],
      },
      {
        title: "New Report ",
        icon: (
          <ColorfulIcon color="#0F9D58">
            <Addchart />
          </ColorfulIcon>
        ),
        path: "/dashboard/super_admin/classes/report/new",
        roles: ["admin", "teacher", "student", "super_admin", 'class_teacher'],
      },
    ],
  },
  {
    title: "Teacher",
    icon: (
      <ColorfulIcon color="#DB4437">
        <SupervisorAccount />
      </ColorfulIcon>
    ),
    roles: ["admin", "teacher", "student", "super_admin", 'class_teacher'],
    children: [
      {
        path: "/dashboard/super_admin/teacher/new",
        title: "Add Teachers",
        icon: (
          <ColorfulIcon color="#DB4437">
            <People />
          </ColorfulIcon>
        ),
        roles: ["admin", "teacher", "student", "super_admin", 'class_teacher'],
      },
      {
        path: "/dashboard/super_admin/teacher/list",
        title: "Teachers List",
        icon: (
          <ColorfulIcon color="#DB4437">
            <People />
          </ColorfulIcon>
        ),
        roles: ["admin", "teacher", "student", "super_admin", 'class_teacher'],
      },
      {
        path: "/dashboard/super_admin/teacher/daily-report/list",
        title: "Daily Class Report",
        icon: (
          <ColorfulIcon color="#DB4437">
            <ReceiptLong />
          </ColorfulIcon>
        ),
        roles: ["admin", "teacher", "student", "super_admin", 'class_teacher'],
      },
      // {
      //   path: "/dashboard/super_admin/teacher/daily-report/add",
      //   title: "Add Daily Class Report",
      //   icon: (
      //     <ColorfulIcon color="#DB4437">
      //       <ReceiptLong />
      //     </ColorfulIcon>
      //   ),
      //   roles: ["admin", "teacher", "student", "super_admin",'class_teacher'],
      // },
    ],
  },
  {
    title: "Staff",
    icon: (
      <ColorfulIcon color="#DB4437">
        <SupervisorAccount />
      </ColorfulIcon>
    ),
    roles: ["admin", "teacher", "student", "super_admin", 'class_teacher'],
    children: [
      {
        path: "/dashboard/super_admin/staff/add",
        title: "Add Staff",
        icon: (
          <ColorfulIcon color="#DB4437">
            <People />
          </ColorfulIcon>
        ),
        roles: ["admin", "teacher", "student", "super_admin", 'class_teacher'],
      },
      {
        path: "/dashboard/super_admin/staff/list",
        title: "Staff List",
        icon: (
          <ColorfulIcon color="#DB4437">
            <ReceiptLong />
          </ColorfulIcon>
        ),
        roles: ["admin", "teacher", "student", "super_admin", 'class_teacher'],
      },
    ],
  },
  {
    title: "Student",
    icon: (
      <ColorfulIcon color="#DB4437">
        <Person />
      </ColorfulIcon>
    ),
    roles: ["admin", "teacher", "student", "super_admin", 'class_teacher'],
    children: [
      {
        path: "/dashboard/super_admin/student/list",
        title: "Students",
        icon: (
          <ColorfulIcon color="#DB4437">
            <Group />
          </ColorfulIcon>
        ),
        roles: ["admin", "teacher", "student", "super_admin", 'class_teacher'],
      },
      // {
      //   path: "/dashboard/super_admin/daily-student-report",
      //   title: "Daily Report ",
      //   icon: (
      //     <ColorfulIcon color="#DB4437">
      //       <ListAlt />
      //     </ColorfulIcon>
      //   ),
      //   roles: ["admin", "teacher", "student", "super_admin",'class_teacher'],
      // },
      // {
      //   path: "/dashboard/super_admin/daily-student-report/add",
      //   title: "Add daily Report ",
      //   icon: (
      //     <ColorfulIcon color="#DB4437">
      //       <PostAdd />
      //     </ColorfulIcon>
      //   ),
      //   roles: ["admin", "teacher", "student", "super_admin",'class_teacher'],
      // },

      // {
      //   path: "/dashboard/super_admin/student-migrate",
      //   title: "Migrate Student",
      //   icon: (
      //     <ColorfulIcon color="#DB4437">
      //       <CompareArrows />
      //     </ColorfulIcon>
      //   ),
      //   roles: ["admin", "teacher", "student", "super_admin",'class_teacher'],
      // },
      // {
      //   path: "/dashboard/super_admin/student-status-migrate",
      //   title: "Migrate Status ",
      //   icon: (
      //     <ColorfulIcon color="#DB4437">
      //       <SwapHoriz />
      //     </ColorfulIcon>
      //   ),
      //   roles: ["admin", "teacher", "student", "super_admin",'class_teacher'],
      // },
      // {
      //   path: "/dashboard/super_admin/shop/list",
      //   title: "Migrate Branch ",
      //   icon: (
      //     <ColorfulIcon color="#DB4437">
      //       <CompareArrows />
      //     </ColorfulIcon>
      //   ),
      //   roles: ["admin", "teacher", "student", "super_admin",'class_teacher'],
      // },
    ],
  },
  {
    title: "Meal Report",
    icon: (
      <ColorfulIcon color="#F4B400">
        <RestaurantMenu />
      </ColorfulIcon>
    ),
    roles: ["admin", "teacher", "student", "super_admin", 'class_teacher'],
    children: [
      {
        path: "/dashboard/super_admin/daily-meal-report",
        title: "Meal Report",
        icon: (
          <ColorfulIcon color="#F4B400">
            <ListAlt />
          </ColorfulIcon>
        ),
        roles: ["admin", "teacher", "student", "super_admin", 'class_teacher'],
      },
      {
        path: "/dashboard/super_admin/daily-meal-report/add",
        title: "Add Meal Report",
        icon: (
          <ColorfulIcon color="#F4B400">
            <AddCircle />
          </ColorfulIcon>
        ),
        roles: ["admin", "teacher", "student", "super_admin", 'class_teacher'],
      },
    ],
  },
  {
    segment: "super_admin/contact",
    title: "Fees",
    icon: (
      <ColorfulIcon color="#F4B400">
        <Payments />
      </ColorfulIcon>
    ),
    roles: ["admin", "teacher", "student", "super_admin", 'class_teacher'],
    children: [

      {
        path: "/dashboard/super_admin/fee-type/list",
        title: "Fees Types ",
        icon: (
          <ColorfulIcon color="#F4B400">
            <Category />
          </ColorfulIcon>
        ),
        roles: ["admin", "teacher", "student", "super_admin", 'class_teacher'],
      },





      {
        path: "/dashboard/super_admin/collect-fee/list",
        title: "Collect Fees ",
        icon: (
          <ColorfulIcon color="#F4B400">
            <Receipt />
          </ColorfulIcon>
        ),
        roles: ["admin", "teacher", "student", "super_admin", 'class_teacher'],
      },



    ],
  },


  {
    title: "Accounting",
    icon: (
      <ColorfulIcon color="#34A853">
        <AccountBalance />
      </ColorfulIcon>
    ),
    roles: ["admin", "teacher", "student", "super_admin", 'class_teacher'],
    children: [
      {
        path: "/dashboard/super_admin/stock/allimg",
        title: "Setup ",
        icon: (
          <ColorfulIcon color="#34A853">
            <Settings />
          </ColorfulIcon>
        ),
        roles: ["admin", "teacher", "student", "super_admin", 'class_teacher'],
      },
      {
        path: "/dashboard/super_admin/stock/folder",
        title: "Income / Expense ",
        icon: (
          <ColorfulIcon color="#34A853">
            <MonetizationOn />
          </ColorfulIcon>
        ),
        roles: ["admin", "teacher", "student", "super_admin", 'class_teacher'],
      },
    ],
  },
  {
    title: "Home Work",
    icon: (
      <ColorfulIcon color="#FBBC05">
        <Assignment />
      </ColorfulIcon>
    ),
    roles: ["admin", "teacher", "student", "super_admin", 'class_teacher'],
    children: [
      {
        path: "/dashboard/super_admin/home-work",
        title: "Home Works ",
        icon: (
          <ColorfulIcon color="#FBBC05">
            <HomeWork />
          </ColorfulIcon>
        ),
        roles: ["admin", "teacher", "student", "super_admin", 'class_teacher'],
      },
    ],
  },

  {
    title: "Attendance",
    icon: (
      <ColorfulIcon color="#4285F4">
        <EventNote />
      </ColorfulIcon>
    ),
    roles: ["admin", "teacher", "student", "super_admin", 'class_teacher'],
    children: [


      {
        path: "/dashboard/super_admin/stock/folder",
        title: "Leave ",
        icon: (
          <ColorfulIcon color="#4285F4">
            <EventNote />
          </ColorfulIcon>
        ),
        roles: ["admin", "teacher", "student", "super_admin", 'class_teacher'],
      },
    ],
  },

  {
    title: "Exam",
    icon: (
      <ColorfulIcon color="#0F9D58">
        <AssignmentTurnedIn />
      </ColorfulIcon>
    ),
    roles: ["admin", "teacher", "student", "super_admin", 'class_teacher'],
    children: [
      {
        path: "/dashboard/super_admin/grading/list",
        title: "Gradings ",
        icon: (
          <ColorfulIcon color="#0F9D58">
            <Grade />
          </ColorfulIcon>
        ),
        roles: ["admin", "teacher", "student", "super_admin", 'class_teacher'],
      },
      {
        path: "/dashboard/super_admin/exam/exam-categories",
        title: "Exam Category ",
        icon: (
          <ColorfulIcon color="#0F9D58">
            <ExamCategory />
          </ColorfulIcon>
        ),
        roles: ["admin", "teacher", "student", "super_admin", 'class_teacher'],
      },

      {
        path: "/dashboard/super_admin/stock/allimg",
        title: "Exams",
        icon: (
          <ColorfulIcon color="#0F9D58">
            <AssignmentTurnedIn />
          </ColorfulIcon>
        ),
        roles: ["admin", "teacher", "student", "super_admin", 'class_teacher'],
      },
      {
        path: "/dashboard/super_admin/stock/allimg",
        title: "Exam Routines ",
        icon: (
          <ColorfulIcon color="#0F9D58">
            <Event />
          </ColorfulIcon>
        ),
        roles: ["admin", "teacher", "student", "super_admin", 'class_teacher'],
      },
    ],
  },
  {
    title: "Result",
    icon: (
      <ColorfulIcon color="#F4B400">
        <Grading />
      </ColorfulIcon>
    ),
    roles: ["admin", "teacher", "student", "super_admin", 'class_teacher'],
    children: [
      {
        path: "/dashboard/super_admin/stock/allimg",
        title: "Result",
        icon: (
          <ColorfulIcon color="#F4B400">
            <Score />
          </ColorfulIcon>
        ),
        roles: ["admin", "teacher", "student", "super_admin", 'class_teacher'],
      },
      {
        path: "/dashboard/super_admin/stock/allimg",
        title: "combined Result ",
        icon: (
          <ColorfulIcon color="#F4B400">
            <TableRows />
          </ColorfulIcon>
        ),
        roles: ["admin", "teacher", "student", "super_admin", 'class_teacher'],
      },
      {
        path: "/dashboard/super_admin/stock/allimg",
        title: "Upload Result Sheet",
        icon: (
          <ColorfulIcon color="#F4B400">
            <CloudUpload />
          </ColorfulIcon>
        ),
        roles: ["admin", "teacher", "student", "super_admin", 'class_teacher'],
      },
      {
        path: "/dashboard/super_admin/stock/allimg",
        title: "Subject wise Mark Input ",
        icon: (
          <ColorfulIcon color="#F4B400">
            <Subject />
          </ColorfulIcon>
        ),
        roles: ["admin", "teacher", "student", "super_admin", 'class_teacher'],
      },
      {
        path: "/dashboard/super_admin/stock/allimg",
        title: "Excel Mark Input ",
        icon: (
          <ColorfulIcon color="#F4B400">
            <TableChart />
          </ColorfulIcon>
        ),
        roles: ["admin", "teacher", "student", "super_admin", 'class_teacher'],
      },
      {
        path: "/dashboard/super_admin/stock/allimg",
        title: "Download Marksheet ",
        icon: (
          <ColorfulIcon color="#F4B400">
            <Download />
          </ColorfulIcon>
        ),
        roles: ["admin", "teacher", "student", "super_admin", 'class_teacher'],
      },
      {
        path: "/dashboard/super_admin/stock/allimg",
        title: "Send Result SMS",
        icon: (
          <ColorfulIcon color="#F4B400">
            <Message />
          </ColorfulIcon>
        ),
        roles: ["admin", "teacher", "student", "super_admin", 'class_teacher'],
      },
    ],
  },


  {
    title: "Admission",
    icon: (
      <ColorfulIcon color="#DB4437">
        <HowToReg />
      </ColorfulIcon>
    ),
    roles: ["admin", "teacher", "student", "super_admin", 'class_teacher'],
    children: [
      {
        path: "/dashboard/super_admin/admission",
        title: "Admission Info",
        icon: (
          <ColorfulIcon color="#DB4437">
            <Info />
          </ColorfulIcon>
        ),
        roles: ["admin", "teacher", "student", "super_admin", 'class_teacher'],
      },

    ],
  },

  {
    title: "Administration",
    icon: (
      <ColorfulIcon color="#4285F4">
        <AdminPanelSettings />
      </ColorfulIcon>
    ),
    roles: ["admin", "teacher", "student", "super_admin", 'class_teacher'],
    children: [
      {
        path: "/dashboard/super_admin/stock/allimg",
        title: "Staffs Users",
        icon: (
          <ColorfulIcon color="#4285F4">
            <AdminPanelSettings />
          </ColorfulIcon>
        ),
        roles: ["admin", "teacher", "student", "super_admin", 'class_teacher'],
      },
      {
        path: "/dashboard/super_admin/stock/allimg",
        title: "Teachers",
        icon: (
          <ColorfulIcon color="#4285F4">
            <SupervisorAccount />
          </ColorfulIcon>
        ),
        roles: ["admin", "teacher", "student", "super_admin", 'class_teacher'],
      },
      {
        path: "/dashboard/super_admin/stock/allimg",
        title: "Students",
        icon: (
          <ColorfulIcon color="#4285F4">
            <Person />
          </ColorfulIcon>
        ),
        roles: ["admin", "teacher", "student", "super_admin", 'class_teacher'],
      },
    ],
  },
  {
    title: "Settings",
    icon: (
      <ColorfulIcon color="#DB4437">
        <Settings />
      </ColorfulIcon>
    ),
    roles: ["admin", "teacher", "student", "super_admin", 'class_teacher'],
    children: [
      {
        path: "/dashboard/super_admin/stock/allimg",
        title: "Default Settings",
        icon: (
          <ColorfulIcon color="#DB4437">
            <Tune />
          </ColorfulIcon>
        ),
        roles: ["admin", "teacher", "student", "super_admin", 'class_teacher'],
      },
    ],
  },

  {
    title: "Gallery",
    icon: (
      <ColorfulIcon color="#4285F4">
        <PhotoLibrary />
      </ColorfulIcon>
    ),
    roles: ["admin", "teacher", "student", "super_admin", 'class_teacher'],
    children: [
      {
        path: "/dashboard/super_admin/folder",
        title: "Photos",
        icon: (
          <ColorfulIcon color="#4285F4">
            <Photos />
          </ColorfulIcon>
        ),
        roles: ["admin", "teacher", "student", "super_admin", 'class_teacher'],
      },
      {
        path: "/dashboard/super_admin/photos",
        title: "Folder",
        icon: (
          <ColorfulIcon color="#4285F4">
            <Folder />
          </ColorfulIcon>
        ),
        roles: ["admin", "teacher", "student", "super_admin", 'class_teacher'],
      },
    ],
  },

  {
    title: "User Management",
    path: "/dashboard/super_admin/user-management",
    icon: (
      <ColorfulIcon color="#F4B400">
        <Group />
      </ColorfulIcon>
    ),
    roles: ["admin", "teacher", "student", "super_admin", 'class_teacher'],
  },
  {
    title: "Database Backup",
    path: "#",
    icon: (
      <ColorfulIcon color="#4285F4">
        <Storage />
      </ColorfulIcon>
    ),
    roles: ["admin", "teacher", "student", "super_admin", 'class_teacher'],
  },
  {
    title: "Log Out",
    path: "#",
    icon: (
      <ColorfulIcon color="#DB4437">
        <Logout />
      </ColorfulIcon>
    ),
    roles: ["admin", "teacher", "student", "super_admin", 'class_teacher'],
  },
]
