import { PriorityEnum } from '../../enums/priority.enum';
import { Priority } from '../priority/priority';
import { priorityArray } from '../../data/data';
import { TaskService } from '../../services/task.service';
import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-priorities-menu',
  imports: [Priority],
  templateUrl: './priorities-menu.html',
})
export class PrioritiesMenu {
  constructor(private taskService: TaskService) {}

  readonly ALL_TASKS = 'All Tasks';

  _priorities = signal(priorityArray);

  private prioritiesFilter: string[] = [];

  addNewPriorityFilter(priority: string): void {
    this.prioritiesFilter = this.togglePriority(priority);

    const isAllSelected = this.prioritiesFilter.includes(this.ALL_TASKS);

    this.taskService.filter = {
      ...this.taskService.filter,
      priorities: isAllSelected ? [] : this.prioritiesFilter,
    };

    this.taskService.getTasks();
  }

  private togglePriority(priority: string): string[] {
    return this.prioritiesFilter.includes(priority)
      ? this.prioritiesFilter.filter(p => p !== priority)
      : [...this.prioritiesFilter, priority];
  }
}