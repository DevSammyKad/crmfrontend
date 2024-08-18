import {
  UilHome,
  UilUserPlus,
  UilUsersAlt,
  UilClipboardNotes,
  UilFileShieldAlt,
  UilBill,
  UilFileGraph,
  UilPaperclip,
  UilPoundCircle,
  UilProcessor,
  UilSetting,
  UilQuestionCircle,
} from '@iconscout/react-unicons';

export const SidebarData = [
  {
    path: '/dashboard',
    icon: UilHome,
    heading: 'Dashboard',
  },
  {
    path: '/leads',
    icon: UilUserPlus,
    heading: 'Leads',
  },
  {
    path: '/tasks',
    icon: UilClipboardNotes,
    heading: 'Tasks',
  },
  {
    path: '/clients',
    icon: UilUsersAlt,
    heading: 'Clients',
  },
  {
    path: '/documents',
    icon: UilFileShieldAlt,
    heading: 'Documents',
  },
  {
    path: '/payment',
    icon: UilBill,
    heading: 'Payment',
  },

  {
    path: '/reports',
    icon: UilFileGraph,
    heading: 'Reports',
  },
];
export const PalaviProjects = [
  {
    path: '/oldAgeHome',
    icon: UilPaperclip,
    heading: 'OLD AGE HOME',
  },
  {
    path: '/csrfunds',
    icon: UilPoundCircle,
    heading: 'CSR FUND',
  },
  {
    path: '/bachatGat',
    icon: UilUserPlus,
    heading: 'BACHAT GAT',
  },
  {
    path: '/otheractivity',
    icon: UilProcessor,
    heading: 'Other Activity ',
  },
];

export const SidebarFooter = [
  {
    path: '/setting',
    icon: UilSetting,
    heading: 'Setting ',
  },
  {
    path: '/help',
    icon: UilQuestionCircle,
    heading: 'Help ',
  },
];
