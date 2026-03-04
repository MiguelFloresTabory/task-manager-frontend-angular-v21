import { Component, input } from '@angular/core';
import {  utcToFrontDate } from 'src/app/util/util';
import { ModalConfirmService } from '../../services/modal-confirm.service';
import { TaskService } from '../../services/task.service';
import { TaskResponseDTO } from '../../interfaces/task.interface';
import { MatIcon } from "@angular/material/icon";

@Component({
  selector: 'task-completed',
  imports: [MatIcon],
  templateUrl: './task-completed.html',
})
export class TaskCompleted {
  constructor(private modalConfirmService: ModalConfirmService, private taskService: TaskService) {}
  changedateFormat(date: string){
    return utcToFrontDate(date);
  }
   title = input.required<string>();
   due = input.required<string>();
   taskSelect = input.required<TaskResponseDTO>();

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
