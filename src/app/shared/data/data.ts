import { MenuOption } from '../components/menu-options/menu-options';
import { PriorityEnum } from '../enums/priority.enum';

export const menuOptionsArray: MenuOption[] = [
  {
    icon: 'calendar_today',
    label: 'Today',
    sublabel: 'Today tasks',
    router: '/taskmanager/today',
  },
  {
    icon: 'access_alarm',
    label: 'Upcoming',
    sublabel: 'Upcoming tasks',
    router: '/taskmanager/upcoming',
  },
  {
    icon: 'home',
    label: 'Task Manager',
    sublabel: 'Task Manager Global',
    router: '/taskmanager/taskgesture',
  },
];

export const priorities = [
  {
    name: 'High Priority',
    value: PriorityEnum.HIGH,
  },
  {
    name: 'Low Priority',
    value: PriorityEnum.LOW,
  },
  {
    name: 'Medium Priority',
    value: PriorityEnum.MEDIUM,
  },
];

export const priorityArray = [
  {
    name: 'All Tasks',
    value: 'All Tasks',
  },
  ...priorities
];



export const listTasksActive = [
  {
    idTask: 1,
    description: 'Design system update for v2.0',
    updated_at: '',
    created_at: '',
    due: '14 de febrero',
    title: '',
    task_priority: PriorityEnum.HIGH,
    completed: true,
  },
  {
    idTask: 2,
    description: 'Design system update for v2.0',
    updated_at: '',
    created_at: '',
    due: '14 de febrero',
    title: '',
    task_priority: PriorityEnum.MEDIUM,
    completed: true,
  },

  {
    idTask: 3,
    description: 'Design system update for v2.0',
    updated_at: '',
    created_at: '',
    due: '14 de febrero',
    title: '',
    task_priority: PriorityEnum.LOW,
    completed: true,
  },
];


export const listTasksCompleted = [
  {
    idTask: 1,
    description: 'Design system update for v2.0',
    updated_at: '',
    created_at: '',
    due: '14 de febrero',
    title: '',
    task_priority: PriorityEnum.HIGH,
    completed: true,
  },
  {
    idTask: 2,
    description: 'Fix login bug in authentication module',
    updated_at: '',
    created_at: '',
    due: '6 de febrero',
    title: '',
    task_priority: PriorityEnum.MEDIUM,
    completed: true,
  },

  {
    idTask: 3,
    description: 'Update user profile page with new design',
    updated_at: '',
    created_at: '',
    due: '5 de febrero',
    title: '',
    task_priority: PriorityEnum.LOW,
    completed: true,
  },
];