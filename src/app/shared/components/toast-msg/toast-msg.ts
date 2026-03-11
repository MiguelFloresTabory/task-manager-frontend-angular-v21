// toast.component.ts
import { Component, inject } from '@angular/core';
import { ToastService, ToastType } from '../../services/toast-msg.service';

@Component({
  selector: 'toast-msg',
  templateUrl: './toast-msg.html'
})
export class ToastMsg {

  toastService = inject(ToastService);
  ToastType = ToastType;

}