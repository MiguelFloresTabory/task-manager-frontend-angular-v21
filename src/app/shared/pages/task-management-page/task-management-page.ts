import { NgClass } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { PrioritiesMenu } from '../../components/priorities-menu/priorities-menu';
import { PriorityEnum } from '../../enums/priority.enum';
import { Task } from '../../interfaces/task.interface';
import { TaskActive } from '../../components/task-active/task-active';
import { environment } from '@environments/environment.development';
import { MenuOptions } from '../../components/menu-options/menu-options';
import { TaskgesturePage } from "../taskgesture-page/taskgesture-page";
import { RouterOutlet } from '@angular/router';
import { RightPanel } from "../../components/right-panel/right-panel";
import { RightPanelService } from '../../services/right-panel.service';
import { ModalAddtask } from "../../components/modal-addtask/modal-addtask";
import { ModalCreateTaskService } from '../../services/modal-panel.service';
import { ModalConfirm } from "../../components/modal-confirm/modal-confirm";
import { Loading } from "../../components/loading/loading";
import { ToastMsg } from "../../components/toast-msg/toast-msg";

@Component({
  selector: 'app-task-management-page',
  imports: [NgClass, MenuOptions, RouterOutlet, RightPanel, ModalAddtask, ModalConfirm, Loading, ToastMsg],
  templateUrl: './task-management-page.html',
})
export class TaskManagementPage {
  constructor(private modal: ModalCreateTaskService) {}

  priorityEnum = PriorityEnum;
  envs = environment;
  protected readonly title = signal('task-proyect');

  sidebarOpen = signal(false);
  toggleSidebar() {
    this.sidebarOpen.set(!this.sidebarOpen());
    console.log(this.sidebarOpen());
  }

  openModalAddTask() {
    this.modal.open();
  }
}
