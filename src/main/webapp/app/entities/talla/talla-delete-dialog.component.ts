import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITalla } from 'app/shared/model/talla.model';
import { TallaService } from './talla.service';

@Component({
  templateUrl: './talla-delete-dialog.component.html'
})
export class TallaDeleteDialogComponent {
  talla?: ITalla;

  constructor(protected tallaService: TallaService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.tallaService.delete(id).subscribe(() => {
      this.eventManager.broadcast('tallaListModification');
      this.activeModal.close();
    });
  }
}
