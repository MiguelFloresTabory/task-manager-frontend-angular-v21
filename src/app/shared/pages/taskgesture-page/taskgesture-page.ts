import { Component, computed, inject, signal } from '@angular/core';
import { PrioritiesMenu } from '../../components/priorities-menu/priorities-menu';
import { TaskActive } from '../../components/task-active/task-active';

import { TaskCompleted } from '../../components/task-completed/task-completed';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'taskgesture-page',
  imports: [PrioritiesMenu, TaskActive, TaskCompleted],
  templateUrl: './taskgesture-page.html',
})
export class TaskgesturePage {
  private taskservice = inject(TaskService);
  constructor() {
    this.taskservice.getTasks();
  }

  listTasksActive = this.taskservice.listtasksActive;
  listTasksCompleted = this.taskservice.listtasksComplete;
}
