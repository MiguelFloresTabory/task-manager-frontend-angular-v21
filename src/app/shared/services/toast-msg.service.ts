import { Injectable, signal } from '@angular/core';

export enum ToastType {
  Success = 'success',
  Error = 'error',
  Warning = 'warning'
}

interface ToastState {
  show: boolean;
  message: string;
  type: ToastType;
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  toast = signal<ToastState>({
    show: false,
    message: '',
    type: ToastType.Success
  });

  show(type: ToastType, message: string, duration: number = 3000) {

    this.toast.set({
      show: true,
      message,
      type
    });

    setTimeout(() => {
      this.toast.update(t => ({
        ...t,
        show: false
      }));
    }, duration);
  }
}