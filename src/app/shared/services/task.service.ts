import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { Task, TaskCreateDTO, TaskResponseDTO, TaskUpdateDTO } from '../interfaces/task.interface';
import { TaskFilters } from '../interfaces/task.filter.interface';
import { environment } from '@environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  _httpClient = inject(HttpClient);

  private _tasks = signal<TaskResponseDTO[]>([]);
  listtasksActive = computed(() => this._tasks().filter((task) => !task.completed));

  listtasksComplete = computed(() => this._tasks().filter((task) => task.completed));
  filter: TaskFilters = { priorities: [] };

  getTasks() {
    console.log("GET TASKS")
    this._httpClient
      .get<
        TaskResponseDTO[]
      >(`${environment.apiUrl}/task`, { params: this.filter ? { ...this.filter } : {} })
      .subscribe({ next: (tasks) => this._tasks.set(tasks), error: (err) => console.log(err) });
  }

  postTask(request: TaskCreateDTO): Observable<TaskResponseDTO> {
    return this._httpClient.post<TaskResponseDTO>(`${environment.apiUrl}/task`, request);
  }

  updateTask(request: TaskUpdateDTO): Observable<TaskResponseDTO> {
    return this._httpClient.put<TaskResponseDTO>(
      `${environment.apiUrl}/task/${request.idTask}`,
      request,
    );
  }

  deleteTask(idTask: number): Observable<any> {
    return this._httpClient.delete<any>(`${environment.apiUrl}/task/${idTask}`);
  }
}
