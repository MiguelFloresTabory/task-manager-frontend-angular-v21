import { Component, computed, input, signal } from '@angular/core';
import { PriorityFlag } from '../priority-flag/priority-flag';
import { PriorityEnum } from '../../enums/priority.enum';
import { RightPanelService } from '../../services/right-panel.service';
import { Task, TaskResponseDTO } from '../../interfaces/task.interface';
import {  utcToFrontDate } from 'src/app/util/util';
import { NgClass } from '@angular/common';
import { MatIcon } from "@angular/material/icon";
import { ModalConfirmService } from '../../services/modal-confirm.service';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'task-active',
  templateUrl: './task-active.html',
  imports: [PriorityFlag, NgClass, MatIcon],
})
export class TaskActive {
  constructor(private rightPanel: RightPanelService, private modalConfirmService: ModalConfirmService, private taskService: TaskService) {}
  changeDateFormat(dateString: string) {
    return utcToFrontDate(dateString);
  }
  selected = signal(false);
  isDueExpire = computed(()=>{
     const inputDate = new Date(this.due());
      const now = new Date();
      const minAllowedDate = new Date(now.getTime() + 30 * 60 * 1000);
      return inputDate < minAllowedDate
  });
  priority = input.required<PriorityEnum>();
  value = input.required<string>();
  title = input.required<string>();
  due = input.required<string>();
  taskSelect = input.required<TaskResponseDTO>();
  //gesture open task  in right panel
  onChange(event: Event) {
    const checked = (event.target as HTMLInputElement).checked;
    this.selected.set(checked);
    this.rightPanel.open(this.taskSelect());
  }

  openModal(){
    this.modalConfirmService.open("Are you sure you want to delete this task?", (() => 
      this.taskService.deleteTask(this.taskSelect().idTask).subscribe({
        next: () =>{
          this.taskService.getTasks();
          this.modalConfirmService.close();
        },
        error: (err) => {
            console.log(err);
          }
    })));
    
  }

}
