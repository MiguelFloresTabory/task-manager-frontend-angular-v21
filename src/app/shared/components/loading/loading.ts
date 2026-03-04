import { Component, effect, signal } from '@angular/core';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'loading',
  imports: [],
  templateUrl: './loading.html',
})
export class Loading {
  isloading = signal<boolean>(false);
  constructor(loadingService: LoadingService) {
    effect(() => {
      const isloading = loadingService.isloading();
      this.isloading.set(isloading);
    });
  }
}
