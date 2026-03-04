import { PriorityEnum } from "../enums/priority.enum";

export interface TaskFilters {
  idTask?: number;
  title?: string;
  description?: string;
  completed?: boolean;
  priorities?: string[],
  due?: string;
}
