import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private _loading = signal<boolean>(false);
  readonly isloading = this._loading.asReadonly();
  show() {
    this._loading.set(true);
  }
  hide() {
    this._loading.set(false);
  }
  toggle() {
    this._loading.update(value => !value);
  }
}