export const adminDashboardUa = [
  {
    id: 1,
    title: 'Оголошення',
    link: 'announcements',
    icon: 'GrAnnounce',
    roles: ['isInProject'],
  },
  {
    id: 2,
    title: 'Задачі',
    link: 'tasks',
    icon: 'FaTasks',
    roles: ['isInProject'],
  },
  {
    id: 3,
    title: 'Документи',
    link: 'documents',
    icon: 'IoDocuments',
    roles: ['isInProject'],
  },
  {
    id: 4,
    title: 'Проект',
    link: 'project',
    icon: 'MdOutlineWorkHistory',
    roles: ['isInProject'],
  },
  {
    id: 5,
    title: 'Команда',
    link: 'team',
    icon: 'RiTeamLine',
    roles: ['isInProject'],
  },
  {
    id: 6,
    title: 'Статистика',
    link: 'statistics',
    icon: 'FcStatistics',
    roles: ['isInProject'],
  },
  {
    id: 7,
    title: 'Блоґ',
    link: 'blog',
    icon: 'GrBlog',
    roles: ['all'],
  },
]

export const adminDashboardData = {
  en: adminDashboardUa,
  uk: adminDashboardUa,
  fr: adminDashboardUa,
}
