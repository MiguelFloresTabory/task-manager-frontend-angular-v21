import {
  Component,
  signal,
  ViewChild,
  ElementRef,
  effect,
  Injector,
  runInInjectionContext,
  inject,
} from '@angular/core';

import { ModalCreateTaskService } from '../../services/modal-panel.service';
import { priorities } from '../../data/data';
import {
  form,
  FormField,
  max,
  min,
  minLength,
  required,
  submit,
  validate,
} from '@angular/forms/signals';
import { ErrorIcon } from '../../icons/error-icon';
import { PriorityEnum } from '../../enums/priority.enum';
import { TaskService } from '../../services/task.service';
import { localToUtc } from 'src/app/util/util';
import { LoadingService } from '../../services/loading.service';
import { ToastService, ToastType } from '../../services/toast-msg.service';

@Component({
  selector: 'modal-addtask',
  templateUrl: './modal-addtask.html',
  imports: [ErrorIcon, FormField],
})
export class ModalAddtask {
  constructor(
    private serviceModal: ModalCreateTaskService,
    private serviceTask: TaskService,
    private injector: Injector,
    private loadingService: LoadingService,
  ) {}
  toastService = inject(ToastService);
  ToastType = ToastType;
  taskModel = signal<TaskFormData>({
    description: '',
    due: '',
    priority: '--select priority--',
    title: '',
  });
  taskForm = form(this.taskModel, (path) => {
    required(path.title, { message: 'title required' });
    required(path.description, { message: 'description required' });
    required(path.priority, { message: 'priority required' });
    required(path.due, { message: 'due date required' });
    validate(path.priority, ({ value }) => {
      if (value() === '--select priority--' || value() === '') {
        return { message: 'priority required', kind: 'error' };
      }
      return null;
    });
    validate(path.due, ({ value }) => {
      if (!value) return null;
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const due = new Date(value());
      due.setHours(0, 0, 0, 0);
      if (due < today) {
        return {
          message: 'Invalid Date',
          kind: 'error',
        };
      }

      return null;
    });
  });

  isFieldInvalid(fieldName: keyof TaskFormData): boolean {
    const fieldSignal = this.taskForm[fieldName];
    if (!fieldSignal) return false;

    const field = fieldSignal();
    return field && field.touched() && field.errors().length > 0;
  }

  onSubmit(event: Event) {
    event.preventDefault();
    submit(this.taskForm, async (e) => {
      this.loadingService.show();
      this.serviceTask
        .postTask({
          title: this.taskForm().value().title,
          description: this.taskForm().value().description,
          completed: false,
          taskPriority: this.taskForm().value().priority as PriorityEnum,
          due: localToUtc(this.taskForm().value().due),
        })
        .subscribe({
          next: () => {
            this.serviceTask.getTasks();
            this.loadingService.hide();
            this.onReset();
            this.togglePanel();
          },
          error: (err) => {
            this.loadingService.hide();
            console.log(err);
          },
        });
    });
  }

  onReset() {
    this.taskModel.set({
      description: '',
      due: '',
      priority: '--select priority--',
      title: '',
    });

    this.taskForm().reset();
  }

  isPanelOpen = signal(false);

  arrayPriorities = priorities;

  @ViewChild('taskDialog')
  dialog!: ElementRef<HTMLDialogElement>;

  ngOnInit() {
    this.serviceModal.state$.subscribe((state) => {
      this.isPanelOpen.set(state);
      //LOAD DATA
    });
  }

  ngAfterViewInit() {
    runInInjectionContext(this.injector, () => {
      effect(() => {
        if (!this.dialog) return;

        if (this.isPanelOpen()) {
          if (!this.dialog.nativeElement.open) {
            this.dialog.nativeElement.showModal();
          }
        } else {
          if (this.dialog.nativeElement.open) {
            this.dialog.nativeElement.close();
          }
        }
      });
    });
  }

  togglePanel = () => {
    this.serviceModal.toggleModal();
  };

  closeModal = () => {
    this.serviceModal.close();
  };
}
