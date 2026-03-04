import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Task, TaskResponseDTO } from '../interfaces/task.interface';

export interface RightPanelState {
  isOpen: boolean;
  task: TaskResponseDTO | null;
}

@Injectable({
  providedIn: 'root'
})
export class RightPanelService {

  private readonly _state = new BehaviorSubject<RightPanelState>({
    isOpen: false,
    task: null
  });

  readonly state$: Observable<RightPanelState> = this._state.asObservable();

  get snapshot(): RightPanelState {
    return this._state.value;
  }

  get isOpen(): boolean {
    return this._state.value.isOpen;
  }

  get task(): TaskResponseDTO | null {
    return this._state.value.task;
  }


  open(task?: TaskResponseDTO) {
    this._state.next({
      isOpen: true,
      task: task ?? null
    });
  }

  openWithTask(task: TaskResponseDTO) {
    this._state.next({
      isOpen: true,
      task
    });
  }

  close() {
    this._state.next({
      isOpen: false,
      task: null
    });
  }

  setTask(task: TaskResponseDTO) {
    this._state.next({
      ...this._state.value,
      task
    });
  }

  clearTask() {
    this._state.next({
      ...this._state.value,
      task: null
    });
  }

  reset() {
    this.close();
  }

}