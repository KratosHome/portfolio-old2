import { MdOutlineWorkHistory } from 'react-icons/md'
import { FaTasks } from 'react-icons/fa'
import { GrBlog } from 'react-icons/gr'
import { PiStudentBold } from 'react-icons/pi'
import { FaUserSecret } from 'react-icons/fa'

export const adminDashboardUa = [
  {
    id: 1,
    title: 'Проект',
    link: 'project',
    icon: 'MdOutlineWorkHistory',
    tabs: [
      {
        id: 1,
        title: 'Оголошення',
        link: 'announcements',
      },
      {
        id: 2,
        title: 'Календар',
        link: 'calendar',
      },
      {
        id: 3,
        title: 'Команда',
        link: 'team',
      },
      {
        id: 4,
        title: 'Документи',
        link: 'documents',
      },
      {
        id: 5,
        title: 'Завдання',
        link: 'tasks',
      },
      {
        id: 6,
        title: 'Комунікації',
        link: 'communications',
      },
    ],
    roles: ['all'],
  },
  {
    id: 2,
    title: 'Задачі',
    link: 'tasks',
    icon: 'FaTasks',
    roles: ['all'],
  },
  {
    id: 3,
    title: 'Блоґ',
    link: 'blog',
    icon: 'GrBlog',
    roles: ['all'],
    tabs: [
      {
        id: 1,
        title: 'Мої статті',
        link: 'my-articles',
      },

      {
        id: 2,
        title: 'Створити статтю',
        link: 'create-article',
      },
      {
        id: 3,
        title: 'Не опубліковані',
        link: 'unpublished',
        roles: ['admin'],
      },
      {
        id: 4,
        title: 'Нові статті',
        link: 'all-articles',
        roles: ['admin'],
      },
    ],
  },
  {
    id: 4,
    title: 'Студенти',
    link: 'students',
    icon: 'PiStudentBold',
    roles: ['admin'],
  },
  {
    id: 5,
    title: 'Користувачі',
    link: 'users',
    icon: 'FaUserSecret',
    roles: ['admin'],
  },
]

export const adminDashboardData = {
  en: adminDashboardUa,
  uk: adminDashboardUa,
  fr: adminDashboardUa,
}
