import { PriorityEnum } from '../enums/priority.enum';

export interface Task {
  idTask: number;
  title: string;
  description: string;
  completed: boolean;
  task_priority: PriorityEnum;
  created_at: string;
  updated_at: string;
  due: string;
}

export interface TaskResponseDTO {
  idTask: number;
  title: string;
  description: string;
  completed: boolean;
  createdAt: string; // ISO date string
  updatedAt: string | null; // puede ser null
  due: string;
  taskPriority: PriorityEnum;
}

export interface TaskCreateDTO {
  title: string;
  description: string;
  completed: boolean;
  taskPriority: PriorityEnum;
  due: string;
}

export interface TaskUpdateDTO {
  idTask: number
  title: string;
  description: string;
  completed: boolean;
  taskPriority: PriorityEnum;
  createdAt: string;
  due: string;
}

/*
public class TaskCreateDto {

    private String title;
    private String description;
    private boolean completed;
    private Long idUser;
    private TaskPriority taskPriority;
    private String due;
}
*/
