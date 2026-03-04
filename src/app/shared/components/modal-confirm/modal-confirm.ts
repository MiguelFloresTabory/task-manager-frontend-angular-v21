import { Component, effect, ElementRef, ViewChild } from '@angular/core';
import { ModalConfirmService } from '../../services/modal-confirm.service';

@Component({
  selector: 'modal-confirm',
  templateUrl: './modal-confirm.html'
})
export class ModalConfirm {

  @ViewChild('modalConfirm')
  dialog!: ElementRef<HTMLDialogElement>;

  constructor(public modalService: ModalConfirmService) {

    effect(() => {
      const isOpen = this.modalService.isOpen();
      const dialog = this.dialog?.nativeElement;

      if (!dialog) return;

      if (isOpen) {
        dialog.showModal();
      } else {
        dialog.close();
      }
    });
  }


  closeModal() {
    this.modalService.close();
  }
}