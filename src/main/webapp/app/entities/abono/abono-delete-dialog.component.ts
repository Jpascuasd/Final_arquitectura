import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IAbono } from 'app/shared/model/abono.model';
import { AbonoService } from './abono.service';

@Component({
  templateUrl: './abono-delete-dialog.component.html'
})
export class AbonoDeleteDialogComponent {
  abono?: IAbono;

  constructor(protected abonoService: AbonoService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.abonoService.delete(id).subscribe(() => {
      this.eventManager.broadcast('abonoListModification');
      this.activeModal.close();
    });
  }
}
