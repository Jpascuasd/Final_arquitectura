import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IRol } from 'app/shared/model/rol.model';
import { RolService } from './rol.service';

@Component({
  templateUrl: './rol-delete-dialog.component.html'
})
export class RolDeleteDialogComponent {
  rol?: IRol;

  constructor(protected rolService: RolService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.rolService.delete(id).subscribe(() => {
      this.eventManager.broadcast('rolListModification');
      this.activeModal.close();
    });
  }
}
