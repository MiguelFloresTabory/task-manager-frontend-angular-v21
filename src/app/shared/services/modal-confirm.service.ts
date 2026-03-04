import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ModalConfirmService {

  private _isOpen = signal(false);
  readonly isOpen = this._isOpen.asReadonly();

  private _message = signal<string>('Are you sure?');
  readonly message = this._message.asReadonly();

  private confirm: (() => void) | null = null;

  open(message: string, confirm: () => void) {
    this._message.set(message);
    this.confirm = confirm;
    this._isOpen.set(true);
  }

  confirmAction() {
    this.confirm?.();
    this.close();
  }

  close() {
    this._isOpen.set(false);
    this.confirm = null;
  }
}