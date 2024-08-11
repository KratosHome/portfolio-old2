import project from '@/assets/dashboard/project.png'
import tasks from '@/assets/dashboard/tasks.png'
import blog from '@/assets/dashboard/blog.png'
import students from '@/assets/dashboard/students.png'
import users from '@/assets/dashboard/project.png'

export const adminDashboardUa = [
  {
    id: 1,
    title: 'Проект',
    link: 'project',
    icon: project,
    roles: ['all'],
  },
  {
    id: 2,
    title: 'Задачі',
    link: 'tasks',
    icon: tasks,
    roles: ['all'],
  },
  {
    id: 3,
    title: 'Блоґ',
    link: 'blog',
    icon: blog,
    roles: ['all'],
  },
  {
    id: 4,
    title: 'Студенти',
    link: 'students',
    icon: students,
    roles: ['mentor'],
  },
  {
    id: 5,
    title: 'Користувачі',
    link: 'users',
    icon: users,
    roles: ['admin'],
  },
]

export const adminDashboardData = {
  en: adminDashboardUa,
  uk: adminDashboardUa,
  fr: adminDashboardUa,
}
