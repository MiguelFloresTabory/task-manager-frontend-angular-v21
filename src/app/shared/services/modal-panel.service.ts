import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Task } from '../interfaces/task.interface';

@Injectable({
  providedIn: 'root',
})
export class ModalCreateTaskService {
  private readonly _state = new BehaviorSubject<boolean>(false);

  readonly state$: Observable<boolean> = this._state.asObservable();

  get snapshot(): boolean {
    return this._state.value;
  }

  open(task?: Task) {
    this._state.next(true);
  }

  close() {
    this._state.next(false);
  }
  toggleModal(){
    this._state.next(!this._state.value);
  }

  reset() {
    this.close();
  }
}
