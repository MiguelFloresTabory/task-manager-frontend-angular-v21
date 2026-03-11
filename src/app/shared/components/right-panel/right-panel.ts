import { LoadingService } from './../../services/loading.service';
import { TaskResponseDTO, TaskUpdateDTO } from './../../interfaces/task.interface';
import { Component, inject, input, signal } from '@angular/core';
import { RightPanelService } from '../../services/right-panel.service';
import { priorities, priorityArray } from '../../data/data';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
  ValidatorFn,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { localToUtc, utcToLocal } from 'src/app/util/util';
import { ErrorIcon } from '../../icons/error-icon';
import { TaskService } from '../../services/task.service';
import { PriorityEnum } from '../../enums/priority.enum';
import { ToastService, ToastType } from '../../services/toast-msg.service';

@Component({
  selector: 'right-panel',
  templateUrl: './right-panel.html',
  imports: [ReactiveFormsModule, ErrorIcon],
})
export class RightPanel {
  isPanelOpen = signal(false);
  panelData = signal<TaskResponseDTO | null>(null);
  constructor(
    private rightPanel: RightPanelService,
    private taskservice: TaskService,
    private loadingService: LoadingService,
  ) {
    this.panelData.set(rightPanel.task);
  }

  toastService = inject(ToastService);
  ToastType = ToastType;

  prioritiesArray = priorities;
  //VALIDAR FECHA, DUE,
  //******************************* */
  validateDueToday(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) return null;

      const inputDate = new Date(control.value);
      const now = new Date();

      // Add 30 minutes to current time
      const minAllowedDate = new Date(now.getTime() + 30 * 60 * 1000);

      // Compare full datetime
      if (inputDate < minAllowedDate) {
        return { invalidDue: { value: control.value, minAllowed: minAllowedDate.toISOString() } };
      }

      return null; // valid
    };
  }

  //VALIDATE PRIORITY
  validatePriority(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) return null;
      if (control.value === '--select--') {
        return { invalidPriority: { value: control.value } };
      }
      return null; // valid
    };
  }
  //******************************* */
  form = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(4)]),

    due: new FormControl('', [Validators.required, this.validateDueToday()]),

    priority: new FormControl('', [Validators.required, this.validatePriority()]),

    description: new FormControl('', [Validators.required, Validators.maxLength(600)]),
  });
  //Validator function

  //FORMULARIO
  //VALIDAR QUE LA FECHA
  // =====================================
  // 🚀 SUBMIT
  // =====================================
  onSubmit() {
    // console.log('FORM ENVIADO:', this.form.value);
    // console.log(this.panelData()?.idTask);

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.loadingService.show();
    //ACTUALIZACION

    this.taskservice
      .updateTask({
        idTask: this.panelData()?.idTask!,
        title: this.form.value.title!,
        due: localToUtc(this.form.value.due!),
        taskPriority: this.form.value.priority! as PriorityEnum,
        description: this.form.value.description!,
        completed: this.panelData()?.completed!,
        createdAt: this.panelData()?.createdAt!,
      })
      .subscribe({
        next: (res: TaskResponseDTO) => {
          this.taskservice.getTasks();
          this.loadingService.hide();
          this.closePanel();
        },
        error: (err) => {
          this.loadingService.hide();
          console.log(err);
        },
      });

    // this.resetForm();
  }

  // =====================================
  // 🔄 RESET FORM
  // =====================================
  resetForm() {
    this.form.reset({
      title: '',
      due: new Date().toISOString().slice(0, 16),
      priority: '',
      description: '',
    });
  }

  // =====================================
  // 📦 CARGAR DATOS DESPUES DE RENDER
  // =====================================
  loadDataIntoForm() {
    const dataFromBackend = {
      title: this.panelData()?.title ?? '',
      due: this.panelData()?.due ? utcToLocal(this.panelData()!.due) : '',
      priority: this.panelData()?.taskPriority ?? '',
      description: this.panelData()?.description ?? '',
    };

    this.form.patchValue(dataFromBackend);
    console.log(dataFromBackend);
  }

  ngOnInit() {
    this.rightPanel.state$.subscribe((state) => {
      //if(!state.task) return;
      console.log(state);
      this.isPanelOpen.set(state.isOpen);
      this.panelData.set(state.task);
      if (state.task) {
        this.loadDataIntoForm();
        console.log(state.task);
      }
    });
  }

  togglePanel = () => {
    if (this.panelData()) {
      this.rightPanel.openWithTask(this.panelData()!);
    } else {
      this.rightPanel.close();
    }
  };
  closePanel() {
    this.rightPanel.close();
  }

  // =====================================
  // 🧠 FECHA FORMATO INPUT datetime-local
  // =====================================
  getNowDateTime(): string {
    const now = new Date();
    return now.toISOString().slice(0, 16);
  }
}
