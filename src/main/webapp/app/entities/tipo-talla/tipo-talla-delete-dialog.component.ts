import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITipoTalla } from 'app/shared/model/tipo-talla.model';
import { TipoTallaService } from './tipo-talla.service';

@Component({
  templateUrl: './tipo-talla-delete-dialog.component.html'
})
export class TipoTallaDeleteDialogComponent {
  tipoTalla?: ITipoTalla;

  constructor(protected tipoTallaService: TipoTallaService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.tipoTallaService.delete(id).subscribe(() => {
      this.eventManager.broadcast('tipoTallaListModification');
      this.activeModal.close();
    });
  }
}
